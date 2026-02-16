import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(storedUser));
        fetchQuizzes();
    }, [navigate]);

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/quiz-backend/api/quizzes');
            setQuizzes(response.data);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-body">
            {/* Navbar */}
            <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        DevQuiz
                    </h1>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-sm text-gray-500">Welcome back,</span>
                            <span className="text-gray-900 font-bold leading-tight">{user?.username}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                to="/profile"
                                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition"
                                title="My Profile"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-white border border-red-200 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-bold transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Quizzes</h2>
                        <p className="text-gray-500">Choose a language and difficulty to start learning.</p>
                    </div>
                </div>

                {quizzes.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No quizzes found</h3>
                        <p className="text-gray-500">Check back later for new content!</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {/* Group by Category */}
                        {Object.entries(quizzes.reduce((acc, quiz) => {
                            (acc[quiz.category] = acc[quiz.category] || []).push(quiz);
                            return acc;
                        }, {})).map(([category, categoryQuizzes]) => (
                            <div key={category} className="animate-fade-in-up">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <span className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></span>
                                    {category}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {categoryQuizzes.map((quiz) => (
                                        <div key={quiz.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-100 group flex flex-col h-full overflow-hidden transform hover:-translate-y-1">
                                            <div className={`h-2 w-full ${quiz.difficulty === 'Core' ? 'bg-green-400' :
                                                    quiz.difficulty === 'Advance' ? 'bg-yellow-400' : 'bg-red-500'
                                                }`}></div>

                                            <div className="p-7 flex-grow flex flex-col">
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                                        ${quiz.difficulty === 'Core' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                            quiz.difficulty === 'Advance' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                                                                'bg-red-50 text-red-700 border border-red-100'}`}>
                                                        {quiz.difficulty}
                                                    </span>
                                                    <span className="text-xs text-gray-400 font-medium">10 Mins</span>
                                                </div>

                                                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition">{quiz.title}</h4>
                                                <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">{quiz.description}</p>

                                                <Link
                                                    to={`/quiz/${quiz.id}`}
                                                    className="block w-full text-center bg-gray-50 text-gray-700 font-bold py-3 rounded-xl border border-gray-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition duration-300 flex items-center justify-center gap-2"
                                                >
                                                    <span>Start Quiz</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
