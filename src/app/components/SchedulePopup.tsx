import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CalendarDays, ExternalLink, GripHorizontal } from 'lucide-react';
import { Link } from 'react-router';
import { ScheduleContent } from '../pages/Schedule';

const HEADER_H   = 56;  // HomeLayout top bar
const PANEL_BAR  = 48;  // SchedulePopup inner header bar
const MIN_TOP    = HEADER_H + 40;   // 最小：ヘッダー直下+40px
const MAX_TOP    = window.innerHeight - 160; // 最大：下から160px残す
const DEFAULT_TOP = HEADER_H;       // 初期：全画面

interface SchedulePopupProps {
  open: boolean;
  onClose: () => void;
  sidebarWidth: number; // 240 or 68
}

export function SchedulePopup({ open, onClose, sidebarWidth }: SchedulePopupProps) {
  const [panelTop, setPanelTop] = useState(DEFAULT_TOP);
  const dragging   = useRef(false);
  const startY     = useRef(0);
  const startTop   = useRef(DEFAULT_TOP);
  const panelRef   = useRef<HTMLDivElement>(null);

  // ESCキーで閉じる
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // 開いている間スクロールをロック
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // 開くたびにデフォルト位置にリセット
  useEffect(() => {
    if (open) setPanelTop(DEFAULT_TOP);
  }, [open]);

  // 全画面かどうか（ドラッグ調整していない）
  const isFullScreen = panelTop <= DEFAULT_TOP + 4;

  // ── ドラッグ処理 ────────────────────────────────────────────────────────────
  const onDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true;
    startY.current   = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startTop.current = panelTop;
    document.body.style.userSelect = 'none';
  }, [panelTop]);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const delta   = clientY - startY.current;
      const next    = Math.max(MIN_TOP, Math.min(MAX_TOP, startTop.current + delta));
      setPanelTop(next);
    };
    const onUp = () => {
      dragging.current = false;
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend',  onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend',  onUp);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — サイドバー右側だけ */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-0 right-0 z-[60] transition-all duration-300 ${isFullScreen ? 'bg-black/35 backdrop-blur-[2px]' : 'bg-black/10'}`}
            style={{ top: HEADER_H, left: sidebarWidth }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            ref={panelRef}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-0 right-0 z-[61] flex flex-col"
            style={{
              top: panelTop,
              left: sidebarWidth,
              background: '#F4F4F5',
              fontFamily: 'DM Sans, sans-serif',
              overflow: 'visible',  // ドラッグハンドル（top: -18）がクリップされないよう明示
            }}
          >
            {/* ── ドラッグハンドル ── */}
            <div
              className="absolute left-0 right-0 flex flex-col items-center justify-center z-10 cursor-ns-resize select-none"
              style={{
                top: -18,
                height: 20,
              }}
              onMouseDown={onDragStart}
              onTouchStart={onDragStart}
              title="ドラッグで高さを調整"
            >
              {/* ハンドルバー本体 */}
              <div
                className="flex items-center justify-center gap-1.5 px-4 py-1 rounded-full shadow-md"
                style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid #E5E7EB' }}
              >
                <GripHorizontal className="w-4 h-4 text-neutral-400" />
                <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 500, letterSpacing: '0.05em' }}>
                  ドラッグで調整
                </span>
              </div>
            </div>

            {/* ── Modal header bar ── */}
            <div className="flex items-center justify-between px-8 py-3 bg-white border-b border-neutral-200 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-neutral-800" style={{ fontWeight: 600 }}>スケジュール</p>
                  <p className="text-[10px] text-neutral-400" style={{ fontWeight: 400 }}>SCHEDULE — オーバーレイ表示</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/home/schedule"
                  onClick={onClose}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-all"
                  style={{ fontSize: 11, fontWeight: 500 }}
                >
                  <ExternalLink className="w-3 h-3" />
                  専用ページで開く
                </Link>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-all"
                  title="閉じる（ESC）"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Schedule content ── */}
            <div className="flex-1 min-h-0 overflow-hidden p-8">
              <ScheduleContent />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}