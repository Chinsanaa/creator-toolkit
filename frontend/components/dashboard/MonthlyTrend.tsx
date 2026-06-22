'use client';

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatMnt } from '@/lib/format';
import type { MonthlyEarnings } from '@/lib/types/dashboard';

export function MonthlyTrend({ data }: { data: MonthlyEarnings[] }) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="earningsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.45} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tickFormatter={(label: string) => label.split(' ')[0]}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            width={48}
            tickFormatter={(value: number) => `${Math.round(value / 1000)}k`}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
          />
          <Tooltip
            cursor={false}
            formatter={(value) => formatMnt(Number(value ?? 0))}
            labelFormatter={(label) => String(label ?? '')}
            contentStyle={{
              borderRadius: 12,
              border: '1px solid var(--border)',
              background: 'var(--card)',
              color: 'var(--foreground)',
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="amountMnt"
            stroke="var(--primary)"
            strokeWidth={2.5}
            fill="url(#earningsFill)"
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      <p className="sr-only">
        {data.map((m) => `${m.label}: ${formatMnt(m.amountMnt)}`).join(', ')}
      </p>
    </div>
  );
}
