import { getAuthenticatedClient } from '../database/supabase';
import notificationService from './notificationService';

const MIN_PAYOUT_MNT = 50_000;
const PLATFORM_FEE_RATE = 0.2;

const CREDIT_TYPES = new Set(['sponsorship_credit', 'earning_credit', 'adjustment']);

export interface BankAccount {
  id: string;
  bank_name: string;
  account_number: string;
  account_holder_name: string;
  is_default: boolean;
  verified: boolean;
  created_at: string | null;
}

export interface WalletTransaction {
  id: string;
  type: string;
  amount_mnt: number;
  currency: string;
  status: string;
  description: string | null;
  reference_type: string | null;
  reference_id: string | null;
  bank_account_id: string | null;
  created_at: string;
}

export interface WalletSummary {
  availableBalanceMnt: number;
  pendingPayoutMnt: number;
  totalEarnedMnt: number;
  totalFeesMnt: number;
  totalPaidOutMnt: number;
  platformFeeRate: number;
  minPayoutMnt: number;
}

function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  return typeof value === 'number' ? value : parseFloat(value);
}

function maskAccountNumber(num: string): string {
  if (num.length <= 4) return num;
  return `•••• ${num.slice(-4)}`;
}

class WalletService {
  private computeBalances(transactions: WalletTransaction[]): {
    available: number;
    pendingPayout: number;
    totalEarned: number;
    totalFees: number;
    totalPaidOut: number;
  } {
    let available = 0;
    let pendingPayout = 0;
    let totalEarned = 0;
    let totalFees = 0;
    let totalPaidOut = 0;

    for (const tx of transactions) {
      const amount = toNumber(tx.amount_mnt);

      if (CREDIT_TYPES.has(tx.type) && tx.status === 'completed') {
        totalEarned += amount;
        available += amount;
      }

      if (tx.type === 'platform_fee' && tx.status === 'completed') {
        totalFees += amount;
        available -= amount;
      }

      if (tx.type === 'payout') {
        if (tx.status === 'completed') {
          totalPaidOut += amount;
          available -= amount;
        } else if (tx.status === 'pending') {
          pendingPayout += amount;
          available -= amount;
        }
      }
    }

    return {
      available: Math.max(0, available),
      pendingPayout,
      totalEarned,
      totalFees,
      totalPaidOut,
    };
  }

  public async getSummary(userId: string, accessToken: string): Promise<WalletSummary> {
    const transactions = await this.listTransactions(userId, accessToken);
    const balances = this.computeBalances(transactions);

    return {
      availableBalanceMnt: balances.available,
      pendingPayoutMnt: balances.pendingPayout,
      totalEarnedMnt: balances.totalEarned,
      totalFeesMnt: balances.totalFees,
      totalPaidOutMnt: balances.totalPaidOut,
      platformFeeRate: PLATFORM_FEE_RATE,
      minPayoutMnt: MIN_PAYOUT_MNT,
    };
  }

  public async listTransactions(
    userId: string,
    accessToken: string,
    limit = 50
  ): Promise<WalletTransaction[]> {
    const client = getAuthenticatedClient(accessToken);

    const { data, error } = await client
      .from('wallet_transactions')
      .select(
        'id, type, amount_mnt, currency, status, description, reference_type, reference_id, bank_account_id, created_at'
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to load transactions: ${error.message}`);
    }

    return (data ?? []).map((row) => ({
      id: row.id,
      type: row.type,
      amount_mnt: toNumber(row.amount_mnt),
      currency: row.currency ?? 'MNT',
      status: row.status,
      description: row.description,
      reference_type: row.reference_type,
      reference_id: row.reference_id,
      bank_account_id: row.bank_account_id,
      created_at: row.created_at,
    }));
  }

  public async listBankAccounts(userId: string, accessToken: string): Promise<BankAccount[]> {
    const client = getAuthenticatedClient(accessToken);

    const { data, error } = await client
      .from('bank_accounts')
      .select(
        'id, bank_name, account_number, account_holder_name, is_default, verified, created_at'
      )
      .eq('user_id', userId)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to load bank accounts: ${error.message}`);
    }

    return (data ?? []).map((row) => ({
      id: row.id,
      bank_name: row.bank_name,
      account_number: maskAccountNumber(row.account_number),
      account_holder_name: row.account_holder_name,
      is_default: row.is_default ?? false,
      verified: row.verified ?? false,
      created_at: row.created_at,
    }));
  }

  public async addBankAccount(
    userId: string,
    accessToken: string,
    payload: {
      bankName: string;
      accountNumber: string;
      accountHolderName: string;
      setAsDefault?: boolean;
    }
  ): Promise<BankAccount> {
    const { bankName, accountNumber, accountHolderName, setAsDefault } = payload;

    if (!bankName?.trim() || !accountNumber?.trim() || !accountHolderName?.trim()) {
      throw new Error('All bank account fields are required');
    }

    const client = getAuthenticatedClient(accessToken);

    const { data: existing } = await client
      .from('bank_accounts')
      .select('id')
      .eq('user_id', userId);

    const isFirst = !existing?.length;

    if (setAsDefault || isFirst) {
      await client
        .from('bank_accounts')
        .update({ is_default: false })
        .eq('user_id', userId);
    }

    const { data, error } = await client
      .from('bank_accounts')
      .insert({
        user_id: userId,
        bank_name: bankName.trim(),
        account_number: accountNumber.trim(),
        account_holder_name: accountHolderName.trim(),
        is_default: setAsDefault ?? isFirst,
        verified: false,
      })
      .select(
        'id, bank_name, account_number, account_holder_name, is_default, verified, created_at'
      )
      .single();

    if (error) {
      throw new Error(`Failed to add bank account: ${error.message}`);
    }

    return {
      id: data.id,
      bank_name: data.bank_name,
      account_number: maskAccountNumber(data.account_number),
      account_holder_name: data.account_holder_name,
      is_default: data.is_default ?? false,
      verified: data.verified ?? false,
      created_at: data.created_at,
    };
  }

  public async setDefaultBankAccount(
    userId: string,
    accessToken: string,
    bankAccountId: string
  ): Promise<void> {
    const client = getAuthenticatedClient(accessToken);

    const { data: account } = await client
      .from('bank_accounts')
      .select('id')
      .eq('id', bankAccountId)
      .eq('user_id', userId)
      .single();

    if (!account) {
      throw new Error('Bank account not found');
    }

    await client.from('bank_accounts').update({ is_default: false }).eq('user_id', userId);

    const { error } = await client
      .from('bank_accounts')
      .update({ is_default: true })
      .eq('id', bankAccountId)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Failed to set default account: ${error.message}`);
    }
  }

  public async requestPayout(
    userId: string,
    accessToken: string,
    amountMnt: number,
    bankAccountId: string
  ): Promise<WalletTransaction> {
    if (!amountMnt || amountMnt < MIN_PAYOUT_MNT) {
      throw new Error(`Minimum payout is ${MIN_PAYOUT_MNT.toLocaleString()} MNT`);
    }

    const client = getAuthenticatedClient(accessToken);

    const { data: bankAccount } = await client
      .from('bank_accounts')
      .select('id, bank_name, account_number')
      .eq('id', bankAccountId)
      .eq('user_id', userId)
      .single();

    if (!bankAccount) {
      throw new Error('Bank account not found');
    }

    const summary = await this.getSummary(userId, accessToken);

    if (amountMnt > summary.availableBalanceMnt) {
      throw new Error('Insufficient wallet balance');
    }

    const { data, error } = await client
      .from('wallet_transactions')
      .insert({
        user_id: userId,
        type: 'payout',
        amount_mnt: amountMnt,
        currency: 'MNT',
        status: 'pending',
        description: `Payout to ${bankAccount.bank_name} ${maskAccountNumber(bankAccount.account_number)}`,
        reference_type: 'bank_payout',
        bank_account_id: bankAccountId,
      })
      .select(
        'id, type, amount_mnt, currency, status, description, reference_type, reference_id, bank_account_id, created_at'
      )
      .single();

    if (error) {
      throw new Error(`Failed to request payout: ${error.message}`);
    }

    await notificationService.notifyPayoutRequested(userId, amountMnt);

    return {
      id: data.id,
      type: data.type,
      amount_mnt: toNumber(data.amount_mnt),
      currency: data.currency ?? 'MNT',
      status: data.status,
      description: data.description,
      reference_type: data.reference_type,
      reference_id: data.reference_id,
      bank_account_id: data.bank_account_id,
      created_at: data.created_at,
    };
  }
}

export default new WalletService();
