import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const VERSION = 'v1';

function toBase64Url(buffer) {
  return buffer.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function fromBase64Url(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64');
}

function getKeysFromEnv() {
  const raw = process.env.DB_ENCRYPTION_KEYS;
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
  } catch (e) {
    // ignore parse errors, treat as no keys
  }

  return {};
}

function getKeyById(keyId) {
  const keys = getKeysFromEnv();
  const keyB64 = keys[keyId];
  if (!keyB64) {
    return null;
  }

  const key = Buffer.from(keyB64, 'base64');
  if (key.length !== 32) {
    throw new Error('Encryption key must be 32 bytes for AES-256-GCM');
  }

  return key;
}

function getActiveKey() {
  const activeKeyId = process.env.DB_ENCRYPTION_ACTIVE_KEY_ID;
  if (!activeKeyId) {
    throw new Error('DB_ENCRYPTION_ACTIVE_KEY_ID is not set');
  }

  const key = getKeyById(activeKeyId);
  if (!key) {
    throw new Error(`Active encryption key '${activeKeyId}' not found in DB_ENCRYPTION_KEYS`);
  }

  return { keyId: activeKeyId, key };
}

export function encrypt(plaintext) {
  if (plaintext == null) {
    return plaintext;
  }

  const { keyId, key } = getActiveKey();

  const iv = crypto.randomBytes(12); // recommended size for GCM
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const ciphertext = Buffer.concat([cipher.update(String(plaintext), 'utf8'), cipher.final()]);

  const tag = cipher.getAuthTag();

  const ivPart = toBase64Url(iv);
  const tagPart = toBase64Url(tag);
  const cipherPart = toBase64Url(ciphertext);

  return `enc:${VERSION}:${keyId}:${ivPart}:${tagPart}:${cipherPart}`;
}

export function decrypt(token) {
  if (token == null) {
    return token;
  }

  if (typeof token !== 'string' || !token.startsWith('enc:')) {
    throw new Error('Invalid encrypted token format');
  }

  const parts = token.split(':');
  if (parts.length !== 6) {
    throw new Error('Invalid encrypted token structure');
  }

  const [, version, keyId, ivPart, tagPart, cipherPart] = parts;

  if (version !== VERSION) {
    throw new Error(`Unsupported encryption version '${version}'`);
  }

  const key = getKeyById(keyId);
  if (!key) {
    throw new Error(`Encryption key '${keyId}' not found`);
  }

  const iv = fromBase64Url(ivPart);
  const tag = fromBase64Url(tagPart);
  const ciphertext = fromBase64Url(cipherPart);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  const plaintextBuffer = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

  return plaintextBuffer.toString('utf8');
}

export function needsReencryption(token) {
  if (typeof token !== 'string' || !token.startsWith('enc:')) {
    return false;
  }

  const parts = token.split(':');
  if (parts.length !== 6) {
    return false;
  }

  const [, version, keyId] = parts;
  if (version !== VERSION) {
    return false;
  }

  const activeKeyId = process.env.DB_ENCRYPTION_ACTIVE_KEY_ID;

  if (!activeKeyId) {
    return false;
  }

  return keyId !== activeKeyId;
}

export default {
  encrypt,
  decrypt,
  needsReencryption,
};
