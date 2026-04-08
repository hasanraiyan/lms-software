/**
 * Simple in-memory store for rate limiting.
 * Can later be replaced by Redis or another backend.
 */
export class InMemoryRateLimitStore {
  constructor() {
    this.hits = new Map();
  }

  /**
   * Increments the hit counter for a key within a window.
   * @param {string} key
   * @param {number} windowMs
   * @returns {Promise<{ totalHits: number, resetAt: number }>}
   */
  async increment(key, windowMs) {
    const now = Date.now();
    const existing = this.hits.get(key);

    if (!existing || existing.resetAt <= now) {
      const resetAt = now + windowMs;
      const entry = { count: 1, resetAt };
      this.hits.set(key, entry);
      return { totalHits: 1, resetAt };
    }

    existing.count += 1;
    this.hits.set(key, existing);
    return { totalHits: existing.count, resetAt: existing.resetAt };
  }

  async resetKey(key) {
    this.hits.delete(key);
  }

  clear() {
    this.hits.clear();
  }
}

export const inMemoryRateLimitStore = new InMemoryRateLimitStore();

export default inMemoryRateLimitStore;
