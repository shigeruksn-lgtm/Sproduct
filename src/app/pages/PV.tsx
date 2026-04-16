import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { Link } from "react-router";
import { GridIcon } from "../components/GridIcon";

const MotionLink = motion.create(Link);

// ============================================================
// Types & Data
// ============================================================

const ES_GRADIENT =
  "linear-gradient(135deg, #F5C518 0%, #D49B1A 20%, #C0392B 50%, #4A2040 80%, #3C2562 100%)";

// ============================================================
// Business Flow Data
// ============================================================

const BUSINESS_FLOWS = [
  {
    title: "婚礼",
    titleEn: "BRIDAL",
    steps: [
      "来館予約",
      "来館管理",
      "成約",
      "挙式準備",
      "打合せ",
      "発注",
      "施行",
      "請求",
      "入金",
      "分析",
      "会計",
    ],
  },
  {
    title: "宴会",
    titleEn: "BANQUET",
    steps: [
      "問い合わせ",
      "ご提案（見積）",
      "成約",
      "施行準備",
      "打合せ",
      "発注",
      "施行",
      "請求",
      "入金",
      "分析",
      "会計",
    ],
  },
  {
    title: "衣装",
    titleEn: "COSTUME",
    steps: [
      "送客（初客）",
      "来館予約",
      "フィッティング・打合せ",
      "決定",
      "衣装押さえ",
      "衣装準備",
      "配送",
      "受け取り（セット表）",
      "クリーニング（メンテナンス）",
      "請求",
      "入金",
      "分析",
      "会計",
    ],
  },
  {
    title: "美容",
    titleEn: "BEAUTY",
    steps: [
      "送客（初客）",
      "来館予約（アサイン）",
      "打合せ",
      "決定",
      "準備",
      "挙式",
      "請求",
      "入金",
      "分析",
      "会計",
    ],
  },
];

// ============================================================
// Main PV component
// ============================================================
export default function PV() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.6],
    [1, 0],
  );
  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.6],
    [1, 0.95],
  );
  const heroY = useTransform(
    scrollYProgress,
    [0, 0.6],
    [0, 60],
  );

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative min-h-screen"
      style={{
        background: "#ffffff",
        fontFamily: "DM Sans, sans-serif",
        color: "#171717",
      }}
    >
      {/* ===== Opening Hero ===== */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ height: "calc(100vh - 3.5rem)", position: "relative" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 55%, rgba(192,57,43,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
            backgroundSize: "256px 256px",
          }}
        />

        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
          }}
          className="flex flex-col items-center text-center z-10 px-8"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[11px] tracking-[0.5em] uppercase mb-10"
            style={{ color: "rgba(0,0,0,0.5)" }}
          >
            The Story of Evolution
          </motion.p>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex items-center gap-6 mb-6"
          >
            <GridIcon size={64} pattern="B" />
            <h1
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(48px, 8vw, 96px)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              <span
                style={{
                  backgroundImage: ES_GRADIENT,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 500,
                }}
              >
                &#x190;S
              </span>{" "}
              <span style={{ color: "rgba(0,0,0,0.85)" }}>
                Product
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-2 tracking-wide text-center"
            style={{
              fontWeight: 500,
              fontSize: "1.50rem",
              backgroundImage: ES_GRADIENT,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            婚礼・宴会・衣装・美容 総合基幹システム
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-8 text-base tracking-[0.2em]"
            style={{
              color: "rgba(0,0,0,0.8)",
              fontWeight: 400,
            }}
          >
            すべてを一元化へ。そしてシームレスに。
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={loaded ? { scaleX: 1 } : {}}
            transition={{
              duration: 1.5,
              delay: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
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
            {["0.0", "1.0", "2.0", "→", "3.0"].map((v, i) => (
              <span key={i}>
                {v === "→" ? (
                  <span
                    style={{
                      color: "rgba(0,0,0,0.3)",
                      fontSize: 12,
                    }}
                  >
                    {v}
                  </span>
                ) : (
                  <span
                    className="rounded-full tracking-widest"
                    style={{
                      padding: v === "3.0" ? "6px 14px" : "4px 12px",
                      fontSize: v === "3.0" ? "11px" : "10px",
                      border: `1px solid ${v === "3.0" ? "rgba(245,197,24,0.5)" : "rgba(0,0,0,0.2)"}`,
                      color:
                        v === "3.0"
                          ? "rgba(245,197,24,1)"
                          : "rgba(0,0,0,0.5)",
                      background:
                        v === "3.0"
                          ? "rgba(245,197,24,0.08)"
                          : "rgba(0,0,0,0.03)",
                      fontWeight: v === "3.0" ? 500 : 400,
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
            className="mt-12 flex flex-col items-center gap-2"
            style={{ color: "rgba(0,0,0,0.2)" }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[11px] tracking-[0.3em] uppercase"
            >
              Scroll
            </motion.div>
            <div
              className="w-px h-8"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== Overview Section ===== */}
      <section className="relative py-32 px-8 overflow-hidden">
        {/* Background decorations */}
        <div
          className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-[0.03] pointer-events-none"
          style={{
            background: ES_GRADIENT,
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-32 left-10 w-80 h-80 rounded-full opacity-[0.02] pointer-events-none"
          style={{
            background: ES_GRADIENT,
            filter: "blur(60px)",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2
              className="tracking-tight mb-2"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(40px, 6vw, 64px)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                backgroundImage: ES_GRADIENT,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              OVERVIEW
            </h2>
            <p
              className="text-sm tracking-[0.3em]"
              style={{ color: "rgba(0,0,0,0.4)" }}
            >
              概要
            </p>
          </motion.div>

          {/* Main content card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="rounded-3xl p-12 md:p-16 relative"
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(245,197,24,0.1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.03)",
            }}
          >
            {/* Gradient border effect */}
            <div
              className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
              style={{
                background: ES_GRADIENT,
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                padding: "1px",
              }}
            />

            {/* Content */}
            <div className="space-y-10 relative">
              {/* First paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center leading-relaxed"
                style={{
                  fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                  fontWeight: 300,
                  color: "rgba(0,0,0,0.65)",
                  lineHeight: 2.2,
                }}
              >
                婚礼・宴会・衣装・美容を取り扱う会社様の基幹システムを
                <br />
                <span
                  className="inline-block"
                  style={{
                    fontSize: "clamp(1.25rem, 2.8vw, 1.6rem)",
                    fontWeight: 600,
                    backgroundImage: ES_GRADIENT,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  このƐS システム１つでシームレスに管理・完結
                </span>
                できるシステムです。
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="h-px w-32 mx-auto origin-center"
                style={{ background: ES_GRADIENT, opacity: 0.3 }}
              />

              {/* Second paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center leading-relaxed"
                style={{
                  fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                  fontWeight: 300,
                  color: "rgba(0,0,0,0.65)",
                  lineHeight: 2.2,
                }}
              >
                そして、導入される
                <span
                  style={{
                    fontWeight: 400,
                    color: "rgba(0,0,0,0.75)",
                  }}
                >
                  会社様のお客様、取引先するパートナー様
                </span>
                も
                <br />
                このƐSシステムを利用して頂くことで、さらに
                <span
                  className="inline-block"
                  style={{
                    fontSize: "clamp(1.25rem, 2.8vw, 1.6rem)",
                    fontWeight: 600,
                    backgroundImage: ES_GRADIENT,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  一元化、シームレス
                </span>
                を実現。
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="h-px w-32 mx-auto origin-center"
                style={{ background: ES_GRADIENT, opacity: 0.3 }}
              />

              {/* Third paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-center leading-relaxed"
                style={{
                  fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                  fontWeight: 300,
                  color: "rgba(0,0,0,0.65)",
                  lineHeight: 2.2,
                }}
              >
                <span
                  style={{
                    fontWeight: 400,
                    color: "rgba(0,0,0,0.75)",
                  }}
                >
                  業務改善
                </span>
                は勿論、
                <span
                  className="inline-block"
                  style={{
                    fontSize: "clamp(1.25rem, 2.8vw, 1.6rem)",
                    fontWeight: 600,
                    backgroundImage: ES_GRADIENT,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  SFA的な業績向上に貢献できるコンテンツ
                </span>
                に
                <br />
                特化したシステムとなります。
              </motion.p>
            </div>
          </motion.div>

          {/* Final message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-center mt-20"
          >
            <p
              className="tracking-wide"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 300,
                letterSpacing: "0.05em",
                backgroundImage: ES_GRADIENT,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              すべての人に喜ばれる
              <br />
              プロダクトを提供します。
            </p>

            {/* Decorative dots */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="flex items-center justify-center gap-2 mt-8"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4 + i * 0.1, duration: 0.4 }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: ES_GRADIENT,
                    opacity: 0.5,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Coverage Section ===== */}
      <section className="relative py-32 px-8 overflow-hidden">
        {/* Background decorations */}
        <div
          className="absolute top-40 left-10 w-[500px] h-[500px] rounded-full opacity-[0.02] pointer-events-none"
          style={{
            background: ES_GRADIENT,
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-full opacity-[0.025] pointer-events-none"
          style={{
            background: ES_GRADIENT,
            filter: "blur(90px)",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className="tracking-tight mb-2"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(40px, 6vw, 64px)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                backgroundImage: ES_GRADIENT,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              COVERAGE
            </h2>
            <p
              className="text-sm tracking-[0.3em] mb-12"
              style={{ color: "rgba(0,0,0,0.4)" }}
            >
              カバー範囲
            </p>
            
            {/* Lead text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center max-w-4xl mx-auto leading-relaxed"
              style={{
                fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                fontWeight: 300,
                color: "rgba(0,0,0,0.65)",
                lineHeight: 2,
              }}
            >
              婚礼・宴会・衣装・美容とすべての業務の
              <span
                style={{
                  fontWeight: 500,
                  backgroundImage: ES_GRADIENT,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                始まりから締めまでを網羅
              </span>
              した、
              <br />
              <span
                style={{
                  fontSize: "clamp(1.1rem, 2.2vw, 1.3rem)",
                  fontWeight: 600,
                  backgroundImage: ES_GRADIENT,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                一気通貫に管理
              </span>
              できます。
            </motion.p>
          </motion.div>

          {/* Business flow cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {BUSINESS_FLOWS.map((flow, index) => (
              <motion.div
                key={flow.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="rounded-2xl p-6 relative"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(245,197,24,0.15)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.02)",
                }}
              >
                {/* Card header */}
                <div className="mb-6 pb-4 border-b border-black/5">
                  <h3
                    className="text-center mb-1"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 1.75rem)",
                      fontWeight: 500,
                      backgroundImage: ES_GRADIENT,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {flow.title}
                  </h3>
                  <p
                    className="text-center text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "rgba(0,0,0,0.35)" }}
                  >
                    {flow.titleEn}
                  </p>
                </div>

                {/* Flow steps */}
                <div className="space-y-3">
                  {flow.steps.map((step, stepIndex) => (
                    <React.Fragment key={stepIndex}>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1 + stepIndex * 0.05,
                        }}
                        className="text-center px-3 py-3 rounded-lg relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, 
                            rgba(245,197,24,${0.05 + (stepIndex / flow.steps.length) * 0.18}) 0%, 
                            rgba(212,155,26,${0.06 + (stepIndex / flow.steps.length) * 0.19}) 20%, 
                            rgba(192,57,43,${0.07 + (stepIndex / flow.steps.length) * 0.21}) 50%, 
                            rgba(74,32,64,${0.08 + (stepIndex / flow.steps.length) * 0.23}) 80%, 
                            rgba(60,37,98,${0.09 + (stepIndex / flow.steps.length) * 0.25}) 100%)`,
                          border: `1px solid rgba(245,197,24,${0.12 + (stepIndex / flow.steps.length) * 0.2})`,
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: `rgba(0,0,0,${0.75 + (stepIndex / flow.steps.length) * 0.15})`,
                          lineHeight: 1.5,
                          boxShadow: `0 2px 10px rgba(0,0,0,${0.02 + (stepIndex / flow.steps.length) * 0.04})`,
                        }}
                      >
                        {step}
                      </motion.div>
                      
                      {/* Arrow between steps */}
                      {stepIndex < flow.steps.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0, scaleY: 0 }}
                          whileInView={{ opacity: 1, scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + stepIndex * 0.05 + 0.2,
                          }}
                          className="flex justify-center origin-top"
                        >
                          <div
                            style={{
                              width: "1px",
                              height: "12px",
                              background:
                                "linear-gradient(to bottom, rgba(245,197,24,0.3), rgba(192,57,43,0.2))",
                            }}
                          />
                        </motion.div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            <div
              className="inline-block rounded-2xl px-8 py-6 relative"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,197,24,0.2)",
                boxShadow: "0 15px 50px rgba(0,0,0,0.03)",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
                  fontWeight: 500,
                  backgroundImage: ES_GRADIENT,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "0.05em",
                }}
              >
                基本的な業務をすべてƐSで管理することが可能。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Vision Section ===== */}
      <section className="relative py-32 px-8 overflow-hidden">
        {/* Background decorations */}
        <div
          className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.025] pointer-events-none"
          style={{
            background: ES_GRADIENT,
            filter: "blur(120px)",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* First statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="rounded-3xl p-12 md:p-16 mb-12 relative"
            style={{
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(245,197,24,0.12)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.04)",
            }}
          >
            {/* Gradient border effect */}
            <div
              className="absolute inset-0 rounded-3xl opacity-25 pointer-events-none"
              style={{
                background: ES_GRADIENT,
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                padding: "1px",
              }}
            />

            <div className="space-y-8 relative">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center leading-relaxed"
                style={{
                  fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
                  fontWeight: 300,
                  color: "rgba(0,0,0,0.7)",
                  lineHeight: 2.2,
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    backgroundImage: ES_GRADIENT,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  管理を1つにする事
                </span>
                で
                <span
                  style={{
                    fontWeight: 500,
                    color: "rgba(0,0,0,0.75)",
                  }}
                >
                  戦略、選択、業務効率、自動化、AI化、コスト
                </span>
                。
                <br />
                <span
                  className="inline-block"
                  style={{
                    fontSize: "clamp(1.2rem, 2.6vw, 1.5rem)",
                    fontWeight: 600,
                    backgroundImage: ES_GRADIENT,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  全てが効果的な一手を打ち出す事
                </span>
                ができます。
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="h-px w-32 mx-auto origin-center"
                style={{ background: ES_GRADIENT, opacity: 0.3 }}
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-center leading-relaxed"
                style={{
                  fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
                  fontWeight: 300,
                  color: "rgba(0,0,0,0.7)",
                  lineHeight: 2.2,
                }}
              >
                <span
                  style={{
                    fontWeight: 500,
                    color: "rgba(0,0,0,0.75)",
                  }}
                >
                  これからの時代にマッチしたシステム
                </span>
                を
                <br />
                <span
                  className="inline-block"
                  style={{
                    fontSize: "clamp(1.2rem, 2.6vw, 1.5rem)",
                    fontWeight: 600,
                    backgroundImage: ES_GRADIENT,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ƐSは展開してます
                </span>
                。
              </motion.p>
            </div>
          </motion.div>

          {/* Second statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="rounded-3xl p-12 md:p-16 relative"
            style={{
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(245,197,24,0.12)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.04)",
            }}
          >
            {/* Gradient border effect */}
            <div
              className="absolute inset-0 rounded-3xl opacity-25 pointer-events-none"
              style={{
                background: ES_GRADIENT,
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                padding: "1px",
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center leading-relaxed relative"
              style={{
                fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
                fontWeight: 300,
                color: "rgba(0,0,0,0.7)",
                lineHeight: 2.2,
              }}
            >
              また
              <span
                style={{
                  fontWeight: 500,
                  color: "rgba(0,0,0,0.75)",
                }}
              >
                ƐSシステムを導入される会社様
              </span>
              だけでなく、
              <br />
              <span
                style={{
                  fontWeight: 500,
                  color: "rgba(0,0,0,0.75)",
                }}
              >
                お客様、パートナー様にも喜んで利用いただける
              </span>
              <br />
              <span
                className="inline-block"
                style={{
                  fontSize: "clamp(1.2rem, 2.6vw, 1.5rem)",
                  fontWeight: 600,
                  backgroundImage: ES_GRADIENT,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                システムをモットーに、構築したシステム
              </span>
              です。
            </motion.p>
          </motion.div>

          {/* Closing decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center justify-center gap-3 mt-16"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}
                className="w-2 h-2 rounded-full"
                style={{
                  background: ES_GRADIENT,
                  opacity: 0.4,
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Recommendations Section ===== */}
      <section className="relative py-32 px-8 overflow-hidden">
        {/* Background decorations */}
        <div
          className="absolute top-1/4 right-20 w-[500px] h-[500px] rounded-full opacity-[0.02] pointer-events-none"
          style={{
            background: ES_GRADIENT,
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-1/3 left-20 w-[400px] h-[400px] rounded-full opacity-[0.025] pointer-events-none"
          style={{
            background: ES_GRADIENT,
            filter: "blur(90px)",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2
              className="tracking-tight mb-4"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(40px, 6vw, 64px)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                backgroundImage: ES_GRADIENT,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              こんな会社様におすすめ
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="h-px w-40 mx-auto origin-center"
              style={{ background: ES_GRADIENT, opacity: 0.4 }}
            />
          </motion.div>

          {/* Issue cards grid */}
          <div className="space-y-6">
            {/* Issue 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="rounded-2xl p-8 md:p-10 relative"
              style={{
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,197,24,0.12)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.02)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
                  style={{
                    background: ES_GRADIENT,
                    opacity: 0.85,
                  }}
                >
                  <span className="text-white text-sm font-bold">◉</span>
                </div>
                <div className="flex-1">
                  <h3
                    className="mb-4"
                    style={{
                      fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
                      fontWeight: 600,
                      color: "rgba(0,0,0,0.85)",
                      lineHeight: 1.5,
                    }}
                  >
                    複数のシステムを利用している。
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                      fontWeight: 300,
                      color: "rgba(0,0,0,0.65)",
                      lineHeight: 1.9,
                    }}
                  >
                    機能や用途によって複数のシステムにまたがって利用しており手間やミスなどの業務効率ができておらず、
                    <br />
                    顧客満足度の低下にも繋がっている。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Issue 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl p-8 md:p-10 relative"
              style={{
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,197,24,0.12)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.02)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
                  style={{
                    background: ES_GRADIENT,
                    opacity: 0.85,
                  }}
                >
                  <span className="text-white text-sm font-bold">◉</span>
                </div>
                <div className="flex-1">
                  <h3
                    className="mb-4"
                    style={{
                      fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
                      fontWeight: 600,
                      color: "rgba(0,0,0,0.85)",
                      lineHeight: 1.5,
                    }}
                  >
                    アナログ業務が多いため、手数がかかっている。
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                      fontWeight: 300,
                      color: "rgba(0,0,0,0.65)",
                      lineHeight: 1.9,
                    }}
                  >
                    従業員が手作業を行ってしまっているため、業務をオートマチックに行うことができず２度手間などが発生。
                    <br />
                    残業など従業員に負担がかかっている。人もいないので大変。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Issue 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="rounded-2xl p-8 md:p-10 relative"
              style={{
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,197,24,0.12)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.02)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
                  style={{
                    background: ES_GRADIENT,
                    opacity: 0.85,
                  }}
                >
                  <span className="text-white text-sm font-bold">◉</span>
                </div>
                <div className="flex-1">
                  <h3
                    className="mb-4"
                    style={{
                      fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
                      fontWeight: 600,
                      color: "rgba(0,0,0,0.85)",
                      lineHeight: 1.5,
                    }}
                  >
                    戦略的な施策や分析ができていない。売上を伸ばしたい。
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                      fontWeight: 300,
                      color: "rgba(0,0,0,0.65)",
                      lineHeight: 1.9,
                    }}
                  >
                    戦略のためのデータ集約でなく会議のための数値集めになっている。
                    <br />
                    実際にどう戦略立てて、せめて行くか、分析ができて似合い
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Issue 4 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="rounded-2xl p-8 md:p-10 relative"
              style={{
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,197,24,0.12)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.02)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
                  style={{
                    background: ES_GRADIENT,
                    opacity: 0.85,
                  }}
                >
                  <span className="text-white text-sm font-bold">◉</span>
                </div>
                <div className="flex-1">
                  <h3
                    className="mb-4"
                    style={{
                      fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
                      fontWeight: 600,
                      color: "rgba(0,0,0,0.85)",
                      lineHeight: 1.5,
                    }}
                  >
                    婚礼だけ、宴会だけなど、１つの部署に特化したシステムになっている。
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                      fontWeight: 300,
                      color: "rgba(0,0,0,0.65)",
                      lineHeight: 1.9,
                    }}
                  >
                    １つの部署に１つシステム。もしくはこれから宴会受注もしていきたいけど、婚礼特化型だから展開ができない、、
                    <br />
                    衣装もやっているが別システムで管理、、、など、トータル的な顧客を集約できていない。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Issue 5 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="rounded-2xl p-8 md:p-10 relative"
              style={{
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,197,24,0.12)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.02)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
                  style={{
                    background: ES_GRADIENT,
                    opacity: 0.85,
                  }}
                >
                  <span className="text-white text-sm font-bold">◉</span>
                </div>
                <div className="flex-1">
                  <h3
                    className="mb-4"
                    style={{
                      fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
                      fontWeight: 600,
                      color: "rgba(0,0,0,0.85)",
                      lineHeight: 1.5,
                    }}
                  >
                    今のシステムの更新や入れ替えのタイミング
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                      fontWeight: 300,
                      color: "rgba(0,0,0,0.65)",
                      lineHeight: 1.9,
                    }}
                  >
                    現行システムの更新やアップデートの時期で費用も発生、替え時なのかというタイミング。
                    <br />
                    業務の見直しなどを図る状態。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Issue 6 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="rounded-2xl p-8 md:p-10 relative"
              style={{
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,197,24,0.12)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.02)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
                  style={{
                    background: ES_GRADIENT,
                    opacity: 0.85,
                  }}
                >
                  <span className="text-white text-sm font-bold">◉</span>
                </div>
                <div className="flex-1">
                  <h3
                    className="mb-4"
                    style={{
                      fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
                      fontWeight: 600,
                      color: "rgba(0,0,0,0.85)",
                      lineHeight: 1.5,
                    }}
                  >
                    地味にシステムの利用料が高い。
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                      fontWeight: 300,
                      color: "rgba(0,0,0,0.65)",
                      lineHeight: 1.9,
                    }}
                  >
                    1件成約毎にいくら。カスタマイズにいくら。なになににいくらと、
                    <br />
                    トータルでみたら結構な金額になっていることが多く。
                    <br />
                    地味に負担になっていることが多い。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== ƐS Solutions Section ===== */}
      <section className="relative py-32 px-8 overflow-hidden">
        {/* Background decorations */}
        <div
          className="absolute top-1/3 left-20 w-[500px] h-[500px] rounded-full opacity-[0.02] pointer-events-none"
          style={{
            background: ES_GRADIENT,
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-20 w-[400px] h-[400px] rounded-full opacity-[0.025] pointer-events-none"
          style={{
            background: ES_GRADIENT,
            filter: "blur(90px)",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2
              className="tracking-tight mb-4"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(40px, 6vw, 64px)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                backgroundImage: ES_GRADIENT,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ƐSでは？！
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="h-px w-40 mx-auto origin-center"
              style={{ background: ES_GRADIENT, opacity: 0.4 }}
            />
          </motion.div>

          {/* Solution cards grid */}
          <div className="space-y-6">
            {/* Solution 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="rounded-2xl p-8 md:p-10 relative"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,197,24,0.18)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
                  style={{
                    background: ES_GRADIENT,
                    opacity: 0.9,
                  }}
                >
                  <span className="text-white text-sm font-bold">◉</span>
                </div>
                <div className="flex-1">
                  <h3
                    className="mb-4"
                    style={{
                      fontSize: "clamp(1.15rem, 2.6vw, 1.4rem)",
                      fontWeight: 600,
                      backgroundImage: ES_GRADIENT,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      lineHeight: 1.5,
                    }}
                  >
                    複数のシステムを１つで。
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                      fontWeight: 300,
                      color: "rgba(0,0,0,0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    複数にまたがっているシステム、部署毎のわかれてるシステムを１つに集約を実現。
                    <br />
                    シームレスに。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Solution 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl p-8 md:p-10 relative"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,197,24,0.18)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
                  style={{
                    background: ES_GRADIENT,
                    opacity: 0.9,
                  }}
                >
                  <span className="text-white text-sm font-bold">◉</span>
                </div>
                <div className="flex-1">
                  <h3
                    className="mb-4"
                    style={{
                      fontSize: "clamp(1.15rem, 2.6vw, 1.4rem)",
                      fontWeight: 600,
                      backgroundImage: ES_GRADIENT,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      lineHeight: 1.5,
                    }}
                  >
                    アナログ業務が多いため、手数がかかっている。
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                      fontWeight: 300,
                      color: "rgba(0,0,0,0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    ƐS内でのマスタ管理、データ共有、お客様入力。パートナ入力など、
                    <br />
                    従業員だけじゃなく関係者も入力閲覧ができることで、入力、報告、共有の負担を軽減すること
                    <br />
                    従業員が入力を少なく設計。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Solution 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="rounded-2xl p-8 md:p-10 relative"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,197,24,0.18)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
                  style={{
                    background: ES_GRADIENT,
                    opacity: 0.9,
                  }}
                >
                  <span className="text-white text-sm font-bold">◉</span>
                </div>
                <div className="flex-1">
                  <h3
                    className="mb-4"
                    style={{
                      fontSize: "clamp(1.15rem, 2.6vw, 1.4rem)",
                      fontWeight: 600,
                      backgroundImage: ES_GRADIENT,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      lineHeight: 1.5,
                    }}
                  >
                    集客・業績向上など戦略視点を入れた分析
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                      fontWeight: 300,
                      color: "rgba(0,0,0,0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    通常業務でƐSシステムにデータを登録されると自動的にデータを集約し分析機能に反映。
                    <br />
                    戦略的な数値が同時にピックアップされ、自身の数値から次の戦略を同時に打ち出しが可能へ。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Solution 4 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="rounded-2xl p-8 md:p-10 relative"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,197,24,0.18)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
                  style={{
                    background: ES_GRADIENT,
                    opacity: 0.9,
                  }}
                >
                  <span className="text-white text-sm font-bold">◉</span>
                </div>
                <div className="flex-1">
                  <h3
                    className="mb-4"
                    style={{
                      fontSize: "clamp(1.15rem, 2.6vw, 1.4rem)",
                      fontWeight: 600,
                      backgroundImage: ES_GRADIENT,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      lineHeight: 1.5,
                    }}
                  >
                    データ移行も過去実績で可能に。
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                      fontWeight: 300,
                      color: "rgba(0,0,0,0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    過去様々な会社様のシステムの移行をしてきた実績もあり、
                    <br />
                    ƐSシステムへデータ移行も行うことが可能。
                    <br />
                    未来案件だけでなく過去案件も移行可能に。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Solution 5 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="rounded-2xl p-8 md:p-10 relative"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,197,24,0.18)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
                  style={{
                    background: ES_GRADIENT,
                    opacity: 0.9,
                  }}
                >
                  <span className="text-white text-sm font-bold">◉</span>
                </div>
                <div className="flex-1">
                  <h3
                    className="mb-4"
                    style={{
                      fontSize: "clamp(1.15rem, 2.6vw, 1.4rem)",
                      fontWeight: 600,
                      backgroundImage: ES_GRADIENT,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      lineHeight: 1.5,
                    }}
                  >
                    定額料金
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                      fontWeight: 300,
                      color: "rgba(0,0,0,0.7)",
                      lineHeight: 1.9,
                    }}
                  >
                    ƐSは基本的に1事業所×1モードで基本的な定額金額になります。
                    <br />
                    使う機能で費用のランク分けがされます。
                    <br />
                    １成約いくら、１アカウントいくらではなく、決まった金額を定額で使うことになります。
                    <br />
                    そのため、年間予算などの組み立ても行うことができ、安心して利用することができます。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Section Pages Section ===== */}
      <section className="relative py-32 px-8 overflow-hidden">
        {/* Background decorations */}
        <div
          className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full opacity-[0.02] pointer-events-none"
          style={{
            background: ES_GRADIENT,
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full opacity-[0.025] pointer-events-none"
          style={{
            background: ES_GRADIENT,
            filter: "blur(90px)",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2
              className="tracking-tight mb-2"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                backgroundImage: ES_GRADIENT,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Explore Each Section
            </h2>
            <p
              className="text-sm tracking-[0.2em] mb-4"
              style={{ color: "rgba(0,0,0,0.4)" }}
            >
              各セクションページはこちら
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="h-px w-40 mx-auto origin-center"
              style={{ background: ES_GRADIENT, opacity: 0.4 }}
            />
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Bridal Card */}
            <MotionLink
              to="/pv/wedding"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group cursor-pointer relative overflow-hidden rounded-2xl block"
              style={{
                aspectRatio: "3/4",
                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
              }}
            >
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1749491104890-1cada72354cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtaW5pbWFsaXN0JTIwd2VkZGluZyUyMGNlcmVtb255fGVufDF8fHx8MTc3NDUzMjkxNnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="婚礼"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <div
                  className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-2"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    BRIDAL
                  </p>
                  <h3
                    className="mb-3"
                    style={{
                      fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
                      fontWeight: 500,
                      color: "#ffffff",
                      letterSpacing: "0.05em",
                      textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    婚礼
                  </h3>
                  <div
                    className="h-px w-16 mb-4"
                    style={{ background: ES_GRADIENT }}
                  />
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 group-hover:gap-3"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#ffffff",
                    }}
                  >
                    <span>詳しく見る</span>
                    <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </motion.div>
              </div>
            </MotionLink>

            {/* Banquet Card */}
            <MotionLink
              to="/pv/banquet"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group cursor-pointer relative overflow-hidden rounded-2xl block"
              style={{
                aspectRatio: "3/4",
                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
              }}
            >
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1762621175799-5fc1e336e84a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVnYW50JTIwZXZlbnQlMjB2ZW51ZXxlbnwxfHx8fDE3NzQ1MzI5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="宴会"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-2"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    BANQUET
                  </p>
                  <h3
                    className="mb-3"
                    style={{
                      fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
                      fontWeight: 500,
                      color: "#ffffff",
                      letterSpacing: "0.05em",
                      textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    宴会
                  </h3>
                  <div
                    className="h-px w-16 mb-4"
                    style={{ background: ES_GRADIENT }}
                  />
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 group-hover:gap-3"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#ffffff",
                    }}
                  >
                    <span>詳しく見る</span>
                    <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </motion.div>
              </div>
            </MotionLink>

            {/* Costume Card */}
            <MotionLink
              to="/pv/costume"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="group cursor-pointer relative overflow-hidden rounded-2xl block"
              style={{
                aspectRatio: "3/4",
                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
              }}
            >
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1767050400384-3e2c733e5dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGRyZXNzJTIwZGV0YWlsfGVufDF8fHx8MTc3NDUzMzA2Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="衣装"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-2"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    COSTUME
                  </p>
                  <h3
                    className="mb-3"
                    style={{
                      fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
                      fontWeight: 500,
                      color: "#ffffff",
                      letterSpacing: "0.05em",
                      textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    衣装
                  </h3>
                  <div
                    className="h-px w-16 mb-4"
                    style={{ background: ES_GRADIENT }}
                  />
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 group-hover:gap-3"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#ffffff",
                    }}
                  >
                    <span>詳しく見る</span>
                    <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </motion.div>
              </div>
            </MotionLink>

            {/* Beauty Card */}
            <MotionLink
              to="/pv/beauty"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group cursor-pointer relative overflow-hidden rounded-2xl block"
              style={{
                aspectRatio: "3/4",
                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
              }}
            >
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1770757587792-1b10a8221f76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBicmlkYWwlMjBzcGElMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzc0NTMzMTg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="美容"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-2"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    BEAUTY
                  </p>
                  <h3
                    className="mb-3"
                    style={{
                      fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
                      fontWeight: 500,
                      color: "#ffffff",
                      letterSpacing: "0.05em",
                      textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    美容
                  </h3>
                  <div
                    className="h-px w-16 mb-4"
                    style={{ background: ES_GRADIENT }}
                  />
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 group-hover:gap-3"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#ffffff",
                    }}
                  >
                    <span>詳しく見る</span>
                    <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </motion.div>
              </div>
            </MotionLink>
          </div>
        </div>
      </section>
    </div>
  );
}