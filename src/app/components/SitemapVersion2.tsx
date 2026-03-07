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

const modes = [
  {
    code: 'Br',
    title: '婚礼',
    icon: Gem,
    products: [
      { code: 'ES', color: '#dc2626', role: 'メイン' },
      { code: 'CS', color: '#db2777', role: 'サブ' },
      { code: 'PS', color: '#7e22ce', role: 'サブ' },
    ]
  },
  {
    code: 'Gp',
    title: '法人宴会',
    icon: Users2,
    products: [
      { code: 'ES', color: '#dc2626', role: 'メイン' },
      { code: 'CS', color: '#db2777', role: 'サブ' },
      { code: 'PS', color: '#7e22ce', role: 'サブ' },
    ]
  },
  {
    code: 'Dr',
    title: '衣装',
    icon: DressIcon,
    products: [
      { code: 'ES', color: '#dc2626', role: 'メイン' },
      { code: 'CS', color: '#db2777', role: 'サブ' },
    ]
  },
  {
    code: 'Et',
    title: '美容',
    icon: Wand2,
    products: [
      { code: 'ES', color: '#dc2626', role: 'メイン' },
    ]
  },
  {
    code: 'Ph',
    title: '写真',
    icon: Aperture,
    products: [
      { code: 'ES', color: '#dc2626', role: 'メイン' },
    ]
  },
  {
    code: 'Fl',
    title: '装花',
    icon: Leaf,
    products: [
      { code: 'ES', color: '#dc2626', role: 'メイン' },
    ]
  },
];

export function SitemapVersion2() {
  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto">
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
            <div className="text-xs text-neutral-400 mt-2 text-center uppercase tracking-wider">MODE構成</div>
          </div>
        </div>

        {/* 接続線 */}
        <div className="flex justify-center mb-8">
          <div className="w-0.5 h-12 bg-neutral-200"></div>
        </div>

        {/* モード一覧 */}
        <div className="space-y-6">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <div key={mode.code} className="flex items-start gap-6">
                {/* モードカード */}
                <div className="w-80 bg-white border-2 border-neutral-200 rounded-xl shadow-md">
                  <div className="px-6 py-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">{mode.code}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-semibold text-neutral-900">{mode.title}</div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                        <Icon className="w-3.5 h-3.5 stroke-[1.5]" />
                        <span>{mode.code} Mode</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 接続線 */}
                <div className="flex items-center pt-8">
                  <div className="w-8 h-0.5 bg-neutral-200"></div>
                </div>

                {/* プロダクトラインタグ */}
                <div className="flex-1 pt-5">
                  <div className="flex flex-wrap gap-3">
                    {mode.products.map((product) => (
                      <div
                        key={product.code}
                        className="bg-white border-2 border-neutral-200 rounded-lg px-5 py-3 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="text-xl font-semibold tracking-tight"
                            style={{
                              background: `linear-gradient(180deg, ${product.color} 0%, #000000 100%)`,
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              color: 'transparent',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            {product.code}
                          </div>
                          <div className="text-xs text-neutral-500 border-l border-neutral-200 pl-3">
                            {product.role}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}