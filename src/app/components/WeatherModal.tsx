import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sun, Cloud, CloudRain, CloudSnow, Wind, CloudDrizzle } from 'lucide-react';

// ⚠️ APIキーの設定が必要です
// 1. https://www.weatherapi.com/ でアカウントを作成
// 2. ダッシュボードでAPIキーを取得
// 3. 下記の YOUR_API_KEY_HERE を実際のAPIキーに置き換えてください
const WEATHER_API_KEY = '89a4063176bf41dba3083800261203';

interface DailyWeather {
  date: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  conditionCode: number;
  precipitation: number;
  humidity: number;
  chanceOfRain: number;
}

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// WeatherAPI.comの天気コードに基づいたアイコン
const getWeatherIcon = (code: number, condition: string) => {
  // 晴れ (1000)
  if (code === 1000) return { Icon: Sun, color: '#F5C518', label: '晴れ' };
  
  // 曇り (1003, 1006, 1009)
  if ([1003, 1006, 1009].includes(code)) return { Icon: Cloud, color: '#9CA3AF', label: '曇り' };
  
  // 霧・もや (1030, 1135, 1147)
  if ([1030, 1135, 1147].includes(code)) return { Icon: Cloud, color: '#B0B0B0', label: '霧' };
  
  // 小雨・霧雨 (1063, 1150, 1153, 1168, 1171, 1180, 1183)
  if ([1063, 1150, 1153, 1168, 1171, 1180, 1183].includes(code)) {
    return { Icon: CloudDrizzle, color: '#60A5FA', label: '小雨' };
  }
  
  // 雨 (1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246)
  if ([1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(code)) {
    return { Icon: CloudRain, color: '#3B82F6', label: '雨' };
  }
  
  // 雪 (1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264)
  if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264].includes(code)) {
    return { Icon: CloudSnow, color: '#93C5FD', label: '雪' };
  }
  
  // 雷雨 (1087, 1273, 1276, 1279, 1282)
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
    return { Icon: Wind, color: '#6366F1', label: '雷雨' };
  }
  
  // デフォルト
  return { Icon: Cloud, color: '#9CA3AF', label: condition || '不明' };
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const weekday = weekdays[date.getDay()];
  return { month, day, weekday };
};

export function WeatherModal({ isOpen, onClose }: WeatherModalProps) {
  const [weatherData, setWeatherData] = useState<DailyWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    setCurrentMonth(`${year}年${month + 1}月`);
    
    // WeatherAPI.comは過去データと予測データを別々に取得する必要がある
    // 今月の1日から月末までのデータを取得
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);
    const today = new Date(year, month, now.getDate());
    
    // 過去のデータと予測データを並行して取得
    const promises: Promise<DailyWeather[]>[] = [];
    
    // 1. 月初から昨日までの過去データを取得
    if (today.getDate() > 1) {
      const historyPromises: Promise<DailyWeather[]>[] = [];
      
      for (let d = 1; d < today.getDate(); d++) {
        const date = new Date(year, month, d);
        const dateStr = date.toISOString().split('T')[0];
        const url = `https://api.weatherapi.com/v1/history.json?key=${WEATHER_API_KEY}&q=Shibuya,Tokyo,Japan&dt=${dateStr}`;
        
        historyPromises.push(
          fetch(url)
            .then(res => res.json())
            .then(data => {
              if (data.error || !data.forecast) return [];
              return data.forecast.forecastday.map((day: any) => ({
                date: day.date,
                tempMax: Math.round(day.day.maxtemp_c),
                tempMin: Math.round(day.day.mintemp_c),
                condition: day.day.condition.text,
                conditionCode: day.day.condition.code,
                precipitation: day.day.totalprecip_mm || 0,
                humidity: day.day.avghumidity || 0,
                chanceOfRain: day.day.daily_chance_of_rain || 0,
              }));
            })
            .catch(() => [])
        );
      }
      
      promises.push(
        Promise.all(historyPromises).then(results => results.flat())
      );
    }
    
    // 2. 今日から14日後までの予測データを取得（API制限）
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=Shibuya,Tokyo,Japan&days=14`;
    
    console.log('Fetching forecast from:', forecastUrl);
    
    promises.push(
      fetch(forecastUrl)
        .then(res => res.json())
        .then(data => {
          console.log('Forecast API response:', data);
          
          if (data.error || !data.forecast) {
            console.error('Forecast API error:', data.error);
            return [];
          }
          
          // 今月のデータのみフィルタ
          return data.forecast.forecastday
            .filter((day: any) => {
              const dayDate = new Date(day.date);
              return dayDate.getMonth() === month && dayDate.getFullYear() === year;
            })
            .map((day: any) => {
              console.log('Forecast day:', {
                date: day.date,
                condition: day.day.condition.text,
                code: day.day.condition.code,
                maxTemp: day.day.maxtemp_c,
                minTemp: day.day.mintemp_c
              });
              
              return {
                date: day.date,
                tempMax: Math.round(day.day.maxtemp_c),
                tempMin: Math.round(day.day.mintemp_c),
                condition: day.day.condition.text,
                conditionCode: day.day.condition.code,
                precipitation: day.day.totalprecip_mm || 0,
                humidity: day.day.avghumidity || 0,
                chanceOfRain: day.day.daily_chance_of_rain || 0,
              };
            });
        })
        .catch(() => [])
    );
    
    // すべてのデータを結合
    Promise.all(promises)
      .then(results => {
        const allForecasts = results.flat();
        // 日付でソート
        allForecasts.sort((a, b) => a.date.localeCompare(b.date));
        console.log('Weather forecasts:', allForecasts);
        setWeatherData(allForecasts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Weather fetch error:', error);
        setLoading(false);
      });
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-8 pointer-events-none"
          >
            <div
              className="w-full max-w-4xl max-h-[80vh] rounded-3xl border border-neutral-200/80 shadow-2xl overflow-hidden pointer-events-auto"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-200/80">
                <div>
                  <h2 className="text-xl text-neutral-800 mb-1" style={{ fontWeight: 600 }}>
                    {currentMonth || '今月'}の天気予報
                  </h2>
                  <p className="text-xs text-neutral-400" style={{ fontWeight: 300 }}>
                    東京都渋谷区広尾 (35.6503°N, 139.7225°E)
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
                  aria-label="閉じる"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(80vh-120px)] px-8 py-6">
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-600 rounded-full animate-spin" />
                  </div>
                ) : weatherData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
                    <Cloud className="w-12 h-12 mb-4 text-neutral-300" />
                    <p className="text-sm" style={{ fontWeight: 400 }}>
                      天気データを取得できませんでした
                    </p>
                    <p className="text-xs mt-2" style={{ fontWeight: 300 }}>
                      ブラウザのコンソールでエラーを確認してください
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {weatherData.map((day) => {
                      const { month, day: dayNum, weekday } = formatDate(day.date);
                      const { Icon, color, label } = getWeatherIcon(day.conditionCode, day.condition);
                      const isToday = day.date === new Date().toISOString().split('T')[0];
                      const isWeekend = weekday === '土' || weekday === '日';

                      return (
                        <div
                          key={day.date}
                          className={`p-4 rounded-xl border transition-all ${
                            isToday
                              ? 'border-neutral-400 bg-neutral-50'
                              : 'border-neutral-200/60 bg-white/40 hover:bg-white/80'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="flex items-baseline gap-1.5">
                                <span
                                  className="text-base text-neutral-700"
                                  style={{ fontWeight: 600 }}
                                >
                                  {month}/{dayNum}
                                </span>
                                <span
                                  className={`text-xs ${
                                    isWeekend ? 'text-red-500' : 'text-neutral-400'
                                  }`}
                                  style={{ fontWeight: 400 }}
                                >
                                  ({weekday})
                                </span>
                              </div>
                              {isToday && (
                                <span
                                  className="inline-block text-[10px] text-neutral-600 mt-0.5"
                                  style={{ fontWeight: 600 }}
                                >
                                  TODAY
                                </span>
                              )}
                            </div>
                            <Icon className="w-6 h-6" style={{ color }} />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-neutral-500 mb-1" style={{ fontWeight: 400 }}>
                                {label}
                              </p>
                              {day.precipitation > 0 && (
                                <p className="text-[10px] text-blue-500" style={{ fontWeight: 400 }}>
                                  降水 {day.precipitation.toFixed(1)}mm
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="flex items-baseline gap-1">
                                <span className="text-lg text-neutral-800" style={{ fontWeight: 600 }}>
                                  {day.tempMax}°
                                </span>
                                <span className="text-xs text-neutral-400" style={{ fontWeight: 400 }}>
                                  / {day.tempMin}°
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}