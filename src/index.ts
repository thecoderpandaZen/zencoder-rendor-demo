import { createApp } from './app';
import { db, testConnection } from './database';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    logger.info(`Attempting to connect to database...`);
    logger.info(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
    logger.info(`DATABASE_URL: ${process.env.DATABASE_URL_DEV ? 'Set (dev)' : process.env.DATABASE_URL ? 'Set (prod)' : 'Not set'}`);
    
    const isConnected = await testConnection();
    if (isConnected) {
      logger.info('Database connected successfully');
      try {
        await db.migrate.latest();
        logger.info('Database migrations completed');
      } catch (migrationError) {
        logger.warn('Failed to run migrations:', migrationError);
      }
    } else {
      logger.warn('Database connection failed, but continuing to start server');
    }

    const app = createApp();
    
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  await db.destroy();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  await db.destroy();
  process.exit(0);
});