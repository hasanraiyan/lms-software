import { BaseError } from './BaseError.js';

export class RateLimitError extends BaseError {
  constructor(message = 'Too many requests') {
    super(message, {
      statusCode: 429,
      code: 'RATE_LIMITED',
      name: 'RateLimitError',
    });
  }
}

export default RateLimitError;
