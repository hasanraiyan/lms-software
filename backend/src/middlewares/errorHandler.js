import { errorFormatter } from '../utils/formatters/errorFormatter.js';
import { loggerService } from '../utils/logger/loggerService.js';

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const logger = loggerService.getLogger();
  const statusCode = err.statusCode || 500;

  logger.error('Unhandled error', {
    statusCode,
    code: err.code,
    name: err.name,
    message: err.message,
    stack: err.stack,
  });

  const payload = errorFormatter.formatError(err, statusCode);
  res.status(statusCode).json(payload);
}

export default errorHandler;
