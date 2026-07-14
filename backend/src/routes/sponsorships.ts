import express, { Response } from 'express';
import sponsorshipService from '../services/sponsorshipService';
import { verifyToken, AuthRequest } from '../proxy/authProxy';
import { parsePositiveInt } from '../utils/validate';

const router = express.Router();

router.get('/', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const limit = parsePositiveInt(req.query.limit, { min: 1, max: 100 }) ?? undefined;
    const offset = parsePositiveInt(req.query.offset, { min: 0, max: 1_000_000 }) ?? 0;
    const { items, hasMore, nextOffset } = await sponsorshipService.listActive(
      req.userId!,
      req.token!,
      { limit, offset }
    );
    res.json({ sponsorships: items, hasMore, nextOffset });
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

router.post('/apply', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { sponsorshipId, responseText } = req.body as {
      sponsorshipId?: string;
      responseText?: string;
    };

    if (!sponsorshipId?.trim()) {
      res.status(400).json({ error: 'sponsorshipId is required' });
      return;
    }

    const result = await sponsorshipService.apply(
      sponsorshipId,
      req.userId!,
      req.token!,
      responseText ?? ''
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

router.patch('/applications/:id/deliverable', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { deliverableUrl } = req.body as { deliverableUrl?: string };
    const result = await sponsorshipService.submitDeliverable(
      String(req.params.id),
      req.userId!,
      req.token!,
      deliverableUrl ?? ''
    );
    res.json({ message: 'Deliverable submitted', application: result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to submit deliverable';
    const status = message.includes('not found') ? 404 : 400;
    res.status(status).json({ error: message });
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
