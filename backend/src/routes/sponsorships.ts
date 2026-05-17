import express, { Response } from 'express';
import sponsorshipService from '../services/sponsorshipService';
import { verifyToken, AuthRequest } from '../proxy/authProxy';

const router = express.Router();

router.get('/', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const listings = await sponsorshipService.listActive(req.userId!, req.token!);
    res.json({ sponsorships: listings });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load sponsorships';
    res.status(500).json({ error: message });
  }
});

router.get('/applications/me', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const applications = await sponsorshipService.listMyApplications(
      req.userId!,
      req.token!
    );
    res.json({ applications });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load applications';
    res.status(500).json({ error: message });
  }
});

router.get('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    const sponsorship = await sponsorshipService.getById(
      id,
      req.userId!,
      req.token!
    );
    res.json(sponsorship);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Sponsorship not found';
    res.status(404).json({ error: message });
  }
});

router.post('/:id/apply', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    const { responseText } = req.body;
    const result = await sponsorshipService.apply(
      id,
      req.userId!,
      req.token!,
      responseText
    );
    res.status(201).json({
      message: 'Application submitted',
      application: result,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to apply';
    const status = message.includes('already applied') ? 409 : 400;
    res.status(status).json({ error: message });
  }
});

export default router;
