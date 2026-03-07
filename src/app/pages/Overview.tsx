import { useState } from 'react';
import { GridIcon } from '../components/GridIcon';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import productLinesBg from "figma:asset/55a133390aeacdc96853cc14db4d309136a5150b.png";

// ─── Animation variants ──────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.11 } } };

// ─── Brand gradient helpers ──────────────────────────────
const brandGrad = 'linear-gradient(135deg, #F5C518 0%, #C0392B 50%, #3C2562 100%)';
const textGradStyle: React.CSSProperties = {
  backgroundImage: brandGrad,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

// ─── ModeBadge ───────────────────────────────────────────
const borderGrads: Record<string, string> = {
  Br: 'linear-gradient(135deg,#ff8a8a,#ef4444,#b91c1c)',
  Gp: 'linear-gradient(135deg,#c7d2fe,#818cf8,#4f46e5)',
  Dr: 'linear-gradient(135deg,#fed7aa,#fb923c,#ea580c)',
  Et: 'linear-gradient(135deg,#a7f3d0,#34d399,#059669)',
  Ph: 'linear-gradient(135deg,#bfdbfe,#60a5fa,#2563eb)',
  Fl: 'linear-gradient(135deg,#fce7f3,#f9a8d4,#ec4899)',
};
const ModeBadge = ({ code, size = 28 }: { code: string; size?: number }) => {
  const sw = Math.max(2, Math.round(size * 0.07));
  const fs = Math.round(size * 0.3);
  return (
    <div style={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: borderGrads[code] ?? '#aaa' }} />
      <div style={{ position: 'absolute', top: sw, left: sw, right: sw, bottom: sw, borderRadius: '50%', background: '#1e293b' }} />
      <span style={{ fontSize: fs, color: '#fff', letterSpacing: '0.04em', fontWeight: 500, lineHeight: 1, position: 'relative', zIndex: 1 }}>{code}</span>
    </div>
  );
};

// ─── Product line colors ──────────────────────────────────
const esGrad = 'linear-gradient(135deg,#F5C518,#D49B1A)';
const csGrad = 'linear-gradient(135deg,#E84040,#8B1A2B)';
const psGrad = 'linear-gradient(135deg,#7E3858,#503A6E,#3C2562)';

const lineData = [
  {
    id: 'ES',
    name: 'Experience System',
    grad: esGrad,
    color: '#D49B1A',
    who: '導入する会社様が利用する主となるツール',
    concept: '婚礼・ホテル・衣装・美容のスタッフの喜ぶ姿を見たい！',
    conceptLabel: '従業員満足度',
    detail: '集客から受注、施行、精算、売上まで、通常業務をワンストップで行え、かつ営業支援ツールとして業績向上に向けたメソッドを同時に組み込んだシステム。まさにハイブリッド。',
    modes: ['Br', 'Gp', 'Dr', 'Et', 'Ph', 'Fl'],
  },
  {
    id: 'CS',
    name: 'Customer System',
    grad: csGrad,
    color: '#C0392B',
    who: '導入する会社様のお客様が使うツール',
    concept: '新郎新婦様や列席者の喜ぶ姿を見たい！',
    conceptLabel: '顧客満足度',
    detail: '新郎新婦様含め、お客様がCSシステムを介してプランナーやスタッフ、パートナーとのやりとりや情報の共有をスムーズに行えます。',
    modes: ['Br', 'Gp', 'Dr'],
  },
  {
    id: 'PS',
    name: 'Partner System',
    grad: psGrad,
    color: '#503A6E',
    who: '導入する会社様と取引のあるパートナー様が使うツール',
    concept: 'パートナー様の喜ぶ姿を見たい！',
    conceptLabel: '取引先満足度',
    detail: 'パートナー様の商品（物や人）を取引している会社様へツールを介し提供が可能に。パートナー様の基幹システムとの自動連携の実現へ。',
    modes: ['Br', 'Gp'],
  },
];

const modeLabels: Record<string, string> = {
  Br: '婚礼', Gp: '法人宴会', Dr: '衣装', Et: '美容', Ph: '写真', Fl: '装花',
};

// ─── Section label ────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-5">{children}</p>
);

// ─── Circular Meter Component ─────────────────────────────
const CircularMeter = () => {
  const cx = 250, cy = 250, R = 90, R2 = 175;
  const angles = [-90, 30, 150];
  const nodePositions = angles.map(a => ({
    x: cx + R * Math.cos((a * Math.PI) / 180),
    y: cy + R * Math.sin((a * Math.PI) / 180),
  }));

  const nodeData = [
    { id: 'ES', label: 'プランナー', grad: esGrad, color: '#F5C518' },
    { id: 'CS', label: '新郎新婦', grad: csGrad, color: '#E84040' },
    { id: 'PS', label: 'パートナー', grad: psGrad, color: '#7E3858' },
  ];

  // Outer mode ring
  const modeKeys = ['Br', 'Gp', 'Dr', 'Et', 'Ph', 'Fl'] as const;
  const modeAngles = modeKeys.map((_, i) => -90 + i * 60);
  const modePositions = modeAngles.map(a => ({
    x: cx + R2 * Math.cos((a * Math.PI) / 180),
    y: cy + R2 * Math.sin((a * Math.PI) / 180),
  }));
  const modeColors = ['#ef4444', '#818cf8', '#fb923c', '#34d399', '#60a5fa', '#f9a8d4'];

  const arcPath = (startAngle: number, endAngle: number, r: number) => {
    const gap = r === R ? 26 : 14;
    const a1 = startAngle + gap;
    const a2 = endAngle - gap;
    const x1 = cx + r * Math.cos((a1 * Math.PI) / 180);
    const y1 = cy + r * Math.sin((a1 * Math.PI) / 180);
    const x2 = cx + r * Math.cos((a2 * Math.PI) / 180);
    const y2 = cy + r * Math.sin((a2 * Math.PI) / 180);
    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
  };

  const arcs = [
    { path: arcPath(-90, 30, R), color: '#F5C518', delay: 0.5 },
    { path: arcPath(30, 150, R), color: '#E84040', delay: 1.0 },
    { path: arcPath(150, 270, R), color: '#7E3858', delay: 1.5 },
  ];

  // Outer arcs between modes
  const outerArcs = modeKeys.map((_, i) => ({
    path: arcPath(modeAngles[i], modeAngles[(i + 1) % 6] + (i === 5 ? 360 : 0), R2),
    delay: 1.8 + i * 0.15,
  }));

  const orbitDuration = 6;

  return (
    <div className="relative w-full max-w-[520px] mx-auto" style={{ aspectRatio: '1/1', overflow: 'visible' }}>
      <svg viewBox="0 0 500 500" className="w-full h-full" style={{ overflow: 'visible' }}>
        <defs>
          <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="arc-grad-0" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5C518" />
            <stop offset="100%" stopColor="#E84040" />
          </linearGradient>
          <linearGradient id="arc-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E84040" />
            <stop offset="100%" stopColor="#7E3858" />
          </linearGradient>
          <linearGradient id="arc-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7E3858" />
            <stop offset="100%" stopColor="#F5C518" />
          </linearGradient>
          {/* Outer arc gradients between adjacent modes */}
          {modeKeys.map((_, i) => {
            const nextI = (i + 1) % 6;
            return (
              <linearGradient key={`oag-${i}`} id={`outer-arc-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={modeColors[i]} />
                <stop offset="100%" stopColor={modeColors[nextI]} />
              </linearGradient>
            );
          })}
        </defs>

        {/* Inner dashed circle */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4 6" opacity="0.4" />
        {/* Outer dashed circle */}
        <circle cx={cx} cy={cy} r={R2} fill="none" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.25" />

        {/* Inner arcs (ES/CS/PS) */}
        {arcs.map((arc, i) => (
          <g key={i}>
            <motion.path
              d={arc.path}
              fill="none"
              stroke={`url(#arc-grad-${i})`}
              strokeWidth="3"
              strokeLinecap="round"
              opacity={0.15}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: arc.delay - 0.2, duration: 0.6, ease: 'easeOut' }}
            />
            <motion.path
              d={arc.path}
              fill="none"
              stroke={`url(#arc-grad-${i})`}
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: arc.delay, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            />
          </g>
        ))}

        {/* Outer arcs (Modes) */}
        {outerArcs.map((arc, i) => (
          <g key={`outer-${i}`}>
            <motion.path
              d={arc.path}
              fill="none"
              stroke={`url(#outer-arc-grad-${i})`}
              strokeWidth="2"
              strokeLinecap="round"
              opacity={0.12}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: arc.delay - 0.1, duration: 0.5, ease: 'easeOut' }}
            />
            <motion.path
              d={arc.path}
              fill="none"
              stroke={`url(#outer-arc-grad-${i})`}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ delay: arc.delay, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            />
          </g>
        ))}

        {/* Outer orbit dot */}
        <circle r="2.5" fill="#818cf8" opacity={0.6}>
          <animateMotion
            dur={`${orbitDuration * 1.4}s`}
            repeatCount="indefinite"
            path={`M ${cx} ${cy - R2} A ${R2} ${R2} 0 1 1 ${cx - 0.01} ${cy - R2}`}
          />
        </circle>

        {/* Inner orbit dots */}
        <motion.circle
          r="4"
          fill="#F5C518"
          filter="url(#glow-gold)"
          opacity={0.9}
        >
          <animateMotion
            dur={`${orbitDuration}s`}
            repeatCount="indefinite"
            path={`M ${cx} ${cy - R} A ${R} ${R} 0 1 1 ${cx - 0.01} ${cy - R}`}
          />
        </motion.circle>
        <circle r="3" fill="#7E3858" opacity={0.7}>
          <animateMotion
            dur={`${orbitDuration}s`}
            repeatCount="indefinite"
            begin={`${orbitDuration / 2}s`}
            path={`M ${cx} ${cy - R} A ${R} ${R} 0 1 1 ${cx - 0.01} ${cy - R}`}
          />
        </circle>

        {/* Inner pulse rings */}
        {nodePositions.map((pos, i) => (
          <motion.circle
            key={`pulse-${i}`}
            cx={pos.x}
            cy={pos.y}
            r={32}
            fill="none"
            stroke={nodeData[i].color}
            strokeWidth="1"
            initial={{ r: 24, opacity: 0 }}
            animate={{ r: [24, 38, 38], opacity: [0, 0.3, 0] }}
            transition={{ delay: 2 + i * 0.4, duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        ))}

        {/* Inner arc arrows */}
        {nodePositions.map((_pos, i) => {
          const arrowAngle = angles[i] + 20;
          const ax = cx + R * Math.cos((arrowAngle * Math.PI) / 180);
          const ay = cy + R * Math.sin((arrowAngle * Math.PI) / 180);
          const tangent = arrowAngle + 90;
          const sz = 5;
          return (
            <motion.polygon
              key={`arrow-${i}`}
              points={`${ax + sz * Math.cos((tangent * Math.PI) / 180)},${ay + sz * Math.sin((tangent * Math.PI) / 180)} ${ax - sz * 0.6 * Math.cos(((tangent - 35) * Math.PI) / 180)},${ay - sz * 0.6 * Math.sin(((tangent - 35) * Math.PI) / 180)} ${ax - sz * 0.6 * Math.cos(((tangent + 35) * Math.PI) / 180)},${ay - sz * 0.6 * Math.sin(((tangent + 35) * Math.PI) / 180)}`}
              fill={nodeData[i].color}
              opacity={0.6}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.2 + i * 0.5, duration: 0.4 }}
            />
          );
        })}

        {/* Outer mode nodes (SVG circles with gradient border) */}
        {modePositions.map((pos, i) => {
          const code = modeKeys[i];
          const color = modeColors[i];
          const nodeR = 20;
          return (
            <motion.g
              key={`mode-${code}`}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 + i * 0.12, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
            >
              {/* Gradient border ring */}
              <circle cx={pos.x} cy={pos.y} r={nodeR} fill="none" stroke={color} strokeWidth="2" opacity={0.7} />
              {/* Dark fill */}
              <circle cx={pos.x} cy={pos.y} r={nodeR - 2} fill="#1e293b" />
              {/* Label */}
              <text x={pos.x} y={pos.y + 1} textAnchor="middle" dominantBaseline="central"
                fill="#fff" fontSize="9" fontWeight="500" letterSpacing="0.04em">
                {code}
              </text>
              {/* Mode name below */}
              <text x={pos.x} y={pos.y + nodeR + 13} textAnchor="middle" dominantBaseline="central"
                fill="#9ca3af" fontSize="8" fontWeight="400">
                {modeLabels[code]}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Inner product line nodes (HTML overlay) */}
      {nodePositions.map((pos, i) => {
        const node = nodeData[i];
        const pxX = (pos.x / 500) * 100;
        const pxY = (pos.y / 500) * 100;
        return (
          <motion.div
            key={node.id}
            className="absolute"
            style={{ left: `${pxX}%`, top: `${pxY}%` }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="relative" style={{ width: 64, height: 64, marginLeft: -32, marginTop: -32 }}>
              <svg width="72" height="72" viewBox="0 0 72 72" className="absolute -top-[4px] -left-[4px]" style={{ overflow: 'visible' }}>
                <circle cx="36" cy="36" r="33" fill="none" stroke="#e5e7eb" strokeWidth="2" opacity="0.2" />
              </svg>
              <div
                className="w-[64px] h-[64px] rounded-full flex flex-col items-center justify-center text-white relative z-10"
                style={{ background: node.grad }}
              >
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', lineHeight: 1 }}>{node.id}</span>
                <span style={{ fontSize: 8, fontWeight: 400, marginTop: 3, lineHeight: 1, opacity: 0.85 }}>{node.label}</span>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Center logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <div className="flex flex-col items-center">
          <GridIcon size={28} pattern="B" />
          <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-2" style={{ fontWeight: 500 }}>ƐS Product</p>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Component ────────────────────────────────────────────
export default function Overview() {
  const [active, setActive] = useState<string>('ES');
  const line = lineData.find((l) => l.id === active)!;

  return (
    <div className="bg-white text-neutral-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>

      {/* ══════════════  HERO  ══════════════════════════════ */}
      <section className="min-h-[92vh] flex flex-col items-center justify-center px-8 text-center relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 65%, rgba(245,197,24,0.06) 0%, rgba(192,57,43,0.05) 40%, rgba(27,42,92,0.07) 100%)',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 max-w-4xl w-full"
        >
          {/* Logo + gradient label */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <GridIcon size={36} pattern="B" />
            <span
              className="text-sm tracking-[0.3em] uppercase"
              style={{ ...textGradStyle, fontWeight: 600 }}
            >
              ƐS Product
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-[5.5rem] tracking-tight mb-10" style={{ fontWeight: 300, lineHeight: 1.08 }}>
            すべての人が<br />
            <span style={{ ...textGradStyle, fontWeight: 600 }}>喜ぶ</span>プロダクト
          </h1>

          {/* Subtitle */}
          <p className="text-base text-neutral-500 max-w-lg mx-auto mb-20 leading-8" style={{ fontWeight: 300 }}>
            婚礼・ホテル・衣装・美容・写真・装花の会社様が<br />
            業務効率化とお客様・パートナー様へのコンテンツ提供を通じ<br />
            すべてがシームレスにリンクするプロダクトです。
          </p>

          {/* ── ES → CS → PS animated flow ── */}
          <CircularMeter />
        </motion.div>
      </section>

      {/* ══════════════  WHAT IS  ════════════════════════════ */}
      <section id="what" className="py-32 px-8 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionLabel>ƐS Product とは</SectionLabel>
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl tracking-tight mb-16" style={{ fontWeight: 300 }}>
              3者すべての<span style={{ ...textGradStyle, fontWeight: 600 }}>満足</span>を<br />
              ひとつのプラットフォームで
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-100">
              {[
                { role: '会社様', desc: '契約する事業者・施設', sub: '業務効率化・業績向上' },
                { role: 'お客様', desc: '新郎新婦様・列席者の方々', sub: 'シームレスな顧客体験' },
                { role: 'パートナー様', desc: '取引のある協力会社様', sub: '連携・情報共有の最適化' },
              ].map((s, i) => (
                <motion.div key={s.role} variants={fadeUp} className="bg-white p-10 flex flex-col gap-4">
                  <span className="text-xs tracking-[0.2em] uppercase text-neutral-300">{`0${i + 1}`}</span>
                  <p className="text-xl text-neutral-900" style={{ fontWeight: 500 }}>{s.role}</p>
                  <p className="text-sm text-neutral-400" style={{ fontWeight: 300 }}>{s.desc}</p>
                  <div className="h-px w-8" style={{ background: brandGrad }} />
                  <p className="text-sm text-neutral-600" style={{ fontWeight: 300 }}>{s.sub}</p>
                </motion.div>
              ))}
            </div>

            <motion.p variants={fadeUp} className="mt-12 text-neutral-500 leading-8 text-sm" style={{ fontWeight: 300 }}>
              婚礼・ホテル・衣装・美容・写真・装花の各事業者様が、<br />
              業務効率、お客様やパートナー様へのコンテンツ提供を通じ、<br />
              様々な角度からリンクしシームレスに——より効果的なコンテンツを提示するプロダクトです。
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════  PRODUCT LINES  ══════════════════════ */}
      <section className="relative py-32 px-8 text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={productLinesBg}
            alt=""
            className="w-full h-full object-cover blur-md scale-105"
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)',
          }} />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionLabel>ƐS Product 詳細</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl tracking-tight mb-16" style={{ fontWeight: 300 }}>
              3つのプロダクトライン
            </motion.h2>

            <motion.div variants={fadeUp} className="flex gap-2 mb-12 border-b border-neutral-800 pb-5">
              {lineData.map((l) => (
                <button key={l.id} onClick={() => setActive(l.id)}
                  className="px-6 py-2 rounded-full text-sm tracking-wide transition-all cursor-pointer"
                  style={active === l.id
                    ? { background: l.grad, color: '#fff' }
                    : { color: '#6b7280', background: 'transparent' }}>
                  {l.id}
                </button>
              ))}
            </motion.div>

            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-16 items-start"
            >
              <div>
                <div className="flex items-start gap-5 mb-8">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm shrink-0 mt-0.5"
                    style={{ background: line.grad, fontWeight: 600 }}>
                    {line.id[0]}
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 tracking-widest mb-1">{line.id}</p>
                    <h3 className="text-xl text-white mb-1" style={{ fontWeight: 400 }}>{line.name}</h3>
                    <p className="text-sm text-neutral-400" style={{ fontWeight: 300 }}>{line.who}</p>
                  </div>
                </div>
                <p className="text-neutral-300 leading-8 text-sm mb-10" style={{ fontWeight: 300 }}>{line.detail}</p>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-neutral-600 mb-3">対応モード</p>
                  <div className="flex gap-2 flex-wrap">
                    {line.modes.map((m) => (
                      <div key={m} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800">
                        <ModeBadge code={m} size={20} />
                        <span className="text-xs text-neutral-400">{modeLabels[m]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-10 border border-white/10 bg-black/40 backdrop-blur-md">
                <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: line.color }}>Concept</p>
                <blockquote className="text-white text-xl leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                  "{line.concept}"
                </blockquote>
                <div className="h-px mb-8" style={{ background: line.grad }} />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: line.grad }}>
                    <span className="text-white text-xs" style={{ fontWeight: 600 }}>{line.id[0]}</span>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 tracking-wide">指標</p>
                    <p className="text-sm text-neutral-200" style={{ fontWeight: 500 }}>{line.conceptLabel}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════  CONCEPT  ════════════════════════════ */}
      <section className="py-32 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionLabel>ƐS Product 要するに</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl tracking-tight mb-16" style={{ fontWeight: 300 }}>
              <span style={{ ...textGradStyle, fontWeight: 600 }}>喜ぶ姿</span>を見たい——<br />それがすべてのコンセプト
            </motion.h2>

            <div className="space-y-px">
              {lineData.map((l, i) => (
                <motion.div key={l.id} variants={fadeUp}
                  className="flex items-stretch border-b border-neutral-100 last:border-0">
                  <div className="w-1.5 shrink-0" style={{ background: l.grad }} />
                  <div className="flex-1 px-10 py-10 flex items-start gap-6">
                    <span className="text-xs tracking-widest text-neutral-300 pt-1 shrink-0">{`0${i + 1}`}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm px-3 py-1 rounded-full text-white" style={{ background: l.grad, fontWeight: 500 }}>
                          {l.id}
                        </span>
                        <span className="text-xs text-neutral-400 tracking-wide">{l.conceptLabel}</span>
                      </div>
                      <p className="text-neutral-800 text-base leading-relaxed" style={{ fontWeight: 400 }}>{l.concept}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════  FEATURES  ═══════════════════════════ */}
      <section className="py-32 px-8 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionLabel>ƐS Product 何ができるの？</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl tracking-tight mb-16" style={{ fontWeight: 300 }}>
              3システムの<span style={{ ...textGradStyle, fontWeight: 600 }}>できること</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200">
              {lineData.map((l) => (
                <motion.div key={l.id} variants={fadeUp} className="bg-white p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs shrink-0"
                      style={{ background: l.grad, fontWeight: 600 }}>
                      {l.id[0]}
                    </div>
                    <div>
                      <p className="text-xs tracking-widest text-neutral-400">{l.id}</p>
                      <p className="text-sm text-neutral-700" style={{ fontWeight: 500 }}>{l.name}</p>
                    </div>
                  </div>
                  <div className="h-0.5 w-12 mb-8 rounded-full" style={{ background: l.grad }} />
                  <p className="text-sm text-neutral-500 leading-8" style={{ fontWeight: 300 }}>{l.detail}</p>
                  <div className="mt-8 pt-8 border-t border-neutral-100">
                    <div className="flex gap-1.5 flex-wrap">
                      {l.modes.map((m) => (
                        <div key={m} title={modeLabels[m]}>
                          <ModeBadge code={m} size={26} />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════  PRICING  ════════════════════════════ */}
      <section className="py-32 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionLabel>ƐS Product 価格</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl tracking-tight mb-16" style={{ fontWeight: 300 }}>
              シンプルで<span style={{ ...textGradStyle, fontWeight: 600 }}>フェアな</span>料金体系
            </motion.h2>

            <motion.div variants={fadeUp} className="border border-neutral-200 rounded-2xl overflow-hidden mb-8">
              <div className="p-10 md:p-14 border-b border-neutral-100">
                <p className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-6">料金の考え方</p>
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-sm text-neutral-400 mb-2" style={{ fontWeight: 300 }}>利用事業所（店）数</p>
                    <p className="text-4xl text-neutral-900" style={{ fontWeight: 600 }}>店舗数</p>
                  </div>
                  <div className="text-3xl text-neutral-300 self-center" style={{ fontWeight: 300 }}>×</div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-sm text-neutral-400 mb-2" style={{ fontWeight: 300 }}>利用モード数</p>
                    <p className="text-4xl text-neutral-900" style={{ fontWeight: 600 }}>モード数</p>
                  </div>
                  <div className="text-3xl text-neutral-300 self-center" style={{ fontWeight: 300 }}>=</div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-sm text-neutral-400 mb-2" style={{ fontWeight: 300 }}>ご利用料金</p>
                    <p className="text-4xl" style={{ ...textGradStyle, fontWeight: 600 }}>料金</p>
                  </div>
                </div>
              </div>

              <div className="p-10 md:p-14 bg-neutral-50">
                <p className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-6">含まれる機能</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { text: 'ES・CS・PS 機能はすべて標準装備', bold: true },
                    { text: 'アカウント数は無制限', bold: true },
                    { text: '使わない機能分は価格を下げることも可能', bold: false },
                    { text: 'モードは必要な業種だけ選択できる', bold: false },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#D49B1A' }} />
                      <span className={`text-sm leading-relaxed ${item.bold ? 'text-neutral-800' : 'text-neutral-500'}`}
                        style={{ fontWeight: item.bold ? 500 : 300 }}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-5">対応モード一覧</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(modeLabels).map(([code, label]) => (
                  <div key={code} className="flex items-center gap-3 p-4 rounded-xl border border-neutral-100 bg-neutral-50">
                    <ModeBadge code={code} size={30} />
                    <div>
                      <p className="text-sm text-neutral-700" style={{ fontWeight: 500 }}>{label}</p>
                      <p className="text-xs text-neutral-400">{code} mode</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-8 text-xs text-neutral-400 text-center leading-6" style={{ fontWeight: 300 }}>
              ※ 料金詳細・見積もりはお問い合わせください。貴社の規模・業態に合わせてご提案します。
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════  CTA  ════════════════════════════════ */}
      <section id="contact" className="py-32 px-8 bg-neutral-950 text-white text-center">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}
          className="max-w-2xl mx-auto"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-10">
            <GridIcon size={44} pattern="B" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl tracking-tight mb-6" style={{ fontWeight: 300 }}>
            まずは、<span style={{ ...textGradStyle, fontWeight: 600 }}>お話しましょう。</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-neutral-400 mb-12 text-sm leading-8" style={{ fontWeight: 300 }}>
            貴社の課題・規模に合わせたデモや資料をご用意します。<br />
            お気軽にお問い合わせください。
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:contact@es-product.jp"
              className="w-full sm:w-auto px-10 py-4 rounded-full text-sm tracking-wide text-white flex items-center justify-center gap-2 hover:opacity-85 transition-opacity"
              style={{ background: brandGrad }}>
              資料請求・お問い合わせ <ArrowRight className="w-4 h-4" />
            </a>
            <a href="mailto:demo@es-product.jp"
              className="w-full sm:w-auto px-10 py-4 rounded-full text-sm tracking-wide border border-neutral-700 text-neutral-300 hover:border-neutral-400 hover:text-white transition-all">
              デモを申し込む
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-8 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <GridIcon size={22} pattern="B" />
          <span className="text-sm text-neutral-500 tracking-wide">ƐS Product</span>
        </div>
        <p className="text-xs text-neutral-600">&copy; 2026 ƐS Product. All rights reserved.</p>
      </footer>
    </div>
  );
}