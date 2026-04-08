import { BaseError } from './BaseError.js';

export class NotFoundError extends BaseError {
  constructor(message = 'Resource not found') {
    super(message, {
      statusCode: 404,
      code: 'NOT_FOUND',
      name: 'NotFoundError',
    });
  }
}

export default NotFoundError;
