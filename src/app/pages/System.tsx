import { motion } from 'motion/react';
import { GridIcon } from '../components/GridIcon';
import { Link } from 'react-router';
import { ArrowRight, Monitor, Smartphone, Layout, Building2, Users, Calendar, BarChart3 } from 'lucide-react';

const brandGrad = 'linear-gradient(135deg, #F5C518 0%, #C0392B 50%, #3C2562 100%)';
const textGradStyle: React.CSSProperties = {
  backgroundImage: brandGrad,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const systemPages = [
  {
    title: 'HOME',
    desc: 'ƐS Productのダッシュボード型トップページ。サイドバーナビゲーション付きのホーム画面。',
    to: '/home',
    icon: Monitor,
    status: 'Live',
  },
  {
    title: '施設・会場管理',
    desc: '施設の押さえ管理タイムライン。パーティション対応の会場予約グリッドで、部屋の結合・分割も可視化。',
    to: '/home/venue',
    icon: Building2,
    status: 'Live',
  },
  {
    title: '来館管理',
    desc: '来館予約の一覧・カレンダー管理。スロットごとの担当割り当てと状況管理。',
    to: '/home/visit',
    icon: Calendar,
    status: 'Live',
  },
  {
    title: '顧客管理',
    desc: '顧客情報の検索・閲覧・編集。契約状況やスタイル・担当者を一覧で管理。',
    to: '/home/hotel',
    icon: Users,
    status: 'Live',
  },
  {
    title: '分析管理',
    desc: '売上・顧客・稼働状況などの各種データを集計し、グラフや表でレポート出力・分析。',
    to: '/home/analytics',
    icon: BarChart3,
    status: 'Live',
  },
  {
    title: '会場別売上一覧',
    desc: '会場・施設ごとの売上実績・稼働率の推移を日別または月別で確認。',
    to: '/home/analytics/sales-venue',
    icon: Building2,
    status: 'Live',
  },
  {
    title: 'CS Mobile',
    desc: 'お客様向けスマートフォン画面。プロフィール・予約確認・担当者連絡をモバイルUIで提供。',
    to: '/mypage',
    icon: Smartphone,
    status: 'Live',
  },
  {
    title: 'ES Mobile',
    desc: '従業員向けスマートフォン画面。スケジュール管理・顧客管理をモバイルUIで提供。',
    to: '/system/es-mobile',
    icon: Smartphone,
    status: 'Live',
  },
];

export default function System() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(245,197,24,0.04) 0%, rgba(192,57,43,0.03) 40%, transparent 100%)',
        }} />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 max-w-4xl mx-auto px-8 pt-28 pb-20 text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <GridIcon size={40} pattern="B" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl tracking-tight mb-5"
            style={{ fontWeight: 300, lineHeight: 1.12 }}
          >
            <span style={{ ...textGradStyle, fontWeight: 600 }}>System</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-neutral-400 text-sm leading-7 max-w-md mx-auto"
            style={{ fontWeight: 300 }}
          >
            ƐS Productのシステムページ一覧。<br />
            各ページのプレビューと構成を確認できます。
          </motion.p>
        </motion.div>
      </section>

      {/* System Pages Grid */}
      <section className="relative max-w-4xl mx-auto px-8 pb-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {systemPages.map((page) => {
            const Icon = page.icon;
            return (
              <motion.div key={page.to} variants={fadeUp}>
                <Link
                  to={page.to}
                  className="group block p-6 rounded-2xl border border-neutral-100 hover:border-neutral-300 bg-white hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, rgba(245,197,24,0.1), rgba(192,57,43,0.1))' }}
                    >
                      <Icon className="w-4 h-4 text-neutral-600" />
                    </div>
                    <span
                      className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600"
                      style={{ fontWeight: 600 }}
                    >
                      {page.status}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-800 mb-2" style={{ fontWeight: 500 }}>
                    {page.title}
                  </p>
                  <p className="text-xs text-neutral-400 leading-5 mb-4" style={{ fontWeight: 300 }}>
                    {page.desc}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 group-hover:text-neutral-700 transition-colors">
                    <span style={{ fontWeight: 400 }}>ページを開く</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Placeholder cards for future pages */}
          {['システムイメージ', 'アーキテクチャ'].map((label) => (
            <motion.div key={label} variants={fadeUp}>
              <div className="p-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/50 flex flex-col items-center justify-center min-h-[180px]">
                <Layout className="w-5 h-5 text-neutral-300 mb-3" />
                <p className="text-xs text-neutral-300 mb-1" style={{ fontWeight: 500 }}>{label}</p>
                <span
                  className="text-[10px] tracking-[0.15em] uppercase text-neutral-300"
                  style={{ fontWeight: 500 }}
                >
                  Coming Soon
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}