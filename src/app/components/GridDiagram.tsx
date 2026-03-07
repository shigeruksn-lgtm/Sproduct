import { Gem, Users2, Wand2, Aperture, Leaf } from 'lucide-react';

// カスタムドレスアイコン
const DressIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 3L6 8L4 21H20L18 8L16 3" />
    <path d="M12 3V8" />
    <path d="M8 3H16" />
    <circle cx="12" cy="5" r="1.5" />
  </svg>
);

const productLines = [
  { code: 'ES', title: 'ES', color: '#dc2626' },
  { code: 'CS', title: 'CS', color: '#db2777' },
  { code: 'PS', title: 'PS', color: '#7e22ce' },
];

const modes = [
  { code: 'Br', title: '婚礼モード', icon: Gem },
  { code: 'Gp', title: '法人宴会モード', icon: Users2 },
  { code: 'Dr', title: '衣装モード', icon: DressIcon },
  { code: 'Et', title: '美容モード', icon: Wand2 },
  { code: 'Ph', title: '写真モード', icon: Aperture },
  { code: 'Fl', title: '装花モード', icon: Leaf },
];

export function GridDiagram() {
  return (
    <div className="bg-neutral-50 p-16 rounded-2xl">
      <div className="space-y-12">
        {/* ƐS Product - トップ */}
        <div className="flex justify-center">
          <div className="bg-white border-2 border-neutral-900 rounded-2xl px-12 py-8 shadow-lg">
            <div className="text-5xl tracking-tight font-semibold">
              <span 
                style={{
                  background: 'linear-gradient(180deg, #dc2626 0%, #db2777 50%, #7e22ce 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Ɛ
              </span>
              S Product
            </div>
          </div>
        </div>

        {/* グリッド: 縦軸がプロダクト、横軸がモード */}
        <div className="flex gap-12 justify-center">
          {/* 縦軸ラベル領域 */}
          <div className="flex flex-col justify-center">
            <div className="h-20"></div> {/* ヘッダー分の空白 */}
            {productLines.map((product) => (
              <div key={product.code} className="h-28 flex items-center">
                <div className="bg-white border-2 border-neutral-200 rounded-xl px-6 py-4 shadow-md">
                  <div className="text-2xl tracking-tight font-semibold whitespace-nowrap">
                    <span 
                      style={{
                        background: `linear-gradient(180deg, ${product.color} 0%, #000000 100%)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {product.code}
                    </span>
                    {/* - {product.title} */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* グリッド本体 */}
          <div>
            {/* 横軸: モード */}
            <div className="flex gap-4 mb-4">
              {modes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <div key={mode.code} className="w-24 flex flex-col items-center gap-2">
                    <Icon className="w-5 h-5 text-neutral-900 stroke-[1.5]" />
                    <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">{mode.code}</span>
                    </div>
                    <span className="text-xs font-medium text-neutral-700 text-center">{mode.title}</span>
                  </div>
                );
              })}
            </div>

            {/* グリッドセル */}
            <div className="space-y-4">
              {productLines.map((product) => (
                <div key={product.code} className="flex gap-4">
                  {modes.map((mode) => (
                    <div key={mode.code} className="w-24 h-24 flex items-center justify-center">
                      <div 
                        className="w-20 h-20 rounded-xl flex flex-col items-center justify-center font-semibold text-white hover:scale-110 transition-transform cursor-pointer shadow-lg group relative"
                        style={{
                          background: `linear-gradient(135deg, ${product.color} 0%, #000000 100%)`,
                        }}
                      >
                        <div className="text-lg">{product.code}</div>
                        <div className="text-xs opacity-75">{mode.code}</div>
                        
                        {/* ホバー時の詳細 */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="bg-neutral-900 text-white px-3 py-2 rounded text-xs whitespace-nowrap shadow-xl">
                            {product.title} × {mode.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 説明 */}
        <div className="text-center text-sm text-neutral-500">
          3つのプロダクトライン × 6つのモード = 18通りの組み合わせ
        </div>
      </div>
    </div>
  );
}