import express, { Response } from 'express';
import dashboardService from '../services/dashboardService';
import { verifyToken, AuthRequest } from '../proxy/authProxy';

const router = express.Router();

router.get('/summary', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const summary = await dashboardService.getSummary(req.userId!, req.token!);
    res.json(summary);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load dashboard';
    console.error('Dashboard error:', error);
    res.status(500).json({ error: message });
  }
});

export default router;
