import { BaseError } from './BaseError.js';

export class ValidationError extends BaseError {
  constructor(message = 'Validation failed', details) {
    super(message, {
      statusCode: 400,
      code: 'VALIDATION_ERROR',
      name: 'ValidationError',
    });
    this.details = details;
  }

  toJSON() {
    return { ...super.toJSON(), details: this.details };
  }
}

export default ValidationError;
