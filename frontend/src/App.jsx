import React, { useState, useEffect, useMemo } from 'react';
import {
    User,
    Trophy,
    Clock,
    ChevronRight,
    LogOut,
    BarChart3,
    BrainCircuit,
    ShieldCheck,
    Zap,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { authService, quizService, scoreService } from './services/api';

// --- Configuration ---
const LANGUAGES = [
    { id: 'JAVA', name: 'Java', icon: '☕', color: 'from-orange-500 to-red-600' },
    { id: 'PYTHON', name: 'Python', icon: '🐍', color: 'from-blue-500 to-yellow-500' },
    { id: 'HTML', name: 'Web Dev', icon: '🌐', color: 'from-blue-400 to-blue-700' },
    { id: 'JAVASCRIPT', name: 'JavaScript', icon: '📜', color: 'from-yellow-400 to-yellow-600' }
];

const LEVELS = [
    { id: 'Core', count: 25, desc: 'Foundational concepts and syntax' },
    { id: 'Advance', count: 50, desc: 'Complex logic and architecture' },
    { id: 'Pro', count: 100, desc: 'Enterprise-grade mastery' }
];

export default function App() {
    const [view, setView] = useState('landing');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('quiz_user')));
    const [selectedLang, setSelectedLang] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [quizData, setQuizData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [timer, setTimer] = useState(0);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form states
    const [authData, setAuthData] = useState({ username: '', email: '', password: '' });

    useEffect(() => {
        if (user) {
            localStorage.setItem('quiz_user', JSON.stringify(user));
            fetchHistory();
        } else {
            localStorage.removeItem('quiz_user');
        }
    }, [user]);

    const fetchHistory = async () => {
        if (!user) return;
        try {
            const resp = await scoreService.getHistory(user.id);
            setHistory(resp.data);
        } catch (err) {
            console.error("Failed to fetch history", err);
        }
    };

    // Auth Handlers
    const handleAuth = async (type) => {
        setLoading(true);
        setError('');
        try {
            let resp;
            if (type === 'signup') {
                resp = await authService.signup(authData);
                if (resp.data.success) {
                    setView('login');
                } else {
                    setError(resp.data.message || 'Registration failed');
                }
            } else {
                resp = await authService.login({ email: authData.email, password: authData.password });
                // Check if response is the user object (as per new AuthServlet)
                if (resp.data && resp.data.id) {
                    setUser(resp.data);
                    setView('selection');
                } else {
                    setError('Invalid credentials');
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Connection failed. Check server.');
        } finally {
            setLoading(false);
        }
    };

    const startQuiz = async () => {
        setLoading(true);
        try {
            const resp = await quizService.getQuestions(selectedLang.id, selectedLevel.id);
            setQuizData(resp.data.map((q, i) => ({
                id: q.id,
                text: q.questionText,
                options: [q.optionA, q.optionB, q.optionC, q.optionD],
                correct: q.correctOption.toUpperCase()
            })));
            setTimer(0);
            setCurrentQuestion(0);
            setUserAnswers({});
            setView('quiz');
        } catch (err) {
            alert("Protocol failure: Questions could not be retrieved.");
        } finally {
            setLoading(false);
        }
    };

    const finishQuiz = async () => {
        const correctCount = Object.entries(userAnswers).filter(([idx, ans]) => ans === quizData[idx].correct).length;

        const scoreEntry = {
            userId: user.id,
            quizId: 1, // Currently hardcoded to 1 since we don't have a specific quiz id from the random query
            score: correctCount,
            totalQuestions: quizData.length,
            timeSpent: timer
        };

        try {
            await scoreService.saveScore(scoreEntry);
            fetchHistory();
            setView('result');
        } catch (err) {
            console.error("Failed to save score", err);
            setView('result');
        }
    };

    useEffect(() => {
        let interval;
        if (view === 'quiz') {
            interval = setInterval(() => setTimer(prev => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [view]);

    // --- UI Components ---

    const Navbar = () => (
        <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('landing')}>
                <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
                    <BrainCircuit className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase">Krit <span className="text-indigo-400">Quiz</span></span>
            </div>
            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <button onClick={() => setView('dashboard')} className="hover:text-indigo-400 transition font-bold text-sm uppercase tracking-wider">Dashboard</button>
                        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700 shadow-inner">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-sm font-bold tracking-wide">{user.username}</span>
                        </div>
                        <button onClick={() => { setUser(null); setView('landing'); }} className="text-slate-400 hover:text-red-400 transition-colors">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setView('login')} className="text-slate-300 hover:text-white font-bold transition text-sm uppercase tracking-widest px-4">Login</button>
                        <button onClick={() => setView('signup')} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 rounded-full font-bold transition shadow-xl shadow-indigo-600/20 active:scale-95 text-sm uppercase tracking-widest">Sign Up</button>
                    </>
                )}
            </div>
        </nav>
    );

    const LandingView = () => (
        <div className="min-h-[calc(100vh-72px)] bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
            {/* Decorative Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>

            <div className="max-w-4xl space-y-8 relative z-10 animate-in fade-in zoom-in duration-1000">
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-5 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase">
                    <Zap className="w-4 h-4" /> Battle-Tested Assessments
                </div>
                <h1 className="text-6xl md:text-9xl font-black tracking-tight leading-none uppercase">
                    Elevate Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500 animate-gradient">Code IQ</span>
                </h1>
                <p className="text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
                    The definitive precision testing platform for developers. <br className="hidden md:block" />
                    Choose your stack, pick your level, and claim your rank.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
                    <button onClick={() => setView('signup')} className="bg-indigo-600 hover:bg-indigo-700 text-xl px-14 py-6 rounded-2xl font-black transition-all hover:scale-105 shadow-2xl shadow-indigo-600/40 uppercase tracking-widest">
                        Create Account
                    </button>
                    <button onClick={() => setView('login')} className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xl px-14 py-6 rounded-2xl font-black transition-all uppercase tracking-widest hover:border-indigo-500">
                        Member Login
                    </button>
                </div>
            </div>
        </div>
    );

    const SelectionView = () => (
        <div className="min-h-[calc(100vh-72px)] bg-slate-950 p-6 md:p-16 text-white">
            <div className="max-w-6xl mx-auto space-y-16">
                <div className="space-y-4">
                    <h2 className="text-5xl font-black tracking-tight">CONFIGURE MISSION</h2>
                    <div className="h-1 w-24 bg-indigo-500 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {LANGUAGES.map(lang => (
                        <button
                            key={lang.id}
                            onClick={() => setSelectedLang(lang)}
                            className={`group relative p-8 rounded-[2rem] border transition-all text-left flex flex-col gap-6 overflow-hidden ${selectedLang?.id === lang.id ? 'border-indigo-500 bg-indigo-500/10 ring-4 ring-indigo-500/10' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${lang.color} opacity-0 group-hover:opacity-10 transition-opacity blur-2xl`}></div>
                            <span className="text-5xl">{lang.icon}</span>
                            <span className="text-2xl font-black uppercase tracking-tight">{lang.name}</span>
                        </button>
                    ))}
                </div>

                {selectedLang && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-bottom-10 duration-700">
                        {LEVELS.map(level => (
                            <button
                                key={level.id}
                                onClick={() => setSelectedLevel(level)}
                                className={`p-10 rounded-[2.5rem] border transition-all text-left group flex flex-col justify-between h-64 ${selectedLevel?.id === level.id ? 'border-indigo-500 bg-indigo-500/10 shadow-2xl shadow-indigo-500/10' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <h4 className="text-3xl font-black uppercase tracking-tighter">{level.id}</h4>
                                        <span className="bg-slate-800 border border-slate-700 text-indigo-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">{level.count} Questions</span>
                                    </div>
                                    <p className="text-slate-400 font-medium text-lg leading-snug">{level.desc}</p>
                                </div>
                                <div className={`h-1 w-full bg-slate-800 rounded-full mt-6 overflow-hidden`}>
                                    <div className={`h-full bg-indigo-500 transition-all duration-1000 ${selectedLevel?.id === level.id ? 'w-full' : 'w-0'}`}></div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {selectedLevel && (
                    <div className="flex justify-center pt-10">
                        <button onClick={startQuiz} className="group bg-indigo-600 hover:bg-indigo-700 text-white text-2xl font-black px-20 py-6 rounded-3xl shadow-2xl shadow-indigo-600/40 hover:scale-110 transition-all flex items-center gap-4 uppercase tracking-[0.2em]">
                            Launch <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    const QuizView = () => {
        const q = quizData[currentQuestion];
        const progress = ((currentQuestion + 1) / quizData.length) * 100;

        return (
            <div className="min-h-[calc(100vh-72px)] bg-slate-950 p-4 md:p-12 flex flex-col items-center">
                <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col relative">

                    <div className="p-10 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className="bg-indigo-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
                                {selectedLang.name}
                            </div>
                            <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                            <span className="text-slate-400 font-black uppercase text-xs tracking-widest">
                                Mission {currentQuestion + 1} of {quizData.length}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-white font-mono text-2xl bg-black px-6 py-3 rounded-2xl border border-slate-800 shadow-inner">
                            <Clock className="w-6 h-6 text-indigo-400" />
                            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                        </div>
                    </div>

                    <div className="h-2 w-full bg-slate-800">
                        <div className="h-full bg-gradient-to-r from-indigo-600 to-cyan-400 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                    </div>

                    <div className="p-16 flex-1 bg-gradient-to-b from-slate-900 to-slate-950">
                        <h3 className="text-4xl font-bold text-white mb-16 leading-tight max-w-4xl">{q.text}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {q.options.map((opt, i) => {
                                const label = String.fromCharCode(65 + i);
                                const isSelected = userAnswers[currentQuestion] === label;
                                return (
                                    <button
                                        key={label}
                                        onClick={() => setUserAnswers({ ...userAnswers, [currentQuestion]: label })}
                                        className={`group flex items-center gap-6 p-8 rounded-3xl border transition-all text-left relative ${isSelected ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-xl shadow-indigo-500/5' : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-600 hover:bg-slate-900'}`}
                                    >
                                        <span className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg transition-colors ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 group-hover:bg-slate-700'}`}>
                                            {label}
                                        </span>
                                        <span className="text-xl font-bold leading-tight">{opt}</span>
                                        {isSelected && <div className="absolute top-4 right-4 text-indigo-500"><CheckCircle2 className="w-6 h-6" /></div>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="p-10 border-t border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-xl">
                        <button
                            disabled={currentQuestion === 0}
                            onClick={() => setCurrentQuestion(prev => prev - 1)}
                            className="text-slate-500 font-black px-10 py-4 hover:text-white transition-colors disabled:opacity-0 uppercase tracking-widest"
                        >
                            Previous
                        </button>
                        <div className="flex gap-4">
                            {currentQuestion === quizData.length - 1 ? (
                                <button onClick={finishQuiz} className="bg-indigo-600 hover:bg-indigo-700 px-16 py-5 rounded-2xl font-black text-white shadow-xl shadow-indigo-600/30 uppercase tracking-[0.2em] transition-transform active:scale-95">Complete Mission</button>
                            ) : (
                                <button onClick={() => setCurrentQuestion(prev => prev + 1)} className="bg-slate-800 hover:bg-slate-700 px-16 py-5 rounded-2xl font-black text-white transition-all uppercase tracking-[0.2em]">Next Question</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const DashboardView = () => {
        const stats = useMemo(() => {
            const scores = history.map(h => (h.score / (h.totalQuestions || 1)) * 100);
            return {
                avg: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
                high: scores.length ? Math.round(Math.max(...scores)) : 0,
                low: scores.length ? Math.round(Math.min(...scores)) : 0,
                count: history.length
            };
        }, [history]);

        return (
            <div className="min-h-[calc(100vh-72px)] bg-slate-950 p-6 md:p-16 text-white">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-slate-800 pb-12">
                        <div>
                            <h2 className="text-6xl font-black tracking-tighter uppercase">Operations Center</h2>
                            <p className="text-slate-500 mt-4 text-lg font-medium">Real-time developer proficiency and historical analytics.</p>
                        </div>
                        <button onClick={() => setView('selection')} className="bg-indigo-600 px-10 py-5 rounded-2xl font-black shadow-2xl shadow-indigo-600/20 uppercase tracking-widest active:scale-95 transition-all">New Assessment</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <StatCard icon={<Trophy />} label="Peak Performance" val={`${stats.high}%`} color="text-indigo-400" bg="bg-indigo-400/10" />
                        <StatCard icon={<BarChart3 />} label="Avg. Accuracy" val={`${stats.avg}%`} color="text-cyan-400" bg="bg-cyan-400/10" />
                        <StatCard icon={<ShieldCheck />} label="Floor Level" val={`${stats.low}%`} color="text-rose-400" bg="bg-rose-400/10" />
                        <StatCard icon={<Clock />} label="Total Deployments" val={stats.count} color="text-emerald-400" bg="bg-emerald-400/10" />
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
                        <div className="p-10 border-b border-slate-800 flex items-center justify-between">
                            <h3 className="text-2xl font-black uppercase tracking-widest flex items-center gap-4">
                                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                                Mission History
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-950/50 text-slate-500 text-xs font-black uppercase tracking-[0.2em]">
                                    <tr>
                                        <th className="p-8">Technology Stack</th>
                                        <th className="p-8">Intensity</th>
                                        <th className="p-8">Efficiency</th>
                                        <th className="p-8">Duration</th>
                                        <th className="p-8 text-right">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {history.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-indigo-600/5 transition-colors group">
                                            <td className="p-8 font-black text-xl group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{row.quizTitle || 'Unknown Protocol'}</td>
                                            <td className="p-8">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border bg-indigo-500/10 text-indigo-400 border-indigo-500/20`}>
                                                    SECURE
                                                </span>
                                            </td>
                                            <td className="p-8">
                                                <div className="flex flex-col">
                                                    <span className="font-black text-white text-lg">{row.score} / {row.totalQuestions}</span>
                                                    <div className="w-24 h-1 bg-slate-800 rounded-full mt-2">
                                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(row.score / row.totalQuestions) * 100}%` }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-8 font-mono text-slate-400">{Math.floor(row.timeSpent / 60)}m {(row.timeSpent % 60)}s</td>
                                            <td className="p-8 text-slate-500 text-sm font-bold text-right">{new Date(row.takenAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const StatCard = ({ icon, label, val, color, bg }) => (
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] flex flex-col items-center text-center group hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/5">
            <div className={`p-6 rounded-3xl ${bg} ${color} mb-6 group-hover:scale-110 transition-transform`}>{icon}</div>
            <span className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2">{label}</span>
            <span className="text-5xl font-black tracking-tighter">{val}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-indigo-500/30">
            <Navbar />
            <main className="transition-all duration-700 ease-in-out">
                {view === 'landing' && <LandingView />}
                {(view === 'login' || view === 'signup') && (
                    <div className="min-h-[calc(100vh-72px)] bg-slate-950 flex items-center justify-center p-6 text-white relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]"></div>
                        <div className="bg-slate-900 border border-slate-800 p-12 md:p-16 rounded-[3.5rem] w-full max-w-xl relative z-10 shadow-2xl">
                            <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter">{view === 'login' ? 'Welcome Back' : 'Join the Elite'}</h2>
                            <p className="text-slate-500 mb-12 font-medium text-lg">Secure your developer profile to begin assessments.</p>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-top-2">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm font-bold">{error}</p>
                                </div>
                            )}

                            <div className="space-y-6">
                                {view === 'signup' && (
                                    <div className="space-y-2">
                                        <label className="text-slate-400 text-xs font-black uppercase tracking-widest ml-4">Full Username</label>
                                        <input
                                            type="text"
                                            value={authData.username}
                                            onChange={(e) => setAuthData({ ...authData, username: e.target.value })}
                                            placeholder="GHOST_DEV_99"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-8 py-5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-lg"
                                        />
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <label className="text-slate-400 text-xs font-black uppercase tracking-widest ml-4">Email Address</label>
                                    <input
                                        type="email"
                                        value={authData.email}
                                        onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                                        placeholder="admin@krit.io"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-8 py-5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-slate-400 text-xs font-black uppercase tracking-widest ml-4">Password</label>
                                    <input
                                        type="password"
                                        value={authData.password}
                                        onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                                        placeholder="••••••••"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-8 py-5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-lg"
                                    />
                                </div>
                                <button
                                    onClick={() => handleAuth(view)}
                                    disabled={loading}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 py-6 rounded-2xl font-black shadow-2xl shadow-indigo-600/20 uppercase tracking-widest mt-6 transition-transform active:scale-95 flex items-center justify-center gap-3"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : 'Establish Connection'}
                                </button>
                                <p className="text-center text-slate-500 font-bold mt-8">
                                    {view === 'login' ? "New here?" : "Already ranked?"}
                                    <button onClick={() => setView(view === 'login' ? 'signup' : 'login')} className="text-indigo-400 ml-2 hover:underline font-bold">
                                        {view === 'login' ? "Create account" : "Sign in"}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {view === 'selection' && <SelectionView />}
                {view === 'quiz' && <QuizView />}
                {view === 'dashboard' && <DashboardView />}
                {view === 'result' && (
                    <div className="min-h-[calc(100vh-72px)] bg-slate-950 flex items-center justify-center p-6 text-white text-center">
                        <div className="bg-slate-900 border border-slate-800 p-16 rounded-[4rem] max-w-xl w-full shadow-2xl relative">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-indigo-600 p-8 rounded-full shadow-2xl shadow-indigo-600/40">
                                <Trophy className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter mt-8">Assessment Complete</h2>
                            <p className="text-slate-500 mb-12 font-medium text-lg">Your proficiency results have been encrypted and saved to your history.</p>
                            <div className="bg-black/50 p-12 rounded-[2.5rem] mb-12 border border-slate-800 shadow-inner">
                                <span className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                                    {Math.round((history[0].score / history[0].total) * 100)}%
                                </span>
                                <div className="text-slate-500 font-black mt-4 uppercase tracking-[0.3em] text-sm">Precision Rating</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => setView('dashboard')} className="bg-indigo-600 hover:bg-indigo-700 py-6 rounded-2xl font-black uppercase tracking-widest transition-all">Review Stats</button>
                                <button onClick={() => setView('selection')} className="bg-slate-800 hover:bg-slate-700 py-6 rounded-2xl font-black uppercase tracking-widest transition-all">Next Mission</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}