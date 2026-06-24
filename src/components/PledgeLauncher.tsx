'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Crown, X } from 'lucide-react';
import type { Session, Tier } from '@/lib/types';
import { formatCurrency, tierQuantityRemaining } from '@/lib/funding';

type PledgeLauncherProps = {
  session: Session;
};

function pledgeUrl(sessionId: string, tierId: string) {
  return `/pledge?session=${sessionId}&tier=${tierId}`;
}

function customPledgeUrl(sessionId: string, amount: string) {
  return `/pledge?session=${sessionId}&bid=${encodeURIComponent(amount)}`;
}

function tierSubline(tier: Tier, session: Session) {
  const remaining = tierQuantityRemaining(tier, session.pledges);
  if (remaining === null) return tier.description;
  return `${remaining} spots left. ${tier.description}`;
}

export function PledgeLauncher({ session }: PledgeLauncherProps) {
  const [open, setOpen] = useState(false);
  const [bid, setBid] = useState('1000');
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const topTier = useMemo(() => [...session.tiers].sort((a, b) => b.amountCents - a.amountCents)[0], [session.tiers]);
  const minimumTier = useMemo(() => [...session.tiers].sort((a, b) => a.amountCents - b.amountCents)[0], [session.tiers]);
  const safeBid = bid.trim() || String(Math.round(minimumTier.amountCents / 100));

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => closeButtonRef.current?.focus(), 30);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <>
      <div className="rounded-[30px] border border-gold/45 bg-gradient-to-br from-white via-gold/10 to-mint/10 p-5 shadow-[0_24px_80px_-44px_rgba(245,175,2,.65)] backdrop-blur-xl lg:sticky lg:top-24">
        <div className="flex items-center gap-2 text-gold">
          <Crown className="h-5 w-5" />
          <p className="text-sm font-semibold uppercase tracking-[.20em]">Ready when they are</p>
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-.045em]">Choose a level without losing your place.</h2>
        <p className="mt-3 text-sm leading-6 text-graphite">Open the pledge panel, pick a level, or enter a custom amount. The next action stays right where their eyes already are.</p>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-graphite">
          {session.tiers.map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-2xl border border-sky/20 bg-white px-3 py-3 text-left transition hover:border-gold/60 hover:bg-gold/10 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <span className="block font-semibold text-navy">{formatCurrency(tier.amountCents)}</span>
              <span className="mt-1 block truncate text-graphite">{tier.title}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-mint px-5 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-[#006f45] focus:outline-none focus:ring-2 focus:ring-mint focus:ring-offset-2 focus:ring-offset-white"
        >
          I am ready to join
        </button>
        <p className="mt-3 text-center text-xs font-semibold text-navy">$0 due today. Charged only if the session funds.</p>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 rounded-[24px] border border-gold/45 bg-white/92 p-4 text-left text-navy shadow-stripe backdrop-blur-xl transition hover:-translate-y-[52%] hover:border-gold/70 focus:outline-none focus:ring-2 focus:ring-gold lg:block"
        aria-label="Open pledge choices"
      >
        <span className="block text-xs font-semibold uppercase tracking-[.18em] text-gold">Ready?</span>
        <span className="mt-2 block text-base font-semibold">I am ready to join</span>
        <span className="mt-1 block text-xs font-semibold text-mint">Pick level or custom bid</span>
      </button>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed inset-x-4 bottom-4 z-40 inline-flex min-h-14 items-center justify-center rounded-full bg-mint px-5 text-base font-semibold text-white shadow-glow transition active:scale-[.98] lg:hidden"
      >
        I am ready to join
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/45 p-3 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="pledge-panel-title">
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Close pledge panel" onClick={() => setOpen(false)} />
          <div className="pledge-sheet relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[30px] border border-sky/20 bg-white p-4 text-navy shadow-[0_30px_120px_-42px_rgba(0,100,210,.48)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[.22em] text-gold">Pick your pledge</p>
                <h2 id="pledge-panel-title" className="mt-2 text-3xl font-semibold tracking-[-.045em]">One quick choice, then checkout.</h2>
                <p className="mt-2 text-sm leading-6 text-graphite">Choose a standard level or bid your own amount for top contributor status.</p>
              </div>
              <button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} className="rounded-full border border-sky/20 bg-ivory p-3 text-navy transition hover:bg-gold/10" aria-label="Close pledge panel">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {session.tiers.map((tier) => (
                <Link key={tier.id} href={pledgeUrl(session.id, tier.id)} className="group rounded-[22px] border border-sky/20 bg-ivory p-4 transition hover:-translate-y-1 hover:border-gold/70 hover:bg-gold/10 focus:outline-none focus:ring-2 focus:ring-gold">
                  <div className="flex items-start justify-between gap-3 md:block">
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-.03em]">{tier.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-graphite">{tierSubline(tier, session)}</p>
                    </div>
                    <p className="shrink-0 text-2xl font-semibold text-gold md:mt-3">{formatCurrency(tier.amountCents)}</p>
                  </div>
                  <span className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-mint px-4 text-sm font-semibold text-white transition group-hover:bg-[#006f45]">Choose this level</span>
                </Link>
              ))}
            </div>

            {session.prizes.length ? (
              <form action="/pledge" className="mt-4 rounded-[24px] border border-gold/45 bg-gold/10 p-5">
                <input type="hidden" name="session" value={session.id} />
                <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <label htmlFor="custom-bid" className="text-lg font-semibold text-gold">Or bid your own pledge</label>
                    <p className="mt-1 text-sm leading-6 text-graphite">A custom pledge qualifies for the highest level it reaches. {topTier ? `${formatCurrency(topTier.amountCents)} or more unlocks the top level.` : ''}</p>
                    <div className="mt-3 flex overflow-hidden rounded-2xl border border-gold/35 bg-white focus-within:ring-2 focus-within:ring-gold">
                      <span className="flex items-center px-4 text-gold">$</span>
                      <input id="custom-bid" name="bid" type="number" min="1" step="1" value={bid} onChange={(event) => setBid(event.target.value)} className="min-h-14 w-full bg-transparent px-2 text-lg font-semibold text-navy outline-none placeholder:text-graphite/40" />
                    </div>
                  </div>
                  <Link href={customPledgeUrl(session.id, safeBid)} className="inline-flex min-h-14 items-center justify-center rounded-full bg-mint px-6 font-semibold text-white transition hover:bg-[#006f45] focus:outline-none focus:ring-2 focus:ring-mint focus:ring-offset-2 focus:ring-offset-white">
                    Continue
                  </Link>
                </div>
              </form>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
