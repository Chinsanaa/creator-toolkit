import platformService from '../services/platformService';

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

export function startSyncScheduler(): void {
  if (process.env.ENABLE_SYNC_CRON !== 'true') {
    return;
  }

  const inProcessAllowed =
    process.env.ENABLE_IN_PROCESS_SYNC_CRON === 'true' ||
    process.env.NODE_ENV !== 'production';

  if (!inProcessAllowed) {
    console.log(
      '○ In-process sync scheduler disabled in production. Use POST /api/sync/cron with x-cron-secret.'
    );
    return;
  }

  const run = () => {
    platformService.runScheduledSyncAll().then(({ synced, failed }) => {
      if (synced > 0 || failed > 0) {
        console.log(`Platform sync cron: ${synced} ok, ${failed} failed`);
      }
    });
  };

  setTimeout(run, 30_000);
  setInterval(run, SIX_HOURS_MS);
  console.log('✓ Platform sync scheduler enabled (every 6 hours)');
}
