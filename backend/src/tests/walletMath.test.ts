import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeBalances,
  clampLimit,
  maskAccountNumber,
  PLATFORM_FEE_RATE,
  MIN_PAYOUT_MNT,
  type BalanceRow,
} from '../services/walletService';

describe('computeBalances', () => {
  it('sums completed credit types into earned and available', () => {
    const rows: BalanceRow[] = [
      { type: 'sponsorship_credit', amount_mnt: 100_000, status: 'completed' },
      { type: 'earning_credit', amount_mnt: 40_000, status: 'completed' },
      { type: 'adjustment', amount_mnt: 10_000, status: 'completed' },
    ];

    const balances = computeBalances(rows);

    assert.equal(balances.totalEarned, 150_000);
    assert.equal(balances.available, 150_000);
    assert.equal(balances.totalFees, 0);
    assert.equal(balances.totalPaidOut, 0);
    assert.equal(balances.pendingPayout, 0);
  });

  it('ignores credits that are not completed', () => {
    const rows: BalanceRow[] = [
      { type: 'sponsorship_credit', amount_mnt: 100_000, status: 'completed' },
      { type: 'earning_credit', amount_mnt: 50_000, status: 'pending' },
    ];

    const balances = computeBalances(rows);

    assert.equal(balances.totalEarned, 100_000);
    assert.equal(balances.available, 100_000);
  });

  it('subtracts completed platform fees from available and tracks total fees', () => {
    const rows: BalanceRow[] = [
      { type: 'sponsorship_credit', amount_mnt: 100_000, status: 'completed' },
      { type: 'platform_fee', amount_mnt: 20_000, status: 'completed' },
    ];

    const balances = computeBalances(rows);

    assert.equal(balances.totalFees, 20_000);
    assert.equal(balances.available, 80_000);
    assert.equal(balances.totalEarned, 100_000);
  });

  it('does not count a pending platform fee', () => {
    const rows: BalanceRow[] = [
      { type: 'sponsorship_credit', amount_mnt: 100_000, status: 'completed' },
      { type: 'platform_fee', amount_mnt: 20_000, status: 'pending' },
    ];

    const balances = computeBalances(rows);

    assert.equal(balances.totalFees, 0);
    assert.equal(balances.available, 100_000);
  });

  it('treats completed payouts as paid out and reduces available', () => {
    const rows: BalanceRow[] = [
      { type: 'sponsorship_credit', amount_mnt: 100_000, status: 'completed' },
      { type: 'payout', amount_mnt: 60_000, status: 'completed' },
    ];

    const balances = computeBalances(rows);

    assert.equal(balances.totalPaidOut, 60_000);
    assert.equal(balances.available, 40_000);
    assert.equal(balances.pendingPayout, 0);
  });

  it('treats pending payouts as pending and reserves available', () => {
    const rows: BalanceRow[] = [
      { type: 'sponsorship_credit', amount_mnt: 100_000, status: 'completed' },
      { type: 'payout', amount_mnt: 60_000, status: 'pending' },
    ];

    const balances = computeBalances(rows);

    assert.equal(balances.pendingPayout, 60_000);
    assert.equal(balances.available, 40_000);
    assert.equal(balances.totalPaidOut, 0);
  });

  it('ignores a payout in any other status (e.g. failed)', () => {
    const rows: BalanceRow[] = [
      { type: 'sponsorship_credit', amount_mnt: 100_000, status: 'completed' },
      { type: 'payout', amount_mnt: 60_000, status: 'failed' },
    ];

    const balances = computeBalances(rows);

    assert.equal(balances.available, 100_000);
    assert.equal(balances.pendingPayout, 0);
    assert.equal(balances.totalPaidOut, 0);
  });

  it('floors available at zero when debits exceed credits', () => {
    const rows: BalanceRow[] = [
      { type: 'sponsorship_credit', amount_mnt: 50_000, status: 'completed' },
      { type: 'payout', amount_mnt: 80_000, status: 'completed' },
    ];

    const balances = computeBalances(rows);

    assert.equal(balances.available, 0);
    assert.equal(balances.totalPaidOut, 80_000);
  });

  it('parses string amounts (numeric columns arrive as strings)', () => {
    const rows: BalanceRow[] = [
      { type: 'sponsorship_credit', amount_mnt: '100000', status: 'completed' },
      { type: 'platform_fee', amount_mnt: '20000', status: 'completed' },
    ];

    const balances = computeBalances(rows);

    assert.equal(balances.available, 80_000);
    assert.equal(balances.totalEarned, 100_000);
  });

  it('returns all-zero balances for an empty history', () => {
    const balances = computeBalances([]);

    assert.deepEqual(balances, {
      available: 0,
      pendingPayout: 0,
      totalEarned: 0,
      totalFees: 0,
      totalPaidOut: 0,
    });
  });

  it('reflects the 80/20 split end to end', () => {
    // A 500,000 MNT sponsorship: creator keeps 80%, platform takes 20%.
    const gross = 500_000;
    const fee = gross * PLATFORM_FEE_RATE;
    const rows: BalanceRow[] = [
      { type: 'sponsorship_credit', amount_mnt: gross, status: 'completed' },
      { type: 'platform_fee', amount_mnt: fee, status: 'completed' },
    ];

    const balances = computeBalances(rows);

    assert.equal(balances.available, gross * 0.8);
    assert.equal(balances.totalFees, gross * 0.2);
  });
});

describe('wallet constants', () => {
  it('keeps the platform commission at 20%', () => {
    assert.equal(PLATFORM_FEE_RATE, 0.2);
  });

  it('keeps the minimum payout at 50,000 MNT', () => {
    assert.equal(MIN_PAYOUT_MNT, 50_000);
  });
});

describe('maskAccountNumber', () => {
  it('masks all but the last four digits', () => {
    assert.equal(maskAccountNumber('1234567890'), '•••• 7890');
  });

  it('returns short values unchanged', () => {
    assert.equal(maskAccountNumber('12'), '12');
    assert.equal(maskAccountNumber('1234'), '1234');
  });
});

describe('clampLimit', () => {
  it('defaults when no/invalid limit is supplied', () => {
    assert.equal(clampLimit(), 50);
    assert.equal(clampLimit(0), 50);
    assert.equal(clampLimit(-5), 50);
  });

  it('passes through a valid in-range limit', () => {
    assert.equal(clampLimit(25), 25);
  });

  it('caps at the maximum page size', () => {
    assert.equal(clampLimit(1000), 100);
  });
});
