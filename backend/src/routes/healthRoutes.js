import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { checkHealth } from '../controllers/healthController.js';

const router = express.Router();

router.get('/', asyncHandler(checkHealth));

export default router;