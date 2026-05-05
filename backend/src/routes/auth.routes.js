import { Router } from 'express';
import { login, logout, register, verifyEmailOtp } from '../controllers/authController.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { loginSchema, registerSchema, verifyEmailOtpSchema } from '../utils/validators/auth.validator.js';
import { rateLimiter } from '../middlewares/rateLimiter.middleware.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.post(
  '/register',
  rateLimiter('register', { windowMs: 60 * 1000, max: 5 }),
  validateBody(registerSchema),
  register
);

router.post(
  '/verify-email-otp',
  rateLimiter('verify-email', { windowMs: 60 * 1000, max: 5 }),
  validateBody(verifyEmailOtpSchema),
  verifyEmailOtp
);

router.post(
  '/login',
  rateLimiter('login', { windowMs: 60 * 1000, max: 10 }),
  validateBody(loginSchema),
  login
);

router.post('/logout', auth, logout);

export default router;
