import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { parseCsv } from './csv';

type Row = {
  year: number;
  model: string;
  maxModel: number;
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
    const d = payload[0].payload as Row;
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
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{d.model}</div>
        <div>Max usable size: <strong>{d.maxModel}B</strong></div>
        <div style={{ color: '#868e96', fontSize: 12 }}>Assumes Q4, 8k context, >=8 t/s</div>
      </div>
    );
  }
  return null;
};

export default function MaxUsableModelChart() {
  const [data, setData] = useState<Row[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch('/data/open-source-models/iphone-max-usable-model.csv')
      .then((res) => res.text())
      .then((text) => {
        const rows = parseCsv(text)
          .map((row) => {
            if (row.quantization !== 'Q4') return null;
            const year = Number(row.year);
            const maxModel = Number(row.max_model_b);
            if (!year || Number.isNaN(maxModel)) return null;
            return {
              year,
              model: modelLabels[row.iphone_model] ?? row.iphone_model,
              maxModel: Number(maxModel.toFixed(1)),
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
        <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12 }}
            interval={0}
          />
          <YAxis
            label={{ value: 'Max usable model size (B params)', angle: -90, position: 'insideLeft', offset: 10, style: { fontSize: 12, fill: '#868e96' } }}
            domain={[0, 10]}
            ticks={[0, 2, 4, 6, 8, 10]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ced4da' }} />
          <ReferenceLine y={3} stroke="#adb5bd" strokeDasharray="4 4" label={{ value: 'Apple on-device baseline (3B)', position: 'insideTopRight', fontSize: 11, fill: '#868e96' }} />
          <Line
            type="monotone"
            dataKey="maxModel"
            stroke="#2f9e44"
            strokeWidth={2}
            dot={{ r: 4, fill: '#2f9e44' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
