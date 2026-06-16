import express, { Response } from 'express';
import platformService from '../services/platformService';
import { secureCompareStrings } from '../utils/secureCompare';
import { safeErrorMessage } from '../utils/safeErrorMessage';

const router = express.Router();

router.post('/cron', async (req, res: Response) => {
  const secret = process.env.SYNC_CRON_SECRET;
  const header = req.headers['x-cron-secret'];

  if (
    !secret ||
    typeof header !== 'string' ||
    !secureCompareStrings(header, secret)
  ) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const result = await platformService.runScheduledSyncAll();
    res.json({ message: 'Cron sync completed', ...result });
  } catch (error: unknown) {
    res.status(500).json({ error: safeErrorMessage(error, 'Cron sync failed') });
  }
});

export default router;
