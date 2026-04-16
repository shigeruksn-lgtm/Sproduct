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

export default function Beauty() {
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
            src="https://images.unsplash.com/photo-1709316010508-6c86856540e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjB0cmVhdG1lbnQlMjBhZXN0aGV0aWMlMjB3ZWxsbmVzcyUyMHNraW5jYXJlJTIwcmVzb3J0fGVufDF8fHx8MTc3NDUzMzY1NXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Beauty Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/30" />
        </motion.div>

        <div className="relative z-10 text-center px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[11px] tracking-[0.5em] uppercase mb-6"
            style={{ color: INK_3 }}
          >
            Product Line 04
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-light tracking-tight mb-4 flex flex-col items-center gap-2"
            style={{ color: INK_1 }}
          >
            <span>Beauty</span>
            <span className="text-xl tracking-[0.3em] font-light" style={{ color: INK_3 }}>美容</span>
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
            style={{ color: INK_2 }}
          >
            <span>Supporting the best beauty of your life<br />with perfect assignments and chart management.</span>
            <span className="text-sm tracking-wide" style={{ color: INK_3 }}>自分史上最高の美しさを、完璧なアサインとカルテ管理で支える。</span>
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
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1770757587792-1b10a8221f76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBicmlkYWwlMjBzcGElMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzc0NTMzMTg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Beauty Care"
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
              }}>Once-in-a-Lifetime Radiance,<br />with an Unbroken Care System.</span>
              <span className="text-sm tracking-widest" style={{ color: INK_3 }}>一期一会の輝きを、途切れないケア体制で。</span>
            </h2>
            <div className="mb-10 flex flex-col gap-2">
              <p className="leading-relaxed text-lg font-light" style={{ color: INK_2 }}>
                Beauty operations require advanced skills, meticulous counseling, and reliable staff assignments. The ƐS Beauty line digitizes the sharing of electronic medical records, management of treatment steps, and assignment adjustments based on staff skills. It maximizes the time spent close to the customer, drawing out the highest satisfaction.
              </p>
              <p className="text-sm font-light leading-relaxed" style={{ color: INK_3 }}>
                美容業務は、高度な技術と、きめ細かなカウンセリング、そして確実なスタッフのアサインが重要です。ƐS 美容ラインは、電子カルテの共有、施術ステップの管理、さらにはスタッフのスキルに応じたアサイン調整をデジタル化。お客様に寄り添う時間を最大化し、最高の満足度を引き出します。
              </p>
            </div>
            <div className="space-y-5">
              {[
                { en: "Visual Electronic Medical Records with Image Saving", ja: "画像保存も可能なビジュアル電子カルテ" },
                { en: "Automated Assignment Considering Staff Skills and Availability", ja: "スタッフのスキル・空き時間を考慮した自動アサイン" },
                { en: "Step Management from Rehearsal to the Day and Aftercare", ja: "リハーサルから当日、アフターケアまでのステップ管理" },
                { en: "Seamless Accounting Integration for Product and Option Sales", ja: "物販・オプション販売のシームレスな会計連携" }
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

      {/* Feature Cards Grid */}
      <section className="py-32 px-8" style={{ background: "rgba(26,22,18,0.02)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                titleEn: "Digital Chart",
                titleJa: "電子カルテ",
                descEn: "Save counseling details and photos on iPad. Can be shared across all sections.",
                descJa: "iPadでカウンセリング内容や写真を保存。全セクションで共有可能。"
              },
              {
                titleEn: "Skill Matching",
                titleJa: "スキルマッチング",
                descEn: "Realizes optimal staff assignment according to expertise and nomination status.",
                descJa: "得意分野や指名状況に応じた最適なスタッフアサインを実現。"
              },
              {
                titleEn: "Step Management",
                titleJa: "ステップ管理",
                descEn: "Visualizes the schedule up to the wedding. Prevents lack of preparation in advance.",
                descJa: "挙式までのスケジュールを可視化。準備不足を未然に防ぎます。"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center p-8 rounded-3xl"
                style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}
              >
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-8 shadow-sm" style={{ border: `1px solid ${BORDER}`, background: "white" }}>
                  <div className="w-8 h-8 rounded-full" style={{ background: ES_GRADIENT }} />
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
            className="rounded-[3rem] p-16 relative overflow-hidden shadow-2xl"
            style={{ background: "white", border: `1px solid ${BORDER}` }}
          >
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-light mb-4 flex flex-col gap-3" style={{ color: INK_1 }}>
                <span>As the Best Partner<br />Supporting Your Beauty.</span>
                <span className="text-lg tracking-widest" style={{ color: INK_3 }}>美しさを支える、最高のパートナーとして。</span>
              </h2>
              <button className="mt-8 px-10 py-4 text-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg" style={{ background: ES_GRADIENT }}>
                Book a Demo / デモ体験を予約する
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
