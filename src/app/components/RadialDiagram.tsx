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

export function RadialDiagram() {
  return (
    <div className="bg-neutral-50 p-16 rounded-2xl">
      <div className="relative flex items-center justify-center" style={{ minHeight: '600px' }}>
        {/* 左側: プロダクトライン（ES, CS, PS） */}
        <div className="absolute left-20 top-1/2 -translate-y-1/2 z-10">
          <div className="space-y-8">
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-6 text-center">Products</div>
            {productLines.map((product) => (
              <div key={product.code} className="bg-white border-2 border-neutral-300 rounded-xl px-8 py-5 shadow-lg hover:shadow-xl transition-shadow">
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
            ))}
          </div>
        </div>

        {/* 右側: モード（Br, Gp, Dr, Et, Ph, Fl） */}
        <div className="absolute right-20 top-1/2 -translate-y-1/2 z-10">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-6 text-center">Modes</div>
            {modes.map((mode) => {
              const Icon = mode.icon;
              return (
                <div key={mode.code} className="bg-white border border-neutral-200 rounded-lg px-6 py-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-neutral-900 stroke-[1.5]" />
                    <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">{mode.code}</span>
                    </div>
                    <span className="text-sm font-medium text-neutral-700 whitespace-nowrap">{mode.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 接続線（プロダクトからモードへ） */}
        <svg 
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          style={{ width: '100%', height: '100%' }}
        >
          {productLines.map((product, pIdx) => (
            modes.map((mode, mIdx) => {
              const productY = `calc(50% + ${(pIdx - 1) * 100}px)`;
              const modeY = `calc(50% + ${(mIdx - 2.5) * 72}px)`;
              return (
                <line
                  key={`${product.code}-${mode.code}`}
                  x1="30%"
                  y1={productY}
                  x2="70%"
                  y2={modeY}
                  stroke={product.color}
                  strokeWidth="1"
                  opacity="0.15"
                  strokeDasharray="2 2"
                />
              );
            })
          ))}
        </svg>

        {/* 説明テキスト */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm text-neutral-500">
          3 Products × 6 Modes = 18 Combinations
        </div>
      </div>
    </div>
  );
}