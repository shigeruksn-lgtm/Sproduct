import { Home, Info, Sparkles, Target, Wrench, FileText, TrendingUp, ListChecks, HelpCircle, Newspaper, Download, Mail, Building2, FileCheck } from 'lucide-react';

const pageStructure = [
  { 
    id: 1, 
    title: 'HOME', 
    icon: Home,
    description: 'トップページ',
    hasInAllModes: true
  },
  { 
    id: 2, 
    title: 'ESシステム（xxMODE）とは', 
    icon: Info,
    description: 'コンセプト・概要',
    hasInAllModes: true
  },
  { 
    id: 3, 
    title: '特徴', 
    icon: Sparkles,
    description: 'お困り内容別と登場人物（役職）別の2つの切り口でコンテンツを作成します',
    hasInAllModes: true,
    isSpecial: true
  },
  { 
    id: 4, 
    title: '範囲', 
    icon: Target,
    description: 'サービス提供範囲',
    hasInAllModes: true
  },
  { 
    id: 5, 
    title: '機能', 
    icon: Wrench,
    description: '主要機能一覧',
    hasInAllModes: true
  },
  { 
    id: 6, 
    title: 'CS詳細', 
    icon: FileText,
    description: 'CSプロダクトラインの詳細',
    hasInAllModes: false,
    condition: 'CSがある場合のみ'
  },
  { 
    id: 7, 
    title: 'PS詳細', 
    icon: FileText,
    description: 'PSプロダクトラインの詳細',
    hasInAllModes: false,
    condition: 'PSがある場合のみ'
  },
  { 
    id: 8, 
    title: '導入事例', 
    icon: TrendingUp,
    description: '他社事例',
    hasInAllModes: true
  },
  { 
    id: 9, 
    title: '導入までの流れ', 
    icon: ListChecks,
    description: '導入プロセス',
    hasInAllModes: true
  },
  { 
    id: 10, 
    title: 'よくある質問', 
    icon: HelpCircle,
    description: 'FAQ',
    hasInAllModes: true
  },
  { 
    id: 11, 
    title: 'NEWS', 
    icon: Newspaper,
    description: 'HOMEにも一部表示',
    hasInAllModes: true,
    isSpecial: true
  },
  { 
    id: 12, 
    title: '資料ダウンロード', 
    icon: Download,
    description: 'サービス資料',
    hasInAllModes: true
  },
  { 
    id: 13, 
    title: '問い合わせフォーム', 
    icon: Mail,
    description: 'お問い合わせ',
    hasInAllModes: true
  },
  { 
    id: 14, 
    title: '会社情報', 
    icon: Building2,
    description: '企業情報',
    hasInAllModes: true
  },
  { 
    id: 15, 
    title: '会社概要', 
    icon: FileCheck,
    description: '企業概要',
    hasInAllModes: true
  },
];

export function PageStructure() {
  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-neutral-900 mb-3">ページ構成</h2>
          <p className="text-neutral-600">各MODEごとの基本的なサイト構成</p>
        </div>

        {/* ページ構成リスト */}
        <div className="space-y-3">
          {pageStructure.map((page) => {
            const Icon = page.icon;
            return (
              <div 
                key={page.id}
                className={`bg-white border-2 rounded-xl shadow-sm transition-all hover:shadow-md ${
                  page.hasInAllModes 
                    ? 'border-neutral-200' 
                    : 'border-dashed border-neutral-300'
                }`}
              >
                <div className="px-6 py-5 flex items-center gap-5">
                  {/* 番号 */}
                  <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">{page.id}</span>
                  </div>

                  {/* アイコン */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    page.isSpecial 
                      ? 'bg-gradient-to-br from-red-500 to-purple-600' 
                      : 'bg-neutral-100'
                  }`}>
                    <Icon className={`w-6 h-6 stroke-[1.5] ${
                      page.isSpecial ? 'text-white' : 'text-neutral-700'
                    }`} />
                  </div>

                  {/* タイトルと説明 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-neutral-900">{page.title}</h3>
                      {!page.hasInAllModes && (
                        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full border border-blue-200">
                          条件付き
                        </span>
                      )}
                      {page.isSpecial && (
                        <span className="px-2.5 py-0.5 bg-purple-50 text-purple-600 text-xs font-medium rounded-full border border-purple-200">
                          特別仕様
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 mt-1">{page.description}</p>
                    {page.condition && (
                      <p className="text-xs text-blue-600 mt-1.5 font-medium">{page.condition}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* フッター情報 */}
        <div className="mt-12 grid grid-cols-3 gap-6">
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5">
            <div className="text-2xl font-bold text-neutral-900 mb-1">15</div>
            <div className="text-sm text-neutral-600">総ページ数</div>
          </div>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5">
            <div className="text-2xl font-bold text-neutral-900 mb-1">13</div>
            <div className="text-sm text-neutral-600">全MODE共通</div>
          </div>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5">
            <div className="text-2xl font-bold text-neutral-900 mb-1">2</div>
            <div className="text-sm text-neutral-600">条件付きページ</div>
          </div>
        </div>

        {/* 注釈 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-2">ページ構成の注意点</p>
              <ul className="space-y-1 text-blue-800">
                <li>• <strong>特徴</strong>ページは、お困り内容別と登場人物（役職）別の2つの切り口でコンテンツを作成します</li>
                <li>• <strong>NEWS</strong>は独立ページとHOMEでの部分表示の両方で展開します</li>
                <li>• <strong>CS詳細</strong>は、CS対応MODEのみ表示（Br, Gp, Dr）</li>
                <li>• <strong>PS詳細</strong>は、PS対応MODEのみ表示（Br, Gp）</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}