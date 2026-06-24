import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Crown, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { sessions } from '@/lib/mock-data';
import { BrandLogo } from '@/components/BrandLogo';
import { CountdownTimer } from '@/components/CountdownTimer';
import { ScrollEffects } from '@/components/ScrollEffects';
import { SeeOpenCampaignsButton } from '@/components/SeeOpenCampaignsButton';
import { amountRaisedCents, formatCurrency, percentFunded, pledgeRankings, unlockedMilestones, uniqueBackerCount } from '@/lib/funding';
import type { Session } from '@/lib/types';

const modeLabels: Record<Session['campaignMode'], string> = {
  group_fund: 'Group funded',
  bonus_ladder: 'Get extra bonuses',
  top_bidder: 'Top bidder',
  hybrid: 'Hybrid',
};

function ModeBadge({ mode }: { mode: Session['campaignMode'] }) {
  return (
    <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
      {modeLabels[mode]}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-slate-200" aria-label={`${value}% funded`}>
      <div className="progress-fill h-full rounded-full bg-gradient-to-r from-violet via-coral to-mint" style={{ width: `${value}%` }} />
    </div>
  );
}

function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-mint px-5 py-3 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-[#006f45]">
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50">
      {children}
    </Link>
  );
}

function SessionCard({ session }: { session: Session }) {
  const raised = amountRaisedCents(session.pledges);
  const percent = percentFunded(session);
  const backers = uniqueBackerCount(session.pledges);
  const nextMilestone = unlockedMilestones(session.milestones, raised).find((milestone) => !milestone.unlocked);

  return (
    <Link href={`/sessions/${session.id}`} className="group scroll-card block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-stripe transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img src={session.coverImageUrl} alt="" className="parallax-image h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
        <div className="absolute left-4 top-4"><ModeBadge mode={session.campaignMode} /></div>
      </div>
      <div className="space-y-5 p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[.12em] text-coral">{session.topic}</p>
          <h3 className="mt-2 text-2xl font-bold leading-tight tracking-[-.025em] text-navy">{session.title}</h3>
          <p className="mt-2 text-sm font-medium text-slate-600">with {session.expert.name}</p>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{session.description}</p>
        </div>
        <ProgressBar value={percent} />
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xl font-bold text-navy">{percent}%</p><p className="text-slate-500">funded</p></div>
          <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xl font-bold text-navy">{backers}</p><p className="text-slate-500">backers</p></div>
          <div className="rounded-2xl bg-slate-50 p-3"><CountdownTimer deadline={session.deadline} compact /></div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="font-bold text-navy">{formatCurrency(raised)} raised</p>
          <p className="text-sm text-slate-500">Goal: {formatCurrency(session.fundingGoalCents)}</p>
          {nextMilestone ? <p className="mt-2 text-sm font-semibold text-coral">Next unlock: {nextMilestone.title}</p> : null}
        </div>
      </div>
    </Link>
  );
}

function AdvancedDemo() {
  const advanced = sessions.filter((session) => session.offerVersion === 'v2');
  return (
    <section id="advanced" className="relative overflow-hidden bg-white py-20 text-navy">
      <div className="vibrant-band absolute inset-x-0 top-0 h-2" />
      <div className="absolute -left-32 top-16 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
      <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-mint/20 blur-3xl" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-[-.035em] md:text-5xl">Make each lesson an event worth backing.</h2>
          <p className="mt-5 text-lg leading-8 text-graphite">Creators can add bonus ladders, hot seats, top-bidder prizes, and group-buy mechanics without making the first MVP confusing.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ['Get extra bonuses', 'More funding unlocks recordings, templates, extra Q&A, and bonus trainings for every backer.'],
            ['Top bidder prize', 'Highest or top-N backers can unlock a one-on-one, teardown, or private implementation review.'],
            ['Hybrid campaigns', 'Pool money to fund the lesson while limited premium slots make the offer richer.'],
          ].map(([title, body]) => (
            <div key={title} className="scroll-card rounded-3xl border border-sky/20 bg-ivory p-7 shadow-stripe">
              <div className="flex items-center gap-3">
                <Sparkles className="h-7 w-7 shrink-0 text-gold" />
                <h3 className="text-2xl font-bold tracking-[-.02em]">{title}</h3>
              </div>
              <p className="mt-4 leading-7 text-graphite">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {advanced.map((session) => {
            const raised = amountRaisedCents(session.pledges);
            const milestones = unlockedMilestones(session.milestones, raised);
            const topBid = pledgeRankings(session.pledges)[0]?.totalPledgedCents ?? 0;
            return (
              <div key={session.id} className="scroll-card rounded-3xl border border-gold/30 bg-white p-7 shadow-stripe">
                <div className="flex items-center justify-between gap-3"><ModeBadge mode={session.campaignMode} /></div>
                <h3 className="mt-5 text-3xl font-bold tracking-[-.03em]">{session.title}</h3>
                <div className="mt-6 space-y-3">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-start gap-3 rounded-2xl border border-sky/20 bg-ivory p-4">
                      <CheckCircle2 className={milestone.unlocked ? 'mt-1 h-5 w-5 shrink-0 text-mint' : 'mt-1 h-5 w-5 shrink-0 text-sky'} />
                      <div><p className="font-semibold">{milestone.title}</p><p className="text-sm leading-6 text-graphite">{milestone.description}</p></div>
                    </div>
                  ))}
                </div>
                {session.prizes.length ? (
                  <div className="mt-5 rounded-2xl border border-gold/30 bg-gold/10 p-5 text-center">
                    <div className="flex items-center justify-center gap-2 text-gold"><Crown className="h-5 w-5" /><p className="font-semibold">Top bidder prize</p></div>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-graphite">{session.prizes[0].description}</p>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-graphite">Custom funding pledges can show extra support and help qualify for special bonuses like the top contributor prize.</p>
                    <div className="mx-auto mt-4 grid max-w-md gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-gold/35 bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-[.16em] text-graphite">Current top bid</p>
                        <p className="mt-1 text-2xl font-bold text-gold">{formatCurrency(topBid)}</p>
                      </div>
                      <div className="rounded-2xl border border-sky/20 bg-white p-4">
                        <CountdownTimer deadline={session.deadline} label="Bid closes in" />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FundedEvents() {
  const fundedEvents = [
    {
      title: 'Tampa Referral Engine Workshop',
      date: 'Happening Thursday at 2:00 PM ET',
      summary: 'Funded by 42 local owners. New backers can still join the live room and replay.',
      levels: [
        ['Live seat', '$99', 'Available'],
        ['Swipe file bundle', '$299', '6 left'],
        ['Private implementation review', '$799', 'Sold out'],
      ],
    },
    {
      title: 'Owner Cash-Control Sprint',
      date: 'Happening next Tuesday at 11:00 AM ET',
      summary: 'Fully funded. The session is locked in, with a few remaining workshop seats open.',
      levels: [
        ['Workshop seat', '$129', 'Available'],
        ['Cash-flow toolkit', '$349', '3 left'],
        ['Bookkeeper question review', '$899', 'Sold out'],
      ],
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.16em] text-mint">Fully funded and happening</p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-.035em] md:text-5xl">Join events already locked in.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Like Kickstarter reward tiers, some higher-touch spots are capped. Once they sell out, new backers can still join the available levels.</p>
        </div>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {fundedEvents.map((event) => (
          <div key={event.title} className="scroll-card rounded-3xl border border-mint/20 bg-white p-7 shadow-stripe">
            <div className="inline-flex rounded-full bg-mint/10 px-3 py-1 text-xs font-bold uppercase tracking-[.14em] text-mint">Funded</div>
            <h3 className="mt-4 text-3xl font-bold tracking-[-.03em] text-navy">{event.title}</h3>
            <p className="mt-2 font-semibold text-coral">{event.date}</p>
            <p className="mt-3 leading-7 text-slate-600">{event.summary}</p>
            <div className="mt-6 space-y-3">
              {event.levels.map(([title, price, status]) => {
                const soldOut = status === 'Sold out';
                return (
                  <div key={title} className={`flex items-center justify-between gap-4 rounded-2xl border p-4 ${soldOut ? 'border-slate-200 bg-slate-50 text-slate-400' : 'border-slate-200 bg-white text-navy'}`}>
                    <div>
                      <p className="font-bold">{title}</p>
                      <p className="text-sm">{price}</p>
                    </div>
                    <span className={`inline-flex min-w-20 items-center justify-center rounded-full px-3 py-1 text-center text-xs font-bold ${soldOut ? 'bg-slate-200 text-slate-500' : 'bg-mint/10 text-mint'}`}>{status}</span>
                  </div>
                );
              })}
            </div>
            <SeeOpenCampaignsButton />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const featured = sessions[0];
  return (
    <main className="min-h-screen overflow-hidden bg-ivory text-navy">
      <ScrollEffects />
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <BrandLogo />
          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex"><a href="#sessions">Sessions</a><SecondaryButton href="/dashboard">Expert dashboard</SecondaryButton></div>
        </div>
      </nav>

      <section className="relative px-6 pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="vibrant-band absolute inset-x-0 top-0 h-2" />
        <div className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-sky/20 blur-[110px]" />
        <div className="absolute -left-24 top-28 h-56 w-56 rounded-full bg-coral/15 blur-3xl" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-mint/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
            <div className="reveal">
              <p className="inline-flex rounded-full border border-mint/25 bg-white px-4 py-2 text-sm font-semibold text-navy shadow-sm">Kickstarter-style live expert lessons</p>
              <h1 className="mt-7 max-w-5xl text-5xl font-bold leading-[1.02] tracking-[-.045em] text-navy md:text-6xl lg:text-7xl">Fund expert workshops together, only pay if the room fills.</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">Experts propose high-value live sessions. Backers pledge together. If the campaign funds, the session happens. If not, nobody pays.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><PrimaryButton href="#sessions">Explore sessions</PrimaryButton><SecondaryButton href="/dashboard">Start as an expert</SecondaryButton></div>
              <div className="mt-8 grid max-w-xl gap-3 text-sm text-slate-600 sm:grid-cols-3">
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-mint" /> Only pay if funded</div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4 text-violet" /> Back with a group</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-coral" /> Unlock live date</div>
              </div>
            </div>
            <div className="glass reveal scroll-card rounded-3xl p-5 shadow-stripe">
              <div className="rounded-3xl bg-white p-6 text-navy shadow-sm">
                <div className="flex items-center justify-between"><p className="text-sm font-bold uppercase tracking-[.14em] text-coral">Featured</p><Users className="h-5 w-5 text-violet" /></div>
                <h2 className="mt-10 text-4xl font-bold leading-tight tracking-[-.035em]">{featured.title}</h2>
                <p className="mt-4 leading-7 text-slate-600">A live operator workshop funded by the group.</p>
                <div className="mt-8"><ProgressBar value={percentFunded(featured)} /></div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4"><p className="text-2xl font-bold">{percentFunded(featured)}%</p><p className="text-sm text-slate-500">funded</p></div>
                  <div className="rounded-2xl bg-slate-50 p-4"><p className="text-2xl font-bold">{uniqueBackerCount(featured.pledges)}</p><p className="text-sm text-slate-500">backers</p></div>
                  <div className="rounded-2xl bg-slate-50 p-4"><CountdownTimer deadline={featured.deadline} compact /></div>
                </div>
                <div className="mt-6"><PrimaryButton href={`/sessions/${featured.id}`}>View campaign</PrimaryButton></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sessions" className="scroll-mt-24 mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><h2 className="text-4xl font-bold tracking-[-.035em] md:text-5xl">Live sessions seeking backers</h2></div>
          <div className="flex flex-wrap gap-2 text-sm font-semibold text-slate-600">{['AI', 'Sales', 'Acquisition', 'Operations'].map((item) => <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">{item}</span>)}</div>
        </div>
        <div className="mt-10 grid gap-7 lg:grid-cols-3">{sessions.map((session) => <SessionCard key={session.id} session={session} />)}</div>
      </section>

      <AdvancedDemo />

      <FundedEvents />

      <section className="mx-auto max-w-5xl px-6 pb-20 text-center">
        <div className="scroll-card rounded-[32px] border border-sky/20 bg-white p-8 shadow-stripe md:p-10">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-mint">For experts</p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-.03em] text-navy md:text-4xl">Want to launch your own funded workshop?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">Open the expert dashboard to draft a session, set pledge levels, and see how your campaign could fund before you teach.</p>
          <Link href="/dashboard" className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-mint px-6 py-3 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-[#006f45]">
            Go to expert dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500">Cohort CrowdFund, built as a marketplace for live expert lessons funded by the room.</footer>
    </main>
  );
}
