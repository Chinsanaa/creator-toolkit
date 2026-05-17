import express, { Response } from 'express';
import sponsorService from '../services/sponsorService';
import { verifyToken, AuthRequest } from '../proxy/authProxy';

const router = express.Router();

router.get('/dashboard', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const stats = await sponsorService.getDashboard(req.userId!, req.token!);
    res.json(stats);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load dashboard';
    const status = message.includes('Sponsor account') ? 403 : 500;
    res.status(status).json({ error: message });
  }
});

router.get('/campaigns', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const campaigns = await sponsorService.listCampaigns(req.userId!, req.token!);
    res.json({ campaigns });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load campaigns';
    const status = message.includes('Sponsor account') ? 403 : 500;
    res.status(status).json({ error: message });
  }
});

router.post('/campaigns', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const campaign = await sponsorService.createCampaign(req.userId!, req.token!, req.body);
    res.status(201).json({ campaign });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create campaign';
    const status = message.includes('Sponsor account') ? 403 : 400;
    res.status(status).json({ error: message });
  }
});

router.get('/campaigns/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await sponsorService.getCampaignApplications(
      req.userId!,
      req.token!,
      String(req.params.id)
    );
    res.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Campaign not found';
    const status = message.includes('Sponsor account') ? 403 : 404;
    res.status(status).json({ error: message });
  }
});

router.patch('/campaigns/:id/status', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    if (!['active', 'closed', 'draft'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }
    await sponsorService.updateCampaignStatus(
      req.userId!,
      req.token!,
      String(req.params.id),
      status
    );
    res.json({ message: 'Campaign updated' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update';
    res.status(400).json({ error: message });
  }
});

router.patch('/applications/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { status, sponsorNotes } = req.body;
    if (status !== 'approved' && status !== 'rejected') {
      res.status(400).json({ error: 'Status must be approved or rejected' });
      return;
    }
    const application = await sponsorService.updateApplicationStatus(
      req.userId!,
      req.token!,
      String(req.params.id),
      status,
      sponsorNotes
    );
    res.json({ message: `Application ${status}`, application });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update application';
    res.status(400).json({ error: message });
  }
});

export default router;
