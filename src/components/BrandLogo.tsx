import Link from 'next/link';

const basePath = process.env.NEXT_BASE_PATH || '';

export function BrandLogo() {
  return (
    <Link href="/" className="group inline-flex items-center" aria-label="Cohort CrowdFund home">
      <span className="relative inline-flex h-16 w-[260px] items-center overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-[0_14px_34px_-24px_rgba(0,100,210,.45)] transition group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_42px_-24px_rgba(0,100,210,.55)] sm:h-20 sm:w-[320px]">
        <img
          src={`${basePath}/logos/cohort-crowdfund-gpt2-top-left.png`}
          alt="Cohort CrowdFund, live lessons funded together"
          className="h-full w-full object-contain"
        />
      </span>
    </Link>
  );
}
