import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { jest } from '@jest/globals';
import app from '../src/index.js';
import User from '../src/models/User.js';

let mongoServer;

describe('Auth Registration & OTP Flow Integration', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.disconnect();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    jest.clearAllMocks();
  });

  const registerData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Password123!',
    role: 'student',
  };

  it('should register a user and then verify them with OTP', async () => {
    // 1. Register User
    const regRes = await request(app)
      .post('/api/v1/auth/register')
      .send(registerData);

    expect(regRes.status).toBe(201);
    expect(regRes.body.message).toContain('User registered successfully');

    // Verify user was created in DB and has OTP
    const user = await User.findOne({ email: registerData.email });
    expect(user).toBeDefined();
    expect(user.isVerified).toBe(false);
    expect(user.otp).toBeDefined();
    expect(user.otp).toHaveLength(6);

    const otp = user.otp;

    // 2. Verify Email with Correct OTP
    const verifyRes = await request(app)
      .post('/api/v1/auth/verify-email-otp')
      .send({
        email: registerData.email,
        otp: otp,
      });

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.message).toBe('Email verified successfully');

    // Verify user is now verified in DB
    const verifiedUser = await User.findOne({ email: registerData.email });
    expect(verifiedUser.isVerified).toBe(true);
    expect(verifiedUser.otp).toBeUndefined();
  });

  it('should fail to verify with incorrect OTP', async () => {
    // 1. Register User
    await request(app)
      .post('/api/v1/auth/register')
      .send(registerData);

    // 2. Verify Email with Incorrect OTP
    const verifyRes = await request(app)
      .post('/api/v1/auth/verify-email-otp')
      .send({
        email: registerData.email,
        otp: '000000', // Incorrect OTP
      });

    expect(verifyRes.status).toBe(400);
    expect(verifyRes.body.message).toBe('Invalid or expired OTP');

    // Verify user is still not verified
    const user = await User.findOne({ email: registerData.email });
    expect(user.isVerified).toBe(false);
  });

  it('should fail to register with an existing email', async () => {
    // 1. Register first time
    await request(app)
      .post('/api/v1/auth/register')
      .send(registerData);

    // 2. Register second time with same email
    const regRes = await request(app)
      .post('/api/v1/auth/register')
      .send(registerData);

    expect(regRes.status).toBe(400);
    expect(regRes.body.message).toBe('User already exists');
  });

  it('should fail registration with invalid data (Zod validation)', async () => {
    const invalidData = {
      name: 'J', // Too short
      email: 'not-an-email',
      password: 'short',
    };

    const regRes = await request(app)
      .post('/api/v1/auth/register')
      .send(invalidData);

    expect(regRes.status).toBe(400);
    expect(regRes.body.details).toBeDefined();
  });
});
