import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  fetchPlatformData,
  isSupportedPlatform,
  hashSeed,
  monthBounds,
  MNT_PER_USD,
  type SupportedPlatform,
} from '../platforms/mockPlatformProvider';

describe('hashSeed', () => {
  it('is deterministic for the same input', () => {
    assert.equal(hashSeed('tiktok:user-1'), hashSeed('tiktok:user-1'));
  });

  it('differs for different inputs', () => {
    assert.notEqual(hashSeed('tiktok:user-1'), hashSeed('tiktok:user-2'));
  });

  it('always returns a non-negative integer', () => {
    for (const input of ['', 'a', 'youtube:zzz', 'instagram:99999']) {
      const seed = hashSeed(input);
      assert.ok(Number.isInteger(seed) && seed >= 0, `seed for "${input}" should be a non-negative int`);
    }
  });
});

describe('isSupportedPlatform', () => {
  it('accepts the three supported platforms', () => {
    assert.equal(isSupportedPlatform('tiktok'), true);
    assert.equal(isSupportedPlatform('youtube'), true);
    assert.equal(isSupportedPlatform('instagram'), true);
  });

  it('rejects anything else', () => {
    assert.equal(isSupportedPlatform('facebook'), false);
    assert.equal(isSupportedPlatform('TikTok'), false);
    assert.equal(isSupportedPlatform(''), false);
  });
});

describe('monthBounds', () => {
  it('returns the first and last day of the month in UTC', () => {
    // Mid-month UTC date -> Feb 2024 (leap year) is 1..29.
    const { start, end } = monthBounds(new Date('2024-02-15T12:00:00.000Z'));
    assert.equal(start, '2024-02-01');
    assert.equal(end, '2024-02-29');
  });

  it('does not roll the day backwards for late-UTC instants', () => {
    // 23:30 UTC on the last day of a month must still map to that same month,
    // guarding against local-time shifts on servers ahead of UTC.
    const { start, end } = monthBounds(new Date('2024-03-31T23:30:00.000Z'));
    assert.equal(start, '2024-03-01');
    assert.equal(end, '2024-03-31');
  });
});

describe('fetchPlatformData', () => {
  const platforms: SupportedPlatform[] = ['tiktok', 'youtube', 'instagram'];

  it('is deterministic for the same platform + user id', () => {
    const a = fetchPlatformData('tiktok', 'creator-42');
    const b = fetchPlatformData('tiktok', 'creator-42');
    assert.deepEqual(a, b);
  });

  it('derives amountUsd by rounding earningsMnt / MNT_PER_USD', () => {
    for (const platform of platforms) {
      const result = fetchPlatformData(platform, 'creator-42');
      assert.equal(result.amountUsd, Math.round(result.earningsMnt / MNT_PER_USD));
    }
  });

  it('keeps follower counts and earnings within the documented per-platform bands', () => {
    const bands: Record<SupportedPlatform, { followers: number; earnings: number }> = {
      tiktok: { followers: 80_000, earnings: 520_000 },
      youtube: { followers: 35_000, earnings: 280_000 },
      instagram: { followers: 20_000, earnings: 150_000 },
    };

    for (const platform of platforms) {
      const { followerCount, earningsMnt } = fetchPlatformData(platform, 'creator-42');
      const base = bands[platform];
      assert.ok(
        followerCount >= base.followers && followerCount < base.followers + 50_000,
        `${platform} followers ${followerCount} out of band`
      );
      assert.ok(
        earningsMnt >= base.earnings && earningsMnt < base.earnings + 200_000,
        `${platform} earnings ${earningsMnt} out of band`
      );
    }
  });

  it('returns the current month as the reporting period', () => {
    const expected = monthBounds();
    const result = fetchPlatformData('youtube', 'creator-1');
    assert.equal(result.periodStart, expected.start);
    assert.equal(result.periodEnd, expected.end);
  });
});
