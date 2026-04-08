import express from 'express';
import request from 'supertest';
import { z } from 'zod';

import { validateBody } from '../src/middlewares/validationMiddleware.js';
import { errorHandler } from '../src/middlewares/errorHandler.js';

describe('validationMiddleware', () => {
  const schema = z.object({
    name: z.string(),
  });

  function createApp() {
    const app = express();
    app.use(express.json());

    app.post('/test', validateBody(schema), (req, res) => {
      res.status(200).json({ ok: true, body: req.body });
    });

    app.use(errorHandler);

    return app;
  }

  it('allows valid requests to pass through', async () => {
    const app = createApp();

    const res = await request(app).post('/test').send({ name: 'Alice' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true, body: { name: 'Alice' } });
  });

  it('returns 400 for invalid requests', async () => {
    const app = createApp();

    const res = await request(app).post('/test').send({ wrongField: 'Bob' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.code).toBe('VALIDATION_ERROR');
    expect(res.body.message).toBe('Validation failed');
  });
});
