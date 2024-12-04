import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import { createError } from '../utils/error.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw createError(401, 'Not authorized, no token');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      throw createError(401, 'Not authorized, token failed');
    }

    next();
  } catch (error) {
    next(error);
  }
};