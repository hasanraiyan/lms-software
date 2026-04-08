import { rateLimiterService } from '../services/rateLimiter.service.js';

/**
 * Express middleware factory for per-endpoint rate limiting.
 * Example: rateLimiter('login', { windowMs: 60_000, max: 5 })
 */
export function rateLimiter(name, { windowMs, max }) {
  return async (req, res, next) => {
    const key = `${name}:${req.ip}`;

    try {
      const { limit, remaining, resetAt } = await rateLimiterService.consume(key, {
        windowMs,
        max,
      });

      res.setHeader('X-RateLimit-Limit', String(limit));
      res.setHeader('X-RateLimit-Remaining', String(remaining));
      res.setHeader('X-RateLimit-Reset', String(Math.ceil(resetAt / 1000)));

      return next();
    } catch (error) {
      if (error.code === 'RATE_LIMITED') {
        const resetAt = error.resetAt || Date.now() + windowMs;
        const retryAfter = Math.max(0, Math.ceil((resetAt - Date.now()) / 1000));

        res.setHeader('X-RateLimit-Limit', String(max));
        res.setHeader('X-RateLimit-Remaining', '0');
        res.setHeader('X-RateLimit-Reset', String(Math.ceil(resetAt / 1000)));
        res.setHeader('Retry-After', String(retryAfter));
      }

      return next(error);
    }
  };
}

export default rateLimiter;
