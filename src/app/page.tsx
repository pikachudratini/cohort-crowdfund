import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Crown, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { sessions } from '@/lib/mock-data';
import { amountRaisedCents, daysLeft, formatCurrency, percentFunded, pledgeRankings, unlockedMilestones, uniqueBackerCount } from '@/lib/funding';
import type { Session } from '@/lib/types';

const modeLabels: Record<Session['campaignMode'], string> = {
  group_fund: 'Group funded',
  bonus_ladder: 'Bonus ladder',
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
    <Link href={href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-navy px-5 py-3 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-slate-800">
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
    <Link href={`/sessions/${session.id}`} className="group reveal block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-stripe transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img src={session.coverImageUrl} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
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
          <div className="rounded-2xl bg-slate-50 p-3"><p className="text-xl font-bold text-navy">{daysLeft(session.deadline)}</p><p className="text-slate-500">days</p></div>
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
    <section id="advanced" className="bg-navy py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-[-.035em] md:text-5xl">Make each lesson an event worth backing.</h2>
          <p className="mt-5 text-lg leading-8 text-white/72">Creators can add bonus ladders, hot seats, top-bidder prizes, and group-buy mechanics without making the first MVP confusing.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ['Bonus ladder', 'More funding unlocks recordings, templates, extra Q&A, and bonus trainings for every backer.'],
            ['Top bidder prize', 'Highest or top-N backers can unlock a one-on-one, teardown, or private implementation review.'],
            ['Hybrid campaigns', 'Pool money to fund the lesson while limited premium slots make the offer richer.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/[.06] p-7">
              <div className="flex items-center gap-3">
                <Sparkles className="h-7 w-7 shrink-0 text-gold" />
                <h3 className="text-2xl font-bold tracking-[-.02em]">{title}</h3>
              </div>
              <p className="mt-4 leading-7 text-white/70">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {advanced.map((session) => {
            const raised = amountRaisedCents(session.pledges);
            const milestones = unlockedMilestones(session.milestones, raised);
            const rankings = pledgeRankings(session.pledges).slice(0, 3);
            return (
              <div key={session.id} className="rounded-3xl border border-white/10 bg-white/[.06] p-7">
                <div className="flex items-center justify-between gap-3"><ModeBadge mode={session.campaignMode} /></div>
                <h3 className="mt-5 text-3xl font-bold tracking-[-.03em]">{session.title}</h3>
                <div className="mt-6 space-y-3">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4">
                      <CheckCircle2 className={milestone.unlocked ? 'mt-1 h-5 w-5 shrink-0 text-mint' : 'mt-1 h-5 w-5 shrink-0 text-white/28'} />
                      <div><p className="font-semibold">{milestone.title}</p><p className="text-sm leading-6 text-white/62">{formatCurrency(milestone.thresholdCents)}: {milestone.description}</p></div>
                    </div>
                  ))}
                </div>
                {session.prizes.length ? (
                  <div className="mt-5 rounded-2xl border border-gold/30 bg-gold/10 p-4">
                    <div className="flex items-center gap-2 text-gold"><Crown className="h-5 w-5" /><p className="font-semibold">Top bidder prize</p></div>
                    <p className="mt-2 text-sm leading-6 text-white/72">{session.prizes[0].description}</p>
                    <div className="mt-4 space-y-2 text-sm text-white/78">{rankings.map((rank) => <p key={rank.userId}>#{rank.rank} {rank.userName}: {formatCurrency(rank.totalPledgedCents)}</p>)}</div>
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

export default function HomePage() {
  const featured = sessions[0];
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-navy">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold tracking-[-.03em] text-navy">Cohort CrowdFund</Link>
          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex"><a href="#sessions">Sessions</a><SecondaryButton href="/dashboard">Expert dashboard</SecondaryButton></div>
        </div>
      </nav>

      <section className="relative px-6 py-20 md:py-28">
        <div className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-indigo-100 blur-[110px]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
            <div className="reveal">
              <p className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">Kickstarter for live expert lessons</p>
              <h1 className="mt-7 max-w-5xl text-5xl font-bold leading-[1.02] tracking-[-.045em] text-navy md:text-6xl lg:text-7xl">Fund expert workshops together, only pay if the room fills.</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">Experts propose high-value live sessions. Backers pledge together. If the campaign funds, the session happens. If not, nobody pays.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><PrimaryButton href="#sessions">Explore sessions</PrimaryButton><SecondaryButton href="/dashboard">Start as an expert</SecondaryButton></div>
              <div className="mt-8 grid max-w-xl gap-3 text-sm text-slate-600 sm:grid-cols-3">
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-mint" /> Card authorized only</div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4 text-violet" /> Back with a group</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-coral" /> Unlock live date</div>
              </div>
            </div>
            <div className="glass reveal rounded-3xl p-5 shadow-stripe">
              <div className="rounded-3xl bg-white p-6 text-navy shadow-sm">
                <div className="flex items-center justify-between"><p className="text-sm font-bold uppercase tracking-[.14em] text-coral">Featured</p><Users className="h-5 w-5 text-violet" /></div>
                <h2 className="mt-10 text-4xl font-bold leading-tight tracking-[-.035em]">{featured.title}</h2>
                <p className="mt-4 leading-7 text-slate-600">A live operator workshop funded by the group.</p>
                <div className="mt-8"><ProgressBar value={percentFunded(featured)} /></div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4"><p className="text-2xl font-bold">{percentFunded(featured)}%</p><p className="text-sm text-slate-500">funded</p></div>
                  <div className="rounded-2xl bg-slate-50 p-4"><p className="text-2xl font-bold">{uniqueBackerCount(featured.pledges)}</p><p className="text-sm text-slate-500">backers</p></div>
                  <div className="rounded-2xl bg-slate-50 p-4"><p className="text-2xl font-bold">{daysLeft(featured.deadline)}</p><p className="text-sm text-slate-500">days</p></div>
                </div>
                <div className="mt-6"><PrimaryButton href={`/sessions/${featured.id}`}>View campaign</PrimaryButton></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sessions" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><h2 className="text-4xl font-bold tracking-[-.035em] md:text-5xl">Live sessions seeking backers</h2></div>
          <div className="flex flex-wrap gap-2 text-sm font-semibold text-slate-600">{['AI', 'Sales', 'Acquisition', 'Operations'].map((item) => <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">{item}</span>)}</div>
        </div>
        <div className="mt-10 grid gap-7 lg:grid-cols-3">{sessions.map((session) => <SessionCard key={session.id} session={session} />)}</div>
      </section>

      <AdvancedDemo />

      <footer className="border-t border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500">Cohort CrowdFund, built as a two-version MVP: simple lesson crowdfunding first, advanced offer engine second.</footer>
    </main>
  );
}
