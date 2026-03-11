import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { model: 'GPT-3.5', provider: 'OpenAI', months: 9, osModel: 'Llama 2 70B', date: 'Nov 2022' },
  { model: 'GPT-4', provider: 'OpenAI', months: 16, osModel: 'Llama 3.1 405B', date: 'Mar 2023' },
  { model: 'Claude 3 Opus', provider: 'Anthropic', months: 4, osModel: 'Llama 3.1 405B', date: 'Mar 2024' },
  { model: 'GPT-4o', provider: 'OpenAI', months: 7, osModel: 'DeepSeek-V3', date: 'May 2024' },
  { model: 'Claude 3.5 Sonnet', provider: 'Anthropic', months: 6, osModel: 'DeepSeek-V3', date: 'Jun 2024' },
  { model: 'o1', provider: 'OpenAI', months: 4, osModel: 'DeepSeek-R1', date: 'Sep 2024' },
];

const COLORS = {
  OpenAI: '#1971c2',
  Anthropic: '#e67700',
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #dee2e6',
        borderRadius: 6,
        padding: '10px 14px',
        fontSize: 13,
        lineHeight: 1.6,
      }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{d.model} ({d.date})</div>
        <div>Months to parity: <strong>{d.months}</strong></div>
        <div>Matched by: <strong>{d.osModel}</strong></div>
        <div style={{ color: COLORS[d.provider], fontSize: 12 }}>{d.provider}</div>
      </div>
    );
  }
  return null;
};

const CustomLabel = ({ x, y, width, value }: any) => (
  <text
    x={x + width / 2}
    y={y - 6}
    fill="#868e96"
    textAnchor="middle"
    fontSize={11}
  >
    {value}
  </text>
);

export default function ParityChart() {
  return (
    <div style={{ margin: '2rem 0' }}>
      <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 14, marginBottom: 8, color: '#212529' }}>
        Months to open source parity with frontier models
      </div>
      <ResponsiveContainer width="100%" height={380}>
        <BarChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
          <XAxis
            dataKey="model"
            tick={{ fontSize: 13, dy: 17 }}
            interval={0}
            angle={-25}
            textAnchor="end"
            height={70}
          />
          <YAxis
            label={{ value: 'Months to parity', angle: -90, position: 'insideLeft', dy: 30, offset: 10, style: { fontSize: 12, fill: '#868e96' } }}
            domain={[0, 18]}
            ticks={[0, 4, 8, 12, 16]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
          <Bar dataKey="months" radius={[3, 3, 0, 0]}>
            <LabelList dataKey="osModel" content={<CustomLabel />} />
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[entry.provider]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center', fontSize: 13, color: '#495057' }}>
        <span><span style={{ display: 'inline-block', width: 12, height: 12, background: COLORS.OpenAI, borderRadius: 2, marginRight: 5, verticalAlign: 'middle' }} />OpenAI</span>
        <span><span style={{ display: 'inline-block', width: 12, height: 12, background: COLORS.Anthropic, borderRadius: 2, marginRight: 5, verticalAlign: 'middle' }} />Anthropic</span>
      </div>
    </div>
  );
}
