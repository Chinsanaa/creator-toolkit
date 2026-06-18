import express, { Response } from 'express';
import dashboardService from '../services/dashboardService';
import { verifyToken, AuthRequest } from '../proxy/authProxy';
import { safeErrorMessage } from '../utils/safeErrorMessage';

const router = express.Router();

router.get('/summary', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const summary = await dashboardService.getSummary(req.userId!, req.token!);
    res.json(summary);
  } catch (error: unknown) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: safeErrorMessage(error, 'Failed to load dashboard') });
  }
});

export default router;
