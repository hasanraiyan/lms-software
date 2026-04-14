import { Router } from 'express';
import { login, logout } from '../controllers/authController.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { loginSchema } from '../utils/validators/auth.validator.js';
import { rateLimiter } from '../middlewares/rateLimiter.middleware.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.post(
  '/login',
  rateLimiter('login', { windowMs: 60 * 1000, max: 10 }),
  validateBody(loginSchema),
  login
);

router.post('/logout', auth, logout);

export default router;
