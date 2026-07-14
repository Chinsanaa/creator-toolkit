import express, { Response } from 'express';
import walletService from '../services/walletService';
import { verifyToken, AuthRequest } from '../proxy/authProxy';
import { isValidUuid, parsePositiveInt, trimString } from '../utils/validate';
import { safeErrorMessage } from '../utils/safeErrorMessage';

const router = express.Router();

router.get('/summary', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const summary = await walletService.getSummary(req.userId!, req.token!);
    res.json(summary);
  } catch (error: unknown) {
    res.status(500).json({ error: safeErrorMessage(error, 'Failed to load wallet') });
  }
});

router.get('/transactions', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const limit = parsePositiveInt(req.query.limit, { min: 1, max: 100 }) ?? undefined;
    const offset = parsePositiveInt(req.query.offset, { min: 0, max: 1_000_000 }) ?? 0;
    const { items, hasMore, nextOffset } = await walletService.listTransactions(
      req.userId!,
      req.token!,
      { limit, offset }
    );
    res.json({ transactions: items, hasMore, nextOffset });
  } catch (error: unknown) {
    res.status(500).json({ error: safeErrorMessage(error, 'Failed to load transactions') });
  }
});

router.get('/bank-accounts', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const accounts = await walletService.listBankAccounts(req.userId!, req.token!);
    res.json({ bankAccounts: accounts });
  } catch (error: unknown) {
    res.status(500).json({ error: safeErrorMessage(error, 'Failed to load bank accounts') });
  }
});

router.post('/bank-accounts', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const bankName = trimString(req.body?.bankName, 120);
    const accountNumber = trimString(req.body?.accountNumber, 32);
    const accountHolderName = trimString(req.body?.accountHolderName, 120);

    if (!bankName || !accountNumber || !accountHolderName) {
      res.status(400).json({ error: 'Invalid bank account details' });
      return;
    }

    const account = await walletService.addBankAccount(req.userId!, req.token!, {
      bankName,
      accountNumber,
      accountHolderName,
      setAsDefault: req.body?.setAsDefault === true,
    });
    res.status(201).json({ bankAccount: account });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to add bank account';
    res.status(400).json({ error: message });
  }
});

router.patch(
  '/bank-accounts/:id/default',
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const bankAccountId = String(req.params.id);
      if (!isValidUuid(bankAccountId)) {
        res.status(400).json({ error: 'Invalid bank account id' });
        return;
      }

      await walletService.setDefaultBankAccount(
        req.userId!,
        req.token!,
        bankAccountId
      );
      res.json({ message: 'Default bank account updated' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update account';
      res.status(400).json({ error: message });
    }
  }
);

router.post('/payouts', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const amountMnt = parsePositiveInt(req.body?.amountMnt, { min: 50_000, max: 100_000_000 });
    const bankAccountId = trimString(req.body?.bankAccountId, 64);

    if (!amountMnt || !bankAccountId || !isValidUuid(bankAccountId)) {
      res.status(400).json({ error: 'Invalid payout request' });
      return;
    }

    const payout = await walletService.requestPayout(
      req.userId!,
      req.token!,
      amountMnt,
      bankAccountId
    );
    res.status(201).json({
      message: 'Payout requested. Transfers typically complete in 1–3 business days.',
      transaction: payout,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to request payout';
    res.status(400).json({ error: message });
  }
});

export default router;
