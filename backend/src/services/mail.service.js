import { resendClient, mailGenerator } from '../config/mail.config.js';
import { loggerService } from '../utils/logger/loggerService.js';

const logger = loggerService.getLogger();

export async function sendEmail({ to, subject, html }) {
  if (!resendClient) {
    logger.warn('Email provider not configured, skipping send', {
      to,
      subject,
    });
    return null;
  }

  const from = process.env.EMAIL_FROM || 'no-reply@example.com';

  const result = await resendClient.emails.send({
    from,
    to,
    subject,
    html,
  });

  return result;
}

export function generateBasicEmail({ name, intro, outro }) {
  const email = {
    body: {
      name,
      intro,
      outro,
    },
  };

  return mailGenerator.generate(email);
}

export default {
  sendEmail,
  generateBasicEmail,
};
