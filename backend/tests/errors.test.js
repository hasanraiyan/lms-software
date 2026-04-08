import {
  BaseError,
  ValidationError,
  NotFoundError,
  RateLimitError,
  UnauthorizedError,
  ForbiddenError,
} from '../src/utils/errors/index.js';

describe('error classes', () => {
  it('BaseError has default internal error shape', () => {
    const err = new BaseError('oops');
    expect(err.statusCode).toBe(500);
    expect(err.code).toBe('INTERNAL_ERROR');
    expect(err.name).toBe('BaseError');
  });

  it('ValidationError has 400 status and VALIDATION_ERROR code', () => {
    const err = new ValidationError();
    expect(err.statusCode).toBe(400);
    expect(err.code).toBe('VALIDATION_ERROR');
  });

  it('NotFoundError has 404 status and NOT_FOUND code', () => {
    const err = new NotFoundError();
    expect(err.statusCode).toBe(404);
    expect(err.code).toBe('NOT_FOUND');
  });

  it('RateLimitError has 429 status and RATE_LIMITED code', () => {
    const err = new RateLimitError();
    expect(err.statusCode).toBe(429);
    expect(err.code).toBe('RATE_LIMITED');
  });

  it('UnauthorizedError has 401 status and UNAUTHORIZED code', () => {
    const err = new UnauthorizedError();
    expect(err.statusCode).toBe(401);
    expect(err.code).toBe('UNAUTHORIZED');
  });

  it('ForbiddenError has 403 status and FORBIDDEN code', () => {
    const err = new ForbiddenError();
    expect(err.statusCode).toBe(403);
    expect(err.code).toBe('FORBIDDEN');
  });
});
