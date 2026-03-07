import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewMode  = 'day' | 'day2' | 'week1' | 'week2' | 'month1' | 'month2' | 'month3';
type EventType = 'visit' | 'meeting' | 'event' | 'training' | 'personal' | 'photo';
type MoveEventFn = (id: string, t: Pick<SchedEvent, 'startHour'|'startMin'|'endHour'|'endMin'>) => void;

interface Staff {
  id: string; name: string; role: string; isMe: boolean; color: string;
}
interface SchedEvent {
  id: string; staffId: string; date: string;
  startHour: number; startMin: number;
  endHour: number;   endMin: number;
  type: EventType;   title: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TODAY_STR  = '2026-03-06';
const TODAY_DATE = new Date(2026, 2, 6);
const DOW_JA     = ['日', '月', '火', '水', '木', '金', '土'];
const HOUR_S     = 7;
const HOUR_E     = 23;
const HOURS      = Array.from({ length: HOUR_E - HOUR_S }, (_, i) => HOUR_S + i);

const SLOT_MINUTES   = 10;
const SLOTS_PER_HOUR = 60 / SLOT_MINUTES; // 6
const TOTAL_SLOTS    = HOURS.length * SLOTS_PER_HOUR; // 96
const MIN_SLOT_WIDTH = 11;

const EVENT_CFG: Record<EventType, { label: string; color: string; bg: string; text: string }> = {
  visit:    { label: '来館対応',  color: '#E8703A', bg: '#FDE8DA', text: '#C04A18' },
  meeting:  { label: '打合せ',    color: '#7A68C0', bg: '#EAE7F8', text: '#4E3DA0' },
  event:    { label: 'イベント',  color: '#BE185D', bg: '#FCE7F3', text: '#9D174D' },
  training: { label: '研修',      color: '#1D4ED8', bg: '#DBEAFE', text: '#1E40AF' },
  personal: { label: '個人予定',  color: '#64748B', bg: '#F1F5F9', text: '#475569' },
  photo:    { label: 'フォト',    color: '#15803D', bg: '#DCFCE7', text: '#166534' },
};

const VIEW_TABS: { id: ViewMode; label: string; desc: string }[] = [
  { id: 'day',    label: 'Day.1',   desc: '横軸 時間 × 人' },
  { id: 'day2',   label: 'Day.2',   desc: '縦軸 時間 × 人' },
  { id: 'week1',  label: 'Week.1',  desc: '日程 × 人' },
  { id: 'week2',  label: 'Week.2',  desc: '日程 × 時間' },
  { id: 'month1', label: 'Month.1', desc: '日程 × 人' },
  { id: 'month2', label: 'Month.2', desc: '日程 × 時間' },
  { id: 'month3', label: 'Month.3', desc: 'カレンダー' },
];

// ─── Staff ────────────────────────────────────────────────────────────────────

const STAFF: Staff[] = [
  { id: 'kusano',    name: '草野 繁',   role: 'システム管理者',         isMe: true,  color: '#3C2562' },
  { id: 'tanaka',    name: '田中 美咲', role: 'プランナー',             isMe: false, color: '#BE185D' },
  { id: 'suzuki',    name: '鈴木 健太', role: 'コーディネーター',       isMe: false, color: '#1D4ED8' },
  { id: 'yamamoto',  name: '山本 愛',   role: 'ドレス担当',             isMe: false, color: '#15803D' },
  { id: 'sato',      name: '佐藤 拓也', role: 'フォト担当',             isMe: false, color: '#B45309' },
  { id: 'nakamura',  name: '中村 恵',   role: '装花担当',               isMe: false, color: '#7C3AED' },
  { id: 'ito',       name: '伊藤 沙織', role: 'ウェディングプランナー', isMe: false, color: '#0891B2' },
  { id: 'kobayashi', name: '小林 陽介', role: 'バンケット担当',         isMe: false, color: '#DC2626' },
  { id: 'watanabe',  name: '渡辺 麻衣', role: 'ヘアメイク担当',        isMe: false, color: '#D97706' },
  { id: 'kato',      name: '加藤 大輝', role: '映像担当',               isMe: false, color: '#059669' },
  { id: 'hayashi',   name: '林 奈々',   role: 'MC担当',                 isMe: false, color: '#9333EA' },
  { id: 'shimizu',   name: '清水 俊介', role: 'キッチン担当',           isMe: false, color: '#EA580C' },
];

// ─── Mock event data ──────────────────────────────────────────────────────────

const KUSANO_EVENTS: SchedEvent[] = [
  { id:'k01', staffId:'kusano', date:'2026-03-02', startHour:9,  startMin:0,  endHour:9,  endMin:30,  type:'meeting', title:'朝礼' },
  { id:'k02', staffId:'kusano', date:'2026-03-02', startHour:10, startMin:0,  endHour:11, endMin:30,  type:'visit',   title:'来館対応 田中様' },
  { id:'k03', staffId:'kusano', date:'2026-03-02', startHour:14, startMin:0,  endHour:15, endMin:0,   type:'meeting', title:'週次定例' },
  { id:'k04', staffId:'kusano', date:'2026-03-03', startHour:9,  startMin:0,  endHour:9,  endMin:30,  type:'meeting', title:'朝礼' },
  { id:'k05', staffId:'kusano', date:'2026-03-03', startHour:11, startMin:0,  endHour:12, endMin:30,  type:'visit',   title:'来館対応 山田様' },
  { id:'k06', staffId:'kusano', date:'2026-03-03', startHour:15, startMin:0,  endHour:16, endMin:0,   type:'meeting', title:'プラン打合せ' },
  { id:'k07', staffId:'kusano', date:'2026-03-04', startHour:9,  startMin:0,  endHour:9,  endMin:30,  type:'meeting', title:'朝礼' },
  { id:'k08', staffId:'kusano', date:'2026-03-04', startHour:10, startMin:0,  endHour:11, endMin:0,   type:'visit',   title:'来館対応 佐藤様' },
  { id:'k09', staffId:'kusano', date:'2026-03-04', startHour:14, startMin:0,  endHour:16, endMin:0,   type:'event',   title:'試食会' },
  { id:'k10', staffId:'kusano', date:'2026-03-05', startHour:9,  startMin:0,  endHour:9,  endMin:30,  type:'meeting', title:'朝礼' },
  { id:'k11', staffId:'kusano', date:'2026-03-05', startHour:9,  startMin:30, endHour:11, endMin:0,   type:'visit',   title:'来館対応 鈴木様' },
  { id:'k12', staffId:'kusano', date:'2026-03-05', startHour:15, startMin:0,  endHour:16, endMin:0,   type:'meeting', title:'会場確認' },
  { id:'k13', staffId:'kusano', date:'2026-03-06', startHour:9,  startMin:0,  endHour:9,  endMin:30,  type:'meeting', title:'朝礼' },
  { id:'k14', staffId:'kusano', date:'2026-03-06', startHour:10, startMin:0,  endHour:11, endMin:30,  type:'visit',   title:'来館対応 高橋様' },
  { id:'k15', staffId:'kusano', date:'2026-03-06', startHour:14, startMin:0,  endHour:15, endMin:0,   type:'meeting', title:'会場確認' },
  { id:'k16', staffId:'kusano', date:'2026-03-06', startHour:16, startMin:0,  endHour:18, endMin:0,   type:'event',   title:'試食会サポート' },
  { id:'k17', staffId:'kusano', date:'2026-03-07', startHour:10, startMin:0,  endHour:12, endMin:0,   type:'event',   title:'ワークショップ' },
  { id:'k18', staffId:'kusano', date:'2026-03-07', startHour:14, startMin:0,  endHour:15, endMin:30,  type:'visit',   title:'来館対応 伊藤様' },
  { id:'k19', staffId:'kusano', date:'2026-03-09', startHour:9,  startMin:0,  endHour:9,  endMin:30,  type:'meeting', title:'朝礼' },
  { id:'k20', staffId:'kusano', date:'2026-03-09', startHour:10, startMin:0,  endHour:12, endMin:0,   type:'training',title:'システム研修' },
  { id:'k21', staffId:'kusano', date:'2026-03-10', startHour:9,  startMin:0,  endHour:9,  endMin:30,  type:'meeting', title:'朝礼' },
  { id:'k22', staffId:'kusano', date:'2026-03-10', startHour:11, startMin:0,  endHour:12, endMin:30,  type:'visit',   title:'来館対応 木村様' },
  { id:'k23', staffId:'kusano', date:'2026-03-11', startHour:9,  startMin:0,  endHour:9,  endMin:30,  type:'meeting', title:'朝礼' },
  { id:'k24', staffId:'kusano', date:'2026-03-11', startHour:14, startMin:0,  endHour:16, endMin:0,   type:'event',   title:'アニバーサリー' },
  { id:'k25', staffId:'kusano', date:'2026-03-12', startHour:9,  startMin:0,  endHour:11, endMin:0,   type:'visit',   title:'来館対応 松本様' },
  { id:'k26', staffId:'kusano', date:'2026-03-12', startHour:15, startMin:0,  endHour:16, endMin:0,   type:'meeting', title:'会場確認' },
  { id:'k27', staffId:'kusano', date:'2026-03-13', startHour:9,  startMin:0,  endHour:9,  endMin:30,  type:'meeting', title:'朝礼' },
  { id:'k28', staffId:'kusano', date:'2026-03-13', startHour:14, startMin:0,  endHour:15, endMin:30,  type:'meeting', title:'月次報告' },
  { id:'k29', staffId:'kusano', date:'2026-03-16', startHour:9,  startMin:0,  endHour:9,  endMin:30,  type:'meeting', title:'朝礼' },
  { id:'k30', staffId:'kusano', date:'2026-03-16', startHour:10, startMin:0,  endHour:11, endMin:30,  type:'visit',   title:'来館対応 渡辺様' },
  { id:'k31', staffId:'kusano', date:'2026-03-17', startHour:9,  startMin:0,  endHour:9,  endMin:30,  type:'meeting', title:'朝礼' },
  { id:'k32', staffId:'kusano', date:'2026-03-17', startHour:11, startMin:0,  endHour:13, endMin:0,   type:'event',   title:'アイテムフェア' },
  { id:'k33', staffId:'kusano', date:'2026-03-18', startHour:10, startMin:0,  endHour:11, endMin:0,   type:'visit',   title:'来館対応 中島様' },
  { id:'k34', staffId:'kusano', date:'2026-03-18', startHour:14, startMin:0,  endHour:16, endMin:0,   type:'event',   title:'試食会' },
  { id:'k35', staffId:'kusano', date:'2026-03-19', startHour:9,  startMin:0,  endHour:9,  endMin:30,  type:'meeting', title:'朝礼' },
  { id:'k36', staffId:'kusano', date:'2026-03-19', startHour:11, startMin:0,  endHour:12, endMin:30,  type:'visit',   title:'来館対応 小林様' },
  { id:'k37', staffId:'kusano', date:'2026-03-20', startHour:10, startMin:0,  endHour:12, endMin:0,   type:'event',   title:'ワークショップ' },
  { id:'k38', staffId:'kusano', date:'2026-03-23', startHour:9,  startMin:0,  endHour:9,  endMin:30,  type:'meeting', title:'朝礼' },
  { id:'k39', staffId:'kusano', date:'2026-03-23', startHour:11, startMin:0,  endHour:12, endMin:30,  type:'visit',   title:'来館対応 加藤様' },
  { id:'k40', staffId:'kusano', date:'2026-03-24', startHour:14, startMin:0,  endHour:15, endMin:30,  type:'meeting', title:'プラン打合せ' },
  { id:'k41', staffId:'kusano', date:'2026-03-25', startHour:9,  startMin:0,  endHour:11, endMin:0,   type:'visit',   title:'来館対応 吉田様' },
  { id:'k42', staffId:'kusano', date:'2026-03-26', startHour:9,  startMin:0,  endHour:9,  endMin:30,  type:'meeting', title:'朝礼' },
  { id:'k43', staffId:'kusano', date:'2026-03-26', startHour:14, startMin:0,  endHour:16, endMin:0,   type:'event',   title:'試食会' },
  { id:'k44', staffId:'kusano', date:'2026-03-27', startHour:10, startMin:0,  endHour:11, endMin:30,  type:'visit',   title:'来館対応 橋本様' },
  { id:'k45', staffId:'kusano', date:'2026-03-27', startHour:15, startMin:0,  endHour:16, endMin:0,   type:'meeting', title:'会場確認' },
  { id:'k46', staffId:'kusano', date:'2026-03-30', startHour:9,  startMin:0,  endHour:9,  endMin:30,  type:'meeting', title:'朝礼' },
  { id:'k47', staffId:'kusano', date:'2026-03-30', startHour:11, startMin:0,  endHour:12, endMin:0,   type:'visit',   title:'来館対応 清水様' },
  { id:'k48', staffId:'kusano', date:'2026-03-31', startHour:14, startMin:0,  endHour:15, endMin:30,  type:'meeting', title:'月次締め' },
];

const pr = (seed: number) => { const x = Math.sin(seed * 9301 + 49297) * 233280; return x - Math.floor(x); };

const generateStaffEvents = (): SchedEvent[] => {
  const events: SchedEvent[] = [...KUSANO_EVENTS];
  const types: EventType[]   = ['visit', 'meeting', 'event', 'training', 'personal', 'photo'];
  const titles: Record<EventType, string[]> = {
    visit:    ['来館対応 田中様','来館対応 山田様','来館対応 佐藤様','来館対応 高橋様','来館対応 木村様','来館対応 伊藤様'],
    meeting:  ['週次定例','会場確認','朝礼','プラン打合せ','チーム会議','月次報告'],
    event:    ['試食会','ワークショップ','アニバーサリー','アイテムフェア'],
    training: ['システム研修','接客研修','OJT','コンプライアンス研修'],
    personal: ['外出','在宅勤務','振替休日'],
    photo:    ['フォト撮影','アルバム確認','データ納品'],
  };
  let id = 1000;
  const otherStaff = STAFF.filter(s => !s.isMe);
  otherStaff.forEach((staff, si) => {
    for (let day = 1; day <= 31; day++) {
      const d = new Date(2026, 2, day);
      if (d.getMonth() !== 2) break;
      const dow = d.getDay();
      if (dow === 0) continue;
      const seed    = (si + 1) * 1000 + day * 17;
      const num     = Math.floor(pr(seed) * 3) + 1;
      const usedH   = new Set<number>();
      for (let e = 0; e < num; e++) {
        const es       = seed + e * 37;
        const type     = types[Math.floor(pr(es) * types.length)];
        let sh         = 9 + Math.floor(pr(es + 1) * 8);
        if (usedH.has(sh)) sh = Math.min(sh + 2, 17);
        usedH.add(sh);
        const sm       = pr(es + 2) > 0.6 ? 30 : 0;
        const dur      = 1 + Math.floor(pr(es + 3) * 2);
        const eh       = Math.min(sh + dur, 22);
        const titleArr = titles[type];
        events.push({
          id: `ev_${id++}`, staffId: staff.id,
          date: `2026-03-${String(day).padStart(2,'0')}`,
          startHour: sh, startMin: sm, endHour: eh, endMin: 0,
          type, title: titleArr[Math.floor(pr(es + 4) * titleArr.length)],
        });
      }
    }
  });
  return events;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const dStr = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

const getWeekDays = (date: Date): Date[] => {
  const d = new Date(date);
  const dow = d.getDay();
  d.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1));
  return Array.from({ length: 7 }, (_, i) => { const x = new Date(d); x.setDate(d.getDate() + i); return x; });
};

const getMonthDays = (y: number, m: number): Date[] => {
  const n = new Date(y, m + 1, 0).getDate();
  return Array.from({ length: n }, (_, i) => new Date(y, m, i + 1));
};

const fmtHM = (h: number, m: number) => `${h}:${String(m).padStart(2,'0')}`;
const isToday = (d: Date) => dStr(d) === TODAY_STR;

// ─── Shared UI ────────────────────────────────────────────────────────────────

function StaffLabel({ staff, compact = false }: { staff: Staff; compact?: boolean }) {
  return (
    <div className="flex items-center" style={{ gap: compact ? 6 : 8 }}>
      <div style={{
        width: compact ? 20 : 26, height: compact ? 20 : 26, borderRadius: '50%',
        background: staff.isMe ? '#030213' : staff.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontSize: compact ? 8 : 9, fontWeight: 700, flexShrink: 0,
        ...(staff.isMe ? { boxShadow: '0 0 0 2px #EDAE1C, 0 0 0 3px white' } : {}),
      }}>
        {staff.name.charAt(0)}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: compact ? 10 : 11, fontWeight: staff.isMe ? 700 : 500, color: staff.isMe ? '#030213' : '#374151', whiteSpace: 'nowrap' }}>
          {staff.name}
        </div>
        {!compact && <div style={{ fontSize: 9, color: '#9CA3AF', whiteSpace: 'nowrap' }}>{staff.role}</div>}
      </div>
      {staff.isMe && <span style={{ fontSize: 8, background: '#030213', color: 'white', padding: '1px 5px', borderRadius: 10, flexShrink: 0, fontWeight: 600 }}>私</span>}
    </div>
  );
}

function EventChip({ ev, showStaff = false, compact = false, showTime = false }: { ev: SchedEvent; showStaff?: boolean; compact?: boolean; showTime?: boolean }) {
  const cfg   = EVENT_CFG[ev.type];
  const staff = showStaff ? STAFF.find(s => s.id === ev.staffId) : undefined;
  const timeStr = `${ev.startHour}:${String(ev.startMin).padStart(2,'0')}`;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 3,
      background: cfg.bg, borderLeft: `2.5px solid ${cfg.color}`,
      borderRadius: 3, padding: compact ? '1px 4px' : '2px 5px',
      marginBottom: 2, overflow: 'hidden',
    }}>
      {staff && (
        <div style={{ width: 13, height: 13, borderRadius: '50%', background: staff.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 7, color: 'white', fontWeight: 700 }}>{staff.name.charAt(0)}</span>
        </div>
      )}
      {showTime && (
        <span style={{ fontSize: 9, color: cfg.color, fontWeight: 600, flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
          {timeStr}
        </span>
      )}
      <span style={{ fontSize: compact ? 9 : 10, color: cfg.text, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 100 }}>
        {ev.title}
      </span>
    </div>
  );
}

const STICKY_BG_PLAIN  = '#fff';
const STICKY_BG_ME     = '#F5F0FF';
const STICKY_BG_CORNER = '#FAFAFA';

// ─── Drag helper: DOM-direct approach (no React state during drag) ─────────────

/**
 * Horizontal drag for Day.1 (left/right along time axis).
 * Manipulates element.style.left directly → no re-render mid-drag.
 * Commits final position via onMoveEvent on mouseup.
 */
function startHorizontalDrag(
  e: React.MouseEvent,
  ev: SchedEvent,
  slotPx: number,   // px per 10-min slot
  hourW: number,    // px per hour
  onMoveEvent: MoveEventFn,
) {
  e.preventDefault();
  e.stopPropagation();

  const el = e.currentTarget as HTMLElement;
  const startX       = e.clientX;
  const origStartMin = ev.startHour * 60 + ev.startMin;
  const origDurMin   = (ev.endHour * 60 + ev.endMin) - origStartMin;
  const cfg          = EVENT_CFG[ev.type];

  // Visual: drag start
  el.style.zIndex    = '50';
  el.style.opacity   = '0.88';
  el.style.transform = 'scale(1.02)';
  el.style.boxShadow = `0 8px 24px ${cfg.color}40`;
  el.style.cursor    = 'grabbing';
  el.style.transition = 'none'; // disable transition during drag
  document.body.style.cursor = 'grabbing';
  document.body.style.userSelect = 'none';

  let deltaSlots = 0;

  const onMove = (me: MouseEvent) => {
    const dx    = me.clientX - startX;
    deltaSlots  = Math.round(dx / slotPx);

    // Clamp: origStartMin + delta must stay within HOUR_S..HOUR_E - duration
    const baseSMinOffset = origStartMin - HOUR_S * 60; // offset from timeline start
    const newSMinOffset  = Math.max(0, Math.min(
      TOTAL_SLOTS * SLOT_MINUTES - origDurMin,
      baseSMinOffset + deltaSlots * SLOT_MINUTES,
    ));
    // left = (minutes_offset / 60) * hourW + 2  (the +2 matches React render)
    el.style.left = `${(newSMinOffset / 60) * hourW + 2}px`;
  };

  const onUp = () => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup',   onUp);

    // Reset visual overrides (React re-render will take over)
    el.style.zIndex    = '';
    el.style.opacity   = '';
    el.style.transform = '';
    el.style.boxShadow = '';
    el.style.cursor    = '';
    el.style.transition = '';
    document.body.style.cursor    = '';
    document.body.style.userSelect = '';

    // Commit: calculate new absolute time
    const baseSMinOffset = origStartMin - HOUR_S * 60;
    const newSMinOffset  = Math.max(0, Math.min(
      TOTAL_SLOTS * SLOT_MINUTES - origDurMin,
      baseSMinOffset + deltaSlots * SLOT_MINUTES,
    ));
    const ns = HOUR_S * 60 + newSMinOffset;
    const ne = ns + origDurMin;
    onMoveEvent(ev.id, {
      startHour: Math.floor(ns / 60), startMin: ns % 60,
      endHour:   Math.floor(ne / 60), endMin:   ne % 60,
    });
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup',   onUp);
}

/**
 * Vertical drag for Day.2 (up/down along time axis).
 */
function startVerticalDrag(
  e: React.MouseEvent,
  ev: SchedEvent,
  slotPy: number,  // px per 10-min slot (= HOUR_H / SLOTS_PER_HOUR)
  hourH: number,   // px per hour
  onMoveEvent: MoveEventFn,
) {
  e.preventDefault();
  e.stopPropagation();

  const el = e.currentTarget as HTMLElement;
  const startY       = e.clientY;
  const origStartMin = ev.startHour * 60 + ev.startMin;
  const origDurMin   = (ev.endHour * 60 + ev.endMin) - origStartMin;
  const cfg          = EVENT_CFG[ev.type];

  el.style.zIndex    = '50';
  el.style.opacity   = '0.88';
  el.style.transform = 'scale(1.02)';
  el.style.boxShadow = `0 8px 24px ${cfg.color}40`;
  el.style.cursor    = 'grabbing';
  el.style.transition = 'none';
  document.body.style.cursor    = 'grabbing';
  document.body.style.userSelect = 'none';

  let deltaSlots = 0;

  const onMove = (me: MouseEvent) => {
    const dy   = me.clientY - startY;
    deltaSlots = Math.round(dy / slotPy);

    const baseSMinOffset = origStartMin - HOUR_S * 60;
    const newSMinOffset  = Math.max(0, Math.min(
      TOTAL_SLOTS * SLOT_MINUTES - origDurMin,
      baseSMinOffset + deltaSlots * SLOT_MINUTES,
    ));
    // top = (minutes_offset / 60) * hourH + 1  (the +1 matches React render)
    el.style.top = `${(newSMinOffset / 60) * hourH + 1}px`;
  };

  const onUp = () => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup',   onUp);

    el.style.zIndex    = '';
    el.style.opacity   = '';
    el.style.transform = '';
    el.style.boxShadow = '';
    el.style.cursor    = '';
    el.style.transition = '';
    document.body.style.cursor    = '';
    document.body.style.userSelect = '';

    const baseSMinOffset = origStartMin - HOUR_S * 60;
    const newSMinOffset  = Math.max(0, Math.min(
      TOTAL_SLOTS * SLOT_MINUTES - origDurMin,
      baseSMinOffset + deltaSlots * SLOT_MINUTES,
    ));
    const ns = HOUR_S * 60 + newSMinOffset;
    const ne = ns + origDurMin;
    onMoveEvent(ev.id, {
      startHour: Math.floor(ns / 60), startMin: ns % 60,
      endHour:   Math.floor(ne / 60), endMin:   ne % 60,
    });
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup',   onUp);
}

// ─── View 1: Day.1 (横軸 時間 × 縦軸 人) ────────────────────────────────────

function DayView({ date, events, onMoveEvent }: { date: Date; events: SchedEvent[]; onMoveEvent: MoveEventFn }) {
  const ROW_H   = 80;
  const LABEL_W = 180;

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let rafId = 0;
    const ro = new ResizeObserver(entries => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const w = entries[entries.length - 1]?.contentRect.width ?? 0;
        if (w > 0) setContainerWidth(w);
      });
    });
    ro.observe(el);
    return () => { ro.disconnect(); cancelAnimationFrame(rafId); };
  }, []);

  const SLOT_WIDTH = useMemo(() => {
    if (containerWidth <= 0) return MIN_SLOT_WIDTH;
    const available = containerWidth - LABEL_W;
    return Math.max(available / TOTAL_SLOTS, MIN_SLOT_WIDTH);
  }, [containerWidth]);

  const HOUR_W  = SLOT_WIDTH * SLOTS_PER_HOUR;
  const TRACK_W = SLOT_WIDTH * TOTAL_SLOTS;
  const ds      = dStr(date);
  const dayEvts = useMemo(() => events.filter(e => e.date === ds), [events, ds]);

  return (
    <div ref={containerRef} className="flex-1 min-h-0 flex flex-col">
      <div className="flex-1 min-h-0 overflow-auto rounded-xl border border-neutral-200 bg-white">
        <table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: LABEL_W + TRACK_W }}>
          <colgroup>
            <col style={{ width: LABEL_W }} />
            <col style={{ width: TRACK_W }} />
          </colgroup>
          <thead>
            <tr>
              <th style={{ position: 'sticky', top: 0, left: 0, zIndex: 30, background: STICKY_BG_CORNER, borderBottom: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB', padding: '8px 12px' }}>
                <span style={{ fontSize: 10, color: '#9CA3AF', letterSpacing: '0.12em' }}>STAFF / TIME</span>
              </th>
              <th style={{ position: 'sticky', top: 0, zIndex: 20, background: STICKY_BG_CORNER, borderBottom: '1px solid #E5E7EB', padding: 0 }}>
                <div style={{ position: 'relative', height: 38, width: TRACK_W }}>
                  {HOURS.map((h, i) => (
                    <div key={h} style={{ position: 'absolute', left: i * HOUR_W, width: HOUR_W, top: 0, height: '100%', display: 'flex', alignItems: 'center', paddingLeft: 6, borderLeft: i > 0 ? '1px solid #F3F4F6' : 'none' }}>
                      <span style={{ fontSize: 10, color: '#9CA3AF', fontVariantNumeric: 'tabular-nums' }}>{h}:00</span>
                    </div>
                  ))}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {STAFF.map(staff => {
              const sEvts = dayEvts.filter(e => e.staffId === staff.id).sort((a, b) => a.startHour * 60 + a.startMin - b.startHour * 60 - b.startMin);
              return (
                <tr key={staff.id}>
                  <td style={{ position: 'sticky', left: 0, zIndex: 10, background: staff.isMe ? STICKY_BG_ME : STICKY_BG_PLAIN, borderBottom: '1px solid #F3F4F6', borderRight: '1px solid #E5E7EB', padding: '0 12px', verticalAlign: 'middle', height: ROW_H }}>
                    <StaffLabel staff={staff} />
                  </td>
                  <td style={{ height: ROW_H, padding: 0, background: staff.isMe ? 'rgba(60,37,98,0.015)' : '#fff', borderBottom: '1px solid #F3F4F6', verticalAlign: 'top' }}>
                    <div style={{ position: 'relative', width: TRACK_W, height: ROW_H }}>
                      {/* Grid lines */}
                      {Array.from({ length: HOURS.length * 6 }, (_, si) => {
                        const x      = (si + 1) * (HOUR_W / 6);
                        const min    = ((si + 1) * 10) % 60;
                        const isHour = min === 0;
                        const isHalf = min === 30;
                        return (
                          <div key={`sl${si}`} style={{
                            position: 'absolute', left: x, top: 0, bottom: 0, pointerEvents: 'none',
                            borderLeft: isHour ? '1px solid #E5E7EB' : isHalf ? '1px dashed rgba(0,0,0,0.10)' : '1px dashed rgba(0,0,0,0.04)',
                          }} />
                        );
                      })}
                      {/* Events – draggable horizontally */}
                      {sEvts.map((ev, ei) => {
                        const cfg   = EVENT_CFG[ev.type];
                        const sMin  = (ev.startHour - HOUR_S) * 60 + ev.startMin;
                        const eMin  = (ev.endHour   - HOUR_S) * 60 + ev.endMin;
                        const dur   = Math.max(eMin - sMin, 30);
                        const left  = (sMin / 60) * HOUR_W;
                        const w     = Math.max((dur / 60) * HOUR_W - 4, 36);
                        const top   = 8 + (ei > 0 && sEvts[ei-1].endHour > ev.startHour ? 34 : 0);
                        const h     = ROW_H - top - 8;
                        return (
                          <div
                            key={ev.id}
                            onMouseDown={(e) => startHorizontalDrag(e, ev, SLOT_WIDTH, HOUR_W, onMoveEvent)}
                            style={{
                              position: 'absolute',
                              left: left + 2,
                              top,
                              width: w,
                              height: Math.max(h, 28),
                              background: cfg.bg,
                              border: `1px solid ${cfg.color}25`,
                              borderLeft: `3px solid ${cfg.color}`,
                              borderRadius: 4,
                              padding: '3px 6px',
                              overflow: 'hidden',
                              cursor: 'grab',
                              userSelect: 'none',
                              transition: 'box-shadow 0.15s',
                            }}
                          >
                            <div style={{ fontSize: 10, fontWeight: 600, color: cfg.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</div>
                            <div style={{ fontSize: 8, color: cfg.color + 'bb' }}>{fmtHM(ev.startHour, ev.startMin)}–{fmtHM(ev.endHour, ev.endMin)}</div>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── View 2: Day.2 (縦軸 時間 × 横軸 人) ────────────────────────────────────

function Day2View({ date, events, onMoveEvent }: { date: Date; events: SchedEvent[]; onMoveEvent: MoveEventFn }) {
  const HOUR_H  = 64;
  const STAFF_W = 180;
  const TIME_W  = 56;
  const TOTAL_H = HOURS.length * HOUR_H;
  const SLOT_PY = HOUR_H / SLOTS_PER_HOUR; // px per 10-min slot (vertical)
  const ds      = dStr(date);
  const dayEvts = useMemo(() => events.filter(e => e.date === ds), [events, ds]);

  const getSlots = (evts: SchedEvent[]) => {
    const sorted = [...evts].sort((a, b) => a.startHour * 60 + a.startMin - b.startHour * 60 - b.startMin);
    const slots: { ev: SchedEvent; col: number; totalCols: number }[] = [];
    const colEnds: number[] = [];

    sorted.forEach(ev => {
      const sMin = ev.startHour * 60 + ev.startMin;
      const eMin = ev.endHour   * 60 + ev.endMin;
      let assigned = -1;
      for (let c = 0; c < colEnds.length; c++) {
        if (colEnds[c] <= sMin) { assigned = c; colEnds[c] = eMin; break; }
      }
      if (assigned === -1) { assigned = colEnds.length; colEnds.push(eMin); }
      slots.push({ ev, col: assigned, totalCols: 0 });
    });

    slots.forEach((s, i) => {
      const sMin = s.ev.startHour * 60 + s.ev.startMin;
      const eMin = s.ev.endHour   * 60 + s.ev.endMin;
      const maxCol = slots
        .filter(o => {
          const oS = o.ev.startHour * 60 + o.ev.startMin;
          const oE = o.ev.endHour   * 60 + o.ev.endMin;
          return oS < eMin && oE > sMin;
        })
        .reduce((m, o) => Math.max(m, o.col), 0);
      slots[i].totalCols = maxCol + 1;
    });
    return slots;
  };

  return (
    <div className="flex-1 min-h-0 overflow-auto rounded-xl border border-neutral-200 bg-white">
      {/* Sticky header */}
      <div style={{ display: 'flex', position: 'sticky', top: 0, zIndex: 20, background: '#FAFAFA', borderBottom: '2px solid #E5E7EB' }}>
        <div style={{ width: TIME_W, flexShrink: 0, borderRight: '1px solid #E5E7EB', padding: '10px 6px', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: '#9CA3AF', letterSpacing: '0.1em' }}>TIME</span>
        </div>
        {STAFF.map(staff => (
          <div key={staff.id} style={{
            width: STAFF_W, flexShrink: 0,
            borderRight: '1px solid #F0F0F0',
            padding: '8px 10px',
            background: staff.isMe ? '#F0EBF8' : '#FAFAFA',
            display: 'flex', alignItems: 'center',
          }}>
            <StaffLabel staff={staff} compact />
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ display: 'flex', position: 'relative' }}>
        {/* Time label column (sticky left) */}
        <div style={{ width: TIME_W, flexShrink: 0, position: 'sticky', left: 0, zIndex: 10, background: '#FAFAFA', borderRight: '1px solid #E5E7EB' }}>
          {HOURS.map(h => (
            <div key={h} style={{ height: HOUR_H, borderBottom: '1px solid #F3F4F6', padding: '4px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <span style={{ fontSize: 10, color: '#9CA3AF', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{h}:00</span>
            </div>
          ))}
        </div>

        {/* Staff columns */}
        {STAFF.map(staff => {
          const sEvts = dayEvts.filter(e => e.staffId === staff.id);
          const slots = getSlots(sEvts);
          return (
            <div key={staff.id} style={{
              width: STAFF_W, flexShrink: 0,
              position: 'relative',
              height: TOTAL_H,
              borderRight: '1px solid #F0F0F0',
              background: staff.isMe ? 'rgba(60,37,98,0.015)' : '#fff',
            }}>
              {/* Grid lines */}
              {Array.from({ length: HOURS.length * 6 }, (_, si) => {
                const y      = (si + 1) * (HOUR_H / 6);
                const min    = ((si + 1) * 10) % 60;
                const isHour = min === 0;
                const isHalf = min === 30;
                return (
                  <div key={`sl${si}`} style={{
                    position: 'absolute', left: 0, right: 0, top: y, pointerEvents: 'none',
                    borderTop: isHour ? '1px solid #E5E7EB' : isHalf ? '1px dashed rgba(0,0,0,0.10)' : '1px dashed rgba(0,0,0,0.04)',
                  }} />
                );
              })}

              {/* Events – draggable vertically */}
              {slots.map(({ ev, col, totalCols }) => {
                const cfg    = EVENT_CFG[ev.type];
                const sMin   = (ev.startHour - HOUR_S) * 60 + ev.startMin;
                const eMin   = (ev.endHour   - HOUR_S) * 60 + ev.endMin;
                const dur    = Math.max(eMin - sMin, 20);
                const top    = (sMin / 60) * HOUR_H + 1;
                const height = Math.max((dur / 60) * HOUR_H - 3, 40);
                const gap    = 3;
                const usable = STAFF_W - gap * 2;
                const colW   = usable / totalCols;
                const left   = gap + col * colW;
                const width  = colW - gap;

                return (
                  <div
                    key={ev.id}
                    onMouseDown={(e) => startVerticalDrag(e, ev, SLOT_PY, HOUR_H, onMoveEvent)}
                    style={{
                      position: 'absolute', top, left, width, height,
                      background: cfg.bg,
                      border: `1px solid ${cfg.color}28`,
                      borderTop: `3px solid ${cfg.color}`,
                      borderRadius: 5,
                      padding: '3px 5px',
                      overflow: 'hidden',
                      cursor: 'grab',
                      userSelect: 'none',
                      zIndex: 1,
                      boxShadow: staff.isMe ? `0 1px 6px ${cfg.color}20` : 'none',
                      transition: 'box-shadow 0.15s',
                    }}
                  >
                    <div style={{ fontSize: 10, fontWeight: staff.isMe ? 700 : 500, color: cfg.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {ev.title}
                    </div>
                    <div style={{ fontSize: 8, color: cfg.color + 'bb', marginTop: 1, whiteSpace: 'nowrap' }}>
                      {fmtHM(ev.startHour, ev.startMin)}–{fmtHM(ev.endHour, ev.endMin)}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── View 3: Week① (day × staff) ─────────────────────────────────────────────

function Week1View({ date, events }: { date: Date; events: SchedEvent[] }) {
  const days    = getWeekDays(date);
  const LABEL_W = 180;
  const DAY_W   = 138;
  const ROW_H   = 100;

  return (
    <div className="flex-1 min-h-0 overflow-auto rounded-xl border border-neutral-200 bg-white">
      <table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: LABEL_W + days.length * DAY_W }}>
        <colgroup>
          <col style={{ width: LABEL_W }} />
          {days.map((_, i) => <col key={i} style={{ width: DAY_W }} />)}
        </colgroup>
        <thead>
          <tr>
            <th style={{ position: 'sticky', top: 0, left: 0, zIndex: 30, background: STICKY_BG_CORNER, borderBottom: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB', padding: '8px 12px' }}>
              <span style={{ fontSize: 10, color: '#9CA3AF', letterSpacing: '0.12em' }}>STAFF / DATE</span>
            </th>
            {days.map(d => {
              const td = isToday(d); const dow = d.getDay();
              const isSun = dow === 0; const isSat = dow === 6;
              return (
                <th key={d.toISOString()} style={{ position: 'sticky', top: 0, zIndex: 20, background: td ? '#030213' : '#fff', borderBottom: '1px solid #E5E7EB', borderRight: '1px solid #F3F4F6', padding: '8px 6px', textAlign: 'center', verticalAlign: 'middle' }}>
                  <div style={{ fontSize: 13, fontWeight: td ? 700 : 500, color: td ? '#fff' : isSun ? '#EF4444' : isSat ? '#3B82F6' : '#1F2937' }}>{d.getDate()}</div>
                  <div style={{ fontSize: 9, color: td ? 'rgba(255,255,255,0.7)' : isSun ? '#FCA5A5' : isSat ? '#93C5FD' : '#9CA3AF' }}>{DOW_JA[dow]}</div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {STAFF.map(staff => (
            <tr key={staff.id} style={{ height: ROW_H }}>
              <td style={{ position: 'sticky', left: 0, zIndex: 10, background: staff.isMe ? STICKY_BG_ME : STICKY_BG_PLAIN, borderBottom: '1px solid #F3F4F6', borderRight: '1px solid #E5E7EB', padding: '0 12px', verticalAlign: 'middle' }}>
                <StaffLabel staff={staff} />
              </td>
              {days.map(d => {
                const ds   = dStr(d);
                const td   = isToday(d);
                const evts = events.filter(e => e.staffId === staff.id && e.date === ds).sort((a,b) => a.startHour*60+a.startMin - b.startHour*60-b.startMin);
                const show = evts.slice(0, 3);
                const more = evts.length - show.length;
                return (
                  <td key={ds} style={{ borderBottom: '1px solid #F3F4F6', borderRight: '1px solid #F3F4F6', padding: '6px 5px', verticalAlign: 'top', background: td ? (staff.isMe ? 'rgba(60,37,98,0.04)' : 'rgba(3,2,19,0.015)') : staff.isMe ? 'rgba(60,37,98,0.01)' : '#fff' }}>
                    {show.map(ev => <EventChip key={ev.id} ev={ev} showTime />)}
                    {more > 0 && <span style={{ fontSize: 9, color: '#9CA3AF' }}>+{more}件</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── View 4: Week② (day × time) ──────────────────────────────────────────────

function Week2View({ date, events }: { date: Date; events: SchedEvent[] }) {
  const days    = getWeekDays(date);
  const LABEL_W = 60;
  const DAY_W   = 148;
  const HOUR_H  = 64;

  return (
    <div className="flex-1 min-h-0 overflow-auto rounded-xl border border-neutral-200 bg-white">
      <table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: LABEL_W + days.length * DAY_W }}>
        <colgroup>
          <col style={{ width: LABEL_W }} />
          {days.map((_, i) => <col key={i} style={{ width: DAY_W }} />)}
        </colgroup>
        <thead>
          <tr>
            <th style={{ position: 'sticky', top: 0, left: 0, zIndex: 30, background: STICKY_BG_CORNER, borderBottom: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB', padding: '8px 6px' }}>
              <span style={{ fontSize: 9, color: '#9CA3AF' }}>TIME</span>
            </th>
            {days.map(d => {
              const td = isToday(d); const dow = d.getDay();
              const isSun = dow === 0; const isSat = dow === 6;
              return (
                <th key={d.toISOString()} style={{ position: 'sticky', top: 0, zIndex: 20, background: td ? '#030213' : '#fff', borderBottom: '1px solid #E5E7EB', borderRight: '1px solid #F3F4F6', padding: '8px 6px', textAlign: 'center', verticalAlign: 'middle' }}>
                  <div style={{ fontSize: 13, fontWeight: td ? 700 : 500, color: td ? '#fff' : isSun ? '#EF4444' : isSat ? '#3B82F6' : '#1F2937' }}>{d.getDate()}</div>
                  <div style={{ fontSize: 9, color: td ? 'rgba(255,255,255,0.7)' : isSun ? '#FCA5A5' : isSat ? '#93C5FD' : '#9CA3AF' }}>{DOW_JA[dow]}</div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {HOURS.map(h => (
            <tr key={h} style={{ height: HOUR_H }}>
              <td style={{ position: 'sticky', left: 0, zIndex: 10, background: STICKY_BG_CORNER, borderBottom: '1px solid #F3F4F6', borderRight: '1px solid #E5E7EB', padding: '4px 6px', verticalAlign: 'top' }}>
                <span style={{ fontSize: 10, color: '#9CA3AF', fontVariantNumeric: 'tabular-nums' }}>{h}:00</span>
              </td>
              {days.map(d => {
                const ds   = dStr(d);
                const td   = isToday(d);
                const evts = events.filter(e => e.date === ds && e.startHour === h).sort((a,b) => STAFF.findIndex(s=>s.id===a.staffId) - STAFF.findIndex(s=>s.id===b.staffId));
                return (
                  <td key={ds} style={{ borderBottom: '1px solid #F3F4F6', borderRight: '1px solid #F3F4F6', padding: '4px 5px', verticalAlign: 'top', background: td ? 'rgba(3,2,19,0.02)' : '#fff', position: 'relative' }}>
                    {[1,2,3,4,5].map(j => (
                      <div key={j} style={{ position: 'absolute', left: 0, right: 0, top: j * (HOUR_H / 6), pointerEvents: 'none',
                        borderTop: j === 3 ? '1px dashed rgba(0,0,0,0.10)' : '1px dashed rgba(0,0,0,0.04)' }} />
                    ))}
                    {evts.map(ev => <EventChip key={ev.id} ev={ev} showStaff showTime compact={evts.length > 1} />)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── View 5: Month① (day × staff, compact) ───────────────────────────────────

function Month1View({ date, events }: { date: Date; events: SchedEvent[] }) {
  const days    = getMonthDays(date.getFullYear(), date.getMonth());
  const LABEL_W = 180;
  const DAY_W   = 68;
  const ROW_H   = 72;

  return (
    <div className="flex-1 min-h-0 overflow-auto rounded-xl border border-neutral-200 bg-white">
      <table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: LABEL_W + days.length * DAY_W }}>
        <colgroup>
          <col style={{ width: LABEL_W }} />
          {days.map((_, i) => <col key={i} style={{ width: DAY_W }} />)}
        </colgroup>
        <thead>
          <tr>
            <th style={{ position: 'sticky', top: 0, left: 0, zIndex: 30, background: STICKY_BG_CORNER, borderBottom: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB', padding: '8px 12px' }}>
              <span style={{ fontSize: 10, color: '#9CA3AF', letterSpacing: '0.12em' }}>STAFF</span>
            </th>
            {days.map(d => {
              const td = isToday(d); const dow = d.getDay();
              const isSun = dow === 0; const isSat = dow === 6;
              return (
                <th key={d.toISOString()} style={{ position: 'sticky', top: 0, zIndex: 20, background: td ? '#030213' : '#fff', borderBottom: '1px solid #E5E7EB', borderRight: '1px solid #F3F4F6', padding: '5px 3px', textAlign: 'center', verticalAlign: 'middle' }}>
                  <div style={{ fontSize: 12, fontWeight: td ? 700 : 500, color: td ? '#fff' : isSun ? '#EF4444' : isSat ? '#3B82F6' : '#1F2937' }}>{d.getDate()}</div>
                  <div style={{ fontSize: 8, color: td ? 'rgba(255,255,255,0.6)' : isSun ? '#FCA5A5' : isSat ? '#93C5FD' : '#9CA3AF' }}>{DOW_JA[dow]}</div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {STAFF.map(staff => (
            <tr key={staff.id} style={{ height: ROW_H }}>
              <td style={{ position: 'sticky', left: 0, zIndex: 10, background: staff.isMe ? STICKY_BG_ME : STICKY_BG_PLAIN, borderBottom: '1px solid #F3F4F6', borderRight: '1px solid #E5E7EB', padding: '0 12px', verticalAlign: 'middle' }}>
                <StaffLabel staff={staff} compact />
              </td>
              {days.map(d => {
                const ds    = dStr(d);
                const td    = isToday(d);
                const dow   = d.getDay();
                const isSun = dow === 0;
                const evts  = events.filter(e => e.staffId === staff.id && e.date === ds);
                const show  = evts.slice(0, 2);
                const more  = evts.length - show.length;
                return (
                  <td key={ds} style={{
                    borderBottom: '1px solid #F3F4F6', borderRight: '1px solid #F3F4F6',
                    padding: '4px 3px', verticalAlign: 'top', overflow: 'hidden',
                    background: td ? (staff.isMe ? 'rgba(60,37,98,0.04)' : 'rgba(3,2,19,0.02)') : isSun ? '#FFFCFC' : staff.isMe ? 'rgba(60,37,98,0.01)' : '#fff',
                  }}>
                    {show.map(ev => {
                      const cfg = EVENT_CFG[ev.type];
                      return <div key={ev.id} style={{ width: '100%', height: 10, borderRadius: 2, background: cfg.bg, borderLeft: `2px solid ${cfg.color}`, marginBottom: 2 }} title={ev.title} />;
                    })}
                    {more > 0 && <span style={{ fontSize: 8, color: '#9CA3AF' }}>+{more}</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── View 6: Month② (day × time, compact) ────────────────────────────────────

function Month2View({ date, events }: { date: Date; events: SchedEvent[] }) {
  const days    = getMonthDays(date.getFullYear(), date.getMonth());
  const LABEL_W = 60;
  const DAY_W   = 68;
  const HOUR_H  = 48;

  return (
    <div className="flex-1 min-h-0 overflow-auto rounded-xl border border-neutral-200 bg-white">
      <table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: LABEL_W + days.length * DAY_W }}>
        <colgroup>
          <col style={{ width: LABEL_W }} />
          {days.map((_, i) => <col key={i} style={{ width: DAY_W }} />)}
        </colgroup>
        <thead>
          <tr>
            <th style={{ position: 'sticky', top: 0, left: 0, zIndex: 30, background: STICKY_BG_CORNER, borderBottom: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB', padding: '8px 6px' }}>
              <span style={{ fontSize: 9, color: '#9CA3AF' }}>TIME</span>
            </th>
            {days.map(d => {
              const td = isToday(d); const dow = d.getDay();
              const isSun = dow === 0; const isSat = dow === 6;
              return (
                <th key={d.toISOString()} style={{ position: 'sticky', top: 0, zIndex: 20, background: td ? '#030213' : '#fff', borderBottom: '1px solid #E5E7EB', borderRight: '1px solid #F3F4F6', padding: '5px 3px', textAlign: 'center', verticalAlign: 'middle' }}>
                  <div style={{ fontSize: 12, fontWeight: td ? 700 : 500, color: td ? '#fff' : isSun ? '#EF4444' : isSat ? '#3B82F6' : '#1F2937' }}>{d.getDate()}</div>
                  <div style={{ fontSize: 8, color: td ? 'rgba(255,255,255,0.6)' : isSun ? '#FCA5A5' : isSat ? '#93C5FD' : '#9CA3AF' }}>{DOW_JA[dow]}</div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {HOURS.map(h => (
            <tr key={h} style={{ height: HOUR_H }}>
              <td style={{ position: 'sticky', left: 0, zIndex: 10, background: STICKY_BG_CORNER, borderBottom: '1px solid #F3F4F6', borderRight: '1px solid #E5E7EB', padding: '4px 6px', verticalAlign: 'top' }}>
                <span style={{ fontSize: 10, color: '#9CA3AF', fontVariantNumeric: 'tabular-nums' }}>{h}:00</span>
              </td>
              {days.map(d => {
                const ds    = dStr(d);
                const td    = isToday(d);
                const dow   = d.getDay();
                const isSun = dow === 0;
                const evts  = events.filter(e => e.date === ds && e.startHour === h);
                return (
                  <td key={ds} style={{
                    borderBottom: '1px solid #F3F4F6', borderRight: '1px solid #F3F4F6',
                    padding: '3px 3px', verticalAlign: 'top',
                    background: td ? 'rgba(3,2,19,0.02)' : isSun ? '#FFFCFC' : '#fff',
                    position: 'relative',
                  }}>
                    {[1,2,3,4,5].map(j => (
                      <div key={j} style={{ position: 'absolute', left: 0, right: 0, top: j * (HOUR_H / 6), pointerEvents: 'none',
                        borderTop: j === 3 ? '1px dashed rgba(0,0,0,0.10)' : '1px dashed rgba(0,0,0,0.04)' }} />
                    ))}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {evts.map(ev => {
                        const staff = STAFF.find(s => s.id === ev.staffId);
                        const cfg   = EVENT_CFG[ev.type];
                        return (
                          <div key={ev.id} title={`${staff?.name}: ${ev.title}`} style={{
                            width: 14, height: 14, borderRadius: 3, background: cfg.bg,
                            border: `1px solid ${cfg.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            {staff && <div style={{ width: 8, height: 8, borderRadius: '50%', background: staff.color }} />}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── View 7: Month③ (カレンダーグリッド) ────────────────────────────────────

function Month3View({ date, events }: { date: Date; events: SchedEvent[] }) {
  const y = date.getFullYear();
  const m = date.getMonth();

  const firstDay    = new Date(y, m, 1);
  const startDow    = firstDay.getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const daysInPrev  = new Date(y, m, 0).getDate();

  const cells: { d: Date; isCurrentMonth: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const offset = i - startDow;
    let cellDate: Date;
    if (offset < 0) {
      cellDate = new Date(y, m - 1, daysInPrev + offset + 1);
    } else if (offset >= daysInMonth) {
      cellDate = new Date(y, m + 1, offset - daysInMonth + 1);
    } else {
      cellDate = new Date(y, m, offset + 1);
    }
    cells.push({ d: cellDate, isCurrentMonth: offset >= 0 && offset < daysInMonth });
  }

  const weeks: typeof cells[] = [];
  for (let w = 0; w < 6; w++) weeks.push(cells.slice(w * 7, w * 7 + 7));
  const weeks5 = weeks[5].every(c => !c.isCurrentMonth) ? weeks.slice(0, 5) : weeks;

  const me = STAFF.find(s => s.isMe)!;

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #E5E7EB', flexShrink: 0 }}>
        {DOW_JA.map((label, i) => (
          <div key={i} style={{
            textAlign: 'center', padding: '8px 0',
            fontSize: 11, fontWeight: 600,
            color: i === 0 ? '#EF4444' : i === 6 ? '#3B82F6' : '#9CA3AF',
            borderRight: i < 6 ? '1px solid #F3F4F6' : 'none',
          }}>
            {label}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'auto' }}>
        {weeks5.map((week, wi) => (
          <div key={wi} style={{
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
            flex: 1, minHeight: 100,
            borderBottom: wi < weeks5.length - 1 ? '1px solid #E5E7EB' : 'none',
          }}>
            {week.map(({ d, isCurrentMonth }, di) => {
              const ds      = dStr(d);
              const td      = isToday(d);
              const dow     = d.getDay();
              const isSun   = dow === 0;
              const isSat   = dow === 6;
              const dayEvts = events.filter(e => e.date === ds).sort((a, b) => {
                const aMine = a.staffId === me.id ? 0 : 1;
                const bMine = b.staffId === me.id ? 0 : 1;
                if (aMine !== bMine) return aMine - bMine;
                return a.startHour * 60 + a.startMin - b.startHour * 60 - b.startMin;
              });
              const showEvts = dayEvts.slice(0, 3);
              const moreEvts = dayEvts.length - showEvts.length;
              const cellBg = !isCurrentMonth ? '#F9FAFB' : td ? 'rgba(60,37,98,0.03)' : isSun ? '#FFFCFC' : isSat ? '#F8FBFF' : '#fff';

              return (
                <div key={di} style={{
                  padding: '6px 7px', borderRight: di < 6 ? '1px solid #F3F4F6' : 'none',
                  background: cellBg, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0, overflow: 'hidden',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: td ? '#030213' : 'transparent' }}>
                      <span style={{ fontSize: 12, fontWeight: td ? 700 : isCurrentMonth ? 500 : 400, color: td ? '#fff' : !isCurrentMonth ? '#D1D5DB' : isSun ? '#EF4444' : isSat ? '#3B82F6' : '#1F2937', fontVariantNumeric: 'tabular-nums' }}>
                        {d.getDate()}
                      </span>
                    </div>
                    {dayEvts.length > 0 && (
                      <span style={{ fontSize: 8, color: '#9CA3AF', fontVariantNumeric: 'tabular-nums' }}>{dayEvts.length}件</span>
                    )}
                  </div>
                  {showEvts.map(ev => {
                    const cfg    = EVENT_CFG[ev.type];
                    const staff  = STAFF.find(s => s.id === ev.staffId);
                    const isMine = ev.staffId === me.id;
                    return (
                      <div key={ev.id} title={`${staff?.name} ${fmtHM(ev.startHour, ev.startMin)} ${ev.title}`} style={{
                        display: 'flex', alignItems: 'center', gap: 3, background: cfg.bg,
                        borderLeft: `2.5px solid ${isMine ? '#3C2562' : cfg.color}`, borderRadius: 3,
                        padding: '2px 5px', overflow: 'hidden', cursor: 'pointer',
                        outline: isMine ? '1px solid rgba(60,37,98,0.15)' : 'none',
                      }}>
                        {staff && (
                          <div style={{ width: 11, height: 11, borderRadius: '50%', background: staff.isMe ? '#030213' : staff.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...(staff.isMe ? { boxShadow: '0 0 0 1px #EDAE1C' } : {}) }}>
                            <span style={{ fontSize: 6, color: 'white', fontWeight: 700 }}>{staff.name.charAt(0)}</span>
                          </div>
                        )}
                        <span style={{ fontSize: 10, color: isMine ? '#3C2562' : cfg.text, fontWeight: isMine ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>
                          {ev.title}
                        </span>
                        <span style={{ fontSize: 8, color: '#9CA3AF', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
                          {fmtHM(ev.startHour, ev.startMin)}
                        </span>
                      </div>
                    );
                  })}
                  {moreEvts > 0 && <div style={{ fontSize: 9, color: '#9CA3AF', paddingLeft: 4 }}>+{moreEvts}件</div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function ScheduleContent() {
  const [viewMode,    setViewMode]    = useState<ViewMode>('day');
  const [currentDate, setCurrentDate] = useState<Date>(new Date(TODAY_DATE));
  const [events, setEvents]           = useState<SchedEvent[]>(() => generateStaffEvents());

  const moveEvent: MoveEventFn = (id, t) => {
    setEvents(prev => prev.map(ev => ev.id === id ? { ...ev, ...t } : ev));
  };

  const navigate = (dir: 1 | -1) => {
    const d = new Date(currentDate);
    if (viewMode === 'day' || viewMode === 'day2')                   d.setDate(d.getDate()  + dir);
    else if (viewMode === 'week1' || viewMode === 'week2')           d.setDate(d.getDate()  + dir * 7);
    else                                                              d.setMonth(d.getMonth() + dir);
    setCurrentDate(d);
  };

  const goToday = () => setCurrentDate(new Date(TODAY_DATE));

  const displayLabel = useMemo(() => {
    const y = currentDate.getFullYear();
    const m = currentDate.getMonth() + 1;
    if (viewMode === 'day' || viewMode === 'day2') {
      return `${y}年${m}月${currentDate.getDate()}日（${DOW_JA[currentDate.getDay()]}）`;
    }
    if (viewMode === 'week1' || viewMode === 'week2') {
      const days = getWeekDays(currentDate);
      const f = days[0], l = days[6];
      return `${f.getFullYear()}年${f.getMonth()+1}月${f.getDate()}日 – ${l.getMonth()+1}月${l.getDate()}日`;
    }
    return `${y}年${m}月`;
  }, [viewMode, currentDate]);

  const isCurrentToday = useMemo(() => {
    if (viewMode === 'day' || viewMode === 'day2') return dStr(currentDate) === TODAY_STR;
    if (viewMode === 'week1' || viewMode === 'week2') return getWeekDays(currentDate).some(d => dStr(d) === TODAY_STR);
    return currentDate.getFullYear() === 2026 && currentDate.getMonth() === 2;
  }, [viewMode, currentDate]);

  return (
    <div className="flex flex-col h-full gap-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
            <CalendarDays className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm text-neutral-800" style={{ fontWeight: 600 }}>スケジュール</h1>
            <p className="text-[10px] text-neutral-400" style={{ fontWeight: 400 }}>SCHEDULE</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {(Object.keys(EVENT_CFG) as EventType[]).map(k => (
            <div key={k} className="flex items-center gap-1.5">
              <div style={{ width: 10, height: 10, borderRadius: 2, background: EVENT_CFG[k].color }} />
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>{EVENT_CFG[k].label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── View switcher + navigation ── */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <div className="flex items-center rounded-xl border border-neutral-200 bg-white overflow-hidden">
          {VIEW_TABS.map(tab => {
            const active = viewMode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id)}
                className="flex flex-col items-center justify-center transition-all"
                style={{
                  padding: '6px 14px',
                  background:  active ? '#030213' : 'transparent',
                  color:       active ? '#fff' : '#64748B',
                  borderRight: '1px solid #F3F4F6',
                  cursor: 'pointer',
                  minWidth: 56,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: active ? 700 : 400 }}>{tab.label}</span>
                <span style={{ fontSize: 8, opacity: 0.7, whiteSpace: 'nowrap' }}>{tab.desc}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-neutral-800 px-2 min-w-[220px] text-center" style={{ fontSize: 13, fontWeight: 500 }}>{displayLabel}</span>
          <button onClick={() => navigate(1)} className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={goToday}
            className="ml-1 px-3 py-1 rounded-full border transition-all"
            style={{ fontSize: 12, border: isCurrentToday ? '1px solid #030213' : '1px solid #E5E7EB', color: isCurrentToday ? '#030213' : '#9CA3AF', fontWeight: isCurrentToday ? 600 : 400 }}
          >
            今日
          </button>
        </div>
      </div>

      {/* ── View content ── */}
      {viewMode === 'day'    && <DayView    date={currentDate} events={events} onMoveEvent={moveEvent} />}
      {viewMode === 'day2'   && <Day2View   date={currentDate} events={events} onMoveEvent={moveEvent} />}
      {viewMode === 'week1'  && <Week1View  date={currentDate} events={events} />}
      {viewMode === 'week2'  && <Week2View  date={currentDate} events={events} />}
      {viewMode === 'month1' && <Month1View date={currentDate} events={events} />}
      {viewMode === 'month2' && <Month2View date={currentDate} events={events} />}
      {viewMode === 'month3' && <Month3View date={currentDate} events={events} />}
    </div>
  );
}

export default function Schedule() {
  return <ScheduleContent />;
}
