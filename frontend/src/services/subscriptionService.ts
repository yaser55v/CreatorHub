import { api } from './api';

export interface Subscription {
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
}

export async function createSubscription(plan: Subscription['plan']) {
  const response = await api.post('/subscriptions', { plan });
  return response.data;
}

export async function getCurrentSubscription() {
  const response = await api.get('/subscriptions/current');
  return response.data;
}