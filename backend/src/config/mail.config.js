import Mailgen from 'mailgen';
import { Resend } from 'resend';
import { config } from './index.js';

const hasApiKey = Boolean(config.email.resendApiKey);

export const resendClient = hasApiKey ? new Resend(config.email.resendApiKey) : null;

export const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: config.email.appName,
    link: process.env.APP_BASE_URL || 'http://localhost:3000',
  },
});

export default {
  resendClient,
  mailGenerator,
};
