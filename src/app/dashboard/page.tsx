import Link from 'next/link';
import { Plus, Sparkles } from 'lucide-react';
import { sessions } from '@/lib/mock-data';
import { amountRaisedCents, formatCurrency, percentFunded, uniqueBackerCount } from '@/lib/funding';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-ivory px-6 py-10 text-navy">
      <div className="vibrant-band fixed inset-x-0 top-0 h-2" />
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4"><Link href="/" className="text-sm font-semibold text-graphite">Home</Link><button className="inline-flex items-center gap-2 rounded-full bg-mint px-5 py-3 font-semibold text-white shadow-glow"><Plus className="h-4 w-4" />New session</button></div>
        <section className="mt-10 rounded-[38px] border border-sky/20 bg-white p-8 shadow-stripe">
          <p className="text-sm font-semibold uppercase tracking-[.24em] text-coral">Expert dashboard</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-.06em]">Build a lesson campaign in two versions.</h1>
          <p className="mt-5 max-w-3xl text-lg text-graphite">Start with a clean Kickstarter-style group-funded session. Then optionally layer in bonus ladders, top-bidder prizes, and hybrid campaign mechanics.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {['Draft lesson', 'Set goal', 'Create tiers', 'Publish'].map((step, index) => <div key={step} className="rounded-2xl border border-sky/20 bg-ivory p-5"><p className="text-sm text-graphite">Step {index + 1}</p><p className="mt-2 font-semibold">{step}</p></div>)}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[34px] border border-sky/20 bg-white p-7 shadow-stripe">
            <Sparkles className="h-7 w-7 text-gold" />
            <h2 className="mt-5 text-3xl font-semibold tracking-[-.04em]">Campaign mode builder</h2>
            <div className="mt-6 space-y-3">
              {[
                ['Group Fund', 'Simple V1 mode. Everyone pools money to unlock the training.'],
                ['Bonus Ladder', 'More funding unlocks extra trainings and assets for everyone.'],
                ['Top Bidder', 'Highest or top-N backers win one-on-ones or teardown slots.'],
                ['Hybrid', 'Group funding plus bonuses plus limited premium prize slots.'],
              ].map(([title, body]) => <div key={title} className="rounded-2xl border border-sky/20 bg-ivory p-4"><p className="font-semibold">{title}</p><p className="mt-1 text-sm text-graphite">{body}</p></div>)}
            </div>
          </div>
          <div className="rounded-[34px] border border-sky/20 bg-white p-7 shadow-stripe">
            <h2 className="text-3xl font-semibold tracking-[-.04em]">Live progress</h2>
            <div className="mt-6 space-y-4">
              {sessions.map((session) => <div key={session.id} className="rounded-2xl border border-sky/20 bg-ivory p-5"><div className="flex items-center justify-between gap-3"><div><p className="font-semibold">{session.title}</p><p className="text-sm text-graphite">{session.campaignMode.replace('_', ' ')}</p></div><Link href={`/sessions/${session.id}`} className="rounded-full border border-mint/35 bg-white px-4 py-2 text-sm font-semibold">View</Link></div><div className="mt-4 h-2 rounded-full bg-sky/15"><div className="h-full rounded-full bg-gradient-to-r from-coral via-gold to-mint" style={{ width: `${percentFunded(session)}%` }} /></div><p className="mt-3 text-sm text-graphite">{formatCurrency(amountRaisedCents(session.pledges))} raised from {uniqueBackerCount(session.pledges)} backers</p></div>)}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
