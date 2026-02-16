import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchProfile(parsedUser.id);
    }, [navigate]);

    const fetchProfile = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/quiz-backend/api/profile/${userId}`);
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
            if (error.response && error.response.status === 404) {
                setProfile({ totalQuizzesTaken: 0, averageScore: 0, history: [] });
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-body">
            {/* Navbar (Simplified - could be a reusable component) */}
            <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 cursor-pointer" onClick={() => navigate('/dashboard')}>DevQuiz</h1>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition px-4 py-2 hover:bg-gray-50 rounded-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </button>
            </nav>

            <main className="max-w-5xl mx-auto px-6 py-10">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-10 border border-gray-100">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-extrabold mb-2">Hello, {user?.username}</h2>
                            <p className="opacity-90 text-lg">Here is an overview of your learning journey.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        <div className="p-10 flex flex-col items-center justify-center group hover:bg-gray-50 transition">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                                <span className="text-3xl">📚</span>
                            </div>
                            <h3 className="text-gray-500 font-semibold uppercase tracking-wide text-xs mb-2">Quizzes Completed</h3>
                            <p className="text-5xl font-black text-gray-900">{profile?.totalQuizzesTaken || 0}</p>
                        </div>
                        <div className="p-10 flex flex-col items-center justify-center group hover:bg-gray-50 transition">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                                <span className="text-3xl">🎯</span>
                            </div>
                            <h3 className="text-gray-500 font-semibold uppercase tracking-wide text-xs mb-2">Average Score</h3>
                            <p className="text-5xl font-black text-gray-900">{profile?.averageScore || 0}<span className="text-2xl text-gray-400">%</span></p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-gray-900">Recent Activity</h3>
                </div>

                {!profile?.history || profile.history.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="text-5xl mb-4 grayscale opacity-50">📝</div>
                        <p className="text-gray-500 mb-6">You haven't taken any quizzes yet.</p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30"
                        >
                            Start Learning
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-5 text-gray-400 font-semibold text-xs uppercase tracking-wider">Quiz</th>
                                        <th className="px-8 py-5 text-gray-400 font-semibold text-xs uppercase tracking-wider">Difficulty</th>
                                        <th className="px-8 py-5 text-gray-400 font-semibold text-xs uppercase tracking-wider">Score</th>
                                        <th className="px-8 py-5 text-gray-400 font-semibold text-xs uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {profile.history.map((record) => (
                                        <tr key={record.id} className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900 text-lg">{record.quizTitle}</span>
                                                    <span className="text-xs text-indigo-500 font-medium">{record.category}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize
                                                    ${record.difficulty === 'Core' ? 'bg-green-100 text-green-800' :
                                                        record.difficulty === 'Advance' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'}`}>
                                                    {record.difficulty}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center">
                                                    <span className={`font-bold text-lg mr-2 ${(record.score / record.totalQuestions) >= 0.7 ? 'text-green-600' : 'text-gray-900'
                                                        }`}>
                                                        {record.score}/{record.totalQuestions}
                                                    </span>
                                                    <span className="text-xs text-gray-400 font-medium">
                                                        ({Math.round((record.score / record.totalQuestions) * 100)}%)
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-gray-500 text-sm">
                                                {new Date(record.takenAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProfilePage;
