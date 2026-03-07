// ƐS Product マスコットキャラクター
// 画像ベースのƐSおじさん + GridIconオーバーレイ + 表情バリエーション

import ojisanImg from 'figma:asset/989e0fee8923a855f2b5731323d19df81f5a0946.png';
import ojisanGreetImg from 'figma:asset/b2c60a87f846c8bd18e3c7f5a8048ee161102f4a.png';
import { GridIcon } from './GridIcon';

/** 表情・ポーズのバリエーション */
export type OjisanExpression =
  | 'normal'    // 通常
  | 'sorry'     // 謝罪（お辞儀）— エラーページ用
  | 'thinking'  // 考え中
  | 'happy'     // 嬉しい
  | 'confused'  // 困惑
  | 'sleeping';  // 居眠り

interface MascotProps {
  size?: number;
  className?: string;
  expression?: OjisanExpression;
}

/** 表情ごとの体のトランスフォーム */
const bodyTransforms: Record<OjisanExpression, React.CSSProperties> = {
  normal: {},
  sorry: {
    transform: 'rotate(15deg)',
    transformOrigin: 'bottom center',
  },
  thinking: {
    transform: 'rotate(-3deg)',
    transformOrigin: 'bottom center',
  },
  happy: {
    transform: 'scale(1.02)',
    transformOrigin: 'bottom center',
  },
  confused: {
    transform: 'rotate(-5deg)',
    transformOrigin: 'bottom center',
  },
  sleeping: {
    transform: 'rotate(5deg)',
    transformOrigin: 'bottom center',
  },
};

/** 表情エフェクトオーバーレイ */
const ExpressionOverlay = ({
  expression,
  size,
  h,
}: {
  expression: OjisanExpression;
  size: number;
  h: number;
}) => {
  const faceTop = h * 0.32; // 顔の位置
  const faceCenter = size * 0.5;
  const effectSize = Math.max(size * 0.08, 6);

  switch (expression) {
    case 'sorry':
      return (
        <>
          {/* 汗マーク（右上） */}
          <svg
            style={{
              position: 'absolute',
              top: faceTop - size * 0.12,
              right: -size * 0.08,
              width: effectSize * 2.5,
              height: effectSize * 3,
            }}
            viewBox="0 0 20 24"
            fill="none"
          >
            <path
              d="M10 2 C10 2, 16 10, 10 16 C4 10, 10 2, 10 2Z"
              fill="#7dd3fc"
              opacity="0.7"
            />
          </svg>
          {/* 汗マーク（左） */}
          <svg
            style={{
              position: 'absolute',
              top: faceTop + size * 0.05,
              left: -size * 0.04,
              width: effectSize * 1.8,
              height: effectSize * 2.2,
            }}
            viewBox="0 0 20 24"
            fill="none"
          >
            <path
              d="M10 2 C10 2, 16 10, 10 16 C4 10, 10 2, 10 2Z"
              fill="#7dd3fc"
              opacity="0.5"
            />
          </svg>
          {/* 目を閉じている線（×目） */}
          <svg
            style={{
              position: 'absolute',
              top: faceTop + size * 0.06,
              left: faceCenter - size * 0.18,
              width: size * 0.36,
              height: size * 0.12,
            }}
            viewBox="0 0 40 14"
            fill="none"
          >
            {/* 左目 — ＞＜ */}
            <line x1="6" y1="3" x2="12" y2="9" stroke="#4a3728" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="3" x2="6" y2="9" stroke="#4a3728" strokeWidth="2" strokeLinecap="round" />
            {/* 右目 — ＞＜ */}
            <line x1="28" y1="3" x2="34" y2="9" stroke="#4a3728" strokeWidth="2" strokeLinecap="round" />
            <line x1="34" y1="3" x2="28" y2="9" stroke="#4a3728" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </>
      );

    case 'thinking':
      return (
        <>
          {/* 吹き出し「…」 */}
          <div
            style={{
              position: 'absolute',
              top: faceTop - size * 0.22,
              right: -size * 0.35,
              background: '#f5f5f5',
              borderRadius: effectSize,
              padding: `${effectSize * 0.4}px ${effectSize * 0.8}px`,
              border: '1px solid #e5e5e5',
              fontSize: effectSize * 1.2,
              color: '#a3a3a3',
              letterSpacing: '0.15em',
              fontWeight: 500,
            }}
          >
            ・・・
          </div>
          {/* 吹き出しの三角 */}
          <div
            style={{
              position: 'absolute',
              top: faceTop - size * 0.06,
              right: size * 0.02,
              width: 0,
              height: 0,
              borderLeft: `${effectSize * 0.5}px solid transparent`,
              borderRight: `${effectSize * 0.5}px solid transparent`,
              borderTop: `${effectSize * 0.6}px solid #f5f5f5`,
            }}
          />
        </>
      );

    case 'happy':
      return (
        <>
          {/* キラキラ（左上） */}
          <svg
            style={{
              position: 'absolute',
              top: faceTop - size * 0.15,
              left: -size * 0.05,
              width: effectSize * 2,
              height: effectSize * 2,
            }}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="#F5C518" opacity="0.7" />
          </svg>
          {/* キラキラ（右上） */}
          <svg
            style={{
              position: 'absolute',
              top: faceTop - size * 0.2,
              right: -size * 0.08,
              width: effectSize * 1.5,
              height: effectSize * 1.5,
            }}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="#F5C518" opacity="0.5" />
          </svg>
          {/* キラキラ（右） */}
          <svg
            style={{
              position: 'absolute',
              top: faceTop + size * 0.05,
              right: -size * 0.15,
              width: effectSize * 1.2,
              height: effectSize * 1.2,
            }}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="#F5C518" opacity="0.4" />
          </svg>
        </>
      );

    case 'confused':
      return (
        <>
          {/* ？マーク */}
          <div
            style={{
              position: 'absolute',
              top: faceTop - size * 0.28,
              right: -size * 0.1,
              fontSize: effectSize * 2.5,
              color: '#d4d4d4',
              fontWeight: 700,
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            ?
          </div>
          {/* ぐるぐる線 */}
          <svg
            style={{
              position: 'absolute',
              top: faceTop - size * 0.05,
              right: -size * 0.15,
              width: effectSize * 2,
              height: effectSize * 2,
              opacity: 0.4,
            }}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 4C8 4 5 7 5 11C5 14 7 16 9 17"
              stroke="#a3a3a3"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </>
      );

    case 'sleeping':
      return (
        <>
          {/* ZZZ */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: faceTop - size * (0.25 - i * 0.08),
                right: -size * (0.05 + i * 0.1),
                fontSize: effectSize * (1.8 - i * 0.3),
                color: '#a3a3a3',
                opacity: 0.7 - i * 0.15,
                fontWeight: 600,
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Z
            </div>
          ))}
        </>
      );

    default:
      return null;
  }
};

/**
 * ƐSおじさん
 * トールハット・丸メガネ・カイゼル髭・ずんぐりシルエット
 * 帽子中央にƐSアイコン、胸にカラーバッジ
 * expression prop で表情・ポーズを切り替え
 */
export const EsOjisan = ({ size = 200, className, expression = 'normal' }: MascotProps) => {
  const w = size;
  const h = size * 2.5;

  // アイコンサイズはキャラサイズに比例
  const hatIconSize = Math.max(Math.round(size * 0.18), 10);
  const badgeIconSize = Math.max(Math.round(size * 0.08), 5);

  const bodyStyle = bodyTransforms[expression];

  return (
    <div className={className} style={{ position: 'relative', width: w, height: h }}>
      {/* 本体（トランスフォームでポーズ変更） */}
      <div
        style={{
          width: w,
          height: h,
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          ...bodyStyle,
        }}
      >
        <img
          src={ojisanImg}
          alt="ƐSおじさん"
          width={w}
          height={h}
          style={{ width: w, height: h, objectFit: 'contain', display: 'block' }}
        />
        {/* 帽子中央 — ƐSテキスト */}
        <div
          style={{
            position: 'absolute',
            top: `${h * 0.18}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: Math.max(Math.round(size * 0.14), 8),
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              lineHeight: 1,
            }}
          >
            ƐS
          </span>
        </div>
        {/* 胸（左胸） — カラーバッジ */}
        <div
          style={{
            position: 'absolute',
            top: `${h * 0.52}px`,
            left: `${w * 0.58}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <GridIcon size={badgeIconSize} pattern="B" />
        </div>
      </div>

      {/* 表情エフェクトオーバーレイ */}
      <ExpressionOverlay expression={expression} size={size} h={h} />
    </div>
  );
};

/**
 * ƐSおじさん ミニ — 小アイコン用（バッジなし）
 */
export const EsOjisanMini = ({ size = 40, className }: MascotProps) => {
  const w = size;
  const h = size * 2.5;

  return (
    <img
      src={ojisanImg}
      alt="ƐSおじさん"
      width={w}
      height={h}
      className={className}
      style={{ width: w, height: h, objectFit: 'contain' }}
    />
  );
};

/**
 * ƐSおじさん グリーティング — 帽子を傾けて挨拶するポーズ
 * 帽子中央にƐSテキスト、左胸にカラーバッジ付き
 * height prop で高さを直接指定（EsOjisan と揃えるため）
 */
export const EsOjisanGreet = ({ height = 250, className }: { height?: number; className?: string }) => {
  const badgeIconSize = Math.max(Math.round(height * 0.03), 4);
  const fontSize = Math.max(Math.round(height * 0.065), 8);

  return (
    <div className={className} style={{ position: 'relative', height, display: 'inline-block' }}>
      <img
        src={ojisanGreetImg}
        alt="ƐSおじさん（挨拶）"
        style={{ height: '100%', width: 'auto', objectFit: 'contain', display: 'block' }}
      />
      {/* 帽子中央下 — ƐSテキスト */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '21%',
          transform: 'rotate(-35deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize,
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            lineHeight: 1,
          }}
        >
          ƐS
        </span>
      </div>
      {/* 左胸 — カラーバッジ */}
      <div
        style={{
          position: 'absolute',
          top: '43%',
          left: '61%',
          transform: 'rotate(-30deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <GridIcon size={badgeIconSize} pattern="B" />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// S.Y.N.A.P.S.E — ƐSおじさんの相棒AIロボット
// Synthetic Yielding Neural Adaptive Processing System Engine
// 昭和レトロ玩具ロボ風。見た目は頼りないが中身はジャービスレベル。
// コーヒータイム大好き。ƐSおじさんの行動はだいたい読める。
// ─────────────────────────────────────────────────────────────────────────────

export type SynapseExpression = 'standby' | 'processing' | 'predict' | 'happy' | 'coffee';

interface SynapseProps {
  height?: number;
  className?: string;
  expression?: SynapseExpression;
}

/**
 * S.Y.N.A.P.S.E
 * viewBox 0 0 100 210 — overflow:visible でコーヒーマグが少しはみ出る設計
 */
export const Synapse = ({ height = 240, className, expression = 'standby' }: SynapseProps) => {
  const vw = 100;
  const vh = 210;
  const w = height * (vw / vh);

  const isPredicting = expression === 'predict';
  const isProcessing = expression === 'processing';
  const isHappy      = expression === 'happy';

  // 右目の内容（表情で切り替え）
  const rightEye = () => {
    if (isProcessing) return (
      <>
        <rect x="59" y="28" width="16" height="2.5" rx="1" fill="#4ADE80" opacity="0.9" />
        <rect x="59" y="32" width="11" height="2.5" rx="1" fill="#4ADE80" opacity="0.6" />
        <rect x="59" y="36" width="14" height="2.5" rx="1" fill="#4ADE80" opacity="0.4" />
        <rect x="59" y="40" width="8"  height="2.5" rx="1" fill="#4ADE80" opacity="0.2" />
      </>
    );
    if (isPredicting) return (
      <text x="68" y="40" textAnchor="middle" fontSize="14" fill="#F5C518"
        fontFamily="monospace" fontWeight="bold" filter="url(#sy-glow)">!</text>
    );
    // normal / happy — 右目は少しオレンジ寄り（非対称で個性）
    const r = isHappy ? 6.5 : 5.5;
    return (
      <>
        <circle cx="68" cy="35" r={r + 2} fill="#E48E20" opacity={isHappy ? 0.2 : 0.1} />
        <circle cx="68" cy="35" r={r}     fill="#E48E20" opacity={0.85} filter="url(#sy-glow)" />
        <circle cx="68" cy="35" r={r - 2} fill="#FFD070" />
        <circle cx="65.5" cy="32.5" r="1.4" fill="#fff" opacity="0.55" />
      </>
    );
  };

  // 左目（基本アンバー、happy時は明るく）
  const leftEyeR = isHappy ? 6.5 : 5.5;

  return (
    <svg
      width={w}
      height={height}
      viewBox={`0 0 ${vw} ${vh}`}
      style={{ display: 'block', overflow: 'visible' }}
      className={className}
    >
      <defs>
        <filter id="sy-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="sy-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#B4B9C4" />
          <stop offset="45%"  stopColor="#CDD2DC" />
          <stop offset="100%" stopColor="#ABAFC0" />
        </linearGradient>
        <linearGradient id="sy-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#D2D7E2" />
          <stop offset="100%" stopColor="#B4B9C4" />
        </linearGradient>
        <linearGradient id="sy-leg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#C2C7D2" />
          <stop offset="100%" stopColor="#A4A9B8" />
        </linearGradient>
      </defs>

      {/* ══════════════════════ ANTENNA ══════════════════════ */}
      {/* 少し斜めに曲がってる（頼りない感） */}
      <line x1="50" y1="16" x2="54" y2="4" stroke="#9EA4B0" strokeWidth="2" strokeLinecap="round" />
      {/* 関節ノブ */}
      <circle cx="52" cy="10" r="1.8" fill="#8E949F" />
      {/* 発光バルブ */}
      <circle cx="54" cy="3.5" r="5"   fill="#F5C518" opacity="0.2" filter="url(#sy-glow)" />
      <circle cx="54" cy="3.5" r="3.2" fill="#F5C518" opacity={isHappy ? 1 : 0.85} filter="url(#sy-glow)" />
      <circle cx="54" cy="3.5" r="1.8" fill="#FFFAD0" />

      {/* ══════════════════════ HEAD ══════════════════════ */}
      {/* メインヘッド */}
      <rect x="12" y="14" width="76" height="50" rx="7" fill="url(#sy-head)" stroke="#9EA4B0" strokeWidth="0.6" />
      {/* 額プレート（ネームプレート） */}
      <rect x="18" y="14" width="64" height="7" rx="3" fill="#8E949F" opacity="0.5" />
      <rect x="22" y="15.5" width="56" height="4" rx="1.5" fill="#0D1117" opacity="0.75" />
      <text x="50" y="19" textAnchor="middle" fontSize="3" fill="#F5C518"
        fontFamily="monospace" letterSpacing="0.9" fontWeight="bold">S.Y.N.A.P.S.E</text>
      {/* フェイスプレート */}
      <rect x="17" y="22" width="66" height="37" rx="4" fill="#ABAFC0" />

      {/* 左目ソケット */}
      <rect x="20" y="25" width="24" height="24" rx="3" fill="#0D1117" />
      {/* 左目 LEDグロー */}
      <circle cx="32" cy="37" r={leftEyeR + 2} fill="#F5C518" opacity={isHappy ? 0.2 : 0.1} />
      <circle cx="32" cy="37" r={leftEyeR}     fill="#F5C518" opacity={isHappy ? 1 : 0.88} filter="url(#sy-glow)" />
      <circle cx="32" cy="37" r={leftEyeR - 2} fill="#FFFAD0" />
      <circle cx="29.5" cy="34.5" r="1.4" fill="#fff" opacity="0.65" />

      {/* 右目ソケット */}
      <rect x="56" y="25" width="24" height="24" rx="3" fill="#0D1117" />
      {rightEye()}

      {/* 口（スピーカーグリル） */}
      <rect x="20" y="52" width="60" height="6" rx="2" fill="#7E838E" />
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <line key={i} x1={23 + i*6} y1="53.5" x2={23 + i*6} y2="56.5"
          stroke="#9EA0AC" strokeWidth="0.9" strokeLinecap="round" />
      ))}

      {/* 頭の四隅リベット */}
      <circle cx="16"  cy="18" r="2" fill="#8E949F" /><circle cx="84" cy="18" r="2" fill="#8E949F" />
      <circle cx="16"  cy="60" r="2" fill="#8E949F" /><circle cx="84" cy="60" r="2" fill="#8E949F" />

      {/* ══════════════════════ NECK ══════════════════════ */}
      <rect x="36" y="64" width="28" height="8" rx="3" fill="#9EA4B0" />
      {/* アコーディオンセグメント */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={39 + i*5.5} y="65.5" width="4" height="5" rx="1" fill="#B4B9C4" opacity="0.8" />
      ))}

      {/* ══════════════════════ BODY ══════════════════════ */}
      <rect x="10" y="72" width="80" height="74" rx="8" fill="url(#sy-body)" stroke="#9EA4B0" strokeWidth="0.6" />
      {/* ボディパネル */}
      <rect x="15" y="78" width="70" height="64" rx="5" fill="#B8BCC8" />

      {/* ─── チェストスクリーン ─── */}
      <rect x="18" y="82" width="46" height="36" rx="3" fill="#0D1117" stroke="#F5C518" strokeWidth="0.9" />
      {/* スクリーン内コンテンツ */}
      <text x="20" y="90" fontSize="3.5" fill="#4ADE80" fontFamily="monospace" fontWeight="bold" letterSpacing="0.3">SYNAPSE OS v2.1</text>
      <line x1="20" y1="92" x2="62" y2="92" stroke="#4ADE80" strokeWidth="0.4" opacity="0.4" />
      <text x="20" y="97"  fontSize="2.8" fill="#F5C518" fontFamily="monospace">PWR ████████ 99%</text>
      <text x="20" y="102" fontSize="2.8" fill="#F5C518" fontFamily="monospace">IQ  █████░░░ 72%</text>
      <text x="20" y="107" fontSize="2.8" fill="#4ADE80" fontFamily="monospace">☕  LOADED   ✓</text>
      <text x="20" y="113" fontSize="2.5" fill="#60A5FA" fontFamily="monospace" opacity="0.7">OJISAN SYNC: OK</text>

      {/* ─── 右パネル（ゲージ） ─── */}
      <rect x="67" y="82" width="16" height="36" rx="2" fill="#0D1117" />
      {/* ゲージ1 (Power) */}
      <circle cx="75" cy="91" r="5.5" fill="none" stroke="#333" strokeWidth="1.5" />
      <circle cx="75" cy="91" r="5.5" fill="none" stroke="#F5C518" strokeWidth="1.5"
        strokeDasharray="26 9" strokeLinecap="round" />
      <text x="75" y="93.5" textAnchor="middle" fontSize="3" fill="#F5C518" fontFamily="monospace">P</text>
      {/* ゲージ2 (Memory) */}
      <circle cx="75" cy="106" r="5.5" fill="none" stroke="#333" strokeWidth="1.5" />
      <circle cx="75" cy="106" r="5.5" fill="none" stroke="#E48E20" strokeWidth="1.5"
        strokeDasharray="21 14" strokeLinecap="round" />
      <text x="75" y="108.5" textAnchor="middle" fontSize="3" fill="#E48E20" fontFamily="monospace">M</text>

      {/* ─── ボタン列 ─── */}
      {/* 赤ボタン */}
      <circle cx="23" cy="125" r="4.5" fill="#B02020" />
      <circle cx="23" cy="125" r="3"   fill="#E74C3C" />
      <circle cx="21.5" cy="123.5" r="1" fill="#fff" opacity="0.4" />
      {/* 紺ボタン */}
      <circle cx="35" cy="125" r="4.5" fill="#1B2A5C" />
      <circle cx="35" cy="125" r="3"   fill="#2B3A8C" />
      <circle cx="33.5" cy="123.5" r="1" fill="#fff" opacity="0.3" />
      {/* トグルスイッチ */}
      <rect x="43" y="121.5" width="12" height="8" rx="3.5" fill="#7E838E" />
      <circle cx="52" cy="125.5" r="3.5" fill="#CDD2DC" />
      {/* 金ボタン */}
      <circle cx="62" cy="125" r="4.5" fill="#9A7808" />
      <circle cx="62" cy="125" r="3"   fill="#F5C518" />
      <circle cx="60.5" cy="123.5" r="1" fill="#fff" opacity="0.5" />
      {/* 銅ボタン */}
      <circle cx="74" cy="125" r="4.5" fill="#9A4010" />
      <circle cx="74" cy="125" r="3"   fill="#E48E20" />

      {/* ─── ƐSバッジ ─── */}
      <rect x="38" y="133" width="24" height="11" rx="3" fill="#1B2A5C" />
      <rect x="39" y="134" width="22" height="9"  rx="2" fill="#161F48" stroke="#F5C518" strokeWidth="0.5" />
      <text x="50" y="141.5" textAnchor="middle" fontSize="6.5" fill="#F5C518"
        fontFamily="DM Sans, sans-serif" fontWeight="bold">ƐS</text>

      {/* ショルダーパッド */}
      <rect x="10" y="72" width="14" height="10" rx="4" fill="#9298A8" />
      <rect x="76" y="72" width="14" height="10" rx="4" fill="#9298A8" />
      {/* ショルダーリベット */}
      <circle cx="14" cy="74" r="1.5" fill="#7E838E" />
      <circle cx="86" cy="74" r="1.5" fill="#7E838E" />

      {/* ══════════════════════ LEFT ARM ══════════════════════ */}
      {/* 上腕 */}
      <rect x="1" y="75" width="9" height="30" rx="4" fill="#BCC1CC" stroke="#9EA4B0" strokeWidth="0.5" />
      {/* 肘関節 */}
      <ellipse cx="5.5" cy="105" rx="5" ry="4" fill="#A4A9B8" stroke="#9EA4B0" strokeWidth="0.5" />
      {/* 前腕 */}
      <rect x="1" y="105" width="9" height="22" rx="4" fill="#C2C7D2" stroke="#9EA4B0" strokeWidth="0.5" />
      {/* 手 */}
      <rect x="0" y="127" width="11" height="9" rx="3" fill="#BCC1CC" stroke="#9EA4B0" strokeWidth="0.5" />
      {/* 手の指ライン */}
      <line x1="3.5" y1="128" x2="3.5" y2="135" stroke="#9EA4B0" strokeWidth="0.5" />
      <line x1="6"   y1="128" x2="6"   y2="135" stroke="#9EA4B0" strokeWidth="0.5" />
      <line x1="8.5" y1="128" x2="8.5" y2="135" stroke="#9EA4B0" strokeWidth="0.5" />

      {/* ══════════════════════ RIGHT ARM (コーヒー保持・少し上げ気味) ══════════════════════ */}
      {/* 上腕 */}
      <rect x="90" y="72" width="9" height="26" rx="4" fill="#BCC1CC" stroke="#9EA4B0" strokeWidth="0.5" />
      {/* 肘関節 */}
      <ellipse cx="94.5" cy="98" rx="5" ry="4" fill="#A4A9B8" stroke="#9EA4B0" strokeWidth="0.5" />
      {/* 前腕 */}
      <rect x="90" y="94" width="9" height="22" rx="4" fill="#C2C7D2" stroke="#9EA4B0" strokeWidth="0.5" />
      {/* 手 */}
      <rect x="89" y="116" width="11" height="9" rx="3" fill="#BCC1CC" stroke="#9EA4B0" strokeWidth="0.5" />

      {/* ══════════════════════ ☕ COFFEE MUG ══════════════════════ */}
      {/* 蒸気 */}
      <path d="M100,104 Q101.5,100 100,97" fill="none" stroke="#C8CDD8" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      <path d="M104,103 Q105.5,99 104,96" fill="none" stroke="#C8CDD8" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M108,104 Q109.5,100 108,97" fill="none" stroke="#C8CDD8" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
      {/* マグ本体 */}
      <rect x="94" y="105" width="18" height="14" rx="2.5" fill="#E8D5B0" stroke="#C4A870" strokeWidth="0.7" />
      {/* コーヒー液面 */}
      <rect x="95" y="105" width="16" height="5" rx="1.5" fill="#5C2E10" />
      {/* クレマ（泡ライン） */}
      <rect x="95" y="109" width="16" height="1" rx="0.5" fill="#8B4513" opacity="0.5" />
      {/* ハンドル */}
      <path d="M112,108 Q119,108 119,112.5 Q119,118 112,118"
        fill="none" stroke="#C4A870" strokeWidth="2.2" strokeLinecap="round" />
      {/* ソーサー */}
      <ellipse cx="103" cy="119.5" rx="11" ry="2.5" fill="#D4B890" opacity="0.8" />

      {/* ══════════════════════ HIPS / WAIST ══════════════════════ */}
      <rect x="20" y="146" width="60" height="11" rx="5" fill="#9298A8" stroke="#8E949F" strokeWidth="0.5" />
      <circle cx="28" cy="151.5" r="2.2" fill="#848990" />
      <circle cx="50" cy="151.5" r="2.2" fill="#848990" />
      <circle cx="72" cy="151.5" r="2.2" fill="#848990" />

      {/* ══════════════════════ LEGS ══════════════════════ */}
      {/* 左大腿 */}
      <rect x="21" y="157" width="22" height="24" rx="6" fill="url(#sy-leg)" stroke="#9EA4B0" strokeWidth="0.5" />
      {/* 左膝関節 */}
      <ellipse cx="32" cy="181" rx="9" ry="4" fill="#A4A9B8" stroke="#9EA4B0" strokeWidth="0.5" />
      {/* 左すね */}
      <rect x="23" y="181" width="18" height="18" rx="4" fill="#BCC1CC" stroke="#9EA4B0" strokeWidth="0.5" />
      {/* 左足 */}
      <rect x="16" y="198" width="28" height="10" rx="4" fill="#9298A8" />
      <rect x="16" y="198" width="10" height="10" rx="4" fill="#8290A8" opacity="0.5" />{/* つま先シャドウ */}

      {/* 右大腿 */}
      <rect x="57" y="157" width="22" height="24" rx="6" fill="url(#sy-leg)" stroke="#9EA4B0" strokeWidth="0.5" />
      {/* 右膝関節 */}
      <ellipse cx="68" cy="181" rx="9" ry="4" fill="#A4A9B8" stroke="#9EA4B0" strokeWidth="0.5" />
      {/* 右すね */}
      <rect x="59" y="181" width="18" height="18" rx="4" fill="#BCC1CC" stroke="#9EA4B0" strokeWidth="0.5" />
      {/* 右足 */}
      <rect x="56" y="198" width="28" height="10" rx="4" fill="#9298A8" />
      <rect x="74" y="198" width="10" height="10" rx="4" fill="#8290A8" opacity="0.5" />
    </svg>
  );
};