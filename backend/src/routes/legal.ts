import express, { Response } from 'express';
import legalService, { type LegalDocumentSlug } from '../services/legalService';

const router = express.Router();

function isLegalSlug(value: string): value is LegalDocumentSlug {
  return value === 'privacy-policy' || value === 'terms-and-conditions';
}

router.get('/:slug', async (req, res: Response) => {
  const { slug } = req.params;

  if (!isLegalSlug(slug)) {
    res.status(404).json({ error: 'Legal document not found' });
    return;
  }

  try {
    const document =
      slug === 'privacy-policy'
        ? await legalService.getPrivacyPolicy()
        : await legalService.getTermsAndConditions();

    res.json({ document });
  } catch (error) {
    console.error('Legal document error:', error);
    res.status(500).json({ error: 'Failed to load legal document' });
  }
});

export default router;
