import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Crown, Lock, ShieldCheck } from 'lucide-react';
import { getSession } from '@/lib/mock-data';
import { amountRaisedCents, daysLeft, formatCurrency, percentFunded, pledgeRankings, tierQuantityRemaining, unlockedMilestones, uniqueBackerCount } from '@/lib/funding';

export default async function SessionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = getSession(id);
  if (!session) notFound();
  const raised = amountRaisedCents(session.pledges);
  const percent = percentFunded(session);
  const milestones = unlockedMilestones(session.milestones, raised);
  const rankings = pledgeRankings(session.pledges).slice(0, 5);

  return (
    <main className="min-h-screen bg-ink text-white">
      <nav className="border-b border-white/10 bg-ink/85 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between"><Link href="/" className="inline-flex items-center gap-2 text-sm text-white/65"><ArrowLeft className="h-4 w-4" />Back to sessions</Link><Link href="/dashboard" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">Expert dashboard</Link></div>
      </nav>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/5 shadow-stripe"><img src={session.coverImageUrl} alt="" className="h-[420px] w-full object-cover" /></div>
          <div className="mt-10 rounded-[30px] border border-white/10 bg-white/[0.045] p-8">
            <p className="text-sm font-semibold uppercase tracking-[.24em] text-gold">The story</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em]">What you will learn</h2>
            <p className="mt-5 text-lg leading-8 text-white/65">{session.description}</p>
          </div>
          <div className="mt-6 rounded-[30px] border border-white/10 bg-white/[0.045] p-8">
            <div className="flex items-center gap-4"><img src={session.expert.avatarUrl} alt="" className="h-16 w-16 rounded-full object-cover" /><div><p className="text-lg font-semibold">{session.expert.name}</p><p className="text-white/55">{session.expert.headline}</p></div></div>
            <p className="mt-5 text-white/65">{session.expert.bio}</p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-[34px] border border-white/10 bg-white/[0.06] p-7 shadow-stripe backdrop-blur-xl">
            <div className="flex flex-wrap gap-2"><span className="rounded-full bg-violet px-3 py-1 text-xs font-semibold">{session.offerVersion.toUpperCase()}</span><span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">{session.campaignMode.replace('_', ' ')}</span></div>
            <h1 className="mt-5 text-4xl font-semibold leading-none tracking-[-.055em] md:text-5xl">{session.title}</h1>
            <p className="mt-3 text-white/55">with {session.expert.name}</p>
            <div className="mt-7 h-3 overflow-hidden rounded-full bg-white/10"><div className="progress-fill h-full rounded-full bg-gradient-to-r from-coral via-gold to-mint" style={{ width: `${percent}%` }} /></div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-black/25 p-4"><p className="text-2xl font-semibold">{percent}%</p><p className="text-xs text-white/45">funded</p></div>
              <div className="rounded-2xl bg-black/25 p-4"><p className="text-2xl font-semibold">{uniqueBackerCount(session.pledges)}</p><p className="text-xs text-white/45">backers</p></div>
              <div className="rounded-2xl bg-black/25 p-4"><p className="text-2xl font-semibold">{daysLeft(session.deadline)}</p><p className="text-xs text-white/45">days left</p></div>
            </div>
            <p className="mt-5 text-lg font-semibold">{formatCurrency(raised)} raised of {formatCurrency(session.fundingGoalCents)}</p>
            <div className="mt-5 rounded-2xl border border-mint/25 bg-mint/10 p-4 text-sm text-mint"><ShieldCheck className="mb-2 h-5 w-5" />Your card is authorized today and charged only if this session funds.</div>
          </div>

          <div className="mt-6 space-y-4">
            {session.tiers.map((tier) => {
              const remaining = tierQuantityRemaining(tier, session.pledges);
              return (
                <div key={tier.id} className="rounded-[26px] border border-white/10 bg-white/[0.045] p-6 transition hover:bg-white/[0.075]">
                  <div className="flex items-start justify-between gap-4"><div><h3 className="text-2xl font-semibold tracking-[-.03em]">{tier.title}</h3><p className="mt-1 text-white/55">{tier.description}</p></div><p className="text-xl font-semibold text-gold">{formatCurrency(tier.amountCents)}</p></div>
                  <ul className="mt-4 space-y-2 text-sm text-white/65">{tier.perks.map((perk) => <li key={perk} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-mint" />{perk}</li>)}</ul>
                  {remaining !== null ? <p className="mt-4 text-sm text-coral">{remaining} spots remaining</p> : null}
                  <Link href={`/pledge?session=${session.id}&tier=${tier.id}`} className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 font-semibold text-ink">Back this session</Link>
                </div>
              );
            })}
          </div>

          {milestones.length ? (
            <div className="mt-6 rounded-[28px] border border-gold/40 bg-gold/10 p-6 shadow-stripe">
              <h3 className="text-xl font-semibold text-gold">Gold bonus ladder</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">Every gold-outlined bonus shows how close the room is to unlocking the next mouth-watering upgrade for all backers.</p>
              <div className="mt-4 space-y-4">
                {milestones.map((milestone) => {
                  const milestoneProgress = Math.min(100, Math.round((raised / milestone.thresholdCents) * 100));
                  return (
                    <div key={milestone.id} className="rounded-2xl border border-gold/45 bg-black/20 p-4 shadow-[0_0_35px_rgba(244,201,93,.10)]">
                      <div className="flex gap-3">
                        {milestone.unlocked ? <CheckCircle2 className="h-5 w-5 shrink-0 text-mint" /> : <Lock className="h-5 w-5 shrink-0 text-gold" />}
                        <div>
                          <p className="font-semibold text-gold">{milestone.title}</p>
                          <p className="mt-1 text-sm leading-6 text-white/65">{formatCurrency(milestone.thresholdCents)} unlock: {milestone.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-gold to-mint" style={{ width: `${milestoneProgress}%` }} /></div>
                      <p className="mt-2 text-xs font-semibold text-gold/85">{milestoneProgress}% of the way to this unlock</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {session.bonuses.length ? (
            <div className="mt-6 rounded-[28px] border border-gold/35 bg-white/[0.045] p-6">
              <h3 className="text-xl font-semibold text-gold">Bonus names built to sell</h3>
              <div className="mt-4 space-y-3">
                {session.bonuses.map((bonus) => (
                  <div key={bonus.id} className="rounded-2xl border border-gold/30 bg-gold/10 p-4">
                    <p className="font-semibold text-white">{bonus.title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/65">{bonus.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {session.prizes.length ? (
            <div className="mt-6 rounded-[28px] border border-gold/45 bg-gold/10 p-6 shadow-[0_0_35px_rgba(244,201,93,.10)]">
              <div className="flex items-center gap-2 text-gold"><Crown className="h-5 w-5" /><h3 className="text-xl font-semibold">Highest contributor gets extra bonuses</h3></div>
              <p className="mt-3 text-white/70">{session.prizes[0].description}</p>
              <div className="mt-4 space-y-2 text-sm">{rankings.map((rank) => <p key={rank.userId}>#{rank.rank} {rank.userName}: {formatCurrency(rank.totalPledgedCents)}</p>)}</div>
            </div>
          ) : null}
        </aside>
      </section>
    </main>
  );
}
