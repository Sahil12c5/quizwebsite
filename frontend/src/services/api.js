import axios from 'axios';

const api = axios.create({
  baseURL: '/api' // Proxy will be configured in vite.config.js
});

export const authService = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout')
};

export const quizService = {
  getQuizzes: (lang, level) => api.get('/quiz', { params: { lang, level } }),
  getQuestions: (lang, level) => api.get('/quiz', { params: { lang, level } })
};

export const scoreService = {
  saveScore: (scoreData) => api.post('/scores', scoreData),
  getHistory: (userId) => api.get('/scores', { params: { userId } })
};

export default api;
