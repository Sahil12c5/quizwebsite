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
  getQuizzes: (category, difficulty) => api.get('/quiz/list', { params: { category, difficulty } }),
  getQuestions: (quizId) => api.get('/quiz/questions', { params: { quizId } })
};

export const scoreService = {
  saveScore: (scoreData) => api.post('/score', scoreData),
  getHistory: (userId) => api.get('/score/history', { params: { userId } })
};

export default api;
