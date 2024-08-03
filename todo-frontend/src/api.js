import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api' });

export const register = (data) => API.post('/register', data);
export const login = (data) => API.post('/login', data);
export const createTodo = (data, token) => API.post('/todos', data, { headers: { Authorization: `Bearer ${token}` } });
export const getTodos = (token) => API.get('/todos', { headers: { Authorization: `Bearer ${token}` } });
export const updateTodo = (id, data, token) => API.put(`/todos/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteTodo = (id, token) => API.delete(`/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const getSessions = (token) => API.get('/sessions', { headers: { Authorization: `Bearer ${token}` } });
