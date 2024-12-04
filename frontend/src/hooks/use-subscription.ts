import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  createSubscription,
  getCurrentSubscription,
  cancelSubscription,
  type Subscription,
  type SubscriptionPlan
} from '@/services/subscriptionService';

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      const currentSubscription = await getCurrentSubscription();
      setSubscription(currentSubscription);
    } catch (err) {
      setError('Failed to load subscription');
      toast({
        title: 'Error',
        description: 'Failed to load subscription details',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async (plan: SubscriptionPlan) => {
    try {
      setLoading(true);
      const response = await createSubscription(plan);
      setSubscription(response.subscription);
      
      // If there's a payment URL, redirect to it
      if (response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        toast({
          title: 'Success',
          description: `Successfully subscribed to ${plan} plan`,
        });
      }
      
      return response;
    } catch (err) {
      setError('Failed to create subscription');
      toast({
        title: 'Error',
        description: 'Failed to create subscription',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancel = async () => {
    try {
      setLoading(true);
      await cancelSubscription();
      await loadSubscription(); // Reload subscription after cancellation
      toast({
        title: 'Success',
        description: 'Subscription cancelled successfully',
      });
    } catch (err) {
      setError('Failed to cancel subscription');
      toast({
        title: 'Error',
        description: 'Failed to cancel subscription',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    subscription,
    loading,
    error,
    subscribe,
    cancel,
    refresh: loadSubscription,
  };
}