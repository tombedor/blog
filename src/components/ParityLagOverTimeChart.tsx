import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from 'recharts';
import { parseCsv } from './csv';
import useChartColors from './useChartColors';

type Row = {
  frontier: string;
  release: string;
  months: number;
  dateValue: number;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload as Row;
    return (
      <div
        style={{
          background: '#fff',
          color: '#212529',
          border: '1px solid #dee2e6',
          borderRadius: 6,
          padding: '10px 14px',
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{d.frontier}</div>
        <div>Frontier release: <strong>{d.release}</strong></div>
        <div>Months to parity: <strong>{d.months}</strong></div>
      </div>
    );
  }
  return null;
};

const CustomDot = (props: any) => {
  const { cx, cy } = props;
  return <Dot cx={cx} cy={cy} r={4} fill="#1c7ed6" stroke="#fff" strokeWidth={1} />;
};

function formatReleaseLabel(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export default function ParityLagOverTimeChart() {
  const colors = useChartColors();
  const [data, setData] = useState<Row[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch('/data/open-source-models/time-to-parity.csv')
      .then((res) => res.text())
      .then((text) => {
        const rows = parseCsv(text)
          .map((row) => {
            const release = row.frontier_release;
            const months = Number(row.months_to_parity);
            if (!release || Number.isNaN(months)) return null;
            return {
              frontier: row.frontier_model,
              release: formatReleaseLabel(release),
              months: Number(months.toFixed(1)),
              dateValue: new Date(release).getTime(),
            } as Row;
          })
          .filter(Boolean) as Row[];
        rows.sort((a, b) => a.dateValue - b.dateValue);
        if (!cancelled) setData(rows);
      })
      .catch(() => {
        if (!cancelled) setData([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (data.length === 0) {
    return <div style={{ margin: '2rem 0', color: colors.axisLabel }}>Loading chart…</div>;
  }

  return (
    <div style={{ margin: '2rem 0' }}>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.grid} />
          <XAxis
            dataKey="release"
            tick={{ fontSize: 12, fill: colors.axisLabel }}
            interval={0}
          />
          <YAxis
            label={{ value: 'Months to parity', angle: -90, position: 'insideLeft', offset: 10, style: { fontSize: 12, fill: colors.axisLabel } }}
            domain={[0, 18]}
            ticks={[0, 4, 8, 12, 16]}
            tick={{ fontSize: 12, fill: colors.axisLabel }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: colors.cursor }} />
          <Line
            type="monotone"
            dataKey="months"
            stroke="#1c7ed6"
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
