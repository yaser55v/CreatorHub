import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export const checkHealth = async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    const healthCheck = {
      status: 'ok',
      timestamp: new Date(),
      services: {
        database: {
          status: dbStatus,
        },
        server: {
          status: 'running',
          uptime: process.uptime(),
        },
      },
    };

    res.json(healthCheck);
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({
      status: 'error',
      message: 'Health check failed',
    });
  }
};