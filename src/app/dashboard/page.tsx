import Link from 'next/link';
import { Plus, Sparkles } from 'lucide-react';
import { sessions } from '@/lib/mock-data';
import { amountRaisedCents, formatCurrency, percentFunded, uniqueBackerCount } from '@/lib/funding';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-ink px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4"><Link href="/" className="text-sm text-white/55">Home</Link><button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-ink"><Plus className="h-4 w-4" />New session</button></div>
        <section className="mt-10 rounded-[38px] border border-white/10 bg-white/[0.055] p-8 shadow-stripe">
          <p className="text-sm font-semibold uppercase tracking-[.24em] text-gold">Expert dashboard</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-.06em]">Build a lesson campaign in two versions.</h1>
          <p className="mt-5 max-w-3xl text-lg text-white/62">Start with a clean Kickstarter-style group-funded session. Then optionally layer in bonus ladders, top-bidder prizes, and hybrid campaign mechanics.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {['Draft lesson', 'Set goal', 'Create tiers', 'Publish'].map((step, index) => <div key={step} className="rounded-2xl bg-black/25 p-5"><p className="text-sm text-white/40">Step {index + 1}</p><p className="mt-2 font-semibold">{step}</p></div>)}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7">
            <Sparkles className="h-7 w-7 text-gold" />
            <h2 className="mt-5 text-3xl font-semibold tracking-[-.04em]">Campaign mode builder</h2>
            <div className="mt-6 space-y-3">
              {[
                ['Group Fund', 'Simple V1 mode. Everyone pools money to unlock the training.'],
                ['Bonus Ladder', 'More funding unlocks extra trainings and assets for everyone.'],
                ['Top Bidder', 'Highest or top-N backers win one-on-ones or teardown slots.'],
                ['Hybrid', 'Group funding plus bonuses plus limited premium prize slots.'],
              ].map(([title, body]) => <div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="font-semibold">{title}</p><p className="mt-1 text-sm text-white/55">{body}</p></div>)}
            </div>
          </div>
          <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7">
            <h2 className="text-3xl font-semibold tracking-[-.04em]">Live progress</h2>
            <div className="mt-6 space-y-4">
              {sessions.map((session) => <div key={session.id} className="rounded-2xl bg-black/25 p-5"><div className="flex items-center justify-between gap-3"><div><p className="font-semibold">{session.title}</p><p className="text-sm text-white/45">{session.campaignMode.replace('_', ' ')}</p></div><Link href={`/sessions/${session.id}`} className="rounded-full border border-white/10 px-4 py-2 text-sm">View</Link></div><div className="mt-4 h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-coral via-gold to-mint" style={{ width: `${percentFunded(session)}%` }} /></div><p className="mt-3 text-sm text-white/55">{formatCurrency(amountRaisedCents(session.pledges))} raised from {uniqueBackerCount(session.pledges)} backers</p></div>)}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
