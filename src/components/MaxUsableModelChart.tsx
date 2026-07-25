import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { parseCsv } from './csv';
import useChartColors from './useChartColors';

type Row = {
  deviceModel: string;
  device: 'iphone' | 'macbook';
  year: number;
  maxModel: number;
  ramFit: number;
  speedFit: number;
  speculative: boolean;
  displayName: string;
};

type ChartPoint = {
  year: number;
  macbookConfirmed: number | null;
  macbookSpec: number | null;
  macbookLabel: string | null;
  macbookIsSpec: boolean;
  macbookRamFit: number | null;
  macbookSpeedFit: number | null;
};

const LegendItem = ({
  color,
  label,
  dashed = false,
}: {
  color: string;
  label: string;
  dashed?: boolean;
}) => {
  const colors = useChartColors();
  return (
  <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: colors.muted }}>
    <svg width="24" height="14">
      <line
        x1="0"
        y1="7"
        x2="24"
        y2="7"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={dashed ? '5 4' : undefined}
      />
      {!dashed && <circle cx="12" cy="7" r="3.5" fill={color} />}
      {dashed && (
        <circle cx="12" cy="7" r="3.5" fill="white" stroke={color} strokeWidth="2" />
      )}
    </svg>
    {label}
  </span>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d: ChartPoint = payload[0]?.payload;
  if (!d) return null;

  const macbookValue = d.macbookConfirmed ?? d.macbookSpec;

  const ramLimited = (ramFit: number | null, speedFit: number | null) =>
    ramFit != null && speedFit != null && ramFit <= speedFit;

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
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{d.year}</div>
      {macbookValue != null && (
        <div style={{ color: '#1971c2' }}>
          {d.macbookLabel ?? 'MacBook Pro'}
          {d.macbookIsSpec ? ' (est.)' : ''}: <strong>{macbookValue}B</strong>
          <span style={{ color: '#868e96', fontSize: 11, marginLeft: 6 }}>
            (RAM: {d.macbookRamFit}B, speed: {d.macbookSpeedFit}B
            {ramLimited(d.macbookRamFit, d.macbookSpeedFit) ? ', RAM-limited' : ', speed-limited'})
          </span>
        </div>
      )}
      <div style={{ color: '#868e96', fontSize: 12, marginTop: 4 }}>
        Q4, 8k ctx, ≥8 t/s (dense model). MoE: RAM-fit is binding for total-param size.
      </div>
    </div>
  );
};

export default function MaxUsableModelChart() {
  const colors = useChartColors();
  const [chartData, setChartData] = useState<ChartPoint[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch('/data/open-source-models/iphone-max-usable-model.csv')
      .then((res) => res.text())
      .then((text) => {
        const rows: Row[] = parseCsv(text)
          .map((row) => {
            if (row.quantization !== 'Q4') return null;
            const year = Number(row.year);
            const maxModel = Number(row.max_model_b);
            if (!year || Number.isNaN(maxModel)) return null;
            return {
              deviceModel: row.device_model,
              device: row.device as 'iphone' | 'macbook',
              year,
              maxModel: Number(maxModel.toFixed(1)),
              ramFit: Number(Number(row.ram_fit_b).toFixed(1)),
              speedFit: Number(Number(row.speed_fit_b).toFixed(1)),
              speculative: row.speculative === 'true',
              displayName: row.display_name || row.device_model,
            } as Row;
          })
          .filter(Boolean) as Row[];

        const macRows = rows.filter((r) => r.device === 'macbook');

        const lastConfirmedMacYear = Math.max(
          ...macRows.filter((r) => !r.speculative).map((r) => r.year)
        );

        const allYears = [...new Set(macRows.map((r) => r.year))].sort((a, b) => a - b);

        const data: ChartPoint[] = allYears.map((year) => {
          const macRow = macRows.find((r) => r.year === year);

          return {
            year,
            macbookConfirmed: macRow && !macRow.speculative ? macRow.maxModel : null,
            macbookSpec:
              macRow && macRow.speculative
                ? macRow.maxModel
                : year === lastConfirmedMacYear && macRow
                ? macRow.maxModel
                : null,
            macbookLabel: macRow?.displayName ?? null,
            macbookIsSpec: macRow?.speculative ?? false,
            macbookRamFit: macRow?.ramFit ?? null,
            macbookSpeedFit: macRow?.speedFit ?? null,
          };
        });

        if (!cancelled) setChartData(data);
      })
      .catch(() => {
        if (!cancelled) setChartData([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (chartData.length === 0) {
    return <div style={{ margin: '2rem 0', color: colors.axisLabel }}>Loading chart…</div>;
  }

  return (
    <div style={{ margin: '2rem 0' }}>
      <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 14, marginBottom: 8, color: colors.text }}>
        Max usable model by device
      </div>
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.grid} />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: colors.axisLabel }} interval={0} />
          <YAxis
            label={{
              value: 'Max usable model (B params)',
              angle: -90,
              position: 'insideLeft',
              dy: 75,
              offset: 10,
              style: { fontSize: 12, fill: colors.axisLabel },
            }}
            domain={[0, 140]}
            ticks={[0, 10, 20, 30, 40, 50, 60, 80, 100, 120, 140]}
            tick={{ fontSize: 12, fill: colors.axisLabel }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: colors.cursor }} />
          <Line
            type="monotone"
            dataKey="macbookConfirmed"
            stroke="#1971c2"
            strokeWidth={2}
            dot={{ r: 4, fill: '#1971c2' }}
            activeDot={{ r: 5 }}
            connectNulls={false}
            legendType="none"
          />
          <Line
            type="monotone"
            dataKey="macbookSpec"
            stroke="#1971c2"
            strokeWidth={2}
            strokeDasharray="5 4"
            dot={{ r: 4, fill: '#fff', stroke: '#1971c2', strokeWidth: 2 }}
            activeDot={{ r: 5 }}
            connectNulls={false}
            legendType="none"
          />
        </LineChart>
      </ResponsiveContainer>
      <div
        style={{
          display: 'flex',
          gap: 24,
          justifyContent: 'center',
          fontSize: 12,
          marginTop: 4,
          flexWrap: 'wrap',
        }}
      >
        <LegendItem color="#1971c2" label="MacBook Pro" />
        <LegendItem color="#868e96" dashed label="estimated / speculative" />
      </div>
    </div>
  );
}
