import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';
import sponsorshipRoutes from './routes/sponsorships';
import walletRoutes from './routes/wallet';
import sponsorRoutes from './routes/sponsor';
import platformRoutes from './routes/platforms';
import notificationRoutes from './routes/notifications';
import syncRoutes from './routes/sync';
import { getHealthStatus } from './routes/health';
import type { EnvConfig } from './config/env';
import { AppError } from './utils/AppError';

export function createApp(config: EnvConfig): express.Application {
  const app = express();

  app.use(
    cors({
      origin: config.frontendUrl,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  app.get('/api/health', async (_req, res) => {
    const health = await getHealthStatus(config.port);
    res.status(health.status === 'ok' ? 200 : 503).json(health);
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/dashboard', dashboardRoutes);
  app.use('/api/sponsorships', sponsorshipRoutes);
  app.use('/api/wallet', walletRoutes);
  app.use('/api/sponsor', sponsorRoutes);
  app.use('/api/platforms', platformRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/sync', syncRoutes);

  app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({
        error: { status: err.statusCode, message: err.message, code: err.code },
      });
      return;
    }
    console.error('Error:', err);
    res.status(500).json({
      error: { status: 500, message: 'Something went wrong. Please try again.' },
    });
  });

  return app;
}
