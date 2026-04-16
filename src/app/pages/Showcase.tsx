import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, ArrowDown } from 'lucide-react';
import { GridIcon, gradientPatterns, ProductLineBadge } from '../components/GridIcon';
import type { GradientPattern } from '../components/GridIcon';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const pattern: GradientPattern = 'B';
const gp = gradientPatterns[pattern];

const esTextStyleLight: React.CSSProperties = { color: 'white', fontWeight: 600 };
const esTextStyleDark: React.CSSProperties = { color: '#1a1a1a', fontWeight: 600 };

const productLines = [
  {
    id: 'ES',
    letter: 'E',
    name: 'Experience System',
    who: '導入する会社様が利用する主となるツール',
    tagline: '体験を、設計する。',
    description:
      'あらゆるイベントの核となる体験を設計するコアエンジン。婚礼から法人宴会、衣装、美容、写真、装花まで——6つのモードすべてを統合し、唯一無二の瞬間を生み出します。',
    features: ['全6モード対応', 'リアルタイム連携', 'AI最適化エンジン'],
    image:
      'https://images.unsplash.com/photo-1759730840961-09faa5731a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwdmVudWUlMjBiYWxscm9vbSUyMGVsZWdhbnR8ZW58MXx8fHwxNzcxOTE1OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'CS',
    letter: 'C',
    name: 'Communication System',
    who: '導入する会社様のお客様が使うツール',
    tagline: '接点を、最適化する。',
    description:
      '顧客とのあらゆるタッチポイントをインテリジェントに最適化。婚礼・法人宴会・衣装の3モードに対応し、予約からフォローアップまでシームレスなコミュニケーションを実現します。',
    features: ['オムニチャネル対応', 'パーソナライズ配信', 'カスタマージャーニー設計'],
    image:
      'https://images.unsplash.com/photo-1762176263996-a0713a49ee4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBjb25mZXJlbmNlJTIwZXZlbnQlMjBtb2Rlcm58ZW58MXx8fHwxNzcxOTE1OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'PS',
    letter: 'P',
    name: 'Partner System',
    who: '導入する会社様と取引のあるパートナー様が使うツール',
    tagline: '基盤で、つなぐ。',
    description:
      'パートナー企業を支え、つなぐプラットフォーム基盤。婚礼・法人宴会の2モードで、会場・ベンダー・スタッフの連携を一元管理し、オペレーションの効率を最大化します。',
    features: ['パートナー管理', 'リソース最適配分', 'ダッシュボード統合'],
    image:
      'https://images.unsplash.com/photo-1762340274767-07fd7e1e5099?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcGxhdGZvcm0lMjBuZXR3b3JrJTIwY29ubmVjdGlvbiUyMGRhcmt8ZW58MXx8fHwxNzcxOTE1OTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

const modeCount: Record<string, number> = { ES: 6, CS: 3, PS: 2 };

// --------- Sub-components ---------

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 80]);

  return (
    <section ref={ref} className="relative h-[200vh]" style={{ position: 'relative' }}>
      <motion.div
        style={{ opacity, scale, y }}
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background — keep dark for cinematic contrast */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(212,155,26,0.15) 0%, rgba(192,57,43,0.08) 40%, transparent 70%)',
          }}
        />

        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6"
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs tracking-widest uppercase">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <GridIcon size={24} pattern={pattern} />
            <span className="text-sm text-white/60 tracking-wide">
              <span style={esTextStyleLight}>&#x190;S</span>{' '}
              <span className="text-white/40">Product</span>
            </span>
          </div>
        </motion.nav>

        {/* Hero content */}
        <div className="relative z-10 text-center px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <GridIcon size={80} pattern={pattern} className="mx-auto" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,8vw,7rem)] tracking-tight text-white leading-none mb-6"
            style={{ fontWeight: 300 }}
          >
            <span style={{ ...esTextStyleLight, fontWeight: 500 }}>&#x190;S</span> Product
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white/40 text-lg tracking-[0.2em] mb-4"
            style={{ fontWeight: 300 }}
          >
            すべてをシームレスへ。
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-white/25 text-sm tracking-wide max-w-md mx-auto"
            style={{ fontWeight: 300 }}
          >
            3つのプロダクトラインが、体験のすべてを統合する。
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-16 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
            Scroll to explore
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ArrowDown className="w-4 h-4 text-white/20" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── ES System Diagram Section ────────────────────────────────────────────────
function ESSystemSection() {
  const plColors = gp.productLines['ES'];

  const esModules = {
    salesUp: [{ name: '営業支援' }, { name: '売上分析' }],
    efficiency: [
      { name: '問い合わせ' },
      { name: 'ターゲット案件管理' },
      { name: '企業・個人 利用履歴管理' },
      { name: '営業活動日報' },
      { name: '会場予約管理' },
      { name: '見積請求管理' },
      { name: '発注管理' },
      { name: '請書管理' },
      { name: '入金管理' },
      { name: 'メール配信' },
    ],
  };

  const inputSources = [
    {
      title: '媒体一括予約管理サービス',
      badge: '開発中',
      subtitle: '宴会検索媒体',
      items: ['合場ベストサーチ', 'Speedy'],
      arrowLabel: 'API自動連携',
    },
    {
      title: 'HP事業',
      badge: '構想中',
      subtitle: '集客媒体 → HP',
      items: ['SNS広告', 'Facebook', 'Instagram', 'LINE', 'YouTube'],
      arrowLabel: '自動連携',
      sub: '予約問い合わせフォーム',
    },
  ];

  const outputDests = [
    {
      title: '会計システム',
      arrowLabel: 'API or CSV連携',
      items: ['freee', 'NEHOPS', '勘定奉行クラウド', 'UON'],
    },
    {
      title: 'パートナー受発注',
      arrowLabel: '自動連携可',
      items: ['※パートナー用のページを用意'],
      accent: true,
    },
  ];

  return (
    <section className="relative bg-white">
      <div className="max-w-6xl mx-auto px-8 py-24 lg:py-36">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 block mb-5">
            ES System · 宴会モード
          </span>
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] text-neutral-900 tracking-tight leading-tight mb-5"
            style={{ fontWeight: 300 }}
          >
            <span
              style={{
                backgroundImage: plColors.gradient,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 600,
              }}
            >
              ƐS
            </span>{' '}
            は、すべてをつなぐ。
          </h2>
          <p className="text-neutral-400 max-w-xl leading-relaxed" style={{ fontWeight: 300 }}>
            多様な外部ツールと連携し、情報を一元管理。<br />
            業務をワンストップで完結させ、効率化と売上向上を実現します。
          </p>
        </motion.div>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="grid grid-cols-[1fr_auto_2fr_auto_1fr] gap-4 items-start"
        >
          {/* ── Left: Input sources ── */}
          <div className="flex flex-col gap-3">
            {inputSources.map((src, i) => (
              <motion.div
                key={src.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-[10px] text-neutral-700 tracking-wide leading-tight" style={{ fontWeight: 500 }}>
                    {src.title}
                  </p>
                  <span className="text-[8px] px-1.5 py-0.5 rounded-full border border-neutral-300 text-neutral-400 tracking-wide ml-2 flex-shrink-0">
                    {src.badge}
                  </span>
                </div>
                <p className="text-[9px] text-neutral-400 mb-2 tracking-wide">{src.subtitle}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {src.items.map((item) => (
                    <span key={item} className="text-[9px] px-1.5 py-0.5 rounded bg-white text-neutral-500 border border-neutral-200">
                      {item}
                    </span>
                  ))}
                </div>
                {src.sub && (
                  <div
                    className="mt-2 pt-2 border-t border-neutral-200 text-[9px] tracking-wide rounded px-2 py-1.5"
                    style={{ background: `linear-gradient(135deg, rgba(245,197,24,0.06), rgba(224,150,42,0.06))` }}
                  >
                    <span className="text-neutral-600">{src.sub}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* ── Center-Left arrows ── */}
          <div className="flex flex-col justify-around h-full gap-3 pt-8">
            {inputSources.map((src, i) => (
              <div key={i} className="flex flex-col items-center gap-1 py-4">
                <span className="text-[8px] tracking-[0.1em] text-neutral-400 whitespace-nowrap mb-1">{src.arrowLabel}</span>
                <svg width="28" height="8" viewBox="0 0 28 8" fill="none">
                  <line x1="0" y1="4" x2="22" y2="4" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="3 2" />
                  <path d="M28 4 L20 0.5 L20 7.5 Z" fill="rgba(0,0,0,0.2)" />
                </svg>
              </div>
            ))}
          </div>

          {/* ── Center: ES Core ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-2xl overflow-hidden border border-neutral-200"
            style={{ background: '#ffffff' }}
          >
            {/* ES Header */}
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{
                background: `linear-gradient(135deg, rgba(245,197,24,0.08) 0%, rgba(224,150,42,0.05) 50%, rgba(60,37,98,0.06) 100%)`,
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center gap-2">
                <GridIcon size={20} pattern={pattern} />
                <span
                  className="text-lg tracking-tight"
                  style={{
                    backgroundImage: plColors.gradient,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  ƐS
                </span>
              </div>
              <ProductLineBadge lineId="ES" size={24} pattern={pattern} variant="solid" />
            </div>

            {/* 売上UP */}
            <div className="px-4 pt-4 pb-2">
              <div
                className="text-[9px] tracking-[0.2em] uppercase text-center mb-2 py-1 rounded"
                style={{
                  color: '#C49010',
                  background: 'rgba(245,197,24,0.08)',
                  border: '1px solid rgba(245,197,24,0.2)',
                }}
              >
                売上 UP
              </div>
              <div className="grid grid-cols-2 gap-1 mb-3">
                {esModules.salesUp.map((m) => (
                  <div
                    key={m.name}
                    className="text-center text-[10px] py-2 rounded text-neutral-600 border border-neutral-200 bg-neutral-50"
                  >
                    {m.name}
                  </div>
                ))}
              </div>
            </div>

            {/* 業務効率UP */}
            <div className="px-4 pb-3">
              <div
                className="text-[9px] tracking-[0.2em] uppercase text-center mb-2 py-1 rounded"
                style={{
                  color: 'rgba(0,0,0,0.4)',
                  background: 'rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                業務効率 UP
              </div>
              <div className="grid grid-cols-2 gap-1">
                {esModules.efficiency.map((m) => (
                  <div
                    key={m.name}
                    className="text-center text-[9px] py-1.5 rounded text-neutral-500 border border-neutral-100 leading-tight px-1 bg-neutral-50"
                  >
                    {m.name}
                  </div>
                ))}
              </div>
            </div>

            {/* マイページ */}
            <div
              className="mx-4 mb-4 px-3 py-2.5 rounded-lg border border-dashed border-neutral-300"
              style={{ background: 'rgba(80,58,110,0.04)' }}
            >
              <p className="text-[9px] text-neutral-600 mb-0.5" style={{ fontWeight: 500 }}>
                マイページ <span className="text-[8px] text-neutral-400">（開発中）</span>
              </p>
              <p className="text-[8px] text-neutral-400 leading-tight">
                Web上で見積・請求書・電子サイン・チャット等開発中
              </p>
            </div>
          </motion.div>

          {/* ── Center-Right arrows ── */}
          <div className="flex flex-col justify-around h-full gap-3 pt-8">
            {outputDests.map((dest, i) => (
              <div key={i} className="flex flex-col items-center gap-1 py-4">
                <span className="text-[8px] tracking-[0.1em] text-neutral-400 whitespace-nowrap mb-1">{dest.arrowLabel}</span>
                <svg width="28" height="8" viewBox="0 0 28 8" fill="none">
                  <line x1="0" y1="4" x2="22" y2="4" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="3 2" />
                  <path d="M28 4 L20 0.5 L20 7.5 Z" fill="rgba(0,0,0,0.2)" />
                </svg>
              </div>
            ))}
          </div>

          {/* ── Right: Output destinations ── */}
          <div className="flex flex-col gap-3">
            {outputDests.map((dest, i) => (
              <motion.div
                key={dest.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                className="rounded-xl border p-4"
                style={{
                  borderColor: dest.accent ? 'rgba(245,197,24,0.3)' : 'rgba(0,0,0,0.08)',
                  background: dest.accent
                    ? 'linear-gradient(135deg, rgba(245,197,24,0.05), rgba(224,150,42,0.05))'
                    : '#fafafa',
                }}
              >
                <p
                  className="text-[10px] tracking-wide mb-2 leading-tight"
                  style={{
                    fontWeight: 500,
                    color: dest.accent ? '#B8880A' : 'rgba(0,0,0,0.5)',
                  }}
                >
                  {dest.title}
                </p>
                <div className="flex flex-wrap gap-1">
                  {dest.items.map((item) => (
                    <span
                      key={item}
                      className="text-[8px] px-1.5 py-0.5 rounded border text-neutral-500"
                      style={{
                        borderColor: dest.accent ? 'rgba(245,197,24,0.2)' : 'rgba(0,0,0,0.08)',
                        background: 'white',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex items-center gap-6 border-t border-neutral-100 pt-6"
        >
          {[
            { label: '開発中', note: '順次リリース予定' },
            { label: '構想中', note: '将来対応予定' },
            { label: 'API連携', note: 'リアルタイム同期' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-[8px] px-1.5 py-0.5 rounded-full border border-neutral-300 text-neutral-400 tracking-wide">
                {item.label}
              </span>
              <span className="text-[9px] text-neutral-300">{item.note}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-40 px-8 bg-white" style={{ position: 'relative' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245,197,24,0.04) 0%, transparent 70%)',
        }}
      />
      <motion.div style={{ opacity }} className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[clamp(1.5rem,3vw,2.5rem)] text-neutral-800 leading-relaxed tracking-tight"
          style={{ fontWeight: 300 }}
        >
          ひとつのプラットフォームが、
          <br />
          <span
            style={{
              backgroundImage: gp.textGradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            体験のすべて
          </span>
          を変える。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 flex items-center justify-center gap-16"
        >
          {productLines.map((pl) => (
            <div key={pl.id} className="flex flex-col items-center gap-3">
              <ProductLineBadge lineId={pl.id} size={48} pattern={pattern} variant="outline" />
              <span className="text-xs text-neutral-400 tracking-widest">{pl.name}</span>
              <span className="text-[11px] text-neutral-300">{pl.who}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProductLineSection({
  pl,
  index,
}: {
  pl: (typeof productLines)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const plColors = gp.productLines[pl.id];
  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="relative bg-white" style={{ position: 'relative' }}>
      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="h-px bg-neutral-100" />
      </div>

      <div className="max-w-7xl mx-auto px-8 py-24 lg:py-36">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-neutral-300">
            Product Line 0{index + 1}
          </span>
        </motion.div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${
            !isEven ? 'lg:[direction:rtl]' : ''
          }`}
        >
          {/* Text side */}
          <div className={!isEven ? 'lg:[direction:ltr]' : ''}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <ProductLineBadge lineId={pl.id} size={64} pattern={pattern} variant="solid" />
              <div>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-6xl tracking-tight"
                    style={{
                      backgroundImage: plColors.gradient,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: 600,
                    }}
                  >
                    {pl.letter}
                  </span>
                  <span
                    className="text-6xl tracking-tight"
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
                <p className="text-xs text-neutral-400 tracking-widest mt-1">{pl.name}</p>
                <p className="text-[11px] text-neutral-300 mt-0.5">{pl.who}</p>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-[clamp(2rem,4vw,3.5rem)] text-neutral-900 tracking-tight leading-tight mb-8"
              style={{ fontWeight: 300 }}
            >
              {pl.tagline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-neutral-500 leading-relaxed mb-10 max-w-lg"
              style={{ fontWeight: 300 }}
            >
              {pl.description}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {pl.features.map((f) => (
                <span
                  key={f}
                  className="px-4 py-2 rounded-full text-xs tracking-wide border border-neutral-200 text-neutral-500"
                >
                  {f}
                </span>
              ))}
            </motion.div>

            {/* Mode count */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-baseline gap-2"
            >
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
                {modeCount[pl.id]}
              </span>
              <span className="text-sm text-neutral-400 tracking-wide">modes</span>
            </motion.div>
          </div>

          {/* Image side */}
          <div className={`relative ${!isEven ? 'lg:[direction:ltr]' : ''}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.2, duration: 1 }}
              className="relative overflow-hidden rounded-2xl aspect-[4/5]"
            >
              <motion.div style={{ y: imgY }} className="absolute inset-[-20%]">
                <ImageWithFallback
                  src={pl.image}
                  alt={pl.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)`,
                }}
              />
              {/* Corner badge */}
              <div className="absolute bottom-8 left-8">
                <ProductLineBadge lineId={pl.id} size={40} pattern={pattern} variant="dark" />
              </div>
            </motion.div>

            {/* Accent line */}
            <div
              className="absolute -bottom-4 left-8 right-8 h-px opacity-20"
              style={{ background: plColors.gradient }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="relative py-40 px-8 bg-white overflow-hidden">
      {/* Subtle glow */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(212,155,26,0.08) 0%, rgba(192,57,43,0.04) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <GridIcon size={64} pattern={pattern} className="mx-auto mb-10" />

          <h2
            className="text-[clamp(2rem,5vw,4rem)] text-neutral-900 tracking-tight leading-tight mb-8"
            style={{ fontWeight: 300 }}
          >
            すべてが、ひとつに。
          </h2>

          <p
            className="text-neutral-400 max-w-lg mx-auto leading-relaxed mb-16"
            style={{ fontWeight: 300 }}
          >
            3つのプロダクトラインが連携し、体験のあらゆる側面をカバーする。
            <br />
            それが、ƐS Product。
          </p>

          {/* Three badges in a row */}
          <div className="flex items-center justify-center gap-6">
            {productLines.map((pl) => (
              <motion.div
                key={pl.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: productLines.indexOf(pl) * 0.15, duration: 0.6 }}
              >
                <ProductLineBadge lineId={pl.id} size={56} pattern={pattern} variant="solid" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-24 pt-8 border-t border-neutral-100 max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GridIcon size={20} pattern={pattern} />
          <span className="text-xs text-neutral-400 tracking-wide">
            <span style={esTextStyleDark}>&#x190;S</span> Product
          </span>
        </div>
        <Link
          to="/"
          className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors tracking-widest uppercase"
        >
          Brand Guidelines →
        </Link>
      </div>
    </section>
  );
}

// --------- Main page ---------

export default function Showcase() {
  return (
    <div className="bg-white relative" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <HeroSection />
      <IntroSection />
      {productLines.map((pl, i) => (
        <ProductLineSection key={pl.id} pl={pl} index={i} />
      ))}
      <ESSystemSection />
      <ClosingSection />
    </div>
  );
}
