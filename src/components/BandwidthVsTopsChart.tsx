import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { parseCsv } from './csv';

type Row = {
  year: number;
  model: string;
  bandwidth: number | null;
  tops: number | null;
};

const modelLabels: Record<string, string> = {
  iphone_11_pro: 'iPhone 11 Pro',
  iphone_12_pro: 'iPhone 12 Pro',
  iphone_13_pro: 'iPhone 13 Pro',
  iphone_14_pro: 'iPhone 14 Pro',
  iphone_15_pro: 'iPhone 15 Pro',
  iphone_16_pro: 'iPhone 16 Pro',
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const row = payload[0].payload as Row;
    return (
      <div
        style={{
          background: '#fff',
          border: '1px solid #dee2e6',
          borderRadius: 6,
          padding: '10px 14px',
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{row.model}</div>
        <div>Bandwidth: <strong>{row.bandwidth ?? '—'} GB/s</strong></div>
        <div>Neural Engine: <strong>{row.tops ?? '—'} TOPS</strong></div>
      </div>
    );
  }
  return null;
};

export default function BandwidthVsTopsChart() {
  const [data, setData] = useState<Row[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch('/data/open-source-models/iphone-hardware.csv')
      .then((res) => res.text())
      .then((text) => {
        const rows = parseCsv(text)
          .map((row) => {
            const year = Number(row.year);
            if (!year) return null;
            const bandwidth = row.memory_bandwidth_gbs ? Number(row.memory_bandwidth_gbs) : null;
            const tops = row.neural_engine_tops ? Number(row.neural_engine_tops) : null;
            return {
              year,
              model: modelLabels[row.iphone_model] ?? row.iphone_model,
              bandwidth: Number.isNaN(bandwidth as number) ? null : bandwidth,
              tops: Number.isNaN(tops as number) ? null : tops,
            } as Row;
          })
          .filter(Boolean) as Row[];
        rows.sort((a, b) => a.year - b.year);
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
    return <div style={{ margin: '2rem 0', color: '#868e96' }}>Loading chart…</div>;
  }

  return (
    <div style={{ margin: '2rem 0' }}>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} interval={0} />
          <YAxis
            yAxisId="left"
            label={{ value: 'Memory bandwidth (GB/s)', angle: -90, position: 'insideLeft', offset: 10, style: { fontSize: 12, fill: '#868e96' } }}
            domain={[0, 70]}
            ticks={[0, 20, 40, 60]}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: 'Neural Engine TOPS', angle: 90, position: 'insideRight', offset: 10, style: { fontSize: 12, fill: '#868e96' } }}
            domain={[0, 20]}
            ticks={[0, 5, 10, 15, 20]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ced4da' }} />
          <Legend verticalAlign="top" height={24} />
          <Line yAxisId="left" type="monotone" dataKey="bandwidth" stroke="#2f9e44" strokeWidth={2} dot={{ r: 3 }} name="Bandwidth" />
          <Line yAxisId="right" type="monotone" dataKey="tops" stroke="#f59f00" strokeWidth={2} dot={{ r: 3 }} name="Neural Engine TOPS" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
