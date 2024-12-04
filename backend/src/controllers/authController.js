import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import { Subscription } from '../models/subscriptionModel.js';
import { sendVerificationEmail } from '../utils/email.js';
import { logger } from '../utils/logger.js';
import { createError } from '../utils/error.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Register User
export const register = async (req, res, next) => {
  try {
    const { name, email, password, accountType } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw createError(400, 'User already exists');
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      accountType,
      verificationToken: Math.random().toString(36).substring(2, 15),
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });

    // Create free subscription
    await Subscription.create({
      user: user._id,
      plan: 'free',
      status: 'active',
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days trial
    });

    // Send verification email
    await sendVerificationEmail(user.email, user.verificationToken);

    // Generate token
    const token = generateToken(user._id);

    // Remove sensitive data
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      verified: user.verified
    };

    res.status(201).json({
      user: userResponse,
      token
    });
  } catch (error) {
    logger.error('Register error:', error);
    next(error);
  }
};

// Login User
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      throw createError(401, 'Invalid email or password');
    }

    // Generate token
    const token = generateToken(user._id);

    // Remove sensitive data
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      verified: user.verified
    };

    res.json({
      user: userResponse,
      token
    });
  } catch (error) {
    logger.error('Login error:', error);
    next(error);
  }
};

// Verify Email
export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      throw createError(400, 'Invalid or expired verification token');
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    logger.error('Email verification error:', error);
    next(error);
  }
};