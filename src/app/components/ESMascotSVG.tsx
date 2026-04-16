export function ESMascotSVG({ size = 320 }: { size?: number }) {
  const ratio = 200 / 360;
  const w = size * ratio;
  const h = size;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 200 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ===== TOP HAT ===== */}
      {/* Crown */}
      <rect x="60" y="8" width="80" height="68" rx="6" fill="#222" />
      {/* Hat band */}
      <rect x="60" y="68" width="80" height="10" rx="2" fill="#C8A84B" />
      {/* Brim */}
      <rect x="40" y="76" width="120" height="14" rx="7" fill="#222" />

      {/* ===== HEAD ===== */}
      {/* Neck */}
      <rect x="88" y="148" width="24" height="20" rx="4" fill="#F2C98A" />

      {/* Head */}
      <ellipse cx="100" cy="122" rx="42" ry="46" fill="#F2C98A" />

      {/* ===== FACE FEATURES ===== */}

      {/* Eyebrows */}
      <path d="M72 100 Q80 95 88 100" stroke="#8B5E3C" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M112 100 Q120 95 128 100" stroke="#8B5E3C" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Eyes */}
      <ellipse cx="82" cy="112" rx="11" ry="11" fill="white" />
      <ellipse cx="118" cy="112" rx="11" ry="11" fill="white" />
      <circle cx="84" cy="113" r="7" fill="#222" />
      <circle cx="120" cy="113" r="7" fill="#222" />
      {/* Eye shine */}
      <circle cx="87" cy="110" r="2.5" fill="white" />
      <circle cx="123" cy="110" r="2.5" fill="white" />

      {/* Glasses */}
      <circle cx="82" cy="112" r="13" stroke="#5C3D1E" strokeWidth="2.5" fill="none" />
      <circle cx="118" cy="112" r="13" stroke="#5C3D1E" strokeWidth="2.5" fill="none" />
      {/* Bridge */}
      <path d="M95 112 Q100 108 105 112" stroke="#5C3D1E" strokeWidth="2" fill="none" />
      {/* Arms */}
      <line x1="69" y1="108" x2="58" y2="106" stroke="#5C3D1E" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="131" y1="108" x2="142" y2="106" stroke="#5C3D1E" strokeWidth="2.5" strokeLinecap="round" />

      {/* Nose */}
      <ellipse cx="100" cy="128" rx="6" ry="5" fill="#E0A86A" />

      {/* ===== KAISER MUSTACHE ===== */}
      {/* Main body */}
      <path
        d="M74 140 C74 133 82 129 90 133 C94 135 98 139 100 141 C102 139 106 135 110 133 C118 129 126 133 126 140 C126 145 121 148 115 146 C109 144 104 140 100 140 C96 140 91 144 85 146 C79 148 74 145 74 140Z"
        fill="#7A4F2D"
      />
      {/* Left upward curl */}
      <path
        d="M74 140 C68 136 62 128 60 120 C65 118 72 124 74 132 C74 136 74 138 74 140Z"
        fill="#7A4F2D"
      />
      {/* Right upward curl */}
      <path
        d="M126 140 C132 136 138 128 140 120 C135 118 128 124 126 132 C126 136 126 138 126 140Z"
        fill="#7A4F2D"
      />

      {/* Mouth */}
      <path d="M90 152 Q100 158 110 152" stroke="#C07A4A" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* ===== BODY / SUIT ===== */}
      {/* Main jacket */}
      <path
        d="M30 180 C30 168 50 160 70 158 L100 168 L130 158 C150 160 170 168 170 180 L168 300 L32 300 Z"
        fill="#1E2A4A"
      />

      {/* Left lapel */}
      <path d="M70 158 L52 188 L92 202 L100 168 Z" fill="#F0E6C8" />
      {/* Right lapel */}
      <path d="M130 158 L148 188 L108 202 L100 168 Z" fill="#F0E6C8" />

      {/* Shirt center */}
      <path d="M92 202 L100 228 L108 202 Q100 196 92 202Z" fill="#F0E6C8" />

      {/* Bow tie */}
      <path d="M92 170 L100 178 L108 170 L100 163 Z" fill="#C8392B" />
      <ellipse cx="100" cy="171" rx="5" ry="4" fill="#A52F23" />

      {/* Pocket square */}
      <rect x="140" y="192" width="16" height="14" rx="2" fill="#F0E6C8" />
      <path d="M140 192 L148 186 L156 192" fill="#C8A84B" />

      {/* Buttons */}
      <circle cx="100" cy="238" r="3.5" fill="#F0E6C8" opacity="0.4" />
      <circle cx="100" cy="252" r="3.5" fill="#F0E6C8" opacity="0.4" />
      <circle cx="100" cy="266" r="3.5" fill="#F0E6C8" opacity="0.4" />

      {/* ===== ARMS ===== */}
      {/* Left arm */}
      <path
        d="M30 180 C16 196 8 224 10 252 C10 262 18 266 26 264 C34 262 36 252 36 244 L52 210 Z"
        fill="#1E2A4A"
      />
      {/* Left cuff */}
      <rect x="8" y="252" width="28" height="14" rx="7" fill="#F0E6C8" />
      {/* Left hand */}
      <ellipse cx="20" cy="272" rx="14" ry="11" fill="#F2C98A" />

      {/* Right arm */}
      <path
        d="M170 180 C184 196 192 224 190 252 C190 262 182 266 174 264 C166 262 164 252 164 244 L148 210 Z"
        fill="#1E2A4A"
      />
      {/* Right cuff */}
      <rect x="164" y="252" width="28" height="14" rx="7" fill="#F0E6C8" />
      {/* Right hand */}
      <ellipse cx="180" cy="272" rx="14" ry="11" fill="#F2C98A" />

      {/* ===== LEGS ===== */}
      {/* Left leg */}
      <path d="M48 300 L40 348 L76 348 L78 300 Z" fill="#141E36" />
      {/* Right leg */}
      <path d="M152 300 L160 348 L124 348 L122 300 Z" fill="#141E36" />

      {/* ===== SHOES ===== */}
      {/* Left shoe */}
      <ellipse cx="56" cy="352" rx="24" ry="10" fill="#111" />
      {/* Right shoe */}
      <ellipse cx="144" cy="352" rx="24" ry="10" fill="#111" />
    </svg>
  );
}
