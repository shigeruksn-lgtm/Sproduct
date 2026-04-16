import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Shirt, Scissors, User, Users, Check, ChevronDown, FileText, Tag, Ruler, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';

// ─── Types ───────────────────────────────────────────────────────────────────

type MainTab = 'customer' | 'styling';
type GenderTab = 'groom' | 'bride';
type OutfitNo = 1 | 2;
type StyleType = 'waso' | 'yoso'; // 和装 | 洋装

interface OutfitData {
  styleType: StyleType;
  // 共通
  color: string;
  rental: string;
  memo: string;
  // 洋装
  dressType: string;
  brand: string;
  size: string;
  train: string;
  accessories: string[];
  // 和装（共通）
  kimono: string;
  kimonoRental: string;
  obi: string;
  obiRental: string;
  obiColor: string;
  kamon: string;
  headpiece: string[];
  bodyMeasure: string;
  // 新婦和装追加
  kakeshita: string;
  kakeshitaRental: string;
  headCover: string;
  headCoverRental: string;
  accessoryType: string;
  accessoryTypeRental: string;
  accessoryFree: string;
}

interface MeasurementData {
  height: string;
  weight: string;
  neck: string;
  bust: string;
  underBust: string;
  waist: string;
  hip: string;
  shoeSize: string;
  inseam: string;
  shoulder: string;
  memo: string;
}

interface StylingData {
  hairStyle: string;
  hairColor: string;
  makeup: string;
  eyebrow: string;
  lash: string;
  nail: string;
  memo: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const defaultOutfit = (): OutfitData => ({
  styleType: 'waso',
  color: '',
  rental: 'rental',
  memo: '',
  dressType: '',
  brand: '',
  size: '',
  train: '',
  accessories: [],
  kimono: '',
  kimonoRental: 'rental',
  obi: '',
  obiRental: 'rental',
  obiColor: '',
  kamon: '',
  headpiece: [],
  bodyMeasure: '',
  kakeshita: '',
  kakeshitaRental: 'rental',
  headCover: '',
  headCoverRental: 'rental',
  accessoryType: '',
  accessoryTypeRental: 'rental',
  accessoryFree: '',
});

const defaultMeasurement = (): MeasurementData => ({
  height: '',
  weight: '',
  neck: '',
  bust: '',
  underBust: '',
  waist: '',
  hip: '',
  shoeSize: '',
  inseam: '',
  shoulder: '',
  memo: '',
});

const MOCK_MEASUREMENTS: Record<GenderTab, MeasurementData> = {
  bride: {
    height: '158',
    weight: '50',
    neck: '32',
    bust: '84',
    underBust: '70',
    waist: '64',
    hip: '90',
    shoeSize: '23.5',
    inseam: '',
    shoulder: '37',
    memo: '肩幅がやや広め',
  },
  groom: {
    height: '175',
    weight: '70',
    neck: '38',
    bust: '96',
    underBust: '',
    waist: '82',
    hip: '94',
    shoeSize: '26.5',
    inseam: '78',
    shoulder: '44',
    memo: '',
  },
};

const defaultStyling = (): StylingData => ({
  hairStyle: '',
  hairColor: '',
  makeup: '',
  eyebrow: '',
  lash: '',
  nail: '',
  memo: '',
});

const BRIDE_WASO_TYPES = ['白無垢', '色打掛', '引き振袖', '訪問着'];
const GROOM_WASO_TYPES = ['紋付袴（黒）', '紋付袴（色）', '羽織袴'];
const BRIDE_YOSO_TYPES = ['Aライン', 'マーメイド', 'プリンセス', 'エンパイア', 'ボールガウン', 'ミニ'];
const GROOM_YOSO_TYPES = ['タキシード', '燕尾服（イブニング）', 'モーニング', 'スーツ'];
const OBI_TYPES = ['丸帯', '袋帯', '名古屋帯', '半幅帯'];
const HEAD_COVER_OPTIONS = ['綿帽子', '角隠し'];
const ACCESSORY_TYPE_OPTIONS = ['小物一式', '単品'];
const HEADPIECES_GROOM = ['袴紐', '雪駄', '扇子'];
const ACCESSORIES_BRIDE = ['ベール', 'ティアラ', 'グローブ', 'ボレロ', 'ジュエリー', 'ガーター'];
const ACCESSORIES_GROOM = ['ポケットチーフ', 'タイ', 'カフスボタン', 'ブートニア'];
const SIZE_OPTIONS = ['5号', '7号', '9号', '11号', '13号', '15号', '17号', '19号'];
const GROOM_SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const TRAIN_OPTIONS = ['なし', 'ショート（~50cm）', 'ミディアム（50~100cm）', 'ロング（100cm~）', 'カテドラル'];
const RENTAL_OPTIONS = [{ value: 'rental', label: 'レンタル' }, { value: 'own', label: '持込' }, { value: 'purchase', label: '購入' }];
const HAIR_STYLES = ['アップスタイル', 'ハーフアップ', 'ダウンスタイル', 'ウェーブ', 'ストレート', '和髪'];
const MAKEUP_STYLES = ['ナチュラル', 'トレンド', 'ゴージャス', 'クラシック'];

// ─── Sub Components ───────────────────────────────────────────────────────────

function RentalBadges({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-1 flex-none">
      {RENTAL_OPTIONS.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-2 py-1 rounded text-xs font-medium border transition-all whitespace-nowrap ${
            value === opt.value
              ? 'bg-slate-700 text-white border-slate-700'
              : 'bg-white text-neutral-400 border-neutral-200 hover:border-neutral-400 hover:text-neutral-600'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function FieldWithRental({ label, rental, onRentalChange, children }: {
  label: string;
  rental: string;
  onRentalChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-neutral-500">{label}</label>
        <RentalBadges value={rental} onChange={onRentalChange} />
      </div>
      {children}
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-neutral-500">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition-all pr-8"
        >
          <option value="">{placeholder ?? '選択してください'}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
      </div>
    </div>
  );
}

function TextField({ label, value, onChange, placeholder, multiline }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; multiline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-neutral-500">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition-all resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition-all"
        />
      )}
    </div>
  );
}

function CheckboxGroup({ label, options, selected, onChange }: {
  label: string; options: string[]; selected: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt]);
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-neutral-500">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              selected.includes(opt)
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400'
            }`}
          >
            {selected.includes(opt) && <Check className="w-3 h-3" />}
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function RentalToggle({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-neutral-500">手配区分</label>
      <div className="flex gap-2">
        {RENTAL_OPTIONS.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
              value === opt.value
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Outfit Form ──────────────────────────────────────────────────────────────

function OutfitForm({
  outfit, onUpdate, gender
}: {
  outfit: OutfitData;
  onUpdate: (patch: Partial<OutfitData>) => void;
  gender: GenderTab;
}) {
  const isBride = gender === 'bride';
  const wasoTypes = isBride ? BRIDE_WASO_TYPES : GROOM_WASO_TYPES;
  const yosoTypes = isBride ? BRIDE_YOSO_TYPES : GROOM_YOSO_TYPES;
  const accessories = isBride ? ACCESSORIES_BRIDE : ACCESSORIES_GROOM;
  const headpieces = isBride ? HEADPIECES_GROOM : HEADPIECES_GROOM;
  const sizeOptions = isBride ? SIZE_OPTIONS : GROOM_SIZE_OPTIONS;

  return (
    <div className="flex flex-col gap-6">
      {/* 和装 / 洋装 切り替え */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-neutral-500">衣装区分</label>
        <div className="inline-flex p-1 bg-neutral-100 rounded-xl border border-neutral-200 w-fit gap-1">
          {[
            { key: 'waso' as StyleType, label: '和装', icon: '👘' },
            { key: 'yoso' as StyleType, label: '洋装', icon: '👗' },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => onUpdate({ styleType: key })}
              className={`relative px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                outfit.styleType === key
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              {outfit.styleType === key && (
                <motion.div
                  layoutId="styleTypeIndicator"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm"
                  style={{ zIndex: 0 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span>{icon}</span>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {outfit.styleType === 'yoso' ? (
          <motion.div
            key="yoso"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-5"
          >
            <SelectField
              label={isBride ? 'ドレスタイプ' : 'スーツ・タキシード種別'}
              value={outfit.dressType}
              onChange={v => onUpdate({ dressType: v })}
              options={yosoTypes}
            />
            <TextField
              label="ブランド / デザイナー"
              value={outfit.brand}
              onChange={v => onUpdate({ brand: v })}
              placeholder="例: VERA WANG"
            />
            <TextField
              label="カラー"
              value={outfit.color}
              onChange={v => onUpdate({ color: v })}
              placeholder="例: オフホワイト"
            />
            <SelectField
              label="サイズ"
              value={outfit.size}
              onChange={v => onUpdate({ size: v })}
              options={sizeOptions}
            />
            {isBride && (
              <SelectField
                label="トレーン"
                value={outfit.train}
                onChange={v => onUpdate({ train: v })}
                options={TRAIN_OPTIONS}
              />
            )}
            <RentalToggle value={outfit.rental} onChange={v => onUpdate({ rental: v })} />
            <CheckboxGroup
              label="小物・アクセサリー"
              options={accessories}
              selected={outfit.accessories}
              onChange={v => onUpdate({ accessories: v })}
            />
            <TextField
              label="備考"
              value={outfit.memo}
              onChange={v => onUpdate({ memo: v })}
              placeholder="特記事項、フィッティング日など"
              multiline
            />
          </motion.div>
        ) : (
          <motion.div
            key="waso"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-5"
          >
            {isBride ? (
              // ── 新婦 和装 ──
              <>
                {/* 種別 */}
                <FieldWithRental label="種別" rental={outfit.kimonoRental} onRentalChange={v => onUpdate({ kimonoRental: v })}>
                  <div className="relative">
                    <select
                      value={outfit.kimono}
                      onChange={e => onUpdate({ kimono: e.target.value })}
                      className="w-full appearance-none bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition-all pr-8"
                    >
                      <option value="">選択してください</option>
                      {BRIDE_WASO_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  </div>
                </FieldWithRental>

                {/* 柄 */}
                <FieldWithRental label="柄" rental={outfit.rental} onRentalChange={v => onUpdate({ rental: v })}>
                  <input
                    type="text"
                    value={outfit.color}
                    onChange={e => onUpdate({ color: e.target.value })}
                    placeholder="例: 鶴亀、松竹梅"
                    className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition-all"
                  />
                </FieldWithRental>

                {/* 帯の種類 */}
                <FieldWithRental label="帯の種類" rental={outfit.obiRental} onRentalChange={v => onUpdate({ obiRental: v })}>
                  <div className="relative">
                    <select
                      value={outfit.obi}
                      onChange={e => onUpdate({ obi: e.target.value })}
                      className="w-full appearance-none bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition-all pr-8"
                    >
                      <option value="">選択してください</option>
                      {OBI_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  </div>
                </FieldWithRental>

                {/* 帯の色 */}
                <TextField
                  label="帯の色"
                  value={outfit.obiColor}
                  onChange={v => onUpdate({ obiColor: v })}
                  placeholder="例: 金地、白"
                />

                {/* 掛下 */}
                <FieldWithRental label="掛下" rental={outfit.kakeshitaRental} onRentalChange={v => onUpdate({ kakeshitaRental: v })}>
                  <input
                    type="text"
                    value={outfit.kakeshita}
                    onChange={e => onUpdate({ kakeshita: e.target.value })}
                    placeholder="例: 白地・赤地など"
                    className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition-all"
                  />
                </FieldWithRental>

                {/* 綿帽子・角隠し */}
                <FieldWithRental label="綿帽子・角隠し" rental={outfit.headCoverRental} onRentalChange={v => onUpdate({ headCoverRental: v })}>
                  <div className="relative">
                    <select
                      value={outfit.headCover}
                      onChange={e => onUpdate({ headCover: e.target.value })}
                      className="w-full appearance-none bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition-all pr-8"
                    >
                      <option value="">選択してください</option>
                      {HEAD_COVER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  </div>
                </FieldWithRental>

                {/* 小物一式・単品 */}
                <FieldWithRental label="小物" rental={outfit.accessoryTypeRental} onRentalChange={v => onUpdate({ accessoryTypeRental: v })}>
                  <div className="relative">
                    <select
                      value={outfit.accessoryType}
                      onChange={e => onUpdate({ accessoryType: e.target.value })}
                      className="w-full appearance-none bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition-all pr-8"
                    >
                      <option value="">一式 / 単品</option>
                      {ACCESSORY_TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  </div>
                </FieldWithRental>

                {/* 小物詳細（フリー入力） */}
                <TextField
                  label="小物詳細"
                  value={outfit.accessoryFree}
                  onChange={v => onUpdate({ accessoryFree: v })}
                  placeholder="例: 草履・バッグ・かんざし"
                />

                {/* 備考 */}
                <TextField
                  label="備考"
                  value={outfit.memo}
                  onChange={v => onUpdate({ memo: v })}
                  placeholder="特記事項、着付け担当者など"
                  multiline
                />
              </>
            ) : (
              // ── 新郎 和装 ──
              <>
                <SelectField
                  label="種別"
                  value={outfit.kimono}
                  onChange={v => onUpdate({ kimono: v })}
                  options={GROOM_WASO_TYPES}
                />
                <TextField
                  label="柄"
                  value={outfit.color}
                  onChange={v => onUpdate({ color: v })}
                  placeholder="例: 白地、朱赤"
                />
                <SelectField
                  label="帯の種類"
                  value={outfit.obi}
                  onChange={v => onUpdate({ obi: v })}
                  options={OBI_TYPES}
                />
                <TextField
                  label="帯の色"
                  value={outfit.obiColor}
                  onChange={v => onUpdate({ obiColor: v })}
                  placeholder="例: 金地、白"
                />
                <TextField
                  label="家紋"
                  value={outfit.kamon}
                  onChange={v => onUpdate({ kamon: v })}
                  placeholder="例: 三つ巴"
                />
                <RentalToggle value={outfit.rental} onChange={v => onUpdate({ rental: v })} />
                <CheckboxGroup
                  label="小物"
                  options={HEADPIECES_GROOM}
                  selected={outfit.headpiece}
                  onChange={v => onUpdate({ headpiece: v })}
                />
                <TextField
                  label="備考"
                  value={outfit.memo}
                  onChange={v => onUpdate({ memo: v })}
                  placeholder="特記事項、着付け担当者など"
                  multiline
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Styling Form ─────────────────────────────────────────────────────────────

function StylingForm() {
  const [groomStyling, setGroomStyling] = useState<StylingData>(defaultStyling());
  const [brideStyling, setBrideStyling] = useState<StylingData>(defaultStyling());
  const [genderTab, setGenderTab] = useState<GenderTab>('bride');

  const styling = genderTab === 'bride' ? brideStyling : groomStyling;
  const setStyling = genderTab === 'bride' ? setBrideStyling : setGroomStyling;
  const update = (patch: Partial<StylingData>) => setStyling(s => ({ ...s, ...patch }));

  return (
    <div className="flex flex-col gap-6">
      {/* 新郎・新婦タブ */}
      <div className="flex gap-1 p-1 bg-neutral-100 rounded-xl border border-neutral-200 w-fit">
        {(['bride', 'groom'] as GenderTab[]).map(g => (
          <button
            key={g}
            onClick={() => setGenderTab(g)}
            className={`relative px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              genderTab === g ? 'bg-white text-slate-800 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            {g === 'bride' ? '新婦' : '新郎'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={genderTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="grid grid-cols-2 gap-x-6 gap-y-5"
        >
          {/* ヘア */}
          <div className="col-span-2">
            <SectionLabel icon={<Scissors className="w-4 h-4" />} label="ヘアスタイリング" />
          </div>
          <SelectField label="ヘアスタイル" value={styling.hairStyle} onChange={v => update({ hairStyle: v })} options={HAIR_STYLES} />
          <TextField label="カラー / ハイライト" value={styling.hairColor} onChange={v => update({ hairColor: v })} placeholder="例: ブラウン、ハイライトあり" />

          {/* メイク */}
          <div className="col-span-2 mt-2">
            <SectionLabel icon={<Tag className="w-4 h-4" />} label="メイクアップ" />
          </div>
          <SelectField label="メイクスタイル" value={styling.makeup} onChange={v => update({ makeup: v })} options={MAKEUP_STYLES} />
          <SelectField label="眉スタイル" value={styling.eyebrow} onChange={v => update({ eyebrow: v })} options={['ナチュラル', 'アーチ型', 'フラット', 'シャープ']} />
          <SelectField label="まつ毛" value={styling.lash} onChange={v => update({ lash: v })} options={['なし', 'つけまつ毛', 'まつエク（ナチュラル）', 'まつエク（ボリューム）']} />

          {genderTab === 'bride' && (
            <SelectField label="ネイル" value={styling.nail} onChange={v => update({ nail: v })} options={['なし', 'ワンカラー', 'アート', 'フレンチ', 'グラデーション']} />
          )}

          <div className="col-span-2 mt-2">
            <TextField label="特記事項・アレルギー・要望" value={styling.memo} onChange={v => update({ memo: v })} placeholder="アレルギーや特別な配慮が必要な場合はこちらに記入" multiline />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
      <span className="text-neutral-400">{icon}</span>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
    </div>
  );
}

// ─── Measurement Panel ────────────────────────────────────────────────────────

function MeasurementRow({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-neutral-100 last:border-0">
      <span className="text-xs text-neutral-500">{label}</span>
      <span className="text-sm font-medium text-slate-700">
        {value ? (
          <>{value}<span className="text-xs text-neutral-400 ml-0.5">{unit}</span></>
        ) : (
          <span className="text-neutral-300 text-xs">未入力</span>
        )}
      </span>
    </div>
  );
}

function MeasurementPanel({ gender }: { gender: GenderTab }) {
  const isBride = gender === 'bride';
  const m = MOCK_MEASUREMENTS[gender];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={gender}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -8 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-0"
      >
        {/* ヘッダー */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
            <Ruler className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-700">
              {isBride ? '新婦' : '新郎'}の基本情報
            </div>
            <div className="text-xs text-neutral-400">採寸・体型データ</div>
          </div>
        </div>

        {/* 体型データ */}
        <div className="bg-neutral-50 rounded-xl border border-neutral-150 px-4 py-1 mb-4">
          <MeasurementRow label="身長" value={m.height} unit="cm" />
          <MeasurementRow label="体重" value={m.weight} unit="kg" />
          <MeasurementRow label="肩幅" value={m.shoulder} unit="cm" />
          <MeasurementRow label="首周り" value={m.neck} unit="cm" />
          {isBride ? (
            <>
              <MeasurementRow label="バスト" value={m.bust} unit="cm" />
              <MeasurementRow label="アンダーバスト" value={m.underBust} unit="cm" />
            </>
          ) : (
            <MeasurementRow label="胸囲" value={m.bust} unit="cm" />
          )}
          <MeasurementRow label="ウエスト" value={m.waist} unit="cm" />
          <MeasurementRow label="ヒップ" value={m.hip} unit="cm" />
          {!isBride && <MeasurementRow label="股下" value={m.inseam} unit="cm" />}
          <MeasurementRow label="足のサイズ" value={m.shoeSize} unit="cm" />
        </div>

        {/* メモ */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-500">特記事項</label>
          <div className="min-h-[60px] bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-slate-600">
            {m.memo || <span className="text-neutral-300 text-xs">なし</span>}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Customer Outfit Tab ──────────────────────────────────────────────────────

function CustomerOutfitTab() {
  const [genderTab, setGenderTab] = useState<GenderTab>('bride');
  const [outfitNo, setOutfitNo] = useState<OutfitNo>(1);

  // outfits[gender][outfitNo]
  const [outfits, setOutfits] = useState<Record<GenderTab, Record<OutfitNo, OutfitData>>>({
    bride: { 1: defaultOutfit(), 2: defaultOutfit() },
    groom: { 1: defaultOutfit(), 2: defaultOutfit() },
  });

  const currentOutfit = outfits[genderTab][outfitNo];
  const updateOutfit = (patch: Partial<OutfitData>) => {
    setOutfits(prev => ({
      ...prev,
      [genderTab]: {
        ...prev[genderTab],
        [outfitNo]: { ...prev[genderTab][outfitNo], ...patch },
      },
    }));
  };

  // 完了バッジ：styleTypeが選択済みかチェック
  const isComplete = (g: GenderTab, n: OutfitNo) => {
    const o = outfits[g][n];
    return o.styleType && (o.color || o.dressType || o.kimono);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 顧客情報バー */}
      <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-5 py-3">
        <div className="flex items-center gap-3">
          <Users className="w-4 h-4 text-amber-600" />
          <div>
            <span className="text-xs text-amber-600 font-medium">対象カップル</span>
            <div className="text-sm font-semibold text-amber-900">山田 太郎 様 ・ 山田 花子 様</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-amber-700">
          <span>挙式日: 2026年10月17日 (土)</span>
          <span className="w-1 h-1 rounded-full bg-amber-400"></span>
          <span>会場: The Grand Ballroom</span>
        </div>
      </div>

      {/* 新郎・新婦タブ */}
      <div className="flex gap-1 p-1 bg-neutral-100 rounded-xl border border-neutral-200 w-fit">
        {([
          { key: 'bride' as GenderTab, label: '新婦', color: 'text-rose-500' },
          { key: 'groom' as GenderTab, label: '新郎', color: 'text-sky-600' },
        ]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setGenderTab(key)}
            className={`relative px-8 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              genderTab === key ? 'bg-white text-slate-800 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* 左右レイアウト: 衣装フォーム + 体型情報パネル */}
      <div className="flex gap-8 items-start">
        {/* 左: 着目セレクタ + 衣装フォーム */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {/* 着目セレクタ */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-neutral-500">着数</span>
            <div className="flex gap-2">
              {([1, 2] as OutfitNo[]).map(n => (
                <button
                  key={n}
                  onClick={() => setOutfitNo(n)}
                  className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                    outfitNo === n
                      ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                      : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {n}着目
                  {isComplete(genderTab, n) && (
                    <span className={`w-2 h-2 rounded-full ${outfitNo === n ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
                  )}
                </button>
              ))}
            </div>
            {!isComplete(genderTab, outfitNo) && (
              <div className="flex items-center gap-1.5 text-xs text-amber-600">
                <AlertCircle className="w-3.5 h-3.5" />
                未入力項目があります
              </div>
            )}
          </div>

          {/* 衣装フォーム */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${genderTab}-${outfitNo}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <OutfitForm
                outfit={currentOutfit}
                onUpdate={updateOutfit}
                gender={genderTab}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 右: 体型・基本情報パネル（固定） */}
        <div className="w-64 flex-none">
          <div className="sticky top-0 bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
            <MeasurementPanel gender={genderTab} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CostumeManagement() {
  const [mainTab, setMainTab] = useState<MainTab>('customer');

  const mainTabs: { key: MainTab; label: string; icon: React.ReactNode }[] = [
    { key: 'customer', label: 'お客様衣装情報', icon: <Shirt className="w-4 h-4" /> },
    { key: 'styling', label: 'スタイリング', icon: <Scissors className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col h-full bg-neutral-50" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      {/* ─── Header ─── */}
      <header className="flex-none px-8 py-5 bg-white border-b border-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <Link
            to="/home"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-700 transition-colors mb-4"
          >
            <ChevronLeft className="w-3 h-3" />
            ホームに戻る
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-neutral-200 bg-neutral-50 shadow-sm text-lg">
                👗
              </div>
              <div>
                <h1 className="text-2xl font-medium tracking-tight text-slate-900">衣装着用状況</h1>
                <p className="text-sm text-neutral-500 mt-0.5">新郎・新婦の衣装情報とスタイリング管理</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors shadow-sm">
                <FileText className="w-4 h-4" />
                PDF出力
              </button>
              <button className="flex items-center gap-2 px-5 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors shadow-sm">
                <Check className="w-4 h-4" />
                保存する
              </button>
            </div>
          </div>

          {/* メインタブ */}
          <div className="mt-6 flex gap-8 border-b border-neutral-100">
            {mainTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setMainTab(tab.key)}
                className={`relative pb-3 text-sm font-medium flex items-center gap-2 transition-colors ${
                  mainTab === tab.key ? 'text-slate-800' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <span className={mainTab === tab.key ? 'text-slate-700' : 'text-neutral-300'}>{tab.icon}</span>
                {tab.label}
                {mainTab === tab.key && (
                  <motion.div
                    layoutId="mainTabUnderline"
                    className="absolute left-0 right-0 bottom-[-1px] h-0.5 bg-slate-800"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ─── Body ─── */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto">
          <AnimatePresence mode="wait">
            {mainTab === 'customer' ? (
              <motion.div
                key="customer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8"
              >
                <CustomerOutfitTab />
              </motion.div>
            ) : (
              <motion.div
                key="styling"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8"
              >
                <StylingForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}