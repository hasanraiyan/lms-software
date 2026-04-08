import request from 'supertest';
import app from '../src/index.js';

describe('GET /api/v1/health', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/api/v1/health');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      success: true,
      code: 'HEALTH_OK',
      message: 'Health check OK',
    });
    expect(res.body.data).toHaveProperty('status', 'ok');
  });
});
