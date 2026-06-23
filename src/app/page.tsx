import Link from 'next/link';
import { CheckCircle2, Crown, Sparkles, Users } from 'lucide-react';
import { sessions } from '@/lib/mock-data';
import { amountRaisedCents, daysLeft, formatCurrency, percentFunded, pledgeRankings, unlockedMilestones, uniqueBackerCount } from '@/lib/funding';
import type { Session } from '@/lib/types';

function ModeBadge({ mode }: { mode: Session['campaignMode'] }) {
  const label = {
    group_fund: 'Group fund',
    bonus_ladder: 'Bonus ladder',
    top_bidder: 'Top bidder',
    hybrid: 'Hybrid',
  }[mode];
  return <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">{label}</span>;
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-white/10" aria-label={`${value}% funded`}>
      <div className="progress-fill h-full rounded-full bg-gradient-to-r from-coral via-gold to-mint" style={{ width: `${value}%` }} />
    </div>
  );
}

function SessionCard({ session }: { session: Session }) {
  const raised = amountRaisedCents(session.pledges);
  const percent = percentFunded(session);
  const backers = uniqueBackerCount(session.pledges);
  const nextMilestone = unlockedMilestones(session.milestones, raised).find((milestone) => !milestone.unlocked);

  return (
    <Link href={`/sessions/${session.id}`} className="group reveal overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] shadow-stripe transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">
      <div className="relative h-56 overflow-hidden">
        <img src={session.coverImageUrl} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2"><ModeBadge mode={session.campaignMode} /></div>
      </div>
      <div className="space-y-5 p-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[.22em] text-gold/90">{session.topic}</p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-.04em] text-white">{session.title}</h3>
          <p className="mt-2 text-sm text-white/60">with {session.expert.name}</p>
        </div>
        <ProgressBar value={percent} />
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div><p className="text-lg font-semibold text-white">{percent}%</p><p className="text-white/45">funded</p></div>
          <div><p className="text-lg font-semibold text-white">{backers}</p><p className="text-white/45">backers</p></div>
          <div><p className="text-lg font-semibold text-white">{daysLeft(session.deadline)}</p><p className="text-white/45">days left</p></div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-white">{formatCurrency(raised)} raised</p>
          <p className="text-sm text-white/55">Goal: {formatCurrency(session.fundingGoalCents)}</p>
          {nextMilestone ? <p className="mt-2 text-xs text-gold">Next unlock: {nextMilestone.title}</p> : null}
        </div>
      </div>
    </Link>
  );
}

function AdvancedDemo() {
  const advanced = sessions.filter((session) => session.offerVersion === 'v2');
  return (
    <section id="advanced" className="bg-ivory py-24 text-navy">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[.24em] text-coral">Version 2 concept</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] md:text-6xl">Then make each lesson an event worth backing.</h2>
          <p className="mt-6 text-lg text-navy/65">After the simple version lands, campaign creators can add bonus ladders, limited hot seats, top-bidder prizes, and hybrid group-buy mechanics.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            ['Bonus ladder', 'More funding unlocks recordings, templates, extra Q&A, and bonus trainings for every backer.'],
            ['Top bidder prize', 'Highest or top-N backers can unlock a one-on-one, teardown, or private implementation review.'],
            ['Hybrid campaigns', 'Pool money to fund the lesson while limited premium slots make the offer richer.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-[28px] border border-navy/10 bg-white p-7 shadow-stripe">
              <Sparkles className="h-7 w-7 text-violet" />
              <h3 className="mt-5 text-2xl font-semibold tracking-[-.03em]">{title}</h3>
              <p className="mt-3 text-navy/65">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {advanced.map((session) => {
            const raised = amountRaisedCents(session.pledges);
            const milestones = unlockedMilestones(session.milestones, raised);
            const rankings = pledgeRankings(session.pledges).slice(0, 3);
            return (
              <div key={session.id} className="rounded-[32px] bg-navy p-7 text-white shadow-stripe">
                <div className="flex items-center justify-between gap-3"><ModeBadge mode={session.campaignMode} /><span className="text-sm text-white/50">V2 preview</span></div>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-.04em]">{session.title}</h3>
                <div className="mt-6 space-y-3">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <CheckCircle2 className={milestone.unlocked ? 'mt-1 h-5 w-5 text-mint' : 'mt-1 h-5 w-5 text-white/25'} />
                      <div><p className="font-semibold">{milestone.title}</p><p className="text-sm text-white/55">{formatCurrency(milestone.thresholdCents)}: {milestone.description}</p></div>
                    </div>
                  ))}
                </div>
                {session.prizes.length ? (
                  <div className="mt-5 rounded-2xl border border-gold/30 bg-gold/10 p-4">
                    <div className="flex items-center gap-2 text-gold"><Crown className="h-5 w-5" /><p className="font-semibold">Top bidder prize</p></div>
                    <p className="mt-2 text-sm text-white/70">{session.prizes[0].description}</p>
                    <div className="mt-4 space-y-2 text-sm">{rankings.map((rank) => <p key={rank.userId}>#{rank.rank} {rank.userName}: {formatCurrency(rank.totalPledgedCents)}</p>)}</div>
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
  return (
    <main className="min-h-screen overflow-hidden bg-ink">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-ink/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-[-.04em]">Cohort CrowdFund</Link>
          <div className="hidden items-center gap-8 text-sm text-white/65 md:flex"><a href="#sessions">Sessions</a><a href="#advanced">V2 concept</a><Link href="/dashboard" className="rounded-full bg-white px-4 py-2 font-medium text-ink">Expert dashboard</Link></div>
        </div>
      </nav>

      <section className="relative px-6 py-24 md:py-32">
        <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-violet/25 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_.96fr]">
            <div className="reveal">
              <p className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/70">Kickstarter for live expert lessons</p>
              <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[.92] tracking-[-.075em] text-white md:text-7xl lg:text-8xl">Fund the expert session your team could never afford alone.</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62 md:text-xl">Experts propose high-value live sessions. Backers pledge together. If the room funds, the session happens. If not, nobody pays.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#sessions" className="rounded-full bg-violet px-6 py-4 text-center font-semibold text-white shadow-glow">Explore live sessions</a><Link href="/dashboard" className="rounded-full border border-white/15 px-6 py-4 text-center font-semibold text-white">Start as an expert</Link></div>
            </div>
            <div className="glass reveal rounded-[36px] p-5 shadow-stripe">
              <div className="rounded-[28px] bg-ivory p-5 text-navy">
                <div className="flex items-center justify-between"><p className="text-sm font-semibold uppercase tracking-[.18em] text-coral">Featured</p><Users className="h-5 w-5" /></div>
                <h2 className="mt-12 text-4xl font-semibold leading-none tracking-[-.06em]">AI Agent Loops for Startup Operators</h2>
                <p className="mt-4 text-navy/60">A live operator workshop funded by the group.</p>
                <div className="mt-8"><ProgressBar value={percentFunded(sessions[0])} /></div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white p-4"><p className="text-2xl font-semibold">{percentFunded(sessions[0])}%</p><p className="text-sm text-navy/55">funded</p></div>
                  <div className="rounded-2xl bg-white p-4"><p className="text-2xl font-semibold">{uniqueBackerCount(sessions[0].pledges)}</p><p className="text-sm text-navy/55">backers</p></div>
                  <div className="rounded-2xl bg-white p-4"><p className="text-2xl font-semibold">{daysLeft(sessions[0].deadline)}</p><p className="text-sm text-navy/55">days</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sessions" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><p className="text-sm font-semibold uppercase tracking-[.24em] text-gold">Version 1 demo</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.055em] md:text-6xl">Live sessions seeking backers</h2></div>
          <div className="flex flex-wrap gap-2 text-sm text-white/70">{['AI', 'Sales', 'Acquisition', 'Operations'].map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{item}</span>)}</div>
        </div>
        <div className="mt-10 grid gap-7 lg:grid-cols-3">{sessions.map((session) => <SessionCard key={session.id} session={session} />)}</div>
      </section>

      <AdvancedDemo />

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-white/45">Cohort CrowdFund, built as a two-version MVP: simple lesson crowdfunding first, advanced offer engine second.</footer>
    </main>
  );
}
