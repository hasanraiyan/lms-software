import crypto from 'crypto';

const KEY_ID = 'key1';

function generateKey() {
  const key = crypto.randomBytes(32); // 32 bytes for AES-256
  return key.toString('base64');
}

const keyValue = generateKey();
const keysObject = { [KEY_ID]: keyValue };

// eslint-disable-next-line no-console
console.log('Add these lines to your .env file:\n');
// eslint-disable-next-line no-console
console.log(`DB_ENCRYPTION_KEYS=${JSON.stringify(keysObject)}`);
// eslint-disable-next-line no-console
console.log(`DB_ENCRYPTION_ACTIVE_KEY_ID=${KEY_ID}`);
