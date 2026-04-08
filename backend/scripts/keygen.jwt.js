import crypto from 'crypto';

function generateSecret(bytes = 64) {
  return crypto.randomBytes(bytes).toString('hex');
}

const accessSecret = generateSecret(64);
const refreshSecret = generateSecret(64);

// eslint-disable-next-line no-console
console.log('Add these lines to your .env file:\n');
// eslint-disable-next-line no-console
console.log(`JWT_SECRET=${accessSecret}`);
// eslint-disable-next-line no-console
console.log(`JWT_REFRESH_SECRET=${refreshSecret}`);
