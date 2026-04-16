import React from "react";

// ─────────────────────────────────────────────────────────────
// モード設定
// ─────────────────────────────────────────────────────────────
export const MODE_GLASS_CONFIG: Record<
  string,
  {
    code: string;
    label: string;
    sublabel: string;
    /** ガラスのアクセントカラー（RGB文字列） */
    rgb: string;
    /** 明るい（ライトテーマ用）テキストカラー */
    textDark: string;
    /** グロー用カラー（16進） */
    color: string;
    colorB: string;
  }
> = {
  Br: {
    code: "Br",
    label: "婚礼",
    sublabel: "Bridal",
    rgb: "224,85,128",
    textDark: "#b52f64",
    color: "#E05580",
    colorB: "#F472B6",
  },
  Gp: {
    code: "Gp",
    label: "法人宴会",
    sublabel: "Group Party",
    rgb: "99,102,241",
    textDark: "#4338CA",
    color: "#818CF8",
    colorB: "#A5B4FC",
  },
  Dr: {
    code: "Dr",
    label: "衣装",
    sublabel: "Dress",
    rgb: "212,115,26",
    textDark: "#b85c10",
    color: "#FB923C",
    colorB: "#FCD34D",
  },
  Et: {
    code: "Et",
    label: "美容",
    sublabel: "Esthetic",
    rgb: "16,185,129",
    textDark: "#047857",
    color: "#34D399",
    colorB: "#6EE7B7",
  },
  Ph: {
    code: "Ph",
    label: "写真",
    sublabel: "Photo",
    rgb: "59,130,246",
    textDark: "#1D4ED8",
    color: "#60A5FA",
    colorB: "#93C5FD",
  },
  Fl: {
    code: "Fl",
    label: "装花",
    sublabel: "Flower",
    rgb: "245,158,11",
    textDark: "#b45309",
    color: "#FBBF24",
    colorB: "#FDE68A",
  },
};

// ─────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────
export interface ModeIconGlassProps {
  code: string;
  size?: number;
  /** "dark"    = ダーク背景向け（白テキスト・白グラスパネル）
   *  "light"   = ライト背景向け（カラーテキスト・カラーティント）
   *  "colored" = モード固有カラーをそのまま背景に使用 */
  theme?: "dark" | "light" | "colored";
  /** "icon"   = 正方形（ショーケース・カード見出し）
   *  "badge"  = 横長カプセル（インライン・テーブルヘッダー）
   *  "circle" = 正円 */
  variant?: "icon" | "badge" | "circle";
  className?: string;
}

// ─────────────────────────────────────────────────────────────
// ModeIconGlass — コアコンポーネント
// ─────────────────────────────────────────────────────────────
export function ModeIconGlass({
  code,
  size = 80,
  theme = "dark",
  variant = "icon",
  className,
}: ModeIconGlassProps) {
  const cfg = MODE_GLASS_CONFIG[code] ?? {
    rgb: "120,120,120",
    textDark: "#555",
    color: "#aaa",
    colorB: "#ccc",
  };

  const isDark = theme === "dark";
  const isBadge = variant === "badge";
  const isCircle = variant === "circle";
  const isColored = theme === "colored";

  // ── サイズ計算 ──────────────────────────────────────────────
  const h = isBadge ? Math.round(size * 0.64) : size;
  const w = isBadge ? "auto" : size;
  const px = isBadge ? Math.round(size * 0.38) : undefined;
  const borderRadius = isBadge
    ? Math.round(h / 2)
    : isCircle
    ? size / 2
    : Math.round(size * 0.22);
  const fontSize = isBadge
    ? Math.round(size * 0.27)
    : Math.round(size * 0.26);

  // ── テーマ別スタイル ─────────────────────────────────────────
  const bg = isColored
    ? `radial-gradient(ellipse at 30% 30%, ${cfg.colorB} 0%, ${cfg.color} 45%, ${cfg.textDark} 100%)`
    : isDark
    ? `rgba(255,255,255,0.11)`
    : `rgba(${cfg.rgb},0.09)`;

  const border = isColored
    ? `1px solid rgba(255,255,255,0.28)`
    : isDark
    ? `1px solid rgba(255,255,255,0.26)`
    : `1px solid rgba(${cfg.rgb},0.28)`;

  const textColor = isColored
    ? "rgba(255,255,255,0.95)"
    : isDark
    ? "rgba(255,255,255,0.90)"
    : cfg.textDark;

  const boxShadow = isColored
    ? [
        `0 0 ${size * 0.5}px rgba(${cfg.rgb},0.45)`,
        `0 ${size * 0.05}px ${size * 0.25}px rgba(${cfg.rgb},0.35)`,
        `inset 0 1px 0 rgba(255,255,255,0.40)`,
        `inset 0 -1px 0 rgba(0,0,0,0.15)`,
      ].join(", ")
    : isDark
    ? [
        `0 0 ${size * 0.45}px rgba(${cfg.rgb},0.30)`,
        `0 ${size * 0.05}px ${size * 0.22}px rgba(0,0,0,0.38)`,
        `inset 0 1px 0 rgba(255,255,255,0.30)`,
        `inset 0 -1px 0 rgba(255,255,255,0.05)`,
      ].join(", ")
    : [
        `0 1px ${Math.round(size * 0.15)}px rgba(${cfg.rgb},0.18)`,
        `inset 0 1px 0 rgba(255,255,255,0.72)`,
        `inset 0 -1px 0 rgba(${cfg.rgb},0.06)`,
      ].join(", ");

  const backdropFilter = isDark
    ? "blur(18px) saturate(180%)"
    : isColored
    ? "blur(0px)"
    : "blur(12px) saturate(160%)";

  const textShadow = (isDark || isColored)
    ? `0 1px 8px rgba(0,0,0,0.45), 0 0 ${size * 0.15}px ${cfg.colorB}70`
    : undefined;

  // ── ハイライトグラデーション ─────────────────────────────────
  const highlightGrad = isColored
    ? `linear-gradient(145deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.08) 40%, transparent 65%)`
    : isDark
    ? `linear-gradient(160deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.06) 45%, transparent 70%)`
    : `linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 45%, transparent 70%)`;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: w,
        height: h,
        paddingLeft: px,
        paddingRight: px,
        borderRadius,
        background: bg,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        border,
        boxShadow,
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* 上部ハイライト（光の反射） */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius,
          background: highlightGrad,
          pointerEvents: "none",
        }}
      />

      {/* 底面カラーグロー（ダーク・coloredのみ）*/}
      {(isDark || isColored) && !isBadge && (
        <div
          style={{
            position: "absolute",
            bottom: `-${size * 0.08}px`,
            left: "10%",
            right: "10%",
            height: size * 0.5,
            borderRadius: "50%",
            background: `radial-gradient(ellipse at center, ${cfg.color}50 0%, transparent 70%)`,
            filter: `blur(${size * 0.1}px)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* テキスト */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          fontSize,
          fontWeight: 600,
          fontFamily: "DM Sans, sans-serif",
          letterSpacing: "0.05em",
          color: textColor,
          lineHeight: 1,
          userSelect: "none",
          textShadow,
        }}
      >
        {code}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ModeIconGlassCard — ショーケース用カード（ダーク背景想定）
// ─────────────────────────────────────────────────────────────
export function ModeIconGlassCard({
  code,
  iconSize = 88,
}: {
  code: string;
  iconSize?: number;
}) {
  const cfg = MODE_GLASS_CONFIG[code];
  if (!cfg) return null;

  return (
    <div className="group flex flex-col items-center gap-5 cursor-default select-none">
      <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2">
        <ModeIconGlass code={code} size={iconSize} theme="dark" variant="icon" />
      </div>
      <div className="text-center space-y-1">
        <p
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "rgba(255,255,255,0.82)",
            fontFamily: "DM Sans, sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          {cfg.label}
        </p>
        <p
          style={{
            fontSize: 11,
            fontWeight: 400,
            color: "rgba(255,255,255,0.36)",
            fontFamily: "DM Sans, sans-serif",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {cfg.sublabel}
        </p>
      </div>
    </div>
  );
}