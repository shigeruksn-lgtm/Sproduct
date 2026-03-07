import { Gem, Users2, Wand2, Aperture, Leaf, ChevronRight } from 'lucide-react';

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
  Br: { title: '婚礼モード', icon: Gem },
  Gp: { title: '法人宴会モード', icon: Users2 },
  Dr: { title: '衣装モード', icon: DressIcon },
  Et: { title: '美容モード', icon: Wand2 },
  Ph: { title: '写真モード', icon: Aperture },
  Fl: { title: '装花モード', icon: Leaf },
};

export function SitemapTree() {
  return (
    <div className="bg-white p-16 rounded-2xl border border-neutral-200">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-12 text-center">
          <h2 className="text-sm uppercase tracking-widest text-neutral-400 mb-2">Site Structure</h2>
          <p className="text-xs text-neutral-500">実装済みページ：10ページ</p>
        </div>

        {/* トップページ */}
        <div className="mb-8">
          <div className="bg-white border-2 border-neutral-200 rounded-xl px-8 py-6 shadow-lg inline-block">
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
            <div className="text-xs text-neutral-400 mt-1">Official Top</div>
          </div>
        </div>

        {/* 接続線 */}
        <div className="h-8 w-0.5 bg-neutral-300 ml-12"></div>

        {/* プロダクトライン */}
        <div className="space-y-8">
          {productLines.map((product, idx) => (
            <div key={product.code} className="relative">
              {/* 横線 */}
              <div className="absolute left-12 top-8 w-8 h-0.5 bg-neutral-300"></div>
              
              <div className="ml-20">
                {/* プロダクト */}
                <div className="bg-white border-2 border-neutral-200 rounded-xl px-6 py-4 shadow-md inline-block mb-4">
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
                    {/* - {product.title} */}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">{product.modes.length} modes</div>
                </div>

                {/* 縦線 */}
                <div className="h-4 w-0.5 bg-neutral-300 ml-6"></div>

                {/* モード一覧 */}
                <div className="space-y-3 ml-6">
                  {product.modes.map((modeCode, modeIdx) => {
                    const mode = modeDetails[modeCode];
                    const Icon = mode.icon;
                    const isLast = modeIdx === product.modes.length - 1;

                    return (
                      <div key={modeCode} className="relative">
                        {/* 横線 */}
                        <div className="absolute left-0 top-5 w-8 h-0.5 bg-neutral-300"></div>
                        {/* 縦線（最後以外） */}
                        {!isLast && (
                          <div className="absolute left-0 top-5 w-0.5 h-12 bg-neutral-300"></div>
                        )}

                        <div className="ml-8">
                          <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-5 py-3 inline-flex items-center gap-3 hover:shadow-md transition-shadow">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: product.color }}
                            ></div>
                            <Icon className="w-4 h-4 text-neutral-700 stroke-[1.5]" />
                            <span className="font-semibold text-sm text-neutral-900">{modeCode}</span>
                            <span className="text-xs text-neutral-600">{mode.title}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* プロダクト間の縦線 */}
              {idx < productLines.length - 1 && (
                <div className="h-8 w-0.5 bg-neutral-300 ml-12 mt-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}