export default function OopsLogWordmark() {
  return (
    <svg
      width="220"
      height="54"
      viewBox="0 0 220 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="oopsLog"
      role="img"
      className="h-12 w-auto"
    >
      <defs>
        <linearGradient
          id="oopslog-fill"
          x1="30"
          y1="10"
          x2="180"
          y2="42"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#17618B" />
          <stop offset="0.58" stopColor="#2B7BA8" />
          <stop offset="1" stopColor="#326800" />
        </linearGradient>
      </defs>

      <circle cx="22" cy="13" r="5.5" fill="#FFD709" />
      <circle cx="197" cy="39" r="5" fill="#ABF771" />

      <text
        x="110"
        y="37"
        textAnchor="middle"
        fill="url(#oopslog-fill)"
        fontFamily="'Super Kidpop', cursive"
        fontSize="34"
        letterSpacing="0.8"
        stroke="#EAF4FF"
        strokeWidth="1.6"
        paintOrder="stroke"
      >
        oopsLog
      </text>
    </svg>
  );
}
