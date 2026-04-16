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

export default function Costume() {
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
            src="https://images.unsplash.com/photo-1773370812332-d2bcdfb373ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZHJlc3MlMjBkZXRhaWwlMjBsdXh1cnklMjBicmlkYWwlMjBmYXNoaW9uJTIwZW1icm9pZGVyeXxlbnwxfHx8fDE3NzQ1MzM2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Costume Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1612]/20" />
        </motion.div>

        <div className="relative z-10 text-center px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[11px] tracking-[0.5em] uppercase mb-6"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            Product Line 03
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white text-6xl md:text-8xl font-light tracking-tight mb-4 flex flex-col items-center gap-2"
          >
            <span>Costume</span>
            <span className="text-xl tracking-[0.3em] font-light" style={{ color: "rgba(255,255,255,0.8)" }}>衣装</span>
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
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            <span>Turn the beauty of a single dress into an eternal memory.<br />Perfect control over vast inventory and schedules.</span>
            <span className="text-sm tracking-wide" style={{ color: "rgba(255,255,255,0.8)" }}>一着の美しさを、永遠の記憶に。膨大な在庫とスケジュールを、完璧なコントロール下に。</span>
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
              }}>A Destined Dress for Once in a Lifetime,<br />Backed by Reliable Operations.</span>
              <span className="text-sm tracking-widest" style={{ color: INK_3 }}>一期一会の運命の一着を、確実なオペレーションで。</span>
            </h2>
            <div className="mb-10 flex flex-col gap-2">
              <p className="leading-relaxed text-lg font-light" style={{ color: INK_2 }}>
                Costume operations require delicate product maintenance and close coordination with other sections. The ƐS Costume line centralizes everything digitally—from product tag management and fitting history to delivery on the wedding day. Staff can focus on creative proposals while eliminating operational mistakes.
              </p>
              <p className="text-sm font-light leading-relaxed" style={{ color: INK_3 }}>
                衣装業務は、商品の繊細なメンテナンスと、他セクションとの密接な連携が欠かせません。ƐS 衣装ラインは、商品のタグ管理からフィッティング履歴、そして挙式当日のデリバリーまでをデジタルで一元化。スタッフはクリエイティブな提案に専念し、オペレーションミスを徹底的に排除します。
              </p>
            </div>
            <div className="space-y-5">
              {[
                { en: "Real-time Inventory Tracking via QR/Tag Management", ja: "QR/タグ管理によるリアルタイム在庫把握" },
                { en: "Automated Scheduling Linked with Bridal and Banquet Reservations", ja: "婚礼・宴会予約と連動した自動スケジュール調整" },
                { en: "Visualization of Maintenance and Cleaning Status", ja: "メンテナンス・クリーニング状況の可視化" },
                { en: "Visual Proposal Tools using iPads and Tablets", ja: "iPad等のタブレットによる視覚的な提案ツール" }
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
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1767050400384-3e2c733e5dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGRyZXNzJTIwZGV0YWlsfGVufDF8fHx8MTc3NDUzMzA2Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Costume Detail"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Highlight Grid */}
      <section className="py-32 px-8" style={{ background: "rgba(26,22,18,0.02)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { titleEn: "Inventory", titleJa: "在庫管理", textEn: "Instantly search through tens of thousands of items in inventory.", textJa: "数万件の在庫を即座に検索。" },
              { titleEn: "Fitting", titleJa: "フィッティング", textEn: "Manage past fitting history on a tablet.", textJa: "過去の履歴をタブレットで管理。" },
              { titleEn: "Logistic", titleJa: "物流", textEn: "Shipping management that reduces delivery mistakes to zero.", textJa: "配送ミスをゼロにする出荷管理。" },
              { titleEn: "Analysis", titleJa: "分析", textEn: "Automatically extract trends of popular items.", textJa: "人気商品の傾向を自動で抽出。" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 rounded-3xl shadow-sm"
                style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}
              >
                <div className="mb-4 flex flex-col gap-1">
                  <p className="text-xs tracking-widest uppercase" style={{ color: INK_2 }}>{feature.titleEn}</p>
                  <p className="text-[10px] tracking-widest" style={{ color: INK_3 }}>{feature.titleJa}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-light text-sm" style={{ color: INK_1 }}>{feature.textEn}</p>
                  <p className="font-light text-xs" style={{ color: INK_3 }}>{feature.textJa}</p>
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
            style={{ background: INK_1 }}
          >
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-light mb-4 flex flex-col gap-3" style={{ color: "white" }}>
                <span>Making the Costume Business<br />More Free, More Accurate.</span>
                <span className="text-lg tracking-widest" style={{ color: "rgba(255,255,255,0.6)" }}>衣装ビジネスを、もっと自由に、もっと正確に。</span>
              </h2>
              <button className="mt-8 px-10 py-4 bg-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg" style={{ color: INK_1 }}>
                Learn More / 詳しく知る
              </button>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -mr-48 -mt-48" style={{ background: "rgba(245,197,24,0.1)" }} />
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
