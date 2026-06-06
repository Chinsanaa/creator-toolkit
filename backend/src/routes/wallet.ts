import express, { Response } from 'express';
import walletService from '../services/walletService';
import { verifyToken, AuthRequest } from '../proxy/authProxy';

const router = express.Router();

router.get('/summary', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const summary = await walletService.getSummary(req.userId!, req.token!);
    res.json(summary);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load wallet';
    res.status(500).json({ error: message });
  }
});

router.get('/transactions', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const transactions = await walletService.listTransactions(req.userId!, req.token!);
    res.json({ transactions });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load transactions';
    res.status(500).json({ error: message });
  }
});

router.get('/bank-accounts', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const accounts = await walletService.listBankAccounts(req.userId!, req.token!);
    res.json({ bankAccounts: accounts });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load bank accounts';
    res.status(500).json({ error: message });
  }
});

router.post('/bank-accounts', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { bankName, accountNumber, accountHolderName, setAsDefault } = req.body;
    const account = await walletService.addBankAccount(req.userId!, req.token!, {
      bankName,
      accountNumber,
      accountHolderName,
      setAsDefault,
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
      await walletService.setDefaultBankAccount(
        req.userId!,
        req.token!,
        String(req.params.id)
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
    const { amountMnt, bankAccountId } = req.body;
    const payout = await walletService.requestPayout(
      req.userId!,
      req.token!,
      Number(amountMnt),
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
