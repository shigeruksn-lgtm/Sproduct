import { motion, useInView } from 'motion/react';
import { Link } from 'react-router';
import { GridIcon } from '../components/GridIcon';
import { ArrowRight, Sparkles, Zap, Globe, Layers, GitMerge } from 'lucide-react';

// ─── Palette ─────────────────────────────────────────────────────────────────
const ES_GRADIENT = 'linear-gradient(135deg, #F5C518 0%, #D49B1A 20%, #C0392B 50%, #4A2040 80%, #3C2562 100%)';
const GOLD  = '#F5C518';
const AMBER = '#E48E20';
const NAVY  = '#1B2A5C';

// ─── Feature cards ────────────────────────────────────────────────────────────
const updates = [
  {
    icon: Layers,
    label: 'CS / PS 統合',
    desc: '会社様・お客様・パートナー様の\nすべてをひとつのプロダクトへ。',
    color: '#F5C518',
  },
  {
    icon: GitMerge,
    label: 'マトリックス設計',
    desc: 'ES / CS / PS × 6モードの\nシームレスな業務連携。',
    color: '#E48E20',
  },
  {
    icon: Zap,
    label: 'AI Integration',
    desc: '各モジュールに AI を組み込み、\n現場の判断をサポート。',
    color: '#C0392B',
  },
  {
    icon: Globe,
    label: 'クラウドネイティブ',
    desc: 'ブラウザひとつで全機能。\nどこでも、どのデバイスでも。',
    color: '#3C2562',
  },
];

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 40);
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(id); }
      else setVal(start);
    }, 30);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref} style={{ position: 'relative' }}>{val.toLocaleString()}{suffix}</span>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PVExisting() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        background: '#ffffff',
        color: '#1a1a1a',
        fontFamily: 'DM Sans, sans-serif',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      {/* ═══ HERO — 告知セクション ═══ */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '80px 0',
          overflow: 'hidden',
        }}
      >
        {/* 背景グロー */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 50% at 40% 55%, rgba(245,197,24,0.08) 0%, rgba(192,57,43,0.05) 40%, transparent 70%)',
          }}
        />
        {/* ノイズテクスチャ */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.018,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
            backgroundSize: '256px 256px',
          }}
        />

        <div
          style={{
            width: '100%',
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 64,
          }}
        >
          {/* ── 左: テキスト ── */}
          <div style={{ flex: '1 1 auto', minWidth: 0 }}>
            {/* ラベル */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40,
              }}
            >
              <GridIcon size={20} pattern="B" />
              <span
                style={{
                  fontSize: 11, letterSpacing: '0.45em', textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.35)',
                }}
              >
                ƐS Product — Update Notice
              </span>
            </motion.div>

            {/* メインコピー 1行目 */}
            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontSize: 'clamp(28px, 4.5vw, 52px)',
                fontWeight: 600,
                color: '#1B2A5C',
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                marginBottom: 8,
              }}
            >
              大変お待たせしました。
            </motion.p>

            {/* メインコピー 2行目 */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontSize: 'clamp(28px, 4.5vw, 52px)',
                fontWeight: 600,
                lineHeight: 1.5,
                letterSpacing: '-0.02em',
                marginBottom: 40,
                backgroundImage: ES_GRADIENT,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ƐSのアップデートの<br />お知らせです。
            </motion.h1>

            {/* 区切り線 */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={loaded ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                height: 1, width: 120, background: ES_GRADIENT,
                transformOrigin: 'left center', marginBottom: 36,
              }}
            />

            {/* サブコピー */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={loaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 1.1 }}
              style={{
                color: 'rgba(0,0,0,0.62)',
                fontSize: '0.82rem',
                fontWeight: 300,
                lineHeight: 1.6,
                letterSpacing: '0.06em',
                maxWidth: 480,
                marginBottom: 48,
              }}
            >
              ES に加え、CS・PS・AI を搭載した次世代プロダクトへ。<br />
              会社様・お客様・パートナー様、<br />
              すべてに喜ばれるシームレスな体験を届けます。
            </motion.p>

            {/* CTAボタン */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.3 }}
              style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
            >
              <Link
                to="/pv"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 28px',
                  borderRadius: 40,
                  background: ES_GRADIENT,
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(245,197,24,0.25)',
                  transition: 'opacity 0.2s',
                }}
              >
                アップデート詳細はこちら
                <ArrowRight style={{ width: 15, height: 15 }} />
              </Link>
            </motion.div>
          </div>

          {/* ── 右: キャラクター ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.92 }}
            animate={loaded ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ flexShrink: 0, position: 'relative', marginRight: 120 }}
          >
            {/* グロー背景 */}
            <div
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 280, height: 280,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)`,
                pointerEvents: 'none',
              }}
            />

            {/* すみません 吹き出し */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
              animate={loaded ? { opacity: 1, scale: 1, rotate: -8 } : {}}
              transition={{ duration: 0.5, delay: 1.8, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                position: 'absolute',
                top: -30,
                right: 150,
                zIndex: 10,
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* 吹き出し本体 */}
              <div
                style={{
                  background: '#fff',
                  border: '2.5px solid #1a1a1a',
                  borderRadius: 6,
                  padding: '5px 10px',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  color: '#1a1a1a',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.4,
                  boxShadow: '2px 2px 0px #1a1a1a',
                  fontFamily: 'monospace',
                }}
              >
                ＼ ｽﾐﾏｾﾝ ／
              </div>
              {/* しっぽ */}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '8px solid #1a1a1a',
                  marginTop: -1,
                  marginLeft: 20,
                  alignSelf: 'flex-start',
                }}
              />
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '7px solid #fff',
                  marginTop: -9,
                  marginLeft: 21,
                  alignSelf: 'flex-start',
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* スクロールヒント */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 2, duration: 0.8 }}
          style={{
            position: 'absolute', bottom: 36,
            left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            color: 'rgba(0,0,0,0.2)',
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' }}
          >
            Scroll
          </motion.div>
          <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)' }} />
        </motion.div>
      </section>

      {/* ═══ 数値ハイライト ═══ */}
      <section
        style={{
          padding: '80px 48px',
          maxWidth: 1100,
          margin: '0 auto',
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 1,
            background: 'rgba(0,0,0,0.06)',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {[
            { num: 3, suffix: ' Lines', label: 'ES / CS / PS' },
            { num: 6, suffix: ' Modes', label: '婚礼・宴会・衣裳・美容・写真・装花' },
            { num: 18, suffix: '+', label: 'モジュール数' },
            { num: 2025, suffix: '', label: '始動年' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{
                padding: '40px 32px',
                background: '#f9f9f9',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  backgroundImage: ES_GRADIENT,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                }}
              >
                <Counter to={item.num} suffix={item.suffix} />
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: 'rgba(0,0,0,0.35)',
                  letterSpacing: '0.08em',
                  fontWeight: 300,
                  lineHeight: 1.6,
                }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ 更新内容カード ═══ */}
      <section style={{ padding: '40px 48px 120px', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 48 }}
        >
          <p
            style={{
              fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.25)', marginBottom: 16,
            }}
          >
            What's New
          </p>
          <h2
            style={{
              fontSize: 'clamp(24px, 3.5vw, 40px)',
              fontWeight: 300,
              color: 'rgba(0,0,0,0.7)',
              letterSpacing: '-0.02em',
            }}
          >
            今回のアップデート
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
          }}
        >
          {updates.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                style={{
                  padding: '32px 28px',
                  borderRadius: 16,
                  background: '#fafafa',
                  border: `1px solid ${item.color}22`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* 背景グロー */}
                <div
                  style={{
                    position: 'absolute', bottom: -40, right: -40,
                    width: 120, height: 120, borderRadius: '50%',
                    background: `radial-gradient(circle, ${item.color}12 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />
                {/* アイコン */}
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: `${item.color}12`,
                    border: `1px solid ${item.color}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20,
                  }}
                >
                  <Icon style={{ width: 18, height: 18, color: item.color }} />
                </div>
                {/* テキスト */}
                <p
                  style={{
                    fontSize: 13, fontWeight: 600,
                    color: 'rgba(0,0,0,0.75)',
                    letterSpacing: '0.02em', marginBottom: 10,
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: 12, fontWeight: 300,
                    color: 'rgba(0,0,0,0.4)',
                    lineHeight: 1.9, whiteSpace: 'pre-line',
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* 下部: キャラクターと締めコピー */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1 }}
          style={{
            marginTop: 80,
            padding: '64px 48px',
            borderRadius: 24,
            background: 'linear-gradient(135deg, rgba(245,197,24,0.04) 0%, rgba(192,57,43,0.03) 50%, rgba(60,37,98,0.03) 100%)',
            border: '1px solid rgba(0,0,0,0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 48,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <p
              style={{
                fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.25)', marginBottom: 24,
              }}
            >
              Epilogue
            </p>
            <p
              style={{
                fontFamily: 'Cormorant, serif',
                fontSize: 'clamp(22px, 3.5vw, 36px)',
                fontWeight: 300,
                color: 'rgba(0,0,0,0.6)',
                lineHeight: 1.8,
                letterSpacing: '0.02em',
                marginBottom: 20,
              }}
            >
              すべてをシームレスへ。
            </p>
            <p
              style={{
                fontSize: 13, fontWeight: 300,
                color: 'rgba(0,0,0,0.35)',
                lineHeight: 2.1,
              }}
            >
              この更新は、始まりにすぎません。<br />
              ƐS Product は、進化し続けます。
            </p>
            <div style={{ marginTop: 32 }}>
              <Link
                to="/pv"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontSize: 12, color: AMBER,
                  textDecoration: 'none', letterSpacing: '0.1em',
                  fontWeight: 500,
                }}
              >
                <Sparkles style={{ width: 14, height: 14 }} />
                PV を見る
              </Link>
            </div>
          </div>

          {/* 右: もう一体（通常表情） */}
          <motion.div
            style={{ flexShrink: 0, position: 'relative' }}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
          >
            <div
              style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 200, height: 200, borderRadius: '50%',
                background: `radial-gradient(circle, ${GOLD}15 0%, transparent 70%)`,
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}