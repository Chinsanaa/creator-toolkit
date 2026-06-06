import express, { Response } from 'express';
import platformService from '../services/platformService';

const router = express.Router();

router.post('/cron', async (req, res: Response) => {
  const secret = process.env.SYNC_CRON_SECRET;
  const header = req.headers['x-cron-secret'];

  if (!secret || header !== secret) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const result = await platformService.runScheduledSyncAll();
    res.json({ message: 'Cron sync completed', ...result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Cron sync failed';
    res.status(500).json({ error: message });
  }
});

export default router;
