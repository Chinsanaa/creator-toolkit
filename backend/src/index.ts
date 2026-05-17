import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables
import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';
import sponsorshipRoutes from './routes/sponsorships';
import walletRoutes from './routes/wallet';
import sponsorRoutes from './routes/sponsor';
import platformRoutes from './routes/platforms';
import notificationRoutes from './routes/notifications';
import syncRoutes from './routes/sync';
import { startSyncScheduler } from './jobs/syncScheduler';
import { warnIfMissingServiceRoleKey } from './database/supabase';

warnIfMissingServiceRoleKey();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    port: PORT,
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/sponsorships', sponsorshipRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/sponsor', sponsorRoutes);
app.use('/api/platforms', platformRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/sync', syncRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/api/health`);
  console.log(`✓ Auth routes: http://localhost:${PORT}/api/auth/signup`);
  console.log(`✓ Dashboard: http://localhost:${PORT}/api/dashboard/summary`);
  console.log(`✓ Sponsorships: http://localhost:${PORT}/api/sponsorships`);
  console.log(`✓ Wallet: http://localhost:${PORT}/api/wallet/summary`);
  console.log(`✓ Sponsor: http://localhost:${PORT}/api/sponsor/dashboard`);
  console.log(`✓ Platforms: http://localhost:${PORT}/api/platforms`);
  console.log(`✓ Notifications: http://localhost:${PORT}/api/notifications`);
  startSyncScheduler();
});