import { database } from '../src/config/database.js';

describe('database connection helper', () => {
  it('exposes connect and disconnect methods', () => {
    expect(typeof database.connect).toBe('function');
    expect(typeof database.disconnect).toBe('function');
  });
});
