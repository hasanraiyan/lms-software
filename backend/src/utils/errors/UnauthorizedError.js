import { BaseError } from './BaseError.js';

export class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized') {
    super(message, {
      statusCode: 401,
      code: 'UNAUTHORIZED',
      name: 'UnauthorizedError',
    });
  }
}

export default UnauthorizedError;
