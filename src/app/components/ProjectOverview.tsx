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

const products = [
  {
    code: 'ES',
    title: 'ES',
    description: '基幹となる会社様',
    color: '#dc2626',
  },
  {
    code: 'CS',
    title: 'CS',
    description: '基幹会社と接点のあるお客様メイン',
    color: '#db2777',
  },
  {
    code: 'PS',
    title: 'PS',
    description: '基幹会社と提携している会社様メイン',
    color: '#7e22ce',
  },
];

const modes = [
  {
    code: 'Br',
    title: '婚礼',
    icon: Gem,
  },
  {
    code: 'Gp',
    title: '法人宴会',
    icon: Users2,
  },
  {
    code: 'Dr',
    title: '衣装管理',
    icon: DressIcon,
  },
  {
    code: 'Et',
    title: '美容',
    icon: Wand2,
  },
  {
    code: 'Ph',
    title: '写真',
    icon: Aperture,
  },
  {
    code: 'Fl',
    title: '装花',
    icon: Leaf,
  },
];

export function ProjectOverview() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <div className="max-w-6xl mx-auto">
        {/* プロジェクト名 */}
        <div className="mb-20">
          <div className="text-center mb-4">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-6">Project</h2>
          </div>
          <div className="bg-white border-2 border-neutral-200 rounded-2xl px-16 py-12 shadow-xl text-center">
            <div className="text-6xl tracking-tight font-semibold">
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

        {/* プロダクトライン */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Product Lines</h2>
            <p className="text-sm text-neutral-500">3つのプロダクトライン</p>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.code}
                className="bg-white border-2 border-neutral-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="px-8 py-10">
                  <div className="text-4xl tracking-tight font-semibold mb-4">
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
                  <div className="text-sm text-neutral-600 leading-relaxed">{product.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* モード */}
        <div>
          <div className="mb-8">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Modes</h2>
            <p className="text-sm text-neutral-500">6つのモード</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {modes.map((mode) => {
              const Icon = mode.icon;
              return (
                <div 
                  key={mode.code}
                  className="bg-white border-2 border-neutral-200 rounded-xl px-8 py-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-neutral-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">{mode.code}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-xl font-semibold text-neutral-900 mb-1">{mode.title}モード</div>
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <Icon className="w-4 h-4 stroke-[1.5]" />
                        <span>{mode.code} Mode</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* マトリックス構造説明 */}
        <div className="mt-20 bg-neutral-50 rounded-2xl p-12 border border-neutral-200">
          <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-6">Matrix Structure</h3>
          <div className="text-sm text-neutral-700 leading-relaxed space-y-3">
            <p>
              プロジェクト構造は<span className="font-semibold">「プロダクト × モード」のマトリックス構造</span>です。
            </p>
            <p className="text-lg font-semibold text-neutral-900">
              3つのプロダクトライン × 6つのモード = <span className="text-2xl text-neutral-900">18通り</span>の組み合わせ
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-neutral-200">
              {products.map((product) => (
                <div key={product.code} className="text-center">
                  <div className="text-lg font-semibold mb-2" style={{ color: product.color }}>
                    {product.code}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {modes.length} modes
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}