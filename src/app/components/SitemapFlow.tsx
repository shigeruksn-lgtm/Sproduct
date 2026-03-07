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
  { code: 'ES', title: 'ES', color: '#dc2626', modes: ['Br', 'Gp', 'Dr', 'Et', 'Ph', 'Fl'] },
  { code: 'CS', title: 'CS', color: '#db2777', modes: ['Br', 'Gp'] },
  { code: 'PS', title: 'PS', color: '#7e22ce', modes: ['Br'] },
];

const modeDetails: { [key: string]: { title: string; icon: any } } = {
  Br: { title: '婚礼', icon: Gem },
  Gp: { title: '法人宴会', icon: Users2 },
  Dr: { title: '衣装', icon: DressIcon },
  Et: { title: '美容', icon: Wand2 },
  Ph: { title: '写真', icon: Aperture },
  Fl: { title: '装花', icon: Leaf },
};

export function SitemapFlow() {
  return (
    <div className="bg-white p-16 rounded-2xl border border-neutral-200 overflow-x-auto">
      <div className="min-w-max">
        {/* ���ッダー */}
        <div className="mb-12 text-center">
          <h2 className="text-sm uppercase tracking-widest text-neutral-400 mb-2">Site Navigation Flow</h2>
          <p className="text-xs text-neutral-500">フロー型サイトマップ - 実装済み10ページ</p>
        </div>

        {/* トップページ */}
        <div className="flex justify-center mb-8">
          <div className="bg-white border-2 border-neutral-200 rounded-xl px-10 py-6 shadow-lg">
            <div className="text-3xl tracking-tight font-semibold">
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
              <span className="text-neutral-900">S Product</span>
            </div>
          </div>
        </div>

        {/* 矢印 */}
        <div className="flex justify-center mb-8">
          <ArrowRight className="w-8 h-8 text-neutral-300" />
        </div>

        {/* プロダクトライン */}
        <div className="flex gap-12 justify-center mb-8">
          {productLines.map((product) => (
            <div key={product.code} className="bg-white border-2 border-neutral-200 rounded-xl px-6 py-4 shadow-md">
              <div className="text-2xl tracking-tight font-semibold">
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
              </div>
              {/* {product.title} */}
            </div>
          ))}
        </div>

        {/* 矢印 */}
        <div className="flex justify-center mb-8">
          <ArrowRight className="w-8 h-8 text-neutral-300" />
        </div>

        {/* モードページ（プロダクト別） */}
        <div className="flex gap-8 justify-center">
          {productLines.map((product) => (
            <div key={product.code} className="space-y-3">
              <div className="text-center mb-4">
                <div 
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: product.color }}
                ></div>
                <div className="text-xs text-neutral-500 mt-1">{product.code} Modes</div>
              </div>
              
              {product.modes.map((modeCode) => {
                const mode = modeDetails[modeCode];
                const Icon = mode.icon;

                return (
                  <div 
                    key={modeCode}
                    className="bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-3 flex items-center gap-3 hover:shadow-md transition-shadow"
                  >
                    <Icon className="w-4 h-4 text-neutral-700 stroke-[1.5]" />
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-sm text-neutral-900">{modeCode}</span>
                      <span className="text-xs text-neutral-600">{mode.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}