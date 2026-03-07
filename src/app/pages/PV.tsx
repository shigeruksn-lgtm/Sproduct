import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Link } from 'react-router';
import { GridIcon } from '../components/GridIcon';

// ============================================================
// Types & Data
// ============================================================

const ES_GRADIENT = 'linear-gradient(135deg, #F5C518 0%, #D49B1A 20%, #C0392B 50%, #4A2040 80%, #3C2562 100%)';

const eras = [
  {
    version: '0.0',
    name: 'CRM',
    era: 'Plan Do See 時代',
    years: '2008 —',
    color: '#8B7355',
    accent: '#C9A96E',
    description: '代表が自らの手で作り上げた\n最初のシステム。',
    sub: '婚礼・宴会業務をひとつのデータベースに収めた、\nすべての原点。',
    visual: 'crm',
  },
  {
    version: '1.0',
    name: 'Synapse',
    era: 'MakeIT 設立',
    years: '2013 —',
    color: '#4A7FA5',
    accent: '#6EB5E0',
    description: 'FileMakerで再構築された\n神経網のようなシステム。',
    sub: '複数の拠点・部門をまたぐ複雑な業務フローを、\nひとつのシナプスが繋いでいく。',
    visual: 'synapse',
  },
  {
    version: '2.0',
    name: 'ES',
    era: 'クラウドへ',
    years: '2019 —',
    color: '#2D7D6E',
    accent: '#4DB6A4',
    description: 'Webシステムとして生まれ変わり、\nクラウドの空へ。',
    sub: 'ブラウザさえあれば、どこでも。\n「ES」の名が、現場に根付いていった。',
    visual: 'es',
  },
  {
    version: '3.0',
    name: 'ƐS Product',
    era: '多角的シームレスへ',
    years: '2025 —',
    color: '#C0392B',
    accent: '#F5C518',
    description: 'ES に加え、CS・PS・AIを搭載。\n3者すべてが繋がるプロダクトへ。',
    sub: '会社様・お客様・パートナー様。\nすべてに喜ばれるプロダクトとして、始動する。',
    visual: 'es3',
  },
];

// ============================================================
// Sub-components
// ============================================================

/** ターミナル風ビジュアル (CRM 0.0) */
const CrmVisual = () => {
  const lines = [
    '> SELECT * FROM customers',
    '> WHERE event_date = TODAY()',
    '',
    '  id  | name         | type',
    '------+--------------+-------',
    '  001 | 田中 様       | 婚礼',
    '  002 | 株式会社 ABC  | 宴会',
    '  003 | 佐藤 様       | 婚礼',
    '',
    '> 3 rows in set (0.01 sec)',
  ];
  return (
    <div
      className="font-mono text-xs leading-relaxed"
      style={{ color: '#C9A96E', textShadow: '0 0 8px rgba(201,169,110,0.5)' }}
    >
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: line === '' ? 0 : 0.85, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
        >
          {line || '\u00A0'}
        </motion.div>
      ))}
    </div>
  );
};

/** シナプスネットワークビジュアル (Synapse 1.0) */
const SynapseVisual = () => {
  const nodes = [
    { x: 120, y: 60, label: '婚礼' },
    { x: 240, y: 30, label: '宴会' },
    { x: 360, y: 80, label: '衣装' },
    { x: 80,  y: 160, label: '見積' },
    { x: 220, y: 140, label: 'Core' },
    { x: 340, y: 170, label: '請求' },
    { x: 140, y: 240, label: 'レポート' },
    { x: 290, y: 250, label: 'スタッフ' },
  ];
  const edges = [
    [0,4],[1,4],[2,4],[3,4],[5,4],[6,4],[7,4],[0,3],[1,2],[5,7],
  ];
  return (
    <svg width="440" height="300" viewBox="0 0 440 300" style={{ overflow: 'visible' }}>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="#6EB5E0"
          strokeWidth="0.8"
          strokeOpacity="0.35"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 + i * 0.07, duration: 0.4 }}
        >
          <circle
            cx={n.x} cy={n.y} r={i === 4 ? 18 : 10}
            fill={i === 4 ? '#1a3a5c' : '#0d2233'}
            stroke="#6EB5E0"
            strokeWidth={i === 4 ? 1.5 : 0.8}
            strokeOpacity={i === 4 ? 0.9 : 0.5}
          />
          <text
            x={n.x} y={n.y + (i === 4 ? 4 : 3.5)}
            textAnchor="middle"
            fill="#6EB5E0"
            fontSize={i === 4 ? 8 : 7}
            fontFamily="DM Sans, sans-serif"
            opacity={0.9}
          >
            {n.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
};

/** クラウドUIビジュアル (ES 2.0) */
const EsVisual = () => {
  const modules = [
    { label: 'Dashboard', w: 200, h: 60 },
    { label: 'Calendar', w: 120, h: 60 },
    { label: 'CRM', w: 120, h: 60 },
    { label: 'Reports', w: 160, h: 60 },
    { label: 'Settings', w: 100, h: 60 },
  ];
  return (
    <div className="flex flex-col gap-2" style={{ width: 300 }}>
      {/* Browser chrome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-t-lg border overflow-hidden"
        style={{ borderColor: 'rgba(77,182,164,0.2)', background: 'rgba(77,182,164,0.05)' }}
      >
        <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: 'rgba(77,182,164,0.08)' }}>
          {['#ff5f56','#ffbd2e','#27c93f'].map(c => (
            <div key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
          ))}
          <div className="ml-2 flex-1 h-3 rounded" style={{ background: 'rgba(77,182,164,0.15)', maxWidth: 140 }}>
            <div className="text-[7px] text-center" style={{ color: 'rgba(77,182,164,0.6)', lineHeight: '12px' }}>
              es.cloud.app
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="p-3 flex flex-wrap gap-2">
          {modules.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              className="rounded px-3 py-2 text-[9px]"
              style={{
                background: 'rgba(77,182,164,0.1)',
                border: '1px solid rgba(77,182,164,0.2)',
                color: '#4DB6A4',
              }}
            >
              {m.label}
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="text-[9px] text-center tracking-widest"
        style={{ color: 'rgba(77,182,164,0.4)' }}
      >
        ☁ Cloud · Any device · Always on
      </motion.div>
    </div>
  );
};

/** ƐS Product 3.0 マトリックスビジュアル */
const Es3Visual = () => {
  const lines = ['ES', 'CS', 'PS'];
  const modes = ['Br', 'Gp', 'Dr', 'Et', 'Ph', 'Fl'];
  const matrix: Record<string, string[]> = {
    ES: ['Br','Gp','Dr','Et','Ph','Fl'],
    CS: ['Br','Gp','Dr'],
    PS: ['Br','Gp'],
  };
  const modeColors: Record<string, string> = {
    Br: '#E05580', Gp: '#6366F1', Dr: '#D4731A',
    Et: '#10B981', Ph: '#3B82F6', Fl: '#F59E0B',
  };

  return (
    <div>
      <div className="grid gap-1" style={{ gridTemplateColumns: '40px repeat(6, 36px)' }}>
        {/* Header */}
        <div />
        {modes.map(m => (
          <div key={m} className="text-center text-[9px] tracking-wider" style={{ color: modeColors[m], opacity: 0.8 }}>
            {m}
          </div>
        ))}
        {/* Rows */}
        {lines.map((line, ri) => (
          <div key={line} style={{ display: 'contents' }}>
            <div className="flex items-center text-[10px] tracking-wider" style={{ color: 'rgba(245,197,24,0.8)' }}>
              {line}
            </div>
            {modes.map((mode, ci) => {
              const active = matrix[line].includes(mode);
              return (
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: ri * 0.15 + ci * 0.06, duration: 0.35, type: 'spring', stiffness: 200 }}
                  className="flex items-center justify-center"
                  style={{ height: 28 }}
                >
                  {active ? (
                    <div
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ background: modeColors[mode], boxShadow: `0 0 6px ${modeColors[mode]}60` }}
                    />
                  ) : (
                    <div
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'transparent' }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
      {/* AI badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="mt-4 flex items-center gap-2"
      >
        <span
          className="px-3 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase"
          style={{ background: 'rgba(245,197,24,0.12)', border: '1px solid rgba(245,197,24,0.3)', color: '#F5C518' }}
        >
          + AI Integration
        </span>
        <span className="text-[9px] tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
          多角的シームレス
        </span>
      </motion.div>
    </div>
  );
};

/** 各エラのフルスクリーンセクション */
const EraSection = ({
  era,
  index,
  total,
}: {
  era: typeof eras[0];
  index: number;
  total: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-20% 0px -20% 0px', once: false });

  const isLast = index === total - 1;

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center"
      style={{ padding: '120px 0' }}
    >
      {/* Vertical chapter line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: `linear-gradient(to bottom, transparent, ${era.accent}40, transparent)` }}
      />

      <div className="w-full max-w-7xl mx-auto px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div>
          {/* Chapter */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-10"
          >
            <span
              className="text-[10px] tracking-[0.4em] uppercase"
              style={{ color: era.accent, opacity: 0.7 }}
            >
              Chapter {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 h-px" style={{ background: `${era.accent}30` }} />
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              {era.years}
            </span>
          </motion.div>

          {/* Version number */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              className="mb-2 tracking-tight"
              style={{
                fontFamily: 'Cormorant, serif',
                fontSize: 'clamp(80px, 14vw, 140px)',
                fontWeight: 300,
                lineHeight: 0.9,
                color: era.accent,
                opacity: 0.15,
                userSelect: 'none',
              }}
            >
              {era.version}
            </div>
          </motion.div>

          {/* Name + Era */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="-mt-4 mb-6"
          >
            <h2
              className="tracking-tight"
              style={{
                fontFamily: isLast ? 'DM Sans, sans-serif' : 'DM Sans, sans-serif',
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: isLast ? 500 : 300,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                ...(isLast ? {
                  backgroundImage: ES_GRADIENT,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                } : {}),
              }}
            >
              {era.name}
            </h2>
            <p
              className="text-sm tracking-[0.2em] uppercase mt-1"
              style={{ color: era.accent, opacity: 0.6 }}
            >
              {era.era}
            </p>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p
              className="mb-5 whitespace-pre-line"
              style={{
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 2,
                fontWeight: 300,
                fontSize: '1.05rem',
              }}
            >
              {era.description}
            </p>
            <p
              className="whitespace-pre-line"
              style={{
                color: 'rgba(255,255,255,0.3)',
                lineHeight: 2,
                fontWeight: 300,
                fontSize: '0.875rem',
              }}
            >
              {era.sub}
            </p>
          </motion.div>

          {/* Progress dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 mt-10"
          >
            {eras.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all"
                style={{
                  width: i === index ? 20 : 4,
                  height: 4,
                  background: i === index ? era.accent : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Right: Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center justify-center"
        >
          <div
            className="rounded-2xl p-10"
            style={{
              background: `radial-gradient(ellipse at center, ${era.color}15 0%, transparent 70%)`,
              border: `1px solid ${era.accent}15`,
              minWidth: 300,
              minHeight: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {era.visual === 'crm' && <CrmVisual />}
            {era.visual === 'synapse' && <SynapseVisual />}
            {era.visual === 'es' && <EsVisual />}
            {era.visual === 'es3' && <Es3Visual />}
          </div>
        </motion.div>
      </div>

      {/* Arrow connector (not on last) */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ color: 'rgba(255,255,255,0.15)' }}
        >
          <div className="text-[9px] tracking-[0.3em] uppercase">Next</div>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            ↓
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

// ============================================================
// Timeline side decoration
// ============================================================
const TimelineBar = () => {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div
      className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center"
      style={{ height: 200 }}
    >
      <div className="w-px flex-1 bg-white/10 rounded-full relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 right-0 rounded-full"
          style={{ height, background: ES_GRADIENT }}
        />
      </div>
    </div>
  );
};

// ============================================================
// Main PV component
// ============================================================
export default function PV() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 60]);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative min-h-screen"
      style={{
        background: '#080808',
        fontFamily: 'DM Sans, sans-serif',
        color: '#ffffff',
      }}
    >
      <TimelineBar />

      {/* ===== Opening Hero ===== */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ height: 'calc(100vh - 3.5rem)' }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 55%, rgba(192,57,43,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
            backgroundSize: '256px 256px',
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="flex flex-col items-center text-center z-10 px-8"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[11px] tracking-[0.5em] uppercase mb-10"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            The Story of Evolution
          </motion.p>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-6 mb-6"
          >
            <GridIcon size={64} pattern="B" />
            <h1
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(48px, 8vw, 96px)',
                fontWeight: 300,
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              <span
                style={{
                  backgroundImage: ES_GRADIENT,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 500,
                }}
              >
                &#x190;S
              </span>{' '}
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>Product</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="text-base tracking-[0.2em]"
            style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}
          >
            すべてをシームレスへ。
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={loaded ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-12 h-px w-24 origin-center"
            style={{ background: ES_GRADIENT }}
          />

          {/* Version badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-8 flex items-center gap-3"
          >
            {['0.0', '1.0', '2.0', '→', '3.0'].map((v, i) => (
              <span key={i}>
                {v === '→' ? (
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>{v}</span>
                ) : (
                  <span
                    className="px-3 py-1 rounded-full text-[10px] tracking-widest"
                    style={{
                      border: `1px solid ${v === '3.0' ? 'rgba(245,197,24,0.4)' : 'rgba(255,255,255,0.1)'}`,
                      color: v === '3.0' ? 'rgba(245,197,24,0.8)' : 'rgba(255,255,255,0.25)',
                      background: v === '3.0' ? 'rgba(245,197,24,0.05)' : 'transparent',
                    }}
                  >
                    {v}
                  </span>
                )}
              </span>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 2.4, duration: 0.8 }}
            className="absolute bottom-10 flex flex-col items-center gap-2"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[11px] tracking-[0.3em] uppercase"
            >
              Scroll
            </motion.div>
            <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== Prologue ===== */}
      <section className="py-32 px-8 md:px-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
        >
          <p
            className="text-[11px] tracking-[0.4em] uppercase mb-10"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Prologue
          </p>
          <p
            className="mb-6"
            style={{
              fontFamily: 'Cormorant, serif',
              fontSize: 'clamp(24px, 4vw, 40px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.8,
              letterSpacing: '0.02em',
            }}
          >
            始まりは、ひとりの思いから。
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 2.2,
              fontWeight: 300,
              fontSize: '0.95rem',
            }}
          >
            婚礼・宴会業界の複雑な現場を、もっとシンプルに。<br />
            もっと、人の温度が伝わる仕事に変えたい。<br />
            その願いがシステムになり、会社になり、プロダクトになった。
          </p>
        </motion.div>
      </section>

      {/* ===== Era Sections ===== */}
      <div className="relative">
        {/* Vertical timeline thread */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.04), transparent)',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
        {eras.map((era, i) => (
          <EraSection key={era.version} era={era} index={i} total={eras.length} />
        ))}
      </div>

      {/* ===== Epilogue / CTA ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 relative overflow-hidden">
        {/* Dramatic background glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(192,57,43,0.12) 0%, rgba(60,37,98,0.08) 50%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[11px] tracking-[0.4em] uppercase mb-12"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Epilogue
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p
              className="mb-8"
              style={{
                fontFamily: 'Cormorant, serif',
                fontSize: 'clamp(28px, 5vw, 52px)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                letterSpacing: '0.02em',
              }}
            >
              すべてをシームレスへ。
            </p>
          </motion.div>

          {/* Big reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center justify-center gap-5 mb-16"
          >
            <GridIcon size={72} pattern="B" />
            <span
              style={{
                fontSize: 'clamp(40px, 7vw, 80px)',
                fontWeight: 300,
                letterSpacing: '-0.03em',
              }}
            >
              <span
                style={{
                  backgroundImage: ES_GRADIENT,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 500,
                }}
              >
                &#x190;S
              </span>{' '}
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>Product</span>
            </span>
          </motion.div>

          {/* Sub message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-14"
            style={{
              color: 'rgba(255,255,255,0.3)',
              lineHeight: 2.2,
              fontWeight: 300,
              fontSize: '0.9rem',
            }}
          >
            会社様・お客様・パートナー様。<br />
            3者すべてが繋がることで、<br />
            すべてに喜ばれるプロダクトへ。
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/concept"
              className="px-8 py-3 rounded-full text-sm tracking-widest uppercase transition-all"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.7)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)';
              }}
            >
              Concept
            </Link>
            <Link
              to="/showcase"
              className="px-8 py-3 rounded-full text-sm tracking-widest uppercase transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(245,197,24,0.15), rgba(192,57,43,0.15))',
                border: '1px solid rgba(245,197,24,0.25)',
                color: 'rgba(245,197,24,0.8)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, rgba(245,197,24,0.25), rgba(192,57,43,0.25))';
                (e.currentTarget as HTMLAnchorElement).style.color = '#F5C518';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, rgba(245,197,24,0.15), rgba(192,57,43,0.15))';
                (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(245,197,24,0.8)';
              }}
            >
              ƐS Site →
            </Link>
          </motion.div>
        </div>

        {/* Footer mark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10"
          style={{
            color: 'rgba(255,255,255,0.1)',
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          ƐS Product 3.0 — 2025
        </motion.div>
      </section>
    </div>
  );
}