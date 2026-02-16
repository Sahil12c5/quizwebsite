import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col justify-center items-center font-body relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">DevQuiz</h1>
                <div className="space-x-4">
                    <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition">Login</Link>
                    <Link to="/register" className="px-5 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30">Get Started</Link>
                </div>
            </div>

            <div className="text-center max-w-4xl px-6 z-10">
                <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-wide uppercase mb-6 shadow-sm">
                    Master Programming
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
                    Level Up Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Coding Skills</span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Challenge yourself with quizzes in 7 languages across 3 difficulty levels.
                    Track your progress, beat your high scores, and become a pro.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/register"
                        className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition transform"
                    >
                        Start Quiz Now
                    </Link>
                    <Link
                        to="/login"
                        className="px-8 py-4 bg-white text-gray-800 text-lg font-bold rounded-full shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition"
                    >
                        I have an account
                    </Link>
                </div>

                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
                    <div className="text-2xl font-bold text-gray-400 hover:text-indigo-500 transition cursor-default">Java</div>
                    <div className="text-2xl font-bold text-gray-400 hover:text-yellow-500 transition cursor-default">JavaScript</div>
                    <div className="text-2xl font-bold text-gray-400 hover:text-blue-500 transition cursor-default">Python</div>
                    <div className="text-2xl font-bold text-gray-400 hover:text-green-500 transition cursor-default">C++</div>
                </div>
            </div>
        </div>
    );
};

export default Home;
