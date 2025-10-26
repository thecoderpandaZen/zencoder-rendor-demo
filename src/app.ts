import express, { Express } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';

export function createApp(): Express {
  const app = express();

  app.use(helmet());
  app.use(compression());
  app.use(cors({ origin: config.cors.origin }));

  const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequests,
    message: 'Too many requests from this IP, please try again later.',
  });
  app.use(limiter);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/auth', authRoutes);
  app.use('/api/tasks', taskRoutes);

  app.get('/health', (_req, res) => {
    res.json({ success: true, message: 'Server is running' });
  });

  app.use((_req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
  });

  app.use(errorHandler);

  return app;
}
