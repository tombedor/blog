import React, { useEffect, useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { parseCsv } from './csv';

type Row = {
  date: number;
  label: string;
  size: number;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload as Row;
    const date = new Date(d.date);
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
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{d.label}</div>
        <div>Release: <strong>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</strong></div>
        <div>Parameters: <strong>{d.size}B</strong></div>
      </div>
    );
  }
  return null;
};

export default function OpenSourceReleaseCadenceChart() {
  const [data, setData] = useState<Row[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch('/data/open-source-models/open-source-releases.csv')
      .then((res) => res.text())
      .then((text) => {
        const rows = parseCsv(text)
          .map((row) => {
            if (!row.release_date || !row.parameters_total_b) return null;
            const date = new Date(row.release_date).getTime();
            const size = Number(row.parameters_total_b);
            if (Number.isNaN(date) || Number.isNaN(size)) return null;
            return {
              date,
              label: row.model,
              size,
            } as Row;
          })
          .filter(Boolean) as Row[];
        rows.sort((a, b) => a.date - b.date);
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
        <ScatterChart margin={{ top: 20, right: 20, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
          <XAxis
            dataKey="date"
            type="number"
            scale="time"
            domain={['dataMin', 'dataMax']}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => new Date(value).getFullYear().toString()}
          />
          <YAxis
            dataKey="size"
            label={{ value: 'Parameters (B)', angle: -90, position: 'insideLeft', offset: 10, style: { fontSize: 12, fill: '#868e96' } }}
            domain={[0, 700]}
            ticks={[0, 100, 300, 500, 700]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ced4da' }} />
          <Scatter data={data} fill="#845ef7">
            <LabelList dataKey="label" position="top" fontSize={11} fill="#495057" />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
