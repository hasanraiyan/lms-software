class ConsoleLogger {
  info(message, meta) {
    console.info('[INFO]', new Date().toISOString(), '-', message, meta || '');
  }

  error(message, meta) {
    console.error('[ERROR]', new Date().toISOString(), '-', message, meta || '');
  }

  warn(message, meta) {
    console.warn('[WARN]', new Date().toISOString(), '-', message, meta || '');
  }

  debug(message, meta) {
    if (process.env.DEBUG || process.env.NODE_ENV === 'development') {
      console.debug('[DEBUG]', new Date().toISOString(), '-', message, meta || '');
    }
  }
}

class LoggerService {
  constructor() {
    this.logger = new ConsoleLogger();
  }

  setLogger(logger) {
    this.logger = logger;
  }

  getLogger() {
    return this.logger;
  }
}

export const loggerService = new LoggerService();

export default loggerService;
