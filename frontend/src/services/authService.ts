import axios from 'axios';
import type { LoginCredentials, RegisterData, User } from '@/types/auth';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export async function loginUser(credentials: LoginCredentials) {
  const response = await api.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
}

export async function registerUser(data: RegisterData) {
  const response = await api.post('/auth/register', data);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get('/users/me');
  return response.data;
}

export async function updateProfile(data: Partial<User>) {
  const response = await api.put('/users/me', data);
  return response.data;
}

export async function verifyEmail(token: string) {
  const response = await api.get(`/auth/verify/${token}`);
  return response.data;
}

export async function resetPassword(email: string) {
  const response = await api.post('/auth/reset-password', { email });
  return response.data;
}

export async function checkHealth() {
  const response = await api.get('/health');
  return response.data;
}