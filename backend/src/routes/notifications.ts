import express, { Response } from 'express';
import notificationService from '../services/notificationService';
import { verifyToken, AuthRequest } from '../proxy/authProxy';
import { parsePositiveInt } from '../utils/validate';

const router = express.Router();

router.get('/', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const limit = parsePositiveInt(req.query.limit, { min: 1, max: 100 }) ?? undefined;
    const offset = parsePositiveInt(req.query.offset, { min: 0, max: 1_000_000 }) ?? 0;
    const result = await notificationService.list(req.userId!, req.token!, { limit, offset });
    res.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load notifications';
    res.status(500).json({ error: message });
  }
});

router.patch('/:id/read', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    await notificationService.markRead(req.userId!, req.token!, String(req.params.id));
    res.json({ message: 'Marked as read' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update';
    res.status(400).json({ error: message });
  }
});

router.post('/read-all', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    await notificationService.markAllRead(req.userId!, req.token!);
    res.json({ message: 'All marked as read' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update';
    res.status(400).json({ error: message });
  }
});

export default router;
