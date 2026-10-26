import Link from "next/link";

export default function OfficialLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative w-11 h-11 shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="46" stroke="#f59e0b" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="41" fill="#082f49" stroke="#06b6d4" strokeWidth="1.5" />
          <ellipse cx="50" cy="50" rx="18" ry="41" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
          <line x1="9" y1="50" x2="91" y2="50" stroke="#06b6d4" strokeWidth="1" opacity="0.7" />
          <path
            d="M 50 26 L 66 33 V 54 C 66 65 50 72 50 72 C 50 72 34 65 34 54 V 33 Z"
            fill="#d97706"
            stroke="#38bdf8"
            strokeWidth="1.8"
          />
          <path d="M 50 30 L 62 36 V 52 C 62 60 50 67 50 67 C 50 67 38 60 38 52 V 36 Z" fill="#0284c7" />
          <polygon points="50,38 52,43 58,43 53,47 55,52 50,49 45,52 47,47 42,43 48,43" fill="#fef08a" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-300 font-bold">
          Consular Mission
        </span>
        <span className="text-sm font-serif font-bold bg-gradient-to-r from-amber-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
          Diplomatic Portal
        </span>
      </div>
    </Link>
  );
}