import express from 'express';
import { register, login, verifyEmail } from '../controllers/authController.js';
import { validateRegistration, validateLogin } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.post('/register', validateRegistration, asyncHandler(register));
router.post('/login', validateLogin, asyncHandler(login));
router.get('/verify/:token', asyncHandler(verifyEmail));

export default router;