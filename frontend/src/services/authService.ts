import { api } from './api';
import type { LoginCredentials, RegisterData, User } from '@/types/auth';

export async function loginUser(credentials: LoginCredentials) {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Login failed';
    throw new Error(message);
  }
}

export async function registerUser(data: RegisterData) {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Registration failed';
    throw new Error(message);
  }
}

export async function getCurrentUser(): Promise<User> {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to get user data';
    throw new Error(message);
  }
}

export async function updateProfile(data: Partial<User>) {
  try {
    const response = await api.put('/users/me', data);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to update profile';
    throw new Error(message);
  }
}

export async function verifyEmail(token: string) {
  try {
    const response = await api.get(`/auth/verify/${token}`);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Email verification failed';
    throw new Error(message);
  }
}

export async function resetPassword(email: string) {
  try {
    const response = await api.post('/auth/reset-password', { email });
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Password reset failed';
    throw new Error(message);
  }
}