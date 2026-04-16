import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const ES_GRADIENT = "linear-gradient(135deg, #F5C518 0%, #D49B1A 20%, #C0392B 50%, #4A2040 80%, #3C2562 100%)";

const BG_BASE = "#FAFAF8";
const INK_1 = "#1A1612";
const INK_2 = "#4A4540";
const INK_3 = "#9A948E";
const BORDER = "rgba(26,22,18,0.08)";

export default function Wedding() {
  return (
    <div className="relative min-h-screen font-['DM_Sans'] overflow-x-hidden" style={{ background: BG_BASE, color: INK_1 }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <Link
            to="/pv"
            className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md text-sm font-medium transition-all shadow-sm"
            style={{ background: "rgba(255,255,255,0.8)", border: `1px solid ${BORDER}`, color: INK_2 }}
          >
            <ArrowLeft size={16} />
            <span className="tracking-widest uppercase text-xs">BACK TO PV</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1767986012154-db9a321c8832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwY2VyZW1vbnklMjByZWNlcHRpb24lMjBkZWNvcnxlbnwxfHx8fDE3NzQ1MzM2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Wedding Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1612]/30" />
        </motion.div>

        <div className="relative z-10 text-center px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[11px] tracking-[0.5em] uppercase mb-6"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Product Line 01
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white text-6xl md:text-8xl font-light tracking-tight mb-4 flex flex-col items-center gap-2"
          >
            <span>Bridal</span>
            <span className="text-xl tracking-[0.3em] font-light" style={{ color: "rgba(255,255,255,0.7)" }}>婚礼</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="h-px w-20 mx-auto mb-10"
            style={{ background: ES_GRADIENT }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed flex flex-col gap-2"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            <span>Integrate every process that creates emotion,<br />ultimately smart and seamlessly.</span>
            <span className="text-sm tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>感動を創造するすべてのプロセスを、究極にスマート、かつシームレスに統合します。</span>
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-4xl md:text-5xl font-light tracking-tight mb-8 flex flex-col gap-3"
            >
              <span style={{
                backgroundImage: ES_GRADIENT,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Once-in-a-Lifetime Experience,<br />Powered by the Best Technology.</span>
              <span className="text-sm tracking-widest" style={{ color: INK_3 }}>一期一会の体験を、最高のテクノロジーで。</span>
            </h2>
            <div className="mb-10 flex flex-col gap-2">
              <p className="leading-relaxed text-lg font-light" style={{ color: INK_2 }}>
                Bridal operations require diverse coordination and meticulous schedule management. The ƐS Bridal line centralizes all data—from initial customer service to execution management on the ceremony day, and after-sales follow-up. It reduces planners' burdens and provides an environment where they can focus on hospitality.
              </p>
              <p className="text-sm font-light leading-relaxed" style={{ color: INK_3 }}>
                婚礼業務は、多岐にわたる調整と緻密なスケジュール管理が求められます。ƐS 婚礼ラインは、新規接客から挙式当日の施行管理、そしてアフターフォローまで、すべてのデータを一元化。プランナーの負担を軽減し、お客様へのホスピタリティに集中できる環境を提供します。
              </p>
            </div>
            <div className="space-y-5">
              {[
                { en: "New Analysis for Improving Contract Rate using AI", ja: "AIを活用した成約率向上のための新規分析" },
                { en: "Real-time Availability and Planning Proposals", ja: "リアルタイムな空き状況とプランニング提案" },
                { en: "Multi-device Management Connecting Customers, Partners, and Internal Staff", ja: "顧客・取引先・社内を繋ぐマルチデバイス管理" },
                { en: "Meticulous Cost Management and Automated Billing System", ja: "緻密な原価管理と自動請求システム" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center mt-1" style={{ color: "#D49B1A", background: "rgba(212,155,26,0.1)" }}>
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium" style={{ color: INK_1 }}>{item.en}</span>
                    <span className="text-xs font-light" style={{ color: INK_3 }}>{item.ja}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1749491104890-1cada72354cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtaW5pbWFsaXN0JTIwd2VkZGluZyUyMGNlcmVtb255fGVufDF8fHx8MTc3NDUzMjkxNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Wedding Detail"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Glass decoration */}
            <div
              className="absolute -bottom-12 -left-12 w-64 h-64 rounded-3xl backdrop-blur-2xl border p-8 shadow-xl hidden md:flex flex-col justify-center"
              style={{ background: "rgba(255,255,255,0.7)", borderColor: BORDER }}
            >
              <div className="w-12 h-px mb-4" style={{ background: ES_GRADIENT }} />
              <p className="text-sm font-semibold mb-2" style={{ color: INK_1 }}>Total Management</p>
              <p className="text-xs leading-relaxed" style={{ color: INK_3 }}>
                成約から施行、入金確認まで、婚礼ビジネスのすべてのフェーズをひとつのプラットフォームで。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-8" style={{ background: "rgba(26,22,18,0.02)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-3xl font-light mb-2" style={{ color: INK_1 }}>Core Functions</h3>
            <p className="text-sm tracking-widest mb-6" style={{ color: INK_3 }}>主要機能</p>
            <div className="w-12 h-px mx-auto" style={{ background: BORDER }} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                titleEn: "Reservation Management",
                titleJa: "来館・予約管理",
                descEn: "Automatically aggregate automated reservations from the web and measure the effectiveness of each medium in real time.",
                descJa: "WEBからの自動予約連携と、媒体ごとの効果測定をリアルタイムに集計。"
              },
              {
                titleEn: "Meeting Tools",
                titleJa: "打ち合わせツール",
                descEn: "Share estimates, seating charts, and schedules in the cloud. Changes are reflected instantly.",
                descJa: "見積もり、配席図、進行表をクラウドで共有。変更内容は即座に反映。"
              },
              {
                titleEn: "Execution & Order Management",
                titleJa: "施行・発注管理",
                descEn: "Digitize order instructions to partner companies. A system that prevents mistakes before they happen.",
                descJa: "パートナー企業への発注指示をデジタル化。ミスを未然に防ぐ仕組み。"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all group"
                style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ background: ES_GRADIENT }}>
                  <div className="w-6 h-6 border-2 border-white rounded-md" />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <h4 className="text-xl font-medium" style={{ color: INK_1 }}>{feature.titleEn}</h4>
                  <span className="text-xs tracking-wide" style={{ color: INK_3 }}>{feature.titleJa}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="leading-relaxed font-light text-sm" style={{ color: INK_2 }}>{feature.descEn}</p>
                  <p className="leading-relaxed font-light text-xs" style={{ color: INK_3 }}>{feature.descJa}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[3rem] p-16 relative overflow-hidden"
            style={{ background: ES_GRADIENT }}
          >
            <div className="relative z-10 text-white flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-light mb-4 flex flex-col gap-3">
                <span>The Future of Bridal Business,<br />with ƐS.</span>
                <span className="text-lg tracking-widest" style={{ color: "rgba(255,255,255,0.8)" }}>婚礼ビジネスの未来を、ƐSと共に。</span>
              </h2>
              <button className="mt-8 px-10 py-4 bg-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg" style={{ color: INK_1 }}>
                Contact Us / お問い合わせ
              </button>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          </motion.div>
        </div>
      </section>
      
      {/* Footer link */}
      <div className="pb-20 text-center">
        <Link to="/pv" className="text-xs tracking-[0.2em] transition-colors uppercase" style={{ color: INK_3 }}>
          BACK TO TOP
        </Link>
      </div>
    </div>
  );
}
