import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        fetchQuestions();
    }, [id]);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/quiz-backend/api/quizzes/${id}/questions`);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
            // alert('Failed to load questions.');
        } finally {
            setLoading(false);
        }
    };

    const handleOptionSelect = (option) => {
        setAnswers({
            ...answers,
            [currentQuestionIndex]: option
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateScore();
        }
    };

    const calculateScore = async () => {
        let newScore = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correctOption) {
                newScore += 1;
            }
        });
        setScore(newScore);
        setShowResult(true);

        // Submit Score to Backend
        try {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                await axios.post('http://localhost:8080/quiz-backend/api/profile/score', {
                    userId: user.id,
                    quizId: parseInt(id),
                    score: newScore,
                    totalQuestions: questions.length
                });
            }
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (questions.length === 0) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No questions found</h2>
            <button onClick={() => navigate('/dashboard')} className="text-indigo-600 font-bold hover:underline">Go Back</button>
        </div>
    );

    if (showResult) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-body">
                <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

                    <div className="mb-8">
                        {percentage >= 70 ? (
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">🏆</span>
                            </div>
                        ) : (
                            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">💪</span>
                            </div>
                        )}
                        <h2 className="text-3xl font-extrabold text-gray-900">Quiz Completed!</h2>
                        <p className="text-gray-500 mt-2">Here is how you performed</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                        <div className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Your Score</div>
                        <div className="text-5xl font-black text-indigo-600 mb-2">{percentage}%</div>
                        <div className="text-gray-600 font-medium">
                            You answered <span className="text-gray-900 font-bold">{score}</span> out of <span className="text-gray-900 font-bold">{questions.length}</span> correctly
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-xl transition transform hover:-translate-y-1 shadow-lg"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-body">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col h-[80vh] md:h-auto">
                {/* Header / Progress */}
                <div className="bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
                    <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Question {currentQuestionIndex + 1}/{questions.length}</span>
                        <div className="w-32 md:w-48 h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                    <div>
                        {/* Timer could go here */}
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-gray-400 hover:text-red-500 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-8 md:p-10 overflow-y-auto flex-grow">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">{currentQuestion.questionText}</h3>

                    <div className="space-y-4">
                        {['A', 'B', 'C', 'D'].map((opt) => (
                            <button
                                key={opt}
                                onClick={() => handleOptionSelect(opt)}
                                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 group flex items-start
                                    ${answers[currentQuestionIndex] === opt
                                        ? 'border-indigo-600 bg-indigo-50 shadow-md transform scale-[1.01]'
                                        : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'}`}
                            >
                                <span className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg mr-5 text-sm font-bold transition-colors
                                     ${answers[currentQuestionIndex] === opt ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'}
                                `}>
                                    {opt}
                                </span>
                                <span className={`text-lg font-medium ${answers[currentQuestionIndex] === opt ? 'text-indigo-900' : 'text-gray-700'}`}>
                                    {opt === 'A' && currentQuestion.optionA}
                                    {opt === 'B' && currentQuestion.optionB}
                                    {opt === 'C' && currentQuestion.optionC}
                                    {opt === 'D' && currentQuestion.optionD}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-8 border-t border-gray-100 bg-gray-50 flex justify-end">
                    <button
                        onClick={handleNext}
                        disabled={!answers[currentQuestionIndex]}
                        className={`px-10 py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-lg flex items-center gap-2
                            ${!answers[currentQuestionIndex]
                                ? 'bg-gray-300 cursor-not-allowed shadow-none'
                                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30 transform hover:-translate-y-1'}`}
                    >
                        {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;
