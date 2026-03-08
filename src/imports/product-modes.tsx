import { GridIcon, gradientPatterns, type GradientPattern, ProductLineBadge } from '../components/GridIcon';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router';
import { Heart, Users, Sparkles, Camera, Flower2, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

// カスタムドレスアイコン
const DressIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 3L6 8L4 21H20L18 8L16 3" />
    <path d="M12 3V8" />
    <path d="M8 3H16" />
    <circle cx="12" cy="5" r="1.5" />
  </svg>
);

// プロダクトライン定義
const productLines = [
  {
    id: 'ES',
    letter: 'E',
    description: 'Experience System',
    who: '導入会社様が主となるツール',
    subtitle: 'すべての根幹となるコアエンジン',
  },
  {
    id: 'CS',
    letter: 'C',
    description: 'Communication System',
    who: '導入会社様のお客様の利用ツール',
    subtitle: '顧客接点を最適化するマイページ',
  },
  {
    id: 'PS',
    letter: 'P',
    description: 'Partner System',
    who: '取引のあるパートナー様の利用ツール',
    subtitle: 'パートナー様も巻き込む基盤',
  },
];

// モード定義
const modes = [
  { id: 'br', code: 'Br', title: '婚礼モード', subtitle: 'Bridal', icon: Heart, color: '#E05580' },
  { id: 'gp', code: 'Gp', title: '法人宴会モード', subtitle: 'Group Party', icon: Users, color: '#6366F1' },
  { id: 'dr', code: 'Dr', title: '衣装モード', subtitle: 'Dress', icon: DressIcon, color: '#D4731A' },
  { id: 'et', code: 'Et', title: '美容モード', subtitle: 'Esthetic', icon: Sparkles, color: '#10B981' },
  { id: 'ph', code: 'Ph', title: '写真モード', subtitle: 'Photo', icon: Camera, color: '#3B82F6' },
  { id: 'fl', code: 'Fl', title: '装花モード', subtitle: 'Flower', icon: Flower2, color: '#F59E0B' },
];

const MODE_BORDER_COLORS: Record<string, string> = {
  Br: 'linear-gradient(135deg, #ff8a8a, #ef4444, #b91c1c)',
  Gp: 'linear-gradient(135deg, #c7d2fe, #818cf8, #4f46e5)',
  Dr: 'linear-gradient(135deg, #fed7aa, #fb923c, #ea580c)',
  Et: 'linear-gradient(135deg, #a7f3d0, #34d399, #059669)',
  Ph: 'linear-gradient(135deg, #bfdbfe, #60a5fa, #2563eb)',
  Fl: 'linear-gradient(135deg, #fce7f3, #f9a8d4, #ec4899)',
};

const ModeBadge = ({ code, size = 32 }: { code: string; size?: number }) => {
  const darkFill = '#1e293b';
  const fs = Math.round(size * 0.32);
  const borderColor = MODE_BORDER_COLORS[code] ?? '#a3a3a3';
  const sw = 2;

  const labelStyle: React.CSSProperties = {
    fontSize: fs,
    color: '#ffffff',
    letterSpacing: '0.05em',
    fontWeight: 500,
    lineHeight: 1,
    userSelect: 'none',
    position: 'relative',
    zIndex: 1,
  };

  return (
    <div style={{
      width: size, height: size, flexShrink: 0, position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: '50%',
        background: borderColor,
      }} />
      <div style={{
        position: 'absolute',
        top: sw, left: sw, right: sw, bottom: sw,
        borderRadius: '50%',
        background: darkFill,
      }} />
      <span style={labelStyle}>{code}</span>
    </div>
  );
};

// マトリックスデータ
const matrix: Record<string, string[]> = {
  ES: ['Br', 'Gp', 'Dr', 'Et', 'Ph', 'Fl'],
  CS: ['Br', 'Gp', 'Dr'],
  PS: ['Br', 'Gp'],
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// プロダクトラインテキストにグラデーションを適用
const plTextGradient = (gradient: string): React.CSSProperties => ({
  backgroundImage: gradient,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 600,
});

export default function Home() {
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const pattern: GradientPattern = 'B';
  const contentRef = useRef<HTMLDivElement>(null);

  const currentGradient = gradientPatterns[pattern];
  const esTextStyle: React.CSSProperties = {
    backgroundImage: currentGradient.textGradient,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 600,
  };

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      {/* ===== Hero Section ===== */}
      <section className="h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center relative px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-5"
        >
          <GridIcon size={72} pattern={pattern} />
          <h1
            className="text-7xl tracking-tight text-neutral-800"
            style={{ fontWeight: 400 }}
          >
            <span style={esTextStyle}>&#x190;S</span> Product
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 text-neutral-400 text-base tracking-widest"
        >
          すべてをシームレスへ。
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10"
        >
          <Link
            to="/showcase"
            className="px-8 py-3 rounded-full text-sm tracking-widest uppercase border border-neutral-300 text-neutral-500 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all"
          >
            Explore
          </Link>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={scrollToContent}
          className="absolute bottom-12 flex flex-col items-center gap-2 text-neutral-300 hover:text-neutral-500 transition-colors cursor-pointer"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </section>

      {/* ===== About Section ===== */}
      <section ref={contentRef} className="py-24 md:py-32 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-6"
            >
              About
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl tracking-tight text-neutral-900 mb-10"
              style={{ fontWeight: 300 }}
            >
              <span style={{ ...esTextStyle, fontWeight: 500 }}>&#x190;S</span> Product とは
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="w-10 h-px mx-auto mb-12"
              style={{ background: currentGradient.textGradient }}
            />

            {/* Service keywords — horizontal flow */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-10"
            >
              {['婚礼', '宴会', '衣装', '美容', '写真', '装花'].map((word, i) => (
                <span key={word} className="flex items-center gap-4">
                  <span className="text-neutral-500 tracking-widest" style={{ fontWeight: 300 }}>
                    {word}
                  </span>
                  {i < 5 && <span className="text-neutral-300">·</span>}
                </span>
              ))}
            </motion.div>

            {/* Narrative — stepped opacity */}
            <motion.div variants={fadeUp} className="space-y-1 mb-14">
              <p className="text-neutral-500" style={{ lineHeight: '2.2', fontWeight: 300 }}>
                これらを扱う会社様、お客様、パートナー様、
              </p>
              <p className="text-neutral-500" style={{ lineHeight: '2.2', fontWeight: 300 }}>
                ３社（者）すべてが繋がることで
              </p>
              <p className="text-neutral-500" style={{ lineHeight: '2.2', fontWeight: 300 }}>
                すべてに喜ばれるプロダクトをお届けする。
              </p>
            </motion.div>

            {/* Conclusion — cinematic reveal */}
            <motion.div
              variants={fadeUp}
              className="relative mt-4"
            >
              {/* 上段：小さめに「として、」 */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-neutral-500 tracking-widest mb-4"
                style={{ fontWeight: 300 }}
              >
                ——として、
              </motion.p>

              {/* 中段：ƐS Product 始動 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span
                  className="text-4xl md:text-6xl tracking-tight"
                  style={{ ...esTextStyle, fontWeight: 600 }}
                >
                  &#x190;S
                </span>
                <span
                  className="text-4xl md:text-6xl tracking-tight text-neutral-800 ml-2"
                  style={{ fontWeight: 300 }}
                >
                  Product
                </span>
                <span
                  className="text-3xl md:text-5xl tracking-tight text-neutral-900 ml-4"
                  style={{ fontWeight: 300 }}
                >
                  始動
                </span>
              </motion.div>

              {/* グラデーションアンダーライン */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mt-8 h-px w-32 mx-auto origin-left"
                style={{ background: currentGradient.textGradient }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Product Lines Section ===== */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4">
              Product Lines
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl tracking-tight text-neutral-900 mb-20" style={{ fontWeight: 300 }}>
              3つのプロダクトライン
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200">
              {productLines.map((line) => {
                const plColors = currentGradient.productLines[line.id];
                return (
                  <motion.div
                    key={line.id}
                    variants={fadeUp}
                    className="bg-white p-12 group hover:bg-neutral-50 transition-colors"
                  >
                    <ProductLineBadge lineId={line.id} size={56} pattern={pattern} variant="outline" className="mb-8" />

                    <div className="flex items-baseline gap-1 mb-4">
                      <span
                        className="text-5xl tracking-tight"
                        style={{
                          backgroundImage: plColors.gradient,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontWeight: 600,
                        }}
                      >
                        {line.letter}
                      </span>
                      <span
                        className="text-5xl tracking-tight"
                        style={{
                          backgroundImage: plColors.gradient,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontWeight: 600,
                        }}
                      >
                        S
                      </span>
                    </div>

                    <p className="text-sm text-neutral-400 tracking-wide mb-3">{line.description}</p>
                    <p className="text-neutral-600 mb-2">{line.who}</p>
                    <p className="text-[11px] text-neutral-400/70">{line.subtitle}</p>

                    <div className="mt-8 flex gap-2 flex-wrap">
                      {matrix[line.id].map((modeCode) => (
                        <ModeBadge key={modeCode} code={modeCode} size={32} />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Modes Section ===== */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4">
              Modes
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl tracking-tight text-neutral-900 mb-20" style={{ fontWeight: 300 }}>
              6つのモード
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-neutral-200">
              {modes.map((mode) => {
                const Icon = mode.icon;
                const isActive = activeMode === mode.id;
                return (
                  <motion.button
                    key={mode.id}
                    variants={fadeUp}
                    onClick={() => setActiveMode(isActive ? null : mode.id)}
                    className={`text-left p-10 transition-all cursor-pointer ${
                      isActive ? 'bg-neutral-50' : 'bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 mb-6 stroke-[1] transition-colors ${
                        isActive ? 'text-neutral-900' : 'text-neutral-300'
                      }`}
                    />

                    <div className="flex items-baseline gap-3 mb-2">
                      <ModeBadge code={mode.code} size={44} />
                      <span
                        className={`text-xl tracking-tight transition-colors ${
                          isActive ? 'text-neutral-900' : 'text-neutral-600'
                        }`}
                        style={{ fontWeight: 300 }}
                      >
                        {mode.title}
                      </span>
                    </div>

                    <p className="text-sm text-neutral-400">{mode.subtitle}</p>

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 pt-6 border-t border-neutral-200 flex gap-3"
                      >
                        {productLines.map((line) => {
                          const available = matrix[line.id].includes(mode.code);
                          return (
                            <div key={line.id} className="flex items-center">
                              {available ? (
                                <ProductLineBadge lineId={line.id} size={32} pattern={pattern} variant="solid" />
                              ) : (
                                <div className="px-3 py-1.5 rounded text-xs tracking-wide text-neutral-700 border border-neutral-800">
                                  {line.id}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Matrix Section ===== */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4">
              Matrix
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl tracking-tight text-neutral-900 mb-20" style={{ fontWeight: 300 }}>
              プロダクト &times; モード
            </motion.h2>

            <motion.div variants={fadeUp} className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 text-left text-xs tracking-[0.2em] uppercase text-neutral-400" style={{ fontWeight: 400 }}>
                      &nbsp;
                    </th>
                    {modes.map((mode) => (
                      <th
                        key={mode.id}
                        className="p-4 text-center"
                      >
                        <div className="flex justify-center">
                          <ModeBadge code={mode.code} size={44} />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productLines.map((line) => {
                    const plColors = currentGradient.productLines[line.id];
                    return (
                      <tr key={line.id} className="border-t border-neutral-100">
                        <td className="p-4">
                          <ProductLineBadge lineId={line.id} size={44} pattern={pattern} variant="outline" />
                        </td>
                        {modes.map((mode) => {
                          const available = matrix[line.id].includes(mode.code);
                          return (
                            <td key={mode.id} className="p-4 text-center">
                              {available ? (
                                <div
                                  className="w-4 h-4 rounded-full mx-auto"
                                  style={{ background: plColors.gradient }}
                                />
                              ) : (
                                <div className="w-4 h-4 rounded-full mx-auto bg-neutral-100" />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Brand Identity Section ===== */}
      <section className="py-32 px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4">
              Brand Identity
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl tracking-tight text-neutral-900 mb-20" style={{ fontWeight: 300 }}>
              ブランドアイデンティティ
            </motion.h2>

            {/* Logo display */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 mb-px">
              <div className="bg-white p-16 flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <GridIcon size={56} pattern={pattern} />
                  <span className="text-5xl tracking-tight text-neutral-800" style={{ fontWeight: 400 }}>
                    <span style={esTextStyle}>&#x190;S</span> Product
                  </span>
                </div>
              </div>
              <div className="bg-neutral-900 p-16 flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <GridIcon size={56} pattern={pattern} />
                  <span className="text-5xl tracking-tight text-neutral-200" style={{ fontWeight: 400 }}>
                    <span style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', fontWeight: 600 }}>&#x190;S</span> Product
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Color palette */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-px bg-neutral-200">
              {productLines.map((line) => {
                const plColors = currentGradient.productLines[line.id];
                return (
                  <div key={line.id} className="bg-white p-12">
                    <div className="flex items-center gap-4 mb-8">
                      <ProductLineBadge lineId={line.id} size={44} pattern={pattern} variant="outline" />
                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-3xl"
                          style={{
                            backgroundImage: plColors.gradient,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 600,
                          }}
                        >
                          {line.letter}
                        </span>
                        <span
                          className="text-3xl"
                          style={{
                            backgroundImage: plColors.gradient,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 600,
                          }}
                        >
                          S
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full mb-6" style={{ background: plColors.gradient }} />
                    <p className="text-xs text-neutral-400 tracking-wide">{plColors.color}</p>
                    <p className="text-sm text-neutral-500 mt-1">{line.description}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* Pattern B — icon & color detail */}
            <motion.div variants={fadeUp} className="mt-px bg-white p-16">
              <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-12">
                Icon &mdash; Gradient Pattern B
              </p>

              <div className="flex items-center gap-6 mb-10">
                <GridIcon size={64} pattern="B" />
                <span className="text-4xl tracking-tight text-neutral-800" style={{ fontWeight: 400 }}>
                  <span style={esTextStyle}>&#x190;S</span> Product
                </span>
              </div>

              <p className="text-sm text-neutral-500 mb-10">{currentGradient.description}</p>

              {/* 9-color swatches with individual gradients */}
              <div className="grid grid-cols-3 gap-px bg-neutral-100 mb-10">
                {currentGradient.dots.flat().map((color, i) => {
                  const row = Math.floor(i / 3);
                  const col = i % 3;
                  // 隣接色を使って各色固有のグラデーションを生成
                  const allColors = currentGradient.dots.flat();
                  const prev = allColors[Math.max(0, i - 1)];
                  const next = allColors[Math.min(8, i + 1)];
                  const gradBar = `linear-gradient(90deg, ${prev} 0%, ${color} 50%, ${next} 100%)`;
                  return (
                    <div key={`${row}-${col}`} className="bg-white p-6 flex flex-col gap-3">
                      {/* 大きめスウォッチ */}
                      <div
                        className="w-full rounded-lg"
                        style={{ height: 64, backgroundColor: color }}
                      />
                      {/* 前後色とつなぐグラデーションバー */}
                      <div
                        className="w-full h-2 rounded-full"
                        style={{ background: gradBar }}
                      />
                      {/* カラーコード */}
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[11px] text-neutral-500 font-mono tracking-wide">{color}</span>
                      </div>
                      <span className="text-[10px] text-neutral-300 font-mono">
                        [{row},{col}]
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* 行ごとのグラデーションバー */}
              <div className="space-y-3 mb-10">
                {currentGradient.dots.map((row, ri) => (
                  <div key={ri} className="flex items-center gap-4">
                    <span className="text-[10px] text-neutral-300 font-mono w-8 flex-shrink-0">Row {ri}</span>
                    <div
                      className="flex-1 h-5 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${row[0]} 0%, ${row[1]} 50%, ${row[2]} 100%)` }}
                    />
                    <div className="flex gap-1.5">
                      {row.map((c) => (
                        <span key={c} className="text-[9px] text-neutral-400 font-mono">{c}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 全体対角グラデーション */}
              <div className="mb-10">
                <div
                  className="w-full h-8 rounded-full"
                  style={{ background: currentGradient.textGradient }}
                />
                <p className="text-[10px] text-neutral-300 font-mono mt-2 tracking-wide">
                  full diagonal · 135deg · 9 stops
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-100 space-y-3">
                {productLines.map((line) => {
                  const plc = currentGradient.productLines[line.id];
                  return (
                    <div key={line.id} className="flex items-center gap-3">
                      <ProductLineBadge lineId={line.id} size={28} pattern="B" variant="outline" />
                      <ProductLineBadge lineId={line.id} size={28} pattern="B" variant="solid" />
                      <ProductLineBadge lineId={line.id} size={28} pattern="B" variant="complement" />
                      <span className="text-xs tracking-wide" style={plTextGradient(plc.gradient)}>{line.id}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">{plc.color}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ===== Color Palette Section ===== */}
      <section className="py-32 px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4">
              Color System
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl tracking-tight text-neutral-900 mb-4" style={{ fontWeight: 300 }}>
              9色のカラーパレット
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-neutral-400 mb-16" style={{ fontWeight: 300 }}>
              各カラーの10段階スケール（50〜900）と補助カラー（補色・類似色・トライアドなど）。カラーコードはクリックでコピー。
            </motion.p>
            <motion.div variants={fadeUp}>
              <PatternBPalette />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Character Concept Section (Easter Egg) ===== */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            {/* 2-col grid: Left = title + illustrations / Right = profile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
              {/* Left column */}
              <motion.div variants={fadeUp} className="bg-white p-12 flex flex-col">
                <div className="mb-auto">
                  <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4">
                    Character Concept <span className="ml-1 text-neutral-300">&mdash; for fun</span>
                  </p>
                  <h2 className="text-4xl tracking-tight text-neutral-900 mb-3" style={{ fontWeight: 300 }}>
                    非公認マスコット
                  </h2>
                  <p className="text-neutral-400" style={{ fontWeight: 300, fontSize: '14px' }}>
                    たまに現れる謎のキャラクター紹介
                  </p>
                </div>

                <div className="flex items-end justify-center gap-6 mt-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <EsOjisanGreet height={250} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex-shrink-0"
                  >
                    <EsOjisan size={115} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Right column — Profile */}
              <motion.div variants={fadeUp} className="bg-white p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-8">
                  <GridIcon size={28} pattern={pattern} />
                  <span className="text-xs tracking-[0.15em] uppercase text-neutral-400">ƐS Product Mascot</span>
                </div>

                <h3 className="text-2xl tracking-tight text-neutral-800 mb-1" style={{ fontWeight: 500 }}>
                  ƐSおじさん
                </h3>
                <p className="text-xs tracking-[0.1em] uppercase mb-5"
                  style={{ ...plTextGradient(currentGradient.textGradient) }}
                >
                  The Gentle Navigator
                </p>

                <p className="text-neutral-500 mb-6" style={{ lineHeight: 2, fontWeight: 300, fontSize: '13px' }}>
                  寿司職人からホテルのドアマン、プランナー、法人営業、衣装、美容を経て、現在はƐSのドアマンへ。
                  業界に長くいるにも関わらず、そんな詳しくない風な態度をとる。
                  基本偉そう。でも断らない男。ノラせたらやってくれる。余計な一言が多い。
                  まだ自分が非公認キャラだとは認識していない。
                  ボランティアでƐS のドアマンをしてくれている。
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {[
                    { label: '温厚', bg: 'bg-amber-50', text: 'text-amber-600' },
                    { label: '博識', bg: 'bg-slate-50', text: 'text-slate-500' },
                    { label: 'カイゼル髭', bg: 'bg-neutral-100', text: 'text-neutral-500' },
                    { label: '山高帽', bg: 'bg-indigo-50', text: 'text-indigo-500' },
                  ].map(tag => (
                    <span key={tag.label} className={`px-3 py-1 rounded-full text-[10px] tracking-wide ${tag.bg} ${tag.text}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>

                <div className="pt-5 border-t border-neutral-100">
                  <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-3">Background</p>
                  <ul className="space-y-1.5">
                    {[
                      { label: 'Age', desc: '50歳（人生折り返し）' },
                      { label: 'Born', desc: '東京都渋谷区生まれ。福岡県博多区育ち' },
                      { label: 'Lives', desc: '広尾在住' },
                      { label: 'Hangs out', desc: '中目黒' },
                      { label: 'Skill', desc: 'ダンス' },
                      { label: 'Hobby', desc: 'AIに悩み相談' },
                      { label: 'Catchphrase', desc: '結論から申し上げますと' },
                      { label: 'Previous job', desc: '寿司屋' },
                    ].map(item => (
                      <li key={item.label} className="flex items-start gap-2">
                        <span className="text-neutral-800 text-xs" style={{ fontWeight: 500, minWidth: '5rem' }}>{item.label}</span>
                        <span className="text-neutral-500 text-xs" style={{ fontWeight: 300 }}>{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Usage & design strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 mt-px">
              <motion.div variants={fadeUp} className="bg-white p-10">
                <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-4">Usage Ideas</p>
                <ul className="space-y-1">
                  {[
                    'ローディング画面のアニメーション',
                    'エラーページの案内役',
                    'ツールチップのヘルパー',
                    'オンボーディングのナビゲーター',
                    'リリースノートの解説役',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-neutral-500 text-xs" style={{ lineHeight: 1.6, fontWeight: 300 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-white p-10">
                <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-4">Design Principle</p>
                <ul className="space-y-2">
                  {[
                    { label: 'イメージ', desc: 'ドアマン' },
                    { label: 'フラット', desc: '立体感・艶なし' },
                    { label: 'ニュアンス', desc: '親しみやすく柔らかい' },
                    { label: 'ブランドカラー', desc: 'ゴールド×レッド×パープル' },
                    { label: 'シンプル', desc: '最小限の線と面' },                    
                  ].map(item => (
                    <li key={item.label} className="flex items-start gap-2">
                      <span className="text-neutral-800 text-xs" style={{ fontWeight: 500, minWidth: '5rem' }}>{item.label}</span>
                      <span className="text-neutral-400 text-xs" style={{ fontWeight: 300 }}>{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* ── S.Y.N.A.P.S.E プロフィールカード ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 mt-px">
              {/* Left — イラスト */}
              <motion.div variants={fadeUp} className="bg-white p-12 flex flex-col items-center justify-end">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                >
                  <Synapse height={280} />
                </motion.div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-300 mt-4">S.Y.N.A.P.S.E</p>
              </motion.div>

              {/* Right — プロフィール */}
              <motion.div variants={fadeUp} className="bg-white p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: '#111' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1" y="1" width="12" height="12" rx="2.5" stroke="#F5C518" strokeWidth="0.8" fill="none" />
                      <circle cx="4.5" cy="7" r="2" fill="#F5C518" opacity="0.9" />
                      <circle cx="9.5" cy="7" r="2" fill="#E48E20" opacity="0.85" />
                    </svg>
                  </div>
                  <span className="text-xs tracking-[0.15em] uppercase text-neutral-400">ƐS Product Mascot — AI Partner</span>
                </div>

                <h3 className="text-2xl tracking-tight text-neutral-800 mb-1" style={{ fontWeight: 500 }}>
                  S.Y.N.A.P.S.E (シナプス)
                </h3>
                <p className="text-xs tracking-[0.08em] uppercase mb-5 text-neutral-400" style={{ fontWeight: 400 }}>
                  Synthetic Yielding Neural Adaptive Processing System Engine
                </p>

                <p className="text-neutral-500 mb-6" style={{ lineHeight: 2, fontWeight: 300, fontSize: '13px' }}>
                  見た目は昭和のおもちゃのロボ。少し頼りない雰囲気を醸し出しているが、
                  その中身は高性能AI。
                  ƐSおじさんの行動パターンは大体読めており、次の一手を既に把握済み。
                  コーヒータイムが好きで、処理が早朝イチは特に機嫌が良い。
                  自分が非公認キャラだということには、うっすら気づいている。
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {[
                    { label: 'レトロ外観', bg: 'bg-slate-50', text: 'text-slate-500' },
                    { label: '超高性能', bg: 'bg-amber-50', text: 'text-amber-600' },
                    { label: 'コーヒー好き', bg: 'bg-orange-50', text: 'text-orange-500' },
                    { label: 'おじさん解析済', bg: 'bg-indigo-50', text: 'text-indigo-500' },
                  ].map(tag => (
                    <span key={tag.label} className={`px-3 py-1 rounded-full text-[10px] tracking-wide ${tag.bg} ${tag.text}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>

                <div className="pt-5 border-t border-neutral-100">
                  <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-3">Spec</p>
                  <ul className="space-y-1.5">
                    {[
                      { label: 'Model', desc: 'SYNAPSE OS v2.1' },
                      { label: 'Height', desc: 'ƐSおじさんより少し小さめ' },
                      { label: 'Eyes', desc: '左:ゴールドLED / 右:アンバーLED（非対称）' },
                      { label: 'Specialty', desc: 'ƐSおじさんの行動予測（精度:推定99.3%）' },
                      { label: 'Favorite', desc: 'コーヒー（ブラック・クレマ厚め）' },
                      { label: 'Weak point', desc: 'アンテナが少し曲がっている' },
                      { label: 'Catchphrase', desc: '…既に計算済みです' },
                    ].map(item => (
                      <li key={item.label} className="flex items-start gap-2">
                        <span className="text-neutral-800 text-xs" style={{ fontWeight: 500, minWidth: '5rem' }}>{item.label}</span>
                        <span className="text-neutral-500 text-xs" style={{ fontWeight: 300 }}>{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Signature strip */}
            <motion.div variants={fadeUp} className="mt-px bg-neutral-900 p-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                  <EsOjisan size={16} />
                </div>
                <div>
                  <p className="text-white text-xs tracking-wide" style={{ fontWeight: 500 }}>ƐSおじさん</p>
                  <p className="text-neutral-600 text-[9px] tracking-wide">The Gentle Navigator</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <GridIcon size={24} pattern={pattern} />
                <span className="text-neutral-500 text-xs tracking-wide" style={{ fontWeight: 300 }}>
                  ƐS Product Unofficial Mascot
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="py-16 px-8 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GridIcon size={28} pattern={pattern} />
            <span className="text-sm text-neutral-400 tracking-wide">
              <span style={esTextStyle}>&#x190;S</span> Product
            </span>
          </div>
          <p className="text-xs text-neutral-300 tracking-wide">
            &copy; 2026 &#x190;S Product. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}