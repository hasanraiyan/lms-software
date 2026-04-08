import { inMemoryRateLimitStore } from '../repositories/rateLimiter.repository.js';
import { RateLimitError } from '../utils/errors/RateLimitError.js';

export class RateLimiterService {
  constructor(store = inMemoryRateLimitStore) {
    this.store = store;
  }

  /**
   * Consumes one token for the given key in the provided window.
   * Throws RateLimitError when the limit is exceeded.
   */
  async consume(key, { windowMs, max }) {
    const { totalHits, resetAt } = await this.store.increment(key, windowMs);
    const remaining = Math.max(0, max - totalHits);

    if (totalHits > max) {
      const error = new RateLimitError();
      // Attach resetAt so middleware can compute Retry-After
      error.resetAt = resetAt;
      throw error;
    }

    return {
      key,
      limit: max,
      totalHits,
      remaining,
      resetAt,
    };
  }
}

export const rateLimiterService = new RateLimiterService();

export default rateLimiterService;
