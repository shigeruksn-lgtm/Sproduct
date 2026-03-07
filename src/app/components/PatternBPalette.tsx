import React, { useState } from 'react';

// ─── Color utils ────────────────────────────────────────────────────────────

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

// テキストが白か黒か判定（輝度ベース）
function needsWhiteText(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.45;
}

// 10段階パレット生成
function generatePalette(hex: string): { stop: number; color: string }[] {
  const [h, s, l] = hexToHsl(hex);
  // saturation: lightになるほど彩度を下げる
  return [
    { stop: 50,  color: hslToHex(h, Math.max(s * 0.12, 8),  97) },
    { stop: 100, color: hslToHex(h, Math.max(s * 0.22, 14), 93) },
    { stop: 200, color: hslToHex(h, Math.max(s * 0.38, 22), 86) },
    { stop: 300, color: hslToHex(h, s * 0.55, 76) },
    { stop: 400, color: hslToHex(h, s * 0.78, 64) },
    { stop: 500, color: hex }, // base — actual color
    { stop: 600, color: hslToHex(h, Math.min(s * 1.05, 100), Math.max(l - 8,  10)) },
    { stop: 700, color: hslToHex(h, Math.min(s * 1.08, 100), Math.max(l - 16, 8))  },
    { stop: 800, color: hslToHex(h, Math.min(s * 1.10, 100), Math.max(l - 24, 6))  },
    { stop: 900, color: hslToHex(h, Math.min(s * 1.12, 100), Math.max(l - 33, 4))  },
  ];
}

// 補助カラー生成
type Supplementary = {
  label: string;
  role: string;
  color: string;
};

function generateSupplementary(hex: string): Supplementary[] {
  const [h, s, l] = hexToHsl(hex);
  return [
    {
      label: 'Complementary',
      role: '補色 / H+180°',
      color: hslToHex((h + 180) % 360, s, l),
    },
    {
      label: 'Analogous Warm',
      role: '類似色 / H+30°',
      color: hslToHex((h + 30) % 360, s, l),
    },
    {
      label: 'Analogous Cool',
      role: '類似色 / H−30°',
      color: hslToHex((h + 330) % 360, s, l),
    },
    {
      label: 'Triadic A',
      role: 'トライアド / H+120°',
      color: hslToHex((h + 120) % 360, s, l),
    },
    {
      label: 'Triadic B',
      role: 'トライアド / H+240°',
      color: hslToHex((h + 240) % 360, s, l),
    },
    {
      label: 'Split Comp A',
      role: 'スプリット / H+150°',
      color: hslToHex((h + 150) % 360, s, l),
    },
    {
      label: 'Split Comp B',
      role: 'スプリット / H+210°',
      color: hslToHex((h + 210) % 360, s, l),
    },
    {
      label: 'Tint Muted',
      role: '淡彩 / S×0.4 L+20',
      color: hslToHex(h, s * 0.4, Math.min(l + 20, 95)),
    },
    {
      label: 'Shade Deep',
      role: '深色 / S×1.1 L−25',
      color: hslToHex(h, Math.min(s * 1.1, 100), Math.max(l - 25, 5)),
    },
  ];
}

// ─── 9 base colors ───────────────────────────────────────────────────────────

const BASE_COLORS = [
  { hex: '#F5C518', label: 'Gold',       pos: '[0,0]', nameJa: 'ゴールド' },
  { hex: '#EDAE1C', label: 'Amber Lt',   pos: '[0,1]', nameJa: 'アンバーライト' },
  { hex: '#E48E20', label: 'Amber Dk',   pos: '[0,2]', nameJa: 'アンバーダーク' },
  { hex: '#E0962A', label: 'Copper',     pos: '[1,0]', nameJa: 'コッパー' },
  { hex: '#D06030', label: 'Terracotta', pos: '[1,1]', nameJa: 'テラコッタ' },
  { hex: '#A83C42', label: 'Crimson',    pos: '[1,2]', nameJa: 'クリムゾン' },
  { hex: '#7E3858', label: 'Berry',      pos: '[2,0]', nameJa: 'ベリー' },
  { hex: '#503A6E', label: 'Plum',       pos: '[2,1]', nameJa: 'プラム' },
  { hex: '#3C2562', label: 'Deep Navy',  pos: '[2,2]', nameJa: 'ディープネイビー' },
];

// ─── Sub components ───────────────────────────────────────────────────────────

const CopyBadge = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const succeed = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    };
    try {
      navigator.clipboard.writeText(value).then(succeed).catch(() => {
        // fallback for blocked Clipboard API
        const el = document.createElement('textarea');
        el.value = value;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        succeed();
      });
    } catch {
      succeed();
    }
  };
  return (
    <button
      onClick={copy}
      className="font-mono text-[10px] tracking-wide px-1.5 py-0.5 rounded hover:bg-neutral-100 transition-colors text-neutral-500 cursor-pointer select-none"
      title="クリックでコピー"
    >
      {copied ? '✓ copied' : value}
    </button>
  );
};

const PaletteStrip = ({ palette }: { palette: { stop: number; color: string }[] }) => (
  <div className="flex h-10 rounded-lg overflow-hidden w-full">
    {palette.map(({ stop, color }) => (
      <div
        key={stop}
        className="flex-1 relative group cursor-pointer"
        style={{ backgroundColor: color }}
        title={`${stop}: ${color}`}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span
            className="text-[8px] font-mono leading-none px-0.5"
            style={{ color: needsWhiteText(color) ? '#ffffff' : '#000000' }}
          >
            {stop}
          </span>
        </div>
      </div>
    ))}
  </div>
);

// ─── Color Card (main palette) ───────────────────────────────────────────────

const ColorCard = ({ hex, label, nameJa, pos }: typeof BASE_COLORS[number]) => {
  const palette = generatePalette(hex);
  const supplementary = generateSupplementary(hex);
  const [hue, sat, lig] = hexToHsl(hex);
  const white = needsWhiteText(hex);

  return (
    <div className="bg-white border border-neutral-100 overflow-hidden">
      {/* Hero swatch */}
      <div
        className="relative p-6 pb-10"
        style={{ backgroundColor: hex, minHeight: 120 }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p
              className="text-xs tracking-[0.15em] uppercase mb-0.5"
              style={{ color: white ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.45)' }}
            >
              {pos}
            </p>
            <p
              className="tracking-tight"
              style={{
                color: white ? '#ffffff' : '#1a1a1a',
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              {label}
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: white ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.4)' }}
            >
              {nameJa}
            </p>
          </div>
          <span
            className="font-mono text-xs mt-1"
            style={{ color: white ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.5)' }}
          >
            {hex.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Palette strip */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-[9px] tracking-[0.15em] uppercase text-neutral-300 mb-2">Color Scale</p>
        <PaletteStrip palette={palette} />
      </div>

      {/* Palette detail table */}
      <div className="px-4 pb-4 pt-2">
        <div className="grid grid-cols-5 gap-px bg-neutral-100">
          {palette.map(({ stop, color }) => (
            <div key={stop} className="bg-white">
              <div className="w-full" style={{ height: 28, backgroundColor: color }} />
              <div className="px-1 py-1">
                <p className="text-[8px] text-neutral-400 font-mono text-center">{stop}</p>
                <CopyBadge value={color.toUpperCase()} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HSL info */}
      <div className="px-4 pb-3 border-t border-neutral-50 pt-2 flex gap-4">
        <div>
          <p className="text-[8px] text-neutral-300 uppercase tracking-widest mb-0.5">H</p>
          <p className="text-[10px] font-mono text-neutral-500">{Math.round(hue)}°</p>
        </div>
        <div>
          <p className="text-[8px] text-neutral-300 uppercase tracking-widest mb-0.5">S</p>
          <p className="text-[10px] font-mono text-neutral-500">{Math.round(sat)}%</p>
        </div>
        <div>
          <p className="text-[8px] text-neutral-300 uppercase tracking-widest mb-0.5">L</p>
          <p className="text-[10px] font-mono text-neutral-500">{Math.round(lig)}%</p>
        </div>
        <div>
          <p className="text-[8px] text-neutral-300 uppercase tracking-widest mb-0.5">RGB</p>
          <p className="text-[10px] font-mono text-neutral-500">{hexToRgb(hex)}</p>
        </div>
      </div>

      {/* Supplementary colors */}
      <div className="border-t border-neutral-100 px-4 pt-3 pb-4">
        <p className="text-[9px] tracking-[0.15em] uppercase text-neutral-300 mb-2">Supplementary Colors</p>
        <div className="space-y-1.5">
          {supplementary.map((sup) => {
            const sw = needsWhiteText(sup.color);
            return (
              <div key={sup.label} className="flex items-center gap-2">
                <div
                  className="flex-shrink-0 rounded w-7 h-7"
                  style={{ backgroundColor: sup.color }}
                  title={sup.color}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-neutral-400 truncate">{sup.label}</p>
                  <p className="text-[8px] text-neutral-300 font-mono truncate">{sup.role}</p>
                </div>
                <CopyBadge value={sup.color.toUpperCase()} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Full palette grid + supplementary overview ───────────────────────────────

const SupplementaryOverview = () => {
  // 全9色の補色を一覧
  return (
    <div className="mt-px bg-white p-8">
      <p className="text-[9px] tracking-[0.15em] uppercase text-neutral-300 mb-6">
        Supplementary Overview — 9 colors × 9 relations
      </p>
      {/* Roles */}
      {(['Complementary', 'Analogous Warm', 'Analogous Cool', 'Triadic A', 'Triadic B',
         'Split Comp A', 'Split Comp B', 'Tint Muted', 'Shade Deep'] as const).map((role) => (
        <div key={role} className="flex items-center gap-3 mb-2">
          <span className="text-[9px] text-neutral-400 w-28 flex-shrink-0 truncate">{role}</span>
          <div className="flex gap-1 flex-1">
            {BASE_COLORS.map(({ hex, label }) => {
              const sups = generateSupplementary(hex);
              const match = sups.find(s => s.label === role);
              const color = match?.color ?? hex;
              return (
                <div
                  key={label}
                  className="flex-1 h-6 rounded-sm"
                  style={{ backgroundColor: color }}
                  title={`${label} / ${role}: ${color}`}
                />
              );
            })}
          </div>
        </div>
      ))}
      {/* Base row */}
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-neutral-100">
        <span className="text-[9px] text-neutral-400 w-28 flex-shrink-0">Base (original)</span>
        <div className="flex gap-1 flex-1">
          {BASE_COLORS.map(({ hex, label }) => (
            <div
              key={label}
              className="flex-1 h-6 rounded-sm"
              style={{ backgroundColor: hex }}
              title={`${label}: ${hex}`}
            />
          ))}
        </div>
      </div>
      {/* Labels */}
      <div className="flex items-center gap-3 mt-1">
        <span className="w-28 flex-shrink-0" />
        <div className="flex gap-1 flex-1">
          {BASE_COLORS.map(({ label }) => (
            <p key={label} className="flex-1 text-center text-[7px] text-neutral-300 font-mono truncate">{label}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const PatternBPalette = () => {
  return (
    <div>
      {/* 9-color palette grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-neutral-100">
        {BASE_COLORS.map((c) => (
          <ColorCard key={c.hex} {...c} />
        ))}
      </div>

      {/* Supplementary overview matrix */}
      <SupplementaryOverview />
    </div>
  );
};