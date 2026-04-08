let encrypt;
let decrypt;
let needsReencryption;

describe('encryption utils', () => {
  beforeAll(async () => {
    const key1 = Buffer.alloc(32, 1).toString('base64');
    const key2 = Buffer.alloc(32, 2).toString('base64');

    process.env.DB_ENCRYPTION_KEYS = JSON.stringify({
      key1,
      key2,
    });
    process.env.DB_ENCRYPTION_ACTIVE_KEY_ID = 'key1';

    const module = await import('../src/utils/encryption.js');
    encrypt = module.encrypt;
    decrypt = module.decrypt;
    needsReencryption = module.needsReencryption;
  });

  it('encrypts and decrypts a value correctly', () => {
    const plaintext = 'secret-value';
    const token = encrypt(plaintext);

    expect(typeof token).toBe('string');
    expect(token.startsWith('enc:')).toBe(true);

    const decrypted = decrypt(token);
    expect(decrypted).toBe(plaintext);
  });

  it('detects when a token needs re-encryption after key rotation', () => {
    const plaintext = 'rotate-me';
    const token = encrypt(plaintext);

    expect(needsReencryption(token)).toBe(false);

    process.env.DB_ENCRYPTION_ACTIVE_KEY_ID = 'key2';

    expect(needsReencryption(token)).toBe(true);
  });
});
