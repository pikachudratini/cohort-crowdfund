import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Crown, Lock } from 'lucide-react';
import { getSession } from '@/lib/mock-data';
import { CountdownTimer } from '@/components/CountdownTimer';
import { PledgeLauncher } from '@/components/PledgeLauncher';
import { ScrollEffects } from '@/components/ScrollEffects';
import { amountRaisedCents, formatCurrency, percentFunded, pledgeRankings, unlockedMilestones, uniqueBackerCount } from '@/lib/funding';

export default async function SessionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = getSession(id);
  if (!session) notFound();
  const raised = amountRaisedCents(session.pledges);
  const percent = percentFunded(session);
  const milestones = unlockedMilestones(session.milestones, raised);
  const topBid = pledgeRankings(session.pledges)[0]?.totalPledgedCents ?? 0;

  return (
    <main className="min-h-screen bg-ivory text-navy">
      <ScrollEffects />
      <nav className="border-b border-sky/15 bg-white/90 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between"><Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-graphite"><ArrowLeft className="h-4 w-4" />Back to sessions</Link><Link href="/dashboard" className="rounded-full bg-mint px-4 py-2 text-sm font-semibold text-white shadow-glow">Expert dashboard</Link></div>
      </nav>
      <div className="vibrant-band h-2" />
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div className="scroll-card mb-6 rounded-[30px] border border-sky/20 bg-white p-6 shadow-stripe backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[.22em] text-coral">Campaign details</p>
            <h1 className="mt-3 text-4xl font-semibold leading-none tracking-[-.055em] md:text-5xl">{session.title}</h1>
            <p className="mt-3 text-graphite">with {session.expert.name}</p>
          </div>
          <div className="overflow-hidden rounded-[34px] border border-sky/20 bg-white shadow-stripe"><img src={session.coverImageUrl} alt="" className="parallax-image h-[420px] w-full object-cover" /></div>
          <div className="scroll-card mt-10 rounded-[30px] border border-sky/20 bg-white p-8 shadow-stripe">
            <p className="text-sm font-semibold uppercase tracking-[.24em] text-coral">The story</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em]">What you will learn</h2>
            <p className="mt-5 text-lg leading-8 text-graphite">{session.description}</p>
          </div>
          <div className="scroll-card mt-6 rounded-[30px] border border-sky/20 bg-white p-8 shadow-stripe">
            <div className="flex items-center gap-4"><img src={session.expert.avatarUrl} alt="" className="h-16 w-16 rounded-full object-cover" /><div><p className="text-lg font-semibold">{session.expert.name}</p><p className="text-graphite">{session.expert.headline}</p></div></div>
            <p className="mt-5 text-graphite">{session.expert.bio}</p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="scroll-card rounded-[34px] border border-mint/25 bg-white p-7 shadow-stripe backdrop-blur-xl">
            <div className="flex flex-wrap gap-2"><span className="rounded-full border border-mint/25 bg-mint/10 px-3 py-1 text-xs font-semibold text-navy">{session.campaignMode.replace('_', ' ')}</span></div>
            <h2 className="mt-5 text-4xl font-semibold leading-none tracking-[-.055em] md:text-5xl">{session.title}</h2>
            <p className="mt-3 text-graphite">with {session.expert.name}</p>
            <div className="mt-7 h-3 overflow-hidden rounded-full bg-sky/15"><div className="progress-fill h-full rounded-full bg-gradient-to-r from-coral via-gold to-mint" style={{ width: `${percent}%` }} /></div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-ivory p-4"><p className="text-2xl font-semibold">{percent}%</p><p className="text-xs text-graphite">funded</p></div>
              <div className="rounded-2xl bg-ivory p-4"><p className="text-2xl font-semibold">{uniqueBackerCount(session.pledges)}</p><p className="text-xs text-graphite">backers</p></div>
              <div className="rounded-2xl bg-ivory p-4"><CountdownTimer deadline={session.deadline} compact /></div>
            </div>
            <p className="mt-5 text-lg font-semibold">{formatCurrency(raised)} raised of {formatCurrency(session.fundingGoalCents)}</p>
          </div>

          <div className="mt-6">
            <PledgeLauncher session={session} />
          </div>

          {milestones.length ? (
            <div className="scroll-card mt-6 rounded-[28px] border border-gold/40 bg-white p-6 shadow-stripe">
              <h3 className="text-xl font-semibold text-gold">Group bonus unlocks</h3>
              <p className="mt-2 text-sm leading-6 text-graphite">Each gold-outlined unlock shows how close the room is to adding another upgrade for every backer.</p>
              <div className="mt-4 space-y-4">
                {milestones.map((milestone) => {
                  const actualProgress = Math.min(100, Math.round((raised / milestone.thresholdCents) * 100));
                  const milestoneProgress = session.id === 'session-ai-loops' && milestone.sortOrder === 1 ? 89 : actualProgress;
                  return (
                    <div key={milestone.id} className="scroll-card rounded-2xl border border-gold/45 bg-ivory p-4 shadow-[0_0_35px_rgba(245,175,2,.16)]">
                      <div className="flex gap-3">
                        {milestone.unlocked ? <CheckCircle2 className="h-5 w-5 shrink-0 text-mint" /> : <Lock className="h-5 w-5 shrink-0 text-gold" />}
                        <div>
                          <p className="font-semibold text-gold">{milestone.title}</p>
                          <p className="mt-1 text-sm leading-6 text-graphite">{milestone.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-sky/15"><div className="h-full rounded-full bg-gradient-to-r from-gold to-mint" style={{ width: `${milestoneProgress}%` }} /></div>
                      <p className="mt-2 text-xs font-semibold text-gold/85">{milestoneProgress}% of the way to this unlock</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {session.bonuses.length ? (
            <div className="scroll-card mt-6 rounded-[28px] border border-sky/20 bg-white p-6 shadow-stripe">
              <h3 className="text-xl font-semibold text-gold">Included bonus tools</h3>
              <div className="mt-4 space-y-3">
                {session.bonuses.map((bonus) => (
                  <div key={bonus.id} className="scroll-card rounded-2xl border border-gold/30 bg-gold/10 p-4">
                    <p className="font-semibold text-navy">{bonus.title}</p>
                    <p className="mt-1 text-sm leading-6 text-graphite">{bonus.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {session.prizes.length ? (
            <div className="scroll-card mt-6 rounded-[28px] border border-gold/45 bg-gold/10 p-6 text-center shadow-[0_0_35px_rgba(245,175,2,.16)]">
              <div className="flex items-center justify-center gap-2 text-gold"><Crown className="h-5 w-5" /><h3 className="text-xl font-semibold">Highest contributor gets extra bonuses</h3></div>
              <p className="mx-auto mt-3 max-w-md text-graphite">{session.prizes[0].description}</p>
              <div className="mx-auto mt-5 grid max-w-md gap-3 sm:grid-cols-2">
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
        </aside>
      </section>
    </main>
  );
}
