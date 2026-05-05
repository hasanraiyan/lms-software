import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  role: z.enum(['admin', 'instructor', 'student']).optional(),
});

export const verifyEmailOtpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  otp: z.string().length(6, { message: 'OTP must be exactly 6 digits' }).regex(/^\d+$/, { message: 'OTP must only contain digits' }),
});

export default {
  loginSchema,
  registerSchema,
  verifyEmailOtpSchema,
};
