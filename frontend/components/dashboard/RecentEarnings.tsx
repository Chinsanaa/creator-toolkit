import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatMnt, platformLabel, sourceLabel } from '@/lib/format';
import type { EarningsEntry } from '@/lib/types/dashboard';

export function RecentEarnings({ data }: { data: EarningsEntry[] }) {
  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle>Recent earnings</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted">
            No earnings yet. Connect a platform or wait for your first sync.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{formatPeriod(row.period_start, row.period_end)}</TableCell>
                  <TableCell>{platformLabel(row.platform)}</TableCell>
                  <TableCell className="text-muted">{sourceLabel(row.source_type)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatMnt(row.amount_mnt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

function formatPeriod(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return s.toLocaleDateString('en-US', opts);
  }
  return `${s.toLocaleDateString('en-US', { month: 'short' })} – ${e.toLocaleDateString('en-US', opts)}`;
}
