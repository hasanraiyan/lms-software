import { validateSchema } from '../utils/validators/index.js';

function makeValidator(source, schema) {
  return (req, res, next) => {
    try {
      const value = validateSchema(schema, req[source]);
      req[source] = value;
      next();
    } catch (error) {
      next(error);
    }
  };
}

export function validateBody(schema) {
  return makeValidator('body', schema);
}

export function validateQuery(schema) {
  return makeValidator('query', schema);
}

export function validateParams(schema) {
  return makeValidator('params', schema);
}

export default {
  validateBody,
  validateQuery,
  validateParams,
};
