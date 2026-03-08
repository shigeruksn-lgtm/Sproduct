// 非公認マスコット キャラクター紹介ページ
// CHARACTER CONCEPT — FOR FUN

import { GridIcon } from '../components/GridIcon';

// ─────────────────────────────────────────────────────────────────────────────
// Black Silhouette Character SVGs
// ─────────────────────────────────────────────────────────────────────────────

/** 黒シルエット版おじさん（通常立ち） */
const OjisanStanding = ({ height = 280 }: { height?: number }) => {
  const w = height * (100 / 270);
  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 100 270"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* ══ HAT ══ */}
      {/* cylinder */}
      <rect x="22" y="0" width="56" height="58" rx="5" fill="#111" />
      {/* highlight edge */}
      <rect x="22" y="0" width="56" height="3" rx="2" fill="#333" />
      {/* band */}
      <rect x="22" y="46" width="56" height="12" fill="#222" />
      {/* brim */}
      <rect x="6" y="56" width="88" height="13" rx="5" fill="#111" />
      {/* ƐS text */}
      <text x="50" y="39" textAnchor="middle" fontSize="17" fill="#fff"
        fontFamily="DM Sans, sans-serif" fontWeight="bold" letterSpacing="-0.5">ƐS</text>

      {/* ══ HEAD ══ */}
      {/* ears */}
      <ellipse cx="20" cy="96" rx="5" ry="8" fill="#111" />
      <ellipse cx="80" cy="96" rx="5" ry="8" fill="#111" />
      {/* face */}
      <ellipse cx="50" cy="95" rx="30" ry="27" fill="#111" />

      {/* ══ GLASSES ══ (white on black) */}
      <circle cx="36" cy="91" r="11" fill="none" stroke="#fff" strokeWidth="2.5" />
      <circle cx="64" cy="91" r="11" fill="none" stroke="#fff" strokeWidth="2.5" />
      {/* bridge */}
      <line x1="47" y1="91" x2="53" y2="91" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      {/* temples */}
      <line x1="19" y1="88" x2="25" y2="90" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="75" y1="90" x2="81" y2="88" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      {/* pupils */}
      <circle cx="36" cy="91" r="5" fill="#fff" opacity="0.15" />
      <circle cx="64" cy="91" r="5" fill="#fff" opacity="0.15" />

      {/* ══ MUSTACHE ══ */}
      <path d="M29 110 Q40 117 50 111 Q60 117 71 110" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M29 110 Q21 104 19 97" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M71 110 Q79 104 81 97" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />

      {/* ══ NECK ══ */}
      <rect x="40" y="118" width="20" height="9" rx="4" fill="#111" />

      {/* ══ BODY ══ */}
      <rect x="10" y="125" width="80" height="90" rx="14" fill="#111" />
      {/* shirt */}
      <path d="M44 125 L50 142 L56 125" fill="#fff" opacity="0.12" />
      {/* lapels */}
      <path d="M44 125 L27 146 L10 135 L10 125Z" fill="#222" />
      <path d="M56 125 L73 146 L90 135 L90 125Z" fill="#222" />
      {/* pocket square */}
      <path d="M24 135 L28 129 L33 135 L30 140 L24 140Z" fill="#fff" opacity="0.7" />
      {/* buttons */}
      <circle cx="50" cy="158" r="2.5" fill="#fff" opacity="0.4" />
      <circle cx="50" cy="167" r="2.5" fill="#fff" opacity="0.3" />
      <circle cx="50" cy="176" r="2.5" fill="#fff" opacity="0.2" />

      {/* ══ LEFT ARM ══ */}
      <rect x="0" y="128" width="13" height="50" rx="6" fill="#111" />
      <ellipse cx="6" cy="183" rx="7" ry="6" fill="#111" />

      {/* ══ RIGHT ARM ══ */}
      <rect x="87" y="128" width="13" height="50" rx="6" fill="#111" />
      <ellipse cx="94" cy="183" rx="7" ry="6" fill="#111" />

      {/* ══ LEGS ══ */}
      <rect x="14" y="210" width="28" height="45" rx="9" fill="#111" />
      <ellipse cx="28" cy="252" rx="20" ry="8" fill="#111" />
      <rect x="58" y="210" width="28" height="45" rx="9" fill="#111" />
      <ellipse cx="72" cy="252" rx="20" ry="8" fill="#111" />

      {/* ══ BELT ══ */}
      <rect x="10" y="205" width="80" height="8" rx="3" fill="#000" />
      <rect x="42" y="205" width="16" height="8" rx="2" fill="#333" />
    </svg>
  );
};

/** 黒シルエット版おじさん（お辞儀グリーティング） */
const OjisanBowing = ({ height = 280 }: { height?: number }) => {
  const w = height * (120 / 270);
  return (
    <svg
      width={w}
      height={height}
      viewBox="-10 0 120 270"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* ══ HAT (tilted left) ══ */}
      <g transform="rotate(-20, 50, 30)">
        <rect x="22" y="0" width="56" height="58" rx="5" fill="#111" />
        <rect x="22" y="0" width="56" height="3" rx="2" fill="#333" />
        <rect x="22" y="46" width="56" height="12" fill="#222" />
        <rect x="6" y="56" width="88" height="13" rx="5" fill="#111" />
        <text x="50" y="39" textAnchor="middle" fontSize="17" fill="#fff"
          fontFamily="DM Sans, sans-serif" fontWeight="bold" letterSpacing="-0.5">ƐS</text>
      </g>

      {/* ══ HEAD ══ */}
      <ellipse cx="20" cy="96" rx="5" ry="8" fill="#111" />
      <ellipse cx="80" cy="96" rx="5" ry="8" fill="#111" />
      <ellipse cx="50" cy="95" rx="30" ry="27" fill="#111" />

      {/* ══ GLASSES ══ */}
      <circle cx="36" cy="91" r="11" fill="none" stroke="#fff" strokeWidth="2.5" />
      <circle cx="64" cy="91" r="11" fill="none" stroke="#fff" strokeWidth="2.5" />
      <line x1="47" y1="91" x2="53" y2="91" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="19" y1="88" x2="25" y2="90" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="75" y1="90" x2="81" y2="88" stroke="#fff" strokeWidth="2" strokeLinecap="round" />

      {/* ══ MUSTACHE ══ */}
      <path d="M29 110 Q40 117 50 111 Q60 117 71 110" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M29 110 Q21 104 19 97" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M71 110 Q79 104 81 97" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />

      {/* ══ NECK ══ */}
      <rect x="40" y="118" width="20" height="9" rx="4" fill="#111" />

      {/* ══ BODY (slightly leaning) ══ */}
      <g transform="rotate(-8, 50, 180)">
        <rect x="10" y="125" width="80" height="90" rx="14" fill="#111" />
        <path d="M44 125 L50 142 L56 125" fill="#fff" opacity="0.12" />
        <path d="M44 125 L27 146 L10 135 L10 125Z" fill="#222" />
        <path d="M56 125 L73 146 L90 135 L90 125Z" fill="#222" />
        <path d="M24 135 L28 129 L33 135 L30 140 L24 140Z" fill="#fff" opacity="0.7" />
        <circle cx="50" cy="158" r="2.5" fill="#fff" opacity="0.4" />
        <circle cx="50" cy="167" r="2.5" fill="#fff" opacity="0.3" />

        {/* ══ LEFT ARM (raised to hat) ══ */}
        <g transform="rotate(-60, 8, 130)">
          <rect x="0" y="128" width="13" height="52" rx="6" fill="#111" />
          <ellipse cx="6" cy="183" rx="7" ry="6" fill="#111" />
        </g>

        {/* ══ RIGHT ARM ══ */}
        <rect x="87" y="128" width="13" height="50" rx="6" fill="#111" />
        <ellipse cx="94" cy="183" rx="7" ry="6" fill="#111" />

        {/* ══ LEGS ══ */}
        <rect x="14" y="210" width="28" height="45" rx="9" fill="#111" />
        <ellipse cx="28" cy="252" rx="20" ry="8" fill="#111" />
        <rect x="58" y="210" width="28" height="45" rx="9" fill="#111" />
        <ellipse cx="72" cy="252" rx="20" ry="8" fill="#111" />

        {/* ══ BELT ══ */}
        <rect x="10" y="205" width="80" height="8" rx="3" fill="#000" />
        <rect x="42" y="205" width="16" height="8" rx="2" fill="#333" />
      </g>
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// データ
// ─────────────────────────────────────────────────────────────────────────────

const tags = ['温厚', '博識', 'カイゼル髭', '山高帽'];

const tagColors: Record<string, { bg: string; text: string }> = {
  温厚: { bg: '#FEF3C7', text: '#D97706' },
  博識: { bg: '#F0F9FF', text: '#0369A1' },
  カイゼル髭: { bg: '#F5F3FF', text: '#7C3AED' },
  山高帽: { bg: '#F0FDF4', text: '#15803D' },
};

const background = [
  { label: 'Age',          value: '50歳（人生折り返し）' },
  { label: 'Born',         value: '東京都渋谷区生まれ、福岡県博多区育ち' },
  { label: 'Lives',        value: '広尾在住' },
  { label: 'Hangs out',    value: '中目黒' },
  { label: 'Skill',        value: 'ダンス' },
  { label: 'Hobby',        value: 'AIに悩み相談' },
  { label: 'Catchphrase',  value: 'せやねん' },
  { label: 'Previous job', value: '寿司屋' },
];

const designPrinciples = [
  { label: 'フラット',       value: '立体感・艶なし' },
  { label: 'ゆるかわ',       value: '親しみやすく柔らかい' },
  { label: 'ブランドカラー', value: 'ゴールド×レッド×ネイビー' },
  { label: 'シンプル',       value: '最小限の線と面' },
  { label: 'イメージ',       value: 'ドアマン' },
];

const usageIdeas = [
  'ローディング画面のアニメーション',
  'エラーページの案内役',
  'ツールチップのヘルパー',
  'オンボーディングのナビゲーター',
  'リリースノートの解説役',
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function Mascot() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ fontFamily: 'DM Sans, sans-serif', background: '#fff' }}
    >
      {/* ===== Main Content ===== */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">

        {/* ── Left Panel ── */}
        <div className="flex flex-col p-10 md:p-16">
          {/* Label */}
          <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-8">
            Character Concept&ensp;—&ensp;For Fun
          </p>

          <h1 className="text-4xl md:text-5xl text-neutral-900 mb-3" style={{ fontWeight: 300 }}>
            非公認マスコット
          </h1>
          <p className="text-sm text-neutral-400 mb-16">
            たまに現れる謎のキャラクター紹介
          </p>

          {/* Characters */}
          <div className="flex items-end justify-center gap-6 flex-1">
            <div style={{ opacity: 0.92 }}>
              <OjisanBowing height={260} />
            </div>
            <div style={{ opacity: 0.95 }}>
              <OjisanStanding height={280} />
            </div>
          </div>

          {/* Usage Ideas */}
          <div className="mt-16">
            <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-4">
              Usage Ideas
            </p>
            <ul className="space-y-2">
              {usageIdeas.map((idea) => (
                <li key={idea} className="text-sm text-neutral-500 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-neutral-300 flex-shrink-0" />
                  {idea}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="flex flex-col p-10 md:p-16 overflow-y-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-8">
            <GridIcon size={14} pattern="B" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400">
              ƐS Product Mascot
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl text-neutral-900 mb-1" style={{ fontWeight: 300 }}>
            ƐSおじさん
          </h2>
          <p
            className="text-xs tracking-[0.25em] uppercase mb-8"
            style={{ color: '#E8703A' }}
          >
            The Gentle Navigator
          </p>

          <div className="w-10 h-px bg-neutral-200 mb-8" />

          {/* Description */}
          <p className="text-sm text-neutral-600 mb-8" style={{ lineHeight: '2' }}>
            婚礼・宴会・衣装・美容業界に長くいるにも関わらず、そんな詳しくない風な態度をとる。基本偉そう。でも断らない男。ノラせたらやってくれる人。愛されキャラ狙っているがあざとさが透けて見える。まだ自分が非公認キャラだとは認識していない。ボランティアでES Product Hotelのドアマンをしてくれている。
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs"
                style={{
                  background: tagColors[tag]?.bg ?? '#f5f5f5',
                  color: tagColors[tag]?.text ?? '#555',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Background */}
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-5">
              Background
            </p>
            <table className="w-full">
              <tbody>
                {background.map(({ label, value }) => (
                  <tr key={label} className="border-b border-neutral-100 last:border-0">
                    <td
                      className="py-2.5 pr-6 text-xs text-neutral-400 whitespace-nowrap align-top"
                      style={{ width: '120px', fontWeight: 500 }}
                    >
                      {label}
                    </td>
                    <td className="py-2.5 text-sm text-neutral-700">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Design Principle */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-5">
              Design Principle
            </p>
            <table className="w-full">
              <tbody>
                {designPrinciples.map(({ label, value }) => (
                  <tr key={label} className="border-b border-neutral-100 last:border-0">
                    <td
                      className="py-2.5 pr-6 text-xs text-neutral-800 whitespace-nowrap align-top"
                      style={{ width: '120px', fontWeight: 600 }}
                    >
                      {label}
                    </td>
                    <td className="py-2.5 text-sm text-neutral-500">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <footer
        className="flex items-center justify-between px-10 py-5"
        style={{ background: '#111' }}
      >
        <div className="flex items-center gap-3">
          {/* mini standing character */}
          <svg width="24" height="60" viewBox="0 0 100 270" style={{ display: 'block' }}>
            <rect x="22" y="0" width="56" height="58" rx="5" fill="#fff" opacity="0.9" />
            <rect x="6" y="56" width="88" height="13" rx="5" fill="#fff" opacity="0.9" />
            <text x="50" y="39" textAnchor="middle" fontSize="17" fill="#111"
              fontFamily="DM Sans, sans-serif" fontWeight="bold">ƐS</text>
            <ellipse cx="50" cy="95" rx="30" ry="27" fill="#fff" opacity="0.9" />
            <rect x="10" y="125" width="80" height="90" rx="14" fill="#fff" opacity="0.85" />
            <rect x="14" y="210" width="28" height="45" rx="9" fill="#fff" opacity="0.85" />
            <rect x="58" y="210" width="28" height="45" rx="9" fill="#fff" opacity="0.85" />
          </svg>
          <div>
            <p className="text-sm text-white" style={{ fontWeight: 500 }}>ƐSおじさん</p>
            <p className="text-[10px] text-neutral-500">The Gentle Navigator</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <GridIcon size={16} pattern="B" />
          <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            ES Product Unofficial Mascot
          </p>
        </div>
      </footer>
    </div>
  );
}
