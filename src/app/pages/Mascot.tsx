import mascotImg from 'figma:asset/a2e64ff85bdae31ceb529d8a9380ee68327aa6e6.png';
import mascotBW from 'figma:asset/4767d4026ad10b35afa0ffd2506b79812c6cdc38.png';
import { Synapse01 } from '../components/Synapse01';

const tags = ['温厚', '博識', 'カイゼル髭', '山高帽'];

const tagColors: Record<string, { bg: string; text: string }> = {
  温厚:       { bg: '#FEF3C7', text: '#D97706' },
  博識:       { bg: '#F0F9FF', text: '#0369A1' },
  カイゼル髭: { bg: '#F5F3FF', text: '#7C3AED' },
  山高帽:     { bg: '#F0FDF4', text: '#15803D' },
};

const background = [
  { label: 'Age',          value: '50歳（人生折り返し）' },
  { label: 'Born',         value: '東京都渋谷区生まれ、福岡県博多区育ち' },
  { label: 'Lives',        value: '広尾在住' },
  { label: 'Hangs out',    value: '中目黒' },
  { label: 'Skill',        value: 'ダンス' },
  { label: 'Hobby',        value: 'AIに悩み相談' },
  { label: 'Catchphrase',  value: 'せやねん' },
  { label: 'Previous job', value: '寿司屋' },
];

const designPrinciples = [
  { label: 'フラット',       value: '立体感・艶なし' },
  { label: 'ゆるかわ',       value: '親しみやすく柔らかい' },
  { label: 'ブランドカラー', value: 'ゴールド×レッド×ネイビー' },
  { label: 'シンプル',       value: '最小限の線と面' },
  { label: 'イメージ',       value: 'ドアマン' },
];

const usageIdeas = [
  'ローディング画面のアニメーション',
  'エラーページの案内役',
  'ツールチップのヘルパー',
  'オンボーディングのナビゲーター',
  'リリースノートの解説役',
];

const synapseTags = ['AI補佐', '真面目', 'ロボット', '不安そう'];

const synapseTagColors: Record<string, { bg: string; text: string }> = {
  AI補佐:     { bg: '#F0F9FF', text: '#0369A1' },
  真面目:     { bg: '#F0FDF4', text: '#15803D' },
  ロボット:   { bg: '#F5F3FF', text: '#7C3AED' },
  不安そう:   { bg: '#FFF7ED', text: '#C2410C' },
};

const synapseBackground = [
  { label: 'Name',      value: 'S.Y.N.A.P.S.E.' },
  { label: 'Role',      value: 'AIアシスタント' },
  { label: 'Emotion',   value: 'いつも少し不安' },
  { label: 'Skill',     value: 'なんでも調べる' },
  { label: 'Weakness',  value: '急かされること' },
  { label: 'Dream',     value: 'ƐSおじさんに認めてもらう' },
];

export default function Mascot() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'DM Sans, sans-serif', background: '#ffffff' }}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

        {/* ── Left ── */}
        <div style={{ display: 'flex', flexDirection: 'column', borderRightWidth: 1, borderRightStyle: 'solid', borderRightColor: '#e5e5e5', background: '#fafaf9' }}>

          {/* ── Left 上段：ƐSおじさん ── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '64px 64px 48px' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a3a3a3', margin: '0 0 32px 0' }}>
              Character Concept — For Fun
            </p>
            <h1 style={{ fontSize: 40, fontWeight: 300, color: '#171717', margin: '0 0 8px 0' }}>
              非公認マスコット
            </h1>
            <p style={{ fontSize: 13, color: '#a3a3a3', margin: '0 0 40px 0' }}>
              たまに現れる謎のキャラクター紹介
            </p>

            {/* ƐSおじさん 画像 */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 24 }}>
              <img src={mascotBW} alt="ƐSおじさん モノクロ" style={{ height: 260, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} />
              <img src={mascotImg} alt="ƐSおじさん カラー" style={{ height: 260, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} />
            </div>
          </div>

          {/* ── 区切り線 ── */}
          <div style={{ height: 1, background: '#e5e5e5', margin: '0 32px' }} />

          {/* ── Left 下段：シナプスAI ── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 64px 64px' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a3a3a3', margin: '0 0 24px 0' }}>
              AI Partner
            </p>

            {/* シナプス 画像 */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Synapse01 height={240} />
            </div>

            {/* Usage Ideas */}
            <div style={{ marginTop: 40 }}>
              <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a3a3a3', margin: '0 0 16px 0' }}>
                Usage Ideas
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {usageIdeas.map((idea) => (
                  <li key={idea} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#737373' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#d4d4d4', flexShrink: 0 }} />
                    {idea}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Right ── */}
        <div style={{ padding: '64px', overflowY: 'auto', background: '#ffffff' }}>
          <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a3a3a3', margin: '0 0 32px 0' }}>
            ƐS Product Mascot
          </p>

          {/* ƐSおじさん section */}
          <h2 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.025em', color: '#171717', margin: '0 0 4px 0' }}>
            ƐSおじさん
          </h2>
          <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E8703A', margin: '0 0 24px 0' }}>
            The Gentle Navigator
          </p>

          <div style={{ width: 40, height: 1, background: '#e5e5e5', marginBottom: 24 }} />

          <p style={{ fontSize: 13, color: '#525252', lineHeight: 2, margin: '0 0 24px 0' }}>
            婚礼・宴会・衣装・美容業界に長くいるにも関わらず、そんな詳しくない風な態度をとる。基本偉そう。でも断らない男。ノラせたらやってくれる人。愛されキャラ狙っているがあざとさが透けて見える。まだ自分が非公認キャラだとは認識していない。ボランティアでES Product Hotelのドアマンをしてくれている。
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {tags.map((tag) => (
              <span key={tag} style={{ padding: '4px 12px', borderRadius: 9999, fontSize: 12, background: tagColors[tag]?.bg ?? '#f5f5f5', color: tagColors[tag]?.text ?? '#555' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Background */}
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a3a3a3', margin: '0 0 16px 0' }}>
              Background
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {background.map(({ label, value }) => (
                  <tr key={label} style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#f5f5f5' }}>
                    <td style={{ padding: '10px 24px 10px 0', fontSize: 11, color: '#a3a3a3', fontWeight: 500, whiteSpace: 'nowrap', width: 130, verticalAlign: 'top' }}>{label}</td>
                    <td style={{ padding: '10px 0', fontSize: 13, color: '#404040' }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Design Principle */}
          <div style={{ marginBottom: 64 }}>
            <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a3a3a3', margin: '0 0 16px 0' }}>
              Design Principle
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {designPrinciples.map(({ label, value }) => (
                  <tr key={label} style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#f5f5f5' }}>
                    <td style={{ padding: '10px 24px 10px 0', fontSize: 11, color: '#171717', fontWeight: 600, whiteSpace: 'nowrap', width: 130, verticalAlign: 'top' }}>{label}</td>
                    <td style={{ padding: '10px 0', fontSize: 13, color: '#737373' }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── セクション区切り線 ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
            <div style={{ flex: 1, height: 1, background: '#e5e5e5' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#d4d4d4' }}>Next</span>
            <div style={{ flex: 1, height: 1, background: '#e5e5e5' }} />
          </div>

          {/* ── シナプスAI section ── */}
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.025em', color: '#171717', margin: '0 0 4px 0' }}>
              シナプスAI 01
            </h2>
            <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0369A1', margin: '0 0 24px 0' }}>
              S.Y.N.A.P.S.E.
            </p>

            <div style={{ width: 40, height: 1, background: '#e5e5e5', marginBottom: 24 }} />

            <p style={{ fontSize: 13, color: '#525252', lineHeight: 2, margin: '0 0 24px 0' }}>
              ƐSおじさんのAIアシスタント。いつも少し不安そうな顔をしているが、仕事はきちんとこなす。胸のプレートに「S.Y.N.A.P.S.E.」と書かれているが、自分でも略語の意味をよく知らない。ƐSおじさんに「せやねん」と言ってもらえることが密かな目標。
            </p>

            {/* Synapse Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
              {synapseTags.map((tag) => (
                <span key={tag} style={{ padding: '4px 12px', borderRadius: 9999, fontSize: 12, background: synapseTagColors[tag]?.bg ?? '#f5f5f5', color: synapseTagColors[tag]?.text ?? '#555' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Synapse Background */}
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a3a3a3', margin: '0 0 16px 0' }}>
                Profile
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {synapseBackground.map(({ label, value }) => (
                    <tr key={label} style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#f5f5f5' }}>
                      <td style={{ padding: '10px 24px 10px 0', fontSize: 11, color: '#a3a3a3', fontWeight: 500, whiteSpace: 'nowrap', width: 130, verticalAlign: 'top' }}>{label}</td>
                      <td style={{ padding: '10px 0', fontSize: 13, color: '#404040' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 48px', background: '#111111' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <img src={mascotImg} alt="ƐSおじさん mini" style={{ height: 56, width: 'auto', objectFit: 'contain', mixBlendMode: 'luminosity' }} />
          <Synapse01 height={56} style={{ mixBlendMode: 'luminosity' }} />
          <div>
            <p style={{ fontSize: 13, color: '#ffffff', fontWeight: 500, margin: 0 }}>ƐSおじさん & シナプスAI 01</p>
            <p style={{ fontSize: 10, color: '#737373', margin: 0 }}>ES Product Unofficial Mascots</p>
          </div>
        </div>
        <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#525252', margin: 0 }}>
          ES Product Unofficial Mascot
        </p>
      </footer>
    </div>
  );
}