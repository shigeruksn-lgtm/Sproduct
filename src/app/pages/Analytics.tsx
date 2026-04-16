import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2, 
  Calendar, 
  PieChart, 
  LineChart, 
  ChevronRight,
  Download,
  Filter,
  ArrowUpRight
} from 'lucide-react';

import { useNavigate } from 'react-router';

// ─── Constants & Styles ────────────────────────────────────────────────────────
const brandGrad = 'linear-gradient(135deg, #F5C518 0%, #C0392B 50%, #3C2562 100%)';
const textGradStyle: React.CSSProperties = {
  backgroundImage: brandGrad,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
const analyticsCategories = [
  {
    id: 'sales',
    title: '売上分析',
    icon: TrendingUp,
    description: '期間・部門・会場ごとの売上実績と予測',
    reports: [
      { id: 'sales-venue', name: '会場別売上一覧', type: 'table', icon: Building2 },
      { id: 'sales-monthly', name: '月別売上推移', type: 'line', icon: LineChart },
      { id: 'sales-dept', name: '部門別売上構成', type: 'pie', icon: PieChart },
    ]
  },
  {
    id: 'customer',
    title: '顧客分析',
    icon: Users,
    description: '来館数、成約率、顧客属性の分析',
    reports: [
      { id: 'cv-rate', name: '来館・成約率推移', type: 'line', icon: LineChart },
      { id: 'lead-source', name: '流入経路別分析', type: 'pie', icon: PieChart },
      { id: 'customer-attr', name: '顧客属性レポート', type: 'table', icon: BarChart3 },
    ]
  },
  {
    id: 'operation',
    title: '稼働分析',
    icon: Calendar,
    description: '会場・施設の稼働率と空き状況の分析',
    reports: [
      { id: 'venue-util', name: '会場稼働率推移', type: 'bar', icon: BarChart3 },
      { id: 'season-trend', name: 'シーズン別予約傾向', type: 'line', icon: LineChart },
      { id: 'cancel-rate', name: 'キャンセル率分析', type: 'pie', icon: PieChart },
    ]
  }
];

const kpiData = [
  { label: '今月売上予測', value: '¥142,500,000', trend: '+12.5%', isPositive: true },
  { label: '今月成約率', value: '45.2%', trend: '+3.1%', isPositive: true },
  { label: '来月会場稼働率', value: '88.5%', trend: '-2.4%', isPositive: false },
  { label: '平均単価', value: '¥3,850,000', trend: '+5.0%', isPositive: true },
];

export default function Analytics() {
  const [activeCategory, setActiveCategory] = useState('sales');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-neutral-50" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      {/* ─── Header ─── */}
      <header className="flex-none px-8 py-6 bg-white border-b border-neutral-200">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(245,197,24,0.1), rgba(192,57,43,0.1))' }}>
                <BarChart3 className="w-4 h-4 text-neutral-700" />
              </div>
              <h1 className="text-2xl font-medium tracking-tight" style={{ color: '#1A1A1A' }}>
                分析管理
              </h1>
            </div>
            <p className="text-sm text-neutral-500">
              各種データの集計・分析レポート
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors">
              <Filter className="w-4 h-4" />
              条件絞り込み
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
              <Download className="w-4 h-4" />
              レポート出力
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* KPI Dashboard */}
          <section>
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Key Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpiData.map((kpi, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
                  <p className="text-sm text-neutral-500 mb-2">{kpi.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-light tracking-tight">{kpi.value}</p>
                    <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      kpi.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {kpi.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                      {kpi.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Report Categories */}
          <section>
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Report Categories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sidebar: Categories */}
              <div className="flex flex-col gap-3 lg:col-span-1">
                {analyticsCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-start gap-4 p-4 rounded-xl text-left transition-all ${
                        isActive 
                          ? 'bg-white border border-slate-800 shadow-sm ring-1 ring-slate-800' 
                          : 'bg-white/50 border border-neutral-200 hover:bg-white hover:border-neutral-300'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-slate-100' : 'bg-neutral-100'}`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-slate-800' : 'text-neutral-500'}`} />
                      </div>
                      <div>
                        <h3 className={`font-medium mb-1 ${isActive ? 'text-slate-800' : 'text-neutral-700'}`}>
                          {cat.title}
                        </h3>
                        <p className="text-xs text-neutral-500 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Main Area: Reports List */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-neutral-100 bg-neutral-50/50">
                  <h3 className="font-medium text-neutral-800">
                    {analyticsCategories.find(c => c.id === activeCategory)?.title} レポート一覧
                  </h3>
                </div>
                <div className="p-2 flex-1 flex flex-col gap-1">
                  {analyticsCategories.find(c => c.id === activeCategory)?.reports.map((report) => {
                    const ReportIcon = report.icon;
                    return (
                      <button
                        key={report.id}
                        onClick={() => {
                          if (report.id === 'sales-venue') {
                            navigate('/home/analytics/sales-venue');
                          }
                        }}
                        className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-neutral-50 transition-colors group text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-white border border-neutral-200 shadow-sm flex items-center justify-center group-hover:border-slate-300 transition-all">
                            <ReportIcon className="w-5 h-5 text-neutral-600" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-800 mb-0.5">{report.name}</p>
                            <p className="text-xs text-neutral-400 uppercase tracking-wider">{report.type} view</p>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 group-hover:bg-slate-800 group-hover:text-white transition-all">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                {/* Visual Placeholder for active category */}
                <div className="p-8 border-t border-neutral-100 flex flex-col items-center justify-center text-center bg-neutral-50 min-h-[160px]">
                  <BarChart3 className="w-8 h-8 text-neutral-300 mb-3" />
                  <p className="text-sm text-neutral-500 font-medium mb-1">レポートを選択してください</p>
                  <p className="text-xs text-neutral-400">上部のリストから表示したいレポートをクリックすると、ここに詳細グラフや表が表示されます。</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}