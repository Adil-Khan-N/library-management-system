import api from './api';

export const login = (email, password) => {
  return api.post('/api/auth/login', { email, password });
};

export const register = (name, email, password) => {
  return api.post('/api/auth/register', { name, email, password });
};

export const logout = () => {
  return api.post('/api/auth/logout');
};

export const getProfile = () => {
  return api.get('/api/member/profile');
};