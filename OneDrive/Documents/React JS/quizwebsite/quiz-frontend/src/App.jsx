import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  BookOpen, 
  User, 
  LogOut, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Timer, 
  LayoutDashboard,
  BrainCircuit,
  Star,
  ArrowLeft,
  Settings,
  ShieldCheck,
  Zap,
  Target,
  ExternalLink,
  Github
} from 'lucide-react';

/**
 * KRIT THEME CONSTANTS
 * Primary: #B5FF5B (Lime Green)
 * Background: #0A0A0A (Rich Black)
 * Secondary: #1A1A1A (Dark Gray)
 */

// --- MOCK DATA ---
const MOCK_QUIZZES = [
  { id: 1, title: 'Java Fundamentals', category: 'Programming', difficulty: 'Beginner', duration: 15, questions: 10, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80' },
  { id: 2, title: 'React Hooks Mastery', category: 'Frontend', difficulty: 'Intermediate', duration: 20, questions: 15, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80' },
  { id: 3, title: 'Database Design', category: 'Backend', difficulty: 'Advanced', duration: 25, questions: 12, image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&q=80' },
  { id: 4, title: 'CSS Layouts', category: 'Design', difficulty: 'Beginner', duration: 10, questions: 8, image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&q=80' },
];

const MOCK_QUESTIONS = [
  { id: 1, text: "What is the result of typeof null in JavaScript?", options: ["object", "null", "undefined", "string"], correct: 0 },
  { id: 2, text: "Which hook is used for side effects in React?", options: ["useState", "useContext", "useEffect", "useReducer"], correct: 2 },
  { id: 3, text: "What does JSX stand for?", options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Xylophone"], correct: 0 },
];

// --- SUB-COMPONENTS ---

const KritLogo = () => (
  <div className="flex items-center gap-3 group cursor-pointer select-none">
    <div className="relative w-9 h-9 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#B5FF5B] skew-x-[-12deg] group-hover:rotate-90 transition-transform duration-500 ease-in-out shadow-[0_0_15px_rgba(181,255,91,0.3)]"></div>
      <span className="relative text-black font-black italic text-2xl z-10 leading-none">K</span>
    </div>
    <span className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">Krit Quiz</span>
  </div>
);

const Navbar = ({ view, setView, user, onLogout }) => (
  <nav className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div onClick={() => setView('home')}>
        <KritLogo />
      </div>

      <div className="flex items-center gap-8">
        {user ? (
          <>
            <button 
              onClick={() => setView('dashboard')}
              className={`hidden md:flex items-center gap-2 font-black uppercase text-[10px] tracking-[0.2em] transition-all hover:translate-y-[-1px] ${view === 'dashboard' ? 'text-[#B5FF5B]' : 'text-white/40 hover:text-white'}`}
            >
              <LayoutDashboard size={14} />
              Terminal
            </button>
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <button 
              onClick={() => setView('profile')}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 border border-white/10 bg-[#1A1A1A] flex items-center justify-center text-[#B5FF5B] font-black uppercase transition-all group-hover:border-[#B5FF5B] group-hover:shadow-[0_0_10px_rgba(181,255,91,0.2)]">
                {user.username?.[0]}
              </div>
              <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{user.username}</span>
            </button>
            <button 
              onClick={onLogout}
              className="p-2 text-white/20 hover:text-red-400 transition-colors ml-2"
              title="Logout System"
            >
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setView('login')}
              className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] hover:text-[#B5FF5B] transition-colors"
            >
              Log In
            </button>
            <button 
              onClick={() => setView('register')}
              className="bg-[#B5FF5B] text-black px-8 py-3 rounded-none font-black uppercase text-[10px] tracking-[0.25em] shadow-[-4px_4px_0_0_rgba(255,255,255,0.1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[-8px_8px_0_0_rgba(255,255,255,0.2)] transition-all active:translate-x-0 active:translate-y-0"
            >
              Join System
            </button>
          </div>
        )}
      </div>
    </div>
  </nav>
);

const LandingPage = ({ setView }) => (
  <div className="min-h-[calc(100vh-84px)] bg-[#0A0A0A] text-white flex flex-col items-center justify-center relative overflow-hidden">
    {/* Grid Overlay */}
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, #B5FF5B 1px, transparent 1px), linear-gradient(to bottom, #B5FF5B 1px, transparent 1px)`, backgroundSize: '60px 60px' }}></div>
    
    <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12 animate-in fade-in slide-in-from-left-12 duration-1000">
          <div className="inline-flex items-center gap-3 border border-[#B5FF5B]/30 px-5 py-2">
            <div className="w-2 h-2 bg-[#B5FF5B] animate-pulse"></div>
            <span className="text-[#B5FF5B] text-[10px] font-black uppercase tracking-[0.4em]">v2.4 Production Ready</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.85] select-none">
            High <br />
            <span className="text-[#B5FF5B] stroke-text">Stake</span> <br />
            Testing.
          </h1>

          <p className="text-xl text-white/40 max-w-lg leading-relaxed font-medium border-l-2 border-[#B5FF5B]/20 pl-6">
            Assess technical depth across our curated libraries. Precision engineering for the modern developer.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 pt-6">
            <button 
              onClick={() => setView('register')}
              className="group relative bg-[#B5FF5B] text-black px-12 py-6 font-black uppercase text-xs tracking-[0.3em] transition-all overflow-hidden"
            >
              <span className="relative z-10">Initialize Now</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button 
              onClick={() => setView('dashboard')}
              className="border-2 border-white/10 text-white px-12 py-6 font-black uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-black hover:border-white transition-all flex items-center gap-3"
            >
              Library Browser
              <ExternalLink size={16} />
            </button>
          </div>
        </div>

        <div className="relative animate-in fade-in zoom-in duration-1000 hidden lg:block">
           <div className="absolute -top-12 -right-12 w-48 h-48 border-t-4 border-r-4 border-[#B5FF5B] opacity-20"></div>
           <div className="absolute -bottom-12 -left-12 w-48 h-48 border-b-4 border-l-4 border-[#B5FF5B] opacity-20"></div>
           <div className="relative group overflow-hidden border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&q=90" 
                className="w-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                alt="Architecture"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
           </div>
        </div>
      </div>
    </div>
    
    <style dangerouslySetInnerHTML={{ __html: `
      .stroke-text {
        -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        color: transparent;
      }
    `}} />
  </div>
);

const AuthForm = ({ type, setView, onAuth }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onAuth({ username: formData.username || formData.email.split('@')[0] });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-84px)] bg-[#0A0A0A] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-[#0F0F0F] border border-white/5 p-12 space-y-12 animate-in fade-in zoom-in-95 duration-500 relative">
        <div className="absolute top-0 right-0 w-16 h-1 bg-[#B5FF5B]"></div>
        <div className="space-y-3">
          <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">
            {type === 'login' ? 'Auth' : 'Enroll'}
          </h2>
          <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">Gateway Protocol Active</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {type === 'register' && (
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-focus-within:text-[#B5FF5B] transition-colors">Ident Tag</label>
              <input 
                required
                type="text" 
                className="w-full bg-transparent border-b-2 border-white/10 px-0 py-4 text-white focus:border-[#B5FF5B] outline-none transition-all placeholder:text-white/5 font-bold tracking-widest"
                placeholder="OPERATOR_TAG"
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
          )}
          <div className="space-y-2 group">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-focus-within:text-[#B5FF5B] transition-colors">System Email</label>
            <input 
              required
              type="email" 
              className="w-full bg-transparent border-b-2 border-white/10 px-0 py-4 text-white focus:border-[#B5FF5B] outline-none transition-all placeholder:text-white/5 font-bold tracking-widest"
              placeholder="operator@krit.co"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="space-y-2 group">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-focus-within:text-[#B5FF5B] transition-colors">Passphrase</label>
            <input 
              required
              type="password" 
              className="w-full bg-transparent border-b-2 border-white/10 px-0 py-4 text-white focus:border-[#B5FF5B] outline-none transition-all placeholder:text-white/5 font-bold tracking-widest"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <button 
            disabled={isLoading}
            className="w-full py-5 bg-[#B5FF5B] text-black font-black uppercase text-xs tracking-[0.4em] hover:shadow-[0_0_30px_rgba(181,255,91,0.4)] transition-all disabled:opacity-50 flex items-center justify-center relative overflow-hidden group"
          >
            <span className="relative z-10">{isLoading ? "Verifying..." : type === 'login' ? 'Authorize Access' : 'Register Operator'}</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform"></div>
          </button>
        </form>

        <button 
          onClick={() => setView(type === 'login' ? 'register' : 'login')}
          className="w-full text-center text-[10px] font-black text-white/20 hover:text-white transition-colors uppercase tracking-[0.3em]"
        >
          {type === 'login' ? "Initialize New Account?" : "Existing Protocol? Resume"}
        </button>
      </div>
    </div>
  );
};

const QuizCard = ({ quiz, onStart }) => (
  <div className="group bg-[#0F0F0F] border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#B5FF5B]/40 hover:-translate-y-2">
    <div className="aspect-[16/10] relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
      <img src={quiz.image} alt={quiz.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent"></div>
      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur px-3 py-1 border border-white/10">
        <span className="text-white text-[9px] font-black uppercase tracking-widest">{quiz.duration} Min</span>
      </div>
    </div>
    <div className="p-8 space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-[1px] bg-[#B5FF5B]"></div>
          <span className="text-[10px] font-black text-[#B5FF5B] uppercase tracking-[0.3em]">{quiz.category}</span>
        </div>
        <h3 className="font-black text-white text-2xl uppercase italic tracking-tighter group-hover:text-[#B5FF5B] transition-colors">{quiz.title}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-[9px] font-black text-white/30 uppercase tracking-[0.2em] pt-6 border-t border-white/5">
        <div className="flex items-center gap-2">
          <Target size={14} className="text-[#B5FF5B]" />
          <span>Tier {quiz.difficulty}</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-[#B5FF5B]" />
          <span>{quiz.questions} Nodes</span>
        </div>
      </div>

      <button 
        onClick={() => onStart(quiz)}
        className="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#B5FF5B] transition-all flex items-center justify-center gap-3 active:scale-95"
      >
        Initiate Sequence
        <ChevronRight size={14} />
      </button>
    </div>
  </div>
);

const QuizPlayer = ({ quiz, onComplete, onExit }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(quiz.duration * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    if (currentIdx < MOCK_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
    } else {
      handleFinish(newAnswers);
    }
  };

  const handleFinish = (finalAnswers = answers) => {
    const correctCount = finalAnswers.reduce((acc, ans, idx) => {
      return acc + (ans === MOCK_QUESTIONS[idx].correct ? 1 : 0);
    }, 0);
    onComplete({
      score: Math.round((correctCount / MOCK_QUESTIONS.length) * 100),
      correct: correctCount,
      total: MOCK_QUESTIONS.length
    });
  };

  const progress = ((currentIdx) / MOCK_QUESTIONS.length) * 100;
  const currentQuestion = MOCK_QUESTIONS[currentIdx];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans">
      <header className="bg-[#0F0F0F] border-b border-white/5 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={onExit} className="text-white/20 hover:text-[#B5FF5B] transition-colors p-2 border border-white/5">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="font-black uppercase italic tracking-tighter text-xl leading-none">{quiz.title}</h2>
            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mt-2">Active Node {currentIdx + 1} // System Total {MOCK_QUESTIONS.length}</p>
          </div>
        </div>
        <div className={`flex items-center gap-3 px-6 py-3 border-2 font-black text-sm tracking-[0.2em] ${timeLeft < 60 ? 'border-red-500 text-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-[#B5FF5B]/30 text-[#B5FF5B]'}`}>
          <Timer size={16} />
          {formatTime(timeLeft)}
        </div>
      </header>

      <div className="h-[4px] bg-white/5">
        <div className="h-full bg-[#B5FF5B] transition-all duration-700 ease-out shadow-[0_0_15px_#B5FF5B]" style={{ width: `${progress}%` }}></div>
      </div>

      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none text-[300px] font-black select-none italic tracking-tighter overflow-hidden whitespace-nowrap">
          SYSTEM_SCAN_00{currentIdx + 1}
        </div>
        
        <div className="w-full max-w-3xl bg-[#0F0F0F] border border-white/5 p-12 md:p-20 space-y-16 animate-in fade-in slide-in-from-bottom-12 relative z-10">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="w-12 h-[2px] bg-[#B5FF5B]"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#B5FF5B]">Data Input Source</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-[0.9] text-white">
              {currentQuestion.text}
            </h3>
          </div>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className={`group w-full p-8 text-left font-black uppercase text-xs tracking-[0.25em] border-2 transition-all flex items-center justify-between ${
                  selected === idx 
                    ? 'border-[#B5FF5B] bg-[#B5FF5B]/5 text-[#B5FF5B] shadow-[0_0_20px_rgba(181,255,91,0.1)] translate-x-2' 
                    : 'border-white/5 bg-black/40 text-white/30 hover:border-white/20 hover:text-white'
                }`}
              >
                <span>{option}</span>
                <div className={`w-6 h-6 border-2 flex items-center justify-center transition-all ${selected === idx ? 'border-[#B5FF5B] bg-[#B5FF5B]' : 'border-white/10 group-hover:border-white/40'}`}>
                  {selected === idx && <div className="w-2.5 h-2.5 bg-black rotate-45"></div>}
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-10">
            <button
              disabled={selected === null}
              onClick={handleNext}
              className="bg-white text-black px-16 py-6 font-black uppercase text-xs tracking-[0.3em] hover:bg-[#B5FF5B] disabled:opacity-10 transition-all flex items-center gap-3 relative overflow-hidden group shadow-xl"
            >
              <span className="relative z-10">{currentIdx === MOCK_QUESTIONS.length - 1 ? 'Finalize Data' : 'Execute Step'}</span>
              <ChevronRight size={20} className="relative z-10" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const QuizResults = ({ results, onDone }) => (
  <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 font-sans">
    <div className="w-full max-w-2xl bg-[#0F0F0F] border border-white/5 overflow-hidden animate-in fade-in zoom-in-95 duration-700 shadow-2xl">
      <div className="py-20 flex flex-col items-center gap-10 border-b border-white/5 bg-gradient-to-br from-[#0F0F0F] via-black to-[#0A0A0A] relative">
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#B5FF5B]/20"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#B5FF5B]/20"></div>
        
        <div className="w-28 h-28 border-4 border-[#B5FF5B] flex items-center justify-center rotate-45 shadow-[0_0_30px_rgba(181,255,91,0.3)]">
          <Trophy size={48} className="text-[#B5FF5B] -rotate-45" />
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">Execution Complete</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-[1px] bg-[#B5FF5B]"></div>
            <p className="text-[11px] font-black text-[#B5FF5B] uppercase tracking-[0.6em]">Accuracy Metrics</p>
            <div className="w-8 h-[1px] bg-[#B5FF5B]"></div>
          </div>
        </div>
        <div className="text-[160px] font-black tracking-tighter italic text-white leading-none select-none">
          {results.score}<span className="text-[#B5FF5B] text-5xl not-italic">%</span>
        </div>
      </div>
      
      <div className="p-16 space-y-12">
        <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5">
          <div className="bg-[#0F0F0F] p-8 text-center group">
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-3 group-hover:text-[#B5FF5B] transition-colors">Confirmed</p>
            <p className="text-4xl font-black text-white">{results.correct}</p>
          </div>
          <div className="bg-[#0F0F0F] p-8 text-center group">
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-3 group-hover:text-[#B5FF5B] transition-colors">Iterations</p>
            <p className="text-4xl font-black text-white">{results.total}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <button 
            onClick={onDone}
            className="flex-1 py-6 bg-[#B5FF5B] text-black font-black uppercase text-xs tracking-[0.3em] hover:shadow-[0_0_40px_rgba(181,255,91,0.3)] hover:scale-[1.02] transition-all active:scale-95"
          >
            Terminal Return
          </button>
          <button 
            className="flex-1 py-6 border-2 border-white/10 text-white/40 font-black uppercase text-xs tracking-[0.3em] hover:text-white hover:border-white transition-all flex items-center justify-center gap-3"
          >
            Export Logs
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = ({ onStartQuiz }) => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Programming', 'Frontend', 'Backend', 'Design'];

  return (
    <div className="max-w-7xl mx-auto px-8 py-20 space-y-20 bg-[#0A0A0A]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b-4 border-white/5 pb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-[2px] bg-[#B5FF5B]"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.6em] text-[#B5FF5B]">Active Inventory</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none select-none">Current<br/>Modules</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 font-black text-[10px] uppercase tracking-[0.3em] transition-all border-2 ${activeTab === tab ? 'bg-[#B5FF5B] text-black border-[#B5FF5B] shadow-[0_0_20px_rgba(181,255,91,0.2)]' : 'text-white/20 border-white/5 hover:text-white hover:border-white/20'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {MOCK_QUIZZES
          .filter(q => activeTab === 'All' || q.category === activeTab)
          .map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} onStart={onStartQuiz} />
          ))}
      </div>
    </div>
  );
};

const Profile = ({ user }) => (
  <div className="max-w-5xl mx-auto px-8 py-20 animate-in fade-in slide-in-from-bottom-12">
    <div className="bg-[#0F0F0F] border border-white/5 overflow-hidden shadow-2xl relative">
      <div className="absolute top-0 left-0 w-2 h-full bg-[#B5FF5B]"></div>
      <div className="h-56 bg-gradient-to-r from-[#111] via-[#0A0A0A] to-[#111] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(45deg, #B5FF5B, #B5FF5B 1px, transparent 1px, transparent 40px)` }}></div>
        <h2 className="text-[120px] font-black italic uppercase tracking-tighter text-white opacity-[0.03] select-none">OPERATOR_PROFILE</h2>
      </div>
      <div className="px-16 pb-20 relative">
        <div className="flex flex-col md:flex-row md:items-end gap-12 -mt-20">
          <div className="w-44 h-44 border-8 border-[#0A0A0A] bg-[#1A1A1A] flex items-center justify-center shadow-2xl group overflow-hidden">
            <div className="w-full h-full bg-[#B5FF5B] flex items-center justify-center text-black font-black text-7xl italic tracking-tighter group-hover:scale-110 transition-transform duration-500">
              {user.username?.[0]}
            </div>
          </div>
          <div className="flex-1 space-y-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="bg-white/5 text-[#B5FF5B] text-[10px] font-black uppercase tracking-[0.4em] px-3 py-1 border border-[#B5FF5B]/20">Level 4 Clearance</span>
            </div>
            <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter">{user.username}</h2>
          </div>
          <button className="flex items-center gap-4 px-10 py-5 border-2 border-white/10 text-white font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all active:scale-95">
            <Settings size={18} />
            Modify Config
          </button>
        </div>

        <div className="mt-20 grid sm:grid-cols-3 gap-px bg-white/5 border border-white/5">
          <div className="bg-[#0F0F0F] p-12 space-y-6 hover:bg-black transition-colors group">
            <div className="flex items-center gap-3 text-[#B5FF5B]">
              <Target size={24} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Efficiency</span>
            </div>
            <p className="text-7xl font-black text-white italic tracking-tighter group-hover:translate-x-2 transition-transform">88.2</p>
          </div>
          <div className="bg-[#0F0F0F] p-12 space-y-6 hover:bg-black transition-colors group">
            <div className="flex items-center gap-3 text-[#B5FF5B]">
              <Zap size={24} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Nodes Cleared</span>
            </div>
            <p className="text-7xl font-black text-white italic tracking-tighter group-hover:translate-x-2 transition-transform">24</p>
          </div>
          <div className="bg-[#0F0F0F] p-12 space-y-6 hover:bg-black transition-colors group">
            <div className="flex items-center gap-3 text-[#B5FF5B]">
              <Star size={24} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Global Rank</span>
            </div>
            <p className="text-7xl font-black text-white italic tracking-tighter group-hover:translate-x-2 transition-transform">#102</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APPLICATION ENTRY ---

export default function App() {
  const [view, setView] = useState('home'); // home, dashboard, profile, login, register, quiz, results
  const [user, setUser] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [lastResults, setLastResults] = useState(null);

  // Persistence Mock (optional for a real app)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleLogin = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  const startQuiz = (quiz) => {
    if (!user) {
      setView('login');
      return;
    }
    setActiveQuiz(quiz);
    setView('quiz');
  };

  const completeQuiz = (results) => {
    setLastResults(results);
    setView('results');
  };

  const renderView = () => {
    switch (view) {
      case 'home': return <LandingPage setView={setView} />;
      case 'dashboard': return <Dashboard onStartQuiz={startQuiz} />;
      case 'profile': return <Profile user={user} />;
      case 'login': return <AuthForm type="login" setView={setView} onAuth={handleLogin} />;
      case 'register': return <AuthForm type="register" setView={setView} onAuth={handleLogin} />;
      case 'quiz': return <QuizPlayer quiz={activeQuiz} onComplete={completeQuiz} onExit={() => setView('dashboard')} />;
      case 'results': return <QuizResults results={lastResults} onDone={() => setView('dashboard')} />;
      default: return <LandingPage setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-[#B5FF5B] selection:text-black">
      {/* Dynamic Header */}
      {view !== 'quiz' && (
        <Navbar 
          view={view} 
          setView={setView} 
          user={user} 
          onLogout={handleLogout} 
        />
      )}
      
      {/* Main Container */}
      <main className="transition-opacity duration-300">
        {renderView()}
      </main>

      {/* Industrial Footer */}
      {view !== 'quiz' && view !== 'results' && (
        <footer className="bg-[#0A0A0A] border-t border-white/5 py-32 px-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B5FF5B]/5 blur-[120px] rounded-full -mr-64 -mt-64"></div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-24 relative z-10">
            <div className="col-span-1 md:col-span-2 space-y-12">
              <KritLogo />
              <p className="text-white/20 max-w-sm text-sm font-medium leading-relaxed uppercase tracking-wider">
                Modular assessment infrastructure. Architected for peak performance and technical validation.
              </p>
              <div className="flex items-center gap-6">
                 <button className="text-white/20 hover:text-[#B5FF5B] transition-colors"><Github size={24}/></button>
                 <div className="w-px h-6 bg-white/5"></div>
                 <button className="text-white/20 hover:text-[#B5FF5B] transition-colors uppercase font-black text-[10px] tracking-widest underline decoration-[#B5FF5B]/30">Open Source Protocol</button>
              </div>
            </div>
            <div className="space-y-8">
              <h4 className="font-black text-white uppercase text-[10px] tracking-[0.5em]">Inventory</h4>
              <ul className="space-y-4 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
                <li><button onClick={() => setView('dashboard')} className="hover:text-white transition-colors">Assessment Nodes</button></li>
                <li><button className="hover:text-white transition-colors">Leaderboard</button></li>
                <li><button className="hover:text-white transition-colors">Challenges</button></li>
                <li><button className="hover:text-white transition-colors">Libraries</button></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="font-black text-white uppercase text-[10px] tracking-[0.5em]">Network</h4>
              <ul className="space-y-4 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
                <li><button className="hover:text-white transition-colors">Documentation</button></li>
                <li><button className="hover:text-white transition-colors">API Endpoint</button></li>
                <li><button className="hover:text-white transition-colors">Status Log</button></li>
                <li><button className="hover:text-white transition-colors">Security Audit</button></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black text-white/10 uppercase tracking-[0.5em]">
            <p>© 2024 KRIT_INTL_CORP // DEPLOY_ID_7492</p>
            <div className="flex items-center gap-12">
              <button className="hover:text-white transition-colors">Legal Protocol</button>
              <button className="hover:text-white transition-colors">Cookie Storage</button>
              <button className="hover:text-white transition-colors">System Policy</button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

/**
 * INSTALLATION NOTE:
 * To run this project locally, ensure you have the following installed:
 * 1. tailwindcss
 * 2. lucide-react
 * * Recommended Tailwind Theme additions in tailwind.config.js:
 * theme: {
 * extend: {
 * fontFamily: {
 * sans: ['Inter', 'system-ui', 'sans-serif'],
 * },
 * },
 * }
 */