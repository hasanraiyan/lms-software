import { config } from './config/index.js';
import { loggerService } from './utils/logger/loggerService.js';
import { database } from './config/database.js';

export async function startServer(app) {
  if (process.env.NODE_ENV === 'test') {
    return app;
  }

  const logger = loggerService.getLogger();

  try {
    await database.connect();
    logger.info('Connected to MongoDB', { uri: config.mongoUri });
  } catch (error) {
    logger.error('Failed to connect to MongoDB', { error: error.message });
    // Exit if we cannot reach the database
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }

  const server = app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
  });

  const shutdown = async (signal) => {
    logger.info(`Received ${signal}, shutting down gracefully`);

    server.close(async () => {
      try {
        await database.disconnect();
        logger.info('Disconnected from MongoDB');
      } catch (error) {
        logger.error('Error during MongoDB disconnection', {
          error: error.message,
        });
      } finally {
        // eslint-disable-next-line no-process-exit
        process.exit(0);
      }
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  return server;
}
