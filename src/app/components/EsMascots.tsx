// ƐS Product マスコットキャラクター
// ※ アセット登録まで SVG シルエットで代替

import React from 'react';

// ────────────────────────────────────────────────
// EsOjisan — 通常立ちポーズ（シルエット）
// ────────────────────────────────────────────────
interface OjisanProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  expression?: string; // 互換性のため受け取るが使わない
}

export function EsOjisan({ size = 120, className, style }: OjisanProps) {
  const h = size;
  const w = Math.round(size * 0.65);
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 65 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0, display: 'inline-block', ...style }}
      aria-label="ƐSおじさん"
    >
      {/* 帽子 */}
      <ellipse cx="32.5" cy="18" rx="20" ry="5" fill="#2D2D2D" />
      <rect x="16" y="10" width="33" height="10" rx="2" fill="#1A1A1A" />
      {/* 頭 */}
      <ellipse cx="32.5" cy="32" rx="14" ry="16" fill="#F5E6D3" />
      {/* カイゼル髭 */}
      <path d="M24 40 Q32.5 44 41 40" stroke="#5A3E28" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M24 40 Q20 42 18 40" stroke="#5A3E28" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M41 40 Q45 42 47 40" stroke="#5A3E28" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 目 */}
      <ellipse cx="27" cy="30" rx="2" ry="2.5" fill="#2D2D2D" />
      <ellipse cx="38" cy="30" rx="2" ry="2.5" fill="#2D2D2D" />
      {/* 眉 */}
      <path d="M24 26 Q27 24.5 30 26" stroke="#5A3E28" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M35 26 Q38 24.5 41 26" stroke="#5A3E28" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 体（燕尾服） */}
      <path d="M18 46 L32.5 56 L47 46 L50 90 L15 90 Z" fill="#1A1A1A" />
      {/* 白シャツ */}
      <path d="M28 46 L32.5 56 L37 46 L35 90 L30 90 Z" fill="#F5F5F5" />
      {/* 金ボタン */}
      <circle cx="32.5" cy="62" r="1.5" fill="#C9A84C" />
      <circle cx="32.5" cy="70" r="1.5" fill="#C9A84C" />
      {/* ネクタイ */}
      <path d="M31 48 L32.5 55 L34 48 L32.5 46 Z" fill="#8B1A1A" />
      {/* 腕 */}
      <path d="M18 46 L10 70 L16 72 L22 52" fill="#1A1A1A" />
      <path d="M47 46 L55 70 L49 72 L43 52" fill="#1A1A1A" />
      {/* 手 */}
      <ellipse cx="13" cy="73" rx="4" ry="3" fill="#F5E6D3" />
      <ellipse cx="52" cy="73" rx="4" ry="3" fill="#F5E6D3" />
      {/* 足 */}
      <rect x="22" y="88" width="8" height="10" rx="2" fill="#1A1A1A" />
      <rect x="35" y="88" width="8" height="10" rx="2" fill="#1A1A1A" />
      {/* 靴 */}
      <ellipse cx="26" cy="98" rx="7" ry="2.5" fill="#0D0D0D" />
      <ellipse cx="39" cy="98" rx="7" ry="2.5" fill="#0D0D0D" />
    </svg>
  );
}

// ────────────────────────────────────────────────
// EsOjisanGreet — 挨拶ポーズ（帽子を取る）
// ────────────────────────────────────────────────
interface GreetProps {
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function EsOjisanGreet({ height = 250, className, style }: GreetProps) {
  const w = Math.round(height * 0.65);
  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 65 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0, display: 'inline-block', ...style }}
      aria-label="ƐSおじさん（グリーティング）"
    >
      {/* 帽子（持ち上げた状態 — 右上に傾く） */}
      <g transform="translate(42, 2) rotate(20)">
        <ellipse cx="0" cy="5" rx="14" ry="3.5" fill="#2D2D2D" />
        <rect x="-11" y="0" width="22" height="7" rx="2" fill="#1A1A1A" />
      </g>
      {/* 頭 */}
      <ellipse cx="32.5" cy="32" rx="14" ry="16" fill="#F5E6D3" />
      {/* カイゼル髭 */}
      <path d="M24 41 Q32.5 46 41 41" stroke="#5A3E28" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M24 41 Q20 43 18 41" stroke="#5A3E28" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M41 41 Q45 43 47 41" stroke="#5A3E28" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 目（細め＝笑顔） */}
      <path d="M25 30 Q27 28 29 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M36 30 Q38 28 40 30" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 眉 */}
      <path d="M24 26 Q27 24.5 30 26" stroke="#5A3E28" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M35 26 Q38 24.5 41 26" stroke="#5A3E28" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 体 */}
      <path d="M18 48 L32.5 58 L47 48 L50 90 L15 90 Z" fill="#1A1A1A" />
      <path d="M28 48 L32.5 58 L37 48 L35 90 L30 90 Z" fill="#F5F5F5" />
      <circle cx="32.5" cy="64" r="1.5" fill="#C9A84C" />
      <circle cx="32.5" cy="72" r="1.5" fill="#C9A84C" />
      <path d="M31 50 L32.5 57 L34 50 L32.5 48 Z" fill="#8B1A1A" />
      {/* 左腕（帽子を掲げる） */}
      <path d="M47 48 L56 28 L61 30 L52 52" fill="#1A1A1A" />
      <ellipse cx="58" cy="26" rx="4" ry="3" fill="#F5E6D3" />
      {/* 右腕（下げる） */}
      <path d="M18 48 L10 72 L16 74 L22 54" fill="#1A1A1A" />
      <ellipse cx="13" cy="75" rx="4" ry="3" fill="#F5E6D3" />
      {/* 足 */}
      <rect x="22" y="88" width="8" height="10" rx="2" fill="#1A1A1A" />
      <rect x="35" y="88" width="8" height="10" rx="2" fill="#1A1A1A" />
      <ellipse cx="26" cy="98" rx="7" ry="2.5" fill="#0D0D0D" />
      <ellipse cx="39" cy="98" rx="7" ry="2.5" fill="#0D0D0D" />
    </svg>
  );
}

// ────────────────────────────────────────────────
// Synapse — S.Y.N.A.P.S.E ロボット（シルエット）
// ────────────────────────────────────────────────
interface SynapseProps {
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Synapse({ height = 280, className, style }: SynapseProps) {
  const w = Math.round(height * 0.65);
  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 65 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0, display: 'inline-block', ...style }}
      aria-label="S.Y.N.A.P.S.E"
    >
      {/* アンテナ（少し曲がり） */}
      <line x1="32" y1="4" x2="30" y2="14" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="30" cy="3.5" r="2" fill="#F5C518" />
      {/* 頭部 */}
      <rect x="14" y="14" width="37" height="28" rx="6" fill="#2A2A2A" />
      <rect x="16" y="16" width="33" height="24" rx="4" fill="#1A1A1A" />
      {/* 左目（ゴールドLED） */}
      <circle cx="25" cy="28" r="5" fill="#111" />
      <circle cx="25" cy="28" r="3.5" fill="#F5C518" opacity="0.9" />
      <circle cx="25" cy="28" r="1.5" fill="#fff" opacity="0.6" />
      {/* 右目（アンバーLED） */}
      <circle cx="40" cy="28" r="5" fill="#111" />
      <circle cx="40" cy="28" r="3.5" fill="#E48E20" opacity="0.85" />
      <circle cx="40" cy="28" r="1.5" fill="#fff" opacity="0.5" />
      {/* 口（LED バー） */}
      <rect x="23" y="36" width="19" height="3" rx="1.5" fill="#333" />
      <rect x="23" y="36" width="8" height="3" rx="1.5" fill="#F5C518" opacity="0.7" />
      {/* 首 */}
      <rect x="27" y="42" width="11" height="6" rx="2" fill="#333" />
      {/* 胴体 */}
      <rect x="10" y="48" width="45" height="34" rx="5" fill="#2A2A2A" />
      <rect x="14" y="52" width="37" height="26" rx="3" fill="#1A1A1A" />
      {/* 胸パネル */}
      <rect x="18" y="56" width="29" height="14" rx="2" fill="#111" />
      <rect x="20" y="58" width="11" height="3" rx="1" fill="#F5C518" opacity="0.5" />
      <rect x="34" y="58" width="11" height="3" rx="1" fill="#E48E20" opacity="0.5" />
      <circle cx="24" cy="65" r="2.5" fill="#333" />
      <circle cx="32.5" cy="65" r="2.5" fill="#333" />
      <circle cx="41" cy="65" r="2.5" fill="#333" />
      {/* ƐS プレート */}
      <rect x="20" y="71" width="25" height="5" rx="1.5" fill="#222" />
      <text x="32.5" y="75.5" textAnchor="middle" fill="#C9A84C" fontSize="4" fontFamily="monospace">ƐS PRODUCT</text>
      {/* 腕 */}
      <rect x="0" y="49" width="11" height="26" rx="4" fill="#2A2A2A" />
      <rect x="2" y="51" width="7" height="22" rx="3" fill="#1A1A1A" />
      <ellipse cx="5.5" cy="77" rx="5" ry="4" fill="#2A2A2A" />
      <rect x="54" y="49" width="11" height="26" rx="4" fill="#2A2A2A" />
      <rect x="56" y="51" width="7" height="22" rx="3" fill="#1A1A1A" />
      <ellipse cx="59.5" cy="77" rx="5" ry="4" fill="#2A2A2A" />
      {/* 脚 */}
      <rect x="17" y="82" width="13" height="14" rx="3" fill="#2A2A2A" />
      <rect x="35" y="82" width="13" height="14" rx="3" fill="#2A2A2A" />
      {/* 足裏 */}
      <rect x="14" y="94" width="19" height="6" rx="3" fill="#1A1A1A" />
      <rect x="32" y="94" width="19" height="6" rx="3" fill="#1A1A1A" />
    </svg>
  );
}
