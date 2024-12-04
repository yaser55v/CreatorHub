import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createSubscription, getCurrentSubscription } from '../controllers/subscriptionController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.use(protect); // Protect all subscription routes

router.post('/', asyncHandler(createSubscription));
router.get('/current', asyncHandler(getCurrentSubscription));

export default router;