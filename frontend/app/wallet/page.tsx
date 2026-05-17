'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ApiError } from '@/lib/api/client';
import {
  addBankAccount,
  getBankAccounts,
  getWalletSummary,
  getWalletTransactions,
  requestPayout,
  setDefaultBankAccount,
} from '@/lib/api/wallet';
import {
  formatDate,
  formatMnt,
  transactionStatusLabel,
  transactionTypeLabel,
} from '@/lib/format';
import type { BankAccount, WalletSummary, WalletTransaction } from '@/lib/types/wallet';

const MONGOLIAN_BANKS = [
  'Khan Bank',
  'Golomt Bank',
  'Trade and Development Bank',
  'XacBank',
  'State Bank',
  'Capitron Bank',
  'Ard Credit',
];

const TX_STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300',
  completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300',
  failed: 'bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300',
};

function isCredit(type: string): boolean {
  return type === 'sponsorship_credit' || type === 'earning_credit' || type === 'adjustment';
}

export default function WalletPage() {
  const [summary, setSummary] = useState<WalletSummary | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [bankName, setBankName] = useState(MONGOLIAN_BANKS[0]);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [bankError, setBankError] = useState<string | null>(null);
  const [bankPending, setBankPending] = useState(false);

  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutBankId, setPayoutBankId] = useState('');
  const [payoutError, setPayoutError] = useState<string | null>(null);
  const [payoutSuccess, setPayoutSuccess] = useState<string | null>(null);
  const [payoutPending, setPayoutPending] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [s, tx, banks] = await Promise.all([
        getWalletSummary(),
        getWalletTransactions(),
        getBankAccounts(),
      ]);
      setSummary(s);
      setTransactions(tx);
      setBankAccounts(banks);
      const defaultBank = banks.find((b) => b.is_default) ?? banks[0];
      if (defaultBank) setPayoutBankId(defaultBank.id);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load wallet');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAddBank(e: FormEvent) {
    e.preventDefault();
    setBankError(null);
    setBankPending(true);
    try {
      await addBankAccount({
        bankName,
        accountNumber,
        accountHolderName,
        setAsDefault: bankAccounts.length === 0,
      });
      setAccountNumber('');
      await load();
    } catch (err) {
      setBankError(err instanceof ApiError ? err.message : 'Failed to add account');
    } finally {
      setBankPending(false);
    }
  }

  async function handlePayout(e: FormEvent) {
    e.preventDefault();
    setPayoutError(null);
    setPayoutSuccess(null);
    setPayoutPending(true);
    try {
      const amount = Number(payoutAmount.replace(/\D/g, ''));
      const result = await requestPayout(amount, payoutBankId);
      setPayoutSuccess(result.message);
      setPayoutAmount('');
      await load();
    } catch (err) {
      setPayoutError(err instanceof ApiError ? err.message : 'Payout failed');
    } finally {
      setPayoutPending(false);
    }
  }

  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Wallet</h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Withdraw earnings to your Mongolian bank account. Platform fee: 20% on sponsorships.
        </p>
      </div>

      {loading && <p className="text-sm text-zinc-500">Loading wallet…</p>}
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </p>
      )}

      {summary && !loading && (
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <BalanceCard label="Available to withdraw" value={formatMnt(summary.availableBalanceMnt)} highlight />
            <BalanceCard
              label="Pending payouts"
              value={formatMnt(summary.pendingPayoutMnt)}
              hint="Processing transfers"
            />
            <BalanceCard label="Total earned" value={formatMnt(summary.totalEarnedMnt)} />
            <BalanceCard
              label="Fees paid"
              value={formatMnt(summary.totalFeesMnt)}
              hint={`${(summary.platformFeeRate * 100).toFixed(0)}% on sponsorships`}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">Request payout</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Minimum {formatMnt(summary.minPayoutMnt)}. Transfers in 1–3 business days.
              </p>
              {bankAccounts.length === 0 ? (
                <p className="mt-4 text-sm text-amber-700 dark:text-amber-300">
                  Add a bank account below before requesting a payout.
                </p>
              ) : (
                <form onSubmit={handlePayout} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Amount (MNT)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                      placeholder="e.g. 500000"
                      className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Bank account
                    </label>
                    <select
                      value={payoutBankId}
                      onChange={(e) => setPayoutBankId(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                    >
                      {bankAccounts.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.bank_name} {b.account_number}
                          {b.is_default ? ' (default)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  {payoutError && <p className="text-sm text-red-600">{payoutError}</p>}
                  {payoutSuccess && (
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">{payoutSuccess}</p>
                  )}
                  <button
                    type="submit"
                    disabled={payoutPending}
                    className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
                  >
                    {payoutPending ? 'Submitting…' : 'Request payout'}
                  </button>
                </form>
              )}
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">Bank accounts</h2>
              {bankAccounts.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {bankAccounts.map((b) => (
                    <li
                      key={b.id}
                      className="flex items-center justify-between rounded-lg border border-zinc-100 px-3 py-2 text-sm dark:border-zinc-800"
                    >
                      <div>
                        <p className="font-medium">{b.bank_name}</p>
                        <p className="text-zinc-500">
                          {b.account_number} · {b.account_holder_name}
                        </p>
                      </div>
                      {b.is_default ? (
                        <span className="text-xs text-violet-600">Default</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDefaultBankAccount(b.id).then(load)}
                          className="text-xs font-medium text-violet-600 hover:underline"
                        >
                          Set default
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <form onSubmit={handleAddBank} className="mt-4 space-y-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Add account</p>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                >
                  {MONGOLIAN_BANKS.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <input
                  required
                  placeholder="Account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                />
                <input
                  required
                  placeholder="Account holder name"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                />
                {bankError && <p className="text-sm text-red-600">{bankError}</p>}
                <button
                  type="submit"
                  disabled={bankPending}
                  className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
                >
                  {bankPending ? 'Adding…' : 'Add bank account'}
                </button>
              </form>
            </section>
          </div>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">Transaction history</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
                    <th className="pb-3 pr-4 font-medium">Date</th>
                    <th className="pb-3 pr-4 font-medium">Type</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 pr-4 font-medium">Description</th>
                    <th className="pb-3 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-zinc-100 dark:border-zinc-900">
                      <td className="py-3 pr-4 text-zinc-600">{formatDate(tx.created_at)}</td>
                      <td className="py-3 pr-4">{transactionTypeLabel(tx.type)}</td>
                      <td className="py-3 pr-4">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            TX_STATUS_STYLES[tx.status] ?? ''
                          }`}
                        >
                          {transactionStatusLabel(tx.status)}
                        </span>
                      </td>
                      <td className="max-w-xs truncate py-3 pr-4 text-zinc-500">
                        {tx.description?.replace(/^\[Demo\]\s*/, '')}
                      </td>
                      <td
                        className={`py-3 text-right font-medium ${
                          isCredit(tx.type) ? 'text-emerald-600' : 'text-zinc-900 dark:text-zinc-100'
                        }`}
                      >
                        {isCredit(tx.type) ? '+' : '−'}
                        {formatMnt(tx.amount_mnt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </DashboardShell>
  );
}

function BalanceCard({
  label,
  value,
  hint,
  highlight,
}: {
  label: string;
  value: string;
  hint?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? 'border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/30'
          : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950'
      }`}
    >
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{value}</p>
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}
