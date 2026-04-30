import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
  }
  return req;
});

export const login = (email, password) => API.post('/auth/login', { email, password });
export const signup = (name, email, password, role) => API.post('/auth/register', { name, email, password, role });
export const getUsers = () => API.get('/auth/users');

export const getProjects = () => API.get('/projects');
export const createProject = (projectData) => API.post('/projects', projectData);
export const getProjectById = (id) => API.get(`/projects/${id}`);

export const getTasksByProject = (projectId) => API.get(`/tasks/project/${projectId}`);
export const createTask = (taskData) => API.post('/tasks', taskData);
export const updateTaskStatus = (id, status) => API.put(`/tasks/${id}/status`, { status });
export const getMyTasks = () => API.get('/tasks/my-tasks');
export const getStats = () => API.get('/tasks/stats');
export const getAdminSummary = () => API.get('/tasks/summary/admin');
