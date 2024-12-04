import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { getCurrentUser, updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.use(protect); // Protect all routes in this router

router.get('/me', asyncHandler(getCurrentUser));
router.put('/me', asyncHandler(updateProfile));

export default router;