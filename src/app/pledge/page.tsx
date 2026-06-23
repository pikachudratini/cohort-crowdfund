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
  const checkoutHref = `/pledge/checkout?session=${session.id}&tier=${tier.id}`;

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
              <div className="mt-6 rounded-2xl border border-mint/25 bg-mint/10 p-4 text-sm font-medium text-emerald-800">
                <ShieldCheck className="mb-2 h-5 w-5 text-mint" />
                Your card is authorized today and charged only if this session funds.
              </div>
            </div>
          </section>

          <aside className="rounded-[34px] border border-white/10 bg-white/[0.055] p-8 shadow-stripe">
            <CreditCard className="h-8 w-8 text-gold" />
            <h2 className="mt-5 text-2xl font-semibold">Safe all-or-nothing pledge</h2>
            <div className="mt-6 space-y-4 text-white/68">
              <p>You are charged only if the funding goal and minimum backer count are met by the deadline.</p>
              <p>If the session does not fund, the authorization is canceled and nothing is charged.</p>
              <p>This demo uses a mocked Stripe checkout screen so you can show the flow without entering a real card.</p>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/62">
              Safety: no live payment is captured in this demo. A production version would use Stripe Checkout or manual capture with real test/live keys.
            </div>
            <Link href={checkoutHref} className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-violet px-6 py-4 font-semibold text-white shadow-glow">Continue to Stripe mockup</Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
