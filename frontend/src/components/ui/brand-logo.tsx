export function BrandLogo({
  variant: _variant = "dark",
  compact = false,
  size = "md",
}: {
  variant?: "dark" | "light";
  compact?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const sizing = {
    xs: {
      wrap: "rounded-[14px]",
      art: "w-[124px]",
    },
    sm: {
      wrap: "rounded-[16px]",
      art: "w-[148px]",
    },
    md: {
      wrap: "rounded-[18px]",
      art: "w-[174px]",
    },
    lg: {
      wrap: "rounded-[22px]",
      art: "w-[226px]",
    },
  }[size];

  return (
    <div className={`inline-flex overflow-hidden ${sizing.wrap}`}>
      <svg
        viewBox="0 0 174 88"
        className={sizing.art}
        role="img"
        aria-label="Beyond Borders"
      >
        <defs>
          <linearGradient id="bb-ocean" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5f86e9" />
            <stop offset="55%" stopColor="#3552f0" />
            <stop offset="100%" stopColor="#2340d8" />
          </linearGradient>
        </defs>
        <rect width="174" height="88" rx="18" fill="#21378c" />
        <text
          x="87"
          y="25"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="20"
          fontWeight="900"
          letterSpacing="-0.8"
        >
          BEYOND
        </text>
        <text
          x="87"
          y="52"
          textAnchor="middle"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1"
          fontSize="18"
          fontWeight="500"
          letterSpacing="1"
        >
          BORDERS
        </text>
        <path
          d="M28 103 C52 54, 122 54, 148 103 Z"
          fill="url(#bb-ocean)"
          opacity="0.98"
        />
        <path d="M40 86 C56 60, 118 60, 134 86" fill="none" stroke="#101522" strokeWidth="1.1" opacity="0.9" />
        <path d="M28 88 C50 50, 124 50, 146 88" fill="none" stroke="#101522" strokeWidth="1.1" opacity="0.9" />
        <path d="M18 90 C46 40, 128 40, 156 90" fill="none" stroke="#101522" strokeWidth="1.1" opacity="0.9" />
        <path d="M87 38 C82 54, 81 70, 82 90" fill="none" stroke="#101522" strokeWidth="1.1" opacity="0.9" />
        <path d="M66 43 C61 57, 58 72, 56 90" fill="none" stroke="#101522" strokeWidth="1.1" opacity="0.9" />
        <path d="M108 43 C113 57, 116 72, 118 90" fill="none" stroke="#101522" strokeWidth="1.1" opacity="0.9" />
        <path d="M41 74 C52 71, 61 72, 68 77 C76 84, 82 81, 89 75 C95 71, 104 70, 112 74 C119 78, 126 77, 132 71 C138 66, 146 67, 152 74 L152 88 L41 88 Z" fill="#7ea0ef" opacity="0.95" />
        <path d="M72 66 C76 62, 82 64, 83 70 C84 75, 90 77, 91 82 C92 87, 88 90, 83 89 C78 88, 75 83, 74 78 C73 74, 68 70, 72 66 Z" fill="#2f4eee" opacity="0.95" />
        <path d="M120 72 C126 67, 133 68, 136 75 C138 80, 143 81, 145 86 C147 90, 143 92, 138 92 C133 91, 130 87, 129 83 C128 78, 121 77, 120 72 Z" fill="#94b1f5" opacity="0.95" />
        {!compact && (
          <text
            x="87"
            y="82"
            textAnchor="middle"
            fill="rgba(255,255,255,0.85)"
            fontSize="4.5"
            fontWeight="700"
            letterSpacing="1.8"
          >
            HUMANITARIAN IDENTITY PLATFORM
          </text>
        )}
      </svg>
    </div>
  );
}
