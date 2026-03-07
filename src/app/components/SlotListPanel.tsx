import React, { useRef, useEffect } from 'react';
import { X, Plus } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SlotType = 'new' | 'returning' | 'meeting';

interface SlotEntry {
  id: string;
  type: SlotType;
  customerName?: string;
}

export interface TimeBlockInfo {
  id: string;
  date: string;
  hour: number;
  capacity: number;
  label: string;
  entries: SlotEntry[];
}

// ─── Config ───────────────────────────────────────────────────────────────────

const TYPE_CFG = {
  new:       { label: '新規', short: '新', color: '#E8703A', bg: '#FDE8DA', text: '#C04A18' },
  returning: { label: '再来', short: '再', color: '#EDAE1C', bg: '#FEF7D0', text: '#8A6000' },
  meeting:   { label: '打合', short: '打', color: '#7A68C0', bg: '#EAE7F8', text: '#4E3DA0' },
} as const;

const DOW_JA   = ['日', '月', '火', '水', '木', '金', '土'];
const ROKUYO   = ['先勝', '友引', '先負', '仏滅', '大安', '赤口'];
const getRokuyo = (y: number, m: number, d: number) => {
  const diff = Math.round((new Date(y, m, d).getTime() - new Date(2026, 2, 1).getTime()) / 86400000);
  return ROKUYO[((diff % 6) + 6) % 6];
};

// ─── Mock customer data ───────────────────────────────────────────────────────

const MOCK_CUSTOMERS = [
  { name: '佐藤 優香 / 田中 亮太 様', eventDate: '2026/10', cap: 80,  guests: 2, trial: 2, direct: true,  fair: 'ブライダルフェア', staff: '石井 優明', media: 'ゼクシィネット',    venue: 'アーカンジェル代官山' },
  { name: '山田 花子 / 山田 一郎 様', eventDate: '2026/06', cap: 60,  guests: 2, trial: 0, direct: false, fair: '個別案内',         staff: '高橋 恭平', media: 'ウェディングニュース', venue: 'カサ・デ・アンジェラ' },
  { name: '鈴木 美咲 / 鈴木 健二 様', eventDate: '2026/11', cap: 90,  guests: 2, trial: 2, direct: true,  fair: 'フォト相談',       staff: '上野 詩菜', media: 'その他WEB広告',      venue: 'アニヴェルセル' },
  { name: '伊藤 沙織 / 伊藤 大輔 様', eventDate: '2027/03', cap: 110, guests: 2, trial: 0, direct: false, fair: 'ブライダルフェア', staff: '佐藤 花子', media: 'ゼクシィネット',    venue: 'リビエラ逗子' },
  { name: '渡辺 彩 / 渡辺 翔太 様',   eventDate: '2026/09', cap: 70,  guests: 2, trial: 2, direct: true,  fair: '個別案内',         staff: '木村 一郎', media: 'ゼクシィ本誌',      venue: '青山エリュシオン' },
  { name: '中村 友美 / 中村 浩二 様', eventDate: '2026/12', cap: 120, guests: 2, trial: 0, direct: false, fair: '会場見学',         staff: '山田 美咲', media: '式場見学イベント',   venue: '東京ベイコート' },
  { name: '加藤 里奈 / 加藤 真一 様', eventDate: '2026/08', cap: 80,  guests: 2, trial: 2, direct: true,  fair: 'ブライダルフェア', staff: '石井 優明', media: 'ゼクシィネット',    venue: 'コルトーナ東京' },
  { name: '小林 恵 / 小林 拓也 様',   eventDate: '2027/01', cap: 50,  guests: 2, trial: 0, direct: false, fair: '個別案内',         staff: '高橋 恭平', media: 'その他WEB広告',      venue: 'カサ・デ・アンジェラ' },
];

const CAMPAIGNS = [
  '【年に1度のメガBIG】最大特典\nアマゾンギフト10,000円分\nレストランランチチケット11,000円',
  '※元プランナーのくるみさんです！！',
  '【3/1(日)14:00 メガBIGキャンペーン】\nアマゾンギフト10,000円分',
  '※デザートビュッフェ→原則大人分',
  '',
  '【特別割引あり】式場見学特典付き',
];

// ─── EndTime helper ───────────────────────────────────────────────────────────

const END_TIMES = ['10:30', '10:45', '11:00', '14:30', '14:45', '15:00', '17:30', '17:45'];
const getEndTime = (hour: number, idx: number) => {
  const base  = hour + 1;
  const mins  = [30, 45, 0][idx % 3];
  const h     = mins === 0 ? base + 1 : base;
  return `${String(h).padStart(2,'0')}:${mins === 0 ? '00' : String(mins)}`;
};

// ─── Panel component ──────────────────────────────────────────────────────────

interface Props {
  blocks:    TimeBlockInfo[];
  anchorRect: DOMRect;
  onClose:   () => void;
  onAddSlot?: () => void;
}

export default function SlotListPanel({ blocks, anchorRect, onClose, onAddSlot }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  if (!blocks.length) return null;

  const { date, hour, label } = blocks[0];
  const [y, m0, d] = date.split('-').map(Number);
  const m   = m0 - 1;
  const dow = new Date(y, m, d).getDay();
  const ry  = getRokuyo(y, m, d);

  const allEntries  = blocks.flatMap(b => b.entries);
  const totalCap    = blocks.reduce((s, b) => s + b.capacity, 0);
  const emptyCount  = Math.max(0, totalCap - allEntries.length);

  const counts = {
    new:       allEntries.filter(e => e.type === 'new').length,
    returning: allEntries.filter(e => e.type === 'returning').length,
    meeting:   allEntries.filter(e => e.type === 'meeting').length,
  };

  // Position: prefer below the cell; if too low, flip up
  const PANEL_H = Math.min(
    allEntries.length * 96 + emptyCount * 56 + 140,
    540,
  );
  const PANEL_W = 620;
  const spaceBelow = window.innerHeight - anchorRect.bottom - 8;
  const spaceRight = window.innerWidth  - anchorRect.left   - 8;

  let top  = anchorRect.bottom + 6;
  let left = anchorRect.left;

  if (spaceBelow < PANEL_H) top  = Math.max(8, anchorRect.top - PANEL_H - 6);
  if (left + PANEL_W > window.innerWidth - 8) left = Math.max(8, window.innerWidth - PANEL_W - 8);

  // Build row list: entries then empties
  let tptSeq = 1;

  return (
    <div
      ref={ref}
      className="fixed z-[90] rounded-xl shadow-2xl border border-neutral-200 overflow-hidden"
      style={{
        top, left,
        width: PANEL_W,
        maxHeight: 520,
        background: '#FFFFFF',
        fontFamily: 'DM Sans, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{ background: '#F8F4E8', borderBottom: '1px solid #E8E0CC' }}
      >
        <div className="flex items-center gap-3">
          {/* Time badge */}
          <div
            className="flex items-center justify-center rounded-lg px-3 py-1.5"
            style={{ background: '#030213', color: 'white', minWidth: 64 }}
          >
            <span style={{ fontSize: 15, fontWeight: 600 }} className="tabular-nums">
              {String(hour).padStart(2,'0')}:00
            </span>
          </div>

          {/* Date + label */}
          <div>
            <div className="flex items-center gap-1.5">
              <span style={{ color: '#1E293B', fontWeight: 500, fontSize: 13 }}>
                {y}年{String(m+1).padStart(2,'0')}月{String(d).padStart(2,'0')}日
              </span>
              <span style={{ fontSize: 12, color: DOW_JA[dow] === '日' ? '#E8703A' : DOW_JA[dow] === '土' ? '#E48E20' : '#6B7280' }}>
                ({DOW_JA[dow]})
              </span>
              <span
                className="px-1.5 py-0.5 rounded"
                style={{ background: '#E5E0CF', color: '#78716C', fontSize: 11 }}
              >
                {ry}
              </span>
              <span
                className="px-1.5 py-0.5 rounded"
                style={{ background: '#030213', color: '#E0EAFF', fontSize: 11, fontWeight: 500 }}
              >
                {label}
              </span>
            </div>
            {/* Stats */}
            <div className="flex items-center gap-2 mt-1">
              {(Object.keys(counts) as (keyof typeof counts)[]).map(t => (
                counts[t] > 0 ? (
                  <span key={t} className="flex items-center gap-1">
                    <span
                      className="inline-flex items-center justify-center rounded text-white"
                      style={{ width: 18, height: 18, background: TYPE_CFG[t].color, fontWeight: 700, fontSize: 10 }}
                    >
                      {TYPE_CFG[t].short}
                    </span>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>{counts[t]}</span>
                  </span>
                ) : null
              ))}
              {emptyCount > 0 && (
                <span className="flex items-center gap-1">
                  <span
                    className="inline-flex items-center justify-center rounded"
                    style={{ width: 18, height: 18, border: '1.5px dashed #D1D5DB', color: '#9CA3AF', fontWeight: 600, fontSize: 10 }}
                  >空</span>
                  <span style={{ fontSize: 12, color: '#9CA3AF' }}>{emptyCount}</span>
                </span>
              )}
              <span style={{ fontSize: 11, color: '#CBD5E1' }} className="tabular-nums">
                計 {allEntries.length}/{totalCap}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {onAddSlot && (
            <button
              onClick={onAddSlot}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-80"
              style={{ background: '#030213', fontSize: 12 }}
            >
              <Plus className="w-3.5 h-3.5" />
              追加
            </button>
          )}
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-200 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Column headers ── */}
      <div
        className="grid shrink-0"
        style={{
          gridTemplateColumns: '36px 56px 22px 1fr 56px 46px 40px 44px',
          gap: '0 8px',
          borderBottom: '1px solid #F1F5F9',
          padding: '5px 12px',
          background: '#FAFAFA',
        }}
      >
        {['#', '時刻', '種別', 'お客様', '実施日', '名様', '来館', '担当'].map(h => (
          <span key={h} style={{ fontSize: 10, letterSpacing: '0.1em', color: '#9CA3AF' }} className="uppercase">{h}</span>
        ))}
      </div>

      {/* ── Rows ── */}
      <div className="flex-1 overflow-y-auto">
        {blocks.map(block =>
          block.entries.map((entry, ei) => {
            const seq  = tptSeq++;
            const mock = MOCK_CUSTOMERS[(seq - 1) % MOCK_CUSTOMERS.length];
            const camp = CAMPAIGNS[(seq - 1) % CAMPAIGNS.length];
            const cfg  = TYPE_CFG[entry.type];

            return (
              <div
                key={entry.id}
                className="flex flex-col border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                style={{ minHeight: 80 }}
              >
                {/* Main row */}
                <div
                  className="grid items-center px-3 py-2.5"
                  style={{
                    gridTemplateColumns: '36px 56px 22px 1fr 56px 46px 40px 44px',
                    gap: '0 8px',
                  }}
                >
                  {/* # */}
                  <span style={{ fontSize: 11, color: '#94A3B8' }} className="tabular-nums text-center">{seq}</span>

                  {/* 時刻 */}
                  <div className="flex flex-col">
                    <span style={{ fontSize: 13, color: '#1E293B', fontWeight: 500 }} className="tabular-nums">
                      {String(hour).padStart(2,'0')}:00
                    </span>
                    <span style={{ fontSize: 10, color: TYPE_CFG.returning.color, fontWeight: 500 }} className="tabular-nums">
                      {getEndTime(hour, ei)}
                    </span>
                  </div>

                  {/* 種別バッジ */}
                  <span
                    className="inline-flex items-center justify-center rounded text-white shrink-0"
                    style={{ width: 20, height: 20, background: cfg.color, fontWeight: 700, fontSize: 10 }}
                  >
                    {cfg.short}
                  </span>

                  {/* お客様名 */}
                  <div className="min-w-0">
                    <span
                      style={{
                        fontSize: 11,
                        color: '#1E293B',
                        fontWeight: 400,
                        filter: 'blur(3.5px)',
                        userSelect: 'none',
                        background: '#F8FAFC',
                        display: 'inline-block',
                        padding: '1px 4px',
                        borderRadius: 3,
                      }}
                    >
                      {mock.name}
                    </span>
                  </div>

                  {/* 実施日 */}
                  <span style={{ fontSize: 12, color: '#374151' }} className="tabular-nums">
                    {mock.eventDate}
                  </span>

                  {/* 名様 */}
                  <span style={{ fontSize: 12, color: '#374151' }}>
                    {mock.cap}名
                  </span>

                  {/* 来館 */}
                  <span style={{ fontSize: 12, color: '#374151' }}>
                    {mock.guests}人
                  </span>

                  {/* 担当 */}
                  <span style={{ fontSize: 11, color: '#6B7280' }} className="truncate">
                    {mock.staff.split(' ')[0]}
                  </span>
                </div>

                {/* Sub-row */}
                <div
                  className="flex items-start gap-4 pb-2"
                  style={{ paddingLeft: 52 }}
                >
                  <span style={{ fontSize: 11, color: '#94A3B8' }}>{mock.fair}</span>
                  <span style={{ fontSize: 11, color: '#94A3B8' }}>{mock.media}</span>
                  <span style={{ fontSize: 11, color: '#94A3B8', maxWidth: 140 }} className="truncate">{mock.venue}</span>
                  {camp && (
                    <span style={{ fontSize: 11, color: '#E8703A', maxWidth: 160 }} className="truncate flex-1">
                      {camp.split('\n')[0]}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* ── Empty slots ── */}
        {Array.from({ length: emptyCount }).map((_, i) => {
          const seq = tptSeq++;
          return (
            <div
              key={`empty-${i}`}
              className="flex items-center border-b border-neutral-100"
              style={{ minHeight: 52 }}
            >
              <div
                className="grid items-center px-3 w-full"
                style={{ gridTemplateColumns: '36px 56px 22px 1fr', gap: '0 8px' }}
              >
                <span style={{ fontSize: 11, color: '#D1D5DB' }} className="tabular-nums text-center">{seq}</span>
                <span style={{ fontSize: 13, color: '#D1D5DB' }} className="tabular-nums">
                  {String(hour).padStart(2,'0')}:00
                </span>
                <span
                  className="inline-flex items-center justify-center rounded shrink-0"
                  style={{ width: 20, height: 20, border: '1.5px dashed #E5E7EB' }}
                />
                <span
                  style={{ background: '#FEF3D0', color: '#8C5200', fontSize: 12, display: 'inline-block', padding: '4px 16px', borderRadius: 4 }}
                >
                  予約受付可能
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}