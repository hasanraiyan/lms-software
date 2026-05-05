import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { auth } from '../src/middlewares/auth.js';
import { login, logout, register, verifyEmailOtp } from '../src/controllers/authController.js';
import User from '../src/models/User.js';
import bcrypt from 'bcrypt';
import { config } from '../src/config/index.js';
import mailService from '../src/services/mail.service.js';

const mockRequest = (body = {}, headers = {}) => ({
  body,
  headers,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.locals = {};
  return res;
};

const mockNext = jest.fn();

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext;
  });

  it('should return 401 if no authorization header is provided', () => {
    auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Authentication required' });
  });

  it('should return 401 if header does not start with Bearer', () => {
    req.headers.authorization = 'InvalidToken';
    auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should return 401 if token is invalid or expired', () => {
    req.headers.authorization = 'Bearer badtoken';
    auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should call next and set res.locals.user if token is valid', () => {
    const payload = { id: 'user123', role: 'student' };
    const token = jwt.sign(payload, config.jwt.secret);
    
    req.headers.authorization = `Bearer ${token}`;
    
    auth(req, res, next);
    
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.locals.user.id).toBe('user123');
    expect(res.locals.user.role).toBe('student');
  });
});

describe('Auth Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext;
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should return 400 if user already exists', async () => {
      req.body = { email: 'test@example.com', name: 'Test', password: 'password123' };
      jest.spyOn(User, 'findOne').mockResolvedValue({ email: 'test@example.com' });

      await register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });

    it('should register a new user and send email', async () => {
      req.body = { email: 'new@example.com', name: 'New User', password: 'password123' };
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed_password');
      jest.spyOn(User.prototype, 'save').mockResolvedValue({});
      jest.spyOn(mailService, 'generateBasicEmail').mockReturnValue('<html>otp</html>');
      jest.spyOn(mailService, 'sendEmail').mockResolvedValue({});

      await register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully. Please check your email for the verification code.',
      });
      expect(mailService.sendEmail).toHaveBeenCalled();
    });
  });

  describe('verifyEmailOtp', () => {
    it('should return 404 if user not found', async () => {
      req.body = { email: 'notfound@example.com', otp: '123456' };
      jest.spyOn(User, 'findOne').mockResolvedValue(null);

      await verifyEmailOtp(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 400 if OTP is incorrect', async () => {
      req.body = { email: 'test@example.com', otp: 'wrong' };
      const mockUser = {
        email: 'test@example.com',
        otp: '123456',
        otpExpires: new Date(Date.now() + 10000),
        isVerified: false,
      };
      jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

      await verifyEmailOtp(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or expired OTP' });
    });

    it('should return 400 if OTP is expired', async () => {
      req.body = { email: 'test@example.com', otp: '123456' };
      const mockUser = {
        email: 'test@example.com',
        otp: '123456',
        otpExpires: new Date(Date.now() - 10000),
        isVerified: false,
      };
      jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

      await verifyEmailOtp(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or expired OTP' });
    });

    it('should verify email if OTP is correct and not expired', async () => {
      req.body = { email: 'test@example.com', otp: '123456' };
      const mockUser = {
        email: 'test@example.com',
        otp: '123456',
        otpExpires: new Date(Date.now() + 10000),
        isVerified: false,
        save: jest.fn().mockResolvedValue({}),
      };
      jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

      await verifyEmailOtp(req, res, next);

      expect(mockUser.isVerified).toBe(true);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email verified successfully' });
    });
  });

  describe('login', () => {
    it('should return 401 if user is not found', async () => {
      req.body = { email: 'test@example.com', password: 'password' };
      const findOneSpy = jest.spyOn(User, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
      
      findOneSpy.mockRestore();
    });

    it('should return 401 if password does not match', async () => {
      req.body = { email: 'test@example.com', password: 'wrongpassword' };
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        password: 'hashedpassword',
        role: 'student',
        isActive: true,
      };
      
      const findOneSpy = jest.spyOn(User, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });
      const compareSpy = jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
      
      findOneSpy.mockRestore();
      compareSpy.mockRestore();
    });

    it('should return 200 and tokens if credentials are correct', async () => {
      req.body = { email: 'test@example.com', password: 'correctpassword' };
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        password: 'hashedpassword',
        role: 'student',
        isActive: true,
      };

      const findOneSpy = jest.spyOn(User, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });
      const compareSpy = jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Login successful',
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        })
      );
      
      findOneSpy.mockRestore();
      compareSpy.mockRestore();
    });
  });

  describe('logout', () => {
    it('should return 200', async () => {
      await logout(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Logged out successfully' });
    });
  });
});
