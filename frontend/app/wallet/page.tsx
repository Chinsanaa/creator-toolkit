'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { CreatorPageHeader } from '@/components/creator/CreatorPageHeader';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { useLanguage } from '@/contexts/LanguageContext';
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
  pending: 'bg-amber-100 text-amber-800',
  completed: 'bg-emerald-100 text-emerald-800',
  failed: 'bg-red-100 text-red-800',
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
  const { t } = useLanguage();

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
    let cancelled = false;
    void (async () => {
      try {
        const [s, tx, banks] = await Promise.all([
          getWalletSummary(),
          getWalletTransactions(),
          getBankAccounts(),
        ]);
        if (!cancelled) {
          setSummary(s);
          setTransactions(tx);
          setBankAccounts(banks);
          const defaultBank = banks.find((b) => b.is_default) ?? banks[0];
          if (defaultBank) setPayoutBankId(defaultBank.id);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Failed to load wallet');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
      <div className="mx-auto max-w-6xl">
        <CreatorPageHeader
          title={t('wallet')}
          subtitle={t('wallet_subtitle')}
        />

        {loading && <p className="text-sm text-landing-muted">{t('loading_wallet')}</p>}
        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {summary && !loading && (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <BalanceCard
                label={t('available_to_withdraw')}
                value={formatMnt(summary.availableBalanceMnt)}
                highlight
              />
              <BalanceCard
                label={t('pending_payouts')}
                value={formatMnt(summary.pendingPayoutMnt)}
                hint={t('processing_transfers')}
              />
              <BalanceCard label={t('total_earned')} value={formatMnt(summary.totalEarnedMnt)} />
              <BalanceCard
                label={t('fees_paid')}
                value={formatMnt(summary.totalFeesMnt)}
                hint={`${(summary.platformFeeRate * 100).toFixed(0)}${t('pct_on_sponsorships')}`}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <section className="creator-panel-lg">
                <h2 className="text-base font-semibold tracking-tight text-landing-fg">
                  {t('request_payout')}
                </h2>
                <p className="mt-1 text-sm text-landing-muted">
                  Minimum {formatMnt(summary.minPayoutMnt)}. Transfers in 1–3 business days.
                </p>
                {bankAccounts.length === 0 ? (
                  <p className="mt-4 text-sm text-amber-700">
                    {t('add_bank_account_first')}
                  </p>
                ) : (
                  <form onSubmit={handlePayout} className="mt-5 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-landing-fg">
                        {t('amount_mnt')}
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        value={payoutAmount}
                        onChange={(e) => setPayoutAmount(e.target.value)}
                        placeholder="e.g. 500000"
                        className="auth-input"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-landing-fg">
                        {t('bank_account')}
                      </label>
                      <select
                        value={payoutBankId}
                        onChange={(e) => setPayoutBankId(e.target.value)}
                        className="auth-input"
                      >
                        {bankAccounts.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.bank_name} {b.account_number}
                            {b.is_default ? ` ${t('default_label')}` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    {payoutError && <p className="text-sm text-red-600">{payoutError}</p>}
                    {payoutSuccess && (
                      <p className="text-sm text-emerald-700">{payoutSuccess}</p>
                    )}
                    <button
                      type="submit"
                      disabled={payoutPending}
                      className="landing-btn-dark px-6 py-2.5 text-sm disabled:opacity-60"
                    >
                      {payoutPending ? t('submitting') : t('request_payout')}
                    </button>
                  </form>
                )}
              </section>

              <section className="creator-panel-lg">
                <h2 className="text-base font-semibold tracking-tight text-landing-fg">
                  {t('bank_accounts')}
                </h2>
                {bankAccounts.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {bankAccounts.map((b) => (
                      <li key={b.id} className="creator-platform-row">
                        <div>
                          <p className="font-medium text-landing-fg">{b.bank_name}</p>
                          <p className="text-sm text-landing-muted">
                            {b.account_number} · {b.account_holder_name}
                          </p>
                        </div>
                        {b.is_default ? (
                          <span className="text-xs font-medium text-landing-fg">{t('default_label')}</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDefaultBankAccount(b.id).then(load)}
                            className="auth-link text-xs"
                          >
                            {t('set_default')}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                <form
                  onSubmit={handleAddBank}
                  className="mt-5 space-y-3 border-t border-sky-100 pt-5"
                >
                  <p className="text-sm font-medium text-landing-fg">{t('add_account')}</p>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="auth-input"
                  >
                    {MONGOLIAN_BANKS.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <input
                    required
                    placeholder={t('account_number')}
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="auth-input"
                  />
                  <input
                    required
                    placeholder={t('account_holder_name')}
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    className="auth-input"
                  />
                  {bankError && <p className="text-sm text-red-600">{bankError}</p>}
                  <button
                    type="submit"
                    disabled={bankPending}
                    className="landing-btn-light px-5 py-2.5 text-sm disabled:opacity-60"
                  >
                    {bankPending ? t('adding') : t('add_bank_account')}
                  </button>
                </form>
              </section>
            </div>

            <section className="creator-panel-lg">
              <h2 className="text-base font-semibold tracking-tight text-landing-fg">
                {t('transaction_history')}
              </h2>
              <div className="creator-table-wrap mt-5">
                <table className="creator-table">
                  <thead>
                    <tr>
                      <th>{t('date')}</th>
                      <th>{t('type')}</th>
                      <th>{t('status')}</th>
                      <th>{t('description')}</th>
                      <th className="text-right">{t('amount')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id}>
                        <td className="text-landing-muted">{formatDate(tx.created_at)}</td>
                        <td>{transactionTypeLabel(tx.type)}</td>
                        <td>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              TX_STATUS_STYLES[tx.status] ?? ''
                            }`}
                          >
                            {transactionStatusLabel(tx.status)}
                          </span>
                        </td>
                        <td className="max-w-xs truncate text-landing-muted">
                          {tx.description?.replace(/^\[Demo\]\s*/, '')}
                        </td>
                        <td
                          className={`text-right font-medium ${
                            isCredit(tx.type) ? 'text-emerald-700' : 'text-landing-fg'
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
      </div>
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
    <div className={`creator-stat-card ${highlight ? 'creator-stat-card-highlight' : ''}`}>
      <p className="creator-stat-label">{label}</p>
      <p className="creator-stat-value">{value}</p>
      {hint ? <p className="mt-1 text-xs text-landing-muted">{hint}</p> : null}
    </div>
  );
}
