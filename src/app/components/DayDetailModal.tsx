import React, { useRef, useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Edit2, Plus, Minus, Settings } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SlotType = 'new' | 'returning' | 'meeting';

export interface TptSlot {
  tptNo:    number;
  tptId:    string;
  hour:     number;        // 9
  startTime: string;       // "09:00"
  endTime:   string;       // "10:30"
  type:     SlotType | null; // null = 空き
  // 顧客情報
  customerName?: string;
  eventDate?:   string;    // "2026/10"
  capacity?:    number;    // 名様
  guestCount?:  number;    // 来館人数
  trialCount?:  number;    // 試食人数
  directFlag?:  boolean;   // 直
  // フェア
  fairType?:    string;    // "フェア/接客"
  actionDate?:  string;    // 実施日
  entryDate?:   string;    // 来館登録日
  entryStaff?:  string;    // 来館者
  reconfirm?:   string;    // リコン先
  reconfirmDate?:string;
  reconfirmStaff?:string;
  reconfirmStatus?:string;
  mediaSource?: string;    // 媒体（連携先）
  venue?:       string;    // 検討会場
  memo?:        string;    // 右側メモ（赤文字等）
  memoHighlight?: boolean;
  campaign?:    string;    // キャンペーン内容
}

// ─── Config ──────────────────────────────────────────────────────────────────

const TYPE_CFG = {
  new:       { label: '新',  color: '#EF4444', bg: '#FEE2E2', text: '#B91C1C', long: '新規' },
  returning: { label: '再',  color: '#22C55E', bg: '#DCFCE7', text: '#15803D', long: '再来' },
  meeting:   { label: '丸',  color: '#818CF8', bg: '#EEF2FF', text: '#4338CA', long: '打合' },
} as const;

const DOW_JA   = ['日', '月', '火', '水', '木', '金', '土'];
const ROKUYO   = ['先勝', '友引', '先負', '仏滅', '大安', '赤口'];
const getRokuyo = (y: number, m: number, d: number) => {
  const diff = Math.round((new Date(y, m, d).getTime() - new Date(2026, 2, 1).getTime()) / 86400000);
  return ROKUYO[((diff % 6) + 6) % 6];
};

// ─── Mock data generator ─────────────────────────────────────────────────────

let _seq = 13760;
const nextId = () => `${++_seq}`;

const VENUES = [
  'ザクラブオブエクセレントコースト / アーカンジェル代官山 / 高南山サンタキアラ教会',
  'カサ・デ・アンジェラ / ラ・ラシャンスガーデン東京 / リビエラ逗子',
  '001件目 / 海外ウェディング / オペラハウス / 場 山庄',
  '003件目以上 / スケープスザスイート / カサ・デ・アンジェラ / ラ・ラシャンス東京',
  'アニヴェルセルみなとみらい / コルトーナ東京（台場）',
  '青山エリュシオンハウス / 東京ベイコート倶楽部',
];
const CAMPAIGNS = [
  '【年に1度のメガBIG】最大特典\n×試食×全館体験フェア】\n・アマゾンギフト10,000円分\n・レストランランチチケット11,000円',
  '【3/1(日)14:00 メガBIGキャンペーン】\n・アマゾンギフト10,000円分\n・レストランランチチケット11,000円',
  '※デザートビュッフェ\n→原則大人分\n\n3月26日(木)15:00〜搬入',
  '※元プランナーのくるみさんです!!',
];
const MEDIA = [
  'ゼクシィネット（アプリ）', 'その他WEB広告', 'ウェディングニュース', '一家スタッフ紹介',
  'ゼクシィ本誌', '式場見学イベント',
];
const FAIR_TYPES = ['フェア/接客', '個別案内', 'フォト相談', '会場見学', 'ブライダルフェア'];
const STAFFS = ['石井 優明', '高橋 恭平', '上野 詩菜', '佐藤 花子', '木村 一郎', '里コ', '山田 美咲'];

function randomSlot(tptNo: number, hour: number, capacity: number, types: (SlotType | null)[]): TptSlot {
  const type = types[tptNo - 1] ?? null;
  if (!type) {
    return {
      tptNo, tptId: nextId(), hour,
      startTime: `${String(hour).padStart(2,'0')}:00`,
      endTime:   '',
      type: null,
    };
  }

  const endHour = hour + 1 + (Math.random() > 0.5 ? 1 : 0);
  const endMin  = ['00','15','30','45'][Math.floor(Math.random() * 4)];

  return {
    tptNo, tptId: nextId(), hour,
    startTime:  `${String(hour).padStart(2,'0')}:00`,
    endTime:    `${String(Math.min(endHour, 19)).padStart(2,'0')}:${endMin}`,
    type,
    customerName: `〇〇 〇〇 / 〇〇 〇〇 様`, // blurred in real system
    eventDate:   `2026/${String(Math.floor(Math.random() * 10) + 3).padStart(2,'0')}`,
    capacity:    [60, 80, 90, 110, 120][Math.floor(Math.random() * 5)],
    guestCount:  2,
    trialCount:  type === 'returning' ? 0 : 2,
    directFlag:  Math.random() > 0.5,
    fairType:    FAIR_TYPES[Math.floor(Math.random() * FAIR_TYPES.length)],
    actionDate:  `2026-${String(Math.floor(Math.random() * 10) + 1).padStart(2,'0')}-${String(Math.floor(Math.random() * 27) + 1).padStart(2,'0')}`,
    entryDate:   `2026-02-${String(Math.floor(Math.random() * 27) + 1).padStart(2,'0')}`,
    entryStaff:  STAFFS[Math.floor(Math.random() * STAFFS.length)],
    reconfirm:   '未',
    reconfirmDate: '',
    reconfirmStaff: '',
    reconfirmStatus: '未',
    mediaSource: MEDIA[Math.floor(Math.random() * MEDIA.length)],
    venue:       VENUES[Math.floor(Math.random() * VENUES.length)],
    campaign:    CAMPAIGNS[Math.floor(Math.random() * CAMPAIGNS.length)],
    memoHighlight: Math.random() > 0.6,
  };
}

// 日付→スロット一覧 のモックデータを動的生成
const MOCK_PATTERNS: Record<string, { hour: number; types: (SlotType | null)[] }[]> = {
  '2026-03-01': [
    { hour: 9,  types: ['new','new','meeting','new','returning','returning',null,null,null,null] },
    { hour: 13, types: ['returning','returning','new',null,null,null,null,null] },
    { hour: 17, types: ['returning','meeting',null,null,null,null] },
  ],
  '2026-03-05': [
    { hour: 9,  types: ['new','new','returning','returning','returning','meeting',null,null,null,null] },
    { hour: 13, types: ['new','new','new','returning','meeting','meeting',null,null,null,null,null,null] },
    { hour: 16, types: ['new','returning','returning','meeting',null,null,null,null] },
  ],
};

export function generateDaySlots(dateStr: string): TptSlot[] {
  // Check if we have a predefined pattern
  const pattern = MOCK_PATTERNS[dateStr];
  if (pattern) {
    let globalTpt = 1;
    const out: TptSlot[] = [];
    pattern.forEach(({ hour, types }) => {
      types.forEach((type, i) => {
        out.push(randomSlot(i + 1, hour, types.length, types));
        // re-assign sequential tptNo per day
        out[out.length - 1].tptNo = globalTpt++;
      });
    });
    return out;
  }

  // Generic: look up blocks for this date and generate
  return [];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`text-[9px] ${className}`}
      style={{ color: '#94A3B8', letterSpacing: '0.05em' }}
    >
      {children}
    </span>
  );
}

function Cell({ label, value, valueStyle }: { label: string; value?: React.ReactNode; valueStyle?: React.CSSProperties }) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <Label>{label}</Label>
      <span className="text-[10px] truncate" style={{ color: '#374151', ...valueStyle }}>
        {value || '—'}
      </span>
    </div>
  );
}

// Type badge (新/再/丸)
function TypeBadge({ type }: { type: SlotType }) {
  const cfg = TYPE_CFG[type];
  return (
    <span
      className="inline-flex items-center justify-center rounded shrink-0"
      style={{
        width: 20, height: 20,
        background: cfg.color,
        color: 'white',
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: 0,
      }}
    >
      {cfg.label}
    </span>
  );
}

// Single TPT row (booked)
function BookedRow({ slot, tptSeq }: { slot: TptSlot; tptSeq: number }) {
  const [showMemo, setShowMemo] = useState(true);
  const cfg = slot.type ? TYPE_CFG[slot.type] : null;

  return (
    <div
      className="border-b border-neutral-100"
      style={{ background: '#FFFFFF' }}
    >
      <div className="flex min-h-[88px]">
        {/* ── Left meta ── */}
        <div
          className="flex flex-col justify-center items-center gap-1 shrink-0 border-r border-neutral-100"
          style={{ width: 52, background: '#F8FAFC', padding: '8px 4px' }}
        >
          <div className="text-[9px] text-center" style={{ color: '#94A3B8' }}>
            TPT<br />
            <span style={{ color: '#374151', fontWeight: 600 }}>{tptSeq}</span>
            <br />
            <span style={{ color: '#94A3B8', fontSize: 8 }}>{slot.tptId}</span>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0 p-3 flex flex-col gap-2">
          {/* Row 1: Time, badge, customer, event info */}
          <div className="flex items-start gap-3">
            {/* Time block */}
            <div className="flex flex-col shrink-0" style={{ minWidth: 56 }}>
              <span className="text-sm tabular-nums" style={{ fontWeight: 500, color: '#1E293B', lineHeight: 1.2 }}>
                {slot.startTime}
              </span>
              {slot.endTime && (
                <span className="text-[10px] tabular-nums" style={{ color: '#22C55E', fontWeight: 500 }}>
                  {slot.endTime}
                </span>
              )}
            </div>

            {/* Type badge */}
            {slot.type && <TypeBadge type={slot.type} />}

            {/* Customer name (blurred for privacy) */}
            <div className="flex-1 min-w-0">
              <div
                className="text-[11px] rounded px-1"
                style={{
                  color: '#1E293B',
                  fontWeight: 500,
                  filter: 'blur(4px)',
                  userSelect: 'none',
                  background: '#F1F5F9',
                  display: 'inline-block',
                }}
              >
                {slot.customerName ?? '〇〇 〇〇 / 〇〇 〇〇 様'}
              </div>
            </div>

            {/* Event info: date, capacity, guest count */}
            <div className="flex items-start gap-3 shrink-0">
              <Cell label="実施予定" value={slot.eventDate} />
              <Cell label="名様" value={slot.capacity ? `${slot.capacity}名` : '—'} />
              <Cell
                label="来館"
                value={`${slot.guestCount ?? 2}人来館`}
              />
              <Cell
                label="試食"
                value={slot.trialCount !== undefined ? `${slot.trialCount}人来館` : '—'}
              />
              <div className="flex flex-col gap-0.5">
                <Label>直</Label>
                <span className="text-[10px]" style={{ color: slot.directFlag ? '#1E293B' : '#9CA3AF' }}>
                  {slot.directFlag ? '直' : '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: フェア種別 / 実施日 */}
          <div className="flex items-center gap-4 pl-[76px]">
            <Cell label="フェア/接客" value={slot.fairType} />
            <Cell label="実施日" value={slot.actionDate} />
            <Cell label="来館登録日" value={slot.entryDate} />
          </div>

          {/* Row 3: 来館者 / リコン */}
          <div className="flex items-center gap-4 pl-[76px]">
            <Cell label="来館者" value={`${slot.entryStaff ?? '—'} : 未`} />
            <Cell label="リコンファームした日" value={slot.reconfirmDate || '—'} />
            <Cell label="リコンファームした人" value={slot.reconfirmStaff || '—'} />
            <Cell label="リコンファーム前回" value={slot.reconfirmStatus || '未'} />
          </div>

          {/* Row 4: 媒体（連携先） / 検討会場 */}
          <div className="flex items-start gap-4 pl-[76px]">
            <Cell label="証券代替品" value={slot.mediaSource} />
            <Cell label="検討会場" value={slot.venue} />
          </div>
        </div>

        {/* ── Right: Memo / Campaign ── */}
        <div
          className="shrink-0 border-l border-neutral-100 p-3 flex flex-col justify-between"
          style={{ width: 200, background: '#FFFBF0' }}
        >
          <div className="flex-1 overflow-y-auto">
            {slot.campaign ? (
              <p
                className="text-[10px] leading-relaxed whitespace-pre-wrap"
                style={{ color: slot.memoHighlight ? '#DC2626' : '#374151', fontWeight: slot.memoHighlight ? 500 : 400 }}
              >
                {slot.campaign}
              </p>
            ) : (
              <span className="text-[10px]" style={{ color: '#D1D5DB' }}>メモなし</span>
            )}
          </div>

          {/* Action icons */}
          <div className="flex items-center gap-1.5 mt-2 justify-end">
            <button className="w-5 h-5 rounded flex items-center justify-center text-blue-400 hover:bg-blue-50 transition-all">
              <Edit2 className="w-3 h-3" />
            </button>
            <button className="w-5 h-5 rounded-full flex items-center justify-center bg-red-100 text-red-400 hover:bg-red-200 transition-all">
              <Minus className="w-3 h-3" />
            </button>
            <button className="w-5 h-5 rounded flex items-center justify-center text-neutral-300 hover:bg-neutral-100 transition-all">
              <Settings className="w-3 h-3" />
            </button>
            <button className="w-5 h-5 rounded-full flex items-center justify-center bg-green-100 text-green-500 hover:bg-green-200 transition-all">
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Single TPT row (empty = 予約受付可能)
function EmptyRow({ tptSeq, tptId, startTime }: { tptSeq: number; tptId: string; startTime: string }) {
  return (
    <div
      className="flex border-b border-neutral-100"
      style={{ minHeight: 64, background: '#FFFFFF' }}
    >
      {/* Meta */}
      <div
        className="flex flex-col justify-center items-center shrink-0 border-r border-neutral-100"
        style={{ width: 52, background: '#F8FAFC', padding: '6px 4px' }}
      >
        <div className="text-[9px] text-center" style={{ color: '#94A3B8' }}>
          TPT<br />
          <span style={{ color: '#374151', fontWeight: 600 }}>{tptSeq}</span>
          <br />
          <span style={{ fontSize: 8 }}>{tptId}</span>
        </div>
      </div>

      {/* Time + available */}
      <div className="flex items-center gap-4 px-4 flex-1">
        <span className="text-sm tabular-nums" style={{ fontWeight: 400, color: '#94A3B8' }}>
          {startTime}
        </span>
        <span className="text-xs" style={{ color: '#94A3B8' }}>変更</span>
        <div className="flex-1 flex items-center justify-center">
          <span
            className="px-6 py-1.5 rounded text-sm"
            style={{ background: '#ECFDF5', color: '#15803D', fontWeight: 400 }}
          >
            予約受付可能
          </span>
        </div>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-1.5 pr-3 shrink-0">
        <button className="w-5 h-5 rounded-full flex items-center justify-center border border-neutral-200 text-neutral-300 hover:bg-neutral-100 transition-all">
          <Plus className="w-3 h-3" />
        </button>
        <button className="w-5 h-5 rounded-full flex items-center justify-center bg-red-100 text-red-300 hover:bg-red-200 transition-all">
          <Minus className="w-3 h-3" />
        </button>
        <button className="w-5 h-5 rounded flex items-center justify-center text-neutral-200 hover:text-neutral-400 transition-all">
          <Settings className="w-3 h-3" />
        </button>
        <button className="w-5 h-5 rounded-full flex items-center justify-center bg-green-100 text-green-400 hover:bg-green-200 transition-all">
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// Time-group section header
function TimeGroupHeader({
  hour,
  dateLabel,
}: {
  hour: number;
  dateLabel: string;
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-2 border-b border-neutral-200"
      style={{ background: '#F8F4E8' }}
    >
      <span className="text-sm tabular-nums" style={{ color: '#1E293B', fontWeight: 500 }}>
        {String(hour).padStart(2, '0')}:00〜
      </span>
      <span
        className="px-2 py-0.5 rounded text-[10px]"
        style={{ background: '#E5E0CF', color: '#78716C' }}
      >
        {dateLabel}
      </span>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

interface Props {
  dateStr: string;   // "2026-03-05"
  slots: {
    hour: number;
    blocks: { label: string; capacity: number; entries: { type: SlotType }[] }[];
  }[];
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function DayDetailModal({ dateStr, slots, onClose, onPrev, onNext }: Props) {
  const [year, month0, day] = dateStr.split('-').map(Number);
  const month = month0 - 1; // 0-indexed
  const dow     = new Date(year, month, day).getDay();
  const rokuyo  = getRokuyo(year, month, day);
  const dateLabel = `${year}年${String(month + 1).padStart(2,'0')}月${String(day).padStart(2,'0')}日(${DOW_JA[dow]}) ${rokuyo}`;

  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on backdrop click
  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  // Build TPT rows from slots
  const tptRows = React.useMemo(() => {
    // Predefined mock for known dates
    const pattern = MOCK_PATTERNS[dateStr];
    if (pattern) {
      let globalSeq = 1;
      return pattern.map(({ hour, types }) => {
        const rows = types.map((type, i) => {
          const slot = randomSlot(i + 1, hour, types.length, types);
          slot.tptNo = globalSeq++;
          return slot;
        });
        return { hour, rows };
      });
    }

    // Build from passed slots
    let seq = 1;
    return slots.map(({ hour, blocks }) => {
      const types: (SlotType | null)[] = [];
      blocks.forEach(b => {
        b.entries.forEach(e => types.push(e.type as SlotType));
        const empty = b.capacity - b.entries.length;
        for (let i = 0; i < empty; i++) types.push(null);
      });

      const rows: TptSlot[] = types.map((type, i) => {
        const s = randomSlot(i + 1, hour, types.length, types);
        s.tptNo = seq++;
        return s;
      });
      return { hour, rows };
    });
  }, [dateStr, slots]);

  // Summary stats
  const allSlots = tptRows.flatMap(g => g.rows);
  const countNew       = allSlots.filter(s => s.type === 'new').length;
  const countReturning = allSlots.filter(s => s.type === 'returning').length;
  const countMeeting   = allSlots.filter(s => s.type === 'meeting').length;
  const countEmpty     = allSlots.filter(s => s.type === null).length;
  const countTotal     = countNew + countReturning + countMeeting;

  // 今日のスタンバイ時刻（最初の予約の時間）
  const firstBooked = allSlots.find(s => s.type !== null);
  const standbyTime = firstBooked ? `${firstBooked.startTime}` : '—';

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}
      onClick={onBackdrop}
    >
      <div
        className="relative flex flex-col rounded-xl overflow-hidden shadow-2xl"
        style={{
          width: 'min(96vw, 1020px)',
          maxHeight: '92vh',
          background: '#FFFFFF',
          fontFamily: 'DM Sans, sans-serif',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Top header bar ── */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-200 shrink-0"
          style={{ background: '#F8FAFC' }}
        >
          <div className="flex items-start gap-6">
            {/* Date info */}
            <div className="flex flex-col">
              <span className="text-[9px]" style={{ color: '#94A3B8' }}>本日情報(TPT)</span>
              <span className="text-[10px]" style={{ color: '#374151', fontWeight: 500 }}>
                {year}/{String(month+1).padStart(2,'0')}/{String(day).padStart(2,'0')}<br />
                ({DOW_JA[dow]}) {rokuyo}
              </span>
            </div>

            {/* Standby */}
            <div className="flex flex-col">
              <span className="text-[9px]" style={{ color: '#94A3B8' }}>スタンバイ</span>
              <span className="text-[10px]" style={{ color: '#374151' }}>
                {standbyTime}
              </span>
            </div>

            {/* 新規予約数 */}
            <div className="flex flex-col">
              <span className="text-[9px]" style={{ color: '#94A3B8' }}>新規予約数</span>
              <span className="text-[10px]" style={{ color: '#374151', fontWeight: 500 }}>
                {countNew}/{countReturning}/{countMeeting}
              </span>
            </div>
          </div>

          {/* Right: summary badges */}
          <div className="flex items-center gap-4 mr-6">
            <div className="flex flex-col items-center">
              <span className="text-[9px]" style={{ color: '#94A3B8' }}>来館</span>
              <span className="text-sm tabular-nums" style={{ fontWeight: 600, color: '#374151' }}>
                {countTotal} <span className="text-[9px]" style={{ fontWeight: 400 }}>件</span>
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px]" style={{ color: '#94A3B8' }}>新再</span>
              <span className="text-sm tabular-nums" style={{ fontWeight: 600, color: '#374151' }}>
                {countNew + countReturning} <span className="text-[9px]" style={{ fontWeight: 400 }}>件</span>
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px]" style={{ color: '#94A3B8' }}>試食</span>
              <span className="text-sm tabular-nums" style={{ fontWeight: 600, color: '#374151' }}>
                0 <span className="text-[9px]" style={{ fontWeight: 400 }}>件</span>
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px]" style={{ color: '#94A3B8' }}>&nbsp;</span>
              <span className="text-sm tabular-nums" style={{ fontWeight: 600, color: '#374151' }}>
                0 <span className="text-[9px]" style={{ fontWeight: 400 }}>名様</span>
              </span>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Navigation + Date title ── */}
        <div
          className="flex items-center justify-center gap-3 py-2.5 border-b border-neutral-200 shrink-0"
          style={{ background: '#FAFAFA' }}
        >
          <button
            onClick={onPrev}
            className="w-7 h-7 flex items-center justify-center rounded border border-neutral-200 text-neutral-500 hover:bg-white hover:shadow-sm transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            className="px-3 py-1 rounded border border-neutral-200 text-xs text-neutral-600 hover:bg-white hover:shadow-sm transition-all"
          >
            今日
          </button>
          <button
            onClick={onNext}
            className="w-7 h-7 flex items-center justify-center rounded border border-neutral-200 text-neutral-500 hover:bg-white hover:shadow-sm transition-all"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <h2
            className="text-sm"
            style={{ fontWeight: 600, color: '#1E293B', letterSpacing: '0.05em' }}
          >
            {dateLabel}
          </h2>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {tptRows.map(({ hour, rows }) => (
            <div key={hour}>
              {/* Time-group header */}
              <TimeGroupHeader
                hour={hour}
                dateLabel={dateLabel}
              />

              {/* TPT rows */}
              {rows.map((slot, i) =>
                slot.type ? (
                  <BookedRow key={slot.tptId} slot={slot} tptSeq={slot.tptNo} />
                ) : (
                  <EmptyRow
                    key={`emp-${hour}-${i}`}
                    tptSeq={slot.tptNo}
                    tptId={slot.tptId}
                    startTime={slot.startTime}
                  />
                ),
              )}
            </div>
          ))}

          {/* If no slots at all */}
          {tptRows.length === 0 && (
            <div className="flex items-center justify-center h-40 text-neutral-300 text-sm">
              この日の受付枠がありません
            </div>
          )}
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex items-center justify-between px-4 py-2 border-t border-neutral-200 shrink-0"
          style={{ background: '#F8FAFC' }}
        >
          <div className="flex items-center gap-4">
            {[
              { type: 'new'       as SlotType, count: countNew },
              { type: 'returning' as SlotType, count: countReturning },
              { type: 'meeting'   as SlotType, count: countMeeting },
            ].map(({ type, count }) => (
              <div key={type} className="flex items-center gap-1.5">
                <TypeBadge type={type} />
                <span className="text-xs text-neutral-600">{count}件</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5">
              <span
                className="inline-flex items-center justify-center rounded shrink-0 text-[9px]"
                style={{ width: 20, height: 20, background: '#ECFDF5', color: '#15803D', border: '1px solid #A7F3D0', fontWeight: 600 }}
              >
                空
              </span>
              <span className="text-xs text-neutral-400">空き {countEmpty}枠</span>
            </div>
          </div>
          <span className="text-[10px] text-neutral-300">Esc または背景クリックで閉じる</span>
        </div>
      </div>
    </div>
  );
}
