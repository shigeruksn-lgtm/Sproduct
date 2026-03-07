// グラデーションパターン定義
export type GradientPattern = 'B';

// プロダクトラインカラー定義
export type ProductLineColors = {
  gradient: string;
  color: string;
  light: string;
  // 3×3 ドットカラー（左上→右下の対角グラデーション）
  dots: string[][];
};

// Pattern B: 滑らかなグラデーション
const patternB = [
  ['#F5C518', '#EDAE1C', '#E48E20'],
  ['#E0962A', '#D06030', '#A83C42'],
  ['#7E3858', '#503A6E', '#3C2562'],
];

export const gradientPatterns: Record<GradientPattern, {
  dots: string[][];
  textGradient: string;
  label: string;
  description: string;
  productLines: Record<string, ProductLineColors>;
}> = {
  B: {
    dots: patternB,
    textGradient: 'linear-gradient(135deg, #F5C518 0%, #E48E20 25%, #D06030 45%, #A83C42 60%, #503A6E 80%, #3C2562 100%)',
    label: 'Pattern B',
    description: '滑らかなグラデーション — 中間色を丁寧に補間',
    productLines: {
      ES: {
        gradient: 'linear-gradient(135deg, #F5C518 0%, #EDAE1C 50%, #E0962A 100%)',
        color: '#EDAE1C',
        light: '#FFFBEB',
        dots: [
          ['#FEF3C7', '#FDE68A', '#FCD34D'],
          ['#FBBF24', '#F5C518', '#EDAE1C'],
          ['#E0962A', '#D4891E', '#C87B14'],
        ],
      },
      CS: {
        gradient: 'linear-gradient(135deg, #E48E20 0%, #D06030 50%, #A83C42 100%)',
        color: '#D06030',
        light: '#FFF5F0',
        dots: [
          ['#FDBA74', '#F97316', '#EA580C'],
          ['#E48E20', '#D06030', '#C2533A'],
          ['#B84530', '#A83C42', '#92303C'],
        ],
      },
      PS: {
        gradient: 'linear-gradient(135deg, #7E3858 0%, #503A6E 50%, #3C2562 100%)',
        color: '#503A6E',
        light: '#F3F0FF',
        dots: [
          ['#C4B5FD', '#A78BFA', '#8B5CF6'],
          ['#7E3858', '#6D3A63', '#503A6E'],
          ['#3B3470', '#2B2F64', '#3C2562'],
        ],
      },
    },
  },
};

// HEXカラーから補色を計算するヘルパー
function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function getComplementary(hex: string): string {
  const [h, s, l] = hexToHsl(hex);
  return hslToHex((h + 180) % 360, s, l);
}

// 同じ色相でトーンを落とした背景色（彩度を下げ、明度を上げる）
function getMutedBg(hex: string): string {
  const [h, s] = hexToHsl(hex);
  return hslToHex(h, Math.min(s * 0.35, 30), 92);
}

// メインブランドアイコン — ƐS全体のグラデーション
export const GridIcon = ({
  className,
  size = 48,
  pattern = 'B',
}: {
  className?: string;
  size?: number;
  pattern?: GradientPattern;
}) => {
  const colors = gradientPatterns[pattern].dots;

  const padding = size * 0.12;
  const innerSize = size - padding * 2;
  const step = innerSize / 2;
  const r = size * 0.095;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
    >
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={padding + col * step}
            cy={padding + row * step}
            r={r}
            fill={colors[row][col]}
          />
        ))
      )}
    </svg>
  );
};

// プロダクトラインアイコン — ES / CS / PS 固有のカラースキーム
export const ProductLineIcon = ({
  lineId,
  className,
  size = 48,
  pattern = 'B',
}: {
  lineId: string;
  className?: string;
  size?: number;
  pattern?: GradientPattern;
}) => {
  const plColors = gradientPatterns[pattern].productLines[lineId];
  if (!plColors) return null;

  const colors = plColors.dots;
  const padding = size * 0.12;
  const innerSize = size - padding * 2;
  const step = innerSize / 2;
  const r = size * 0.095;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
    >
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={padding + col * step}
            cy={padding + row * step}
            r={r}
            fill={colors[row][col]}
          />
        ))
      )}
    </svg>
  );
};

// Adobe風プロダクトラインアイコン — 角丸四角 + テキスト
export const ProductLineBadge = ({
  lineId,
  className,
  size = 48,
  pattern = 'B',
  variant = 'filled',
}: {
  lineId: string;
  className?: string;
  size?: number;
  pattern?: GradientPattern;
  variant?: 'filled' | 'outline' | 'dark' | 'solid' | 'complement';
}) => {
  const plColors = gradientPatterns[pattern].productLines[lineId];
  if (!plColors) return null;

  const gradientId = `plbadge-${lineId}-${pattern}-${variant}`;
  const borderRadius = size * 0.18;
  const fontSize = size * 0.38;
  const borderWidth = size * 0.06;

  // テキストラベル（ES の E と S を取り出す）
  const label = lineId; // "ES", "CS", "PS"

  // カラー停止点をグラデーションから抽出
  const dots = plColors.dots;
  const startColor = dots[0][0];
  const midColor = dots[1][1];
  const endColor = dots[2][2];

  // 補色バリアント用：指定色の補色を背景に使用
  const mainColor = plColors.color;
  const compBg = getComplementary(mainColor);
  const compGradientId = `plbadge-comp-${lineId}-${pattern}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={startColor} />
          <stop offset="50%" stopColor={midColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
        {variant === 'complement' && (
          <linearGradient id={compGradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={getMutedBg(startColor)} />
            <stop offset="50%" stopColor={getMutedBg(midColor)} />
            <stop offset="100%" stopColor={getMutedBg(endColor)} />
          </linearGradient>
        )}
      </defs>

      {variant === 'filled' ? (
        <>
          {/* 塗りつぶし背景 */}
          <rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={size - borderWidth}
            height={size - borderWidth}
            rx={borderRadius}
            ry={borderRadius}
            fill={`url(#${gradientId})`}
            opacity={0.12}
          />
          {/* ボーダー */}
          <rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={size - borderWidth}
            height={size - borderWidth}
            rx={borderRadius}
            ry={borderRadius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={borderWidth}
          />
          {/* テキスト */}
          <text
            x={size / 2}
            y={size / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fill={midColor}
            fontSize={fontSize}
            fontFamily="DM Sans, sans-serif"
            fontWeight={700}
            letterSpacing={-size * 0.01}
          >
            {label}
          </text>
        </>
      ) : variant === 'dark' ? (
        <>
          {/* ダーク背景 */}
          <rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={size - borderWidth}
            height={size - borderWidth}
            rx={borderRadius}
            ry={borderRadius}
            fill="#1a1a1a"
          />
          {/* グラデーションボーダー */}
          <rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={size - borderWidth}
            height={size - borderWidth}
            rx={borderRadius}
            ry={borderRadius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={borderWidth}
          />
          {/* テキスト */}
          <text
            x={size / 2}
            y={size / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fill={`url(#${gradientId})`}
            fontSize={fontSize}
            fontFamily="DM Sans, sans-serif"
            fontWeight={700}
            letterSpacing={-size * 0.01}
          >
            {label}
          </text>
        </>
      ) : variant === 'solid' ? (
        <>
          {/* グラデーション背景 */}
          <rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={size - borderWidth}
            height={size - borderWidth}
            rx={borderRadius}
            ry={borderRadius}
            fill={`url(#${gradientId})`}
          />
          {/* テキスト */}
          <text
            x={size / 2}
            y={size / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#fff"
            fontSize={fontSize}
            fontFamily="DM Sans, sans-serif"
            fontWeight={700}
            letterSpacing={-size * 0.01}
          >
            {label}
          </text>
        </>
      ) : variant === 'complement' ? (
        <>
          {/* 補色グラデーション背景 */}
          <rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={size - borderWidth}
            height={size - borderWidth}
            rx={borderRadius}
            ry={borderRadius}
            fill={`url(#${compGradientId})`}
          />
          {/* 指定色グラデーションテキスト */}
          <text
            x={size / 2}
            y={size / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fill={`url(#${gradientId})`}
            fontSize={fontSize}
            fontFamily="DM Sans, sans-serif"
            fontWeight={700}
            letterSpacing={-size * 0.01}
          >
            {label}
          </text>
        </>
      ) : (
        <>
          {/* アウトラインのみ */}
          <rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={size - borderWidth}
            height={size - borderWidth}
            rx={borderRadius}
            ry={borderRadius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={borderWidth}
          />
          {/* テキスト */}
          <text
            x={size / 2}
            y={size / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fill={`url(#${gradientId})`}
            fontSize={fontSize}
            fontFamily="DM Sans, sans-serif"
            fontWeight={700}
            letterSpacing={-size * 0.01}
          >
            {label}
          </text>
        </>
      )}
    </svg>
  );
};