import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Download, Building2, Calendar as CalendarIcon } from 'lucide-react';
import { Link } from 'react-router';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

type ViewMode = 'monthly' | 'yearly';

const VENUES = [
  'The Grand Ballroom',
  'Crystal Room',
  'Garden Terrace',
  'Sky Lounge',
  'Ocean View',
];

const TABS = ['全体', '田中 太郎', '鈴木 次郎', '齋藤 三郎'];

interface CellData {
  amount: number;
  prevAmount: number;
  targetAmount: number;
  rate: number;
}

const generateMockData = (mode: ViewMode, tab: string) => {
  const isYearly = mode === 'yearly';
  const columnsCount = isYearly ? 12 : 31;

  let multiplier = 1;
  if (tab === '田中 太郎') multiplier = 0.4;
  else if (tab === '鈴木 次郎') multiplier = 0.35;
  else if (tab === '齋藤 三郎') multiplier = 0.25;

  const data: Record<string, CellData[]> = {};

  VENUES.forEach(venue => {
    data[venue] = Array.from({ length: columnsCount }).map(() => {
      const baseAmount = (isYearly ? 15000000 + Math.random() * 20000000 : 500000 + Math.random() * 1000000) * multiplier;
      const prevAmount = baseAmount * (0.8 + Math.random() * 0.4);
      const targetAmount = baseAmount * (1.05 + Math.random() * 0.15);
      const rate = isYearly ? 40 + Math.random() * 50 : Math.random() > 0.3 ? 60 + Math.random() * 40 : 0;
      return {
        amount: Math.floor(baseAmount),
        prevAmount: Math.floor(prevAmount),
        targetAmount: Math.floor(targetAmount),
        rate: Math.floor(rate),
      };
    });
  });

  return data;
};

const CHART_COMMON_PROPS = {
  barCategoryGap: '40%' as const,
  margin: { top: 8, right: 10, left: 10, bottom: 0 },
};

const TOOLTIP_PROPS = {
  cursor: { fill: '#f1f5f9' },
  contentStyle: { borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
  itemStyle: { fontSize: '12px', fontWeight: 500 },
  labelStyle: { fontSize: '12px', color: '#64748b', marginBottom: '4px' },
  formatter: (value: number) => [`¥${value.toLocaleString()}`, '現在売上'] as [string, string],
};

export default function SalesVenue() {
  const [viewMode, setViewMode] = useState<ViewMode>('monthly');
  const [targetPeriod, setTargetPeriod] = useState<string>('2026年3月');
  const [activeTab, setActiveTab] = useState<string>(TABS[0]);

  const handleModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setTargetPeriod(mode === 'monthly' ? '2026年3月' : '2026年度');
  };

  const data = useMemo(() => generateMockData(viewMode, activeTab), [viewMode, activeTab]);

  const columns = useMemo(() => {
    return viewMode === 'monthly'
      ? Array.from({ length: 31 }, (_, i) => `${i + 1}日`)
      : [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3].map((m, i) => i === 0 ? `2026年 ${m}月` : `${m}月`);
  }, [viewMode]);

  const colTotals = useMemo(() => {
    return columns.map((_, colIndex) => {
      let sumAmount = 0, sumPrev = 0, sumTarget = 0;
      VENUES.forEach(venue => {
        sumAmount += data[venue][colIndex].amount;
        sumPrev += data[venue][colIndex].prevAmount;
        sumTarget += data[venue][colIndex].targetAmount;
      });
      return { amount: sumAmount, prevAmount: sumPrev, targetAmount: sumTarget };
    });
  }, [data, columns]);

  const rowTotals = useMemo(() => {
    const rTotals: Record<string, { amount: number; prevAmount: number; targetAmount: number; rate: number }> = {};
    VENUES.forEach(venue => {
      let sumAmt = 0, sumPrev = 0, sumTarget = 0, sumRate = 0;
      data[venue].forEach(cell => {
        sumAmt += cell.amount;
        sumPrev += cell.prevAmount;
        sumTarget += cell.targetAmount;
        sumRate += cell.rate;
      });
      rTotals[venue] = { amount: sumAmt, prevAmount: sumPrev, targetAmount: sumTarget, rate: Math.floor(sumRate / columns.length) };
    });
    return rTotals;
  }, [data, columns]);

  // チャートは現在売上のみ
  const chartData = useMemo(() => {
    return columns.map((col, idx) => ({
      name: col,
      現在売上: colTotals[idx].amount,
    }));
  }, [columns, colTotals]);

  const grandTotal = colTotals.reduce((acc, c) => acc + c.amount, 0);
  const grandPrev = colTotals.reduce((acc, c) => acc + c.prevAmount, 0);
  const grandTarget = colTotals.reduce((acc, c) => acc + c.targetAmount, 0);

  const MONTHLY_CHART_WIDTH = 31 * 48 + 100;
  const CHART_HEIGHT = 190;

  return (
    <div className="flex flex-col h-full bg-neutral-50" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      {/* ─── Header ─── */}
      <header className="flex-none px-8 py-5 bg-white border-b border-neutral-200">
        <div className="max-w-[1600px] mx-auto">
          <Link to="/home/analytics" className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-700 transition-colors mb-4">
            <ChevronLeft className="w-3 h-3" />
            分析管理に戻る
          </Link>

          <div className="flex items-end justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-neutral-200 bg-neutral-50 shadow-sm">
                <Building2 className="w-5 h-5 text-neutral-700" />
              </div>
              <div>
                <h1 className="text-2xl font-medium tracking-tight" style={{ color: '#1A1A1A' }}>
                  会場別売上一覧
                </h1>
                <p className="text-sm text-neutral-500 mt-0.5">
                  施設ごとの売上実績・稼働率の推移レポート
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-sm shadow-sm">
                <CalendarIcon className="w-4 h-4 text-neutral-400" />
                <span className="font-medium text-neutral-700 w-20 text-center">{targetPeriod}</span>
                <div className="flex flex-col gap-0 border-l border-neutral-200 pl-2 ml-1 cursor-pointer">
                  <button className="text-neutral-400 hover:text-slate-800 leading-none h-3">▲</button>
                  <button className="text-neutral-400 hover:text-slate-800 leading-none h-3">▼</button>
                </div>
              </div>

              <div className="flex items-center p-1 bg-neutral-100 rounded-lg border border-neutral-200">
                <button
                  onClick={() => handleModeChange('monthly')}
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                    viewMode === 'monthly' ? 'bg-white text-slate-800 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  月間 (日別)
                </button>
                <button
                  onClick={() => handleModeChange('yearly')}
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                    viewMode === 'yearly' ? 'bg-white text-slate-800 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  年間 (月別)
                </button>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors shadow-sm">
                <Download className="w-4 h-4" />
                CSV出力
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-6">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab ? 'text-slate-800' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="salesVenueTab"
                    className="absolute left-0 right-0 bottom-[-1px] h-0.5 bg-slate-800"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="flex-1 overflow-hidden p-8 flex flex-col gap-6">
        {/* Table Container */}
        <div className="max-w-[1600px] w-full mx-auto flex-1 flex flex-col bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden min-h-0">
          <div className="flex-1 overflow-auto custom-scrollbar relative">
            <table className="w-full text-sm border-separate" style={{ borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th className="sticky top-0 left-0 z-30 bg-neutral-50 border-b border-r border-neutral-200 p-4 text-left font-medium text-neutral-600 shadow-[1px_1px_0_0_#e5e5e5]">
                    施設名 \ {viewMode === 'monthly' ? '日付' : '月'}
                  </th>
                  {columns.map(col => (
                    <th key={col} className="sticky top-0 z-20 bg-neutral-50 border-b border-r border-neutral-200 p-3 font-medium text-neutral-600 text-center min-w-[120px] shadow-[0_1px_0_0_#e5e5e5]">
                      {col}
                    </th>
                  ))}
                  <th className="sticky top-0 right-0 z-30 bg-slate-50 border-b border-l border-neutral-200 p-3 font-semibold text-slate-800 text-center min-w-[150px] shadow-[-1px_1px_0_0_#e5e5e5]">
                    合計
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {VENUES.map((venue, rowIdx) => (
                  <tr key={venue} className="group hover:bg-neutral-50/50 transition-colors">
                    <th className="sticky left-0 z-10 bg-white group-hover:bg-neutral-50/50 border-b border-r border-neutral-200 p-4 text-left whitespace-nowrap shadow-[1px_0_0_0_#e5e5e5]">
                      <div className="font-medium text-slate-800">{venue}</div>
                      <div className="text-[10px] text-neutral-400 font-normal mt-0.5">Capacity: {120 + rowIdx * 30} pax</div>
                    </th>

                    {data[venue].map((cell, colIdx) => {
                      const diffPrev = cell.amount - cell.prevAmount;
                      const diffTarget = cell.amount - cell.targetAmount;
                      return (
                        <td key={colIdx} className="border-b border-r border-neutral-200 p-2.5 text-right align-top">
                          <div className="flex flex-col gap-0.5">
                            <div className="text-[13px] font-semibold text-slate-800 tabular-nums leading-none mb-0.5">
                              ¥{cell.amount.toLocaleString()}
                            </div>
                            <div className={`text-[11px] tabular-nums ${diffPrev >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                              <span className="text-[9px] text-neutral-400 mr-1">昨</span>
                              {diffPrev > 0 ? '+' : ''}{diffPrev.toLocaleString()}
                            </div>
                            <div className={`text-[11px] tabular-nums ${diffTarget >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                              <span className="text-[9px] text-neutral-400 mr-1">目</span>
                              {diffTarget > 0 ? '+' : ''}{diffTarget.toLocaleString()}
                            </div>
                            <div className="mt-1 flex justify-end">
                              <span className={`text-[10px] font-semibold tabular-nums px-1.5 py-0.5 rounded ${
                                cell.rate >= 80 ? 'bg-emerald-50 text-emerald-600' :
                                cell.rate <= 40 ? 'bg-rose-50 text-rose-600' :
                                'bg-neutral-100 text-neutral-500'
                              }`}>
                                {cell.rate}%
                              </span>
                            </div>
                          </div>
                        </td>
                      );
                    })}

                    <td className="sticky right-0 z-10 border-b border-l border-neutral-200 p-2.5 bg-slate-50 group-hover:bg-slate-100 transition-colors text-right align-top shadow-[-1px_0_0_0_#e5e5e5]">
                      <div className="flex flex-col gap-0.5">
                        <div className="text-[13px] font-semibold text-slate-800 tabular-nums leading-none mb-0.5">
                          ¥{rowTotals[venue].amount.toLocaleString()}
                        </div>
                        <div className={`text-[11px] tabular-nums ${rowTotals[venue].amount - rowTotals[venue].prevAmount >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          <span className="text-[9px] text-slate-400 mr-1">昨</span>
                          {rowTotals[venue].amount - rowTotals[venue].prevAmount > 0 ? '+' : ''}{(rowTotals[venue].amount - rowTotals[venue].prevAmount).toLocaleString()}
                        </div>
                        <div className={`text-[11px] tabular-nums ${rowTotals[venue].amount - rowTotals[venue].targetAmount >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          <span className="text-[9px] text-slate-400 mr-1">目</span>
                          {rowTotals[venue].amount - rowTotals[venue].targetAmount > 0 ? '+' : ''}{(rowTotals[venue].amount - rowTotals[venue].targetAmount).toLocaleString()}
                        </div>
                        <div className="mt-1 flex justify-end">
                          <span className="text-[10px] font-medium text-slate-600 tabular-nums px-1.5 py-0.5 rounded bg-slate-200/50">
                            {rowTotals[venue].rate}%
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Footer Totals Row */}
                <tr className="bg-neutral-50 font-medium">
                  <th className="sticky left-0 z-10 bg-neutral-50 border-r border-neutral-200 p-4 text-left shadow-[1px_0_0_0_#e5e5e5]">
                    <div className="text-sm text-slate-800">全施設合計</div>
                  </th>
                  {colTotals.map((tot, idx) => (
                    <td key={idx} className="border-r border-neutral-200 p-3 text-right align-top">
                      <div className="flex flex-col gap-0.5">
                        <div className="text-[13px] font-semibold text-slate-800 tabular-nums leading-none mb-0.5">
                          ¥{tot.amount.toLocaleString()}
                        </div>
                        <div className={`text-[11px] tabular-nums ${tot.amount - tot.prevAmount >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          <span className="text-[9px] text-neutral-500 mr-1">昨</span>
                          {tot.amount - tot.prevAmount > 0 ? '+' : ''}{(tot.amount - tot.prevAmount).toLocaleString()}
                        </div>
                        <div className={`text-[11px] tabular-nums ${tot.amount - tot.targetAmount >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          <span className="text-[9px] text-neutral-500 mr-1">目</span>
                          {tot.amount - tot.targetAmount > 0 ? '+' : ''}{(tot.amount - tot.targetAmount).toLocaleString()}
                        </div>
                      </div>
                    </td>
                  ))}
                  <td className="sticky right-0 z-20 p-3 bg-slate-100 border-l border-neutral-200 text-right align-top shadow-[-1px_0_0_0_#e5e5e5]">
                    <div className="flex flex-col gap-0.5">
                      <div className="text-[14px] font-bold text-slate-900 tabular-nums leading-none mb-1">
                        ¥{grandTotal.toLocaleString()}
                      </div>
                      <div className={`text-[12px] font-medium tabular-nums ${grandTotal - grandPrev >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        <span className="text-[10px] text-slate-500 mr-1">昨</span>
                        {grandTotal - grandPrev > 0 ? '+' : ''}{(grandTotal - grandPrev).toLocaleString()}
                      </div>
                      <div className={`text-[12px] font-medium tabular-nums ${grandTotal - grandTarget >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        <span className="text-[10px] text-slate-500 mr-1">目</span>
                        {grandTotal - grandTarget > 0 ? '+' : ''}{(grandTotal - grandTarget).toLocaleString()}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer Legend */}
          <div className="flex-none p-4 bg-white border-t border-neutral-200 flex justify-between items-center text-xs text-neutral-500">
            <span>表示項目: 1段目＝当期売上実績、2段目＝対前年同期差異、3段目＝対目標差異、4段目＝稼働率</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> 80%以上 (好調)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-neutral-400"></span> 41~79% (通常)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span> 40%以下 (要注意)</span>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="max-w-[1600px] w-full mx-auto h-[240px] flex-none bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 flex flex-col">
          <h3 className="text-[15px] font-semibold text-slate-800 mb-3 tracking-tight">
            売上推移（{activeTab}）
          </h3>

          {viewMode === 'monthly' ? (
            /* 月間: px固定幅 + 横スクロール */
            <div className="flex-1 min-h-0 overflow-x-auto custom-scrollbar">
              <BarChart
                width={MONTHLY_CHART_WIDTH}
                height={CHART_HEIGHT}
                data={chartData}
                {...CHART_COMMON_PROPS}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} interval={0} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `¥${(val / 10000).toLocaleString()}万`} dx={-10} width={80} />
                <Tooltip {...TOOLTIP_PROPS} />
                <Bar dataKey="現在売上" fill="#0f172a" radius={[3, 3, 0, 0]} maxBarSize={28} />
              </BarChart>
            </div>
          ) : (
            /* 年間: ResponsiveContainer（震えなし） */
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} {...CHART_COMMON_PROPS}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} interval={0} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `¥${(val / 10000).toLocaleString()}万`} dx={-10} width={80} />
                  <Tooltip {...TOOLTIP_PROPS} />
                  <Bar dataKey="現在売上" fill="#0f172a" radius={[3, 3, 0, 0]} maxBarSize={52} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .tabular-nums {
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum";
          font-family: "Inter", system-ui, -apple-system, sans-serif;
          letter-spacing: 0.01em;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
