import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react';
import { getSession } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/funding';

export default async function PledgePage({ searchParams }: { searchParams: Promise<{ session?: string; tier?: string }> }) {
  const params = await searchParams;
  const session = params.session ? getSession(params.session) : undefined;
  if (!session) redirect('/');
  const tier = session.tiers.find((item) => item.id === params.tier) ?? session.tiers[0];

  return (
    <main className="min-h-screen bg-ink px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Link href={`/sessions/${session.id}`} className="text-sm text-white/55">Back to session</Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_.85fr]">
          <section className="rounded-[34px] border border-white/10 bg-white/[0.055] p-8 shadow-stripe">
            <p className="text-sm font-semibold uppercase tracking-[.24em] text-gold">Pledge confirmation</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-.055em]">Back {session.title}</h1>
            <div className="mt-8 rounded-[28px] bg-ivory p-6 text-navy">
              <p className="text-sm uppercase tracking-[.2em] text-coral">Selected tier</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">{tier.title}</h2>
              <p className="mt-2 text-navy/65">{tier.description}</p>
              <p className="mt-5 text-4xl font-semibold">{formatCurrency(tier.amountCents)}</p>
              <ul className="mt-5 space-y-2">{tier.perks.map((perk) => <li key={perk} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-mint" />{perk}</li>)}</ul>
            </div>
          </section>

          <aside className="rounded-[34px] border border-white/10 bg-white/[0.055] p-8 shadow-stripe">
            <CreditCard className="h-8 w-8 text-gold" />
            <h2 className="mt-5 text-2xl font-semibold">Safe all-or-nothing pledge</h2>
            <div className="mt-6 space-y-4 text-white/68">
              <p>Your card is authorized today using Stripe manual capture.</p>
              <p>You are charged only if the funding goal and minimum backer count are met by the deadline.</p>
              <p>If the session does not fund, the authorization is canceled and nothing is charged.</p>
            </div>
            <div className="mt-6 rounded-2xl border border-mint/25 bg-mint/10 p-4 text-sm text-mint"><ShieldCheck className="mb-2 h-5 w-5" />MVP uses test-safe mocked Stripe unless real keys are configured.</div>
            <form action="/api/pledges" className="mt-6" method="post">
              <input type="hidden" name="sessionId" value={session.id} />
              <input type="hidden" name="tierId" value={tier.id} />
              <button className="w-full rounded-full bg-violet px-6 py-4 font-semibold text-white shadow-glow">Authorize pledge</button>
            </form>
          </aside>
        </div>
      </div>
    </main>
  );
}
