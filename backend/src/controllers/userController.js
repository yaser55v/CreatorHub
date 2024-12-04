import { User } from '../models/userModel.js';
import { createError } from '../utils/error.js';
import { logger } from '../utils/logger.js';

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      throw createError(404, 'User not found');
    }
    res.json(user);
  } catch (error) {
    logger.error('Get current user error:', error);
    throw error;
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError(404, 'User not found');
    }

    user.name = req.body.name || user.name;
    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        throw createError(400, 'Email already in use');
      }
      user.email = req.body.email;
      user.verified = false;
      user.verificationToken = Math.random().toString(36).substring(2, 15);
      user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
      // TODO: Send new verification email
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      accountType: updatedUser.accountType,
      verified: updatedUser.verified
    });
  } catch (error) {
    logger.error('Update profile error:', error);
    throw error;
  }
};