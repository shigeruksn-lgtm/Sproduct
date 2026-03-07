import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GridIcon } from '../components/GridIcon';
import {
  Home, Calendar, Bell, ChevronRight,
  LogOut, Gift, Clock, X,
  MapPin, Mail, User, BookOpen,
  Church, Building2, CheckSquare, Users,
  Send, LayoutGrid, FileText, ShoppingBag,
  Music, Receipt, HelpCircle, CalendarCheck,
  ShieldAlert, PartyPopper, PlayCircle,
  ClipboardList, Shirt, Sparkles, Phone,
  Instagram,
} from 'lucide-react';

// ─── カラー定義（ES / CS / PS — 規則統一） ──────────────────────────────────
const ES_COLOR  = '#F5C518';
const CS_COLOR  = '#F0527A';
const CS_DARK   = '#C93060';
const CS_DEEP   = '#8B1A3C';
const PS_COLOR  = '#7E3858';
const PS_DARK   = '#503A6E';
const PS_DEEP   = '#3C2562';

const BRAND_GRAD = `linear-gradient(135deg, ${ES_COLOR} 0%, ${CS_COLOR} 45%, ${PS_COLOR} 80%, ${PS_DEEP} 100%)`;
const CS_GRAD    = `linear-gradient(135deg, ${CS_COLOR} 0%, ${CS_DARK} 55%, ${CS_DEEP} 100%)`;

const MIDNIGHT = '#030213';
// 挙式日（2027年4月1日）と今日から残り日数を計算
const WEDDING_DATE = new Date('2027-04-01');

// ─── Menu ──────────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { icon: ClipboardList, label: 'アンケート',       sub: 'ご要望・満足度回答' },
  { icon: User,          label: 'プロフィール',     sub: 'お客様情報の確認・変更' },
  { icon: Calendar,      label: 'スケジュール',     sub: '打ち合わせ・来館日程' },
  { icon: CheckSquare,   label: 'チェックリスト',   sub: 'タスク・準備チェック' },
  { icon: CalendarCheck, label: '初回打合予約',     sub: 'プランナーとの初回面談' },
  { icon: Users,         label: '列席者情報',       sub: 'ゲスト名簿・人数管理' },
  { icon: Send,          label: 'Web招待状',        sub: 'オンライン招待状の作成' },
  { icon: LayoutGrid,    label: '席次表',           sub: 'テーブル・座席レイアウト' },
  { icon: Gift,          label: '引出物',           sub: 'ギフト・プレゼント選択' },
  { icon: FileText,      label: 'ペーパー',         sub: '式次第・プログラム作成' },
  { icon: ShoppingBag,   label: 'アイテムセレクト', sub: 'ウェディングアイテム選択' },
  { icon: Music,         label: 'BGMセレクト',      sub: '入退場・演出BGM選択' },
  { icon: Receipt,       label: '見積書',           sub: '金額・明細の確認' },
  { icon: ShieldAlert,   label: 'アレルギー',       sub: '食物アレルギー情報' },
  { icon: PartyPopper,   label: 'イベント',         sub: '演出・サプライズ企画' },
  { icon: PlayCircle,    label: '進行',             sub: '式の流れ・タイムライン' },
  { icon: Shirt,         label: '衣装予約',         sub: 'ドレス・タキシード予約' },
  { icon: Sparkles,      label: '美容着付',         sub: 'ヘア・メイク・着付け' },
];

const MENU_COLORS = [
  '#F5C518', //  1 pure gold
  '#F5BE1A', //  2 golden
  '#F4B61E', //  3 golden-amber
  '#F4AD24', //  4 warm amber
  '#F4A42C', //  5 amber
  '#F39838', //  6 amber-orange
  '#F28846', //  7 orange-amber
  '#F07060', //  8 coral
  '#EC527A', //  9 rose
  '#DE4280', // 10 deep rose
  '#C83880', // 11 magenta
  '#AE2E78', // 12 deep magenta
  '#922868', // 13 plum
  '#7A2E60', // 14 dark plum
  '#623060', // 15 purple-plum
  '#4E2C68', // 16 deep purple
  '#3C2562', // 17 navy-purple
  '#2A1A5A', // 18 deep navy
];

// ─── Tabs ──────────────────────────────────────────────────────────────────
const TABS = [
  { icon: Home,     label: 'ホーム',       idx: 0 },
  { icon: Calendar, label: 'スケジュール', idx: 1 },
  { icon: Bell,     label: '通知',         idx: 2 },
  { icon: BookOpen, label: '利用ガイド',   idx: 3 },
];

// ─── Guide content ─────────────────────────────────────────────────────────
const GUIDE_ITEMS = [
  { step: '01', title: 'プロフィールを完成させよう', body: 'お名前・連絡先・希望日程を入力するとプランナーがスムーズにご提案できます。', color: ES_COLOR },
  { step: '02', title: '式場を見学する',             body: 'スケジュールタブから来館予約。見学後にお気に入り登録しておくと比較が楽です。', color: CS_COLOR },
  { step: '03', title: 'お見積もりを確認',            body: '見積書メニューから最新の金額をいつでも確認できます。', color: CS_DARK  },
  { step: '04', title: '担当者へ相談',                body: 'お問い合わせフォームから気軽に質問を送れます。24時間以内にご返答します。', color: PS_COLOR },
];

// ─── Instagram photos ────────────────────────────────────────────────────────
const INSTA_PHOTOS = [
  { url: 'https://images.unsplash.com/photo-1767986012138-4893f40932d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBlbGVnYW50fGVufDF8fHx8MTc3Mjc3ODQ5M3ww&ixlib=rb-4.1.0&q=80&w=400', alt: 'wedding ceremony' },
  { url: 'https://images.unsplash.com/photo-1768777270963-8289ea9d870d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwZGVjb3JhdGlvbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzcyNzk4MTI1fDA&ixlib=rb-4.1.0&q=80&w=400', alt: 'reception flowers' },
  { url: 'https://images.unsplash.com/photo-1769868628482-528d35164ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkYWwlMjBib3VxdWV0JTIwd2hpdGUlMjByb3Nlc3xlbnwxfHx8fDE3NzI3OTgxMjV8MA&ixlib=rb-4.1.0&q=80&w=400', alt: 'bridal bouquet' },
  { url: 'https://images.unsplash.com/photo-1759519238029-689e99c6d19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudUUlMjBpbnRlcmlvciUyMGNoYW5kZWxpZXJ8ZW58MXx8fHwxNzcyNzk4MTI1fDA&ixlib=rb-4.1.0&q=80&w=400', alt: 'venue chandelier' },
  { url: 'https://images.unsplash.com/photo-1762941744800-385b067dff21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwcG9ydHJhaXQlMjBvdXRkb29yfGVufDF8fHx8MTc3Mjc5ODEyNnww&ixlib=rb-4.1.0&q=80&w=400', alt: 'couple portrait' },
  { url: 'https://images.unsplash.com/photo-1584158531321-2a1fefff2e51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGVsZWdhbnQlMjB3aGl0ZXxlbnwxfHx8fDE3NzI3OTEyNTZ8MA&ixlib=rb-4.1.0&q=80&w=400', alt: 'wedding cake' },
];

// ─── Component ─────────────────────────────────────────────────────────────
export default function MyPage() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [sheetMenuOpen, setSheetMenuOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // 今日から挙式日までの日数（ミリ秒差 → 日数に変換）
  const daysToWedding = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = WEDDING_DATE.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, []);

  // ── 共通: サイドバーヘッダー ──
  const SidebarHead = () => (
    <div className="flex items-center justify-between px-6 pt-14 pb-6 border-b border-neutral-100">
      <div className="flex items-center gap-2">
        <GridIcon size={24} pattern="B" />
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
      </div>
      <button onClick={() => setMenuOpen(false)}>
        <X className="w-5 h-5 text-neutral-400" />
      </button>
    </div>
  );

  // ── 共通: ユーザー情報 ──
  const SidebarUser = () => (
    <div className="px-6 py-5 border-b border-neutral-100">
      <p style={{ fontSize: 13, fontWeight: 600, color: MIDNIGHT }}>高橋 太郎 様</p>
      <p style={{ fontSize: 13, fontWeight: 600, color: MIDNIGHT, marginTop: 2 }}>小林 花美 様</p>
      <div className="flex items-center gap-1.5 mt-3">
        <Church className="w-3 h-3" style={{ color: '#94A3B8' }} />
        <p style={{ fontSize: 11, color: '#94A3B8' }}>広尾迎賓館</p>
      </div>
    </div>
  );

  // ── 共通: ログアウト ──
  const SidebarLogout = () => (
    <div className="px-6 pb-10 pt-3 border-t border-neutral-100">
      <button className="flex items-center gap-2 text-neutral-400">
        <LogOut className="w-4 h-4" />
        <span style={{ fontSize: 13, fontWeight: 400 }}>ログアウト</span>
      </button>
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-start justify-center py-12"
      style={{ background: '#F0F1F5', fontFamily: 'DM Sans, sans-serif' }}
    >
      {/* ── スマホフレーム ── */}
      <div
        className="relative overflow-hidden bg-white"
        style={{
          width: 390, height: 844, borderRadius: 44,
          boxShadow: '0 32px 80px rgba(3,2,19,0.18), 0 0 0 10px #1a1a1a, 0 0 0 12px #333',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Dynamic Island */}
        <div className="flex justify-center pt-3 shrink-0" style={{ background: '#fff' }}>
          <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20 }} />
        </div>

        {/* ── Header ── */}
        <header
          className="flex items-center justify-between px-6 pt-3 pb-4 shrink-0"
          style={{ background: '#fff' }}
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
          <div className="flex items-center gap-2">
            {/* グリッドメニュー */}
            <button
              onClick={() => { setMenuOpen(true); setGuideOpen(false); }}
              style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <GridIcon size={28} pattern="B" />
            </button>
          </div>
        </header>

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto" style={{ background: '#F0F1F5' }}>

          {/* ── プロフィールカード ── */}
          <div className="relative mx-4 mt-2 mb-0 rounded-xl overflow-hidden" style={{ height: 200 }}>
            <img
              src="https://images.unsplash.com/photo-1640672245406-f5d43b437c3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFzaWRlJTIwd2VkZGluZyUyMGNoYXBlbCUyMHR1cnF1b2lzZSUyMHdhdGVyJTIwc3Vubnl8ZW58MXx8fHwxNzcyNzk0MDU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="garden chapel"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(3,2,19,0.72) 0%, rgba(3,2,19,0.18) 55%, transparent 100%)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white mb-0.5" style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.6 }}>
                    高橋 太郎 様<br />
                    <span style={{ fontWeight: 600, opacity: 0.88 }}>小林 花美 様</span>
                  </p>
                  <p className="text-white/55" style={{ fontSize: 11 }}>お客様番号: 9112299</p>
                </div>
                <div
                  className="px-3 py-2 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.18)' }}
                >
                  <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', marginBottom: 1 }}>挙会場</p>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>広尾迎賓館</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── ステータスバー ── */}
          <div className="mx-4 mt-3 mb-4 grid grid-cols-3 gap-2">
            {[
              { label: '担当者',   value: '田中 恵',                    sub: 'BO'   },
              { label: '挙式日',   value: '27.04.01',                   sub: '挙式' },
              { label: '挙式まで', value: `${daysToWedding}`,           sub: '日'   },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl px-3 py-3 text-center"
                style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 400, marginBottom: 4 }}>{item.label}</p>
                <p style={{ fontSize: item.label === '担当者' ? 20 : 20, fontWeight: 700, color: MIDNIGHT }}>{item.value}</p>
                <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 400 }}>{item.sub}</p>
              </div>
            ))}
          </div>

          {/* ── 次回の予定 ── */}
          <div className="mx-4 mb-4">
            <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.12em', marginBottom: 8 }}>NEXT APPOINTMENT</p>
            <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: '#7B94B812' }}
                >
                  <Calendar className="w-5 h-5" style={{ color: '#7B94B8' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 600, color: MIDNIGHT }}>式場見学・打ち合わせ</p>
                  <p style={{ fontSize: 11, color: '#64748B', fontWeight: 400, marginTop: 2 }}>2026年3月14日（土）14:00〜</p>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-300 shrink-0" />
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center gap-4">
                <span className="flex items-center gap-1.5" style={{ fontSize: 11, color: '#94A3B8' }}>
                  <MapPin className="w-3.5 h-3.5" />
                  広尾迎賓館
                </span>
                <span className="flex items-center gap-1.5" style={{ fontSize: 11, color: '#94A3B8' }}>
                  <Clock className="w-3.5 h-3.5" />
                  残り 8日
                </span>
              </div>
            </div>
          </div>

          {/* ── コンタクト ── */}
          <div className="mx-4 mb-4">
            <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.12em', marginBottom: 8 }}>CONTACT</p>
            <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              {/* お問い合わせ */}
              <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-neutral-50 transition-colors text-left">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: '#8B7BA812' }}
                >
                  <Mail className="w-4 h-4" style={{ color: '#8B7BA8' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 500, color: MIDNIGHT }}>お問い合わせ</p>
                  <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 400 }}>チャットで担当者に連絡</p>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-300 shrink-0" />
              </button>
              {/* 区切り */}
              <div style={{ height: 1, background: '#F1F5F9', marginLeft: 56 }} />
              {/* よくある質問 */}
              <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-neutral-50 transition-colors text-left">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: '#8FA89812' }}
                >
                  <HelpCircle className="w-4 h-4" style={{ color: '#8FA898' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 500, color: MIDNIGHT }}>よくある質問</p>
                  <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 400 }}>FAQ・よくある疑問をまとめました</p>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-300 shrink-0" />
              </button>
            </div>
          </div>

          {/* ── メニューリスト ── */}
          <div className="mx-4 mb-4">
            <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.12em', marginBottom: 8 }}>MENU</p>
            <div className="grid grid-cols-3 gap-2">
              {MENU_ITEMS.map((item, i) => {
                const Icon = item.icon;
                const color = MENU_COLORS[i];
                return (
                  <button
                    key={item.label}
                    className="flex flex-col items-center gap-2 px-2 py-3.5 rounded-2xl hover:bg-neutral-50 transition-colors text-center"
                    style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${color}22` }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <p style={{ fontSize: 11, fontWeight: 500, color: MIDNIGHT, lineHeight: 1.3 }}>{item.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── アクセスマップ ── */}
          <div className="mx-4 mb-4">
            <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.12em', marginBottom: 8 }}>ACCESS</p>
            <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              {/* Google Map */}
              <div className="relative w-full" style={{ height: 160 }}>
                <iframe
                  title="広尾迎賓館 Google Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=35.6489,139.7181&output=embed&z=17"
                />
              </div>
              {/* 住所 */}
              <div className="px-4 py-3.5 flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${ES_COLOR}18` }}
                >
                  <Building2 className="w-4 h-4" style={{ color: ES_COLOR }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 500, color: MIDNIGHT }}>広尾迎賓館</p>
                  <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 400, marginTop: 1 }}>〒150-0012 東京都渋谷区広尾 5-24-2</p>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-300 shrink-0" />
              </div>
            </div>
          </div>

          {/* ── 式場情報 ── */}
          <div className="mx-4 mb-4">
            <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.12em', marginBottom: 8 }}>VENUE INFO</p>
            <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              {[
                { icon: Clock,   label: '営業時間', value: '10:00 〜 17:00',      color: '#7B94B8' },
                { icon: Calendar,label: '定休日',   value: '月曜・火曜（祝日を除く）', color: '#8B7BA8' },
                { icon: Phone,   label: 'TEL',      value: '03-6456-2995',        color: '#8FA898' },
              ].map((row, i, arr) => {
                const Icon = row.icon;
                return (
                  <div key={row.label}>
                    <div className="flex items-center gap-3 px-4 py-3.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${row.color}18` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: row.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 400, marginBottom: 2 }}>{row.label}</p>
                        <p style={{ fontSize: 13, fontWeight: 500, color: MIDNIGHT }}>{row.value}</p>
                      </div>
                      {row.label === 'TEL' && (
                        <a
                          href="tel:0364562995"
                          className="px-3 py-1.5 rounded-lg"
                          style={{ background: '#8FA89818', fontSize: 11, fontWeight: 600, color: '#8FA898' }}
                        >
                          発信
                        </a>
                      )}
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ height: 1, background: '#F1F5F9', marginLeft: 56 }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── 公式インスタグラム ── */}
          <div className="mx-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.12em' }}>INSTAGRAM</p>
              <div className="flex items-center gap-1">
                <Instagram style={{ width: 10, height: 10, color: '#C13584' }} />
                <span style={{ fontSize: 10, color: '#C13584', fontWeight: 500 }}>@hiroo_geihinkan</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {INSTA_PHOTOS.map((photo, i) => (
                <div
                  key={i}
                  className="overflow-hidden"
                  style={{ aspectRatio: '1 / 1', borderRadius: 6 }}
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── ログアウト ── */}
          <div className="mx-4 mb-8">
            <button
              className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 border border-neutral-200 hover:bg-neutral-50 transition-colors"
              style={{ background: '#fff' }}
            >
              <LogOut className="w-4 h-4 text-neutral-400" />
              <span style={{ fontSize: 13, fontWeight: 500, color: '#94A3B8' }}>ログアウト</span>
            </button>
          </div>
        </div>

        {/* ── ボトムタブ ── */}
        <div
          className="shrink-0 border-t border-neutral-100"
          style={{ background: '#fff', paddingBottom: 24 }}
        >
          <div className="grid grid-cols-5">
            {/* ホーム・スケジュール */}
            {TABS.slice(0, 2).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.idx;
              return (
                <button
                  key={tab.idx}
                  onClick={() => setActiveTab(tab.idx)}
                  className="flex flex-col items-center pt-3 pb-1 gap-1 transition-all"
                >
                  <Icon className="w-5 h-5" style={{ color: isActive ? '#64748B' : '#CBD5E1' }} />
                  <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 400, color: isActive ? MIDNIGHT : '#CBD5E1' }}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="w-4 h-0.5 rounded-full"
                      style={{ background: '#CBD5E1' }}
                    />
                  )}
                </button>
              );
            })}

            {/* 中央メニューボタン（シート） */}
            <button
              onClick={() => { setSheetMenuOpen(true); setGuideOpen(false); setMenuOpen(false); }}
              className="flex flex-col items-center pt-3 pb-1 gap-1 transition-all"
            >
              <GridIcon size={28} pattern="B" />
              <span style={{ fontSize: 9, fontWeight: 500, color: '#CBD5E1' }}>メニュー</span>
            </button>

            {/* 通知・利用ガイド */}
            {TABS.slice(2).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.idx;
              return (
                <button
                  key={tab.idx}
                  onClick={() => {
                    if (tab.idx === 3) { setGuideOpen(true); }
                    else { setActiveTab(tab.idx); }
                  }}
                  className="flex flex-col items-center pt-3 pb-1 gap-1 transition-all"
                >
                  <Icon className="w-5 h-5" style={{ color: isActive ? '#64748B' : '#CBD5E1' }} />
                  <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 400, color: isActive ? MIDNIGHT : '#CBD5E1' }}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="w-4 h-0.5 rounded-full"
                      style={{ background: '#CBD5E1' }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 利用ガイドドロワー ── */}
        {guideOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50"
            style={{ background: 'rgba(3,2,19,0.45)', backdropFilter: 'blur(2px)' }}
            onClick={() => setGuideOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute left-0 right-0 bottom-0 rounded-t-3xl overflow-hidden"
              style={{ background: '#fff', maxHeight: '80%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-neutral-200" />
              </div>
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: CS_GRAD }}>
                    <BookOpen className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: MIDNIGHT }}>利用ガイド</p>
                </div>
                <button onClick={() => setGuideOpen(false)}>
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>
              <div className="overflow-y-auto px-6 py-5 space-y-4" style={{ maxHeight: 480 }}>
                {GUIDE_ITEMS.map((g) => (
                  <div key={g.step} className="flex gap-4">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${g.color}18` }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 800, color: g.color }}>{g.step}</span>
                    </div>
                    <div className="flex-1">
                      <p style={{ fontSize: 13, fontWeight: 600, color: MIDNIGHT, marginBottom: 4 }}>{g.title}</p>
                      <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6 }}>{g.body}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-2 rounded-2xl p-4 border border-neutral-100" style={{ background: '#F8F9FB' }}>
                  <p style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 8 }}>PRODUCT LINE</p>
                  <div className="flex gap-2">
                    {[
                      { id: 'ES', label: 'Experience System', color: ES_COLOR },
                      { id: 'CS', label: 'Customer System',   color: CS_COLOR },
                      { id: 'PS', label: 'Partner System',    color: PS_COLOR },
                    ].map((pl) => (
                      <div key={pl.id} className="flex-1 rounded-xl px-2 py-2 text-center bg-white border border-neutral-100">
                        <p style={{ fontSize: 12, fontWeight: 800, color: pl.color }}>{pl.id}</p>
                        <p style={{ fontSize: 8, color: '#94A3B8', marginTop: 2, lineHeight: 1.3 }}>{pl.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ── フッターメニュー（シート） ── */}
        <AnimatePresence>
          {sheetMenuOpen && (
            <motion.div
              key="sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 z-50"
              style={{ background: 'rgba(3,2,19,0.4)', backdropFilter: 'blur(2px)' }}
              onClick={() => setSheetMenuOpen(false)}
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 32, stiffness: 320 }}
                className="absolute bottom-0 left-0 right-0 flex flex-col rounded-t-3xl overflow-hidden"
                style={{ background: '#fff', maxHeight: '88%', boxShadow: '0 -8px 40px rgba(3,2,19,0.16)' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* ドラッグハンドル */}
                <div className="flex justify-center pt-3 pb-1 shrink-0">
                  <div className="w-10 h-1 rounded-full bg-neutral-200" />
                </div>
                {/* ヘッダー */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 shrink-0">
                  <div className="flex items-center gap-2">
                    <GridIcon size={22} pattern="B" />
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
                  </div>
                  <div className="flex items-center gap-3">
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: MIDNIGHT, textAlign: 'right' }}>高橋 太郎・小林 花美 様</p>
                      <div className="flex items-center justify-end gap-1 mt-0.5">
                        <Church className="w-3 h-3" style={{ color: '#94A3B8' }} />
                        <p style={{ fontSize: 10, color: '#94A3B8' }}>広尾迎賓館</p>
                      </div>
                    </div>
                    <button onClick={() => setSheetMenuOpen(false)}>
                      <X className="w-5 h-5 text-neutral-400" />
                    </button>
                  </div>
                </div>
                {/* 3カラムグリッド */}
                <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8">
                  <div className="grid grid-cols-3 gap-2">
                    {MENU_ITEMS.map((item, i) => {
                      const Icon = item.icon;
                      const color = MENU_COLORS[i];
                      return (
                        <motion.button
                          key={item.label}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.04 + i * 0.022, type: 'spring', damping: 22, stiffness: 280 }}
                          className="flex flex-col items-center gap-2 px-2 py-3.5 rounded-2xl hover:bg-neutral-50 transition-colors text-center"
                          style={{ background: '#F8F9FB' }}
                          onClick={() => setSheetMenuOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}22` }}>
                            <Icon className="w-4 h-4" style={{ color }} />
                          </div>
                          <p style={{ fontSize: 11, fontWeight: 500, color: MIDNIGHT, lineHeight: 1.3 }}>{item.label}</p>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* 閉じるボタン */}
                  <button
                    onClick={() => setSheetMenuOpen(false)}
                    className="w-full mt-4 py-3.5 rounded-2xl flex items-center justify-center gap-2 border border-neutral-200 hover:bg-neutral-100 transition-colors"
                    style={{ background: '#F0F1F5' }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#94A3B8' }}>メニューを閉じる</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── サイドメニュードロワー（スライド） ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 z-50"
              style={{ background: 'rgba(3,2,19,0.4)', backdropFilter: 'blur(2px)' }}
              onClick={() => setMenuOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 280 }}
                className="absolute top-0 right-0 bottom-0 w-72 flex flex-col"
                style={{ background: '#fff' }}
                onClick={(e) => e.stopPropagation()}
              >
                <SidebarHead />
                <SidebarUser />
                <nav className="flex-1 overflow-y-auto py-4 px-4">
                  {MENU_ITEMS.map((item, i) => {
                    const Icon = item.icon;
                    const color = MENU_COLORS[i];
                    return (
                      <button
                        key={item.label}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-neutral-50 transition-colors text-left"
                        onClick={() => setMenuOpen(false)}
                      >
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
                          <Icon className="w-3 h-3" style={{ color }} />
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 500, color: MIDNIGHT }}>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
                <SidebarLogout />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}