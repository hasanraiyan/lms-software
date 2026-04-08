export class BaseError extends Error {
  constructor(message, { statusCode = 500, code = 'INTERNAL_ERROR', name } = {}) {
    super(message);
    this.name = name || 'BaseError';
    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace?.(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
    };
  }
}

export default BaseError;
