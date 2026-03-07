import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Building2,
  PartyPopper,
  ShoppingCart,
  BarChart3,
  CalendarDays,
  ChevronLeft,
} from 'lucide-react';

const quickMenu = [
  { icon: LayoutDashboard, label: 'Home',         to: '/home' },
  { icon: Calendar,        label: '来館管理',     to: '/home/visit' },
  { icon: Users,           label: '顧客管理',     to: '/home/hotel' },
  { icon: Building2,       label: '施設・会場管理', to: '/home/venue' },
  { icon: PartyPopper,     label: 'イベント管理', to: '/home/beauty' },
  { icon: ShoppingCart,    label: '発注管理',     to: '/home/photo' },
  { icon: BarChart3,       label: '分析管理',     to: '/home/flower' },
  { icon: CalendarDays,    label: 'スケジュール', to: '/home/schedule' },
];

const DOT = {
  gold:      '#F5C518',
  amberDark: '#E48E20',
  copper:    '#E0962A',
};

export function QuickSideMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
      {/* Slide-out vertical icon panel */}
      <motion.div
        initial={false}
        animate={{ width: open ? 52 : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden"
      >
        <div
          className="w-[52px] bg-white rounded-l-xl border border-r-0 border-neutral-200 flex flex-col items-center py-2.5 gap-0.5 shadow-lg"
        >
          {quickMenu.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.to === '/home'
                ? location.pathname === '/home'
                : location.pathname.startsWith(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                title={item.label}
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-all"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${DOT.gold}, ${DOT.copper})`
                    : 'transparent',
                  color: isActive ? 'white' : '#94A3B8',
                }}
              >
                <Icon className="w-4 h-4" />
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Arrow tab */}
      <button
        onClick={() => setOpen(!open)}
        className="w-5 h-14 bg-white border border-r-0 border-neutral-200 rounded-l-lg flex items-center justify-center cursor-pointer hover:bg-neutral-50 transition-all shadow-sm"
        title="クイックメニュー"
      >
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronLeft className="w-3.5 h-3.5 text-neutral-400" />
        </motion.div>
      </button>
    </div>
  );
}
