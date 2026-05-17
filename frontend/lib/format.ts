export function formatMnt(amount: number): string {
  return new Intl.NumberFormat('mn-MN', {
    style: 'currency',
    currency: 'MNT',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

export function platformLabel(platform: string): string {
  const labels: Record<string, string> = {
    tiktok: 'TikTok',
    youtube: 'YouTube',
    instagram: 'Instagram',
  };
  return labels[platform.toLowerCase()] ?? platform;
}

export function contentTypeLabel(type: string | null): string {
  if (!type) return 'Any format';
  const labels: Record<string, string> = {
    tiktok_video: 'TikTok video',
    youtube_video: 'YouTube video',
    short_video: 'Short-form video',
    instagram_reel: 'Instagram Reel',
  };
  return labels[type] ?? type.replace(/_/g, ' ');
}

export function transactionTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    sponsorship_credit: 'Sponsorship payout',
    earning_credit: 'Platform earnings',
    platform_fee: 'Platform fee (20%)',
    payout: 'Bank withdrawal',
    adjustment: 'Adjustment',
  };
  return labels[type] ?? type;
}

export function transactionStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: 'Pending',
    completed: 'Completed',
    failed: 'Failed',
    cancelled: 'Cancelled',
  };
  return labels[status] ?? status;
}

export function applicationStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: 'Pending review',
    approved: 'Approved',
    rejected: 'Not selected',
    completed: 'Completed',
    paid: 'Paid',
  };
  return labels[status] ?? status;
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function sourceLabel(source: string | null): string {
  if (!source) return 'Other';
  const labels: Record<string, string> = {
    ad_revenue: 'Ad revenue',
    sponsorship: 'Sponsorship',
    gift: 'Gifts',
  };
  return labels[source] ?? source;
}
