import React, { useState, useMemo } from 'react';
import {
  Users, Plus, Search, X, ChevronDown, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, Pencil, Trash2, Star, Filter,
  RotateCcw, Save, Download,
} from 'lucide-react';

// ─── Concept palette ──────────────────────────────────────────────────────────
const C = {
  gold:       '#F5C518',
  amberLight: '#EDAE1C',
  amberDark:  '#E48E20',
  copper:     '#E0962A',
  terracotta: '#D06030',
  sienna:     '#C04A18',
  navy:       '#1B2A5C',
  midnight:   '#030213',
  slate:      '#1e293b',
};

// ─── Types ────────────────────────────────────────────────────────────────────
type StyleType =
  | 'TASCUT連携（来館予）'
  | 'PB連携（来館予）'
  | 'キャンセル売上'
  | '二次会'
  | '披露宴'
  | '1.5次会'
  | '模擬挙式';

interface Customer {
  id: string;
  phd: number;
  shop: string;
  visitDate?: string;
  name: string;
  nameKana?: string;
  boStaff?: string;
  wpStaff?: string;
  style?: StyleType;
  status?: string;
  hopeMonth?: string;
  hasKari: boolean;
  kariDeadline?: string;
  hasNari: boolean;
  implDate?: string;
  startTime?: string;
  venue?: string;
  guests?: number;
  ceremony?: string;
  deposit?: number;
  flagged?: boolean;
  highlight?: 'cancel' | 'amber' | 'none';
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const SHOPS = ['LPH','EXC','CLO','CLG','HFR','SJC','MGH','GOM','JSG'];

const mkId = (n: number) => `C${n}`;

const MOCK_CUSTOMERS: Customer[] = [
  { id:mkId(1),  phd:9112299, shop:'LPH', name:'高橋 美咲 / 山田 浩二',     nameKana:'タカハシ ミサキ', boStaff:'田中', wpStaff:'鈴木', style:'TASCUT連携（来館予）', hopeMonth:'27/08', hasKari:false, hasNari:false, deposit:0, highlight:'none' },
  { id:mkId(2),  phd:9112298, shop:'LPH', name:'伊藤 さくら / 佐藤 健',      nameKana:'イトウ サクラ',   boStaff:'中村', wpStaff:'山本', style:'PB連携（来館予）',    hopeMonth:'27/06', hasKari:false, hasNari:false, deposit:0, highlight:'none' },
  { id:mkId(3),  phd:9112297, shop:'EXC', name:'松本 由美',                  nameKana:'マツモト ユミ',   boStaff:'小林', wpStaff:'',     style:undefined,               hopeMonth:'',      hasKari:false, hasNari:false, deposit:0, highlight:'none' },
  { id:mkId(4),  phd:9112296, shop:'CLO', name:'渡辺 彩 / 田中 大輔',        nameKana:'ワタナベ アヤ',   boStaff:'加藤', wpStaff:'伊藤', style:undefined,               hopeMonth:'26/12', hasKari:false, hasNari:false, deposit:0, highlight:'none' },
  { id:mkId(5),  phd:9112295, shop:'EXC', name:'橋本 奈々',                  nameKana:'ハシモト ナナ',   boStaff:'吉田', wpStaff:'山田', style:'PB連携（来館予）',    hopeMonth:'27/05', hasKari:false, hasNari:false, deposit:0, highlight:'amber', flagged:true },
  { id:mkId(6),  phd:9112294, shop:'EXC', name:'小川 りな / 鈴木 翔',        nameKana:'オガワ リナ',     boStaff:'中島', wpStaff:'',     style:undefined,               hopeMonth:'',      hasKari:false, hasNari:false, deposit:0, highlight:'none' },
  { id:mkId(7),  phd:9112293, shop:'CLG', name:'村田 麻衣',                  nameKana:'ムラタ マイ',     boStaff:'高橋', wpStaff:'斎藤', style:'PB連携（来館予）',    hopeMonth:'',      hasKari:false, hasNari:false, deposit:0, highlight:'none' },
  { id:mkId(8),  phd:9112291, shop:'HFR', name:'大野 千春 / 田村 誠',        nameKana:'オオノ チハル',   boStaff:'松田', wpStaff:'田中', style:undefined,               hopeMonth:'26/10', hasKari:false, hasNari:false, deposit:0, highlight:'none' },
  { id:mkId(9),  phd:9112290, shop:'SJC', name:'藤田 あゆみ / 中村 拓海',    nameKana:'フジタ アユミ',   boStaff:'木村', wpStaff:'渡辺', style:undefined,               hopeMonth:'26/09', hasKari:false, hasNari:false, deposit:0, highlight:'none' },
  { id:mkId(10), phd:9112289, shop:'SJC', visitDate:'25/10/12', name:'青木 真由美 / 西田 健一', nameKana:'アオキ マユミ', boStaff:'佐々木', wpStaff:'小野', style:'キャンセル売上', hopeMonth:'26/09', hasKari:true, kariDeadline:'', hasNari:true, implDate:'26/09/12(土)', startTime:'12:00', venue:'メインホール', guests:80, ceremony:'当館', deposit:0, highlight:'cancel' },
  { id:mkId(11), phd:9112288, shop:'LPH', visitDate:'25/10/12', name:'上田 里奈 / 本田 竜也',  nameKana:'ウエダ リナ',   boStaff:'斎藤', wpStaff:'原',   style:'二次会',      hopeMonth:'26/04', hasKari:true, kariDeadline:'', hasNari:true, implDate:'26/03/28(土)', startTime:'20:00', venue:'ガーデンルーム', guests:45, ceremony:'済', deposit:0, highlight:'none' },
  { id:mkId(12), phd:9112287, shop:'LPH', name:'川島 由紀子 / 平井 大樹',    nameKana:'カワシマ ユキコ', boStaff:'福田', wpStaff:'長谷川', style:'TASCUT連携（来館予）', hopeMonth:'', hasKari:false, hasNari:false, deposit:0, highlight:'none' },
  { id:mkId(13), phd:9112286, shop:'LPH', name:'神田 愛',                    nameKana:'カンダ アイ',     boStaff:'今井', wpStaff:'',     style:'PB連携（来館予）',    hopeMonth:'',      hasKari:false, hasNari:false, deposit:0, highlight:'none' },
  { id:mkId(14), phd:9112285, shop:'SJC', name:'谷口 みほ / 石井 誠',        nameKana:'タニグチ ミホ',   boStaff:'三浦', wpStaff:'福島', style:undefined,               hopeMonth:'',      hasKari:false, hasNari:false, deposit:0, highlight:'none' },
  { id:mkId(15), phd:9112284, shop:'SJC', name:'林 恵美 / 坂本 浩一',        nameKana:'ハヤシ エミ',     boStaff:'宮崎', wpStaff:'村上', style:'キャンセル売上', hopeMonth:'26/08', hasKari:true, hasNari:true, implDate:'26/08/30(日)', startTime:'17:00', venue:'チャペル棟', guests:20, ceremony:'当館', deposit:0, highlight:'cancel' },
  { id:mkId(16), phd:9112282, shop:'SJC', name:'長野 さとみ',                 nameKana:'ナガノ サトミ',   boStaff:'岡本', wpStaff:'',     style:'PB連携（来館予）',    hopeMonth:'',      hasKari:false, hasNari:false, deposit:0, highlight:'none' },
  { id:mkId(17), phd:9112280, shop:'MGH', name:'坂田 花子 / 前田 隆',        nameKana:'サカタ ハナコ',   boStaff:'藤原', wpStaff:'安藤', style:'披露宴',      hopeMonth:'26/06', hasKari:false, hasNari:false, venue:'グランドホール', guests:15, ceremony:'当館', deposit:0, highlight:'none' },
  { id:mkId(18), phd:9112278, shop:'GOM', name:'池田 菜々子 / 岡田 正',      nameKana:'イケダ ナナコ',   boStaff:'丸山', wpStaff:'',     style:undefined,               hopeMonth:'27/07', hasKari:false, hasNari:false, deposit:0, highlight:'none' },
  { id:mkId(19), phd:9112277, shop:'JSG', name:'中井 美里',                  nameKana:'ナカイ ミサト',   boStaff:'西村', wpStaff:'',     style:undefined,               hopeMonth:'',      hasKari:false, hasNari:false, deposit:0, highlight:'none' },
  { id:mkId(20), phd:9112276, shop:'CLO', name:'永田 ゆき / 岩田 純',        nameKana:'ナガタ ユキ',     boStaff:'濱田', wpStaff:'原田', style:undefined,               hopeMonth:'27/05', hasKari:false, hasNari:false, deposit:0, highlight:'none' },
];

// ─── Style badge config ───────────────────────────────────────────────────────
const STYLE_CFG: Record<string, { bg: string; text: string; short?: string }> = {
  'TASCUT連携（来館予）': { bg: '#EEF2FF', text: '#4338CA' },
  'PB連携（来館予）':     { bg: '#FEF3C7', text: '#92400E' },
  'キャンセル売上':       { bg: '#FEE2E2', text: '#991B1B' },
  '二次会':               { bg: '#E0F2FE', text: '#0369A1' },
  '披露宴':               { bg: '#F0FDF4', text: '#166534' },
  '1.5次会':              { bg: '#FDF4FF', text: '#7E22CE' },
  '模擬挙式':             { bg: '#FFF7ED', text: '#9A3412' },
};

// ─── Tab definitions ──────────────────────────────────────────────────────────
const MAIN_TABS = [
  'パーティ', '希望状況', '契約関連', '個人', 'PLANNING', 'FAN',
  '来館予約', '会場予約', 'フォーム', '企画演出',
];

const QUICK_FILTERS = ['最近閲覧', '自社新規', '新規全体', '自社施行', '全施行', '更新一覧', '実売日達', '仮期限切'];

const PAGE_SIZES = [20, 50, 100];

// ─── Component ────────────────────────────────────────────────────────────────
export default function CustomerManagement() {
  const [activeTab,    setActiveTab]    = useState('パーティ');
  const [searchOpen,   setSearchOpen]   = useState(true);
  const [matchAll,     setMatchAll]     = useState(true);
  const [searchText,   setSearchText]   = useState('');
  const [shopFilter,   setShopFilter]   = useState<string>('');
  const [activeQuick,  setActiveQuick]  = useState<string | null>(null);
  const [page,         setPage]         = useState(1);
  const [pageSize,     setPageSize]     = useState(20);
  const [selected,     setSelected]     = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let list = [...MOCK_CUSTOMERS];
    if (searchText.trim()) {
      const q = searchText.trim().toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.nameKana?.toLowerCase().includes(q) ||
        String(c.phd).includes(q)
      );
    }
    if (shopFilter) list = list.filter(c => c.shop === shopFilter);
    return list;
  }, [searchText, shopFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated  = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const toggleAll = () => {
    if (selected.size === paginated.length) setSelected(new Set());
    else setSelected(new Set(paginated.map(c => c.id)));
  };

  const hlBg = (hl?: string) => {
    if (hl === 'cancel') return 'rgba(208,96,48,0.06)';
    if (hl === 'amber')  return 'rgba(237,174,28,0.08)';
    return 'transparent';
  };

  return (
    <div className="flex flex-col h-full gap-0" style={{ fontFamily: 'DM Sans, sans-serif' }}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm text-neutral-800" style={{ fontWeight: 600 }}>顧客管理</h1>
            <p className="text-[10px] text-neutral-400" style={{ fontWeight: 400 }}>CUSTOMER</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-all"
            style={{ fontSize: 12 }}
          >
            <Download className="w-3.5 h-3.5" />
            CSV出力
          </button>
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${C.amberLight} 0%, ${C.amberDark} 60%, ${C.copper} 100%)`,
              fontSize: 12, fontWeight: 600,
              boxShadow: `0 2px 8px ${C.amberLight}55`,
            }}
          >
            <Plus className="w-3.5 h-3.5" />
            新規登録
          </button>
        </div>
      </div>

      {/* ── Quick filter chips ── */}
      <div className="flex items-center gap-1.5 mb-3 shrink-0 flex-wrap">
        {QUICK_FILTERS.map(q => (
          <button
            key={q}
            onClick={() => setActiveQuick(prev => prev === q ? null : q)}
            className="px-3 py-1 rounded-full transition-all"
            style={{
              fontSize: 11, fontWeight: activeQuick === q ? 600 : 400,
              background: activeQuick === q
                ? `linear-gradient(135deg, ${C.amberLight}, ${C.copper})`
                : '#F1F5F9',
              color: activeQuick === q ? 'white' : '#64748B',
              border: `1px solid ${activeQuick === q ? C.amberDark : '#E2E8F0'}`,
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* ── Search panel ── */}
      <div
        className="rounded-xl border mb-3 shrink-0 overflow-hidden"
        style={{ borderColor: '#E2E8F0', background: '#FAFBFC' }}
      >
        {/* Search header row */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                style={{ borderColor: matchAll ? C.amberDark : '#CBD5E1' }}
              >
                {matchAll && <div className="w-2 h-2 rounded-full" style={{ background: C.amberDark }} />}
              </div>
              <button onClick={() => setMatchAll(true)} className="text-neutral-600" style={{ fontSize: 12 }}>
                すべての条件に一致する
              </button>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                style={{ borderColor: !matchAll ? C.amberDark : '#CBD5E1' }}
              >
                {!matchAll && <div className="w-2 h-2 rounded-full" style={{ background: C.amberDark }} />}
              </div>
              <button onClick={() => setMatchAll(false)} className="text-neutral-600" style={{ fontSize: 12 }}>
                一部の条件に一致する
              </button>
            </label>
          </div>
          <button className="ml-auto text-neutral-400 hover:text-neutral-600 transition-colors" style={{ fontSize: 11 }}>
            <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3" />検索条件クリア</span>
          </button>
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
            style={{ background: C.midnight, fontSize: 12 }}
          >
            <Search className="w-3.5 h-3.5" />
            検索
          </button>
          <button className="flex items-center gap-1 text-neutral-500 hover:text-neutral-700 border border-neutral-200 rounded-lg px-3 py-1.5 transition-all hover:bg-white" style={{ fontSize: 12 }}>
            <Save className="w-3.5 h-3.5" />
            検索パターンリスト
          </button>
          <button className="flex items-center gap-1 text-neutral-500 hover:text-neutral-700 border border-neutral-200 rounded-lg px-3 py-1.5 transition-all hover:bg-white" style={{ fontSize: 12 }}>
            <Star className="w-3.5 h-3.5" />
            検索パターンとして保存
          </button>
        </div>

        {/* Search fields */}
        <div className="flex items-center gap-4 px-4 py-2.5">
          {/* Date filter */}
          <div className="flex items-center gap-2">
            <select className="text-neutral-700 bg-transparent border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1" style={{ fontSize: 12 }}>
              <option>実施日</option>
              <option>来館日</option>
              <option>仮予約締切日</option>
            </select>
            <select className="text-neutral-700 bg-transparent border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1" style={{ fontSize: 12 }}>
              <option>期間指定</option>
              <option>月指定</option>
            </select>
            <span className="text-neutral-400" style={{ fontSize: 12 }}>From</span>
            <input type="date" defaultValue="2026-03-01"
              className="border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 text-neutral-700"
              style={{ fontSize: 12 }} />
            <span className="text-neutral-400" style={{ fontSize: 12 }}>〜</span>
            <span className="text-neutral-400" style={{ fontSize: 12 }}>To</span>
            <input type="date" defaultValue="2026-03-31"
              className="border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 text-neutral-700"
              style={{ fontSize: 12 }} />
          </div>

          {/* Navigation quick dates */}
          <div className="flex items-center gap-1">
            {['先週','今週','来週'].map(l => (
              <button key={l} className="px-2 py-1 rounded text-neutral-400 hover:bg-neutral-100 transition-all" style={{ fontSize: 11 }}>{l}</button>
            ))}
          </div>
          <div className="w-px h-5 bg-neutral-200" />
          <div className="flex items-center gap-1">
            {['先月','今月','来月'].map(l => (
              <button key={l} className="px-2 py-1 rounded text-neutral-400 hover:bg-neutral-100 transition-all" style={{ fontSize: 11 }}>{l}</button>
            ))}
          </div>
          <div className="w-px h-5 bg-neutral-200" />
          <div className="flex items-center gap-1">
            {['今月前半','今月後半'].map(l => (
              <button key={l} className="px-2 py-1 rounded text-neutral-400 hover:bg-neutral-100 transition-all" style={{ fontSize: 11 }}>{l}</button>
            ))}
          </div>

          {/* Status dot */}
          <div className="w-3 h-3 rounded-full shrink-0" style={{ background: C.amberLight }} />

          {/* Text search */}
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-300" />
              <input
                type="text"
                placeholder="お客様名・PHD・フリガナ"
                value={searchText}
                onChange={e => { setSearchText(e.target.value); setPage(1); }}
                className="pl-8 pr-8 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 placeholder-neutral-300 focus:outline-none focus:ring-1 focus:border-amber-300"
                style={{ fontSize: 12, width: 200 }}
              />
              {searchText && (
                <button onClick={() => setSearchText('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-neutral-500">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <select
              value={shopFilter}
              onChange={e => { setShopFilter(e.target.value); setPage(1); }}
              className="border border-neutral-200 rounded-lg px-2.5 py-1.5 text-neutral-700 bg-white focus:outline-none focus:ring-1"
              style={{ fontSize: 12 }}
            >
              <option value="">店舗：全て</option>
              {SHOPS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ── Section tabs ── */}
      <div className="flex items-center gap-0 border-b border-neutral-200 shrink-0 mb-0">
        {MAIN_TABS.map(tab => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-4 py-2.5 transition-all whitespace-nowrap"
              style={{
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? C.midnight : '#94A3B8',
                borderBottom: isActive ? `2px solid ${C.amberDark}` : '2px solid transparent',
                background: isActive
                  ? `linear-gradient(to bottom, rgba(237,174,28,0.04), transparent)`
                  : 'transparent',
              }}
            >
              {tab}
            </button>
          );
        })}
        <button className="ml-auto mr-2 w-6 h-6 flex items-center justify-center rounded text-neutral-300 hover:text-neutral-500 hover:bg-neutral-100">
          <Star className="w-3.5 h-3.5" />
        </button>
        <button className="mr-2 w-6 h-6 flex items-center justify-center rounded text-neutral-300 hover:text-neutral-500 hover:bg-neutral-100">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 min-h-0 overflow-auto bg-white border border-neutral-200 border-t-0 rounded-b-xl">
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 1400 }}>
          <thead>
            <tr style={{ background: '#FAFAFA', borderBottom: '1px solid #E5E7EB' }}>
              {/* Checkbox */}
              <th style={{ width: 36, padding: '8px 8px', textAlign: 'center', position: 'sticky', top: 0, zIndex: 20, background: '#FAFAFA', borderBottom: '1px solid #E5E7EB' }}>
                <input
                  type="checkbox"
                  checked={selected.size === paginated.length && paginated.length > 0}
                  onChange={toggleAll}
                  className="rounded"
                  style={{ accentColor: C.amberDark }}
                />
              </th>
              {[
                { label: 'PHD',     w: 76 },
                { label: '店舗',    w: 54 },
                { label: '来館日',  w: 74 },
                { label: 'お客様名', w: 200 },
                { label: '接客BO',  w: 60 },
                { label: '担当WP',  w: 60 },
                { label: 'スタイル', w: 130 },
                { label: '状況',    w: 60 },
                { label: '希望月',  w: 60 },
                { label: '仮',      w: 30 },
                { label: '仮予約締切日', w: 96 },
                { label: '成',      w: 30 },
                { label: '実施日',  w: 110 },
                { label: '開始',    w: 56 },
                { label: '会場',    w: 96 },
                { label: '人数',    w: 48 },
                { label: '挙式',    w: 60 },
                { label: '予金',    w: 48 },
                { label: '',        w: 64 },
              ].map((col, i) => (
                <th
                  key={i}
                  style={{
                    width: col.w, minWidth: col.w,
                    padding: '8px 6px',
                    textAlign: 'left',
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#6B7280',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                    position: 'sticky', top: 0, zIndex: 20,
                    background: '#FAFAFA',
                    borderBottom: '1px solid #E5E7EB',
                    cursor: col.label ? 'pointer' : 'default',
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((c, idx) => {
              const isSelected = selected.has(c.id);
              const bg = isSelected ? `rgba(237,174,28,0.07)` : hlBg(c.highlight);
              const styleCfg = c.style ? STYLE_CFG[c.style] : null;
              return (
                <tr
                  key={c.id}
                  style={{
                    background: bg,
                    borderBottom: '1px solid #F1F5F9',
                    transition: 'background 0.15s',
                  }}
                  className="hover:bg-amber-50/30 group"
                >
                  {/* Checkbox */}
                  <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(c.id)}
                      style={{ accentColor: C.amberDark }}
                    />
                  </td>

                  {/* PHD */}
                  <td style={{ padding: '6px 6px', fontSize: 12, color: '#475569', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                    <button
                      className="hover:underline transition-all"
                      style={{ color: C.navy, fontWeight: 500 }}
                    >
                      {c.phd}
                    </button>
                  </td>

                  {/* Shop */}
                  <td style={{ padding: '6px 6px' }}>
                    <span
                      className="px-1.5 py-0.5 rounded"
                      style={{
                        fontSize: 10, fontWeight: 600,
                        background: '#F1F5F9',
                        color: '#475569',
                      }}
                    >
                      {c.shop}
                    </span>
                  </td>

                  {/* Visit date */}
                  <td style={{ padding: '6px 6px', fontSize: 11, color: '#94A3B8', whiteSpace: 'nowrap' }}>
                    {c.visitDate ?? ''}
                  </td>

                  {/* Name */}
                  <td style={{ padding: '6px 6px' }}>
                    <div>
                      <button className="hover:underline text-left" style={{ fontSize: 13, fontWeight: 500, color: '#1E293B' }}>
                        <span style={{ filter: 'blur(5px)', userSelect: 'none' }}>{c.name}</span>
                      </button>
                      {c.nameKana && (
                        <p style={{ fontSize: 10, color: '#94A3B8', marginTop: 1, filter: 'blur(4px)', userSelect: 'none' }}>{c.nameKana}</p>
                      )}
                    </div>
                  </td>

                  {/* BO */}
                  <td style={{ padding: '6px 6px', fontSize: 12, color: '#64748B' }}>{c.boStaff ?? ''}</td>

                  {/* WP */}
                  <td style={{ padding: '6px 6px', fontSize: 12, color: '#64748B' }}>{c.wpStaff ?? ''}</td>

                  {/* Style */}
                  <td style={{ padding: '6px 6px' }}>
                    {styleCfg && (
                      <span
                        className="px-2 py-0.5 rounded-full text-center inline-block leading-tight"
                        style={{
                          fontSize: 10, fontWeight: 500,
                          background: styleCfg.bg,
                          color: styleCfg.text,
                          maxWidth: 120,
                        }}
                      >
                        {c.style}
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td style={{ padding: '6px 6px', fontSize: 11, color: '#94A3B8' }}>{c.status ?? ''}</td>

                  {/* Hope month */}
                  <td style={{ padding: '6px 6px', fontSize: 12, color: '#475569', fontVariantNumeric: 'tabular-nums' }}>
                    {c.hopeMonth}
                  </td>

                  {/* Kari */}
                  <td style={{ padding: '6px 6px', textAlign: 'center' }}>
                    {c.hasKari && (
                      <span style={{ fontSize: 11, fontWeight: 700, color: C.terracotta }}>有</span>
                    )}
                  </td>

                  {/* Kari deadline */}
                  <td style={{ padding: '6px 6px', fontSize: 11, color: '#94A3B8', whiteSpace: 'nowrap' }}>
                    {c.kariDeadline ?? ''}
                  </td>

                  {/* Nari */}
                  <td style={{ padding: '6px 6px', textAlign: 'center' }}>
                    {c.hasNari && (
                      <span style={{ fontSize: 11, fontWeight: 700, color: C.terracotta }}>有</span>
                    )}
                  </td>

                  {/* Impl date */}
                  <td style={{ padding: '6px 6px', fontSize: 11, color: '#475569', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                    {c.implDate ?? ''}
                  </td>

                  {/* Start time */}
                  <td style={{ padding: '6px 6px', fontSize: 11, color: '#64748B', fontVariantNumeric: 'tabular-nums' }}>
                    {c.startTime ?? ''}
                  </td>

                  {/* Venue */}
                  <td style={{ padding: '6px 6px', fontSize: 11, color: '#64748B', whiteSpace: 'nowrap' }}>
                    {c.venue ?? ''}
                  </td>

                  {/* Guests */}
                  <td style={{ padding: '6px 6px', fontSize: 12, color: '#475569', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {c.guests != null ? c.guests : 0}
                  </td>

                  {/* Ceremony */}
                  <td style={{ padding: '6px 6px', fontSize: 11, color: '#64748B' }}>
                    {c.ceremony ?? ''}
                  </td>

                  {/* Deposit */}
                  <td style={{ padding: '6px 6px', fontSize: 12, color: '#475569', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {c.deposit ?? 0}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '6px 8px', textAlign: 'right' }}>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="w-6 h-6 rounded flex items-center justify-center transition-all hover:bg-amber-50"
                        title="編集"
                        style={{ color: C.amberDark }}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        className="w-6 h-6 rounded flex items-center justify-center transition-all hover:bg-red-50"
                        title="削除"
                        style={{ color: '#F87171' }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between pt-3 shrink-0">
        {/* Left: page size + count */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: 12, color: '#94A3B8' }}>表示数</span>
            <div className="relative">
              <select
                value={pageSize}
                onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
                className="appearance-none border border-neutral-200 rounded-lg pl-3 pr-6 py-1.5 text-neutral-600 bg-white focus:outline-none"
                style={{ fontSize: 12 }}
              >
                {PAGE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-400 pointer-events-none" />
            </div>
          </div>
          <span style={{ fontSize: 12, color: '#94A3B8' }}>
            合計：<span style={{ fontWeight: 600, color: '#475569' }}>{filtered.length.toLocaleString()}</span>件
          </span>
          {selected.size > 0 && (
            <span className="px-2 py-0.5 rounded-full text-white" style={{ fontSize: 11, background: C.amberDark }}>
              {selected.size}件選択中
            </span>
          )}
        </div>

        {/* Right: page buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="w-7 h-7 flex items-center justify-center rounded-lg transition-all disabled:opacity-30 hover:bg-neutral-100"
          >
            <ChevronsLeft className="w-3.5 h-3.5 text-neutral-500" />
          </button>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-7 h-7 flex items-center justify-center rounded-lg transition-all disabled:opacity-30 hover:bg-neutral-100"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-neutral-500" />
          </button>

          {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="w-7 h-7 flex items-center justify-center rounded-lg transition-all"
              style={{
                fontSize: 12,
                background: p === page
                  ? `linear-gradient(135deg, ${C.amberLight}, ${C.copper})`
                  : 'transparent',
                color: p === page ? 'white' : '#6B7280',
                fontWeight: p === page ? 600 : 400,
              }}
            >
              {p}
            </button>
          ))}

          {totalPages > 10 && (
            <>
              <span className="text-neutral-300 text-sm">…</span>
              <button
                onClick={() => setPage(totalPages)}
                className="w-7 h-7 flex items-center justify-center rounded-lg transition-all hover:bg-neutral-100"
                style={{ fontSize: 12, color: '#6B7280' }}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="w-7 h-7 flex items-center justify-center rounded-lg transition-all disabled:opacity-30 hover:bg-neutral-100"
          >
            <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages || totalPages === 0}
            className="w-7 h-7 flex items-center justify-center rounded-lg transition-all disabled:opacity-30 hover:bg-neutral-100"
          >
            <ChevronsRight className="w-3.5 h-3.5 text-neutral-500" />
          </button>
        </div>
      </div>
    </div>
  );
}