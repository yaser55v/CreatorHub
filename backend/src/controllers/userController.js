import { User } from '../models/userModel.js';
import { createError } from '../utils/error.js';
import { logger } from '../utils/logger.js';

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      throw createError(404, 'User not found');
    }

    // Format the response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      verified: user.verified
    };

    res.json(userResponse);
  } catch (error) {
    logger.error('Get current user error:', error);
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError(404, 'User not found');
    }

    // Update allowed fields
    const allowedUpdates = ['name', 'email'];
    Object.keys(req.body).forEach((update) => {
      if (allowedUpdates.includes(update)) {
        user[update] = req.body[update];
      }
    });

    // If email is being updated, require reverification
    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        throw createError(400, 'Email already in use');
      }
      user.verified = false;
      user.verificationToken = Math.random().toString(36).substring(2, 15);
      user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
      // TODO: Send new verification email
    }

    const updatedUser = await user.save();

    // Format the response
    const userResponse = {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      accountType: updatedUser.accountType,
      verified: updatedUser.verified
    };

    res.json(userResponse);
  } catch (error) {
    logger.error('Update profile error:', error);
    next(error);
  }
};