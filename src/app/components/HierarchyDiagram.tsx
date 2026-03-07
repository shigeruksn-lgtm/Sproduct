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

export function HierarchyDiagram() {
  return (
    <div className="bg-neutral-50 p-16 rounded-2xl">
      <div className="flex flex-col items-center">
        {/* ƐS Product - トップレベル */}
        <div className="mb-16">
          <div className="bg-white border-2 border-neutral-900 rounded-2xl px-12 py-8 shadow-lg">
            <div className="text-5xl tracking-tight font-semibold text-center">
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

        {/* 説明テキスト */}
        <div className="mb-12 text-center text-sm text-neutral-500">
          3つのプロダクトライン × 6つのモード = 18通りの組み合わせ
        </div>

        {/* マトリックス表示 */}
        <div className="bg-white rounded-xl border-2 border-neutral-200 overflow-hidden shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-100">
                <th className="px-6 py-4 text-left font-semibold text-neutral-400 text-xs uppercase tracking-wider">Product × Mode</th>
                {modes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <th key={mode.code} className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Icon className="w-5 h-5 text-neutral-900 stroke-[1.5]" />
                        <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">{mode.code}</span>
                        </div>
                        <span className="text-xs font-medium text-neutral-600">{mode.title}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {productLines.map((product, pIdx) => (
                <tr key={product.code} className={pIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                  <td className="px-6 py-4 border-t border-neutral-200">
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
                  </td>
                  {modes.map((mode) => (
                    <td key={mode.code} className="px-4 py-4 border-t border-neutral-200 text-center">
                      <div className="flex items-center justify-center">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center font-semibold text-sm hover:scale-110 transition-transform cursor-pointer shadow-sm"
                          style={{
                            background: `linear-gradient(135deg, ${product.color} 0%, #000000 100%)`,
                            color: 'white',
                          }}
                        >
                          {product.code}
                          <span className="text-xs ml-0.5">{mode.code}</span>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}