import { Gem, Users2, Wand2, Aperture, Leaf, ArrowRight } from 'lucide-react';

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

export function FlowDiagram() {
  return (
    <div className="bg-neutral-50 p-16 rounded-2xl overflow-x-auto">
      <div className="space-y-12 min-w-max">
        {/* ƐS Product 開始 */}
        <div className="flex items-center justify-center gap-8">
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

        {/* プロダクトとモードを横並び */}
        <div className="flex items-start gap-16 justify-center">
          {/* 左: プロダクトライン */}
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-6 text-center">Products</div>
            <div className="space-y-6">
              {productLines.map((product) => (
                <div key={product.code} className="bg-white border-2 border-neutral-200 rounded-xl px-8 py-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-3xl tracking-tight font-semibold">
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

          {/* 中央: 掛け算記号 */}
          <div className="flex items-center h-full pt-16">
            <div className="text-6xl text-neutral-300 font-light">×</div>
          </div>

          {/* 右: モード */}
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-6 text-center">Modes</div>
            <div className="space-y-4">
              {modes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <div key={mode.code} className="bg-white border border-neutral-200 rounded-lg px-6 py-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-neutral-900 stroke-[1.5]" />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">{mode.code}</span>
                        </div>
                        <span className="text-sm font-medium text-neutral-700">{mode.title}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}