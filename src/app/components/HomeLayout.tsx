import { Outlet, NavLink, Link } from 'react-router';
import { GridIcon, ProductLineBadge } from './GridIcon';
import { QuickSideMenu } from './QuickSideMenu';
import { SchedulePopup } from './SchedulePopup';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Building2,
  PartyPopper,
  ShoppingCart,
  BarChart3,
  Database,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Cloud,
  Sun,
  Bell,
  CalendarDays,
  MessageSquare,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const brandGrad = 'linear-gradient(135deg, #F5C518 0%, #C0392B 50%, #3C2562 100%)';
const textGradStyle: React.CSSProperties = {
  backgroundImage: brandGrad,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const mainMenu = [
  { icon: LayoutDashboard, label: 'Home',           to: '/home' },
  { icon: Calendar,        label: '来館管理',       to: '/home/visit' },
  { icon: Users,           label: '顧客管理',       to: '/home/hotel' },
  { icon: Building2,       label: '施設・会場管理', to: '/home/venue' },
  { icon: PartyPopper,     label: 'イベント管理',   to: '/home/event' },
  { icon: ShoppingCart,    label: '発注管理',       to: '/home/photo' },
  { icon: BarChart3,       label: '分析管理',       to: '/home/flower' },
  { icon: CalendarDays,    label: 'スケジュール',   to: '/home/schedule' },
];

const subMenu = [
  { icon: Database,    label: 'マスタ管理',   to: '/home/master' },
  { icon: Settings,    label: '設定',         to: '/home/settings' },
  { icon: HelpCircle,  label: 'ヘルプ',       to: '/home/help' },
];

const MODES = [
  { code: 'Br', label: '婚礼' },
  { code: 'Gp', label: '宴会' },
  { code: 'Dr', label: '衣裳' },
  { code: 'Et', label: '美容' },
  { code: 'Ph', label: '写真' },
  { code: 'Fl', label: '装花' },
];

export default function HomeLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [weather, setWeather] = useState<{ temp: number; desc: string; icon: 'sun' | 'cloud' } | null>(null);
  const [currentMode, setCurrentMode] = useState('Br');
  const [modeOpen, setModeOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const modeRef = useRef<HTMLDivElement>(null);

  // Close mode picker on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modeRef.current && !modeRef.current.contains(e.target as Node)) {
        setModeOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    // Fetch Hiroo weather from Open-Meteo (no API key needed)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=35.6503&longitude=139.7225&current_weather=true&timezone=Asia%2FTokyo')
      .then(res => res.json())
      .then(data => {
        const cw = data.current_weather;
        const code = cw?.weathercode ?? 0;
        const isSunny = code <= 1;
        setWeather({
          temp: Math.round(cw?.temperature ?? 0),
          desc: isSunny ? '晴れ' : code <= 3 ? '曇り' : '雨',
          icon: isSunny ? 'sun' : 'cloud',
        });
      })
      .catch(() => setWeather({ temp: 18, desc: '晴れ', icon: 'sun' }));
  }, []);

  return (
    <div
      className="relative min-h-screen flex bg-neutral-100"
      style={{ fontFamily: 'DM Sans, sans-serif' }}
    >
      {/* ===== Sidebar ===== */}
      <aside
        className={`fixed top-0 left-0 h-screen z-40 flex flex-col bg-white border-r border-neutral-200 transition-all duration-300 ${
          collapsed ? 'w-[68px]' : 'w-[240px]'
        }`}
      >
        {/* Logo area */}
        <div className={`flex items-center h-14 border-b border-neutral-100 shrink-0 ${collapsed ? 'justify-center px-0' : 'px-5'}`}>
          <Link to="/home" className="flex items-center gap-2.5 overflow-hidden">
            <GridIcon size={24} pattern="B" />
            {!collapsed && (
              <span
                className="text-xs tracking-[0.15em] uppercase whitespace-nowrap"
                style={{ ...textGradStyle, fontWeight: 600 }}
              >
                ƐS Product
              </span>
            )}
          </Link>
        </div>

        {/* Main nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className={`mb-3 ${collapsed ? 'px-2' : 'px-4'}`}>
            {!collapsed && (
              <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-2 px-2" style={{ fontWeight: 600 }}>
                Menu
              </p>
            )}
            <ul className="space-y-0.5">
              {mainMenu.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/home'}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg transition-all ${
                          collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5'
                        } ${
                          isActive
                            ? 'bg-slate-700 text-white'
                            : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {!collapsed && (
                        <span className="text-xs whitespace-nowrap" style={{ fontWeight: 400 }}>
                          {item.label}
                        </span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Divider */}
          <div className="mx-4 border-t border-neutral-100 my-3" />

          <div className={`${collapsed ? 'px-2' : 'px-4'}`}>
            {!collapsed && (
              <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-2 px-2" style={{ fontWeight: 600 }}>
                Other
              </p>
            )}
            <ul className="space-y-0.5">
              {subMenu.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg transition-all ${
                          collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5'
                        } ${
                          isActive
                            ? 'bg-slate-700 text-white'
                            : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {!collapsed && (
                        <span className="text-xs whitespace-nowrap" style={{ fontWeight: 400 }}>
                          {item.label}
                        </span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Bottom area */}
        <div className={`border-t border-neutral-100 py-3 shrink-0 ${collapsed ? 'px-2' : 'px-4'}`}>
          {/* Back to site link */}
          <Link
            to="/system"
            className={`flex items-center gap-2 rounded-lg py-2.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 transition-all ${
              collapsed ? 'justify-center px-0' : 'px-3'
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && (
              <span className="text-xs whitespace-nowrap" style={{ fontWeight: 400 }}>サイトへ戻る</span>
            )}
          </Link>

          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`flex items-center gap-2 rounded-lg py-2 w-full text-neutral-300 hover:text-neutral-600 transition-all ${
              collapsed ? 'justify-center px-0' : 'px-3'
            }`}
          >
            <ChevronLeft className={`w-4 h-4 shrink-0 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
            {!collapsed && (
              <span className="text-xs whitespace-nowrap" style={{ fontWeight: 400 }}>折りたたむ</span>
            )}
          </button>
        </div>
      </aside>

      {/* ===== Main content area ===== */}
      <div className={`flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300 ${collapsed ? 'ml-[68px]' : 'ml-[240px]'}`}>
        {/* Top bar */}
        <header className="h-14 flex items-center justify-between px-8 bg-white border-b border-neutral-200 shrink-0">
          {/* Current mode & office */}
          <div className="flex items-center gap-3">
            {/* ES product line badge */}
            <ProductLineBadge lineId="ES" size={28} pattern="B" variant="outline" />
            <div ref={modeRef} className="relative flex items-center">
              <button
                onClick={() => setModeOpen(!modeOpen)}
                className="flex items-center gap-0 cursor-pointer group rounded-full overflow-hidden"
                style={{ boxShadow: 'inset 0 0 0 1px #e0e0e0' }}
              >
                <div
                  className="h-7 px-2.5 flex items-center rounded-l-full"
                  style={{ background: '#1e293b' }}
                >
                  <span className="text-[10px] tracking-[0.12em] text-white" style={{ fontWeight: 600 }}>{currentMode}</span>
                </div>
                <div
                  className="h-7 px-3 flex items-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(245,197,24,0.05) 0%, rgba(27,42,92,0.05) 100%)',
                  }}
                >
                  <span className="text-[11px] text-neutral-500 tracking-wide" style={{ fontWeight: 400 }}>
                    {MODES.find(m => m.code === currentMode)?.label ?? ''}モード
                  </span>
                </div>
              </button>

              {/* Mode picker dropdown */}
              {modeOpen && (
                <div
                  className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-neutral-100 py-2 px-1 z-50"
                  style={{ minWidth: 140 }}
                >
                  {MODES.map((m) => (
                    <button
                      key={m.code}
                      onClick={() => { setCurrentMode(m.code); setModeOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-left ${
                        currentMode === m.code
                          ? 'bg-slate-700 text-white'
                          : 'text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: currentMode === m.code ? 'rgba(255,255,255,0.2)' : '#1e293b' }}
                      >
                        <span className="text-[8px] text-white" style={{ fontWeight: 600 }}>{m.code}</span>
                      </div>
                      <span className="text-[11px] tracking-wide" style={{ fontWeight: 500 }}>{m.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div
              className="flex items-center gap-0 rounded-full overflow-hidden"
              style={{ boxShadow: 'inset 0 0 0 1px #e0e0e0' }}
            >
              <div
                className="h-7 px-2.5 flex items-center rounded-l-full"
                style={{ background: '#1e293b' }}
              >
                <span className="text-[10px] tracking-[0.12em] text-white" style={{ fontWeight: 600 }}>MIT</span>
              </div>
              <div
                className="h-7 px-3 flex items-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(245,197,24,0.05) 0%, rgba(27,42,92,0.05) 100%)',
                }}
              >
                <span className="text-[11px] text-neutral-500 tracking-wide" style={{ fontWeight: 400 }}>MakeIT</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Schedule link */}
            <div className="relative">
              <button
                onClick={() => setScheduleOpen(v => !v)}
                className={`relative transition-colors ${scheduleOpen ? 'text-slate-700' : 'text-neutral-400 hover:text-neutral-600'}`}
                title="スケジュール"
              >
                <CalendarDays className="w-[18px] h-[18px]" />
                {scheduleOpen && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-slate-700" />
                )}
              </button>
            </div>
            {/* Message & Workflow notifications */}
            <button className="relative text-neutral-400 hover:text-neutral-600 transition-colors" title="メッセージ・ワークフロー">
              <MessageSquare className="w-[18px] h-[18px]" />
              <span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-white"
                style={{ background: '#C0392B' }}
              />
            </button>
            {/* Notification bell */}
            <button className="relative text-neutral-400 hover:text-neutral-600 transition-colors">
              <Bell className="w-[18px] h-[18px]" />
              <span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-white"
                style={{ background: '#C0392B' }}
              />
            </button>
            {/* Weather for Hiroo */}
            {weather && (
              <div className="flex items-center gap-1.5 text-neutral-500">
                {weather.icon === 'sun' ? (
                  <Sun className="w-4 h-4" style={{ color: '#F5C518' }} />
                ) : (
                  <Cloud className="w-4 h-4" />
                )}
                <span className="text-xs" style={{ fontWeight: 400 }}>
                  広尾 {weather.temp}°C
                </span>
                <span className="text-[10px] text-neutral-400" style={{ fontWeight: 300 }}>
                  {weather.desc}
                </span>
              </div>
            )}
            {/* Login user */}
            <div className="flex flex-col items-end">
              <span className="text-[12px] text-neutral-700" style={{ fontWeight: 500 }}>草野 繁</span>
              <span className="text-[10px] text-neutral-400" style={{ fontWeight: 400 }}>システム管理者</span>
            </div>
            {/* Avatar */}
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocIgSIninB2fGT3ZBLTLxnLUuaDwkqhWKP0afP-MZbJObXt2wB4=s576-c-no"
              alt="User avatar"
              className="w-8 h-8 rounded-full object-cover border border-neutral-200"
            />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8 min-w-0 overflow-hidden relative">
          <Outlet context={{ collapsed }} />
        </main>
      </div>

      {/* Quick side menu — visible on all home pages */}
      <QuickSideMenu />

      {/* Schedule full-screen overlay */}
      <SchedulePopup open={scheduleOpen} onClose={() => setScheduleOpen(false)} sidebarWidth={collapsed ? 68 : 240} />
    </div>
  );
}