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

export default function Banquet() {
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
            src="https://images.unsplash.com/photo-1761110787206-2cc164e4913c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmFucXVldCUyMGhhbGwlMjBnYWxhJTIwZGlubmVyJTIwcGFydHklMjBsdXh1cnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzQ1MzM2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Banquet Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1612]/40" />
        </motion.div>

        <div className="relative z-10 text-center px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[11px] tracking-[0.5em] uppercase mb-6"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Product Line 02
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white text-6xl md:text-8xl font-light tracking-tight mb-4 flex flex-col items-center gap-2"
          >
            <span>Banquet</span>
            <span className="text-xl tracking-[0.3em] font-light" style={{ color: "rgba(255,255,255,0.7)" }}>宴会</span>
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
            <span>From business to private celebrations.<br />Maximize venue potential with high-efficiency operations.</span>
            <span className="text-sm tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>ビジネスからプライベートな祝宴まで。空間のポテンシャルを最大限に引き出す、高効率な運用を。</span>
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
            className="order-2 lg:order-1"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1762621175799-5fc1e336e84a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVnYW50JTIwZXZlbnQlMjB2ZW51ZXxlbnwxfHx8fDE3NzQ1MzI5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Banquet Venue"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2
              className="text-4xl md:text-5xl font-light tracking-tight mb-8 flex flex-col gap-3"
            >
              <span style={{
                backgroundImage: ES_GRADIENT,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Flexible Adaptability,<br />Built on a Solid Digital Foundation.</span>
              <span className="text-sm tracking-widest" style={{ color: INK_3 }}>フレキシブルな対応力を、確かなデジタル基盤で。</span>
            </h2>
            <div className="mb-10 flex flex-col gap-2">
              <p className="leading-relaxed text-lg font-light" style={{ color: INK_2 }}>
                Banquet operations demand sudden changes, customizations, and speed. The ƐS Banquet line connects everything non-stop—from instant quoting and visual venue layout management to billing and payment confirmation. It enables strategic operations that capture sales opportunities and increase repeat rates.
              </p>
              <p className="text-sm font-light leading-relaxed" style={{ color: INK_3 }}>
                宴会業務は、突発的な変更やカスタマイズ、そしてスピード感が求められます。ƐS 宴会ラインは、見積もりの即時作成から会場レイアウトの視覚的な管理、さらには請求・入金確認までをノンストップでつなぎます。営業機会を逃さず、リピート率を高める戦略的な運用を可能にします。
              </p>
            </div>
            <div className="space-y-5">
              {[
                { en: "Instant Quoting System from Initial Inquiry", ja: "問い合わせから即時の見積提案機能" },
                { en: "Schedule Management Maximizing Venue Turnover", ja: "会場回転率を最大化するスケジュール管理" },
                { en: "Flexible Combinations of Diverse Plans and Options", ja: "多様なプラン・オプションの柔軟な組み合わせ" },
                { en: "Corporate Client History Management and Direct Approach", ja: "法人顧客の履歴管理とダイレクトアプローチ" }
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
        </div>
      </section>

      {/* Stats/Highlight Grid */}
      <section className="py-32 px-8" style={{ background: INK_1, color: "white" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { labelEn: "Efficiency", labelJa: "効率化", value: "40%", textEn: "Reduces administrative time, creating more time for sales activities.", textJa: "事務作業時間を削減し、営業活動への時間を創出します。" },
              { labelEn: "Response", labelJa: "レスポンス", value: "Instant", textEn: "Quick responses to inquiries improve contract rates.", textJa: "問い合わせへのクイックなレスポンスが、成約率を向上。" },
              { labelEn: "Stability", labelJa: "安定性", value: "Error Free", textEn: "Eliminates miscommunication, supporting perfect event execution.", textJa: "情報の行き違いをなくし、施行当日の完璧な運営を支えます。" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 flex flex-col gap-1">
                  <p className="text-white/40 text-sm tracking-widest uppercase">{stat.labelEn}</p>
                  <p className="text-white/30 text-[10px] tracking-widest">{stat.labelJa}</p>
                </div>
                <h4 className="text-5xl font-light mb-6" style={{
                  backgroundImage: ES_GRADIENT,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>{stat.value}</h4>
                <div className="flex flex-col gap-2">
                  <p className="text-white/80 font-light text-sm leading-relaxed">{stat.textEn}</p>
                  <p className="text-white/50 font-light text-xs leading-relaxed">{stat.textJa}</p>
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
            style={{ border: `1px solid ${BORDER}`, background: "rgba(245,197,24,0.03)" }}
          >
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-light mb-4 flex flex-col gap-3" style={{ color: INK_1 }}>
                <span>A New Shape of Banquet Management,<br />Maximizing Sales Power.</span>
                <span className="text-lg tracking-widest" style={{ color: INK_3 }}>営業力を最大化する、宴会管理の新しい形。</span>
              </h2>
              <button className="mt-8 px-10 py-4 text-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg" style={{ background: ES_GRADIENT }}>
                Request a Demo / デモを依頼する
              </button>
            </div>
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
