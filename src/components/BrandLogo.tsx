import Link from 'next/link';

export function BrandLogo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="Cohort CrowdFund home">
      <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy text-white shadow-[0_16px_36px_-22px_rgba(15,23,42,.9)] ring-1 ring-slate-900/10">
        <svg viewBox="0 0 44 44" className="h-11 w-11" aria-hidden="true">
          <defs>
            <linearGradient id="ccfMark" x1="8" y1="6" x2="36" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#4f46e5" />
              <stop offset="0.52" stopColor="#ea580c" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="38" height="38" rx="15" fill="url(#ccfMark)" />
          <path d="M13 27.5c2.55-4.86 5.55-7.29 9-7.29s6.45 2.43 9 7.29" fill="none" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M16.2 17.7h11.6" fill="none" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="14" cy="29" r="2.7" fill="#fffaf0" />
          <circle cx="30" cy="29" r="2.7" fill="#fffaf0" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block text-lg font-black tracking-[-.045em] text-navy group-hover:text-slate-800">Cohort</span>
        <span className="block text-[11px] font-bold uppercase tracking-[.24em] text-slate-500">CrowdFund</span>
      </span>
    </Link>
  );
}
