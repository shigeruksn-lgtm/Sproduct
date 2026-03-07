import { ArrowUpRight, TrendingUp, Users, CalendarCheck, Check, Clock, MapPin, AlertCircle, CheckCircle2, Truck, UserPlus, MessageSquare, Gem, PartyPopper, ChevronLeft, ChevronRight, GitPullRequest, Circle, Mail, PhoneIncoming, Globe, MailOpen, MailCheck, MailX, LayoutDashboard, Calendar, Building2, ShoppingCart, BarChart3, Database, Settings, HelpCircle, Play, Pause } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useRef, useCallback } from 'react';
import { GridIcon, ProductLineBadge } from '../components/GridIcon';
import { CustomBarLineChart } from '../components/CustomBarLineChart';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ---- 9-dot palette from GridIcon Pattern B (135deg gradient) ---- */
const DOT = {
  gold:        '#F5C518',
  amberLight:  '#EDAE1C',
  amberDark:   '#E48E20',
  copper:      '#E0962A',
  terracotta:  '#D06030',
  crimson:     '#A83C42',
  plum:        '#7E3858',
  indigo:      '#503A6E',
  navy:        '#3C2562',
};

const stats = [
  { label: '来館予約数', value: '1,536', change: '+9.2%', icon: CalendarCheck, color: DOT.gold },
  { label: '来館数', value: '1,284', change: '+12.5%', icon: Users, color: DOT.copper },
  { label: '契約数', value: '842', change: '+8.3%', icon: CalendarCheck, color: DOT.crimson },
  { label: '施行数', value: '756', change: '+15.1%', icon: CalendarCheck, color: DOT.navy },
];

/* ---- Chart data ---- */
const barData = [
  { month: '1月', 来館: 42, 成約: 28, 成約率: 66.7 },
  { month: '2月', 来館: 56, 成約: 35, 成約率: 62.5 },
  { month: '3月', 来館: 78, 成約: 52, 成約率: 66.7 },
  { month: '4月', 来館: 64, 成約: 41, 成約率: 64.1 },
  { month: '5月', 来館: 88, 成約: 58, 成約率: 65.9 },
  { month: '6月', 来館: 95, 成約: 67, 成約率: 70.5 },
  { month: '7月', 来館: 72, 成約: 48, 成約率: 66.7 },
  { month: '8月', 来館: 60, 成約: 38, 成約率: 63.3 },
  { month: '9月', 来館: 85, 成約: 62, 成約率: 72.9 },
  { month: '10月', 来館: 110, 成約: 78, 成約率: 70.9 },
  { month: '11月', 来館: 120, 成約: 88, 成約率: 73.3 },
  { month: '12月', 来館: 98, 成約: 70, 成約率: 71.4 },
];

const reservationData = [
  { month: '1月',  新規来館予約: 58,  資料請求: 120, 来館数: 42,  来館CXL: 8  },
  { month: '2月',  新規来館予約: 72,  資料請求: 135, 来館数: 56,  来館CXL: 10 },
  { month: '3月',  新規来館予約: 95,  資料請求: 168, 来館数: 78,  来館CXL: 14 },
  { month: '4月',  新規来館予約: 82,  資料請求: 142, 来館数: 64,  来館CXL: 11 },
  { month: '5月',  新規来館予約: 110, 資料請求: 189, 来館数: 88,  来館CXL: 16 },
  { month: '6月',  新規来館予約: 125, 資料請求: 210, 来館数: 95,  来館CXL: 20 },
  { month: '7月',  新規来館予約: 88,  資料請求: 155, 来館数: 72,  来館CXL: 13 },
  { month: '8月',  新規来館予約: 76,  資料請求: 130, 来館数: 60,  来館CXL: 9  },
  { month: '9月',  新規来館予約: 105, 資料請求: 178, 来館数: 85,  来館CXL: 15 },
  { month: '10月', 新規来館予約: 132, 資料請求: 225, 来館数: 110, 来館CXL: 19 },
  { month: '11月', 新規来館予約: 145, 資料請求: 248, 来館数: 120, 来館CXL: 22 },
  { month: '12月', 新規来館予約: 118, 資料請求: 195, 来館数: 98,  来館CXL: 17 },
];

const pieData = [
  { name: 'ゼクシィネット',       value: 36, color: DOT.gold },
  { name: 'ホームページ',         value: 27, color: DOT.copper },
  { name: 'ゼクシィフェスタ',     value: 27, color: DOT.terracotta },
  { name: 'その他WEB広告',        value: 9,  color: DOT.crimson },
  { name: 'ハナユメカウンター',   value: 5,  color: DOT.plum },
  { name: 'ハナユメネット',       value: 4,  color: DOT.indigo },
  { name: 'ゼクシィカウンター',   value: 4,  color: DOT.navy },
  { name: 'その他',               value: 8,  color: DOT.amberDark },
];

const venuePieData = [
  { name: '東京會舘',               value: 9, color: DOT.gold },
  { name: '明治神宮・記念館',       value: 8, color: DOT.amberLight },
  { name: 'クラシカ表参道',         value: 8, color: DOT.copper },
  { name: 'アーフェリーク白金',     value: 7, color: DOT.terracotta },
  { name: 'プリンスパークタワー東京', value: 7, color: DOT.crimson },
  { name: '乃木神社・會舘',         value: 6, color: DOT.plum },
  { name: '八芳園',                 value: 6, color: DOT.indigo },
  { name: 'シャルマンシーナ東京',   value: 6, color: DOT.navy },
];

const modules = [
  { name: 'Br — 婚礼', desc: 'ブライダル施行管理', status: 'active', color: DOT.crimson },
  { name: 'Gp — グループ', desc: '団体・宴会管理', status: 'active', color: DOT.indigo },
  { name: 'Dr — 衣装', desc: 'ドレス・衣装管理', status: 'active', color: DOT.copper },
  { name: 'Et — 美容', desc: 'エステ・美容管理', status: 'active', color: DOT.plum },
  { name: 'Ph ��� 写真', desc: 'フォト・撮影管理', status: 'coming', color: DOT.navy },
  { name: 'Fl — 装花', desc: 'フラワー管理', status: 'coming', color: DOT.gold },
];

const recentActivity = [
  { text: '新規施行 #BR-1284 が登録されました', time: '2分前' },
  { text: '衣装予約 #DR-0892 がフィッティング完了', time: '15分前' },
  { text: '装花プラン #FL-0428 が承認されました', time: '1時間前' },
  { text: '写真納品 #PH-0756 がアップロード完了', time: '3時間前' },
  { text: '顧客 田中様 のプロフィールが更新されました', time: '5時間前' },
];

const newsTopics = [
  { tag: '社内行事', title: '花見いつにするか決める。', date: '2026.03.01' },
  { tag: '経費精算', title: '提出明日までです。', date: '2026.03.01' },
  { tag: '誕生日', title: '田中さんの誕生日です。', date: '2026.03.01' },
];

/* ---- 今日の予定 data ---- */
const TIMELINE_START = 7;
const TIMELINE_END = 23;
const TOTAL_HOURS = TIMELINE_END - TIMELINE_START;
const pct = (hours: number) => `${(hours / TOTAL_HOURS) * 100}%`;

type TimeBlock = { start: number; end: number; title: string; color: string; location?: string };

const personalSchedule: TimeBlock[] = [
  { start: 9, end: 10, title: '朝礼ミーティング', color: DOT.navy, location: '本社 3F 会議室A' },
  { start: 10.5, end: 12, title: '新規���館 — 鈴木様ご夫妻', color: DOT.gold, location: '1F チャペル見学' },
  { start: 13.5, end: 14.5, title: 'フィッティング — 山田様', color: DOT.crimson, location: '2F ドレスサロン' },
  { start: 14.5, end: 15.5, title: '装花打ち合わせ — 佐藤様', color: DOT.plum, location: 'オンライン' },
  { start: 16, end: 17.5, title: '施行リハーサル #BR-1290', color: DOT.copper, location: 'グランドバンケット' },
  { start: 17.5, end: 18.5, title: '週次レビュー', color: DOT.indigo, location: '本社 5F ラウンジ' },
];

const overallSchedule: TimeBlock[] = [
  { start: 9, end: 9.5, title: '全体朝礼', color: DOT.navy },
  { start: 10, end: 12, title: '新規来館×3件', color: DOT.gold },
  { start: 11, end: 13, title: 'ブライダルフェア受付', color: DOT.terracotta },
  { start: 13, end: 15, title: '打合せ×5件', color: DOT.copper },
  { start: 14, end: 16.5, title: '挙式リハーサル', color: DOT.crimson },
  { start: 15, end: 17, title: 'ドレスフィッティング×2', color: DOT.plum },
  { start: 18, end: 20, title: '披露宴 #BR-1288', color: DOT.amberDark },
  { start: 20, end: 22, title: '二次会イベント', color: DOT.indigo },
];

const customerLists = [
  {
    category: '新規お客様',
    icon: UserPlus,
    color: DOT.gold,
    items: [
      { name: '鈴木 太郎様・花子様', time: '10:30', venue: 'チャペル見学 → 相談', note: 'ゼクシィネット経由' },
      { name: '佐々木 翔様・美咲様', time: '11:00', venue: 'フェア参加', note: 'ホームページ経由' },
      { name: '田村 健一様・理恵様', time: '14:00', venue: '会場見学 → 見積', note: 'ハナユメカウンター' },
    ],
  },
  {
    category: '打合せのお客様',
    icon: MessageSquare,
    color: DOT.copper,
    items: [
      { name: '山田 雄介様・麻衣様', time: '13:30', venue: 'ドレス最終フィッティング', note: '施行日 3/15' },
      { name: '佐藤 大輔様・彩様', time: '14:30', venue: '装花打ち合わせ（Zoom）', note: '施行日 3/22' },
      { name: '高橋 涼太様・優子様', time: '15:00', venue: '進行・演出打合せ', note: '施行日 4/5' },
      { name: '伊藤 拓海様・愛様', time: '15:30', venue: 'ヘアメイクリハーサル', note: '施行日 3/29' },
      { name: '渡辺 蓮様・結衣様', time: '16:00', venue: '写真・映像打合せ', note: '施行日 4/12' },
    ],
  },
  {
    category: '施行のお客様',
    icon: Gem,
    color: DOT.crimson,
    items: [
      { name: '中村 翼様・さくら様', time: '11:00 挙式 / 12:00 披露宴', venue: 'グランドバンケット', note: '70名 #BR-1288' },
      { name: '小林 陸様・七海様', time: '15:00 挙式 / 16:00 披露宴', venue: 'ガーデンテラス', note: '45名 #BR-1290' },
    ],
  },
  {
    category: 'イベントのお客様',
    icon: PartyPopper,
    color: DOT.plum,
    items: [
      { name: 'ブライダルフェア 3月第1回', time: '10:00〜17:00', venue: '全館', note: '予約 28組' },
    ],
  },
];

/* ---- 手配状況 data ---- */
const arrangements = [
  { id: 'AR-0421', customer: '鈴木様', item: 'ブーケ（白×ピンク）', category: '装花', status: 'pending' as const, dueDate: '2026.03.05', color: DOT.gold },
  { id: 'AR-0422', customer: '山田様', item: 'ウェディングドレス Aライン', category: '衣装', status: 'ordered' as const, dueDate: '2026.03.08', color: DOT.crimson },
  { id: 'AR-0423', customer: '佐藤様', item: '前撮りフォト（ロケーション）', category: '写真', status: 'confirmed' as const, dueDate: '2026.03.10', color: DOT.indigo },
  { id: 'AR-0424', customer: '高橋様', item: 'テーブル装花 12卓分', category: '装花', status: 'pending' as const, dueDate: '2026.03.03', color: DOT.gold },
  { id: 'AR-0425', customer: '伊藤様', item: 'ヘアメイクリハーサル', category: '美容', status: 'confirmed' as const, dueDate: '2026.03.04', color: DOT.plum },
  { id: 'AR-0426', customer: '渡辺様', item: 'タキシード（ネイビー）', category: '衣装', status: 'ordered' as const, dueDate: '2026.03.12', color: DOT.crimson },
  { id: 'AR-0427', customer: '中村様', item: 'ケーキ 3段（フルーツ）', category: '料理', status: 'pending' as const, dueDate: '2026.03.06', color: DOT.copper },
];

const statusConfig = {
  pending:   { label: '未手配', bg: '#FEF3C7', color: '#D97706', icon: AlertCircle },
  ordered:   { label: '発注済', bg: '#DBEAFE', color: '#2563EB', icon: Truck },
  confirmed: { label: '確定', bg: '#D1FAE5', color: '#059669', icon: CheckCircle2 },
};

const TABS = ['数値状況', '今日の予定', '施行状況', 'お問い合わせ', '手配状況', '請求関連', 'ワークフロー'] as const;
type TabKey = typeof TABS[number];

const TAB_COLORS: Record<TabKey, { active: string; activeBg: string; border: string; inactiveBg: string; inactiveBorder: string }> = {
  '数値状況':     { active: DOT.copper,     activeBg: `${DOT.copper}20`,     border: `${DOT.copper}50`,     inactiveBg: `${DOT.copper}0a`,     inactiveBorder: `${DOT.copper}22` },
  '今日の予定':   { active: DOT.crimson,    activeBg: `${DOT.crimson}20`,    border: `${DOT.crimson}50`,    inactiveBg: `${DOT.crimson}0a`,    inactiveBorder: `${DOT.crimson}22` },
  '施行状況':     { active: DOT.amberDark,  activeBg: `${DOT.amberDark}20`,  border: `${DOT.amberDark}50`,  inactiveBg: `${DOT.amberDark}0a`,  inactiveBorder: `${DOT.amberDark}22` },
  'お問い合わせ': { active: DOT.terracotta, activeBg: `${DOT.terracotta}20`, border: `${DOT.terracotta}50`, inactiveBg: `${DOT.terracotta}0a`, inactiveBorder: `${DOT.terracotta}22` },
  '手配状況':     { active: DOT.navy,       activeBg: `${DOT.navy}20`,       border: `${DOT.navy}50`,       inactiveBg: `${DOT.navy}0a`,       inactiveBorder: `${DOT.navy}22` },
  'ワークフロー': { active: DOT.indigo,     activeBg: `${DOT.indigo}20`,     border: `${DOT.indigo}50`,     inactiveBg: `${DOT.indigo}0a`,     inactiveBorder: `${DOT.indigo}22` },
  '請求関連':     { active: DOT.plum,       activeBg: `${DOT.plum}20`,       border: `${DOT.plum}50`,       inactiveBg: `${DOT.plum}0a`,       inactiveBorder: `${DOT.plum}22` },
};

/* ---- 施行状況 data ---- */
type CeremonyPhase = 'preparing' | 'inProgress' | 'completed' | 'upcoming';
type CeremonyEvent = {
  id: string;
  couple: string;
  guestCount: number;
  venue: string;
  phases: { label: string; time: string; status: CeremonyPhase }[];
  currentPhase: string;
  planner: string;
  color: string;
  note?: string;
};

const ceremonyPhaseConfig: Record<CeremonyPhase, { label: string; color: string; bg: string }> = {
  preparing:  { label: '準備中',   color: '#D97706', bg: '#FEF3C7' },
  inProgress: { label: '進行中',   color: '#059669', bg: '#D1FAE5' },
  completed:  { label: '完了',     color: '#6B7280', bg: '#F3F4F6' },
  upcoming:   { label: 'これから', color: '#2563EB', bg: '#DBEAFE' },
};

const todayCeremonies: CeremonyEvent[] = [
  {
    id: 'BR-1288',
    couple: '中村 翼様・さくら様',
    guestCount: 70,
    venue: 'グランドバンケット',
    planner: '田中 花',
    color: DOT.gold,
    currentPhase: '披露宴',
    note: '新婦父サプライズ演出あり',
    phases: [
      { label: '会場セッティング', time: '08:00', status: 'completed' },
      { label: '新郎新婦到着', time: '09:00', status: 'completed' },
      { label: 'ヘアメイク・着付け', time: '09:30', status: 'completed' },
      { label: 'スナップ写真撮影', time: '10:15', status: 'completed' },
      { label: '挙式リハーサル', time: '10:30', status: 'completed' },
      { label: '挙式', time: '11:00', status: 'completed' },
      { label: '集合写真', time: '11:30', status: 'completed' },
      { label: '披露宴', time: '12:00', status: 'inProgress' },
      { label: 'お色直し', time: '13:00', status: 'upcoming' },
      { label: 'お見送り', time: '14:30', status: 'upcoming' },
    ],
  },
  {
    id: 'BR-1290',
    couple: '小林 陸様・七海様',
    guestCount: 45,
    venue: 'ガーデンテラス',
    planner: '佐藤 遥',
    color: DOT.crimson,
    currentPhase: 'ヘアメイク・着付け',
    phases: [
      { label: '会場セッティング', time: '12:00', status: 'completed' },
      { label: '新郎新婦到着', time: '13:00', status: 'completed' },
      { label: 'ヘアメイク・着付け', time: '13:30', status: 'inProgress' },
      { label: 'スナップ写真撮影', time: '14:15', status: 'upcoming' },
      { label: '挙式リハーサル', time: '14:30', status: 'upcoming' },
      { label: '挙式', time: '15:00', status: 'upcoming' },
      { label: '集合写真', time: '15:30', status: 'upcoming' },
      { label: '披露宴', time: '16:00', status: 'upcoming' },
      { label: 'お色直し', time: '17:00', status: 'upcoming' },
      { label: 'お見送り', time: '18:30', status: 'upcoming' },
    ],
  },
  {
    id: 'GP-0412',
    couple: '株式会社マルニ 創立記念パーティー',
    guestCount: 120,
    venue: 'スカイバンケット',
    planner: '山本 翼',
    color: DOT.indigo,
    currentPhase: '会場セッティング',
    note: '社長挨拶 18:10 / 乾杯 18:15',
    phases: [
      { label: '会場セッティング', time: '15:00', status: 'inProgress' },
      { label: 'リハーサル', time: '16:30', status: 'upcoming' },
      { label: '受付開始', time: '17:30', status: 'upcoming' },
      { label: '開宴', time: '18:00', status: 'upcoming' },
      { label: '余興・演出', time: '19:00', status: 'upcoming' },
      { label: '閉宴・お見送り', time: '20:30', status: 'upcoming' },
    ],
  },
];

/* ---- お問い合わせ data ---- */
type InquiryChannel = 'email' | 'phone' | 'web';
type InquiryStatus = 'new' | 'inProgress' | 'resolved';
type InquiryItem = {
  id: string;
  customer: string;
  subject: string;
  channel: InquiryChannel;
  status: InquiryStatus;
  receivedAt: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
  color: string;
};

const inquiryChannelConfig: Record<InquiryChannel, { label: string; icon: typeof Mail }> = {
  email: { label: 'メール', icon: Mail },
  phone: { label: '電話', icon: PhoneIncoming },
  web:   { label: 'Web', icon: Globe },
};

const inquiryStatusConfig: Record<InquiryStatus, { label: string; color: string; icon: typeof MailOpen }> = {
  new:        { label: '未対応', color: '#D97706', icon: MailOpen },
  inProgress: { label: '対応中', color: '#2563EB', icon: MailCheck },
  resolved:   { label: '完了',   color: '#059669', icon: MailX },
};

const inquiries: InquiryItem[] = [
  { id: 'INQ-0301', customer: '鈴木 太郎様', subject: '挙式当日の駐車場について', channel: 'email', status: 'new', receivedAt: '09:15', assignee: '田中 花', priority: 'medium', color: DOT.gold },
  { id: 'INQ-0302', customer: '山田 麻衣様', subject: 'ドレスの追加試着希望', channel: 'phone', status: 'inProgress', receivedAt: '09:45', assignee: '佐藤 遥', priority: 'high', color: DOT.crimson },
  { id: 'INQ-0303', customer: '佐藤 彩様', subject: '装花プランの変更について', channel: 'web', status: 'new', receivedAt: '10:20', assignee: '山本 翼', priority: 'high', color: DOT.plum },
  { id: 'INQ-0304', customer: '高橋 優子様', subject: '招待状の印刷納期確認', channel: 'email', status: 'inProgress', receivedAt: '11:00', assignee: '田中 花', priority: 'medium', color: DOT.copper },
  { id: 'INQ-0305', customer: '伊藤 愛様', subject: 'ヘアメイクリハの日程変更', channel: 'phone', status: 'resolved', receivedAt: '11:30', assignee: '鈴木 美咲', priority: 'low', color: DOT.indigo },
  { id: 'INQ-0306', customer: '渡辺 結衣様', subject: '披露宴の席次表について', channel: 'email', status: 'new', receivedAt: '13:00', assignee: '佐藤 遥', priority: 'medium', color: DOT.navy },
  { id: 'INQ-0307', customer: '中村 さくら様', subject: '当日の撮影カメラマン追加', channel: 'web', status: 'inProgress', receivedAt: '14:15', assignee: '山本 翼', priority: 'high', color: DOT.terracotta },
  { id: 'INQ-0308', customer: '小林 七海様', subject: '二次会会場の空き状況', channel: 'phone', status: 'resolved', receivedAt: '15:00', assignee: '田中 花', priority: 'low', color: DOT.amberDark },
];

/* ---- ワークフロー data ---- */
type WfStatus = 'done' | 'current' | 'upcoming';
type WorkflowItem = {
  id: string;
  title: string;
  customer: string;
  steps: { label: string; status: WfStatus }[];
  dueDate: string;
  assignee: string;
  color: string;
};

const workflows: WorkflowItem[] = [
  {
    id: 'WF-0101',
    title: '鈴木様 挙式準備',
    customer: '鈴木 太郎様・花子様',
    steps: [
      { label: '初回来館', status: 'done' },
      { label: '契約', status: 'done' },
      { label: '衣装選定', status: 'done' },
      { label: '装花打合', status: 'current' },
      { label: '最終確認', status: 'upcoming' },
      { label: '施行', status: 'upcoming' },
    ],
    dueDate: '2026.03.15',
    assignee: '田中 花',
    color: DOT.gold,
  },
  {
    id: 'WF-0102',
    title: '山田様 挙式準備',
    customer: '山田 雄介様・麻衣様',
    steps: [
      { label: '初回来館', status: 'done' },
      { label: '契約', status: 'done' },
      { label: '衣装選定', status: 'done' },
      { label: '装花打合', status: 'done' },
      { label: '最終確認', status: 'current' },
      { label: '施行', status: 'upcoming' },
    ],
    dueDate: '2026.03.15',
    assignee: '佐藤 遥',
    color: DOT.crimson,
  },
  {
    id: 'WF-0103',
    title: '高橋様 挙式準備',
    customer: '高橋 涼太様・優子様',
    steps: [
      { label: '初回来館', status: 'done' },
      { label: '契約', status: 'done' },
      { label: '衣装選定', status: 'current' },
      { label: '装花打合', status: 'upcoming' },
      { label: '最終確認', status: 'upcoming' },
      { label: '施行', status: 'upcoming' },
    ],
    dueDate: '2026.04.05',
    assignee: '山本 翼',
    color: DOT.copper,
  },
  {
    id: 'WF-0104',
    title: '佐藤様 挙式準備',
    customer: '佐藤 大輔様・彩様',
    steps: [
      { label: '初回来館', status: 'done' },
      { label: '契約', status: 'done' },
      { label: '衣装選定', status: 'done' },
      { label: '装花打合', status: 'current' },
      { label: '最終確認', status: 'upcoming' },
      { label: '施行', status: 'upcoming' },
    ],
    dueDate: '2026.03.22',
    assignee: '鈴木 美咲',
    color: DOT.plum,
  },
  {
    id: 'WF-0105',
    title: '渡辺様 挙式準備',
    customer: '渡辺 蓮様・結衣様',
    steps: [
      { label: '初回来館', status: 'done' },
      { label: '契約', status: 'current' },
      { label: '衣装選定', status: 'upcoming' },
      { label: '装花打合', status: 'upcoming' },
      { label: '最終確認', status: 'upcoming' },
      { label: '施行', status: 'upcoming' },
    ],
    dueDate: '2026.04.12',
    assignee: '田中 花',
    color: DOT.indigo,
  },
];

/* ---- Horizontal Timeline Row component ---- */
function TimelineLane({ label, blocks, rowIndex }: { label: string; blocks: TimeBlock[]; rowIndex: number }) {
  // Assign rows for overlapping blocks
  const assignRows = (items: TimeBlock[]) => {
    const rows: TimeBlock[][] = [];
    const sorted = [...items].sort((a, b) => a.start - b.start);
    for (const block of sorted) {
      let placed = false;
      for (const row of rows) {
        if (row[row.length - 1].end <= block.start) {
          row.push(block);
          placed = true;
          break;
        }
      }
      if (!placed) rows.push([block]);
    }
    return rows;
  };

  const rows = assignRows(blocks);
  const ROW_H = 36;
  const ROW_GAP = 4;
  const laneHeight = rows.length * ROW_H + (rows.length - 1) * ROW_GAP;

  return (
    <div className="flex" style={{ minHeight: laneHeight + 16 }}>
      {/* Label */}
      <div className="w-[80px] shrink-0 p-1 bg-white">
        <span className="text-[12px] text-neutral-600 truncate w-full h-full flex items-center justify-center rounded-md bg-neutral-100" style={{ fontWeight: 600 }}>{label}</span>
      </div>
      {/* Blocks */}
      <div className="relative flex-1" style={{ height: laneHeight }}>
        {rows.map((row, ri) =>
          row.map((block) => {
            const leftPct = ((block.start - TIMELINE_START) / TOTAL_HOURS) * 100;
            const widthPct = ((block.end - block.start) / TOTAL_HOURS) * 100;
            const top = ri * (ROW_H + ROW_GAP);
            return (
              <motion.div
                key={`${rowIndex}-${block.title}-${block.start}`}
                initial={{ opacity: 0, scaleX: 0.3 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.05 * ri + rowIndex * 0.1 }}
                className="absolute rounded-lg flex items-center px-2.5 overflow-hidden cursor-pointer group"
                style={{
                  left: `${leftPct}%`,
                  width: `${Math.max(widthPct, 2.5)}%`,
                  top,
                  height: ROW_H,
                  background: `${block.color}18`,
                  border: `1px solid ${block.color}35`,
                  transformOrigin: 'left center',
                }}
                title={block.location ? `${block.title}\n${block.location}` : block.title}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg"
                  style={{ background: block.color }}
                />
                <span
                  className="text-[11px] truncate pl-1.5"
                  style={{ fontWeight: 500, color: block.color }}
                >
                  {block.title}
                </span>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default function Homepage() {
  const [seenNews, setSeenNews] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<TabKey>('数値状況');
  const timelineRef = useRef<HTMLDivElement>(null);

  const scrollTimeline = useCallback((_direction: 'left' | 'right') => {
    // No-op: timeline is now fully responsive
  }, []);

  const toggleSeen = (i: number) => {
    setSeenNews((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  // Current time indicator position
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const nowInRange = currentHour >= TIMELINE_START && currentHour <= TIMELINE_END;
  const nowLeftPct = ((currentHour - TIMELINE_START) / TOTAL_HOURS) * 100;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="w-full"
      style={{ fontFamily: 'DM Sans, sans-serif' }}
    >
      {/* Page title */}
      <motion.div variants={fadeUp} className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <GridIcon size={28} pattern="B" />
          <h1 className="text-[26px] tracking-wide text-neutral-800" style={{ fontWeight: 500 }}>
            最新情報のお知らせ
          </h1>
        </div>
        <p className="text-[14px] text-neutral-400" style={{ fontWeight: 300 }}>
          今起こっている出来事
        </p>
      </motion.div>

      {/* News Topics */}
      <motion.div variants={fadeUp} className="mb-8">
        <div className="bg-white rounded-2xl border border-neutral-200 px-4 py-3">
          <h2 className="text-[16px] text-neutral-800 mb-2" style={{ fontWeight: 600 }}>MakeITの今日のお知らせですよ。</h2>
          <div className="space-y-1">
            {newsTopics.map((news, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-2.5 py-1.5 rounded-lg border border-neutral-100 hover:border-neutral-300 transition-colors cursor-pointer group"
              >
                <span
                  className="text-[12px] w-20 text-center px-1 py-0.5 rounded-full shrink-0"
                  style={{
                    fontWeight: 500,
                    background: news.tag === '社内行事' ? `${DOT.gold}18` : news.tag === '誕生日' ? `${DOT.crimson}18` : `${DOT.navy}18`,
                    color: news.tag === '社内行事' ? DOT.gold : news.tag === '誕生日' ? DOT.crimson : DOT.navy,
                  }}
                >
                  {news.tag}
                </span>
                <p className="text-[14px] text-neutral-600 flex-1 min-w-0 truncate" style={{ fontWeight: 400 }}>
                  {news.title}
                </p>
                <span className="text-[13px] text-neutral-300 shrink-0" style={{ fontWeight: 300 }}>
                  {news.date}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSeen(i); }}
                  className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full transition-all"
                  style={{
                    background: seenNews.has(i) ? '#1e293b' : 'transparent',
                    border: seenNews.has(i) ? '1px solid #1e293b' : '1px solid #e0e0e0',
                    color: seenNews.has(i) ? '#fff' : '#a3a3a3',
                  }}
                >
                  {seenNews.has(i) && <Check className="w-3 h-3" />}
                  <span className="text-[10px]" style={{ fontWeight: 500 }}>
                    {seenNews.has(i) ? '見たよ' : '見たよ'}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ===== Tabs ===== */}
      <motion.div variants={fadeUp} className="mb-0">
        <div className="flex items-center gap-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            const tc = TAB_COLORS[tab];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-10 py-2.5 rounded-t-xl text-[14px] transition-all cursor-pointer"
                style={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? tc.active : tc.active,
                  background: isActive ? tc.activeBg : tc.inactiveBg,
                  borderTop: isActive ? `1.5px solid ${tc.border}` : `1.5px solid ${tc.inactiveBorder}`,
                  borderLeft: isActive ? `1.5px solid ${tc.border}` : `1.5px solid ${tc.inactiveBorder}`,
                  borderRight: isActive ? `1.5px solid ${tc.border}` : `1.5px solid ${tc.inactiveBorder}`,
                  borderBottom: '1.5px solid transparent',
                  marginBottom: isActive ? '-1.5px' : '0',
                  zIndex: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0.75,
                  boxShadow: 'none',
                }}
              >
                <span className="flex items-center gap-1.5">
                  {tab === '施行状況' && <ProductLineBadge lineId="ES" size={18} pattern="B" variant="outline" />}
                  {tab === 'お問い合わせ' && <ProductLineBadge lineId="CS" size={18} pattern="B" variant="outline" />}
                  {tab === '手配状況' && <ProductLineBadge lineId="PS" size={18} pattern="B" variant="outline" />}
                  {tab === '請求関連' && <ProductLineBadge lineId="PS" size={18} pattern="B" variant="outline" />}
                  {tab}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* ===== Tab Content ===== */}
      {(() => {
        const tc = TAB_COLORS[activeTab];
        return (
          <div
            className="rounded-2xl p-6 rounded-tl-none min-w-0 overflow-hidden"
            style={{
              border: `1.5px solid ${tc.border}`,
              background: tc.activeBg,
            }}
          >
      {activeTab === '数値状況' && (
        <>
          {/* Stats cards */}
          <motion.div variants={fadeUp} className="grid grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${stat.color}18` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <div className="flex items-center gap-1" style={{ color: stat.color }}>
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-[14px]" style={{ fontWeight: 500 }}>{stat.change}</span>
                    </div>
                  </div>
                  <p className="text-[26px] text-neutral-800 mb-1" style={{ fontWeight: 600 }}>
                    {stat.value}
                  </p>
                  <p className="text-[14px] text-neutral-400" style={{ fontWeight: 400 }}>
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </motion.div>

          {/* Row 1: 月別 来館・成約推移 + 検討会場構成比 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[15px] text-neutral-800" style={{ fontWeight: 600 }}>月別 来館・成約推移</h2>
                  <span className="text-[12px] text-neutral-400 px-2 py-0.5 rounded-full bg-neutral-50" style={{ fontWeight: 400 }}>2025年</span>
                </div>
                <CustomBarLineChart
                  data={barData}
                  xKey="month"
                  bars={[
                    { dataKey: '来館', color: DOT.gold },
                    { dataKey: '成約', color: DOT.navy },
                  ]}
                  lines={[
                    { dataKey: '成約率', color: DOT.crimson, secondaryAxis: true },
                  ]}
                  height={220}
                  secondaryDomain={[0, 100]}
                  secondaryFormatter={(v) => `${v}%`}
                  tooltipFormatter={(v, k) => k === '成約率' ? `${v}%` : String(v)}
                />
                <div className="flex items-center justify-center gap-5 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: DOT.gold }} />
                    <span className="text-[12px] text-neutral-500" style={{ fontWeight: 400 }}>来館</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: DOT.navy }} />
                    <span className="text-[12px] text-neutral-500" style={{ fontWeight: 400 }}>成約</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-0.5 rounded-full" style={{ background: DOT.crimson }} />
                    <span className="text-[12px] text-neutral-500" style={{ fontWeight: 400 }}>成約率</span>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[15px] text-neutral-800" style={{ fontWeight: 600 }}>検討会場</h2>
                  <span className="text-[12px] text-neutral-400 px-2 py-0.5 rounded-full bg-neutral-50" style={{ fontWeight: 400 }}>{venuePieData.reduce((s, e) => s + e.value, 0)}件</span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1 justify-center">
                  {venuePieData.map((entry) => {
                    const max = Math.max(...venuePieData.map(e => e.value));
                    return (
                      <div key={entry.name} className="flex items-center gap-2">
                        <span className="text-[12px] text-neutral-500 w-[7.5rem] truncate shrink-0" style={{ fontWeight: 400 }}>{entry.name}</span>
                        <div className="flex-1 h-[6px] bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(entry.value / max) * 100}%`, background: entry.color }} />
                        </div>
                        <span className="text-[12px] text-neutral-700 w-6 text-right tabular-nums" style={{ fontWeight: 600, fontFamily: 'DM Sans, sans-serif' }}>{entry.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2: 新規来館予約・資料請求成績 + 媒体別 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[15px] text-neutral-800" style={{ fontWeight: 600 }}>新規来館予約・資料請求成績</h2>
                  <span className="text-[12px] text-neutral-400 px-2 py-0.5 rounded-full bg-neutral-50" style={{ fontWeight: 400 }}>2025年 年間推移</span>
                </div>
                <CustomBarLineChart
                  data={reservationData}
                  xKey="month"
                  bars={[
                    { dataKey: '新規来館予約', color: DOT.copper },
                    { dataKey: '資料請求', color: DOT.plum },
                    { dataKey: '来館CXL', color: DOT.terracotta },
                  ]}
                  lines={[
                    { dataKey: '来館数', color: DOT.gold, dashed: true },
                  ]}
                  height={220}
                  tooltipFormatter={(v) => `${v}件`}
                />
                <div className="flex items-center justify-center gap-5 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: DOT.copper }} />
                    <span className="text-[12px] text-neutral-500" style={{ fontWeight: 400 }}>新規来館予約</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: DOT.plum }} />
                    <span className="text-[12px] text-neutral-500" style={{ fontWeight: 400 }}>資料請求</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: DOT.terracotta }} />
                    <span className="text-[12px] text-neutral-500" style={{ fontWeight: 400 }}>来館CXL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke={DOT.gold} strokeWidth="2.5" strokeDasharray="4 2" /></svg>
                    <span className="text-[12px] text-neutral-500" style={{ fontWeight: 400 }}>来館数</span>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[15px] text-neutral-800" style={{ fontWeight: 600 }}>媒体別</h2>
                  <span className="text-[12px] text-neutral-400 px-2 py-0.5 rounded-full bg-neutral-50" style={{ fontWeight: 400 }}>{pieData.reduce((s, e) => s + e.value, 0)}件</span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1 justify-center">
                  {pieData.map((entry) => {
                    const max = Math.max(...pieData.map(e => e.value));
                    return (
                      <div key={entry.name} className="flex items-center gap-2">
                        <span className="text-[12px] text-neutral-500 w-[7.5rem] truncate shrink-0" style={{ fontWeight: 400 }}>{entry.name}</span>
                        <div className="flex-1 h-[6px] bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(entry.value / max) * 100}%`, background: entry.color }} />
                        </div>
                        <span className="text-[12px] text-neutral-700 w-6 text-right tabular-nums" style={{ fontWeight: 600, fontFamily: 'DM Sans, sans-serif' }}>{entry.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-[16px] text-neutral-800" style={{ fontWeight: 500 }}>モジュール一覧</h2>
                  <span className="text-[14px] text-neutral-400" style={{ fontWeight: 300 }}>6 modes</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {modules.map((mod) => (
                    <div key={mod.name} className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-100 hover:border-neutral-300 transition-colors cursor-pointer group">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: `${mod.color}18` }}>
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: mod.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] text-neutral-700 truncate" style={{ fontWeight: 500 }}>{mod.name}</p>
                        <p className="text-[13px] text-neutral-400 truncate" style={{ fontWeight: 300 }}>{mod.desc}</p>
                      </div>
                      {mod.status === 'active' ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full shrink-0" style={{ fontWeight: 500, background: `${mod.color}18`, color: mod.color }}>Active</span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full shrink-0" style={{ fontWeight: 500, background: `${DOT.navy}12`, color: DOT.navy }}>Soon</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 h-full">
                <h2 className="text-[16px] text-neutral-800 mb-5" style={{ fontWeight: 500 }}>最近のアクティビティ</h2>
                <ul className="space-y-4">
                  {recentActivity.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0" />
                      <div>
                        <p className="text-[14px] text-neutral-600 leading-5" style={{ fontWeight: 400 }}>{item.text}</p>
                        <p className="text-[13px] text-neutral-300 mt-0.5" style={{ fontWeight: 300 }}>{item.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="mt-6">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <h2 className="text-[16px] text-neutral-800 mb-5" style={{ fontWeight: 500 }}>プロダクトライン</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: 'ES', full: 'Experience System', color: DOT.gold, desc: '施行・体験管理' },
                  { name: 'CS', full: 'Customer System', color: DOT.crimson, desc: '顧客・CRM管理' },
                  { name: 'PS', full: 'Partner System', color: DOT.indigo, desc: 'パートナー連携' },
                ].map((pl) => (
                  <div key={pl.name} className="group flex items-center gap-4 p-4 rounded-xl border border-neutral-100 hover:border-neutral-300 transition-all cursor-pointer">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${pl.color}14` }}>
                      <span className="text-[14px]" style={{ color: pl.color, fontWeight: 700 }}>{pl.name}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-neutral-700" style={{ fontWeight: 500 }}>{pl.full}</p>
                      <p className="text-[13px] text-neutral-400" style={{ fontWeight: 300 }}>{pl.desc}</p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-600 transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}

      {activeTab === '今日の予定' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="min-w-0 overflow-hidden"
        >
          {/* Schedule summary */}
          <motion.div variants={fadeUp} className="grid grid-cols-5 gap-4 mb-6">
            {[
              { label: '新規数', value: '3', unit: '件', icon: UserPlus, color: DOT.gold },
              { label: '打合数', value: '5', unit: '件', icon: MessageSquare, color: DOT.copper },
              { label: '挙式・施行数', value: '2', unit: '件', icon: Gem, color: DOT.crimson },
              { label: 'イベント数', value: '1', unit: '件', icon: PartyPopper, color: DOT.plum },
              { label: '次の予定まで', value: '30', unit: 'min', icon: Clock, color: DOT.indigo },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-white rounded-2xl border border-neutral-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${item.color}18` }}>
                      <Icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <span className="text-xs text-neutral-400" style={{ fontWeight: 400 }}>{item.label}</span>
                  </div>
                  <p className="text-[26px] text-neutral-800 text-right" style={{ fontWeight: 600 }}>
                    {item.value}
                    <span className="text-[16px] text-neutral-400 ml-1" style={{ fontWeight: 400 }}>{item.unit}</span>
                  </p>
                </div>
              );
            })}
          </motion.div>

          {/* Horizontal Timeline */}
          <motion.div variants={fadeUp} className="mb-6">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[16px] text-neutral-800" style={{ fontWeight: 600 }}>タイムライン</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-neutral-400 px-2.5 py-1 rounded-full bg-neutral-50" style={{ fontWeight: 400 }}>2026年3月1日（日）</span>
                </div>
              </div>

              {/* Responsive timeline container */}
              <div ref={timelineRef} className="pb-2">
                <div className="w-full">
                  {/* Hour headers */}
                  <div className="flex mb-3">
                    <div className="w-[80px] shrink-0" />
                    <div className="relative flex-1 h-4">
                      {Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => {
                        const hour = TIMELINE_START + i;
                        return (
                          <div
                            key={hour}
                            className="absolute text-[11px] text-neutral-400"
                            style={{ left: pct(i), fontWeight: 400, transform: 'translateX(-50%)' }}
                          >
                            {hour}:00
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Grid lines + lanes */}
                  <div className="relative">
                    {/* Vertical hour grid lines */}
                    <div className="absolute top-0 bottom-0 left-[80px] right-0 pointer-events-none">
                      {Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => (
                        <div
                          key={i}
                          className="absolute top-0 bottom-0 w-px"
                          style={{
                            left: pct(i),
                            background: '#f0f0f0',
                          }}
                        />
                      ))}
                    </div>

                    {/* Current time indicator */}
                    {nowInRange && (
                      <div
                        className="absolute top-0 bottom-0 z-20 pointer-events-none"
                        style={{ left: `calc(80px + (100% - 80px) * ${nowLeftPct / 100})` }}
                      >
                        <div className="w-px h-full" style={{ background: DOT.crimson, opacity: 0.6 }} />
                        <div
                          className="absolute -top-1 -translate-x-1/2 w-2 h-2 rounded-full"
                          style={{ background: DOT.crimson }}
                        />
                      </div>
                    )}

                    {/* Personal schedule lane */}
                    <div className="py-2 border-b border-neutral-100">
                      <TimelineLane label="草野 繁" blocks={personalSchedule} rowIndex={0} />
                    </div>

                    {/* Overall schedule lane */}
                    <div className="py-2">
                      <TimelineLane label="全体" blocks={overallSchedule} rowIndex={1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Customer Lists */}
          <motion.div variants={fadeUp}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {customerLists.map((list) => {
                const Icon = list.icon;
                // Group items by hour
                const grouped: Record<string, typeof list.items> = {};
                for (const item of list.items) {
                  const hourMatch = item.time.match(/^(\d{1,2})/);
                  const hourKey = hourMatch ? `${hourMatch[1]}:00` : item.time;
                  if (!grouped[hourKey]) grouped[hourKey] = [];
                  grouped[hourKey].push(item);
                }
                const hourKeys = Object.keys(grouped).sort((a, b) => {
                  const ha = parseInt(a);
                  const hb = parseInt(b);
                  return ha - hb;
                });

                return (
                  <div key={list.category} className="bg-white rounded-2xl border border-neutral-200 p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background: `${list.color}18` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: list.color }} />
                      </div>
                      <h3 className="text-[14px] text-neutral-800" style={{ fontWeight: 600 }}>{list.category}</h3>
                      <span
                        className="text-[11px] px-2 py-0.5 rounded-full ml-auto"
                        style={{ fontWeight: 500, background: `${list.color}18`, color: list.color }}
                      >
                        {list.items.length}件
                      </span>
                    </div>
                    <div className="space-y-0 max-h-[360px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                      {hourKeys.map((hourKey, gi) => (
                        <div key={hourKey}>
                          {/* Time group header */}
                          <div className={`flex items-center gap-2.5 ${gi > 0 ? 'mt-3.5' : ''} mb-2`}>
                            <div
                              className="w-[4px] h-[4px] rounded-full"
                              style={{ background: list.color, opacity: 0.6 }}
                            />
                            <span className="text-[13px] text-neutral-500" style={{ fontWeight: 600, letterSpacing: '0.03em' }}>
                              {hourKey}〜
                            </span>
                            <div className="flex-1 h-px bg-neutral-100" />
                          </div>
                          {/* Items in this group */}
                          <div className="space-y-1.5 pl-2.5">
                            {grouped[hourKey].map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-3 p-3 rounded-xl border border-neutral-100 hover:border-neutral-200 transition-colors cursor-pointer"
                              >
                                <div
                                  className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                                  style={{ background: list.color }}
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] text-neutral-800 mb-0.5" style={{ fontWeight: 500 }}>
                                    {item.name}
                                  </p>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[12px] text-neutral-400" style={{ fontWeight: 400 }}>
                                      <Clock className="w-3 h-3 inline mr-0.5 -mt-px" />{item.time}
                                    </span>
                                    <span className="text-[12px] text-neutral-400" style={{ fontWeight: 400 }}>
                                      <MapPin className="w-3 h-3 inline mr-0.5 -mt-px" />{item.venue}
                                    </span>
                                  </div>
                                  <span
                                    className="text-[11px] mt-1 inline-block px-2 py-0.5 rounded-full"
                                    style={{ background: `${list.color}10`, color: list.color, fontWeight: 400 }}
                                  >
                                    {item.note}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}

      {activeTab === '施行状況' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="min-w-0 overflow-hidden"
        >
          {/* Summary cards */}
          <motion.div variants={fadeUp} className="grid grid-cols-4 gap-4 mb-6">
            {(() => {
              const totalPhases = todayCeremonies.reduce((s, c) => s + c.phases.length, 0);
              const completedPhases = todayCeremonies.reduce((s, c) => s + c.phases.filter(p => p.status === 'completed').length, 0);
              const inProgressCount = todayCeremonies.filter(c => c.phases.some(p => p.status === 'inProgress')).length;
              const totalGuests = todayCeremonies.reduce((s, c) => s + c.guestCount, 0);
              return [
                { label: '本日の施行', value: `${todayCeremonies.length}`, unit: '件', icon: Gem, color: DOT.amberDark },
                { label: '進行中', value: `${inProgressCount}`, unit: '件', icon: Play, color: DOT.crimson },
                { label: '総ゲスト数', value: `${totalGuests}`, unit: '名', icon: Users, color: DOT.copper },
                { label: '全体進捗', value: `${Math.round((completedPhases / totalPhases) * 100)}`, unit: '%', icon: CheckCircle2, color: DOT.navy },
              ];
            })().map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-white rounded-2xl border border-neutral-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${item.color}18` }}>
                      <Icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <span className="text-xs text-neutral-400" style={{ fontWeight: 400 }}>{item.label}</span>
                  </div>
                  <p className="text-[26px] text-neutral-800 text-right" style={{ fontWeight: 600 }}>
                    {item.value}
                    <span className="text-[16px] text-neutral-400 ml-1" style={{ fontWeight: 400 }}>{item.unit}</span>
                  </p>
                </div>
              );
            })}
          </motion.div>

          {/* Ceremony cards */}
          <div className="space-y-4">
            {todayCeremonies.map((ceremony) => {
              const completedCount = ceremony.phases.filter(p => p.status === 'completed').length;
              const progressPct = (completedCount / ceremony.phases.length) * 100;
              const currentIdx = ceremony.phases.findIndex(p => p.status === 'inProgress');
              const isWedding = ceremony.id.startsWith('BR');

              return (
                <motion.div key={ceremony.id} variants={fadeUp}>
                  <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{ background: `${ceremony.color}18` }}
                        >
                          {isWedding ? (
                            <Gem className="w-5 h-5" style={{ color: ceremony.color }} />
                          ) : (
                            <PartyPopper className="w-5 h-5" style={{ color: ceremony.color }} />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-[15px] text-neutral-800" style={{ fontWeight: 600 }}>{ceremony.couple}</h3>
                            <span
                              className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{ fontWeight: 500, background: `${ceremony.color}18`, color: ceremony.color }}
                            >
                              #{ceremony.id}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[12px] text-neutral-400" style={{ fontWeight: 400 }}>
                            <span><MapPin className="w-3 h-3 inline mr-0.5 -mt-px" />{ceremony.venue}</span>
                            <span><Users className="w-3 h-3 inline mr-0.5 -mt-px" />{ceremony.guestCount}名</span>
                            <span>担当: {ceremony.planner}</span>
                          </div>
                        </div>
                      </div>

                      {/* Current phase badge */}
                      <div className="flex items-center gap-2">
                        {currentIdx >= 0 && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px]" style={{ fontWeight: 600, background: '#D1FAE5', color: '#059669' }}>
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            {ceremony.currentPhase}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Note */}
                    {ceremony.note && (
                      <div className="mb-4 px-3 py-2 rounded-lg text-[12px] text-amber-700" style={{ background: '#FEF3C7', fontWeight: 400 }}>
                        <AlertCircle className="w-3 h-3 inline mr-1 -mt-px" />
                        {ceremony.note}
                      </div>
                    )}

                    {/* Progress bar */}
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] text-neutral-400" style={{ fontWeight: 400 }}>進行状況</span>
                        <span className="text-[11px] text-neutral-500" style={{ fontWeight: 600 }}>{completedCount} / {ceremony.phases.length}</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: ceremony.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPct}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    {/* Phase timeline — horizontal step display */}
                    <div className="flex items-start gap-0 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
                      {ceremony.phases.map((phase, i) => {
                        const cfg = ceremonyPhaseConfig[phase.status];
                        const isLast = i === ceremony.phases.length - 1;
                        return (
                          <div key={i} className="flex items-start shrink-0">
                            <div className="flex flex-col items-center" style={{ minWidth: 80 }}>
                              {/* Dot */}
                              <div
                                className="w-7 h-7 rounded-full flex items-center justify-center border-2"
                                style={{
                                  borderColor: cfg.color,
                                  background: phase.status === 'completed' ? cfg.color : phase.status === 'inProgress' ? cfg.bg : '#fff',
                                }}
                              >
                                {phase.status === 'completed' && <Check className="w-3.5 h-3.5 text-white" />}
                                {phase.status === 'inProgress' && <Play className="w-3 h-3" style={{ color: cfg.color }} />}
                                {phase.status === 'upcoming' && <Circle className="w-2.5 h-2.5" style={{ color: '#d4d4d4' }} />}
                                {phase.status === 'preparing' && <Pause className="w-3 h-3" style={{ color: cfg.color }} />}
                              </div>
                              {/* Time */}
                              <span className="text-[10px] text-neutral-400 mt-1.5 tabular-nums" style={{ fontWeight: 500, fontFamily: 'DM Sans' }}>
                                {phase.time}
                              </span>
                              {/* Label */}
                              <span
                                className="text-[10px] mt-0.5 text-center px-1"
                                style={{
                                  fontWeight: phase.status === 'inProgress' ? 600 : 400,
                                  color: phase.status === 'inProgress' ? cfg.color : phase.status === 'completed' ? '#9ca3af' : '#737373',
                                }}
                              >
                                {phase.label}
                              </span>
                            </div>
                            {/* Connector line */}
                            {!isLast && (
                              <div className="flex items-center mt-[13px] px-0">
                                <div
                                  className="h-[2px] rounded-full"
                                  style={{
                                    width: 20,
                                    background: phase.status === 'completed' ? '#d1d5db' : '#e5e7eb',
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {activeTab === 'お問い合わせ' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Inquiry summary cards */}
          <motion.div variants={fadeUp} className="grid grid-cols-4 gap-4 mb-6">
            {([
              { key: 'new' as InquiryStatus, label: '未対応' },
              { key: 'inProgress' as InquiryStatus, label: '対応中' },
              { key: 'resolved' as InquiryStatus, label: '完了' },
            ] as const).map(({ key, label }) => {
              const cfg = inquiryStatusConfig[key];
              const count = inquiries.filter(inq => inq.status === key).length;
              const SIcon = cfg.icon;
              return (
                <div key={key} className="bg-white rounded-2xl border border-neutral-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${cfg.color}18` }}>
                      <SIcon className="w-4 h-4" style={{ color: cfg.color }} />
                    </div>
                    <span className="text-xs text-neutral-400" style={{ fontWeight: 400 }}>{label}</span>
                  </div>
                  <p className="text-[26px] text-neutral-800 text-right" style={{ fontWeight: 600 }}>
                    {count}<span className="text-[16px] text-neutral-400 ml-1" style={{ fontWeight: 400 }}>件</span>
                  </p>
                </div>
              );
            })}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${DOT.terracotta}18` }}>
                  <Mail className="w-4 h-4" style={{ color: DOT.terracotta }} />
                </div>
                <span className="text-xs text-neutral-400" style={{ fontWeight: 400 }}>本日合計</span>
              </div>
              <p className="text-[26px] text-neutral-800 text-right" style={{ fontWeight: 600 }}>
                {inquiries.length}<span className="text-[16px] text-neutral-400 ml-1" style={{ fontWeight: 400 }}>件</span>
              </p>
            </div>
          </motion.div>

          {/* Inquiry list */}
          <motion.div variants={fadeUp}>
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4" style={{ color: DOT.terracotta }} />
                  <h2 className="text-[16px] text-neutral-800" style={{ fontWeight: 600 }}>お問い合わせ一覧</h2>
                </div>
                <span className="text-[13px] text-neutral-400 px-2.5 py-1 rounded-full bg-neutral-50" style={{ fontWeight: 400 }}>2026年3月1日（日）</span>
              </div>

              {/* Table header */}
              <div className="grid grid-cols-12 gap-3 px-3 py-2 mb-1">
                <span className="col-span-1 text-[12px] text-neutral-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>ID</span>
                <span className="col-span-2 text-[12px] text-neutral-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>顧客</span>
                <span className="col-span-3 text-[12px] text-neutral-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>件名</span>
                <span className="col-span-1 text-[12px] text-neutral-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>経路</span>
                <span className="col-span-1 text-[12px] text-neutral-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>受信</span>
                <span className="col-span-1 text-[12px] text-neutral-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>優先度</span>
                <span className="col-span-1 text-[12px] text-neutral-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>担当</span>
                <span className="col-span-2 text-[12px] text-neutral-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>ステータス</span>
              </div>

              <div>
                {inquiries.map((inq, idx) => {
                  const chCfg = inquiryChannelConfig[inq.channel];
                  const stCfg = inquiryStatusConfig[inq.status];
                  const ChIcon = chCfg.icon;
                  const StIcon = stCfg.icon;
                  const priorityStyles = {
                    high:   { bg: `${DOT.crimson}18`, color: DOT.crimson, label: '高' },
                    medium: { bg: `${DOT.copper}18`,  color: DOT.copper,  label: '中' },
                    low:    { bg: `${DOT.navy}18`,     color: DOT.navy,    label: '低' },
                  };
                  const pCfg = priorityStyles[inq.priority];

                  return (
                    <div
                      key={inq.id}
                      className={`grid grid-cols-12 gap-3 items-center px-3 py-3 rounded-xl hover:bg-neutral-100/60 transition-colors cursor-pointer ${idx % 2 === 1 ? 'bg-neutral-100/70' : ''}`}
                    >
                      <span className="col-span-1 text-[13px] text-neutral-500" style={{ fontWeight: 500 }}>{inq.id}</span>
                      <span className="col-span-2 text-[14px] text-neutral-700 truncate" style={{ fontWeight: 500 }}>{inq.customer}</span>
                      <span className="col-span-3 text-[14px] text-neutral-600 truncate" style={{ fontWeight: 400 }}>{inq.subject}</span>
                      <div className="col-span-1 flex items-center gap-1">
                        <ChIcon className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="text-[12px] text-neutral-500" style={{ fontWeight: 400 }}>{chCfg.label}</span>
                      </div>
                      <span className="col-span-1 text-[13px] text-neutral-400" style={{ fontWeight: 400 }}>{inq.receivedAt}</span>
                      <div className="col-span-1">
                        <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ fontWeight: 500, background: pCfg.bg, color: pCfg.color }}>{pCfg.label}</span>
                      </div>
                      <span className="col-span-1 text-[13px] text-neutral-500 truncate" style={{ fontWeight: 400 }}>{inq.assignee}</span>
                      <div className="col-span-2 flex items-center gap-1.5">
                        <StIcon className="w-3.5 h-3.5" style={{ color: stCfg.color }} />
                        <span className="text-[13px]" style={{ fontWeight: 500, color: stCfg.color }}>{stCfg.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {activeTab === '手配状況' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Arrangement summary */}
          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mb-6">
            {(['pending', 'ordered', 'confirmed'] as const).map((status) => {
              const cfg = statusConfig[status];
              const count = arrangements.filter(a => a.status === status).length;
              const StatusIcon = cfg.icon;
              return (
                <div key={status} className="bg-white rounded-2xl border border-neutral-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: cfg.bg }}>
                      <StatusIcon className="w-4 h-4" style={{ color: cfg.color }} />
                    </div>
                    <span className="text-xs text-neutral-400" style={{ fontWeight: 400 }}>{cfg.label}</span>
                  </div>
                  <p className="text-[26px] text-neutral-800" style={{ fontWeight: 600 }}>{count}<span className="text-[16px] text-neutral-400 ml-1" style={{ fontWeight: 400 }}>件</span></p>
                </div>
              );
            })}
          </motion.div>

          {/* Arrangement list */}
          <motion.div variants={fadeUp}>
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[16px] text-neutral-800" style={{ fontWeight: 600 }}>手配一覧</h2>
                <span className="text-[13px] text-neutral-400 px-2.5 py-1 rounded-full bg-neutral-50" style={{ fontWeight: 400 }}>{arrangements.length}件</span>
              </div>

              {/* Table header */}
              <div className="grid grid-cols-12 gap-3 px-3 py-2 mb-1">
                <span className="col-span-2 text-[12px] text-neutral-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>ID</span>
                <span className="col-span-2 text-[12px] text-neutral-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>顧客</span>
                <span className="col-span-3 text-[12px] text-neutral-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>手配内容</span>
                <span className="col-span-1 text-[12px] text-neutral-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>区分</span>
                <span className="col-span-2 text-[12px] text-neutral-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>期日</span>
                <span className="col-span-2 text-[12px] text-neutral-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>ステータス</span>
              </div>

              <div>
                {arrangements.map((item, idx) => {
                  const cfg = statusConfig[item.status];
                  const StatusIcon = cfg.icon;
                  return (
                    <div
                      key={item.id}
                      className={`grid grid-cols-12 gap-3 items-center px-3 py-3 rounded-xl hover:bg-neutral-100/60 transition-colors cursor-pointer ${idx % 2 === 1 ? 'bg-neutral-100/70' : ''}`}
                    >
                      <span className="col-span-2 text-[14px] text-neutral-500" style={{ fontWeight: 500 }}>{item.id}</span>
                      <span className="col-span-2 text-[14px] text-neutral-700 truncate" style={{ fontWeight: 500 }}>{item.customer}</span>
                      <span className="col-span-3 text-[14px] text-neutral-600 truncate" style={{ fontWeight: 400 }}>{item.item}</span>
                      <div className="col-span-1">
                        <span
                          className="text-[12px] px-2 py-0.5 rounded-full"
                          style={{ fontWeight: 500, background: `${item.color}18`, color: item.color }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <span className="col-span-2 text-[13px] text-neutral-400" style={{ fontWeight: 400 }}>{item.dueDate}</span>
                      <div className="col-span-2 flex items-center gap-1.5">
                        <StatusIcon className="w-3.5 h-3.5" style={{ color: cfg.color }} />
                        <span className="text-[13px]" style={{ fontWeight: 500, color: cfg.color }}>{cfg.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {activeTab === '請求関連' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Summary cards */}
          <motion.div variants={fadeUp} className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: '請求書発行済', value: '128件', sub: '¥24,560,000', color: DOT.plum },
              { label: '入金確認済', value: '96件', sub: '¥18,240,000', color: DOT.indigo },
              { label: '未入金', value: '32件', sub: '¥6,320,000', color: DOT.crimson },
              { label: '今月発行予定', value: '45件', sub: '¥8,900,000', color: DOT.navy },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-xl border border-neutral-100 p-4 hover:shadow-md transition-shadow"
              >
                <p className="text-[12px] text-neutral-400 mb-1" style={{ fontWeight: 400 }}>{card.label}</p>
                <p className="text-[22px] text-neutral-800 mb-0.5" style={{ fontWeight: 600 }}>{card.value}</p>
                <p className="text-[13px]" style={{ fontWeight: 500, color: card.color }}>{card.sub}</p>
              </div>
            ))}
          </motion.div>

          {/* Billing table */}
          <motion.div variants={fadeUp}>
            <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
              <div className="px-5 py-3 border-b border-neutral-100 flex items-center justify-between">
                <h3 className="text-[15px] text-neutral-700" style={{ fontWeight: 600 }}>請求一覧</h3>
                <span className="text-[12px] text-neutral-400" style={{ fontWeight: 400 }}>直近の請求</span>
              </div>
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-neutral-100 text-neutral-400" style={{ fontWeight: 500 }}>
                    <th className="text-left px-5 py-2.5">請求番号</th>
                    <th className="text-left px-5 py-2.5">顧客名</th>
                    <th className="text-left px-5 py-2.5">件名</th>
                    <th className="text-right px-5 py-2.5">金額</th>
                    <th className="text-center px-5 py-2.5">ステータス</th>
                    <th className="text-left px-5 py-2.5">発行日</th>
                    <th className="text-left px-5 py-2.5">期限</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'INV-2026-0312', customer: '田中・佐藤様', subject: '挙式・披露宴', amount: '¥3,850,000', status: '入金済', date: '2026/02/15', due: '2026/03/15', statusColor: DOT.indigo },
                    { id: 'INV-2026-0311', customer: '山田・鈴木様', subject: '披露宴パッケージ', amount: '¥2,420,000', status: '未入金', date: '2026/02/10', due: '2026/03/10', statusColor: DOT.crimson },
                    { id: 'INV-2026-0310', customer: '高橋・伊藤様', subject: '挙式プラン', amount: '¥1,980,000', status: '入金済', date: '2026/02/08', due: '2026/03/08', statusColor: DOT.indigo },
                    { id: 'INV-2026-0309', customer: '渡辺・中村様', subject: 'フォトウェディング', amount: '¥680,000', status: '一部入金', date: '2026/02/05', due: '2026/03/05', statusColor: DOT.plum },
                    { id: 'INV-2026-0308', customer: '小林・加藤様', subject: '二次会プラン', amount: '¥450,000', status: '未入金', date: '2026/02/01', due: '2026/03/01', statusColor: DOT.crimson },
                    { id: 'INV-2026-0307', customer: '吉田・松本様', subject: '挙式・披露宴', amount: '¥4,120,000', status: '入金済', date: '2026/01/28', due: '2026/02/28', statusColor: DOT.indigo },
                  ].map((row, idx) => (
                    <tr key={row.id} className={`hover:bg-neutral-100/60 transition-colors cursor-pointer ${idx % 2 === 1 ? 'bg-neutral-100/70' : ''}`}>
                      <td className="px-5 py-3 text-neutral-500" style={{ fontWeight: 500 }}>{row.id}</td>
                      <td className="px-5 py-3 text-neutral-700" style={{ fontWeight: 500 }}>{row.customer}</td>
                      <td className="px-5 py-3 text-neutral-500" style={{ fontWeight: 400 }}>{row.subject}</td>
                      <td className="px-5 py-3 text-right text-neutral-800" style={{ fontWeight: 600 }}>{row.amount}</td>
                      <td className="px-5 py-3 text-center">
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-full text-[11px]"
                          style={{ fontWeight: 500, background: `${row.statusColor}18`, color: row.statusColor }}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-neutral-400" style={{ fontWeight: 400 }}>{row.date}</td>
                      <td className="px-5 py-3 text-neutral-400" style={{ fontWeight: 400 }}>{row.due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'ワークフロー' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Workflow summary */}
          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mb-6">
            {(['done', 'current', 'upcoming'] as const).map((status) => {
              const count = workflows.filter(w => w.steps.some(s => s.status === status)).length;
              const StatusIcon = status === 'done' ? CheckCircle2 : status === 'current' ? AlertCircle : Clock;
              const StatusColor = status === 'done' ? DOT.crimson : status === 'current' ? DOT.copper : DOT.navy;
              return (
                <div key={status} className="bg-white rounded-2xl border border-neutral-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: StatusColor + '18' }}>
                      <StatusIcon className="w-4 h-4" style={{ color: StatusColor }} />
                    </div>
                    <span className="text-xs text-neutral-400" style={{ fontWeight: 400 }}>{status === 'done' ? '完了' : status === 'current' ? '進行中' : '予定'}</span>
                  </div>
                  <p className="text-[26px] text-neutral-800" style={{ fontWeight: 600 }}>{count}<span className="text-[16px] text-neutral-400 ml-1" style={{ fontWeight: 400 }}>件</span></p>
                </div>
              );
            })}
          </motion.div>

          {/* Workflow list */}
          <motion.div variants={fadeUp}>
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <GitPullRequest className="w-4 h-4" style={{ color: DOT.indigo }} />
                  <h2 className="text-[16px] text-neutral-800" style={{ fontWeight: 600 }}>ワークフロー一覧</h2>
                </div>
                <span className="text-[13px] text-neutral-400 px-2.5 py-1 rounded-full bg-neutral-50" style={{ fontWeight: 400 }}>{workflows.length}件</span>
              </div>

              <div className="space-y-3">
                {workflows.map((wf) => {
                  const doneCount = wf.steps.filter(s => s.status === 'done').length;
                  const currentStep = wf.steps.find(s => s.status === 'current');
                  const progress = Math.round(((doneCount + (currentStep ? 0.5 : 0)) / wf.steps.length) * 100);

                  return (
                    <div
                      key={wf.id}
                      className="p-4 rounded-xl border border-neutral-100 hover:border-neutral-300 transition-colors cursor-pointer"
                    >
                      {/* Top row: ID, title, meta */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[12px] text-neutral-400 shrink-0" style={{ fontWeight: 500 }}>{wf.id}</span>
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: wf.color }}
                        />
                        <span className="text-[14px] text-neutral-800 truncate" style={{ fontWeight: 500 }}>{wf.title}</span>
                        <div className="ml-auto flex items-center gap-3 shrink-0">
                          <span className="text-[12px] text-neutral-400" style={{ fontWeight: 400 }}>
                            <Users className="w-3 h-3 inline mr-0.5 -mt-px" />{wf.assignee}
                          </span>
                          <span className="text-[12px] text-neutral-400" style={{ fontWeight: 400 }}>
                            <Clock className="w-3 h-3 inline mr-0.5 -mt-px" />{wf.dueDate}
                          </span>
                          <span
                            className="text-[11px] px-2 py-0.5 rounded-full"
                            style={{ fontWeight: 500, background: `${wf.color}18`, color: wf.color }}
                          >
                            {progress}%
                          </span>
                        </div>
                      </div>

                      {/* Step progress visualization */}
                      <div className="flex items-center gap-0">
                        {wf.steps.map((step, si) => {
                          const isDone = step.status === 'done';
                          const isCurrent = step.status === 'current';
                          const dotBg = isDone ? wf.color : isCurrent ? 'transparent' : '#e5e5e5';
                          const lineColor = isDone ? wf.color : '#e5e5e5';

                          return (
                            <div key={si} className="flex items-center" style={{ flex: si < wf.steps.length - 1 ? 1 : 'none' }}>
                              {/* Step dot + label */}
                              <div className="flex flex-col items-center" style={{ minWidth: 48 }}>
                                <div
                                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                  style={{
                                    background: dotBg,
                                    border: isCurrent ? `2px solid ${wf.color}` : 'none',
                                  }}
                                >
                                  {isDone && <Check className="w-3 h-3 text-white" />}
                                  {isCurrent && <Circle className="w-2 h-2" style={{ fill: wf.color, color: wf.color }} />}
                                </div>
                                <span
                                  className="text-[10px] mt-1 text-center whitespace-nowrap"
                                  style={{
                                    fontWeight: isCurrent ? 600 : 400,
                                    color: isDone || isCurrent ? wf.color : '#a3a3a3',
                                  }}
                                >
                                  {step.label}
                                </span>
                              </div>
                              {/* Connector line */}
                              {si < wf.steps.length - 1 && (
                                <div className="flex-1 h-0.5 rounded-full -mt-4" style={{ background: lineColor, opacity: 0.5 }} />
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
          </motion.div>
        </motion.div>
      )}
          </div>
        );
      })()}
    </motion.div>
  );
}