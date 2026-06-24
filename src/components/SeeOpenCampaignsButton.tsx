'use client';

import { ArrowRight } from 'lucide-react';

export function SeeOpenCampaignsButton() {
  function handleClick() {
    const campaigns = document.getElementById('sessions');
    if (!campaigns) return;

    campaigns.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `${window.location.pathname}#sessions`);

    window.setTimeout(() => {
      const heading = campaigns.querySelector('h2');
      if (heading instanceof HTMLElement) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    }, 500);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-mint px-5 py-3 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-[#006f45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
      aria-label="See open campaigns"
    >
      See open campaigns
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}
