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

export function SitemapCards() {
  return (
    <div className="bg-neutral-50 p-16 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-12 text-center">
          <h2 className="text-sm uppercase tracking-widest text-neutral-400 mb-2">Site Structure</h2>
          <p className="text-xs text-neutral-500">カード型サイトマップ - 実装済み10ページ</p>
        </div>

        {/* トップページ */}
        <div className="mb-12 flex justify-center">
          <div className="bg-white border-2 border-neutral-200 rounded-2xl px-12 py-8 shadow-lg">
            <div className="text-4xl tracking-tight font-semibold">
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
            <div className="text-xs text-neutral-400 mt-2 text-center uppercase tracking-wider">Official Top</div>
          </div>
        </div>

        {/* プロダクトカード */}
        <div className="grid grid-cols-3 gap-8">
          {productLines.map((product) => (
            <div key={product.code} className="bg-white rounded-xl border-2 border-neutral-200 shadow-lg overflow-hidden">
              {/* プロダクトヘッダー */}
              <div className="bg-white border-b-2 border-neutral-200 px-6 py-5">
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
                <div className="text-xs text-neutral-400 mt-2">{product.modes.length} modes</div>
              </div>

              {/* モード一覧 */}
              <div className="p-4 space-y-2">
                {product.modes.map((modeCode) => {
                  const mode = modeDetails[modeCode];
                  const Icon = mode.icon;

                  return (
                    <div 
                      key={modeCode} 
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors border border-neutral-200"
                    >
                      <div 
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: product.color }}
                      ></div>
                      <Icon className="w-4 h-4 text-neutral-700 stroke-[1.5] flex-shrink-0" />
                      <div className="flex items-baseline gap-2 flex-1 min-w-0">
                        <span className="font-semibold text-sm text-neutral-900">{modeCode}</span>
                        <span className="text-xs text-neutral-600 truncate">{mode.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 統計 */}
        <div className="mt-12 flex justify-center gap-8 text-center">
          <div className="bg-white rounded-lg px-6 py-4 border border-neutral-200">
            <div className="text-2xl font-bold text-neutral-900">3</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Products</div>
          </div>
          <div className="bg-white rounded-lg px-6 py-4 border border-neutral-200">
            <div className="text-2xl font-bold text-neutral-900">9</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Mode Pages</div>
          </div>
          <div className="bg-white rounded-lg px-6 py-4 border border-neutral-200">
            <div className="text-2xl font-bold text-neutral-900">10</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Total Pages</div>
          </div>
        </div>
      </div>
    </div>
  );
}