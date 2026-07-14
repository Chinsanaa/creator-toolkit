import { apiFetch } from './client';
import type { BankAccount, WalletSummary, WalletTransaction } from '@/lib/types/wallet';
import type { Page } from '@/lib/types/pagination';

export async function getWalletSummary(): Promise<WalletSummary> {
  return apiFetch<WalletSummary>('/api/wallet/summary');
}

export async function getWalletTransactions(
  options: { limit?: number; offset?: number } = {}
): Promise<Page<WalletTransaction>> {
  const params = new URLSearchParams();
  if (options.limit != null) params.set('limit', String(options.limit));
  if (options.offset != null) params.set('offset', String(options.offset));
  const query = params.toString();
  const data = await apiFetch<{
    transactions: WalletTransaction[];
    hasMore: boolean;
    nextOffset: number;
  }>(`/api/wallet/transactions${query ? `?${query}` : ''}`);
  return { items: data.transactions, hasMore: data.hasMore, nextOffset: data.nextOffset };
}

export async function getBankAccounts(): Promise<BankAccount[]> {
  const data = await apiFetch<{ bankAccounts: BankAccount[] }>('/api/wallet/bank-accounts');
  return data.bankAccounts;
}

export async function addBankAccount(payload: {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  setAsDefault?: boolean;
}): Promise<BankAccount> {
  const data = await apiFetch<{ bankAccount: BankAccount }>('/api/wallet/bank-accounts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.bankAccount;
}

export async function setDefaultBankAccount(id: string): Promise<void> {
  await apiFetch(`/api/wallet/bank-accounts/${id}/default`, { method: 'PATCH' });
}

export async function requestPayout(
  amountMnt: number,
  bankAccountId: string
): Promise<{ message: string; transaction: WalletTransaction }> {
  return apiFetch('/api/wallet/payouts', {
    method: 'POST',
    body: JSON.stringify({ amountMnt, bankAccountId }),
  });
}
