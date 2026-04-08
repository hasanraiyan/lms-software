import express from 'express';
import request from 'supertest';

import { RATE_LIMITS } from '../src/utils/constants.js';
import { rateLimiter } from '../src/middlewares/rateLimiter.middleware.js';
import { errorHandler } from '../src/middlewares/errorHandler.js';
import { inMemoryRateLimitStore } from '../src/repositories/rateLimiter.repository.js';

describe('rateLimiter middleware', () => {
  const preset = RATE_LIMITS.TEST;

  function createApp() {
    const app = express();
    app.get('/limited', rateLimiter('test-endpoint', preset), (req, res) => {
      res.status(200).json({ ok: true });
    });
    app.use(errorHandler);
    return app;
  }

  beforeEach(() => {
    inMemoryRateLimitStore.clear();
  });

  it('allows requests within the limit', async () => {
    const app = createApp();

    const res1 = await request(app).get('/limited');
    const res2 = await request(app).get('/limited');

    expect(res1.status).toBe(200);
    expect(res2.status).toBe(200);
    expect(res2.headers['x-ratelimit-limit']).toBe(String(preset.max));
  });

  it('blocks requests exceeding the limit with 429', async () => {
    const app = createApp();

    await request(app).get('/limited');
    await request(app).get('/limited');
    const res3 = await request(app).get('/limited');

    expect(res3.status).toBe(429);
    expect(res3.headers['x-ratelimit-limit']).toBe(String(preset.max));
    expect(res3.headers['x-ratelimit-remaining']).toBe('0');
    expect(res3.headers['retry-after']).toBeDefined();
  });
});
