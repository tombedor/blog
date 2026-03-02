import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import { parseCsv } from './csv';

type Row = {
  model: string;
  displayName: string;
  lab: string;
  releaseDate: string;
  parametersTotal: number;
  parametersActive: number;
};

const LAB_COLORS: Record<string, string> = {
  EleutherAI: '#868e96',
  BigScience: '#0ca678',
  Meta: '#1971c2',
  Alibaba: '#e67700',
  DeepSeek: '#7950f2',
  Mistral: '#c92a2a',
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d: Row = payload[0].payload;
  const isMoe = d.parametersActive < d.parametersTotal;
  const date = new Date(d.releaseDate);
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
      <div>
        Lab: <strong>{d.lab}</strong>
      </div>
      <div>
        Released:{' '}
        <strong>
          {date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
        </strong>
      </div>
      {isMoe ? (
        <>
          <div>
            Total params: <strong>{d.parametersTotal}B</strong>
          </div>
          <div>
            Active params: <strong>{d.parametersActive}B</strong>{' '}
            <span style={{ color: '#868e96' }}>(MoE)</span>
          </div>
        </>
      ) : (
        <div>
          Parameters: <strong>{d.parametersTotal}B</strong>
        </div>
      )}
    </div>
  );
};

export default function OpenSourceReleaseCadenceChart() {
  const [data, setData] = useState<Row[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch('/data/open-source-models/open-source-releases.csv')
      .then((res) => res.text())
      .then((text) => {
        const rows: Row[] = parseCsv(text)
          .map((row) => {
            if (!row.release_date || !row.parameters_total_b) return null;
            const parametersTotal = Number(row.parameters_total_b);
            if (Number.isNaN(parametersTotal)) return null;
            return {
              model: row.model,
              displayName: row.display_name || row.model,
              lab: row.lab,
              releaseDate: row.release_date,
              parametersTotal,
              parametersActive: Number(row.parameters_active_b) || parametersTotal,
            } as Row;
          })
          .filter(Boolean) as Row[];
        rows.sort(
          (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        );
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

  const labs = [...new Set(data.map((d) => d.lab))];

  return (
    <div style={{ margin: '2rem 0' }}>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={data} margin={{ top: 28, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
          <XAxis
            dataKey="displayName"
            tick={{ fontSize: 11, angle: -40, textAnchor: 'end' }}
            interval={0}
            height={72}
          />
          <YAxis
            label={{
              value: 'Parameters (B)',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              style: { fontSize: 12, fill: '#868e96' },
            }}
            domain={[0, 700]}
            ticks={[0, 100, 200, 300, 400, 500, 600, 700]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
          <Bar dataKey="parametersTotal" radius={[3, 3, 0, 0]} maxBarSize={38}>
            {data.map((entry, i) => (
              <Cell key={i} fill={LAB_COLORS[entry.lab] ?? '#868e96'} />
            ))}
            <LabelList
              dataKey="parametersTotal"
              position="top"
              fontSize={10}
              fill="#495057"
              formatter={(v: number) => `${v}B`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{
          display: 'flex',
          gap: 16,
          justifyContent: 'center',
          fontSize: 12,
          marginTop: 4,
          flexWrap: 'wrap',
        }}
      >
        {labs.map((lab) => (
          <span
            key={lab}
            style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#495057' }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                background: LAB_COLORS[lab] ?? '#868e96',
                display: 'inline-block',
              }}
            />
            {lab}
          </span>
        ))}
      </div>
    </div>
  );
}
