import {
  GridIcon,
  gradientPatterns,
  type GradientPattern,
  ProductLineBadge,
} from "../components/GridIcon";
import { PatternBPalette } from "../components/PatternBPalette";
import { ModeIconGlassCard, ModeIconGlass, MODE_GLASS_CONFIG } from "../components/ModeIconGlass";
import React, { useState, useRef } from "react";
import { Link } from "react-router";
import {
  ChevronDown,
} from "lucide-react";
import { motion } from "motion/react";
import esOjisanImg from "figma:asset/a2e64ff85bdae31ceb529d8a9380ee68327aa6e6.png";
import synapseImg from "figma:asset/7dc195601692a81362a07dbf1225fe2b9b788242.png";
import esOjisanBWImg from "figma:asset/4767d4026ad10b35afa0ffd2506b79812c6cdc38.png";
import { Synapse02 } from "../components/Synapse02";
import { Synapse03 } from "../components/Synapse03";
import { Synapse04 } from "../components/Synapse04";
import { Synapse01 } from "../components/Synapse01";
import { Synapse05 } from "../components/Synapse05";
import { Synapse06 } from "../components/Synapse06";
import { Synapse07 } from "../components/Synapse07";
import { Synapse08 } from "../components/Synapse08";
import { Synapse09 } from "../components/Synapse09";

const ES_GRADIENT = 'linear-gradient(135deg, #F5C518 0%, #D49B1A 20%, #C0392B 50%, #4A2040 80%, #3C2562 100%)';

// プロダクトライン定義
const productLines = [
  {
    id: "ES",
    letter: "E",
    description: "Experience System",
    who: "導入会社様が主となるツール",
    subtitle: "すべての根幹となるコアエンジン",
  },
  {
    id: "CS",
    letter: "C",
    description: "Communication System",
    who: "導入会社様のお客様の利用ツール",
    subtitle: "顧客接点を最適化するマイページ",
  },
  {
    id: "PS",
    letter: "P",
    description: "Partner System",
    who: "取引のあるパートナー様の利用ツール",
    subtitle: "パートナー様も巻き込む基盤",
  },
];

// AI ライン（独立 — ES/CS/PS 全体に横断）
const aiLine = {
  id: "AI",
  letter: "A",
  description: "AI Intelligence",
  who: "すべてのラインに横断するAI機能",
  subtitle: "業務を自動化・最適化するインテリジェンス",
};

// モード定義
const modes = [
  { id: "br", code: "Br", title: "婚礼モード",    subtitle: "Bridal",      color: "#E05580" },
  { id: "gp", code: "Gp", title: "法人宴会モード", subtitle: "Group Party", color: "#6366F1" },
  { id: "dr", code: "Dr", title: "衣装モード",    subtitle: "Dress",       color: "#D4731A" },
  { id: "et", code: "Et", title: "美容モード",    subtitle: "Esthetic",    color: "#10B981" },
  { id: "ph", code: "Ph", title: "写真モード",    subtitle: "Photo",       color: "#3B82F6" },
  { id: "fl", code: "Fl", title: "装花モード",    subtitle: "Flower",      color: "#F59E0B" },
];

// マトリックスデータ
const matrix: Record<string, string[]> = {
  ES: ["Br", "Gp", "Dr", "Et", "Ph", "Fl"],
  CS: ["Br", "Gp", "Dr"],
  PS: ["Br", "Gp"],
  AI: ["Br", "Gp", "Dr", "Et", "Ph", "Fl"],
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// プロダクトラインテキストにグラデーションを適用
const plTextGradient = (
  gradient: string,
): React.CSSProperties => ({
  backgroundImage: gradient,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 600,
});

export default function Home() {
  const [activeMode, setActiveMode] = useState<string | null>(
    null,
  );
  const pattern: GradientPattern = "B";
  const contentRef = useRef<HTMLDivElement>(null);

  const currentGradient = gradientPatterns[pattern];
  const esTextStyle: React.CSSProperties = {
    backgroundImage: currentGradient.textGradient,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 600,
  };

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen bg-white relative"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* ===== Hero Section ===== */}
      <section className="h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center relative px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 tracking-wide text-center"
          style={{
            fontWeight: 500,
            fontSize: '1.15rem',
            backgroundImage: ES_GRADIENT,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          婚礼・宴会・衣装・美容の総合基幹システム
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-4 text-neutral-400 text-base tracking-widest"
        >
          すべてをシームレスへ。
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={scrollToContent}
          className="absolute bottom-12 flex flex-col items-center gap-2 text-neutral-300 hover:text-neutral-500 transition-colors cursor-pointer"
        >
          <span className="text-xs tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </section>

      {/* ===== About Section ===== */}
      <section ref={contentRef} className="relative py-24 md:py-32 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
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
              <span style={{ ...esTextStyle, fontWeight: 500 }}>
                &#x190;S
              </span>{" "}
              Product とは
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="w-10 h-px mx-auto mb-12"
              style={{
                background: currentGradient.textGradient,
              }}
            />

            {/* Service keywords — horizontal flow */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-10"
            >
              {[
                "婚礼",
                "宴会",
                "衣装",
                "美容",
                "写真",
                "装花",
              ].map((word, i) => (
                <span
                  key={word}
                  className="flex items-center gap-4"
                >
                  <span
                    className="text-neutral-500 tracking-widest"
                    style={{ fontWeight: 300 }}
                  >
                    {word}
                  </span>
                  {i < 5 && (
                    <span className="text-neutral-300">·</span>
                  )}
                </span>
              ))}
            </motion.div>

            {/* Narrative — stepped opacity */}
            <motion.div
              variants={fadeUp}
              className="space-y-1 mb-14"
            >
              <p
                className="text-neutral-500"
                style={{ lineHeight: "2.2", fontWeight: 300 }}
              >
                これらを扱う会社様、お客様、パートナー様、
              </p>
              <p
                className="text-neutral-500"
                style={{ lineHeight: "2.2", fontWeight: 300 }}
              >
                ３社（者）すべてが繋がることで
              </p>
              <p
                className="text-neutral-500"
                style={{ lineHeight: "2.2", fontWeight: 300 }}
              >
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
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
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
                transition={{
                  duration: 1,
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
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
                transition={{
                  duration: 1.2,
                  delay: 1.0,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="mt-8 h-px w-32 mx-auto origin-left"
                style={{
                  background: currentGradient.textGradient,
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Logo Concept Section ===== */}
      <section className="relative py-32 px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4"
            >
              Logo Concept
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl tracking-tight text-neutral-900 mb-20"
              style={{ fontWeight: 300 }}
            >
              ロゴのコンセプト
            </motion.h2>

            {/* ── Main visual ── */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 mb-px"
            >
              {/* Left — Ɛ symbol + S transform */}
              <div className="bg-white p-16 flex flex-col justify-between">
                <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-300 mb-10">
                  01 &mdash; Symbol
                </p>

                {/* S → Ɛ transform visual */}
                <div className="flex items-center justify-center gap-8 mb-14">
                  <div className="flex flex-col items-center gap-3">
                    <span
                      className="text-8xl tracking-tight text-neutral-200 select-none"
                      style={{ fontWeight: 600, lineHeight: 1 }}
                    >
                      S
                    </span>
                    <span className="text-[9px] tracking-[0.25em] uppercase text-neutral-300">
                      origin
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                      <line x1="0" y1="6" x2="24" y2="6" stroke="#D1D5DB" strokeWidth="1"/>
                      <polyline points="18,1 26,6 18,11" stroke="#D1D5DB" strokeWidth="1" fill="none"/>
                    </svg>
                    <span className="text-[8px] tracking-[0.2em] text-neutral-300 uppercase">mirror</span>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <span
                      className="text-8xl tracking-tight select-none"
                      style={{
                        fontWeight: 600,
                        lineHeight: 1,
                        backgroundImage: currentGradient.textGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      &#x190;
                    </span>
                    <span className="text-[9px] tracking-[0.25em] uppercase text-neutral-400">
                      Ɛ — epsilon
                    </span>
                  </div>
                </div>

                <div className="space-y-4 border-t border-neutral-100 pt-8">
                  <p
                    className="text-neutral-500 text-sm"
                    style={{ lineHeight: 2, fontWeight: 300 }}
                  >
                    「S」���水平反転させた造形。角ばった「E」ではなく、
                    S字曲線を宿した Ɛ（エプシロン）を採用することで、
                    プロダクトラインの共通項たる「S」をロゴ自身に刻む。
                  </p>
                  <p
                    className="text-[11px] text-neutral-400"
                    style={{ lineHeight: 1.8, fontWeight: 300 }}
                  >
                    ※ パッと見で「E」と認識させつつ、「イーエス」の呼称を継承。
                  </p>
                </div>
              </div>

              {/* Right — 3×3 dot grid */}
              <div className="bg-white p-16 flex flex-col justify-between">
                <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-300 mb-10">
                  03 &mdash; 9 Dots / Concept Color Grid
                </p>

                <div className="flex justify-center mb-10">
                  <div
                    className="grid gap-5"
                    style={{ gridTemplateColumns: "repeat(3, 1fr)", width: "fit-content" }}
                  >
                    {(currentGradient.dots as string[][]).flat().map((color, i) => {
                      const row = Math.floor(i / 3);
                      const lineLabels = ["ES", "CS", "PS"];
                      return (
                        <div key={i} className="flex flex-col items-center gap-2">
                          <div
                            className="rounded-full"
                            style={{
                              width: 36,
                              height: 36,
                              backgroundColor: color,
                              boxShadow: `0 4px 16px ${color}55`,
                            }}
                          />
                          {i % 3 === 1 && (
                            <span className="text-[8px] tracking-[0.15em] uppercase text-neutral-300">
                              {lineLabels[row]}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3 border-t border-neutral-100 pt-8">
                  {(currentGradient.dots as string[][]).map((row, ri) => {
                    const labels = [
                      { id: "ES", desc: "イエロー — エネルギーと始まり" },
                      { id: "CS", desc: "レッド・オレンジ — 高揚感" },
                      { id: "PS", desc: "パープル — 信頼の黒子" },
                    ];
                    return (
                      <div key={ri} className="flex items-center gap-4">
                        <span
                          className="text-[10px] tracking-[0.15em] uppercase flex-shrink-0"
                          style={{
                            backgroundImage: `linear-gradient(90deg, ${row[0]}, ${row[2]})`,
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: 600,
                            minWidth: "2.5rem",
                          }}
                        >
                          {labels[ri].id}
                        </span>
                        <div
                          className="flex-1 h-1.5 rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${row[0]} 0%, ${row[1]} 50%, ${row[2]} 100%)`,
                          }}
                        />
                        <span className="text-[9px] text-neutral-400" style={{ fontWeight: 300, minWidth: "9rem" }}>
                          {labels[ri].desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* ── Gradient story ── */}
            <motion.div
              variants={fadeUp}
              className="bg-white p-16 mb-px"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-300 mb-10">
                02 &mdash; Gradient Story
              </p>

              <div
                className="w-full h-10 rounded-full mb-10"
                style={{ background: currentGradient.textGradient }}
              />

              <div className="grid grid-cols-3 gap-px bg-neutral-100">
                {[
                  {
                    id: "ES",
                    label: "Top-Left",
                    color: "#F5C518",
                    desc: "イエロー",
                    story: "エネルギーと始まりの象徴。すべてのプロセスの起点。",
                    gradient: currentGradient.productLines["ES"]?.gradient,
                  },
                  {
                    id: "CS",
                    label: "Center",
                    color: "#D06030",
                    desc: "レッド・オレンジ",
                    story: "新郎新婦やゲストの気分が上がる、感情の高揚感。",
                    gradient: currentGradient.productLines["CS"]?.gradient,
                  },
                  {
                    id: "PS",
                    label: "Bottom-Right",
                    color: "#503A6E",
                    desc: "パープル",
                    story: "会社様を背後から支える「黒子」としての信頼と深み。",
                    gradient: currentGradient.productLines["PS"]?.gradient,
                  },
                ].map((item) => (
                  <div key={item.id} className="bg-white p-10">
                    <div
                      className="w-10 h-10 rounded-full mb-6"
                      style={{
                        background: item.gradient,
                        boxShadow: `0 4px 20px ${item.color}60`,
                      }}
                    />
                    <div className="flex items-baseline gap-2 mb-1">
                      <span
                        className="text-xl tracking-tight"
                        style={{
                          backgroundImage: item.gradient,
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: 600,
                        }}
                      >
                        {item.id}
                      </span>
                      <span className="text-[10px] tracking-[0.15em] uppercase text-neutral-300">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500 mb-1" style={{ fontWeight: 400 }}>
                      {item.desc}
                    </p>
                    <p className="text-xs text-neutral-400" style={{ lineHeight: 1.8, fontWeight: 300 }}>
                      {item.story}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div
                  className="w-6 h-6 rounded flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #F5C518 0%, #3C2562 100%)",
                  }}
                />
                <p className="text-[11px] text-neutral-400 tracking-wide" style={{ fontWeight: 300 }}>
                  Direction: <span className="text-neutral-600">135° — Top-Left → Bottom-Right</span>
                  　　Stops: <span className="text-neutral-600">#F5C518 → #E48E20 → #D06030 → #A83C42 → #503A6E → #3C2562</span>
                </p>
              </div>
            </motion.div>

            {/* ── Figma Spec ── */}
            <motion.div
              variants={fadeUp}
              className="bg-neutral-900 p-12"
            >
              <div className="flex items-start gap-6 mb-8">
                <GridIcon size={36} pattern={pattern} />
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-1">
                    Figma Production Spec
                  </p>
                  <p className="text-neutral-200 text-sm tracking-wide" style={{ fontWeight: 300 }}>
                    【ƐS Product ロゴ制作依頼】
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    label: "Symbol",
                    desc: "「S」を完全にミラー反転させた「Ɛ」をロゴタイプとして作成。角ばったEではなくS字曲線を継承すること。",
                  },
                  {
                    label: "Gradient",
                    desc: "左上（#F5C518 イエロー）から右下（#3C2562 パープル）への135°リニアグラデーションを「Ɛ」に適用。",
                  },
                  {
                    label: "Grid",
                    desc: "9つのドットを3×3で配置。ES（ゴールド系）・CS（レッド系）・PS（パープル系）の各3色を行ごとに割り当て。",
                  },
                  {
                    label: "Scaling",
                    desc: "スマホのメニューアイコンとして利用できるよう、シンボルマーク単体での視認性を検証。ドット間マージンは縮小時も色が潰れない厳密な比率で。",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div
                      className="w-px self-stretch flex-shrink-0"
                      style={{ background: currentGradient.textGradient }}
                    />
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                        {item.label}
                      </p>
                      <p className="text-neutral-400 text-xs" style={{ lineHeight: 1.9, fontWeight: 300 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ===== Product Lines Section ===== */}
      <section className="relative py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4"
            >
              Product Lines
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl tracking-tight text-neutral-900 mb-20"
              style={{ fontWeight: 300 }}
            >
              3つのプロダクトライン
            </motion.h2>

            {/* ES / CS / PS — 3列グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200">
              {productLines.map((line) => {
                const plColors = currentGradient.productLines[line.id];
                return (
                  <motion.div
                    key={line.id}
                    variants={fadeUp}
                    className="bg-white p-12 group hover:bg-neutral-50 transition-colors"
                  >
                    <ProductLineBadge
                      lineId={line.id}
                      size={56}
                      pattern={pattern}
                      variant="outline"
                      className="mb-8"
                    />
                    <div className="flex items-baseline gap-1 mb-4">
                      <span
                        className="text-5xl tracking-tight"
                        style={{
                          backgroundImage: plColors.gradient,
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: 600,
                        }}
                      >
                        {line.letter}
                      </span>
                      <span
                        className="text-5xl tracking-tight"
                        style={{
                          backgroundImage: plColors.gradient,
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: 600,
                        }}
                      >
                        S
                      </span>
                    </div>
                    <p className="text-sm text-neutral-400 tracking-wide mb-3">
                      {line.description}
                    </p>
                    <p className="text-neutral-600 mb-2">{line.who}</p>
                    <p className="text-[11px] text-neutral-400/70">{line.subtitle}</p>
                    <div className="mt-8 flex gap-2 flex-wrap">
                      {matrix[line.id].map((modeCode) => (
                        <ModeIconGlass key={modeCode} code={modeCode} size={32} theme="light" variant="badge" />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* AI — 独立カード（全幅・横長） */}
            {(() => {
              const aiColors = currentGradient.productLines[aiLine.id];
              return (
                <>
                  <div className="h-px bg-neutral-200" />
                  <motion.div
                    variants={fadeUp}
                    className="overflow-hidden bg-white hover:bg-neutral-50 transition-colors"
                  >
                    <div className="px-12 pt-8 pb-0">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                        + AI Layer — すべてのラインに横断
                      </span>
                    </div>
                    <div className="px-12 py-10 flex flex-col md:flex-row md:items-center gap-10">
                      {/* 左：バッジ + タイトル */}
                      <div className="flex items-center gap-6 flex-shrink-0">
                        <ProductLineBadge
                          lineId={aiLine.id}
                          size={56}
                          pattern={pattern}
                          variant="outline"
                        />
                        <div>
                          <span
                            className="text-5xl tracking-tight"
                            style={{
                              backgroundImage: aiColors.gradient,
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              fontWeight: 600,
                            }}
                          >
                            AI
                          </span>
                          <p className="text-sm text-neutral-400 tracking-wide mt-1">
                            {aiLine.description}
                          </p>
                        </div>
                      </div>
                      {/* 中：説明 */}
                      <div className="flex-1 md:border-l md:border-neutral-100 md:pl-10">
                        <p className="text-neutral-600 mb-1">{aiLine.who}</p>
                        <p className="text-[11px] text-neutral-400/70">{aiLine.subtitle}</p>
                      </div>
                      {/* 右：全モードバッジ */}
                      <div className="flex-shrink-0 flex flex-col gap-2">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                          All Modes
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {matrix[aiLine.id].map((modeCode) => (
                            <ModeIconGlass key={modeCode} code={modeCode} size={32} theme="light" variant="badge" />
                          ))}
                        </div>
                      </div>
                    </div>

                  </motion.div>
                  <div className="h-px bg-neutral-200" />
                </>
              );
            })()}
          </motion.div>
        </div>
      </section>

      {/* ===== Mode Icon Glass Showcase ===== */}
      <section
        style={{
          background:
            "linear-gradient(150deg, #100c1f 0%, #0d1a2e 35%, #0a1628 55%, #150d24 80%, #1a0e2e 100%)",
          position: "relative",
          overflow: "hidden",
        }}
        className="py-32 px-8"
      >
        {/* 背景装飾：ノイズ感のある光粒 */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(ellipse 60% 40% at 20% 50%, rgba(224,85,128,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 50% 50% at 80% 30%, rgba(96,165,250,0.07) 0%, transparent 60%),
              radial-gradient(ellipse 40% 60% at 55% 80%, rgba(129,140,248,0.06) 0%, transparent 60%)
            `,
            pointerEvents: "none",
          }}
        />
        {/* 微細グリッドライン */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {/* ヘッダー */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                fontFamily: "DM Sans, sans-serif",
                marginBottom: 16,
              }}
            >
              Mode Icons
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 36,
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "rgba(255,255,255,0.88)",
                fontFamily: "DM Sans, sans-serif",
                marginBottom: 12,
              }}
            >
              6つのモード
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.38)",
                fontFamily: "DM Sans, sans-serif",
                marginBottom: 64,
                maxWidth: 480,
                lineHeight: 1.7,
              }}
            >
              婚礼・法人宴会・衣装・美容・写真・装花。
              各モードは独立したプロセス設計を持ち、プロダクトラインと組み合わせることで業務全体をカバーします。
            </motion.p>

            {/* アイコングリッド */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 md:grid-cols-6 gap-10 mb-20"
            >
              {["Br", "Gp", "Dr", "Et", "Ph", "Fl"].map((code) => (
                <ModeIconGlassCard key={code} code={code} iconSize={88} />
              ))}
            </motion.div>

            {/* サイズバリエーション */}
            <motion.div
              variants={fadeUp}
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: 48,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                  fontFamily: "DM Sans, sans-serif",
                  marginBottom: 28,
                }}
              >
                Size variations
              </p>
              <div className="flex items-end gap-6 flex-wrap">
                {[120, 88, 64, 44, 32].map((sz) => (
                  <div key={sz} className="flex flex-col items-center gap-3">
                    <ModeIconGlass code="Br" size={sz} />
                    <span
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.22)",
                        fontFamily: "DM Sans, sans-serif",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {sz}px
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 技術仕様メモ */}
            <motion.div
              variants={fadeUp}
              style={{
                marginTop: 48,
                padding: "20px 24px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                  fontFamily: "DM Sans, sans-serif",
                  marginBottom: 10,
                }}
              >
                CSS Implementation
              </p>
              <code
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "monospace",
                  lineHeight: 1.8,
                  display: "block",
                }}
              >
                background: rgba(255, 255, 255, 0.13)<br />
                backdrop-filter: blur(18px) saturate(180%)<br />
                -webkit-backdrop-filter: blur(18px) saturate(180%)<br />
                border: 1px solid rgba(255, 255, 255, 0.28)
              </code>
            </motion.div>

            {/* Circle variant — ダーク背景 */}
            <motion.div
              variants={fadeUp}
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: 48,
                marginTop: 48,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                  fontFamily: "DM Sans, sans-serif",
                  marginBottom: 28,
                }}
              >
                Circle variant — dark
              </p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-10">
                {["Br", "Gp", "Dr", "Et", "Ph", "Fl"].map((code) => {
                  const cfg = MODE_GLASS_CONFIG[code];
                  return (
                    <div key={code} className="group flex flex-col items-center gap-4 cursor-default select-none">
                      <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2">
                        <ModeIconGlass code={code} size={88} theme="dark" variant="circle" />
                      </div>
                      <div className="text-center space-y-1">
                        <p style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.82)", fontFamily: "DM Sans, sans-serif" }}>{cfg?.label}</p>
                        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.36)", fontFamily: "DM Sans, sans-serif", letterSpacing: "0.18em", textTransform: "uppercase" }}>{cfg?.sublabel}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Matrix Section ===== */}
      <section className="relative py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4"
            >
              Matrix
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl tracking-tight text-neutral-900 mb-20"
              style={{ fontWeight: 300 }}
            >
              プロダクト &times; モード
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="overflow-x-auto"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr
                    style={{
                      background:
                        "linear-gradient(150deg, #100c1f 0%, #0d1a2e 35%, #0a1628 55%, #150d24 80%, #1a0e2e 100%)",
                    }}
                  >
                    <th
                      className="p-4 text-left text-xs tracking-[0.2em] uppercase text-neutral-400"
                      style={{ fontWeight: 400 }}
                    >
                      &nbsp;
                    </th>
                    {modes.map((mode) => (
                      <th
                        key={mode.id}
                        className="p-4 text-center"
                      >
                        <div className="flex justify-center">
                          <ModeIconGlass
                            code={mode.code}
                            size={44}
                            theme="dark"
                            variant="icon"
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productLines.map((line) => {
                    const plColors = currentGradient.productLines[line.id];
                    return (
                      <tr
                        key={line.id}
                        className="border-t border-neutral-100"
                      >
                        <td className="p-4">
                          <ProductLineBadge
                            lineId={line.id}
                            size={44}
                            pattern={pattern}
                            variant="outline"
                          />
                        </td>
                        {modes.map((mode) => {
                          const available = (matrix[line.id] ?? []).includes(mode.code);
                          return (
                            <td key={mode.id} className="p-4 text-center">
                              {available && plColors ? (
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
      <section className="relative py-32 px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4"
            >
              Brand Identity
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl tracking-tight text-neutral-900 mb-20"
              style={{ fontWeight: 300 }}
            >
              ブランドアイデンティティ
            </motion.h2>

            {/* Logo display */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 mb-px"
            >
              <div className="bg-white p-16 flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <GridIcon size={56} pattern={pattern} />
                  <span
                    className="text-5xl tracking-tight text-neutral-800"
                    style={{ fontWeight: 400 }}
                  >
                    <span style={esTextStyle}>&#x190;S</span>{" "}
                    Product
                  </span>
                </div>
              </div>
              <div className="bg-neutral-900 p-16 flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <GridIcon size={56} pattern={pattern} />
                  <span
                    className="text-5xl tracking-tight text-neutral-200"
                    style={{ fontWeight: 400 }}
                  >
                    <span
                      style={{
                        color: "#ffffff",
                        WebkitTextFillColor: "#ffffff",
                        fontWeight: 600,
                      }}
                    >
                      &#x190;S
                    </span>{" "}
                    Product
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Color palette */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-px bg-neutral-200"
            >
              {productLines.map((line) => {
                const plColors =
                  currentGradient.productLines[line.id];
                return (
                  <div key={line.id} className="bg-white p-12">
                    <div className="flex items-center gap-4 mb-8">
                      <ProductLineBadge
                        lineId={line.id}
                        size={44}
                        pattern={pattern}
                        variant="outline"
                      />
                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-3xl"
                          style={{
                            backgroundImage: plColors.gradient,
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: 600,
                          }}
                        >
                          {line.letter}
                        </span>
                        <span
                          className="text-3xl"
                          style={{
                            backgroundImage: plColors.gradient,
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: 600,
                          }}
                        >
                          S
                        </span>
                      </div>
                    </div>
                    <div
                      className="w-full h-2 rounded-full mb-6"
                      style={{ background: plColors.gradient }}
                    />
                    <p className="text-xs text-neutral-400 tracking-wide">
                      {plColors.color}
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">
                      {line.description}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* Pattern B — icon & color detail */}
            <motion.div
              variants={fadeUp}
              className="mt-px bg-white p-16"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-12">
                Icon &mdash; Gradient Pattern B
              </p>

              <div className="flex items-center gap-6 mb-10">
                <GridIcon size={64} pattern="B" />
                <span
                  className="text-4xl tracking-tight text-neutral-800"
                  style={{ fontWeight: 400 }}
                >
                  <span style={esTextStyle}>&#x190;S</span>{" "}
                  Product
                </span>
              </div>

              <p className="text-sm text-neutral-500 mb-10">
                {currentGradient.description}
              </p>

              {/* 9-color swatches with individual gradients */}
              <div className="grid grid-cols-3 gap-px bg-neutral-100 mb-10">
                {currentGradient.dots.flat().map((color, i) => {
                  const row = Math.floor(i / 3);
                  const col = i % 3;
                  const allColors = currentGradient.dots.flat();
                  const prev = allColors[Math.max(0, i - 1)];
                  const next = allColors[Math.min(8, i + 1)];
                  const gradBar = `linear-gradient(90deg, ${prev} 0%, ${color} 50%, ${next} 100%)`;
                  return (
                    <div
                      key={`${row}-${col}`}
                      className="bg-white p-6 flex flex-col gap-3"
                    >
                      <div
                        className="w-full rounded-lg"
                        style={{
                          height: 64,
                          backgroundColor: color,
                        }}
                      />
                      <div
                        className="w-full h-2 rounded-full"
                        style={{ background: gradBar }}
                      />
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[11px] text-neutral-500 font-mono tracking-wide">
                          {color}
                        </span>
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
                  <div
                    key={ri}
                    className="flex items-center gap-4"
                  >
                    <span className="text-[10px] text-neutral-300 font-mono w-8 flex-shrink-0">
                      Row {ri}
                    </span>
                    <div
                      className="flex-1 h-5 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${row[0]} 0%, ${row[1]} 50%, ${row[2]} 100%)`,
                      }}
                    />
                    <div className="flex gap-1.5">
                      {row.map((c) => (
                        <span
                          key={c}
                          className="text-[9px] text-neutral-400 font-mono"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 全体対角グラデーション */}
              <div className="mb-10">
                <div
                  className="w-full h-8 rounded-full"
                  style={{
                    background: currentGradient.textGradient,
                  }}
                />
                <p className="text-[10px] text-neutral-300 font-mono mt-2 tracking-wide">
                  full diagonal · 135deg · 9 stops
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-100 space-y-3">
                {productLines.map((line) => {
                  const plc =
                    currentGradient.productLines[line.id];
                  return (
                    <div
                      key={line.id}
                      className="flex items-center gap-3"
                    >
                      <ProductLineBadge
                        lineId={line.id}
                        size={28}
                        pattern="B"
                        variant="outline"
                      />
                      <ProductLineBadge
                        lineId={line.id}
                        size={28}
                        pattern="B"
                        variant="solid"
                      />
                      <ProductLineBadge
                        lineId={line.id}
                        size={28}
                        pattern="B"
                        variant="complement"
                      />
                      <span
                        className="text-xs tracking-wide"
                        style={plTextGradient(plc.gradient)}
                      >
                        {line.id}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {plc.color}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Color Palette Section ===== */}
      <section className="relative py-32 px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4"
            >
              Color System
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl tracking-tight text-neutral-900 mb-4"
              style={{ fontWeight: 300 }}
            >
              9色のカラーパレット
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-sm text-neutral-400 mb-16"
              style={{ fontWeight: 300 }}
            >
              各カラーの10段階スケール（50〜900）と補助カラー（補色・類似色・トライアドなど）。カラーコードはクリックでコピー。
            </motion.p>
            <motion.div variants={fadeUp}>
              <PatternBPalette />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Character Concept Section (Easter Egg) ===== */}
      <section className="relative py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            {/* ƐSおじさん */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
              {/* Left — タイトル + 通常 & 謝りバージョン */}
              <motion.div variants={fadeUp} className="bg-white p-12 flex flex-col justify-between">
                <div>
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
                <div className="flex items-end justify-center gap-8 mt-10">
                  <div className="flex flex-col items-center gap-3">
                    <motion.img
                      src={esOjisanImg}
                      alt="ƐSおじさん 通常"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      style={{ height: 220, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }}
                    />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-300">通常</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <motion.img
                      src={esOjisanBWImg}
                      alt="ƐSおじさ�� 謝りバージョン"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      style={{ height: 220, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }}
                    />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-300">謝り</span>
                  </div>
                </div>
              </motion.div>

              {/* Right — ƐSおじさんプロフィール */}
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
                  寿司職人からホテルのドアマン、プランナー、法人営業��衣装、美容を経て、現在はƐSドアマンへ。
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
                    { label: 'フラット', desc: '立��感・艶なし' },
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

            {/* 01→02 仕切り線 */}
            <div className="flex items-center gap-4 px-12 py-5" style={{ borderTop: '1px solid #e5e5e5' }}>
              <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-300">01</span>
              <div className="flex-1 h-px bg-neutral-100" />
            </div>

            {/* ── シナプスAI 01〜09 ── */}
            {[
              { num: '02', name: 'シナプスAI 01', label: '02' },
              { num: '03', name: 'シナプスAI 02', label: '03' },
              { num: '04', name: 'シナプスAI 03', label: '04' },
              { num: '05', name: 'シナプスAI 04', label: '05' },
              { num: '01', name: 'シナプスAI 05', label: '05' },
              { num: '06', name: 'シナプスAI 06', label: '06' },
              { num: '07', name: 'シナプスAI 07', label: '07' },
              { num: '08', name: 'シナプスAI 08', label: '08' },
              { num: '09', name: 'シナプスAI 09', label: '09' },
            ].map((char, i) => (
              <div key={char.num}>
                {/* 02以降のカード間仕切り線 */}
                {i > 0 && (
                  <div className="flex items-center gap-4 px-12 py-5" style={{ borderTop: '1px solid #e5e5e5' }}>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-300">{char.label}</span>
                    <div className="flex-1 h-px bg-neutral-100" />
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
                {/* Left — 画像 */}
                <motion.div variants={fadeUp} className="bg-white p-12 flex flex-col justify-between">
                  <div>
                    <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4">
                      AI Partner
                    </p>
                    <h2 className="text-4xl tracking-tight text-neutral-900 mb-3" style={{ fontWeight: 300 }}>
                      {char.name}
                    </h2>
                    <p className="text-neutral-400" style={{ fontWeight: 300, fontSize: '14px' }}>
                      ƐSおじさんの相棒AI
                    </p>
                  </div>
                  <div className="flex justify-center mt-10">
                    {char.num === '02' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <Synapse02 />
                      </motion.div>
                    ) : char.num === '03' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <Synapse03 />
                      </motion.div>
                    ) : char.num === '04' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <Synapse04 />
                      </motion.div>
                    ) : char.num === '05' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <Synapse05 />
                      </motion.div>
                    ) : char.num === '01' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <Synapse01 height={260} />
                      </motion.div>
                    ) : char.num === '06' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <Synapse06 />
                      </motion.div>
                    ) : char.num === '07' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <Synapse07 />
                      </motion.div>
                    ) : char.num === '08' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <Synapse08 height={220} />
                      </motion.div>
                    ) : char.num === '09' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <Synapse09 height={260} />
                      </motion.div>
                    ) : (
                      <div
                        className="flex items-center justify-center rounded-2xl"
                        style={{
                          width: 180, height: 260,
                          background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                          border: '1px dashed #d4d4d4',
                        }}
                      >
                        <span className="text-neutral-300 tracking-widest" style={{ fontSize: 48, fontWeight: 200 }}>
                          {char.num}
                        </span>
                      </div>
                    )}
                  </div>
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
                    {char.name}
                  </h3>
                  <p className="text-xs tracking-[0.08em] uppercase mb-5 text-neutral-400" style={{ fontWeight: 400 }}>
                    Coming Soon
                  </p>
                  <p className="text-neutral-300 mb-6" style={{ lineHeight: 2, fontWeight: 300, fontSize: '13px' }}>
                    —
                  </p>
                  <div className="pt-5 border-t border-neutral-100">
                    <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-3">Spec</p>
                    <ul className="space-y-1.5">
                      {[
                        { label: 'Model', desc: '—' },
                        { label: 'Height', desc: '—' },
                        { label: 'Specialty', desc: '—' },
                        { label: 'Favorite', desc: '—' },
                        { label: 'Weak point', desc: '—' },
                        { label: 'Catchphrase', desc: '—' },
                      ].map(item => (
                        <li key={item.label} className="flex items-start gap-2">
                          <span className="text-neutral-800 text-xs" style={{ fontWeight: 500, minWidth: '5rem' }}>{item.label}</span>
                          <span className="text-neutral-400 text-xs" style={{ fontWeight: 300 }}>{item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                </div>
              </div>
            ))}

            {/* Signature strip */}
            <motion.div variants={fadeUp} className="mt-px bg-neutral-900 p-8 flex items-center justify-end">
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