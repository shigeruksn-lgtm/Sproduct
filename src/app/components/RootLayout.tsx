import { Outlet, NavLink } from 'react-router';
import { GridIcon } from './GridIcon';

const tabs = [
  { label: 'Concept', to: '/concept' },
  { label: 'ƐS PV', to: '/pv' },
  { label: 'ƐS Site', to: '/showcase' },
  { label: 'System', to: '/system' },
  // { label: 'Mascot', to: '/mascot' },
];

export default function RootLayout() {
  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', position: 'relative' }}>
      {/* ===== Global Tab Nav ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-14 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
          <GridIcon size={24} pattern="B" />
          <span className="text-sm tracking-wide text-neutral-700" style={{ fontWeight: 500 }}>
            ƐS Product
          </span>
        </NavLink>

        {/* Tabs */}
        <nav className="flex items-center gap-1">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.to === '/'}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-full text-sm tracking-wide transition-all ${
                  isActive
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="shrink-0 px-5 py-1.5 rounded-full text-sm tracking-wide border border-neutral-300 text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all"
        >
          お問い合わせ
        </a>
      </header>

      {/* Page content */}
      <div className="pt-14" style={{ position: 'relative' }}>
        <Outlet />
      </div>
    </div>
  );
}