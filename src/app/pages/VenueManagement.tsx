import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Clock,
  Users,
  Maximize2,
  Filter,
  CalendarDays,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────
interface Room {
  id: string;
  name: string;
  /** Which partition sub-rooms this room covers (e.g. ['A','B'] for AB) */
  partitionIds: string[];
  /** Is this a partition parent group header? */
  isGroup?: boolean;
  /** Capacity */
  capacity?: number;
  floor?: string;
}

interface Booking {
  id: string;
  roomId: string;
  /** Start slot index (0-based from DAY_START) */
  startSlot: number;
  /** Duration in number of 10-min slots */
  duration: number;
  title: string;
  customer?: string;
  color: string;
  type?: string;
}

// ── Constants ──────────────────────────────────────────
const DAY_START = 7; // 7:00
const DAY_END = 23;  // 23:00
const SLOT_MINUTES = 10;
const TOTAL_SLOTS = ((DAY_END - DAY_START) * 60) / SLOT_MINUTES; // 96 slots
const MIN_SLOT_WIDTH = 11; // minimum px per 10-min slot
const ROW_HEIGHT = 48;
const HEADER_COL_WIDTH = 180;

const HOURS = Array.from({ length: DAY_END - DAY_START }, (_, i) => DAY_START + i);

// ── Partition room definitions ─────────────────────────
// Grand Ballroom has 3 partitions: A, B, C
// These can be booked individually (A, B, C) or combined (AB, BC, ABC)
const PARTITION_GROUP = {
  groupId: 'ballroom',
  groupName: '大宴会場',
  floor: '2F',
  subs: [
    { id: 'A', name: 'A室', capacity: 80 },
    { id: 'B', name: 'B室', capacity: 60 },
    { id: 'C', name: 'C室', capacity: 80 },
  ],
};

const rooms: Room[] = [
  // Partition group header
  {
    id: 'ballroom',
    name: '大宴会場（A+B+C）',
    partitionIds: ['A', 'B', 'C'],
    isGroup: true,
    capacity: 220,
    floor: '2F',
  },
  { id: 'A', name: 'A室', partitionIds: ['A'], capacity: 80, floor: '2F' },
  { id: 'B', name: 'B室', partitionIds: ['B'], capacity: 60, floor: '2F' },
  { id: 'C', name: 'C室', partitionIds: ['C'], capacity: 80, floor: '2F' },
  // Banquet & ceremony venues
  { id: 'chapel', name: 'チャペル', partitionIds: [], capacity: 120, floor: '1F' },
  { id: 'garden-chapel', name: 'ガーデンチャペル', partitionIds: [], capacity: 80, floor: '1F' },
  { id: 'garden', name: 'ガーデン', partitionIds: [], capacity: 150, floor: '1F' },
  { id: 'rose-garden', name: 'ローズガーデン', partitionIds: [], capacity: 60, floor: '1F' },
  { id: 'sky-terrace', name: 'スカイテラス', partitionIds: [], capacity: 60, floor: '5F' },
  { id: 'sky-banquet', name: 'スカイバンケット', partitionIds: [], capacity: 100, floor: '5F' },
  { id: 'grand-hall', name: 'グランドホール', partitionIds: [], capacity: 300, floor: 'B1F' },
  { id: 'crystal', name: 'クリスタルルーム', partitionIds: [], capacity: 50, floor: '3F' },
  // Service & prep rooms
  { id: 'vip', name: 'VIPルーム', partitionIds: [], capacity: 20, floor: '3F' },
  { id: 'brides-room', name: 'ブライズルーム', partitionIds: [], capacity: 10, floor: '2F' },
  { id: 'salon', name: 'ドレスサロン', partitionIds: [], capacity: 20, floor: '3F' },
  { id: 'hair-make', name: 'ヘアメイク室', partitionIds: [], capacity: 8, floor: '3F' },
  { id: 'tasting-room', name: '試食ルーム', partitionIds: [], capacity: 12, floor: '4F' },
  { id: 'foyer', name: 'ホワイエ', partitionIds: [], capacity: 100, floor: '1F' },
  { id: 'terrace-lounge', name: 'テラスラウンジ', partitionIds: [], capacity: 40, floor: '4F' },
  { id: 'photo-studio', name: 'フォトスタジオ', partitionIds: [], capacity: 6, floor: 'B1F' },
];

// ── Floor color map ────────────────────────────────────
const FLOOR_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  'B1F': { bg: '#1E293B', text: '#94A3B8', border: '#334155' },
  '1F':  { bg: '#DCFCE7', text: '#166534', border: '#86EFAC' },
  '2F':  { bg: '#DBEAFE', text: '#1D4ED8', border: '#93C5FD' },
  '3F':  { bg: '#EDE9FE', text: '#6D28D9', border: '#C4B5FD' },
  '4F':  { bg: '#FEF3C7', text: '#B45309', border: '#FCD34D' },
  '5F':  { bg: '#FFE4E6', text: '#BE123C', border: '#FDA4AF' },
};

// Legacy flat colors for legend dots & filter buttons
const BOOKING_COLORS: Record<string, string> = {
  wedding: '#D97706',
  banquet: '#2563EB',
  meeting: '#059669',
  party: '#DC2626',
  rehearsal: '#7C3AED',
  blocked: '#94A3B8',
};

// Booking style config per type — accent (left bar), bg tint, text color
const BOOKING_STYLES: Record<string, { accent: string; bg: string; bgHover: string; text: string; sub: string; icon: string }> = {
  wedding:   { accent: '#D97706', bg: 'rgba(251,191,36,0.28)',  bgHover: 'rgba(251,191,36,0.38)',  text: '#92400E', sub: '#B45309', icon: '#D97706' },
  banquet:   { accent: '#2563EB', bg: 'rgba(59,130,246,0.28)',  bgHover: 'rgba(59,130,246,0.38)',  text: '#1E3A5F', sub: '#2563EB', icon: '#3B82F6' },
  meeting:   { accent: '#059669', bg: 'rgba(16,185,129,0.28)',  bgHover: 'rgba(16,185,129,0.38)',  text: '#064E3B', sub: '#059669', icon: '#10B981' },
  party:     { accent: '#DC2626', bg: 'rgba(239,68,68,0.28)',   bgHover: 'rgba(239,68,68,0.38)',   text: '#7F1D1D', sub: '#DC2626', icon: '#EF4444' },
  rehearsal: { accent: '#7C3AED', bg: 'rgba(139,92,246,0.28)',  bgHover: 'rgba(139,92,246,0.38)',  text: '#4C1D95', sub: '#7C3AED', icon: '#8B5CF6' },
  blocked:   { accent: '#94A3B8', bg: 'rgba(148,163,184,0.28)', bgHover: 'rgba(148,163,184,0.38)', text: '#64748B', sub: '#94A3B8', icon: '#94A3B8' },
};

// ── Mock bookings ──────────────────────────────────────
const initialBookings: Booking[] = [
  // ABC combined (spans all 3 partition rows) — evening banquet
  {
    id: 'b1',
    roomId: 'ballroom',
    startSlot: 36, // 15:00
    duration: 18,  // 3 hours
    title: '田中家 披露宴',
    customer: '田中様',
    color: BOOKING_COLORS.wedding,
    type: 'wedding',
  },
  // A室 individual — morning
  {
    id: 'b2',
    roomId: 'A',
    startSlot: 6,  // 10:00
    duration: 12,  // 2 hours
    title: '社内研修',
    customer: '(株)マルエス',
    color: BOOKING_COLORS.meeting,
    type: 'meeting',
  },
  // B室 individual — morning
  {
    id: 'b3',
    roomId: 'B',
    startSlot: 0,  // 9:00
    duration: 9,   // 1.5 hours
    title: '打ち合わせ',
    customer: '佐藤様',
    color: BOOKING_COLORS.meeting,
    type: 'meeting',
  },
  // AB combined — shown spanning A & B rows
  {
    id: 'b4',
    roomId: 'AB',
    startSlot: 18, // 12:00
    duration: 12,  // 2 hours
    title: 'ランチ宴会',
    customer: '鈴木商事',
    color: BOOKING_COLORS.banquet,
    type: 'banquet',
  },
  // BC combined
  {
    id: 'b5',
    roomId: 'BC',
    startSlot: 54, // 18:00
    duration: 18,  // 3 hours
    title: '忘年会',
    customer: '営業部一同',
    color: BOOKING_COLORS.party,
    type: 'party',
  },
  // C室 — morning
  {
    id: 'b6',
    roomId: 'C',
    startSlot: 3,  // 9:30
    duration: 9,   // 1.5 hours
    title: 'リハーサル',
    customer: '田中様',
    color: BOOKING_COLORS.rehearsal,
    type: 'rehearsal',
  },
  // Chapel
  {
    id: 'b7',
    roomId: 'chapel',
    startSlot: 24, // 13:00
    duration: 12,
    title: '挙式 田中家',
    customer: '田中様',
    color: BOOKING_COLORS.wedding,
    type: 'wedding',
  },
  // Garden
  {
    id: 'b8',
    roomId: 'garden',
    startSlot: 30, // 14:00
    duration: 6,
    title: 'ガーデンセレモニー',
    customer: '田中様',
    color: BOOKING_COLORS.wedding,
    type: 'wedding',
  },
  // Sky Terrace
  {
    id: 'b9',
    roomId: 'sky-terrace',
    startSlot: 48, // 17:00
    duration: 12,
    title: 'サンセットパーティ',
    customer: '山田様',
    color: BOOKING_COLORS.party,
    type: 'party',
  },
  // VIP
  {
    id: 'b10',
    roomId: 'vip',
    startSlot: 12, // 11:00
    duration: 6,
    title: 'VIP商談',
    customer: '高橋様',
    color: BOOKING_COLORS.meeting,
    type: 'meeting',
  },
  // Salon
  {
    id: 'b11',
    roomId: 'salon',
    startSlot: 6,
    duration: 18,
    title: '美容施術',
    customer: '田中様',
    color: BOOKING_COLORS.wedding,
    type: 'wedding',
  },
  // Foyer — blocked
  {
    id: 'b12',
    roomId: 'foyer',
    startSlot: 30,
    duration: 30,
    title: '設営・撤収',
    color: BOOKING_COLORS.blocked,
    type: 'blocked',
  },
  // Garden Chapel
  {
    id: 'b13',
    roomId: 'garden-chapel',
    startSlot: 18, // 10:00
    duration: 9,
    title: '挙式 鈴木家',
    customer: '鈴木様',
    color: BOOKING_COLORS.wedding,
    type: 'wedding',
  },
  // Rose Garden
  {
    id: 'b14',
    roomId: 'rose-garden',
    startSlot: 24, // 11:00
    duration: 6,
    title: 'ガーデンフォト',
    customer: '鈴木様',
    color: BOOKING_COLORS.wedding,
    type: 'wedding',
  },
  // Sky Banquet
  {
    id: 'b15',
    roomId: 'sky-banquet',
    startSlot: 66, // 18:00
    duration: 24,  // 4h
    title: '山田家 披露宴',
    customer: '山田様',
    color: BOOKING_COLORS.wedding,
    type: 'wedding',
  },
  // Grand Hall
  {
    id: 'b16',
    roomId: 'grand-hall',
    startSlot: 42, // 14:00
    duration: 36,  // 6h
    title: '春のブライダルフェア',
    customer: '主催',
    color: BOOKING_COLORS.banquet,
    type: 'banquet',
  },
  // Crystal Room
  {
    id: 'b17',
    roomId: 'crystal',
    startSlot: 12, // 09:00
    duration: 18,  // 3h
    title: 'プラン打ち合わせ',
    customer: '伊藤様',
    color: BOOKING_COLORS.meeting,
    type: 'meeting',
  },
  // Brides Room
  {
    id: 'b18',
    roomId: 'brides-room',
    startSlot: 6,  // 08:00
    duration: 24,  // 4h
    title: '着付け・準備',
    customer: '田中様',
    color: BOOKING_COLORS.wedding,
    type: 'wedding',
  },
  // Hair Make
  {
    id: 'b19',
    roomId: 'hair-make',
    startSlot: 6,  // 08:00
    duration: 18,  // 3h
    title: 'ヘアメイク',
    customer: '田中様',
    color: BOOKING_COLORS.wedding,
    type: 'wedding',
  },
  // Tasting Room
  {
    id: 'b20',
    roomId: 'tasting-room',
    startSlot: 30, // 12:00
    duration: 12,  // 2h
    title: '試食会 佐藤様',
    customer: '佐藤様',
    color: BOOKING_COLORS.meeting,
    type: 'meeting',
  },
  {
    id: 'b21',
    roomId: 'tasting-room',
    startSlot: 48, // 15:00
    duration: 12,  // 2h
    title: '試食会 高橋様',
    customer: '高橋様',
    color: BOOKING_COLORS.meeting,
    type: 'meeting',
  },
  // Terrace Lounge
  {
    id: 'b22',
    roomId: 'terrace-lounge',
    startSlot: 60, // 17:00
    duration: 12,  // 2h
    title: 'カクテルパーティ',
    customer: '木村様',
    color: BOOKING_COLORS.party,
    type: 'party',
  },
  // Photo Studio
  {
    id: 'b23',
    roomId: 'photo-studio',
    startSlot: 12, // 09:00
    duration: 12,  // 2h
    title: 'フォト前撮り',
    customer: '渡辺様',
    color: BOOKING_COLORS.rehearsal,
    type: 'rehearsal',
  },
  {
    id: 'b24',
    roomId: 'photo-studio',
    startSlot: 30, // 12:00
    duration: 12,  // 2h
    title: 'アルバム撮影',
    customer: '中村様',
    color: BOOKING_COLORS.rehearsal,
    type: 'rehearsal',
  },
];

// ── Helper: resolve combined room to partition row indices ──
function getPartitionRowSpan(
  roomId: string
): { startRowIndex: number; rowSpan: number } | null {
  const partitionIds = ['A', 'B', 'C'];
  // Map combined IDs like "AB", "BC", "ABC" to which sub-rooms they cover
  const mapping: Record<string, string[]> = {
    A: ['A'],
    B: ['B'],
    C: ['C'],
    AB: ['A', 'B'],
    BC: ['B', 'C'],
    ABC: ['A', 'B', 'C'],
    ballroom: ['A', 'B', 'C'],
  };
  const covered = mapping[roomId];
  if (!covered) return null;

  const firstIdx = partitionIds.indexOf(covered[0]);
  const lastIdx = partitionIds.indexOf(covered[covered.length - 1]);
  if (firstIdx === -1) return null;

  // Row indices: ballroom(group)=0, A=1, B=2, C=3
  return {
    startRowIndex: firstIdx + 1, // +1 because group header is row 0
    rowSpan: lastIdx - firstIdx + 1,
  };
}

function slotToTime(slot: number): string {
  const totalMin = DAY_START * 60 + slot * SLOT_MINUTES;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${h}:${m.toString().padStart(2, '0')}`;
}

// ── Component ──────────────────────────────────────────
export default function VenueManagement() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hoveredBooking, setHoveredBooking] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{
    booking: Booking;
    x: number;
    y: number;
  } | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentTime] = useState(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  });

  // Measure container width for dynamic timeline
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Dynamic slot width: fill available space, with a minimum
  const SLOT_WIDTH = useMemo(() => {
    if (containerWidth <= 0) return MIN_SLOT_WIDTH;
    const available = containerWidth - HEADER_COL_WIDTH;
    const computed = available / TOTAL_SLOTS;
    return Math.max(computed, MIN_SLOT_WIDTH);
  }, [containerWidth]);

  const currentSlot = Math.max(0, (currentTime - DAY_START * 60) / SLOT_MINUTES);

  const filteredBookings = useMemo(
    () => (filterType ? bookings.filter((b) => b.type === filterType) : bookings),
    [bookings, filterType]
  );

  // Build display rows — partition rooms get special treatment
  const displayRows = useMemo(() => {
    const partitionRoomIds = new Set(['A', 'B', 'C']);
    const rows: Array<{
      room: Room;
      bookings: Booking[];
      indent: boolean;
      isGroupHeader: boolean;
    }> = [];

    for (const room of rooms) {
      if (room.isGroup) {
        // Group header row — show combined bookings (ballroom / ABC)
        const groupBookings = filteredBookings.filter(
          (b) => b.roomId === 'ballroom' || b.roomId === 'ABC'
        );
        rows.push({ room, bookings: groupBookings, indent: false, isGroupHeader: true });
      } else if (partitionRoomIds.has(room.id)) {
        // Individual partition row — show individual + combined bookings that cover this room
        const myBookings = filteredBookings.filter((b) => {
          if (b.roomId === room.id) return true;
          // Combined bookings: AB covers A,B; BC covers B,C
          const span = getPartitionRowSpan(b.roomId);
          if (!span) return false;
          const partitionIds = ['A', 'B', 'C'];
          const myIdx = partitionIds.indexOf(room.id);
          const startIdx = span.startRowIndex - 1;
          const endIdx = startIdx + span.rowSpan - 1;
          return myIdx >= startIdx && myIdx <= endIdx;
        });
        rows.push({ room, bookings: myBookings, indent: true, isGroupHeader: false });
      } else {
        const myBookings = filteredBookings.filter((b) => b.roomId === room.id);
        rows.push({ room, bookings: myBookings, indent: false, isGroupHeader: false });
      }
    }
    return rows;
  }, [filteredBookings]);

  const shiftDate = (days: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d);
  };

  const formatDate = (d: Date) => {
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${weekdays[d.getDay()]}）`;
  };

  const handleBookingHover = useCallback(
    (booking: Booking, e: React.MouseEvent) => {
      setHoveredBooking(booking.id);
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setTooltip({ booking, x: rect.left + rect.width / 2, y: rect.top - 8 });
    },
    []
  );

  const handleBookingLeave = useCallback(() => {
    setHoveredBooking(null);
    setTooltip(null);
  }, []);

  // Close calendar on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) {
      document.addEventListener('mousedown', handler);
    }
    return () => document.removeEventListener('mousedown', handler);
  }, [showCalendar]);

  // Calendar helpers
  const calendarMonths = useMemo(() => {
    const buildMonth = (year: number, month: number) => {
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysInPrevMonth = new Date(year, month, 0).getDate();
      const weeks: Array<Array<{ day: number; inMonth: boolean; date: Date }>> = [];
      let week: Array<{ day: number; inMonth: boolean; date: Date }> = [];

      for (let i = firstDay - 1; i >= 0; i--) {
        const d = daysInPrevMonth - i;
        week.push({ day: d, inMonth: false, date: new Date(year, month - 1, d) });
      }
      for (let d = 1; d <= daysInMonth; d++) {
        week.push({ day: d, inMonth: true, date: new Date(year, month, d) });
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }
      if (week.length > 0) {
        let nextDay = 1;
        while (week.length < 7) {
          week.push({ day: nextDay, inMonth: false, date: new Date(year, month + 1, nextDay) });
          nextDay++;
        }
        weeks.push(week);
      }
      return { year, month, weeks };
    };

    const baseYear = selectedDate.getFullYear();
    const baseMonth = selectedDate.getMonth();
    return [
      buildMonth(baseYear, baseMonth - 1),
      buildMonth(baseYear, baseMonth),
      buildMonth(baseYear, baseMonth + 1),
    ];
  }, [selectedDate]);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const isToday = (d: Date) => isSameDay(d, new Date());

  const shiftMonth = (delta: number) => {
    const d = new Date(selectedDate);
    d.setMonth(d.getMonth() + delta);
    setSelectedDate(d);
  };

  // For combined bookings, calculate visual row span info
  const getCombinedBookingStyle = (
    booking: Booking,
    currentRoomId: string
  ): React.CSSProperties | null => {
    const span = getPartitionRowSpan(booking.roomId);
    if (!span || span.rowSpan <= 1) return null;

    const partitionIds = ['A', 'B', 'C'];
    const myIdx = partitionIds.indexOf(currentRoomId);
    const startIdx = span.startRowIndex - 1;

    if (myIdx === startIdx) {
      // First row of the span — render the full-height block
      return {
        height: `${span.rowSpan * ROW_HEIGHT - 8}px`,
        zIndex: 20,
      };
    }
    // Other rows — hide (the first row's block covers them)
    return { display: 'none' };
  };

  const bookingTypes = [
    { key: 'wedding', label: '婚礼', color: BOOKING_COLORS.wedding },
    { key: 'banquet', label: '宴会', color: BOOKING_COLORS.banquet },
    { key: 'meeting', label: '会議', color: BOOKING_COLORS.meeting },
    { key: 'party', label: 'パーティ', color: BOOKING_COLORS.party },
    { key: 'rehearsal', label: 'リハー', color: BOOKING_COLORS.rehearsal },
    { key: 'blocked', label: 'ブロック', color: BOOKING_COLORS.blocked },
  ];

  return (
    <div className="flex flex-col gap-1.5 w-full" style={{ height: 'calc(100vh - 56px - 64px)', minHeight: 0 }}>
      {/* ── Toolbar ── */}
      <div className="flex flex-col gap-3">
        {/* Row 1: Title | Center date | New button */}
        <div className="flex items-center justify-between relative">
          {/* Left: Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm text-neutral-800" style={{ fontWeight: 600 }}>
                施設・会場管理
              </h1>
              <p className="text-[10px] text-neutral-400" style={{ fontWeight: 400 }}>
                Control
              </p>
            </div>
          </div>

          {/* Center: Date display (large) */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <span className="text-base text-neutral-800 tracking-wide" style={{ fontWeight: 600, fontSize: '18px' }}>
              {formatDate(selectedDate)}
            </span>
          </div>

          {/* Right: New button */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 text-white text-xs hover:bg-slate-800 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            <span style={{ fontWeight: 500 }}>新規予約</span>
          </button>
        </div>

        {/* Row 2: Filter buttons (left) + Date navigation (center) */}
        <div className="flex items-center pl-11 relative">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <div className="flex flex-wrap gap-1">
              {bookingTypes.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setFilterType(filterType === t.key ? null : t.key)}
                  className={`px-2 py-1 rounded text-[10px] transition-all ${
                    filterType === t.key
                      ? 'text-white shadow-sm'
                      : 'text-neutral-500 hover:bg-neutral-100'
                  }`}
                  style={{
                    fontWeight: 500,
                    ...(filterType === t.key ? { background: t.color } : {}),
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date navigation + Calendar (absolute center) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 z-50">
            <div className="flex items-center gap-0.5 bg-neutral-50 rounded-lg px-1 py-0.5">
              <button
                onClick={() => shiftDate(-1)}
                className="p-1 rounded-md hover:bg-white hover:shadow-sm transition-all text-neutral-400"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                onClick={() => setSelectedDate(new Date())}
                className="px-2 py-0.5 text-[10px] text-neutral-500 hover:bg-white hover:shadow-sm rounded-md transition-all"
                style={{ fontWeight: 500 }}
              >
                今日
              </button>
              <button
                onClick={() => shiftDate(1)}
                className="p-1 rounded-md hover:bg-white hover:shadow-sm transition-all text-neutral-400"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            {/* Calendar trigger */}
            <div className="relative" ref={calendarRef}>
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="p-1 rounded-md hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-neutral-600"
              >
                <CalendarDays className="w-3.5 h-3.5" />
              </button>

              {/* Calendar popup */}
              {showCalendar && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-white rounded-xl shadow-xl border border-neutral-200 p-5" style={{ width: 680 }}>
                  {/* Top: month navigation arrows */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => shiftMonth(-1)}
                      className="p-1 rounded-md hover:bg-neutral-100 transition-colors text-neutral-500"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-neutral-500" style={{ fontWeight: 500 }}>
                      {calendarMonths[0].year}年{calendarMonths[0].month + 1}月 — {calendarMonths[2].year}年{calendarMonths[2].month + 1}月
                    </span>
                    <button
                      onClick={() => shiftMonth(1)}
                      className="p-1 rounded-md hover:bg-neutral-100 transition-colors text-neutral-500"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 3 months grid */}
                  <div className="grid grid-cols-3 gap-5">
                    {calendarMonths.map((cm, mi) => (
                      <div key={mi}>
                        {/* Month title */}
                        <div className="text-center mb-2">
                          <span
                            className={`text-xs ${mi === 1 ? 'text-neutral-800' : 'text-neutral-500'}`}
                            style={{ fontWeight: mi === 1 ? 600 : 500 }}
                          >
                            {cm.month + 1}月
                          </span>
                        </div>
                        {/* Day headers */}
                        <div className="grid grid-cols-7 mb-0.5">
                          {['日', '月', '火', '水', '木', '金', '土'].map((d, i) => (
                            <div
                              key={d}
                              className={`text-center text-[9px] py-0.5 ${
                                i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-neutral-400'
                              }`}
                              style={{ fontWeight: 500 }}
                            >
                              {d}
                            </div>
                          ))}
                        </div>
                        {/* Weeks */}
                        {cm.weeks.map((week, wi) => (
                          <div key={wi} className="grid grid-cols-7">
                            {week.map((cell, ci) => {
                              const selected = isSameDay(cell.date, selectedDate);
                              const today = isToday(cell.date);
                              return (
                                <button
                                  key={ci}
                                  onClick={() => {
                                    setSelectedDate(cell.date);
                                    setShowCalendar(false);
                                  }}
                                  className={`relative text-[10px] py-1 rounded-md transition-all ${
                                    selected
                                      ? 'bg-slate-700 text-white'
                                      : today
                                      ? 'bg-slate-100 text-slate-700'
                                      : cell.inMonth
                                      ? 'text-neutral-700 hover:bg-neutral-50'
                                      : 'text-neutral-300 hover:bg-neutral-50'
                                  }`}
                                  style={{ fontWeight: selected || today ? 600 : 400 }}
                                >
                                  {cell.day}
                                  {today && !selected && (
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-slate-500" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Today shortcut */}
                  <div className="mt-3 pt-3 border-t border-neutral-100 flex justify-center">
                    <button
                      onClick={() => {
                        setSelectedDate(new Date());
                        setShowCalendar(false);
                      }}
                      className="text-[11px] text-slate-600 hover:text-slate-800 transition-colors px-3 py-1 rounded-md hover:bg-neutral-50"
                      style={{ fontWeight: 500 }}
                    >
                      今日に戻る
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Timeline Grid */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-auto rounded-xl border border-neutral-200 bg-white">
        <div style={{ width: HEADER_COL_WIDTH + TOTAL_SLOTS * SLOT_WIDTH }}>
          {/* ── Header row: sticky corner + hour labels ── */}
          <div className="flex sticky top-0 z-20" style={{ height: 36 }}>
            {/* Sticky corner cell */}
            <div
              className="sticky left-0 z-30 flex items-center justify-center border-b border-r border-neutral-200 bg-white text-[10px] text-neutral-400 tracking-wider uppercase shrink-0"
              style={{ width: HEADER_COL_WIDTH, fontWeight: 600 }}
            >
              施設 / 会場
            </div>
            {/* Hour headers */}
            <div className="flex border-b border-neutral-200 bg-white">
              {HOURS.map((hour) => {
                const slotsPerHour = 60 / SLOT_MINUTES;
                return (
                  <div
                    key={hour}
                    className="border-l border-neutral-200 flex items-center px-2"
                    style={{ width: slotsPerHour * SLOT_WIDTH }}
                  >
                    <span className="text-[10px] text-neutral-400" style={{ fontWeight: 500 }}>
                      {hour}:00
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Grid body ── */}
          <div className="relative">
            {/* Vertical grid lines: hourly (solid), 30-min (slightly darker dashed), 10-min (light dashed) */}
            {Array.from({ length: TOTAL_SLOTS + 1 }, (_, slotIdx) => {
              const x = HEADER_COL_WIDTH + slotIdx * SLOT_WIDTH;
              const minuteInHour = (slotIdx * SLOT_MINUTES) % 60;
              const isHour = minuteInHour === 0;
              const isHalfHour = minuteInHour === 30;

              if (isHour) {
                // Hourly line — solid
                return (
                  <div
                    key={`vline-${slotIdx}`}
                    className="absolute top-0 border-l border-neutral-200 pointer-events-none"
                    style={{ left: x, height: displayRows.length * ROW_HEIGHT }}
                  />
                );
              }
              if (isHalfHour) {
                // 30-min line — slightly darker dashed
                return (
                  <div
                    key={`vline-${slotIdx}`}
                    className="absolute top-0 border-l border-dashed pointer-events-none"
                    style={{ left: x, height: displayRows.length * ROW_HEIGHT, borderColor: 'rgba(0,0,0,0.10)' }}
                  />
                );
              }
              // 10-min line — light dashed
              return (
                <div
                  key={`vline-${slotIdx}`}
                  className="absolute top-0 border-l border-dashed pointer-events-none"
                  style={{ left: x, height: displayRows.length * ROW_HEIGHT, borderColor: 'rgba(0,0,0,0.04)' }}
                />
              );
            })}

            {/* Current time indicator */}
            {currentSlot >= 0 && currentSlot <= TOTAL_SLOTS && (
              <div
                className="absolute top-0 z-10 pointer-events-none"
                style={{
                  left: HEADER_COL_WIDTH + currentSlot * SLOT_WIDTH,
                  height: displayRows.length * ROW_HEIGHT,
                }}
              >
                <div className="w-2 h-2 rounded-full bg-red-500 -translate-x-1/2 -translate-y-1" />
                <div className="w-px bg-red-500/60" style={{ height: displayRows.length * ROW_HEIGHT }} />
              </div>
            )}

            {/* ── Each row: sticky room label + timeline cells ── */}
            {displayRows.map((row, rowIdx) => (
              <div
                key={row.room.id}
                className="flex border-b border-neutral-100"
                style={{ height: ROW_HEIGHT }}
              >
                {/* Sticky room label */}
                <div
                  className={`sticky left-0 z-20 shrink-0 flex items-center border-r border-neutral-200 ${
                    row.isGroupHeader ? 'bg-slate-50' : 'bg-white'
                  }`}
                  style={{ width: HEADER_COL_WIDTH }}
                >
                  <div className={`flex items-center gap-2 w-full ${row.indent ? 'pl-7 pr-3' : 'px-3'}`}>
                    {row.isGroupHeader && (
                      <Maximize2 className="w-3 h-3 text-neutral-400 shrink-0" />
                    )}
                    {row.indent && (
                      <div className="w-px h-5 bg-neutral-200 shrink-0 -ml-2 mr-1" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs truncate ${
                          row.isGroupHeader ? 'text-neutral-700' : 'text-neutral-600'
                        }`}
                        style={{ fontWeight: row.isGroupHeader ? 600 : 400 }}
                      >
                        {row.room.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {row.room.floor && (
                          <span className="text-[9px] text-neutral-400" style={{ fontWeight: 400 }}>
                            {row.room.floor}
                          </span>
                        )}
                        {row.room.capacity && (
                          <span className="text-[9px] text-neutral-300 flex items-center gap-0.5">
                            <Users className="w-2.5 h-2.5" />
                            {row.room.capacity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline cells area (relative for booking positioning) */}
                <div
                  className={`relative ${row.isGroupHeader ? 'bg-slate-50/50' : ''}`}
                  style={{ width: TOTAL_SLOTS * SLOT_WIDTH }}
                >
                  {/* Render bookings */}
                  {row.bookings.map((booking) => {
                    const isPartitionRoom = ['A', 'B', 'C'].includes(row.room.id);
                    const isCombined =
                      isPartitionRoom &&
                      booking.roomId !== row.room.id;
                    const combinedStyle = isCombined
                      ? getCombinedBookingStyle(booking, row.room.id)
                      : null;

                    if (combinedStyle && combinedStyle.display === 'none') return null;

                    const left = booking.startSlot * SLOT_WIDTH;
                    const width = booking.duration * SLOT_WIDTH;
                    const isHovered = hoveredBooking === booking.id;
                    const bType = booking.type ?? 'blocked';
                    const style = BOOKING_STYLES[bType] ?? BOOKING_STYLES.blocked;
                    const isBlocked = bType === 'blocked';

                    return (
                      <div
                        key={booking.id}
                        className="absolute top-1 cursor-pointer transition-all duration-200 group"
                        style={{
                          left,
                          width: width - 2,
                          height: combinedStyle?.height ?? ROW_HEIGHT - 8,
                          zIndex: combinedStyle?.zIndex ?? (isHovered ? 25 : 10),
                        }}
                        onMouseEnter={(e) => handleBookingHover(booking, e)}
                        onMouseLeave={handleBookingLeave}
                      >
                        <div
                          className={`w-full h-full rounded-[7px] overflow-hidden flex transition-all duration-200 ${
                            isHovered
                              ? 'shadow-md ring-1 scale-[1.01]'
                              : 'shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
                          } ${isBlocked ? 'opacity-60' : ''}`}
                          style={{
                            background: isHovered ? style.bgHover : style.bg,
                            borderTop: `1px solid ${style.accent}20`,
                            borderRight: `1px solid ${style.accent}20`,
                            borderBottom: `1px solid ${style.accent}20`,
                            borderLeft: 'none',
                            ...(isHovered ? { ringColor: `${style.accent}30` } : {}),
                            boxShadow: isHovered
                              ? `0 4px 12px ${style.accent}15, inset 0 1px 0 rgba(255,255,255,0.6)`
                              : `0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)`,
                          }}
                        >
                          {/* Left accent bar */}
                          <div
                            className="shrink-0 rounded-l-[7px]"
                            style={{
                              width: 3,
                              background: style.accent,
                            }}
                          />
                          {/* Content */}
                          <div className="flex-1 min-w-0 flex items-start px-2 py-1.5 relative">
                            {isCombined && (
                              <div className="absolute top-1 right-1">
                                <Maximize2 className="w-2.5 h-2.5" style={{ color: style.sub }} />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p
                                className="text-[10px] truncate leading-tight"
                                style={{ fontWeight: 600, color: style.text }}
                              >
                                {booking.title}
                              </p>
                              {width > 80 && booking.customer && (
                                <p
                                  className="text-[9px] truncate mt-0.5"
                                  style={{ fontWeight: 400, color: style.sub, opacity: 0.8 }}
                                >
                                  {booking.customer}
                                </p>
                              )}
                              {width > 120 && (
                                <p
                                  className="text-[9px] mt-0.5 tabular-nums"
                                  style={{ fontWeight: 400, color: style.sub, opacity: 0.55 }}
                                >
                                  {slotToTime(booking.startSlot)}–
                                  {slotToTime(booking.startSlot + booking.duration)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tooltip ── */}
      {tooltip && (() => {
        const tType = tooltip.booking.type ?? 'blocked';
        const tStyle = BOOKING_STYLES[tType] ?? BOOKING_STYLES.blocked;
        return (
          <div
            className="fixed z-50 pointer-events-none"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div
              className="rounded-xl px-4 py-3 shadow-xl min-w-[200px] backdrop-blur-xl"
              style={{
                background: 'rgba(15,23,42,0.92)',
                borderTop: `2px solid ${tStyle.accent}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-1.5 h-4 rounded-full"
                  style={{ background: tStyle.accent }}
                />
                <span className="text-xs text-white" style={{ fontWeight: 600 }}>
                  {tooltip.booking.title}
                </span>
              </div>
              {tooltip.booking.customer && (
                <p className="text-[11px] text-white/70 mb-1.5 pl-3.5">{tooltip.booking.customer}</p>
              )}
              <div className="flex items-center gap-1.5 text-[11px] text-white/50 pl-3.5">
                <Clock className="w-3 h-3" />
                <span className="tabular-nums">
                  {slotToTime(tooltip.booking.startSlot)}–
                  {slotToTime(tooltip.booking.startSlot + tooltip.booking.duration)}
                </span>
              </div>
              {(() => {
                const span = getPartitionRowSpan(tooltip.booking.roomId);
                if (span && span.rowSpan > 1) {
                  const partitionIds = ['A', 'B', 'C'];
                  const startIdx = span.startRowIndex - 1;
                  const covered = partitionIds.slice(startIdx, startIdx + span.rowSpan);
                  return (
                    <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-white/50 pl-3.5">
                      <Maximize2 className="w-3 h-3" />
                      <span>結合: {covered.join(' + ')}室</span>
                    </div>
                  );
                }
                return null;
              })()}
              <div
                className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 rotate-45"
                style={{ background: 'rgba(15,23,42,0.92)' }}
              />
            </div>
          </div>
        );
      })()}

      {/* ── Bottom legend (full width, follows window) ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between py-0.5 shrink-0">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {bookingTypes.map((t) => {
            const ls = BOOKING_STYLES[t.key] ?? BOOKING_STYLES.blocked;
            return (
              <div key={t.key} className="flex items-center gap-1.5">
                <div
                  className="rounded-sm flex items-center justify-center"
                  style={{
                    width: 16,
                    height: 12,
                    background: ls.bg,
                    borderLeft: `2.5px solid ${ls.accent}`,
                  }}
                />
                <span className="text-[10px] text-neutral-500" style={{ fontWeight: 400 }}>
                  {t.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-3 h-3 text-neutral-400" />
            <span className="text-[10px] text-neutral-400" style={{ fontWeight: 400 }}>
              結合予約（パーティション）
            </span>
          </div>
          <span className="text-[10px] text-neutral-300">|</span>
          <span className="text-[10px] text-neutral-400" style={{ fontWeight: 400 }}>
            {bookings.length}件の予約
          </span>
        </div>
      </div>
    </div>
  );
}