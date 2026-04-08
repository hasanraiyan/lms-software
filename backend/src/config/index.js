import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/lms',
  jwt: {
    secret: process.env.JWT_SECRET || 'change-me-in-env',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'change-me-refresh',
    accessTokenTtl: process.env.JWT_ACCESS_TTL || '15m',
    refreshTokenTtl: process.env.JWT_REFRESH_TTL || '7d',
  },
  rateLimit: {
    windowMs: 60_000,
    max: 60,
  },
  email: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    fromAddress: process.env.EMAIL_FROM || 'no-reply@example.com',
    appName: process.env.APP_NAME || 'LMS',
  },
};

export default config;
