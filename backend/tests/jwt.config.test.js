import { jwtConfig } from '../src/config/jwt.config.js';
import { config } from '../src/config/index.js';

describe('jwt.config', () => {
  it('re-exports jwt section from main config', () => {
    expect(jwtConfig).toBe(config.jwt);
    expect(jwtConfig).toHaveProperty('secret');
    expect(jwtConfig).toHaveProperty('refreshSecret');
  });
});
