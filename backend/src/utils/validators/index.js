import { ValidationError } from '../errors/ValidationError.js';

/**
 * Strictly validates data against a Zod schema and throws ValidationError on failure.
 */
export function validateSchema(schema, data, options) {
  const result = schema.safeParse(data, options);

  if (!result.success) {
    const details = result.error.format ? result.error.format() : result.error.issues;
    throw new ValidationError('Validation failed', details);
  }

  return result.data;
}

/**
 * Safely validates data, returning a result object instead of throwing.
 */
export function safeValidateSchema(schema, data, options) {
  const result = schema.safeParse(data, options);

  if (!result.success) {
    return {
      success: false,
      data: null,
      details: result.error.format ? result.error.format() : result.error.issues,
    };
  }

  return {
    success: true,
    data: result.data,
    details: null,
  };
}

/**
 * Creates a reusable validator function bound to a specific schema.
 */
export function createValidator(schema, options) {
  return function validator(data) {
    return validateSchema(schema, data, options);
  };
}

export default {
  validateSchema,
  safeValidateSchema,
  createValidator,
};
