import { Subscription } from '../models/subscriptionModel.js';
import { createError } from '../utils/error.js';
import { logger } from '../utils/logger.js';

export const createSubscription = async (req, res) => {
  try {
    const { plan } = req.body;
    
    // Calculate end date (30 days from now)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const subscription = await Subscription.create({
      user: req.user._id,
      plan,
      endDate
    });

    res.status(201).json(subscription);
  } catch (error) {
    logger.error('Create subscription error:', error);
    throw createError(500, 'Error creating subscription');
  }
};

export const getCurrentSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user._id,
      status: 'active'
    });
    
    if (!subscription) {
      return res.json({ plan: 'free' });
    }

    res.json(subscription);
  } catch (error) {
    logger.error('Get subscription error:', error);
    throw createError(500, 'Error fetching subscription');
  }
};