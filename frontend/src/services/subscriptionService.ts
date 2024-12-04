import { api } from './api';

export type SubscriptionPlan = 'free' | 'pro' | 'enterprise';
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired';

export interface Subscription {
  id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  user: string;
}

export interface CreateSubscriptionResponse {
  subscription: Subscription;
  paymentUrl?: string; // For paid plans
}

export async function createSubscription(plan: SubscriptionPlan): Promise<CreateSubscriptionResponse> {
  try {
    const response = await api.post<CreateSubscriptionResponse>('/subscriptions', { plan });
    return response.data;
  } catch (error) {
    console.error('Create subscription error:', error);
    throw error;
  }
}

export async function getCurrentSubscription(): Promise<Subscription | null> {
  try {
    const response = await api.get<Subscription>('/subscriptions/current');
    return response.data;
  } catch (error) {
    console.error('Get current subscription error:', error);
    return null;
  }
}

export async function cancelSubscription(): Promise<void> {
  try {
    await api.post('/subscriptions/cancel');
  } catch (error) {
    console.error('Cancel subscription error:', error);
    throw error;
  }
}