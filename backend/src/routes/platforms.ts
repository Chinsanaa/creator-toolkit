import express, { Response } from 'express';
import platformService from '../services/platformService';
import { verifyToken, AuthRequest } from '../proxy/authProxy';

const router = express.Router();

router.get('/', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const accounts = await platformService.listAccounts(req.userId!, req.token!);
    res.json({ accounts });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load platforms';
    res.status(500).json({ error: message });
  }
});

router.get('/sync/history', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const history = await platformService.listSyncHistory(req.userId!, req.token!);
    res.json({ history });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load history';
    res.status(500).json({ error: message });
  }
});

router.post('/connect', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { platform, platformUsername } = req.body;
    const account = await platformService.connect(
      req.userId!,
      req.token!,
      platform,
      platformUsername
    );
    res.status(201).json({ account });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to connect';
    res.status(400).json({ error: message });
  }
});

router.post('/:id/sync', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await platformService.syncAccount(
      req.userId!,
      req.token!,
      String(req.params.id)
    );
    res.json({ message: 'Sync completed', ...result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Sync failed';
    res.status(400).json({ error: message });
  }
});

export default router;
