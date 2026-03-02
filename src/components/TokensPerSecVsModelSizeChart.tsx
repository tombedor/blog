import React from 'react';
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

const data = Array.from({ length: 12 }, (_, i) => {
  const size = i + 1; // 1B to 12B
  const tps = 90 / size; // 3B -> 30 t/s baseline
  return { size, tps: Number(tps.toFixed(1)) };
});

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload as { size: number; tps: number };
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
        <div>Model size: <strong>{d.size}B</strong></div>
        <div>Tokens/sec (est.): <strong>{d.tps}</strong></div>
        <div style={{ color: '#868e96', fontSize: 12 }}>Assumes inverse scaling from 3B@30 t/s baseline</div>
      </div>
    );
  }
  return null;
};

export default function TokensPerSecVsModelSizeChart() {
  return (
    <div style={{ margin: '2rem 0' }}>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
          <XAxis
            dataKey="size"
            label={{ value: 'Model size (B params)', position: 'insideBottom', offset: -10, style: { fontSize: 12, fill: '#868e96' } }}
            tick={{ fontSize: 12 }}
            interval={0}
          />
          <YAxis
            label={{ value: 'Tokens/sec (estimated)', angle: -90, position: 'insideLeft', offset: 10, style: { fontSize: 12, fill: '#868e96' } }}
            domain={[0, 40]}
            ticks={[0, 10, 20, 30, 40]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ced4da' }} />
          <ReferenceLine y={8} stroke="#adb5bd" strokeDasharray="4 4" label={{ value: 'Usable threshold (8 t/s)', position: 'insideTopRight', fontSize: 11, fill: '#868e96' }} />
          <Line
            type="monotone"
            dataKey="tps"
            stroke="#1971c2"
            strokeWidth={2}
            dot={{ r: 3, fill: '#1971c2' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
