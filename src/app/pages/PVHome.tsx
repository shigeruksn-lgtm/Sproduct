import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import { GridIcon } from "../components/GridIcon";

const MotionLink = motion.create(Link);

// ─── Design Tokens ────────────────────────────────────────────────────────────

const ES_GRADIENT =
  "linear-gradient(135deg, #F5C518 0%, #D49B1A 20%, #C0392B 50%, #4A2040 80%, #3C2562 100%)";

// Soft warm off-white palette
const BG_BASE    = "#FAFAF8";   // page base
const BG_SECTION = "#F4F2EE";   // alternate section
const BG_CARD    = "#FFFFFF";
const INK_1      = "#1A1612";   // headings
const INK_2      = "#4A4540";   // body
const INK_3      = "#9A948E";   // captions / labels
const BORDER     = "rgba(26,22,18,0.08)";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BUSINESS_FLOWS = [
  {
    title: "BRIDAL", titleJa: "婚礼", link: "/pv/wedding",
    steps: [
      { en: "Reservation", ja: "来館予約" },
      { en: "Management", ja: "来館管理" },
      { en: "Contract", ja: "成約" },
      { en: "Prep", ja: "挙式準備" },
      { en: "Meeting", ja: "打合せ" },
      { en: "Order", ja: "発注" },
      { en: "Execution", ja: "施行" },
      { en: "Billing", ja: "請求" },
      { en: "Payment", ja: "入金" },
      { en: "Analysis", ja: "分析" },
      { en: "Accounting", ja: "会計" },
    ],
  },
  {
    title: "BANQUET", titleJa: "宴会", link: "/pv/banquet",
    steps: [
      { en: "Inquiry", ja: "問い合わせ" },
      { en: "Proposal", ja: "ご提案（見積）" },
      { en: "Contract", ja: "成約" },
      { en: "Prep", ja: "施行準備" },
      { en: "Meeting", ja: "打合せ" },
      { en: "Order", ja: "発注" },
      { en: "Execution", ja: "施行" },
      { en: "Billing", ja: "請求" },
      { en: "Payment", ja: "入金" },
      { en: "Analysis", ja: "分析" },
      { en: "Accounting", ja: "会計" },
    ],
  },
  {
    title: "COSTUME", titleJa: "衣装", link: "/pv/costume",
    steps: [
      { en: "Referral", ja: "送客（初客）" },
      { en: "Reservation", ja: "来館予約" },
      { en: "Fitting", ja: "フィッティング・打合せ" },
      { en: "Decision", ja: "決定" },
      { en: "Hold", ja: "衣装押さえ" },
      { en: "Prep", ja: "衣装準備" },
      { en: "Shipping", ja: "配送" },
      { en: "Receipt", ja: "受け取り" },
      { en: "Cleaning", ja: "クリーニング" },
      { en: "Billing", ja: "請求" },
      { en: "Payment", ja: "入金" },
      { en: "Analysis", ja: "分析" },
      { en: "Accounting", ja: "会計" },
    ],
  },
  {
    title: "BEAUTY", titleJa: "美容", link: "/pv/beauty",
    steps: [
      { en: "Referral", ja: "送客（初客）" },
      { en: "Reservation", ja: "来館予約（アサイン）" },
      { en: "Meeting", ja: "打合せ" },
      { en: "Decision", ja: "決定" },
      { en: "Prep", ja: "準備" },
      { en: "Ceremony", ja: "挙式" },
      { en: "Billing", ja: "請求" },
      { en: "Payment", ja: "入金" },
      { en: "Analysis", ja: "分析" },
      { en: "Accounting", ja: "会計" },
    ],
  },
];

const ISSUES = [
  { no: "01", title: "Using Multiple Systems", titleJa: "複数のシステムを利用している。", body: "Using multiple systems across different functions leads to inefficiency, extra effort, mistakes, and decreased customer satisfaction.", bodyJa: "機能や用途によって複数のシステムにまたがって利用しており手間やミスなどの業務効率ができておらず、顧客満足度の低下にも繋がっている。" },
  { no: "02", title: "Manual Tasks Causing Overhead", titleJa: "アナログ業務が多いため、手数がかかっている。", body: "Employees are burdened with manual work and double data entry because processes cannot be automated. This leads to overtime and staffing challenges.", bodyJa: "従業員が手作業を行ってしまっているため、業務をオートマチックに行うことができず２度手間などが発生。残業など従業員に負担がかかっている。人もいないので大変。" },
  { no: "03", title: "Lack of Strategic Analysis", titleJa: "戦略的な施策や分析ができていない。売上を伸ばしたい。", body: "Data collection is focused on meetings rather than strategic planning. There is no proper analysis on how to build strategies and approach the market.", bodyJa: "戦略のためのデータ集約でなく会議のための数値集めになっている。実際にどう戦略立てて、せめて行くか、分析ができていない。" },
  { no: "04", title: "Siloed Departmental Systems", titleJa: "１つの部署に特化したシステムになっている。", body: "Systems are specific to one department (e.g., bridal only). Expanding to banquets or costumes is difficult because comprehensive customer management is lacking.", bodyJa: "１つの部署に１つシステム。もしくはこれから宴会受注もしていきたいけど、婚礼特化型だから展開ができない。衣装もやっているが別システムで管理など、トータル的な顧客を集約できていない。" },
  { no: "05", title: "System Renewal Timing", titleJa: "今のシステムの更新や入れ替えのタイミング", body: "It is time to renew or update the current system, incurring costs. It's a critical moment to reconsider business processes and evaluate if a change is needed.", bodyJa: "現行システムの更新やアップデートの時期で費用も発生、替え時なのかというタイミング。業務の見直しなどを図る状態。" },
  { no: "06", title: "High Hidden System Costs", titleJa: "地味にシステムの利用料が高い。", body: "Fees per contract, customization costs, and other hidden charges add up to a significant total amount, becoming a substantial financial burden.", bodyJa: "1件成約毎にいくら。カスタマイズにいくら。なになににいくらと、トータルでみたら結構な金額になっていることが多く、地味に負担になっていることが多い。" },
];

const SOLUTIONS = [
  { no: "01", title: "Consolidate into One System", titleJa: "複数のシステムを１つで。", body: "Integrate multiple fragmented and department-specific systems into a single, seamless platform.", bodyJa: "複数にまたがっているシステム、部署毎のわかれてるシステムを１つに集約を実現。シームレスに。" },
  { no: "02", title: "Automate and Digitize Manual Work", titleJa: "アナログ業務を自動化・スマート化。", body: "Reduce the burden of input, reporting, and sharing by enabling master data management, data sharing, and direct input from customers and partners within ƐS.", bodyJa: "ƐS内でのマスタ管理、データ共有、お客様入力、パートナ入力など従業員だけじゃなく関係者も入力閲覧ができることで、入力・報告・共有の負担を軽減。従業員が入力を少なく設計。" },
  { no: "03", title: "Strategic Analysis for Growth", titleJa: "集客・業績向上など戦略視点を入れた分析", body: "Data entered during daily operations is automatically aggregated and reflected in analysis functions. Strategic metrics are picked up, enabling data-driven next steps.", bodyJa: "通常業務でƐSシステムにデータを登録されると自動的にデータを集約し分析機能に反映。戦略的な数値が同時にピックアップされ、自身の数値から次の戦略を同時に打ち出しが可能へ。" },
  { no: "04", title: "Reliable Data Migration", titleJa: "データ移行も過去実績で可能に。", body: "With a proven track record of migrating systems for various companies, data migration to ƐS is fully supported, covering not only future but also past projects.", bodyJa: "過去様々な会社様のシステムの移行をしてきた実績もあり、ƐSシステムへデータ移行も行うことが可能。���来案件だけでなく過去案件も移行可能に。" },
  { no: "05", title: "Flat-Rate Pricing", titleJa: "定額料金", body: "ƐS generally offers a flat-rate pricing model per office and mode. Costs are tiered by functionality used, not per contract or account, providing financial predictability.", bodyJa: "ƐSは基本的に1事業所×1モードで基本的な定額金額になります。使う機能で費用のランク分けがされます。１成約いくら、１アカウントいくらではなく、決まった金額を定額で使うことになります。年間予算などの組み立ても行うことができ、安心して利用することができます。" },
];

const SECTION_CARDS = [
  { title: "BRIDAL", titleJa: "婚礼",  link: "/pv/wedding", image: "https://images.unsplash.com/photo-1749491104890-1cada72354cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtaW5pbWFsaXN0JTIwd2VkZGluZyUyMGNlcmVtb255fGVufDF8fHx8MTc3NDUzMjkxNnww&ixlib=rb-4.1.0&q=80&w=1080" },
  { title: "BANQUET", titleJa: "宴会", link: "/pv/banquet", image: "https://images.unsplash.com/photo-1762621175799-5fc1e336e84a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVnYW50JTIwZXZlbnQlMjB2ZW51ZXxlbnwxfHx8fDE3NzQ1MzI5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { title: "COSTUME", titleJa: "衣装", link: "/pv/costume", image: "https://images.unsplash.com/photo-1767050400384-3e2c733e5dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGRyZXNzJTIwZGV0YWlsfGVufDF8fHx8MTc3NDUzMzA2Mnww&ixlib=rb-4.1.0&q=80&w=1080" },
  { title: "BEAUTY", titleJa: "美容",  link: "/pv/beauty",  image: "https://images.unsplash.com/photo-1770757587792-1b10a8221f76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBicmlkYWwlMjBzcGElMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzc0NTMzMTg3fDA&ixlib=rb-4.1.0&q=80&w=1080" },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────

/** Gradient-filled text */
function GT({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span
      style={{
        backgroundImage: ES_GRADIENT,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** Section eyebrow label */
function SectionLabel({ en, ja, light = false }: { en: string; ja: string; light?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="flex items-center gap-3 mb-12"
    >
      <div className="h-px w-8" style={{ background: ES_GRADIENT }} />
      <span
        className="tracking-[0.4em] uppercase"
        style={{ fontSize: "10px", color: light ? INK_3 : INK_3 }}
      >
        {en}
      </span>
      <span style={{ fontSize: "10px", color: light ? "rgba(154,148,142,0.5)" : "rgba(154,148,142,0.5)" }}>
        / {ja}
      </span>
    </motion.div>
  );
}

/** Thin horizontal rule */
function GradientRule({ className = "" }: { className?: string }) {
  return (
    <div className={`h-px ${className}`} style={{ background: ES_GRADIENT, opacity: 0.25 }} />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fgY    = useTransform(scrollYProgress, [0, 0.7], [0, 60]);
  const fgO    = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: "100vh", background: BG_BASE, position: "relative" }}
    >
      {/* Left-side gradient accent */}
      <div
        className="absolute top-0 left-0 w-1 h-full pointer-events-none"
        style={{ background: ES_GRADIENT, opacity: 0.6 }}
      />

      {/* Foreground text */}
      <motion.div
        style={{ y: fgY, opacity: fgO }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 md:px-20 z-10"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[11px] tracking-[0.5em] uppercase mb-10"
          style={{ color: "rgba(0,0,0,0.5)" }}
        >
          The Story of Evolution
        </motion.p>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
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
          animate={ready ? { opacity: 1, y: 0 } : {}}
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
          animate={ready ? { opacity: 1 } : {}}
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
          animate={ready ? { scaleX: 1 } : {}}
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
          animate={ready ? { opacity: 1, y: 0 } : {}}
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
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(0,0,0,0.4)" }}
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{ height: [10, 30, 10], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px bg-gradient-to-b from-transparent via-black to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Overview ─────────────────────────────────────────────────────────────────

function Overview() {
  return (
    <section style={{ background: BG_BASE }}>
      <div className="h-px mx-12" style={{ background: BORDER }} />

      <div className="max-w-screen-xl mx-auto px-8 md:px-20 py-28 md:py-40">
        <SectionLabel en="Overview" ja="概要" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left statement */}
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: INK_1,
              }}
            >
              All Operations
              <br />
              in <GT style={{ fontWeight: 500 }}>One</GT> Place.
              <br />
              Seamlessly.
              <span style={{ display: "block", fontSize: "0.35em", marginTop: "1em", fontWeight: 400, letterSpacing: "0.05em", color: INK_2 }}>すべての業務をひとつに。シームレスに。</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="mt-8 h-px w-20 origin-left"
              style={{ background: ES_GRADIENT, opacity: 0.4 }}
            />

            {/* Closing quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 rounded-2xl p-7 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(245,197,24,0.06) 0%, rgba(60,37,98,0.04) 100%)",
                border: `1px solid rgba(245,197,24,0.2)`,
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: ES_GRADIENT, opacity: 0.5 }} />
              <p
                style={{
                  fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  backgroundImage: ES_GRADIENT,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.7,
                }}
              >
                Providing a product that
                <br />
                brings joy to everyone.
                <span style={{ display: "block", fontSize: "0.75em", marginTop: "0.5em" }}>すべての人に喜ばれるプロダクトを提供します。</span>
              </p>
            </motion.div>
          </div>

          {/* Right text paragraphs */}
          <div className="lg:col-span-3 space-y-9 pt-2">
            {[
              {
                en: <><GT style={{ fontWeight: 600, fontSize: "1.05em" }}>Seamlessly manage</GT> everything in a single ƐS System for companies handling bridal, banquet, costume, and beauty services.</>,
                ja: <>婚礼・宴会・衣装・美容を取り扱う会社様の基幹システムをこのƐS システム１つでシームレスに管理・完結できるシステムです。</>
              },
              {
                en: <>By having <span style={{ color: INK_2, fontWeight: 400 }}>customers and partners</span> use the ƐS System alongside your company, we realize an even more <GT style={{ fontWeight: 600, fontSize: "1.05em" }}>unified and seamless</GT> experience.</>,
                ja: <>そして、導入される会社様のお客様、取引先するパートナー様もこのƐSシステムを利用して頂くことで、さらに一元化、シームレスを実現。</>
              },
              {
                en: <>Beyond <span style={{ color: INK_2, fontWeight: 400 }}>operational improvement</span>, it is a system specialized in <GT style={{ fontWeight: 600, fontSize: "1.05em" }}>content that contributes to performance growth</GT> akin to SFA.</>,
                ja: <>業務改善は勿論、SFA的な業績向上に貢献できるコンテンツに特化したシステムとなります。</>
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: i * 0.12 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0 mt-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: ES_GRADIENT, opacity: 0.7 }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p
                    style={{
                      fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
                      fontWeight: 400,
                      color: INK_1,
                      lineHeight: 1.7,
                    }}
                  >
                    {item.en}
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(0.7rem, 1vw, 0.8rem)",
                      fontWeight: 300,
                      color: INK_3,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.ja}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Coverage ─────────────────────────────────────────────────────────────────

function Coverage() {
  return (
    <section style={{ background: BG_SECTION }}>
      <div className="h-px mx-12" style={{ background: BORDER }} />

      <div className="max-w-screen-xl mx-auto px-8 md:px-20 py-28 md:py-40">
        <SectionLabel en="Coverage" ja="カバー範囲" />

        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-20 mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: INK_1,
              flexShrink: 0,
            }}
          >
            <GT style={{ fontWeight: 500 }}>End-to-End</GT> Management
            <br />
            from Start to Finish.
            <span style={{ display: "block", fontSize: "0.35em", marginTop: "1em", fontWeight: 400, letterSpacing: "0.05em", color: INK_2 }}>始まりから締めまで一気通貫に管理。</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="max-w-sm flex flex-col gap-1.5"
            style={{ paddingBottom: "0.4rem" }}
          >
            <p
              style={{
                fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
                fontWeight: 400,
                color: INK_1,
                lineHeight: 1.7,
              }}
            >
              A comprehensive core system covering everything from the beginning to the end of all bridal, banquet, costume, and beauty operations.
            </p>
            <p
              style={{
                fontSize: "clamp(0.7rem, 1vw, 0.8rem)",
                fontWeight: 300,
                color: INK_3,
                lineHeight: 1.6,
              }}
            >
              婚礼・宴会・衣装・美容とすべての業務の始まりから締めまでを網羅した、総合基幹システムです。
            </p>
          </motion.div>
        </div>

        <GradientRule className="mb-16" />

        {/* Business flow cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BUSINESS_FLOWS.map((flow, index) => (
            <motion.div
              key={flow.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: BG_CARD,
                border: `1px solid ${BORDER}`,
                boxShadow: "0 2px 16px rgba(26,22,18,0.05)",
              }}
            >
              {/* Header */}
              <div
                className="relative px-6 py-5"
                style={{
                  background: "linear-gradient(135deg, rgba(245,197,24,0.05) 0%, rgba(60,37,98,0.03) 100%)",
                  borderBottom: `1px solid ${BORDER}`,
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: ES_GRADIENT, opacity: 0.7 }} />
                <h3
                  className="text-center"
                  style={{
                    fontSize: "1.55rem",
                    fontWeight: 500,
                    backgroundImage: ES_GRADIENT,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "0.04em",
                  }}
                >
                  {flow.title}
                </h3>
                <p
                  className="text-center tracking-[0.22em] uppercase mt-0.5"
                  style={{ fontSize: "9px", color: INK_3 }}
                >
                  {flow.titleJa}
                </p>
              </div>

              {/* Steps */}
              <div className="px-5 py-5 space-y-2">
                {flow.steps.map((step, si) => (
                  <React.Fragment key={si}>
                    <div
                      className="flex flex-col items-center justify-center px-3 py-2 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg,
                          rgba(245,197,24,${0.03 + (si / flow.steps.length) * 0.11}) 0%,
                          rgba(60,37,98,${0.03 + (si / flow.steps.length) * 0.14}) 100%)`,
                        border: `1px solid rgba(245,197,24,${0.1 + (si / flow.steps.length) * 0.2})`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 500,
                          color: `rgba(26,22,18,${0.65 + (si / flow.steps.length) * 0.25})`,
                          fontFamily: "DM Sans, sans-serif",
                        }}
                      >
                        {step.en}
                      </span>
                      <span style={{ fontSize: "0.55rem", color: INK_3, opacity: 0.8, marginTop: "1px" }}>
                        {step.ja}
                      </span>
                    </div>
                    {si < flow.steps.length - 1 && (
                      <div className="flex justify-center">
                        <div style={{ width: 1, height: 9, background: "linear-gradient(to bottom, rgba(245,197,24,0.3), rgba(192,57,43,0.15))" }} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <div
            className="rounded-xl px-8 py-5 relative overflow-hidden flex flex-col items-center gap-1"
            style={{
              background: BG_CARD,
              border: `1px solid rgba(245,197,24,0.3)`,
              boxShadow: "0 4px 24px rgba(245,197,24,0.08)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: ES_GRADIENT, opacity: 0.6 }} />
            <p
              style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
                fontWeight: 500,
                backgroundImage: ES_GRADIENT,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.03em",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              All fundamental operations can be managed entirely within ƐS.
            </p>
            <p style={{ fontSize: "0.7rem", color: INK_3, letterSpacing: "0.05em" }}>
              基本的な業務をすべてƐSで管理することが可能。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Vision ───────────────────────────────────────────────────────────────────

function Vision() {
  return (
    <section style={{ background: BG_BASE }}>
      <div className="h-px mx-12" style={{ background: BORDER }} />

      {/* Typography emphasis strip */}
      <div className="relative py-32 px-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-center gap-3"
          style={{ padding: "0 2rem", textAlign: "center" }}
        >
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              fontWeight: 300,
              letterSpacing: "0.05em",
              backgroundImage: ES_GRADIENT,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
              lineHeight: 1.3,
            }}
          >
            By unifying management, <br />every move becomes a highly effective strategy.
          </p>
          <p
            style={{
              fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)",
              fontWeight: 400,
              color: INK_1,
              letterSpacing: "0.05em",
            }}
          >
            管理を1つにする事で、全てが効果的な一手を打ち出す事ができます。
          </p>
        </motion.div>
      </div>

      <div className="max-w-screen-xl mx-auto px-8 md:px-20 py-20 md:py-32">
        <SectionLabel en="Vision" ja="ビジョン" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          {[
            {
              num: "01",
              en: (
                <>
                  <GT style={{ fontWeight: 600, fontSize: "1.05em" }}>ƐS deploys</GT> systems suited for the coming era.<br />
                  <GT style={{ fontWeight: 600, fontSize: "1.05em" }}>Strategy, choices, operational efficiency, automation, AI, and costs</GT>.<br />
                  Every move you make can be highly effective.
                </>
              ),
              ja: (
                <>
                  これからの時代にマッチしたシステムをƐSは展開してます。<br />
                  戦略、選択、業務効率、自動化、AI化、コスト。<br />
                  全てが効果的な一手を打ち出す事ができます。
                </>
              ),
            },
            {
              num: "02",
              en: (
                <>
                  It is built with the motto of creating a system that not only <span style={{ color: INK_2, fontWeight: 400 }}>the companies introducing the ƐS System</span>,<br />
                  but also their <span style={{ color: INK_2, fontWeight: 400 }}>customers and partners</span>,<br />
                  will be <GT style={{ fontWeight: 600, fontSize: "1.05em" }}>happy to use</GT>.
                </>
              ),
              ja: (
                <>
                  またƐSシステムを導入される会社様だけでなく、<br />
                  お客様、パートナー様にも喜んで利用いただける<br />
                  システムをモットーに、構築したシステムです。
                </>
              ),
            },
          ].map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.95, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
              style={{
                background: BG_CARD,
                border: `1px solid ${BORDER}`,
                boxShadow: "0 2px 20px rgba(26,22,18,0.04)",
              }}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 left-0 w-12 h-12 opacity-10"
                style={{ background: ES_GRADIENT, clipPath: "polygon(0 0,100% 0,0 100%)" }}
              />

              {/* Number */}
              <span
                className="block mb-5"
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "3.5rem",
                  fontWeight: 200,
                  letterSpacing: "-0.04em",
                  backgroundImage: ES_GRADIENT,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  opacity: 0.4,
                  lineHeight: 1,
                }}
              >
                {card.num}
              </span>

              <div className="flex flex-col gap-4">
                <p
                  style={{
                    fontSize: "clamp(0.9rem, 1.6vw, 1.02rem)",
                    fontWeight: 400,
                    color: INK_1,
                    lineHeight: 1.8,
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  {card.en}
                </p>
                <p
                  style={{
                    fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
                    fontWeight: 300,
                    color: INK_3,
                    lineHeight: 1.7,
                  }}
                >
                  {card.ja}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Recommendations ─────────────────────────────────────────────────────────

function Recommendations() {
  return (
    <section style={{ background: BG_SECTION }}>
      <div className="h-px mx-12" style={{ background: BORDER }} />

      <div className="max-w-screen-xl mx-auto px-8 md:px-20 py-28 md:py-40">
        <SectionLabel en="Recommended for" ja="こんな会社様に" />

        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "clamp(32px, 5vw, 60px)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            color: INK_1,
          }}
        >
          <GT style={{ fontWeight: 500 }}>Recommended</GT>
          <br />
          for Companies Like Yours.
          <span style={{ display: "block", fontSize: "0.35em", marginTop: "1em", fontWeight: 400, letterSpacing: "0.05em", color: INK_2 }}>こんな会社様におすすめです。</span>
        </motion.h2>

        {/* Issue rows */}
        <div>
          {ISSUES.map((item, i) => (
            <motion.div
              key={item.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.75, delay: i * 0.07 }}
              className="group"
            >
              <div
                className="grid grid-cols-12 gap-4 md:gap-10 py-8 md:py-10 transition-colors duration-300"
                style={{ borderBottom: `1px solid ${BORDER}` }}
              >
                {/* Number */}
                <div className="col-span-2 md:col-span-1 pt-0.5">
                  <span
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 300,
                      backgroundImage: ES_GRADIENT,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      letterSpacing: "0.05em",
                      opacity: 0.75,
                    }}
                  >
                    {item.no}
                  </span>
                </div>

                {/* Title + body */}
                <div className="col-span-10 md:col-span-11 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-14">
                  <div className="flex flex-col gap-1.5">
                    <h3
                      style={{
                        fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                        fontWeight: 500,
                        color: INK_1,
                        lineHeight: 1.5,
                        fontFamily: "DM Sans, sans-serif",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "clamp(0.75rem, 1vw, 0.85rem)", fontWeight: 300, color: INK_3, lineHeight: 1.6 }}>
                      {item.titleJa}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p
                      style={{
                        fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)",
                        fontWeight: 400,
                        color: INK_2,
                        lineHeight: 1.7,
                        fontFamily: "DM Sans, sans-serif",
                      }}
                    >
                      {item.body}
                    </p>
                    <p style={{ fontSize: "clamp(0.75rem, 1vw, 0.85rem)", fontWeight: 300, color: INK_3, lineHeight: 1.6 }}>
                      {item.bodyJa}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Solutions ────────────────────────────────────────────────────────────────

function Solutions() {
  return (
    <section style={{ background: BG_BASE }}>
      <div className="h-px mx-12" style={{ background: BORDER }} />

      <div className="max-w-screen-xl mx-auto px-8 md:px-20 py-28 md:py-40">
        <SectionLabel en="Solutions" ja="ƐSでは？！" />

        {/* Heading + intro side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "clamp(32px, 5vw, 60px)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: INK_1,
            }}
          >
            <GT style={{ fontWeight: 500 }}>5 Solutions</GT>
            <br />
            Provided by ƐS.
            <span style={{ display: "block", fontSize: "0.35em", marginTop: "1em", fontWeight: 400, letterSpacing: "0.05em", color: INK_2 }}>ƐSが提供する5つのソリューション</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-3 self-end flex flex-col"
            style={{ maxWidth: "480px" }}
          >
            <p
              style={{
                fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
                fontWeight: 400,
                color: INK_1,
                lineHeight: 1.7,
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              ƐS provides concrete solutions for every single challenge.
            </p>
            <p
              style={{
                fontSize: "clamp(0.75rem, 1vw, 0.85rem)",
                fontWeight: 300,
                color: INK_3,
                lineHeight: 1.6,
                marginTop: "0.5rem",
              }}
            >
              課題ひとつひとつに対して、ƐSは具体的な解決策を提供します。
            </p>
          </motion.div>
        </div>

        <GradientRule className="mb-0" />

        {/* Solution rows */}
        <div>
          {SOLUTIONS.map((item, i) => (
            <motion.div
              key={item.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.75, delay: i * 0.07 }}
            >
              <div
                className="grid grid-cols-12 gap-4 md:gap-10 py-8 md:py-10"
                style={{ borderBottom: `1px solid ${BORDER}` }}
              >
                {/* Number */}
                <div className="col-span-2 md:col-span-1 pt-0.5">
                  <span
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 300,
                      backgroundImage: ES_GRADIENT,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.no}
                  </span>
                </div>

                {/* Title + body */}
                <div className="col-span-10 md:col-span-11 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-14">
                  <div className="flex flex-col gap-1.5">
                    <h3
                      style={{
                        fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                        fontWeight: 500,
                        backgroundImage: ES_GRADIENT,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        lineHeight: 1.5,
                        fontFamily: "DM Sans, sans-serif",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "clamp(0.75rem, 1vw, 0.85rem)", fontWeight: 300, color: INK_3, lineHeight: 1.6 }}>
                      {item.titleJa}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p
                      style={{
                        fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)",
                        fontWeight: 400,
                        color: INK_2,
                        lineHeight: 1.7,
                        fontFamily: "DM Sans, sans-serif",
                      }}
                    >
                      {item.body}
                    </p>
                    <p style={{ fontSize: "clamp(0.75rem, 1vw, 0.85rem)", fontWeight: 300, color: INK_3, lineHeight: 1.6 }}>
                      {item.bodyJa}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section Cards ────────────────────────────────────────────────────────────

function SectionCards() {
  return (
    <section style={{ background: BG_SECTION }}>
      <div className="h-px mx-12" style={{ background: BORDER }} />

      <div className="max-w-screen-xl mx-auto px-8 md:px-20 pt-28 md:pt-36 pb-0">
        <SectionLabel en="Sections" ja="各セクション" />

        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "clamp(32px, 5vw, 60px)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            color: INK_1,
          }}
        >
          <GT style={{ fontWeight: 500 }}>Detail Pages</GT>
          <br />
          for Each Section.
          <span style={{ display: "block", fontSize: "0.35em", marginTop: "1em", fontWeight: 400, letterSpacing: "0.05em", color: INK_2 }}>各セクション詳細ページはこちら</span>
        </motion.h2>
      </div>

      {/* Photo card grid — edge-to-edge */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {SECTION_CARDS.map((card, index) => (
          <MotionLink
            key={card.title}
            to={card.link}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: index * 0.1 }}
            className="group relative block overflow-hidden"
            style={{ aspectRatio: "4/5" }}
          >
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
              style={{ transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)" }}
            />

            {/* Subtle gradient vignette */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.1) 100%)",
              }}
            />
            {/* Hover tint */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: "linear-gradient(135deg, rgba(245,197,24,0.15) 0%, rgba(60,37,98,0.25) 100%)" }}
            />

            {/* Separator */}
            {index < SECTION_CARDS.length - 1 && (
              <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.12)" }} />
            )}

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.15 + index * 0.1 }}
              >
                <p
                  className="tracking-[0.28em] uppercase mb-2"
                  style={{ color: "rgba(255,255,255,0.65)", fontSize: "10px", fontWeight: 400 }}
                >
                  {card.titleJa}
                </p>
                <h3
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 400,
                    color: "#fff",
                    letterSpacing: "0.04em",
                    lineHeight: 1.1,
                    marginBottom: "1rem",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  {card.title}
                </h3>

                {/* Animated underline */}
                <div
                  className="h-0.5 mb-5"
                  style={{
                    background: ES_GRADIENT,
                    width: "2.5rem",
                    transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />

                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "#fff",
                  }}
                >
                  <span className="flex flex-col items-start gap-0.5">
                    <span style={{ fontSize: "11px", letterSpacing: "0.06em", fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}>Explore</span>
                  </span>
                  <span
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    style={{ fontSize: "9px" }}
                  >
                    →
                  </span>
                </div>
              </motion.div>
            </div>
          </MotionLink>
        ))}
      </div>

      {/* Footer strip */}
      <div
        className="border-t px-8 md:px-20 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{ borderColor: BORDER }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex items-center gap-3"
        >
          <GridIcon size={22} pattern="B" />
          <span
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 300,
              backgroundImage: ES_GRADIENT,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.08em",
            }}
          >
            &#x190;S Product
          </span>
        </motion.div>
        <div className="flex flex-col items-start md:items-end gap-1">
          <p style={{ fontSize: "11px", color: INK_2, letterSpacing: "0.05em", fontFamily: "DM Sans, sans-serif" }}>
            Comprehensive Management System for Bridal, Banquet, Costume & Beauty
          </p>
          <p style={{ fontSize: "9px", color: INK_3, letterSpacing: "0.05em" }}>
            婚礼・宴会・衣装・美容 総合基幹システム
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ───────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section style={{ background: BG_BASE, paddingBottom: "100px" }}>
      <div className="h-px mx-12" style={{ background: BORDER }} />
      
      <div className="max-w-screen-xl mx-auto px-8 md:px-20 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-16 md:p-24 relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.7)",
            border: `1px solid ${BORDER}`,
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.03)",
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{ background: ES_GRADIENT, opacity: 0.8 }}
          />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] font-light tracking-tight mb-4 flex flex-col gap-3"
              style={{ color: INK_1 }}
            >
              <span>Let's talk about the future.</span>
              <span className="text-sm tracking-widest uppercase" style={{ color: INK_3 }}>お問い合わせはこちら</span>
            </h2>
            
            <p
              className="mt-6 mb-12 max-w-lg leading-relaxed text-sm font-light"
              style={{ color: INK_2 }}
            >
              お客様の課題に合わせた最適なプランをご提案いたします。システム導入に関するご相談やデモのご依頼など、どうぞお気軽にお問い合わせください。
            </p>
            
            <button
              className="group relative px-10 py-5 rounded-full overflow-hidden transition-all shadow-md hover:shadow-xl"
              style={{ background: INK_1 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: ES_GRADIENT }} />
              <div className="relative z-10 flex items-center gap-3 text-white">
                <span className="text-xs tracking-widest uppercase font-medium">Contact Us</span>
                <div className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PVHome() {
  return (
    <div style={{ fontFamily: "DM Sans, sans-serif", background: BG_BASE, color: INK_1, overflowX: "hidden", position: "relative" }}>
      <Hero />
      <Overview />
      <Coverage />
      <Vision />
      <Recommendations />
      <Solutions />
      <SectionCards />
      <ContactSection />
    </div>
  );
}
