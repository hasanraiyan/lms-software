import request from 'supertest';
import app from '../src/index.js';

describe('Swagger docs', () => {
  it('serves the swagger UI endpoint', async () => {
    const res = await request(app).get('/api-docs/');

    expect(res.status).toBe(200);
    expect(res.text).toContain('Swagger UI');
  });
});
