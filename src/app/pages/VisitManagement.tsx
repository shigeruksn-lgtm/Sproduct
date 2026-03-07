import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, CalendarDays } from 'lucide-react';
import DayDetailModal from '../components/DayDetailModal';
import SlotListPanel, { TimeBlockInfo } from '../components/SlotListPanel';

// ─── Types ────────────────────────────────────────────────────────────────────

type SlotType = 'new' | 'returning' | 'meeting';

interface SlotEntry {
  id: string;
  type: SlotType;
  customerName?: string;
}

interface TimeBlock {
  id: string;
  date: string;
  hour: number;
  capacity: number;
  label: string;
  entries: SlotEntry[];
}

interface PopoverState {
  blockId: string;
  entry: SlotEntry | null;
  anchorRect: DOMRect;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const TYPE_CFG = {
  new:       { label: '新規', color: '#E8703A', light: '#FDE8DA', textColor: '#C04A18', short: '新' },
  returning: { label: '再来', color: '#EDAE1C', light: '#FEF7D0', textColor: '#8A6000', short: '再' },
  meeting:   { label: '打合', color: '#7A68C0', light: '#EAE7F8', textColor: '#4E3DA0', short: '打' },
} satisfies Record<SlotType, { label: string; color: string; light: string; textColor: string; short: string }>;

const ROKUYO        = ['先勝', '友引', '先負', '仏滅', '大安', '赤口'] as const;
const ROKUYO_COLOR: Record<string, string> = {
  '大安': '#EDAE1C', '仏滅': '#9CA3AF', '赤口': '#E8703A',
  '先勝': '#9CA3AF', '友引': '#9CA3AF', '先負': '#9CA3AF',
};
const ROKUYO_ACCENT = new Set(['大安', '赤口']);
const DOW_JA        = ['日', '月', '火', '水', '木', '金', '土'];
const MONTH_JA      = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
const MODE_LABELS   = ['婚礼', '宴会', '衣裳', '美容', '写真', '装花'];
const TODAY_STR     = '2026-03-05';
const HOURS         = Array.from({ length: 11 }, (_, i) => i + 9);

const TIME_COL_W = 68;
const DAY_COL_W  = 96;

// ─── Helpers ──────────────────────────────────────────────────────────────────

let _id = 9000;
const uid = () => `d${++_id}`;

const dStr = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

const getDow    = (y: number, m: number, d: number) => new Date(y, m, d).getDay();
const getRokuyo = (y: number, m: number, d: number) => {
  const diff = Math.round((new Date(y, m, d).getTime() - new Date(2026, 2, 1).getTime()) / 86400000);
  return ROKUYO[((diff % 6) + 6) % 6];
};

// ─── Mock data ────────────────────────────────────────────────────────────────

const mkE = (specs: [SlotType, number][], pfx: string): SlotEntry[] => {
  const out: SlotEntry[] = [];
  let i = 0;
  specs.forEach(([t, n]) => {
    for (let j = 0; j < n; j++) out.push({ id: `${pfx}_${i++}`, type: t });
  });
  return out;
};

const INIT: TimeBlock[] = [
  { id:'b01', date:'2026-03-01', hour:9,  capacity:12, label:'婚礼', entries: mkE([['new',4],['returning',3],['meeting',1]],'b01') },
  { id:'b02', date:'2026-03-01', hour:13, capacity:10, label:'婚礼', entries: mkE([['new',3],['returning',4],['meeting',1]],'b02') },
  { id:'b03', date:'2026-03-01', hour:17, capacity:6,  label:'婚礼', entries: mkE([['returning',1],['meeting',1]],'b03') },
  { id:'b04', date:'2026-03-02', hour:13, capacity:12, label:'婚礼', entries: mkE([['new',5],['returning',4],['meeting',2]],'b04') },
  { id:'b05', date:'2026-03-04', hour:13, capacity:15, label:'婚礼', entries: mkE([['new',1],['returning',8],['meeting',2]],'b05') },
  { id:'b06', date:'2026-03-05', hour:9,  capacity:10, label:'婚礼', entries: mkE([['new',2],['returning',3],['meeting',1]],'b06') },
  { id:'b07', date:'2026-03-05', hour:13, capacity:12, label:'婚礼', entries: mkE([['new',3],['returning',1],['meeting',2]],'b07') },
  { id:'b08', date:'2026-03-05', hour:16, capacity:8,  label:'宴会', entries: mkE([['new',1],['returning',2],['meeting',1]],'b08') },
  { id:'b09', date:'2026-03-06', hour:12, capacity:5,  label:'婚礼', entries: mkE([['new',1],['returning',2]],'b09') },
  { id:'b10', date:'2026-03-06', hour:13, capacity:12, label:'婚礼', entries: mkE([['new',4],['returning',1],['meeting',1]],'b10') },
  { id:'b11', date:'2026-03-07', hour:10, capacity:15, label:'婚礼', entries: mkE([['new',6],['returning',5],['meeting',2]],'b11') },
  { id:'b12', date:'2026-03-07', hour:14, capacity:10, label:'婚礼', entries: mkE([['new',3],['returning',2],['meeting',1]],'b12') },
  { id:'b13', date:'2026-03-08', hour:10, capacity:12, label:'婚礼', entries: mkE([['new',4],['returning',3],['meeting',2]],'b13') },
  { id:'b14', date:'2026-03-10', hour:13, capacity:10, label:'婚礼', entries: mkE([['new',2],['returning',3],['meeting',1]],'b14') },
  { id:'b15', date:'2026-03-11', hour:10, capacity:12, label:'婚礼', entries: mkE([['new',3],['returning',2]],'b15') },
  { id:'b16', date:'2026-03-11', hour:14, capacity:8,  label:'婚礼', entries: mkE([['new',1],['returning',2],['meeting',1]],'b16') },
  { id:'b17', date:'2026-03-12', hour:11, capacity:15, label:'宴会', entries: mkE([['returning',5],['meeting',3]],'b17') },
  { id:'b18', date:'2026-03-14', hour:10, capacity:12, label:'婚礼', entries: mkE([['new',5],['returning',3],['meeting',1]],'b18') },
  { id:'b19', date:'2026-03-14', hour:14, capacity:8,  label:'婚礼', entries: mkE([['new',2],['returning',2]],'b19') },
  { id:'b20', date:'2026-03-15', hour:10, capacity:12, label:'婚礼', entries: mkE([['new',4],['returning',4],['meeting',2]],'b20') },
  { id:'b21', date:'2026-03-15', hour:13, capacity:10, label:'婚礼', entries: mkE([['new',3],['returning',2],['meeting',1]],'b21') },
  { id:'b22', date:'2026-03-17', hour:13, capacity:10, label:'婚礼', entries: mkE([['new',2],['returning',3]],'b22') },
  { id:'b23', date:'2026-03-18', hour:10, capacity:12, label:'婚礼', entries: mkE([['new',1],['returning',2],['meeting',1]],'b23') },
  { id:'b24', date:'2026-03-20', hour:13, capacity:10, label:'婚礼', entries: mkE([['new',3],['returning',2],['meeting',1]],'b24') },
  { id:'b25', date:'2026-03-21', hour:10, capacity:15, label:'婚礼', entries: mkE([['new',6],['returning',4],['meeting',2]],'b25') },
  { id:'b26', date:'2026-03-21', hour:14, capacity:10, label:'婚礼', entries: mkE([['new',3],['returning',2],['meeting',1]],'b26') },
  { id:'b27', date:'2026-03-22', hour:10, capacity:12, label:'婚礼', entries: mkE([['new',4],['returning',3],['meeting',1]],'b27') },
  { id:'b28', date:'2026-03-25', hour:10, capacity:10, label:'婚礼', entries: mkE([['new',2],['returning',3],['meeting',1]],'b28') },
  { id:'b29', date:'2026-03-28', hour:10, capacity:15, label:'婚礼', entries: mkE([['new',5],['returning',4],['meeting',2]],'b29') },
  { id:'b30', date:'2026-03-28', hour:14, capacity:8,  label:'婚礼', entries: mkE([['new',2],['returning',1],['meeting',1]],'b30') },
  { id:'b31', date:'2026-03-29', hour:13, capacity:12, label:'婚礼', entries: mkE([['new',3],['returning',2],['meeting',1]],'b31') },
];

// ─── SlotSquare ───────────────────────────────────────────────────────────────

const SlotSquare = React.memo(function SlotSquare({
  entry,
  onClick,
}: {
  entry: SlotEntry | null;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  if (!entry) {
    return (
      <button
        onClick={onClick}
        className="shrink-0 rounded-sm transition-colors hover:bg-neutral-200"
        style={{ width: 18, height: 18, border: '1.5px dashed #D1D5DB' }}
        title="クリックして追加"
      />
    );
  }
  const cfg = TYPE_CFG[entry.type];
  return (
    <button
      onClick={onClick}
      className="shrink-0 rounded-sm transition-opacity hover:opacity-60"
      style={{ width: 18, height: 18, background: cfg.color }}
      title={cfg.label}
    />
  );
});

// ─── SlotPopover ──────────────────────────────────────────────────────────────

function SlotPopover({
  state, onAdd, onRemove, onChangeType, onClose,
}: {
  state: PopoverState;
  onAdd:        (blockId: string, type: SlotType) => void;
  onRemove:     (blockId: string, entryId: string) => void;
  onChangeType: (blockId: string, entryId: string, type: SlotType) => void;
  onClose: () => void;
}) {
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [onClose]);

  const { anchorRect: r } = state;
  const left = Math.min(r.left, window.innerWidth - 172);
  const top  = Math.min(r.bottom + 4, window.innerHeight - 200);

  return (
    <div
      ref={popRef}
      className="fixed z-[70] bg-white rounded-xl shadow-2xl border border-neutral-200 py-2"
      style={{ left, top, minWidth: 160 }}
    >
      {state.entry ? (
        <>
          <p className="text-[9px] tracking-[0.2em] uppercase text-neutral-400 px-3 py-1">種別を変更</p>
          {(Object.keys(TYPE_CFG) as SlotType[]).map(t => {
            const cfg    = TYPE_CFG[t];
            const active = state.entry!.type === t;
            return (
              <button
                key={t}
                onClick={() => onChangeType(state.blockId, state.entry!.id, t)}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-left transition-all"
                style={{
                  background: active ? cfg.light : 'transparent',
                  color: active ? cfg.textColor : '#6B7280',
                  fontWeight: active ? 500 : 400,
                }}
              >
                <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: cfg.color }} />
                {cfg.label}
                {active && <span className="ml-auto text-[9px] opacity-50">現在</span>}
              </button>
            );
          })}
          <div className="border-t border-neutral-100 mt-1.5 pt-1.5">
            <button
              onClick={() => onRemove(state.blockId, state.entry!.id)}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <X className="w-3 h-3" />
              この枠を削除
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-[9px] tracking-[0.2em] uppercase text-neutral-400 px-3 py-1">枠を追加</p>
          {(Object.keys(TYPE_CFG) as SlotType[]).map(t => {
            const cfg = TYPE_CFG[t];
            return (
              <button
                key={t}
                onClick={() => onAdd(state.blockId, t)}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-left hover:bg-neutral-50 transition-all"
                style={{ color: cfg.textColor }}
              >
                <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: cfg.color }} />
                {cfg.label}
              </button>
            );
          })}
        </>
      )}
    </div>
  );
}

// ─── AddBlockPopover ──────────────────────────────────────────────────────────

function AddBlockPopover({
  date, hour, anchorRect, onSubmit, onClose,
}: {
  date: string; hour: number; anchorRect: DOMRect;
  onSubmit: (date: string, hour: number, capacity: number, label: string) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [capacity, setCapacity] = useState(10);
  const [label,    setLabel]    = useState('婚礼');

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [onClose]);

  const left = Math.min(anchorRect.left, window.innerWidth - 220);
  const top  = Math.min(anchorRect.bottom + 4, window.innerHeight - 280);

  return (
    <div
      ref={ref}
      className="fixed z-[70] bg-white rounded-xl shadow-2xl border border-neutral-200 p-4"
      style={{ left, top, width: 210 }}
    >
      <p className="text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-3">
        {date} {hour}:00 に受付枠を追加
      </p>
      <div className="mb-3">
        <p className="text-[10px] text-neutral-400 mb-1.5">上限枠数</p>
        <div className="flex items-center gap-2">
          <button onClick={() => setCapacity(c => Math.max(1, c - 1))}
            className="w-7 h-7 rounded-md border border-neutral-200 text-neutral-500 hover:bg-neutral-100 transition-all text-sm">−</button>
          <span className="flex-1 text-center text-sm" style={{ fontWeight: 500 }}>{capacity}</span>
          <button onClick={() => setCapacity(c => Math.min(30, c + 1))}
            className="w-7 h-7 rounded-md border border-neutral-200 text-neutral-500 hover:bg-neutral-100 transition-all text-sm">＋</button>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-[10px] text-neutral-400 mb-1.5">モード</p>
        <div className="flex flex-wrap gap-1">
          {MODE_LABELS.map(l => (
            <button key={l} onClick={() => setLabel(l)}
              className="px-2 py-1 rounded text-[10px] transition-all"
              style={{ background: label === l ? '#1e293b' : '#F1F5F9', color: label === l ? 'white' : '#64748B' }}>
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={onClose}
          className="flex-1 py-2 rounded-lg text-xs text-neutral-400 border border-neutral-200 hover:bg-neutral-50 transition-all">
          閉じる
        </button>
        <button onClick={() => onSubmit(date, hour, capacity, label)}
          className="flex-1 py-2 rounded-lg text-xs text-white transition-all" style={{ background: '#1e293b' }}>
          追加
        </button>
      </div>
    </div>
  );
}

// ─── CellContent ─────────────────────────────────────────────────────────────

function CellContent({
  blocks, onSquareClick, onAddBlockClick, onBlockLabelClick,
}: {
  blocks: TimeBlock[];
  onSquareClick:  (e: React.MouseEvent<HTMLButtonElement>, blockId: string, entry: SlotEntry | null) => void;
  onAddBlockClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBlockLabelClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  if (blocks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center group">
        <button
          onClick={onAddBlockClick}
          className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: 'rgba(0,0,0,0.05)' }}
          title="受付枠追加"
        >
          <Plus className="w-3.5 h-3.5 text-neutral-300" />
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 h-full">
      {blocks.map(block => {
        const empty   = Math.max(0, block.capacity - block.entries.length);
        const fillPct = Math.round((block.entries.length / block.capacity) * 100);
        return (
          <div key={block.id} className="flex flex-col gap-1.5">
            <button
              onClick={onBlockLabelClick}
              className="flex items-center gap-1.5 w-full text-left rounded hover:bg-neutral-100 transition-colors px-0.5 py-0.5"
              title="予約一覧を表示"
            >
              <span
                className="shrink-0 rounded px-1.5 py-0.5"
                style={{ background: '#030213', color: '#E0EAFF', fontSize: 10, fontWeight: 500 }}
              >
                詳細
              </span>
              <div className="flex-1 h-1 rounded-full bg-neutral-100 overflow-hidden">
                <div className="h-full rounded-full" style={{
                  width: `${fillPct}%`,
                  background: fillPct >= 90 ? '#D06030' : '#306890',
                  opacity: fillPct >= 90 ? 1 : 0.8,
                }} />
              </div>
              <span style={{ color: '#94A3B8', fontSize: 10 }} className="tabular-nums">
                {block.entries.length}/{block.capacity}
              </span>
            </button>
            <div className="flex flex-wrap gap-[3px]">
              {block.entries.map(entry => (
                <SlotSquare key={entry.id} entry={entry}
                  onClick={e => onSquareClick(e, block.id, entry)} />
              ))}
              {Array.from({ length: empty }).map((_, i) => (
                <SlotSquare key={`emp-${i}`} entry={null}
                  onClick={e => onSquareClick(e, block.id, null)} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function VisitManagement() {
  const [year,  setYear]  = useState(2026);
  const [month, setMonth] = useState(2);

  const [blocks,     setBlocks]     = useState<TimeBlock[]>(INIT);
  const [popover,    setPopover]    = useState<PopoverState | null>(null);
  const [addBlock,   setAddBlock]   = useState<{ date: string; hour: number; anchorRect: DOMRect } | null>(null);
  const [filterType, setFilterType] = useState<SlotType | 'all'>('all');
  const [dayDetail,  setDayDetail]  = useState<string | null>(null);
  const [slotPanel,  setSlotPanel]  = useState<{ blocks: TimeBlockInfo[]; anchorRect: DOMRect } | null>(null);

  const scrollRef   = useRef<HTMLDivElement>(null);
  const todayColRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    if (todayColRef.current && scrollRef.current) {
      const c = scrollRef.current;
      const t = todayColRef.current;
      c.scrollTo({ left: t.offsetLeft - TIME_COL_W - 40, behavior: 'smooth' });
    }
  }, [month, year]);

  const prevMonth = () => { if (month === 0) { setYear(y => y-1); setMonth(11); } else setMonth(m => m-1); };
  const nextMonth = () => { if (month === 11) { setYear(y => y+1); setMonth(0);  } else setMonth(m => m+1); };
  const goToday   = () => { setYear(2026); setMonth(2); };

  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  const days        = useMemo(() => Array.from({ length: daysInMonth }, (_, i) => i + 1), [daysInMonth]);
  const monthPfx    = useMemo(() => `${year}-${String(month + 1).padStart(2, '0')}`, [year, month]);

  const blockMap = useMemo(() => {
    const map = new Map<string, TimeBlock[]>();
    const src = filterType === 'all'
      ? blocks
      : blocks.map(b => ({ ...b, entries: b.entries.filter(e => e.type === filterType) }));
    src.filter(b => b.date.startsWith(monthPfx)).forEach(b => {
      const key = `${b.date}_${b.hour}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(b);
    });
    return map;
  }, [blocks, filterType, monthPfx]);

  const stats = useMemo(() => {
    const all   = blocks.filter(b => b.date.startsWith(monthPfx)).flatMap(b => b.entries);
    const today = blocks.filter(b => b.date === TODAY_STR).flatMap(b => b.entries);
    return {
      new:       all.filter(e => e.type === 'new').length,
      returning: all.filter(e => e.type === 'returning').length,
      meeting:   all.filter(e => e.type === 'meeting').length,
      total:     all.length,
      today:     today.length,
    };
  }, [blocks, monthPfx]);

  const buildDaySlots = useCallback((ds: string) => {
    const dayBlocks = blocks.filter(b => b.date === ds);
    const hoursInDay = [...new Set(dayBlocks.map(b => b.hour))].sort((a, b) => a - b);
    return hoursInDay.map(hour => ({
      hour,
      blocks: dayBlocks.filter(b => b.hour === hour).map(b => ({
        label:    b.label,
        capacity: b.capacity,
        entries:  b.entries.map(e => ({ type: e.type })),
      })),
    }));
  }, [blocks]);

  const openDay = useCallback((ds: string) => {
    setDayDetail(ds);
    setPopover(null);
    setAddBlock(null);
  }, []);

  const prevDay = useCallback(() => {
    if (!dayDetail) return;
    const d = new Date(dayDetail);
    d.setDate(d.getDate() - 1);
    setDayDetail(d.toISOString().slice(0, 10));
  }, [dayDetail]);

  const nextDay = useCallback(() => {
    if (!dayDetail) return;
    const d = new Date(dayDetail);
    d.setDate(d.getDate() + 1);
    setDayDetail(d.toISOString().slice(0, 10));
  }, [dayDetail]);

  const addEntry = useCallback((blockId: string, type: SlotType) => {
    setBlocks(prev => prev.map(b => {
      if (b.id !== blockId || b.entries.length >= b.capacity) return b;
      return { ...b, entries: [...b.entries, { id: uid(), type }] };
    }));
    setPopover(null);
  }, []);

  const removeEntry = useCallback((blockId: string, entryId: string) => {
    setBlocks(prev => prev.map(b =>
      b.id !== blockId ? b : { ...b, entries: b.entries.filter(e => e.id !== entryId) },
    ));
    setPopover(null);
  }, []);

  const changeType = useCallback((blockId: string, entryId: string, type: SlotType) => {
    setBlocks(prev => prev.map(b =>
      b.id !== blockId ? b : { ...b, entries: b.entries.map(e => e.id === entryId ? { ...e, type } : e) },
    ));
    setPopover(null);
  }, []);

  const addNewBlock = useCallback((date: string, hour: number, capacity: number, label: string) => {
    setBlocks(prev => [...prev, { id: uid(), date, hour, capacity, label, entries: [] }]);
    setAddBlock(null);
  }, []);

  const handleSquareClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, blockId: string, entry: SlotEntry | null) => {
      e.stopPropagation();
      setPopover({ blockId, entry, anchorRect: e.currentTarget.getBoundingClientRect() });
      setAddBlock(null);
    }, [],
  );

  const handleAddBlockClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, date: string, hour: number) => {
      e.stopPropagation();
      setAddBlock({ date, hour, anchorRect: e.currentTarget.getBoundingClientRect() });
      setPopover(null);
      setSlotPanel(null);
    }, [],
  );

  const handleBlockLabelClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, ds: string, hour: number) => {
      e.stopPropagation();
      const cellBlocks = blocks.filter(b => b.date === ds && b.hour === hour);
      setSlotPanel({
        blocks: cellBlocks as TimeBlockInfo[],
        anchorRect: e.currentTarget.getBoundingClientRect(),
      });
      setPopover(null);
      setAddBlock(null);
    }, [blocks],
  );

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full gap-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          {/* Title with calendar icon */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
              <CalendarDays className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm text-neutral-800" style={{ fontWeight: 600 }}>来館管理</h1>
              <p className="text-[10px] text-neutral-400" style={{ fontWeight: 400 }}>VISITOR</p>
            </div>
          </div>
        </div>
        <button
          onClick={e => setAddBlock({ date: TODAY_STR, hour: 10, anchorRect: (e.target as HTMLElement).getBoundingClientRect() })}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white hover:opacity-80 transition-all"
          style={{ background: '#030213', fontWeight: 500, fontSize: 13 }}
        >
          <Plus className="w-4 h-4" />
          受付枠を追加
        </button>
      </div>

      {/* ── Month nav + stats ── */}
      <div className="flex items-center gap-3 shrink-0">
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
            { label: '新規',     value: stats.new,       color: TYPE_CFG.new.color },
            { label: '再来',     value: stats.returning, color: TYPE_CFG.returning.color },
            { label: '打合',     value: stats.meeting,   color: TYPE_CFG.meeting.color },
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
      <div className="flex items-center gap-2 shrink-0">
        <span style={{ fontSize: 11, letterSpacing: '0.2em', color: '#9CA3AF' }} className="uppercase mr-1">種別</span>
        {(['all', 'new', 'returning', 'meeting'] as (SlotType | 'all')[]).map(t => {
          const active = filterType === t;
          const cfg    = t !== 'all' ? TYPE_CFG[t] : null;
          return (
            <button key={t} onClick={() => setFilterType(t)}
              className="px-3 py-1.5 rounded-full transition-all"
              style={{
                background: active ? (cfg?.color ?? '#030213') : (cfg?.light ?? '#F9FAFB'),
                color:      active ? 'white' : (cfg?.textColor ?? '#6B7280'),
                border:     `1px solid ${active ? (cfg?.color ?? '#030213') : '#E5E7EB'}`,
                fontWeight: active ? 500 : 400,
                fontSize: 13,
              }}
            >
              {t === 'all' ? 'すべて' : cfg!.label}
            </button>
          );
        })}
        <div className="ml-auto flex items-center gap-4">
          {(Object.keys(TYPE_CFG) as SlotType[]).map(t => (
            <div key={t} className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-sm" style={{ background: TYPE_CFG[t].color }} />
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>{TYPE_CFG[t].label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-sm border border-dashed border-neutral-300" />
            <span style={{ fontSize: 12, color: '#9CA3AF' }}>空き</span>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-auto rounded-xl border border-neutral-200 bg-white">
        <table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: TIME_COL_W + daysInMonth * DAY_COL_W }}>
          <colgroup>
            <col style={{ width: TIME_COL_W, minWidth: TIME_COL_W }} />
            {days.map(d => <col key={d} style={{ width: DAY_COL_W, minWidth: DAY_COL_W }} />)}
          </colgroup>

          {/* Date header */}
          <thead>
            <tr>
              <th style={{
                position: 'sticky', top: 0, left: 0, zIndex: 30,
                background: '#FAFAFA',
                borderBottom: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB',
                height: 68, padding: 0,
              }}>
                <span className="text-[9px] tracking-[0.15em] uppercase text-neutral-400">時間</span>
              </th>
              {days.map(day => {
                const ds      = dStr(year, month, day);
                const dow     = getDow(year, month, day);
                const ry      = getRokuyo(year, month, day);
                const isToday = ds === TODAY_STR;
                const isSun   = dow === 0;
                const isSat   = dow === 6;
                const dayEntries = blocks.filter(b => b.date === ds).flatMap(b => b.entries);
                const hasData    = dayEntries.length > 0;
                return (
                  <th
                    key={day}
                    ref={isToday ? todayColRef : undefined}
                    onClick={() => openDay(ds)}
                    style={{
                      position: 'sticky', top: 0, zIndex: 20,
                      background: isToday ? '#F0F4FF' : '#FAFAFA',
                      borderBottom: isToday ? '2px solid #030213' : '1px solid #E5E7EB',
                      borderRight: '1px solid #F1F5F9',
                      height: 72, padding: '6px 4px 4px',
                      textAlign: 'center', verticalAlign: 'bottom', cursor: 'pointer',
                    }}
                    title={`${ds} の詳細を表示`}
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span style={{ fontSize: 10, color: ROKUYO_COLOR[ry] ?? '#9CA3AF', fontWeight: ROKUYO_ACCENT.has(ry) ? 600 : 400 }}>{ry}</span>
                      <div className="w-8 h-8 flex items-center justify-center rounded-full" style={{
                        background: isToday ? '#030213' : 'transparent',
                        color: isToday ? 'white' : isSun ? '#D06030' : isSat ? '#306890' : '#374151',
                        fontSize: 15, fontWeight: isToday ? 600 : 300,
                      }}>{day}</div>
                      <span style={{ fontSize: 11, color: isSun ? '#D06030' : isSat ? '#306890' : '#9CA3AF' }}>{DOW_JA[dow]}</span>
                      {hasData ? (
                        <div className="flex gap-0.5 mt-0.5">
                          {(['new','returning','meeting'] as SlotType[]).map(t => {
                            const n = dayEntries.filter(e => e.type === t).length;
                            return n > 0 ? <span key={t} className="w-2 h-2 rounded-full" style={{ background: TYPE_CFG[t].color }} /> : null;
                          })}
                        </div>
                      ) : <div style={{ height: 8 }} />}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Hour rows */}
          <tbody>
            {HOURS.map(hour => (
              <tr key={hour}>
                <td style={{
                  position: 'sticky', left: 0, zIndex: 10, background: 'white',
                  borderRight: '1px solid #E5E7EB', borderBottom: '1px solid #F1F5F9',
                  width: TIME_COL_W, textAlign: 'center', verticalAlign: 'top',
                  paddingTop: 8, boxShadow: '2px 0 4px rgba(0,0,0,0.03)',
                }}>
                  <span className="tabular-nums" style={{ color: '#94A3B8', fontSize: 13 }}>{hour}:00</span>
                </td>
                {days.map(day => {
                  const ds         = dStr(year, month, day);
                  const cellBlocks = blockMap.get(`${ds}_${hour}`) ?? [];
                  const isToday    = ds === TODAY_STR;
                  const dow        = getDow(year, month, day);
                  const isWeekend  = dow === 0 || dow === 6;
                  return (
                    <td key={day} style={{
                      background: isToday ? '#F0F4FF' : isWeekend ? '#FAFAFA' : 'white',
                      borderRight: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9',
                      verticalAlign: 'top', padding: 7,
                      height: cellBlocks.length > 0 ? 'auto' : 64, minHeight: 64,
                    }}>
                      <CellContent
                        blocks={cellBlocks}
                        onSquareClick={handleSquareClick}
                        onAddBlockClick={e => handleAddBlockClick(e, ds, hour)}
                        onBlockLabelClick={e => handleBlockLabelClick(e, ds, hour)}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

          {/* Footer totals */}
          <tfoot>
            <tr>
              <td style={{
                position: 'sticky', left: 0, bottom: 0, zIndex: 10, background: '#FAFAFA',
                borderTop: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB',
                padding: '6px 4px', textAlign: 'center',
              }}>
                <span className="text-[9px] tracking-[0.1em] uppercase text-neutral-400">計</span>
              </td>
              {days.map(day => {
                const ds         = dStr(year, month, day);
                const isToday    = ds === TODAY_STR;
                const dayEntries = blocks.filter(b => b.date === ds).flatMap(b => b.entries);
                const counts = {
                  new:       dayEntries.filter(e => e.type === 'new').length,
                  returning: dayEntries.filter(e => e.type === 'returning').length,
                  meeting:   dayEntries.filter(e => e.type === 'meeting').length,
                };
                const total = dayEntries.length;
                return (
                  <td key={day} onClick={() => total > 0 && openDay(ds)} style={{
                    position: 'sticky', bottom: 0, zIndex: 5,
                    background: isToday ? '#F0F4FF' : '#FAFAFA',
                    borderTop: isToday ? '2px solid #030213' : '1px solid #E5E7EB',
                    borderRight: '1px solid #F1F5F9',
                    padding: '4px 4px', textAlign: 'center',
                    cursor: total > 0 ? 'pointer' : 'default',
                  }}>
                    {total > 0 ? (
                      <div className="flex gap-0.5 justify-center flex-wrap">
                        {(['new','returning','meeting'] as SlotType[]).map(t => {
                          const n = counts[t];
                          return n > 0 ? (
                            <span key={t} className="px-1 rounded text-white tabular-nums"
                              style={{ background: TYPE_CFG[t].color, fontWeight: 600, fontSize: 11, lineHeight: '16px' }}>
                              {TYPE_CFG[t].short}{n}
                            </span>
                          ) : null;
                        })}
                      </div>
                    ) : <span className="text-[9px] text-neutral-200">—</span>}
                  </td>
                );
              })}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* ── Popovers ── */}
      {popover && (
        <SlotPopover
          state={popover}
          onAdd={addEntry}
          onRemove={removeEntry}
          onChangeType={changeType}
          onClose={() => setPopover(null)}
        />
      )}
      {addBlock && (
        <AddBlockPopover
          date={addBlock.date}
          hour={addBlock.hour}
          anchorRect={addBlock.anchorRect}
          onSubmit={addNewBlock}
          onClose={() => setAddBlock(null)}
        />
      )}
      {slotPanel && (
        <SlotListPanel
          blocks={slotPanel.blocks}
          anchorRect={slotPanel.anchorRect}
          onClose={() => setSlotPanel(null)}
          onAddSlot={() => {
            if (slotPanel.blocks[0]) {
              const { date, hour } = slotPanel.blocks[0];
              setAddBlock({ date, hour, anchorRect: slotPanel.anchorRect });
              setSlotPanel(null);
            }
          }}
        />
      )}
      {dayDetail && (
        <DayDetailModal
          dateStr={dayDetail}
          slots={buildDaySlots(dayDetail)}
          onClose={() => setDayDetail(null)}
          onPrev={prevDay}
          onNext={nextDay}
        />
      )}
    </div>
  );
}