import { useState } from 'react';
import { GridIcon } from '../components/GridIcon';
import {
  CalendarDays, Users, Home, Settings,
  ChevronLeft, ChevronRight, Search, Bell,
  MapPin, Phone, ChevronRight as Arrow,
  Star, Circle, Wifi, Battery,
  X, Plus, Trash2,
} from 'lucide-react';

// ─── Brand Colors ─────────────────────────────────────────────────────────────
const GOLD   = '#F5C518';
const NAVY   = '#1B2A5C';
const ORANGE = '#E8703A';
const AMBER  = '#EDAE1C';
const GRAY_C = '#9CA3AF';

const BRAND_GRAD = 'linear-gradient(135deg, #F5C518 0%, #F0527A 45%, #7E3858 80%, #3C2562 100%)';

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = 'home' | 'schedule' | 'notifications' | 'mypage';

type EventFormData = {
  id?: string;
  title: string;
  type: string;
  staff: string;
  startTime: string;
  endTime: string;
  room: string;
  memo: string;
};

type SheetState = { mode: 'edit'; data: EventFormData } | { mode: 'new' } | null;

// ─── Mock Data ────────────────────────────────────────────────────────────────
const WEEK_DAYS = ['月', '火', '水', '木', '金', '土', '日'];

// March 2026: starts on Sunday offset=6 in Mon-start grid
const MARCH_DAYS = 31;

const EVENT_SHORT: Record<string, string> = {
  visit:    '来館',
  meeting:  '打合',
  dress:    'ドレス',
  internal: '社内',
};

const MONTH_EVENT_DAYS: Record<number, string[]> = {
  9:  ['visit', 'meeting', 'dress', 'internal'],
  11: ['visit', 'meeting'],
  12: ['meeting'],
  16: ['visit'],
  17: ['meeting', 'dress'],
  20: ['visit', 'internal'],
  23: ['dress'],
  24: ['visit', 'meeting'],
  26: ['visit'],
};

const EVENTS = [
  { id: 'e1', start: '09:30', end: '10:30', title: '田中様 来館対応',    type: 'visit',    room: 'サロン A', label: '来館' },
  { id: 'e2', start: '11:00', end: '12:00', title: '山田様 打合せ',      type: 'meeting',  room: 'ラウンジ',  label: '打合せ' },
  { id: 'e3', start: '13:30', end: '14:30', title: '佐藤様 ドレス試着',  type: 'dress',    room: 'ドレス室',  label: 'ドレス' },
  { id: 'e4', start: '15:00', end: '16:00', title: '松本様 来館対応',    type: 'visit',    room: 'サロン B', label: '来館' },
  { id: 'e5', start: '16:30', end: '17:00', title: 'チームMTG',          type: 'internal', room: '会議室',   label: '社内' },
];

const EVENT_COLOR: Record<string, { bg: string; text: string; bar: string }> = {
  visit:    { bg: '#FDE8DA', text: '#C04A18', bar: ORANGE },
  meeting:  { bg: '#EAE7F8', text: '#4E3DA0', bar: '#7A68C0' },
  dress:    { bg: '#FCE7F3', text: '#9D174D', bar: '#BE185D' },
  internal: { bg: '#F1F5F9', text: '#475569', bar: '#64748B' },
};

const CUSTOMERS = [
  { id: 'c1', name: '田中 美桜・健太',   nameKana: 'タナカ ミオ・ケンタ',     status: 'confirmed',   date: '2026.06.14', venue: 'グランドホール',    staff: '草野', guests: 80,  flagged: true },
  { id: 'c2', name: '山田 さくら・翔',   nameKana: 'ヤマダ サクラ・ショウ',   status: 'provisional', date: '2026.09.20', venue: 'ガーデンチャペル',  staff: '田中', guests: 60,  flagged: false },
  { id: 'c3', name: '佐藤 愛・大介',     nameKana: 'サトウ アイ・ダイスケ',   status: 'confirmed',   date: '2026.11.08', venue: 'グランドホール',    staff: '草野', guests: 120, flagged: false },
  { id: 'c4', name: '松本 結衣・誠',     nameKana: 'マツモト ユイ・マコト',   status: 'inquiry',     date: '2027.03.15', venue: '未定',             staff: '鈴木', guests: 50,  flagged: false },
  { id: 'c5', name: '渡辺 花子・一郎',   nameKana: 'ワタナベ ハナコ・イチロウ', status: 'cancelled', date: '—',          venue: '—',               staff: '草野', guests: 0,   flagged: false },
];

const STATUS_CFG: Record<string, { label: string; color: string; bg: string }> = {
  confirmed:   { label: '確定',      color: ORANGE,  bg: '#FDE8DA' },
  provisional: { label: '仮予約',    color: AMBER,   bg: '#FEF3C7' },
  inquiry:     { label: '問合せ',    color: NAVY,    bg: '#E0E7FF' },
  cancelled:   { label: 'キャンセル', color: GRAY_C, bg: '#F3F4F6' },
};

// ─── Day-View constants & data ─────────────────────────────────────────────────
const STAFF = ['草野', '田中', '鈴木', '松本', '佐藤'];
const DOW_LABELS = ['日', '月', '火', '水', '木', '金', '土'];
const HOUR_W = 60;
const STAFF_COL_W = 40;
const ROW_H = 56;
const START_HOUR = 9;
const DAY_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];

type DayEvent = { id: string; staff: string; startH: number; endH: number; title: string; type: string; label: string };

const DAY_EVENTS: Record<number, DayEvent[]> = {
  9: [
    { id: 'dy1', staff: '草野', startH: 9.5,  endH: 10.5, title: '田中様来館',   type: 'visit',    label: '来館' },
    { id: 'dy2', staff: '草野', startH: 15,   endH: 16,   title: '松本様来館',   type: 'visit',    label: '来館' },
    { id: 'dy3', staff: '草野', startH: 16.5, endH: 17,   title: 'チームMTG',   type: 'internal', label: '社内' },
    { id: 'dy4', staff: '田中', startH: 11,   endH: 12,   title: '山田様打合',   type: 'meeting',  label: '打合' },
    { id: 'dy5', staff: '田中', startH: 16.5, endH: 17,   title: 'チームMTG',   type: 'internal', label: '社内' },
    { id: 'dy6', staff: '鈴木', startH: 13.5, endH: 14.5, title: '佐藤様ドレス', type: 'dress',    label: 'ドレス' },
    { id: 'dy7', staff: '鈴木', startH: 16.5, endH: 17,   title: 'チームMTG',   type: 'internal', label: '社内' },
    { id: 'dy8', staff: '松本', startH: 10,   endH: 11.5, title: '木村様打合',   type: 'meeting',  label: '打合' },
  ],
  10: [
    { id: 'dy9',  staff: '草野', startH: 10,  endH: 11.5, title: '鈴木様来館',   type: 'visit',   label: '来館' },
    { id: 'dy10', staff: '田中', startH: 14,  endH: 15,   title: '中村様打合',   type: 'meeting', label: '打合' },
    { id: 'dy11', staff: '松本', startH: 9.5, endH: 10.5, title: '小林様来館',   type: 'visit',   label: '来館' },
  ],
  11: [
    { id: 'dy12', staff: '草野', startH: 9,  endH: 10,   title: '木村様来館',   type: 'visit',   label: '来館' },
    { id: 'dy13', staff: '鈴木', startH: 11, endH: 12.5, title: '伊藤様打合',   type: 'meeting', label: '打合' },
    { id: 'dy14', staff: '佐藤', startH: 13, endH: 14,   title: 'ドレス試着',   type: 'dress',   label: 'ドレス' },
  ],
  12: [
    { id: 'dy15', staff: '田中', startH: 10.5, endH: 12,   title: '山本様打合',  type: 'meeting', label: '打合' },
    { id: 'dy16', staff: '草野', startH: 14,   endH: 15.5, title: '大野様来館',  type: 'visit',   label: '来館' },
  ],
};

// ─── Groups ───────────────────────────────────────────────────────────────────
type Group = { id: string; label: string; emoji: string; members: string[]; color: string };
const GROUPS: Group[] = [
  { id: 'all',     label: '全スタッフ',      emoji: '👥', members: ['草野','田中','鈴木','松本','佐藤'], color: NAVY },
  { id: 'planner', label: 'プランナー',      emoji: '📋', members: ['草野','田中'],                     color: '#7A68C0' },
  { id: 'coord',   label: 'コーディネーター', emoji: '🎯', members: ['鈴木','松本'],                    color: ORANGE },
  { id: 'photo',   label: 'フォト・ドレス',   emoji: '📸', members: ['佐藤'],                           color: '#BE185D' },
  { id: 'mine',    label: '自分のみ',         emoji: '🙋', members: ['草野'],                           color: AMBER },
];

// ─── Group Sheet ──────────────────────────────────────────────────────────────
function GroupSheet({ current, onSelect, onClose }: {
  current: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      style={{ background: 'rgba(0,0,0,0.45)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, boxShadow: '0 -8px 40px rgba(0,0,0,0.18)' }}>
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: '#e5e7eb' }} />
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-100">
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: NAVY }}>グループ選択</p>
            <p style={{ fontSize: 10, color: GRAY_C, marginTop: 1 }}>表示するスタッフグループを選んでください</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: '#f3f4f6', border: 'none', cursor: 'pointer' }}>
            <X size={16} style={{ color: GRAY_C }} />
          </button>
        </div>
        <div className="px-4 py-3 flex flex-col gap-2">
          {GROUPS.map(g => {
            const isSelected = g.id === current;
            return (
              <button key={g.id} onClick={() => { onSelect(g.id); onClose(); }}
                className="flex items-center gap-3 w-full rounded-2xl px-4 py-3 text-left"
                style={{
                  background: isSelected ? `${g.color}12` : '#f8f9fa',
                  border: `1.5px solid ${isSelected ? g.color : 'transparent'}`,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: isSelected ? g.color : '#efefef', fontSize: 18 }}>
                  <span>{g.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 600, color: isSelected ? g.color : '#1a1a1a' }}>{g.label}</p>
                  <p style={{ fontSize: 10, color: GRAY_C, marginTop: 1 }}>{g.members.join(' · ')}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full shrink-0"
                  style={{ fontSize: 11, fontWeight: 700, background: isSelected ? g.color : '#e5e7eb', color: isSelected ? '#fff' : GRAY_C }}>
                  {g.members.length}
                </span>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: g.color }}>
                    <span style={{ fontSize: 11, color: '#fff', lineHeight: 1 }}>✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <div style={{ height: 16 }} />
      </div>
    </div>
  );
}

// ─── Status Bar ───────────────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1" style={{ fontSize: 11, color: NAVY, fontWeight: 600 }}>
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <Wifi size={12} />
        <Battery size={14} />
      </div>
    </div>
  );
}

// ─── App Header (CS Mobile style) ────────────────────────────────────────────
function AppHeader({ hasNotif = false }: { hasNotif?: boolean }) {
  return (
    <header
      className="flex items-center justify-between px-6 pt-3 pb-4 shrink-0 bg-white border-b border-neutral-100"
    >
      <span
        className="text-sm tracking-[0.18em] uppercase"
        style={{
          fontWeight: 700,
          backgroundImage: BRAND_GRAD,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        ƐS Product
      </span>
      <div className="flex items-center gap-3">
        <GridIcon size={28} pattern="B" />
      </div>
    </header>
  );
}

// ─── Event Sheet ──────────────────────────────────────────────────────────────
function EventSheet({ state, onClose }: { state: SheetState; onClose: () => void }) {
  const isNew = state?.mode === 'new';
  const initial: EventFormData = isNew
    ? { title: '', type: 'visit', staff: STAFF[0], startTime: '10:00', endTime: '11:00', room: '', memo: '' }
    : (state as { mode: 'edit'; data: EventFormData }).data;

  const [form, setForm] = useState<EventFormData>(initial);

  const TYPE_OPTIONS = [
    { value: 'visit',    label: '来館',  color: ORANGE },
    { value: 'meeting',  label: '打合せ', color: '#7A68C0' },
    { value: 'dress',    label: 'ドレス', color: '#BE185D' },
    { value: 'internal', label: '社内',  color: '#64748B' },
  ];

  const handleField = (field: keyof EventFormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      style={{ background: 'rgba(0,0,0,0.45)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="flex flex-col"
        style={{
          background: '#fff',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          maxHeight: '88%',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: '#e5e7eb' }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-100">
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: NAVY }}>
              {isNew ? '新規予定' : '予定を編集'}
            </p>
            {!isNew && (
              <p style={{ fontSize: 10, color: GRAY_C, marginTop: 1 }}>3月9日（月）</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: '#f3f4f6', border: 'none', cursor: 'pointer' }}
          >
            <X size={16} style={{ color: GRAY_C }} />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: 'none' }}>

          {/* タイトル */}
          <div className="mb-4">
            <label style={{ fontSize: 10, color: GRAY_C, letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>タイトル</label>
            <input
              className="w-full outline-none"
              style={{
                fontSize: 14, color: '#1a1a1a', fontWeight: 500,
                background: '#f8f9fa', borderRadius: 12,
                padding: '10px 14px',
                border: `1.5px solid ${form.title ? NAVY + '40' : '#f3f4f6'}`,
              }}
              placeholder="予定のタイトルを入力"
              value={form.title}
              onChange={e => handleField('title', e.target.value)}
            />
          </div>

          {/* 種別 */}
          <div className="mb-4">
            <label style={{ fontSize: 10, color: GRAY_C, letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>種別</label>
            <div className="flex gap-2 flex-wrap">
              {TYPE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleField('type', opt.value)}
                  style={{
                    fontSize: 11, fontWeight: 600,
                    padding: '6px 14px', borderRadius: 20,
                    background: form.type === opt.value ? opt.color : `${opt.color}18`,
                    color: form.type === opt.value ? '#fff' : opt.color,
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* スタッフ */}
          <div className="mb-4">
            <label style={{ fontSize: 10, color: GRAY_C, letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>担当スタッフ</label>
            <div className="flex gap-2 flex-wrap">
              {STAFF.map(s => (
                <button
                  key={s}
                  onClick={() => handleField('staff', s)}
                  style={{
                    fontSize: 11, fontWeight: 600,
                    padding: '6px 14px', borderRadius: 20,
                    background: form.staff === s ? NAVY : `${NAVY}12`,
                    color: form.staff === s ? '#fff' : NAVY,
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 時間 */}
          <div className="mb-4">
            <label style={{ fontSize: 10, color: GRAY_C, letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>時間</label>
            <div className="flex items-center gap-3">
              <input
                type="time"
                value={form.startTime}
                onChange={e => handleField('startTime', e.target.value)}
                style={{
                  flex: 1, fontSize: 14, fontWeight: 500, color: NAVY,
                  background: '#f8f9fa', borderRadius: 12,
                  padding: '10px 12px', border: '1.5px solid #f3f4f6',
                  outline: 'none',
                }}
              />
              <span style={{ fontSize: 12, color: GRAY_C }}>〜</span>
              <input
                type="time"
                value={form.endTime}
                onChange={e => handleField('endTime', e.target.value)}
                style={{
                  flex: 1, fontSize: 14, fontWeight: 500, color: NAVY,
                  background: '#f8f9fa', borderRadius: 12,
                  padding: '10px 12px', border: '1.5px solid #f3f4f6',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* 場所 */}
          <div className="mb-4">
            <label style={{ fontSize: 10, color: GRAY_C, letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>場所・部屋</label>
            <input
              className="w-full outline-none"
              style={{
                fontSize: 13, color: '#1a1a1a',
                background: '#f8f9fa', borderRadius: 12,
                padding: '10px 14px', border: '1.5px solid #f3f4f6',
              }}
              placeholder="サロン A、ラウンジ など"
              value={form.room}
              onChange={e => handleField('room', e.target.value)}
            />
          </div>

          {/* メモ */}
          <div className="mb-2">
            <label style={{ fontSize: 10, color: GRAY_C, letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>メモ</label>
            <textarea
              rows={3}
              className="w-full outline-none resize-none"
              style={{
                fontSize: 12, color: '#1a1a1a',
                background: '#f8f9fa', borderRadius: 12,
                padding: '10px 14px', border: '1.5px solid #f3f4f6',
              }}
              placeholder="備考・連絡事項など"
              value={form.memo}
              onChange={e => handleField('memo', e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-neutral-100">
          <div className="flex gap-3">
            {!isNew && (
              <button
                className="w-10 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: '#FEE2E2', border: 'none', cursor: 'pointer' }}
                onClick={onClose}
              >
                <Trash2 size={15} style={{ color: '#DC2626' }} />
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 h-11 rounded-xl"
              style={{ fontSize: 13, fontWeight: 600, background: '#f3f4f6', color: GRAY_C, border: 'none', cursor: 'pointer' }}
            >
              キャンセル
            </button>
            <button
              onClick={onClose}
              className="flex-1 h-11 rounded-xl"
              style={{ fontSize: 13, fontWeight: 700, background: NAVY, color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Home Tab ─────────────────────────────────────────────────────────────────
function HomeTab({ onEventTap }: { onEventTap: (data: EventFormData) => void }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-neutral-50" style={{ scrollbarWidth: 'none' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2D4A8C 100%)` }}>
        {/* Background photo */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1763688506750-0da09fe27324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBjbGVhciUyMG9jZWFuJTIwc2VhJTIwdHVycXVvaXNlJTIwYWVyaWFsfGVufDF8fHx8MTc3MzA0Nzc2NHww&ixlib=rb-4.1.0&q=80&w=1080")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Overlay — テキスト視認性のための薄い暗幕のみ、青フィルターなし */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.18) 100%)' }}
        />
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>ES PRODUCT</p>
              <p style={{ fontSize: 15, color: '#fff', fontWeight: 600, marginTop: 2 }}>草野 繁 さん</p>
            </div>
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocIgSIninB2fGT3ZBLTLxnLUuaDwkqhWKP0afP-MZbJObXt2wB4=s576-c-no"
              alt="草野 繁"
              className="w-9 h-9 rounded-full object-cover"
              style={{ border: '2px solid rgba(255,255,255,0.5)' }}
            />
          </div>
          {/* Today summary */}
          <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.12)' }}>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Today · 3月9日（月）</p>
            <div className="flex items-end justify-between mt-1.5">
              <div>
                <span style={{ fontSize: 26, fontWeight: 300, color: '#fff' }}>4</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginLeft: 4 }}>件の予定</span>
              </div>
              <div className="text-right">
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>来館対応</p>
                <p style={{ fontSize: 13, color: GOLD, fontWeight: 600 }}>2件</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 pt-4 pb-2">
        <p style={{ fontSize: 10, color: GRAY_C, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>クイックアクセス</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: CalendarDays, label: 'スケジュール', color: NAVY },
            { icon: Users, label: '顧客', color: '#7A68C0' },
            { icon: MapPin, label: '会場', color: ORANGE },
            { icon: Star, label: 'お気に入り', color: AMBER },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${color}15` }}>
                <Icon size={20} style={{ color }} />
              </div>
              <span style={{ fontSize: 9, color: '#555', textAlign: 'center' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Today's schedule preview */}
      <div className="px-4 pt-3 pb-2">
        <p style={{ fontSize: 10, color: GRAY_C, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>本日の予定</p>
        <div className="flex flex-col gap-2">
          {EVENTS.slice(0, 3).map(ev => {
            const cfg = EVENT_COLOR[ev.type];
            return (
              <button
                key={ev.id}
                onClick={() => onEventTap({
                  id: ev.id, title: ev.title, type: ev.type,
                  staff: '草野', startTime: ev.start, endTime: ev.end, room: ev.room, memo: '',
                })}
                className="w-full flex items-center gap-3 rounded-xl p-3 bg-white text-left"
                style={{ border: 'none', cursor: 'pointer' }}
              >
                <div className="w-1 self-stretch rounded-full" style={{ background: cfg.bar }} />
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</p>
                  <p style={{ fontSize: 10, color: GRAY_C, marginTop: 1 }}>{ev.start} – {ev.end} · {ev.room}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full" style={{ fontSize: 9, background: cfg.bg, color: cfg.text, whiteSpace: 'nowrap' }}>{ev.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Schedule Tab ─────────────────────────────────────────────────────────────
function ScheduleTab({ onEventTap, onNewEvent }: { onEventTap: (data: EventFormData) => void; onNewEvent: () => void }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [selectedMonthDay, setSelectedMonthDay] = useState<number>(9);
  const [dayDate, setDayDate] = useState(9);
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [groupSheetOpen, setGroupSheetOpen] = useState(false);

  const currentGroup = GROUPS.find(g => g.id === selectedGroup)!;
  const visibleStaff = currentGroup.members;

  const MONTHS = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const baseYear = 2026; const baseMonth = 2;
  const absMonth = baseMonth + monthOffset;
  const dispYear = baseYear + Math.floor(absMonth / 12);
  const dispMonthIdx = ((absMonth % 12) + 12) % 12;
  const dispMonthLabel = `${dispYear}年 ${MONTHS[dispMonthIdx]}`;

  const weekStart = 9 + weekOffset * 7;
  const weekDates = Array.from({ length: 7 }, (_, i) => weekStart + i);
  const validWeekDates = weekDates.map(d => (d >= 1 && d <= 31 ? d : null));

  const getDOW = (d: number) => DOW_LABELS[new Date(2026, 2, d).getDay()];

  const navLabel = viewMode === 'day'
    ? `3月${dayDate}日（${getDOW(dayDate)}）`
    : viewMode === 'week'
    ? '2026年 3月'
    : dispMonthLabel;

  const handlePrev = () => {
    if (viewMode === 'day') setDayDate(d => Math.max(1, d - 1));
    else if (viewMode === 'week') setWeekOffset(o => o - 1);
    else if (viewMode === 'month') setMonthOffset(o => o - 1);
  };
  const handleNext = () => {
    if (viewMode === 'day') setDayDate(d => Math.min(31, d + 1));
    else if (viewMode === 'week') setWeekOffset(o => o + 1);
    else if (viewMode === 'month') setMonthOffset(o => o + 1);
  };

  const gridOffset = 6;
  const totalCells = Math.ceil((MARCH_DAYS + gridOffset) / 7) * 7;
  const monthCells: (number | null)[] = Array.from({ length: totalCells }, (_, i) => {
    const d = i - gridOffset + 1;
    return d >= 1 && d <= MARCH_DAYS ? d : null;
  });
  const monthDayEvents = MONTH_EVENT_DAYS[selectedMonthDay] ?? [];

  const toDayEventForm = (ev: DayEvent): EventFormData => ({
    id: ev.id, title: ev.title, type: ev.type, staff: ev.staff,
    startTime: `${Math.floor(ev.startH)}:${ev.startH % 1 === 0.5 ? '30' : '00'}`,
    endTime: `${Math.floor(ev.endH)}:${ev.endH % 1 === 0.5 ? '30' : '00'}`,
    room: '', memo: '',
  });

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden relative">
      {/* Page title sub-header */}
      <div className="flex items-baseline gap-1.5 px-4 py-2 border-b border-neutral-100 bg-white">
        <span style={{ fontSize: 15, fontWeight: 600, color: NAVY }}>スケジュール</span>
        <span style={{ fontSize: 10, fontWeight: 400, color: GRAY_C, letterSpacing: '0.05em' }}>Time</span>
      </div>

      {/* Nav bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-100">
        <button className="p-1" onClick={handlePrev}><ChevronLeft size={16} style={{ color: NAVY }} /></button>
        <span style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>{navLabel}</span>
        <div className="flex items-center gap-1.5">
          <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
            {(['day', 'week', 'month'] as const).map(m => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                style={{
                  fontSize: 10, fontWeight: 600, padding: '3px 7px',
                  background: viewMode === m ? NAVY : '#fff',
                  color: viewMode === m ? '#fff' : GRAY_C,
                  border: 'none', cursor: 'pointer',
                }}
              >
                {m === 'day' ? '日' : m === 'week' ? '週' : '月'}
              </button>
            ))}
          </div>
          <button className="p-1" onClick={handleNext}><ChevronRight size={16} style={{ color: NAVY }} /></button>
        </div>
      </div>

      {/* Group filter bar */}
      <button
        onClick={() => setGroupSheetOpen(true)}
        className="flex items-center gap-2 px-4 py-2 w-full text-left border-b border-neutral-100"
        style={{ background: `${currentGroup.color}08`, cursor: 'pointer', border: 'none', borderBottom: '1px solid #f3f4f6' }}
      >
        <span style={{ fontSize: 14 }}>{currentGroup.emoji}</span>
        <div className="flex-1 min-w-0">
          <span style={{ fontSize: 11, fontWeight: 600, color: currentGroup.color }}>{currentGroup.label}</span>
          <span style={{ fontSize: 10, color: GRAY_C, marginLeft: 6 }}>{visibleStaff.join(' · ')}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <span style={{ fontSize: 9, color: currentGroup.color, fontWeight: 600, letterSpacing: '0.05em' }}>変更</span>
          <ChevronRight size={11} style={{ color: currentGroup.color }} />
        </div>
      </button>

      {/* ── Day View ── */}
      {viewMode === 'day' && (
        <div className="flex-1 overflow-x-auto overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          <div style={{ minWidth: STAFF_COL_W + HOUR_W * DAY_HOURS.length }}>
            {/* Time header */}
            <div className="flex" style={{ height: 22, borderBottom: '1px solid #f3f4f6', position: 'sticky', top: 0, background: '#fff', zIndex: 3 }}>
              <div style={{ width: STAFF_COL_W, flexShrink: 0, position: 'sticky', left: 0, background: '#fff', zIndex: 4 }} />
              {DAY_HOURS.map(h => (
                <div key={h} style={{ width: HOUR_W, flexShrink: 0, borderLeft: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', paddingLeft: 4 }}>
                  <span style={{ fontSize: 9, color: GRAY_C, fontWeight: 500 }}>{h}:00</span>
                </div>
              ))}
            </div>
            {/* Staff rows — filtered by group */}
            {visibleStaff.map((s, si) => {
              const rowEvents = (DAY_EVENTS[dayDate] ?? []).filter(e => e.staff === s);
              return (
                <div key={s} className="flex relative" style={{
                  height: ROW_H,
                  borderBottom: si < visibleStaff.length - 1 ? '1px solid #f3f4f6' : 'none',
                  background: si % 2 === 0 ? '#fff' : '#fafafa',
                }}>
                  <div style={{
                    width: STAFF_COL_W, flexShrink: 0,
                    position: 'sticky', left: 0, zIndex: 2,
                    background: si % 2 === 0 ? '#fff' : '#fafafa',
                    borderRight: '1px solid #f3f4f6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: `${currentGroup.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: currentGroup.color }}>{s}</span>
                    </div>
                  </div>
                  <div className="relative" style={{ width: HOUR_W * DAY_HOURS.length }}>
                    {DAY_HOURS.map((_, hi) => (
                      <div key={hi} style={{ position: 'absolute', top: 0, bottom: 0, left: hi * HOUR_W, width: 1, background: '#f3f4f6' }} />
                    ))}
                    {DAY_HOURS.map((_, hi) => (
                      <div key={`h${hi}`} style={{ position: 'absolute', top: 0, bottom: 0, left: hi * HOUR_W + HOUR_W / 2, width: 1, background: '#f9fafb' }} />
                    ))}
                    {rowEvents.map(ev => {
                      const cfg = EVENT_COLOR[ev.type];
                      const left = (ev.startH - START_HOUR) * HOUR_W + 2;
                      const width = (ev.endH - ev.startH) * HOUR_W - 4;
                      return (
                        <div
                          key={ev.id}
                          onClick={() => onEventTap(toDayEventForm(ev))}
                          style={{
                            position: 'absolute', top: 5, bottom: 5, left, width,
                            background: cfg.bg, borderLeft: `3px solid ${cfg.bar}`,
                            borderRadius: 6, overflow: 'hidden',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center',
                            padding: '2px 5px', cursor: 'pointer',
                          }}
                        >
                          <span style={{ fontSize: 9, fontWeight: 700, color: cfg.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.3 }}>{ev.title}</span>
                          {width >= 48 && (
                            <span style={{ fontSize: 8, color: cfg.text, opacity: 0.75, whiteSpace: 'nowrap' }}>
                              {Math.floor(ev.startH)}:{ev.startH % 1 === 0.5 ? '30' : '00'}–{Math.floor(ev.endH)}:{ev.endH % 1 === 0.5 ? '30' : '00'}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Week View ── */}
      {viewMode === 'week' && (
        <>
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-neutral-100">
            {WEEK_DAYS.map((day, i) => {
              const d = validWeekDates[i];
              const isSelected = i === selectedDay && d !== null;
              const isToday = d === 9;
              return (
                <button key={day} onClick={() => d !== null && setSelectedDay(i)}
                  className="flex flex-col items-center gap-1" style={{ width: 32, opacity: d === null ? 0.3 : 1 }}>
                  <span style={{ fontSize: 9, color: i === 6 ? '#BE185D' : i === 5 ? '#1D4ED8' : GRAY_C, fontWeight: isSelected ? 700 : 400 }}>{day}</span>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: isSelected ? NAVY : 'transparent', border: isToday && !isSelected ? `1.5px solid ${NAVY}` : 'none' }}>
                    <span style={{ fontSize: 12, color: isSelected ? '#fff' : isToday ? NAVY : '#333', fontWeight: isToday || isSelected ? 700 : 400 }}>
                      {d ?? ''}
                    </span>
                  </div>
                  {d !== null && MONTH_EVENT_DAYS[d] && (
                    <div className="w-1 h-1 rounded-full" style={{ background: isSelected ? NAVY : ORANGE }} />
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3" style={{ scrollbarWidth: 'none' }}>
            {(() => {
              const d = validWeekDates[selectedDay];
              const evs = d !== null ? (DAY_EVENTS[d] ?? []) : [];
              return (
                <>
                  <p style={{ fontSize: 10, color: GRAY_C, letterSpacing: '0.1em', marginBottom: 10 }}>
                    {d !== null ? `${d}日（${WEEK_DAYS[selectedDay]}）` : '—'} — {evs.length > 0 ? `${evs.length}件` : '予定なし'}
                  </p>
                  {evs.length > 0 ? (
                    <div className="flex flex-col gap-2.5">
                      {evs.map(ev => {
                        const cfg = EVENT_COLOR[ev.type];
                        const sh = Math.floor(ev.startH), sm = ev.startH % 1 === 0.5 ? '30' : '00';
                        const eh = Math.floor(ev.endH),   em = ev.endH % 1 === 0.5 ? '30' : '00';
                        return (
                          <button
                            key={ev.id}
                            onClick={() => onEventTap(toDayEventForm(ev))}
                            className="flex gap-3 items-stretch w-full text-left"
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
                          >
                            <div className="flex flex-col items-end pt-1" style={{ width: 36, flexShrink: 0 }}>
                              <span style={{ fontSize: 10, color: GRAY_C, fontWeight: 500 }}>{sh}:{sm}</span>
                            </div>
                            <div className="flex-1 rounded-2xl overflow-hidden flex" style={{ background: cfg.bg, minHeight: 56 }}>
                              <div className="w-1.5" style={{ background: cfg.bar }} />
                              <div className="flex-1 p-3">
                                <div className="flex items-start justify-between">
                                  <p style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a' }}>{ev.title}</p>
                                  <span className="ml-2 px-2 py-0.5 rounded-full" style={{ fontSize: 8, background: cfg.bar, color: '#fff', whiteSpace: 'nowrap', flexShrink: 0 }}>{ev.label}</span>
                                </div>
                                <p style={{ fontSize: 9, color: cfg.text, marginTop: 4 }}>{sh}:{sm}–{eh}:{em} · {ev.staff}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <CalendarDays size={32} style={{ color: '#e5e7eb', marginBottom: 8 }} />
                      <p style={{ fontSize: 12, color: GRAY_C }}>この日の予定はありません</p>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </>
      )}

      {/* ── Month View ── */}
      {viewMode === 'month' && (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="grid grid-cols-7 px-2 pt-2 pb-1">
            {['月','火','水','木','金','土','日'].map((d, i) => (
              <div key={d} className="flex justify-center">
                <span style={{ fontSize: 9, fontWeight: 600, color: i === 5 ? '#1D4ED8' : i === 6 ? '#BE185D' : GRAY_C }}>{d}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 px-2 gap-y-1 flex-shrink-0">
            {monthCells.map((d, i) => {
              if (d === null) return <div key={`e-${i}`} />;
              const isToday = d === 9;
              const isSelected = d === selectedMonthDay;
              const dots = MONTH_EVENT_DAYS[d] ?? [];
              const col = i % 7;
              return (
                <button key={d} onClick={() => setSelectedMonthDay(d)}
                  className="flex flex-col items-center py-1 rounded-xl"
                  style={{ background: isSelected ? NAVY : 'transparent', border: 'none', cursor: 'pointer' }}>
                  <span style={{
                    fontSize: 11, fontWeight: isToday || isSelected ? 700 : 400,
                    color: isSelected ? '#fff' : isToday ? NAVY : col === 5 ? '#1D4ED8' : col === 6 ? '#BE185D' : '#333',
                    width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '50%', border: isToday && !isSelected ? `1.5px solid ${NAVY}` : 'none',
                  }}>{d}</span>
                  <div className="flex flex-col gap-px mt-0.5 w-full px-0.5">
                    {dots.slice(0, 2).map((type, ti) => {
                      const cfg = EVENT_COLOR[type];
                      return (
                        <div key={ti} style={{
                          fontSize: 7, fontWeight: 600, lineHeight: '10px', borderRadius: 3,
                          paddingLeft: 2, paddingRight: 2,
                          background: isSelected ? 'rgba(255,255,255,0.22)' : cfg?.bg ?? '#f3f4f6',
                          color: isSelected ? 'rgba(255,255,255,0.9)' : cfg?.text ?? GRAY_C,
                          whiteSpace: 'nowrap', overflow: 'hidden', textAlign: 'center',
                        }}>
                          {EVENT_SHORT[type] ?? type}
                        </div>
                      );
                    })}
                    {dots.length > 2 && (
                      <div style={{ fontSize: 7, color: isSelected ? 'rgba(255,255,255,0.6)' : GRAY_C, textAlign: 'center', lineHeight: '10px' }}>+{dots.length - 2}</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mx-4 my-2" style={{ height: 1, background: '#f3f4f6' }} />
          <div className="flex-1 overflow-y-auto px-4" style={{ scrollbarWidth: 'none' }}>
            <p style={{ fontSize: 10, color: GRAY_C, letterSpacing: '0.08em', marginBottom: 8 }}>
              3月{selectedMonthDay}日 — {monthDayEvents.length > 0 ? `${monthDayEvents.length}件` : '予定なし'}
            </p>
            {(DAY_EVENTS[selectedMonthDay] ?? []).length > 0 ? (
              <div className="flex flex-col gap-2">
                {(DAY_EVENTS[selectedMonthDay] ?? []).map(ev => {
                  const cfg = EVENT_COLOR[ev.type];
                  return (
                    <button
                      key={ev.id}
                      onClick={() => onEventTap(toDayEventForm(ev))}
                      className="w-full flex items-center gap-2.5 rounded-xl p-2.5 bg-neutral-50 text-left"
                      style={{ border: 'none', cursor: 'pointer' }}
                    >
                      <div className="w-1 self-stretch rounded-full" style={{ background: cfg.bar }} />
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: 11, fontWeight: 600, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</p>
                        <p style={{ fontSize: 9, color: GRAY_C }}>{ev.staff} · {Math.floor(ev.startH)}:{ev.startH % 1 === 0.5 ? '30' : '00'}〜</p>
                      </div>
                      <span className="px-1.5 py-0.5 rounded-full" style={{ fontSize: 8, background: cfg.bg, color: cfg.text, whiteSpace: 'nowrap' }}>{ev.label}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <CalendarDays size={24} style={{ color: '#e5e7eb', marginBottom: 6 }} />
                <p style={{ fontSize: 11, color: GRAY_C }}>予定はありません</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Group Sheet */}
      {groupSheetOpen && (
        <GroupSheet
          current={selectedGroup}
          onSelect={setSelectedGroup}
          onClose={() => setGroupSheetOpen(false)}
        />
      )}

      {/* FAB */}
      <button
        onClick={onNewEvent}
        className="absolute flex items-center justify-center"
        style={{
          right: 16, bottom: 16,
          width: 48, height: 48, borderRadius: 24,
          background: `linear-gradient(135deg, ${NAVY} 0%, #2D4A8C 100%)`,
          boxShadow: `0 4px 16px ${NAVY}60`,
          border: 'none', cursor: 'pointer', zIndex: 10,
        }}
      >
        <Plus size={22} style={{ color: '#fff' }} />
      </button>
    </div>
  );
}

// ─── Customers Tab ────────────────────────────────────────��───────────────────
function CustomersTab() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = CUSTOMERS.filter(c =>
    c.name.includes(query) || c.nameKana.includes(query)
  );

  if (selected) {
    const c = CUSTOMERS.find(x => x.id === selected)!;
    const cfg = STATUS_CFG[c.status];
    return (
      <div className="flex flex-col h-full bg-white overflow-hidden">
        <div className="px-4 pt-3 pb-4" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2D4A8C 100%)` }}>
          <button onClick={() => setSelected(null)} className="flex items-center gap-1 mb-3">
            <ChevronLeft size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>顧客一覧</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: GOLD }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>{c.name[0]}</span>
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{c.name}</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>{c.nameKana}</p>
            </div>
            <span className="ml-auto px-2.5 py-1 rounded-full" style={{ fontSize: 10, background: cfg.bg, color: cfg.color, fontWeight: 600 }}>{cfg.label}</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-neutral-50" style={{ scrollbarWidth: 'none' }}>
          <div className="bg-white rounded-2xl overflow-hidden mb-3">
            {[
              { label: '式場',    value: c.venue },
              { label: '挙式日',  value: c.date },
              { label: 'ゲスト数', value: c.guests > 0 ? `${c.guests}名` : '—' },
              { label: '担当',    value: c.staff + ' (主担)' },
            ].map(({ label, value }, i, arr) => (
              <div key={label} className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <span style={{ fontSize: 11, color: GRAY_C }}>{label}</span>
                <span style={{ fontSize: 13, color: NAVY, fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {[
              { icon: Phone, label: '電話', color: NAVY },
              { icon: CalendarDays, label: '予定追加', color: ORANGE },
              { icon: Star, label: 'フォロー', color: AMBER },
            ].map(({ icon: Icon, label, color }) => (
              <button key={label} className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl"
                style={{ background: `${color}12`, border: `1px solid ${color}25`, cursor: 'pointer' }}>
                <Icon size={16} style={{ color }} />
                <span style={{ fontSize: 10, color, fontWeight: 500 }}>{label}</span>
              </button>
            ))}
          </div>
          <p style={{ fontSize: 10, color: GRAY_C, letterSpacing: '0.1em', marginTop: 16, marginBottom: 10 }}>最近の対応履歴</p>
          <div className="flex flex-col gap-2">
            {[
              { date: '3/5',  label: '来館対応', note: 'ドレス試着・会場見学' },
              { date: '2/18', label: '電話対応', note: '日程調整のご連絡' },
              { date: '2/3',  label: '問合せ',   note: 'ウェブより初回問合せ' },
            ].map(item => (
              <div key={item.date} className="flex gap-3 items-center bg-white rounded-xl px-3 py-2.5">
                <div className="w-8 text-center">
                  <span style={{ fontSize: 10, color: GRAY_C }}>{item.date}</span>
                </div>
                <div className="w-px self-stretch bg-neutral-100" />
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: NAVY }}>{item.label}</p>
                  <p style={{ fontSize: 10, color: GRAY_C }}>{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Page title sub-header */}
      <div className="flex items-baseline gap-1.5 px-4 py-2 border-b border-neutral-100 bg-white">
        <span style={{ fontSize: 15, fontWeight: 600, color: NAVY }}>顧客管理</span>
      </div>
      <div className="px-4 py-2.5 border-b border-neutral-100">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: '#f3f4f6' }}>
          <Search size={14} style={{ color: GRAY_C }} />
          <input
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: 13, color: '#1a1a1a' }}
            placeholder="顧客名・カナで検索"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2 px-4 py-2.5 border-b border-neutral-100 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {['すべて', '確定', '仮予約', '問合せ', 'キャンセル'].map((label, i) => (
          <button
            key={label}
            className="px-3 py-1 rounded-full whitespace-nowrap"
            style={{ fontSize: 10, background: i === 0 ? NAVY : '#f3f4f6', color: i === 0 ? '#fff' : GRAY_C, border: 'none', flexShrink: 0, cursor: 'pointer' }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3" style={{ scrollbarWidth: 'none' }}>
        <p style={{ fontSize: 10, color: GRAY_C, marginBottom: 10 }}>{filtered.length}件</p>
        <div className="flex flex-col gap-2">
          {filtered.map(c => {
            const cfg = STATUS_CFG[c.status];
            return (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className="w-full text-left flex items-center gap-3 rounded-2xl px-3 py-3 bg-neutral-50"
                style={{ border: '1px solid #f3f4f6', cursor: 'pointer' }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: c.flagged ? `${GOLD}25` : '#e5e7eb' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: c.flagged ? '#B45309' : '#9ca3af' }}>{c.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                    {c.flagged && <Star size={10} style={{ color: AMBER, flexShrink: 0 }} fill={AMBER} />}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="px-1.5 py-0.5 rounded-full" style={{ fontSize: 9, background: cfg.bg, color: cfg.color, fontWeight: 600 }}>{cfg.label}</span>
                    <span style={{ fontSize: 10, color: GRAY_C }}>{c.date !== '—' ? `挙式 ${c.date}` : '—'}</span>
                  </div>
                </div>
                <Arrow size={14} style={{ color: '#d1d5db', flexShrink: 0 }} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── MyPage Tab ───────────────────────────────────────────────────────────────
function MyPageTab() {
  return (
    <div className="flex flex-col h-full bg-neutral-50 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
      <div className="px-4 py-5 bg-white border-b border-neutral-100 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: GOLD }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: NAVY }}>草</span>
        </div>
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, color: NAVY }}>草野 繁</p>
          <p style={{ fontSize: 11, color: GRAY_C }}>システム管理者</p>
          <p style={{ fontSize: 10, color: GRAY_C, marginTop: 2 }}>kusano@es-product.jp</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 px-4 py-4">
        {[
          { label: '今月担当', value: '12', unit: '件' },
          { label: '来館予定', value: '4',  unit: '件' },
          { label: '打合せ',   value: '7',  unit: '件' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-3 text-center">
            <p style={{ fontSize: 22, fontWeight: 300, color: NAVY }}>{s.value}<span style={{ fontSize: 11, marginLeft: 1 }}>{s.unit}</span></p>
            <p style={{ fontSize: 9, color: GRAY_C, marginTop: 2 }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div className="px-4">
        <div className="bg-white rounded-2xl overflow-hidden">
          {[
            { label: '通知設定',   icon: Bell },
            { label: 'シフト・勤務', icon: CalendarDays },
            { label: 'ヘルプ',     icon: Circle },
          ].map(({ label, icon: Icon }, i, arr) => (
            <div key={label} className="flex items-center justify-between px-4 py-3.5"
              style={{ borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
              <div className="flex items-center gap-3">
                <Icon size={15} style={{ color: NAVY }} />
                <span style={{ fontSize: 13, color: '#1a1a1a' }}>{label}</span>
              </div>
              <Arrow size={14} style={{ color: '#d1d5db' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function BottomNav({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const leftItems: { id: Tab; icon: typeof Home; label: string }[] = [
    { id: 'home',     icon: Home,        label: 'ホーム' },
    { id: 'schedule', icon: CalendarDays, label: 'スケジュール' },
  ];
  const rightItems: { id: Tab; icon: typeof Home; label: string }[] = [
    { id: 'notifications', icon: Bell, label: '通知' },
    { id: 'mypage',    icon: Settings, label: '設定' },
  ];
  return (
    <div className="flex items-center justify-around px-2 pt-2 pb-3 bg-white border-t border-neutral-100">
      {leftItems.map(({ id, icon: Icon, label }) => {
        const active = tab === id;
        return (
          <button key={id} onClick={() => setTab(id)} className="flex flex-col items-center gap-0.5" style={{ width: 56 }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: active ? `${NAVY}12` : 'transparent' }}>
              <Icon size={18} style={{ color: active ? NAVY : GRAY_C }} />
            </div>
            <span style={{ fontSize: 9, color: active ? NAVY : GRAY_C, fontWeight: active ? 600 : 400 }}>{label}</span>
          </button>
        );
      })}

      {/* 中央: CS Mobile アイコン */}
      <div className="flex flex-col items-center gap-0.5 pt-1 pb-1" style={{ width: 56 }}>
        <GridIcon size={28} pattern="B" />
        <span style={{ fontSize: 9, color: GRAY_C, fontWeight: 400 }}>メニュー</span>
      </div>

      {rightItems.map(({ id, icon: Icon, label }) => {
        const active = tab === id;
        return (
          <button key={id} onClick={() => setTab(id)} className="flex flex-col items-center gap-0.5" style={{ width: 56 }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: active ? `${NAVY}12` : 'transparent' }}>
              <Icon size={18} style={{ color: active ? NAVY : GRAY_C }} />
            </div>
            <span style={{ fontSize: 9, color: active ? NAVY : GRAY_C, fontWeight: active ? 600 : 400 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Phone Frame ──────────────────────────────────────────────────────────────
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto"
      style={{
        width: 390, height: 844, borderRadius: 48, background: '#fff',
        boxShadow: '0 0 0 10px #0f0f0f, 0 0 0 12px #2a2a2a, 0 40px 80px rgba(0,0,0,0.35)',
        overflow: 'hidden', flexShrink: 0,
      }}
    >
      {/* Notch */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-50"
        style={{ width: 120, height: 30, background: '#0f0f0f', borderBottomLeftRadius: 18, borderBottomRightRadius: 18 }}
      />
      {children}
    </div>
  );
}

// ─── Phone App ────────────────────────────────────────────────────────────────
function PhoneApp() {
  const [tab, setTab] = useState<Tab>('home');
  const [sheet, setSheet] = useState<SheetState>(null);

  const handleEventTap = (data: EventFormData) => setSheet({ mode: 'edit', data });
  const handleNewEvent = () => setSheet({ mode: 'new' });
  const handleCloseSheet = () => setSheet(null);

  return (
    <div className="flex flex-col h-full relative">
      <StatusBar />
      <AppHeader hasNotif />
      <div className="flex-1 overflow-hidden relative">
        {tab === 'home'      && <HomeTab onEventTap={handleEventTap} />}
        {tab === 'schedule'  && <ScheduleTab onEventTap={handleEventTap} onNewEvent={handleNewEvent} />}
        {tab === 'notifications' && <CustomersTab />}
        {tab === 'mypage'    && <MyPageTab />}
        {sheet && <EventSheet state={sheet} onClose={handleCloseSheet} />}
      </div>
      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ESMobile() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12" style={{ background: '#fafafa', fontFamily: 'DM Sans, sans-serif' }}>
      <PhoneFrame>
        <PhoneApp />
      </PhoneFrame>
    </div>
  );
}