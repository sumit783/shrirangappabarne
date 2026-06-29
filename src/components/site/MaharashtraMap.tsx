// Stylized Maharashtra state silhouette with Maval Lok Sabha area highlighted.
// Not a survey-accurate map — used as a recognizable visual cue.

export function MaharashtraMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 460"
      className={className}
      role="img"
      aria-label="Maharashtra map with Maval Lok Sabha constituency highlighted"
    >
      <defs>
        <linearGradient id="saffronFill" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.18 50)" />
          <stop offset="100%" stopColor="oklch(0.58 0.21 38)" />
        </linearGradient>
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#7a2a00" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Maharashtra outline (stylized) */}
      <path
        d="M58 178
           C 70 150 95 130 125 122
           C 160 112 190 118 215 110
           C 245 100 270 80 305 78
           C 345 76 378 96 410 108
           C 442 120 472 118 500 132
           C 530 148 552 178 548 212
           C 545 240 522 258 510 282
           C 498 308 506 332 488 352
           C 468 374 432 380 402 388
           C 368 398 340 422 304 422
           C 268 422 240 402 208 392
           C 174 382 138 388 112 372
           C 86 356 70 326 64 296
           C 58 266 50 232 58 178 Z"
        fill="oklch(0.95 0.02 75)"
        stroke="oklch(0.78 0.06 60)"
        strokeWidth="1.5"
        filter="url(#softShadow)"
      />

      {/* Other district stipple */}
      <g fill="oklch(0.88 0.03 70)" opacity="0.8">
        <circle cx="140" cy="200" r="2" />
        <circle cx="180" cy="180" r="2" />
        <circle cx="220" cy="160" r="2" />
        <circle cx="260" cy="200" r="2" />
        <circle cx="200" cy="240" r="2" />
        <circle cx="320" cy="180" r="2" />
        <circle cx="360" cy="220" r="2" />
        <circle cx="400" cy="180" r="2" />
        <circle cx="440" cy="220" r="2" />
        <circle cx="380" cy="280" r="2" />
        <circle cx="280" cy="300" r="2" />
        <circle cx="220" cy="320" r="2" />
        <circle cx="160" cy="290" r="2" />
        <circle cx="320" cy="340" r="2" />
        <circle cx="420" cy="320" r="2" />
        <circle cx="470" cy="260" r="2" />
      </g>

      {/* Maval constituency highlight (Pune-Raigad junction area) */}
      <g filter="url(#softShadow)">
        <path
          d="M170 248
             C 178 232 198 224 222 226
             C 248 228 268 238 280 256
             C 290 274 282 294 264 304
             C 244 314 218 312 198 302
             C 178 292 162 268 170 248 Z"
          fill="url(#saffronFill)"
          stroke="oklch(0.45 0.18 35)"
          strokeWidth="1.5"
        />
      </g>

      {/* Pulse marker on Maval */}
      <g>
        <circle cx="225" cy="266" r="10" fill="oklch(0.58 0.21 38)" className="pulse-ring" />
        <circle cx="225" cy="266" r="6" fill="oklch(0.99 0.01 80)" />
        <circle cx="225" cy="266" r="3" fill="oklch(0.58 0.21 38)" />
      </g>

      {/* Callout */}
      <g>
        <line
          x1="225"
          y1="266"
          x2="380"
          y2="160"
          stroke="oklch(0.58 0.21 38)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <rect
          x="378"
          y="130"
          width="180"
          height="62"
          rx="10"
          fill="oklch(0.99 0.01 80)"
          stroke="oklch(0.58 0.21 38)"
          strokeWidth="1.5"
        />
        <text
          x="468"
          y="156"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill="oklch(0.45 0.18 35)"
          fontFamily="'Noto Serif Devanagari', serif"
        >
          मावळ लोकसभा
        </text>
        <text
          x="468"
          y="178"
          textAnchor="middle"
          fontSize="11"
          fill="oklch(0.35 0.04 50)"
          fontFamily="'Noto Sans Devanagari', sans-serif"
        >
          पुणे · रायगड · ६ विधानसभा
        </text>
      </g>
    </svg>
  );
}
