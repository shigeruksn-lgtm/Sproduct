import { useState, useRef, useCallback } from 'react';

interface BarSeries {
  dataKey: string;
  color: string;
  label?: string;
}

interface LineSeries {
  dataKey: string;
  color: string;
  dashed?: boolean;
  secondaryAxis?: boolean;
  label?: string;
}

interface CustomBarLineChartProps {
  data: Record<string, string | number>[];
  xKey: string;
  bars: BarSeries[];
  lines?: LineSeries[];
  height?: number;
  secondaryDomain?: [number, number];
  secondaryFormatter?: (v: number) => string;
  tooltipFormatter?: (value: number, key: string) => string;
}

const PADDING = { top: 10, right: 50, bottom: 28, left: 36 };
const BAR_GAP = 3;

export function CustomBarLineChart({
  data,
  xKey,
  bars,
  lines = [],
  height = 220,
  secondaryDomain,
  secondaryFormatter,
  tooltipFormatter,
}: CustomBarLineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; idx: number } | null>(null);
  const [dims, setDims] = useState({ width: 600 });

  const ro = useCallback((entries: ResizeObserverEntry[]) => {
    for (const e of entries) {
      setDims({ width: e.contentRect.width });
    }
  }, []);

  const setRef = useCallback((el: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    if (el) {
      const observer = new ResizeObserver(ro);
      observer.observe(el);
    }
  }, [ro]);

  const W = dims.width;
  const innerW = W - PADDING.left - PADDING.right;
  const innerH = height - PADDING.top - PADDING.bottom;

  // Primary axis (left) — bar values
  const allBarValues = data.flatMap(d => bars.map(b => Number(d[b.dataKey] ?? 0)));
  const primaryMax = Math.max(...allBarValues, 1);
  const primaryTicks = 5;
  const primaryStep = Math.ceil(primaryMax / primaryTicks / 10) * 10 || 1;
  const primaryAxisMax = primaryStep * primaryTicks;

  // Secondary axis (right) — line values
  const secondaryMax = secondaryDomain ? secondaryDomain[1] : Math.max(...(lines.filter(l => l.secondaryAxis).flatMap(l => data.map(d => Number(d[l.dataKey] ?? 0)))), 1);
  const secondaryMin = secondaryDomain ? secondaryDomain[0] : 0;

  const barGroupWidth = innerW / data.length;
  const totalBarWidth = barGroupWidth * 0.65;
  const singleBarWidth = (totalBarWidth - BAR_GAP * (bars.length - 1)) / bars.length;

  const toY = (value: number, isSecondary = false) => {
    if (isSecondary) {
      return innerH - ((value - secondaryMin) / (secondaryMax - secondaryMin)) * innerH;
    }
    return innerH - (value / primaryAxisMax) * innerH;
  };

  // Y-axis tick labels (primary)
  const yTicks = Array.from({ length: primaryTicks + 1 }, (_, i) => i * primaryStep);

  // X tick positions (center of each group)
  const xTick = (i: number) => PADDING.left + (i + 0.5) * barGroupWidth;

  return (
    <div ref={setRef} className="relative w-full" style={{ height }}>
      <svg
        ref={svgRef}
        width={W}
        height={height}
        style={{ overflow: 'visible' }}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Grid lines */}
        {yTicks.map((tick, ti) => (
          <line
            key={`grid-${ti}`}
            x1={PADDING.left}
            x2={PADDING.left + innerW}
            y1={PADDING.top + toY(tick)}
            y2={PADDING.top + toY(tick)}
            stroke="#f0f0f0"
            strokeWidth={1}
          />
        ))}

        {/* Y-axis labels (primary) */}
        {yTicks.map((tick, ti) => (
          <text
            key={`ytick-${ti}`}
            x={PADDING.left - 6}
            y={PADDING.top + toY(tick) + 4}
            textAnchor="end"
            fontSize={11}
            fill="#a3a3a3"
          >
            {tick}
          </text>
        ))}

        {/* Y-axis labels (secondary) */}
        {lines.some(l => l.secondaryAxis) && secondaryDomain && [0, 25, 50, 75, 100].map((tick, ti) => (
          <text
            key={`ytick2-${ti}`}
            x={PADDING.left + innerW + 6}
            y={PADDING.top + toY(tick, true) + 4}
            textAnchor="start"
            fontSize={11}
            fill="#a3a3a3"
          >
            {secondaryFormatter ? secondaryFormatter(tick) : tick}
          </text>
        ))}

        {/* Bars */}
        {data.map((row, di) => {
          const groupX = PADDING.left + di * barGroupWidth + (barGroupWidth - totalBarWidth) / 2;
          return bars.map((bar, bi) => {
            const val = Number(row[bar.dataKey] ?? 0);
            const bh = (val / primaryAxisMax) * innerH;
            const bx = groupX + bi * (singleBarWidth + BAR_GAP);
            const by = PADDING.top + innerH - bh;
            const r = Math.min(3, bh / 2);
            return (
              <path
                key={`bar-${di}-${bi}`}
                d={bh > 0 ? `M${bx},${by + r} Q${bx},${by} ${bx + r},${by} L${bx + singleBarWidth - r},${by} Q${bx + singleBarWidth},${by} ${bx + singleBarWidth},${by + r} L${bx + singleBarWidth},${by + bh} L${bx},${by + bh} Z` : ''}
                fill={bar.color}
                opacity={tooltip && tooltip.idx !== di ? 0.5 : 1}
                style={{ transition: 'opacity 0.15s' }}
              />
            );
          });
        })}

        {/* Lines */}
        {lines.map((line, li) => {
          const isSecondary = !!line.secondaryAxis;
          const points = data.map((row, di) => ({
            x: xTick(di),
            y: PADDING.top + toY(Number(row[line.dataKey] ?? 0), isSecondary),
          }));
          const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
          return (
            <g key={`line-group-${li}`}>
              <path
                d={pathD}
                fill="none"
                stroke={line.color}
                strokeWidth={2.5}
                strokeDasharray={line.dashed ? '6 3' : undefined}
              />
              {points.map((p, di) => (
                <circle
                  key={`dot-${li}-${di}`}
                  cx={p.x}
                  cy={p.y}
                  r={tooltip?.idx === di ? 5 : 3.5}
                  fill={line.color}
                  stroke={tooltip?.idx === di ? '#fff' : 'none'}
                  strokeWidth={2}
                />
              ))}
            </g>
          );
        })}

        {/* X-axis labels */}
        {data.map((row, di) => (
          <text
            key={`xtick-${di}`}
            x={xTick(di)}
            y={PADDING.top + innerH + 18}
            textAnchor="middle"
            fontSize={11}
            fill="#a3a3a3"
          >
            {String(row[xKey])}
          </text>
        ))}

        {/* Invisible hover areas */}
        {data.map((_row, di) => (
          <rect
            key={`hover-${di}`}
            x={PADDING.left + di * barGroupWidth}
            y={PADDING.top}
            width={barGroupWidth}
            height={innerH}
            fill="transparent"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const containerRect = containerRef.current?.getBoundingClientRect();
              setTooltip({
                x: rect.left + rect.width / 2 - (containerRect?.left ?? 0),
                y: (containerRect?.top ?? 0) - (containerRect?.top ?? 0),
                idx: di,
              });
            }}
          />
        ))}
      </svg>

      {/* Tooltip */}
      {tooltip !== null && (() => {
        const row = data[tooltip.idx];
        const tipX = xTick(tooltip.idx);
        const isRight = tipX > W * 0.65;
        return (
          <div
            className="absolute z-50 pointer-events-none"
            style={{
              left: isRight ? undefined : tipX - PADDING.left + 8,
              right: isRight ? W - tipX - PADDING.left + 8 : undefined,
              top: PADDING.top + 4,
              background: '#fff',
              border: '1px solid #e5e5e5',
              borderRadius: 12,
              padding: '8px 12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              fontSize: 13,
              fontFamily: 'DM Sans, sans-serif',
              minWidth: 120,
            }}
          >
            <p className="mb-1" style={{ color: '#737373', fontWeight: 500, fontSize: 11 }}>{String(row[xKey])}</p>
            {[...bars, ...lines].map((series, si) => {
              const val = Number(row[series.dataKey] ?? 0);
              const displayVal = tooltipFormatter ? tooltipFormatter(val, series.dataKey) : val;
              return (
                <div key={`tip-${si}`} className="flex items-center gap-2">
                  <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: series.color, flexShrink: 0 }} />
                  <span style={{ color: '#404040', fontSize: 12 }}>{series.dataKey}</span>
                  <span style={{ marginLeft: 'auto', fontWeight: 600, color: '#1a1a1a', paddingLeft: 8 }}>{displayVal}</span>
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
}
