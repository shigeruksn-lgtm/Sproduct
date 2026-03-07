import { Link } from 'react-router';
import { motion } from 'motion/react';
import { EsOjisan } from '../components/EsMascots';
import { GridIcon } from '../components/GridIcon';

export default function NotFound() {
  return (
    <div
      className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-8"
      style={{ fontFamily: 'DM Sans, sans-serif' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col items-center text-center"
      >
        {/* ƐSおじさん 謝罪ポーズ */}
        <motion.div
          animate={{ rotate: [0, -1, 1, -1, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="mb-8"
        >
          <EsOjisan size={80} expression="sorry" />
        </motion.div>

        {/* 404 */}
        <h1
          className="text-8xl tracking-tighter text-neutral-200 mb-2"
          style={{ fontWeight: 300 }}
        >
          404
        </h1>

        {/* メッセージ */}
        <p
          className="text-neutral-500 mb-2 tracking-wide"
          style={{ fontWeight: 300 }}
        >
          ページが見つかりませんでした
        </p>
        <p
          className="text-neutral-400 text-sm mb-10"
          style={{ fontWeight: 300 }}
        >
          「すまんすまん、道に迷ったかね？ワシが案内しよう。」
        </p>

        {/* ホームへ戻る */}
        <Link
          to="/"
          className="group flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-widest uppercase border border-neutral-300 text-neutral-500 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all"
        >
          <GridIcon size={16} pattern="B" />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  );
}
