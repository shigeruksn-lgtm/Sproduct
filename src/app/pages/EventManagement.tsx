import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, PartyPopper, Plus, X } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type BookingStatus = 'confirmed' | 'tentative' | 'cancelled';

interface EventEntry {
  id: string;
  status: BookingStatus;
  myPagePublic: boolean;
  coupleId: string;
}

interface EventDaySlot {
  id: string;
  templateId: string;
  date: string;
  entries: EventEntry[];
  capacity: number;
}

interface RowTemplate {
  id: string;
  eventType: string;
  time: string;
  venueCode: string;
  venueName: string;
  capacity: number;
  activeDays: Set<number>; // 1-31
}

interface CellDetail {
  slot: EventDaySlot;
  template: RowTemplate;
  date: string;
  anchorRect: DOMRect;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const ROKUYO       = ['先勝', '友引', '先負', '仏滅', '大安', '赤口'] as const;
const ROKUYO_COLOR: Record<string, string> = {
  '大安': '#EDAE1C', '仏滅': '#9CA3AF', '赤口': '#E8703A',
  '先勝': '#9CA3AF', '友引': '#9CA3AF', '先負': '#9CA3AF',
};
const DOW_JA   = ['日', '月', '火', '水', '木', '金', '土'];
const MONTH_JA = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
const TODAY_STR = '2026-03-06';

const LABEL_W = 182;
const DAY_W   = 86;
const ROW_H   = 58;

const STATUS_CFG = {
  confirmed: { color: '#E8703A', label: '確定',       textColor: '#C04A18', bg: '#FDE8DA' },
  tentative: { color: '#EDAE1C', label: '仮予約',     textColor: '#8A6000', bg: '#FEF7D0' },
  cancelled: { color: '#9CA3AF', label: 'キャンセル', textColor: '#6B7280', bg: '#F3F4F6' },
} satisfies Record<BookingStatus, { color: string; label: string; textColor: string; bg: string }>;

const EVENT_TYPE_CFG: Record<string, { label: string; color: string; bg: string }> = {
  '通常':           { label: '通常',           color: '#64748B', bg: '#F1F5F9' },
  '試食会':         { label: '試食会',         color: '#BE185D', bg: '#FCE7F3' },
  'アニバーサリー': { label: 'アニバーサリー', color: '#7C3AED', bg: '#EDE9FE' },
  'ワークショップ': { label: 'ワークショップ', color: '#1D4ED8', bg: '#DBEAFE' },
  'アイテムフェア': { label: 'アイテムフェア', color: '#15803D', bg: '#DCFCE7' },
  'オンラインWS':   { label: 'オンラインWS',   color: '#0E7490', bg: '#CFFAFE' },
};

// ─── Row templates ────────────────────────────────────────────────────────────

const TEMPLATES: RowTemplate[] = [
  // 通常
  { id: 't01', eventType: '通常', time: '10:00', venueCode: 'HON', venueName: '---', capacity: 6,
    activeDays: new Set([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]) },
  // 試食会
  { id: 't02', eventType: '試食会', time: '12:00', venueCode: 'LPH', venueName: 'SCANDIA', capacity: 10,
    activeDays: new Set([1,4,8,11,15,18,22,25,29]) },
  { id: 't03', eventType: '試食会', time: '17:00', venueCode: 'SGS', venueName: 'ケンジントン', capacity: 8,
    activeDays: new Set([1,4,8,11,15,18,22,25,29]) },
  { id: 't04', eventType: '試食会', time: '18:00', venueCode: 'GOM', venueName: '---', capacity: 12,
    activeDays: new Set([1,4,8,11,15,18,22,25,29]) },
  // アニバーサリー
  { id: 't05', eventType: 'アニバーサリー', time: '17:00', venueCode: 'SGS', venueName: 'ケンジントン', capacity: 4,
    activeDays: new Set([1,8,15,22,29]) },
  { id: 't06', eventType: 'アニバーサリー', time: '18:00', venueCode: 'EXC', venueName: 'MIROIR', capacity: 4,
    activeDays: new Set([1,8,15,22,29]) },
  // ワークショップ
  { id: 't07', eventType: 'ワークショップ', time: '18:00', venueCode: 'CLO', venueName: 'ORCHID', capacity: 16,
    activeDays: new Set([1,7,8,14,15,21,22,28,29]) },
  { id: 't08', eventType: 'ワークショップ', time: '18:00', venueCode: 'EXC', venueName: 'PRINTEMPS', capacity: 16,
    activeDays: new Set([1,7,8,14,15,21,22,28,29]) },
  { id: 't09', eventType: 'ワークショップ', time: '18:00', venueCode: 'GOM', venueName: '---', capacity: 20,
    activeDays: new Set([1,7,8,14,15,21,22,28,29]) },
  { id: 't10', eventType: 'ワークショップ', time: '18:00', venueCode: 'HFR', venueName: 'ラテール', capacity: 14,
    activeDays: new Set([1,7,8,14,15,21,22,28,29]) },
  // アイテムフェア
  { id: 't11', eventType: 'アイテムフェア', time: '11:00', venueCode: 'EXC', venueName: 'LATONE', capacity: 12,
    activeDays: new Set([4,5,11,12,18,19,25,26]) },
  { id: 't12', eventType: 'アイテムフェア', time: '12:00', venueCode: 'SGS', venueName: 'サヴォイ', capacity: 12,
    activeDays: new Set([4,5,11,12,18,19,25,26]) },
  { id: 't13', eventType: 'アイテムフェア', time: '12:30', venueCode: 'GOM', venueName: '---', capacity: 8,
    activeDays: new Set([4,5,11,12,18,19,25,26]) },
  { id: 't14', eventType: 'アイテムフェア', time: '15:00', venueCode: 'SGS', venueName: 'サヴォイ', capacity: 12,
    activeDays: new Set([4,5,11,12,18,19,25,26]) },
  { id: 't15', eventType: 'アイテムフェア', time: '15:30', venueCode: 'GOM', venueName: '---', capacity: 8,
    activeDays: new Set([4,5,11,12,18,19,25,26]) },
  // オンラインWS
  { id: 't16', eventType: 'オンラインWS', time: '18:00', venueCode: 'HON', venueName: '---', capacity: 30,
    activeDays: new Set([4,11,18,25]) },
];

const EVENT_TYPE_ORDER = Object.keys(EVENT_TYPE_CFG);
const GROUPED_TEMPLATES = EVENT_TYPE_ORDER
  .map(et => ({ eventType: et, templates: TEMPLATES.filter(t => t.eventType === et) }))
  .filter(g => g.templates.length > 0);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const dStr = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

const getDow    = (y: number, m: number, d: number) => new Date(y, m, d).getDay();
const getRokuyo = (y: number, m: number, d: number) => {
  const diff = Math.round((new Date(y, m, d).getTime() - new Date(2026, 2, 1).getTime()) / 86400000);
  return ROKUYO[((diff % 6) + 6) % 6];
};

const pseudoRandom = (seed: number): number => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const generateSlot = (template: RowTemplate, day: number, year: number, month: number): EventDaySlot => {
  const date = dStr(year, month, day);
  const seed = parseInt(template.id.slice(1)) * 1000 + day * 13 + month * 7;
  const maxBooked = Math.round(pseudoRandom(seed) * template.capacity);

  const entries: EventEntry[] = Array.from({ length: maxBooked }, (_, i) => {
    const r1 = pseudoRandom(seed + i + 1);
    const r2 = pseudoRandom(seed + i + 50);
    const status: BookingStatus =
      r1 > 0.18 ? 'confirmed' :
      r2 > 0.38 ? 'tentative' :
      'cancelled';
    return {
      id: `${template.id}_${year}_${month}_${day}_${i}`,
      status,
      myPagePublic: pseudoRandom(seed + i + 100) > 0.42,
      coupleId: `${10000 + Math.floor(pseudoRandom(seed + i + 200) * 90000)}`,
    };
  });

  return {
    id: `s_${template.id}_${date}`,
    templateId: template.id,
    date,
    entries,
    capacity: template.capacity,
  };
};

// ─── SlotSquares ─────────────────────────────────────────────────────────────

function SlotSquares({ entries, capacity }: { entries: EventEntry[]; capacity: number }) {
  const MAX_SHOW = 14;
  const empty    = Math.max(0, capacity - entries.length);
  const visE     = entries.slice(0, MAX_SHOW);
  const remE     = Math.max(0, entries.length - visE.length);
  const visEmp   = Math.min(empty, Math.max(0, MAX_SHOW - visE.length));
  const remEmp   = Math.max(0, empty - visEmp);
  const remaining = remE + remEmp;

  return (
    <div className="flex flex-wrap gap-[2px]">
      {visE.map(e => (
        <div
          key={e.id}
          className="shrink-0 rounded-[2px]"
          style={{ width: 10, height: 10, background: STATUS_CFG[e.status].color }}
          title={STATUS_CFG[e.status].label}
        />
      ))}
      {Array.from({ length: visEmp }).map((_, i) => (
        <div
          key={`emp-${i}`}
          className="shrink-0 rounded-[2px]"
          style={{ width: 10, height: 10, border: '1.5px dashed #D1D5DB' }}
        />
      ))}
      {remaining > 0 && (
        <span style={{ fontSize: 8, color: '#9CA3AF', lineHeight: '10px' }}>+{remaining}</span>
      )}
    </div>
  );
}

// ─── EventCell ────────────────────────────────────────────────────────────────

function EventCell({
  slot,
  capacity,
  onClick,
}: {
  slot: EventDaySlot;
  capacity: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const booked  = slot.entries.length;
  const fillPct = capacity > 0 ? (booked / capacity) * 100 : 0;
  const isFull  = fillPct >= 90;

  return (
    <button
      onClick={onClick}
      className="w-full h-full text-left transition-colors px-1.5 py-1.5 flex flex-col gap-1 hover:bg-blue-50/40"
    >
      {/* progress + fraction */}
      <div className="flex items-center gap-1 w-full">
        <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: '#E5E7EB' }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${fillPct}%`, background: isFull ? '#EF4444' : '#22C55E' }}
          />
        </div>
        <span style={{ fontSize: 9, color: '#94A3B8', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
          {booked}/{capacity}
        </span>
      </div>
      {/* squares */}
      <SlotSquares entries={slot.entries} capacity={capacity} />
    </button>
  );
}

// ─── CellDetailPanel ─────────────────────────────────────────────────────────

function CellDetailPanel({ detail, onClose }: { detail: CellDetail; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { slot, template } = detail;
  const etCfg = EVENT_TYPE_CFG[template.eventType];

  const booked    = slot.entries.length;
  const confirmed = slot.entries.filter(e => e.status === 'confirmed').length;
  const tentative = slot.entries.filter(e => e.status === 'tentative').length;
  const cancelled = slot.entries.filter(e => e.status === 'cancelled').length;

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [onClose]);

  const PANEL_W = 292;
  const PANEL_H = 400;
  const r = detail.anchorRect;
  let left = r.right + 10;
  let top  = r.top;
  if (left + PANEL_W > window.innerWidth  - 8) left = r.left - PANEL_W - 10;
  if (top  + PANEL_H > window.innerHeight - 8) top  = window.innerHeight - PANEL_H - 12;
  top = Math.max(8, top);

  return (
    <div
      ref={ref}
      className="fixed z-[70] bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden"
      style={{ left, top, width: PANEL_W }}
      onClick={e => e.stopPropagation()}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: etCfg.bg }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="px-2.5 py-0.5 rounded-full"
              style={{ background: etCfg.color, color: '#fff', fontSize: 11, fontWeight: 600 }}
            >
              {etCfg.label}
            </span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#030213' }}>{template.time}〜</span>
          </div>
          <p style={{ fontSize: 11, color: '#64748B' }}>
            <span style={{ fontWeight: 600 }}>{template.venueCode}</span>
            {'  '}{template.venueName}{'  '}·{'  '}{detail.date}
          </p>
        </div>
        <button onClick={onClose} className="ml-2 shrink-0">
          <X className="w-4 h-4 text-neutral-400" />
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-5 border-b border-neutral-100 divide-x divide-neutral-100">
        {[
          { label: '予約計',    value: booked,               color: '#030213' },
          { label: '確定',      value: confirmed,            color: STATUS_CFG.confirmed.color },
          { label: '仮予約',    value: tentative,            color: STATUS_CFG.tentative.color },
          { label: 'キャンセル',value: cancelled,            color: STATUS_CFG.cancelled.color },
          { label: '空き',      value: slot.capacity - booked, color: '#9CA3AF' },
        ].map(s => (
          <div key={s.label} className="flex flex-col items-center py-2.5">
            <span style={{ fontSize: 18, fontWeight: 700, color: s.color, fontVariantNumeric: 'tabular-nums' }}>
              {s.value}
            </span>
            <span style={{ fontSize: 9, color: '#9CA3AF', marginTop: 1 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Entry list */}
      <div className="overflow-y-auto" style={{ maxHeight: 280 }}>
        {slot.entries.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>予約なし</p>
          </div>
        ) : (
          slot.entries.map((entry, i) => {
            const scfg = STATUS_CFG[entry.status];
            return (
              <div
                key={entry.id}
                className="flex items-center gap-3 px-4 py-2.5 border-b border-neutral-50 hover:bg-neutral-50 transition-colors"
              >
                <span style={{ fontSize: 10, color: '#9CA3AF', width: 18, flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
                  {i + 1}
                </span>
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: scfg.color }}
                />
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#030213' }}>
                    No.{entry.coupleId}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className="px-1.5 py-0.5 rounded"
                      style={{ background: scfg.bg, color: scfg.textColor, fontSize: 9, fontWeight: 500 }}
                    >
                      {scfg.label}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded"
                      style={{
                        background: entry.myPagePublic ? '#DBEAFE' : '#F3F4F6',
                        color:      entry.myPagePublic ? '#1D4ED8' : '#6B7280',
                        fontSize: 9,
                      }}
                    >
                      {entry.myPagePublic ? 'MyPage公開' : 'MyPage非公開'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function EventManagement() {
  const [year,       setYear]       = useState(2026);
  const [month,      setMonth]      = useState(2); // March
  const [filterType, setFilterType] = useState<string>('all');
  const [cellDetail, setCellDetail] = useState<CellDetail | null>(null);

  const scrollRef   = useRef<HTMLDivElement>(null);
  const todayColRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    if (todayColRef.current && scrollRef.current) {
      const c = scrollRef.current;
      const t = todayColRef.current;
      c.scrollTo({ left: t.offsetLeft - LABEL_W - 60, behavior: 'smooth' });
    }
  }, [month, year]);

  const prevMonth = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setYear(y => y + 1); setMonth(0);  } else setMonth(m => m + 1); };
  const goToday   = () => { setYear(2026); setMonth(2); };

  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  const days        = useMemo(() => Array.from({ length: daysInMonth }, (_, i) => i + 1), [daysInMonth]);

  const slotData = useMemo(() => {
    const data: EventDaySlot[] = [];
    for (const template of TEMPLATES) {
      for (let day = 1; day <= daysInMonth; day++) {
        if (template.activeDays.has(day)) {
          data.push(generateSlot(template, day, year, month));
        }
      }
    }
    return data;
  }, [year, month, daysInMonth]);

  const slotMap = useMemo(() => {
    const map = new Map<string, EventDaySlot>();
    slotData.forEach(s => map.set(`${s.templateId}_${s.date}`, s));
    return map;
  }, [slotData]);

  const stats = useMemo(() => {
    const all   = slotData.flatMap(s => s.entries);
    const today = slotData.filter(s => s.date === TODAY_STR).flatMap(s => s.entries);
    return {
      total:     all.length,
      confirmed: all.filter(e => e.status === 'confirmed').length,
      tentative: all.filter(e => e.status === 'tentative').length,
      events:    slotData.length,
      today:     today.length,
    };
  }, [slotData]);

  const displayedGroups = useMemo(() =>
    filterType === 'all'
      ? GROUPED_TEMPLATES
      : GROUPED_TEMPLATES.filter(g => g.eventType === filterType),
    [filterType],
  );

  const handleCellClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    slot: EventDaySlot,
    template: RowTemplate,
    date: string,
  ) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setCellDetail({ slot, template, date, anchorRect: rect });
  };

  return (
    <div
      className="flex flex-col h-full gap-4"
      style={{ fontFamily: 'DM Sans, sans-serif' }}
      onClick={() => setCellDetail(null)}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
            <PartyPopper className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm text-neutral-800" style={{ fontWeight: 600 }}>イベント管理</h1>
            <p className="text-[10px] text-neutral-400" style={{ fontWeight: 400 }}>EVENT</p>
          </div>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white hover:opacity-80 transition-all"
          style={{ background: '#030213', fontWeight: 500, fontSize: 13 }}
        >
          <Plus className="w-4 h-4" />
          イベント枠を追加
        </button>
      </div>

      {/* ── Month nav + stats ── */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <div className="flex items-center gap-1">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-neutral-900 w-28 text-center" style={{ fontWeight: 500, fontSize: 15 }}>
            {year}年 {MONTH_JA[month]}
          </span>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button onClick={goToday} className="ml-1 px-3 py-1 rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-100 transition-all" style={{ fontSize: 12 }}>
            今日
          </button>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          {[
            { label: '今月合計', value: stats.total,     color: '#030213' },
            { label: '確定',     value: stats.confirmed, color: STATUS_CFG.confirmed.color },
            { label: '仮予約',   value: stats.tentative, color: STATUS_CFG.tentative.color },
            { label: 'イベント', value: stats.events,    color: '#7C3AED' },
            { label: '本日',     value: stats.today,     color: '#4F46E5' },
          ].map(s => (
            <div key={s.label} className="px-3 py-2 rounded-xl bg-white border border-neutral-200 flex items-center gap-2">
              <span className="tabular-nums" style={{ color: s.color, fontWeight: 600, fontSize: 18 }}>{s.value}</span>
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filter + legend ── */}
      <div className="flex items-center gap-2 shrink-0 flex-wrap">
        <span style={{ fontSize: 11, letterSpacing: '0.2em', color: '#9CA3AF' }} className="uppercase mr-1">種別</span>

        {/* All filter */}
        <button
          onClick={() => setFilterType('all')}
          className="px-3 py-1.5 rounded-full transition-all"
          style={{
            background: filterType === 'all' ? '#030213' : '#F9FAFB',
            color:      filterType === 'all' ? 'white' : '#6B7280',
            border:     `1px solid ${filterType === 'all' ? '#030213' : '#E5E7EB'}`,
            fontWeight: filterType === 'all' ? 500 : 400,
            fontSize: 13,
          }}
        >
          すべて
        </button>

        {Object.entries(EVENT_TYPE_CFG).map(([key, cfg]) => {
          const active = filterType === key;
          return (
            <button
              key={key}
              onClick={() => setFilterType(key)}
              className="px-3 py-1.5 rounded-full transition-all"
              style={{
                background: active ? cfg.color : cfg.bg,
                color:      active ? 'white' : cfg.color,
                border:     `1px solid ${active ? cfg.color : 'transparent'}`,
                fontWeight: active ? 500 : 400,
                fontSize: 13,
              }}
            >
              {cfg.label}
            </button>
          );
        })}

        {/* Legend */}
        <div className="ml-auto flex items-center gap-3">
          {(Object.keys(STATUS_CFG) as BookingStatus[]).map(s => (
            <div key={s} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-[2px]" style={{ background: STATUS_CFG[s].color }} />
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>{STATUS_CFG[s].label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-[2px]" style={{ border: '1.5px dashed #D1D5DB' }} />
            <span style={{ fontSize: 11, color: '#9CA3AF' }}>空き</span>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-auto rounded-xl border border-neutral-200 bg-white"
      >
        <table
          style={{
            borderCollapse: 'collapse',
            tableLayout: 'fixed',
            minWidth: LABEL_W + daysInMonth * DAY_W,
          }}
        >
          <colgroup>
            <col style={{ width: LABEL_W, minWidth: LABEL_W }} />
            {days.map(d => <col key={d} style={{ width: DAY_W, minWidth: DAY_W }} />)}
          </colgroup>

          {/* ── Date header ── */}
          <thead>
            <tr>
              {/* Corner */}
              <th
                style={{
                  position: 'sticky', top: 0, left: 0, zIndex: 30,
                  background: '#fff',
                  borderBottom: '1px solid #E5E7EB',
                  borderRight:  '1px solid #E5E7EB',
                  padding: '8px 12px',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 10, color: '#9CA3AF', letterSpacing: '0.1em' }}>EVENT / TIME</span>
              </th>

              {days.map(d => {
                const ds   = dStr(year, month, d);
                const dow  = getDow(year, month, d);
                const ry   = getRokuyo(year, month, d);
                const isTd = ds === TODAY_STR;
                const isSun = dow === 0;
                const isSat = dow === 6;
                return (
                  <th
                    key={d}
                    ref={isTd ? todayColRef : undefined}
                    style={{
                      position: 'sticky', top: 0, zIndex: 20,
                      background: isTd ? '#030213' : '#fff',
                      borderBottom: '1px solid #E5E7EB',
                      borderRight:  '1px solid #F3F4F6',
                      padding: '5px 3px',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                    }}
                  >
                    <div style={{
                      fontSize: 14, fontWeight: isTd ? 700 : 500,
                      color: isTd ? '#fff' : isSun ? '#EF4444' : isSat ? '#3B82F6' : '#1F2937',
                    }}>
                      {String(d).padStart(2, '0')}
                    </div>
                    <div style={{
                      fontSize: 9,
                      color: isTd ? 'rgba(255,255,255,0.7)' : isSun ? '#FCA5A5' : isSat ? '#93C5FD' : '#9CA3AF',
                    }}>
                      {DOW_JA[dow]}
                    </div>
                    <div style={{
                      fontSize: 8,
                      color: isTd ? 'rgba(255,255,255,0.5)' : ROKUYO_COLOR[ry] ?? '#9CA3AF',
                      marginTop: 1,
                    }}>
                      {ry}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* ── Body: one <tbody> per event-type group to avoid React.Fragment prop issues ── */}
          {displayedGroups.map(group => {
            const etCfg = EVENT_TYPE_CFG[group.eventType];
            return (
              <tbody key={group.eventType}>
                {/* ── Event type group header row ── */}
                <tr>
                  <td
                    style={{
                      position: 'sticky', left: 0, zIndex: 10,
                      padding: '5px 12px',
                      background: etCfg.bg,
                      borderTop:    '2px solid #E5E7EB',
                      borderBottom: '1px solid #E5E7EB',
                      borderRight:  '1px solid #E5E7EB',
                    }}
                  >
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full"
                      style={{ background: etCfg.color, color: '#fff', fontSize: 11, fontWeight: 600 }}
                    >
                      {etCfg.label}
                    </span>
                  </td>
                  {days.map(d => (
                    <td
                      key={d}
                      style={{
                        background:   etCfg.bg,
                        borderTop:    '2px solid #E5E7EB',
                        borderBottom: '1px solid #E5E7EB',
                        borderRight:  '1px solid #F3F4F6',
                        padding: 0,
                      }}
                    />
                  ))}
                </tr>

                {/* ── Template rows ── */}
                {group.templates.map((template, ti) => {
                  const isLastInGroup = ti === group.templates.length - 1;
                  return (
                    <tr key={template.id}>
                      {/* Left label – sticky */}
                      <td
                        style={{
                          position: 'sticky', left: 0, zIndex: 10,
                          background: '#fff',
                          borderBottom: isLastInGroup ? '1px solid #E0E7EF' : '1px solid #F3F4F6',
                          borderRight:  '1px solid #E5E7EB',
                          padding: '0 8px',
                          height: ROW_H,
                          verticalAlign: 'middle',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span style={{
                            fontSize: 11, fontVariantNumeric: 'tabular-nums',
                            color: '#374151', fontWeight: 600, width: 38, flexShrink: 0,
                          }}>
                            {template.time}
                          </span>
                          <span
                            style={{
                              fontSize: 9, fontWeight: 700, color: '#fff',
                              background: etCfg.color, borderRadius: 3,
                              padding: '1px 4px', minWidth: 28,
                              textAlign: 'center', flexShrink: 0,
                            }}
                          >
                            {template.venueCode}
                          </span>
                          <span style={{
                            fontSize: 11, color: '#64748B',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>
                            {template.venueName}
                          </span>
                        </div>
                      </td>

                      {/* Day cells */}
                      {days.map(d => {
                        const ds          = dStr(year, month, d);
                        const isScheduled = template.activeDays.has(d);
                        const slot        = slotMap.get(`${template.id}_${ds}`);
                        const isTd        = ds === TODAY_STR;
                        const dow         = getDow(year, month, d);
                        const isSun       = dow === 0;
                        const isSat       = dow === 6;

                        const baseBg = isTd
                          ? (isScheduled ? 'rgba(3,2,19,0.04)' : 'rgba(3,2,19,0.015)')
                          : isSun
                          ? (isScheduled ? '#FFF8F8' : '#FFFCFC')
                          : isSat
                          ? (isScheduled ? '#F5F8FF' : '#F9FAFE')
                          : isScheduled ? '#fff' : '#FAFAFA';

                        return (
                          <td
                            key={d}
                            style={{
                              height: ROW_H,
                              padding: 0,
                              verticalAlign: 'top',
                              borderBottom: isLastInGroup ? '1px solid #E0E7EF' : '1px solid #F3F4F6',
                              borderRight:  '1px solid #F3F4F6',
                              background: baseBg,
                            }}
                          >
                            {isScheduled && slot ? (
                              <EventCell
                                slot={slot}
                                capacity={template.capacity}
                                onClick={e => handleCellClick(e, slot, template, ds)}
                              />
                            ) : isScheduled ? (
                              <div className="w-full h-full flex items-center justify-center">
                                <div style={{ width: 8, height: 8, border: '1.5px dashed #E5E7EB', borderRadius: 2 }} />
                              </div>
                            ) : null}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            );
          })}
        </table>
      </div>

      {/* ── Cell detail panel ── */}
      {cellDetail && (
        <CellDetailPanel
          detail={cellDetail}
          onClose={() => setCellDetail(null)}
        />
      )}
    </div>
  );
}