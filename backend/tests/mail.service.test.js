import { generateBasicEmail } from '../src/services/mail.service.js';

describe('mail.service', () => {
  it('generates basic email html', () => {
    const html = generateBasicEmail({
      name: 'Test User',
      intro: 'Welcome to the LMS',
      outro: 'Thanks for using our service',
    });

    expect(typeof html).toBe('string');
    expect(html).toContain('Welcome to the LMS');
  });
});
