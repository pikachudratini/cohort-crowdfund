import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, CreditCard, Lock, ShieldCheck, Trophy } from 'lucide-react';
import { getSession } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/funding';

export default async function MockStripeCheckout({ searchParams }: { searchParams: Promise<{ session?: string; tier?: string; amountCents?: string }> }) {
  const params = await searchParams;
  const session = params.session ? getSession(params.session) : undefined;
  if (!session) redirect('/');
  const tier = session.tiers.find((item) => item.id === params.tier) ?? session.tiers[0];
  const pledgeAmountCents = params.amountCents ? Math.max(100, Number(params.amountCents)) : tier.amountCents;
  const isCustomBid = pledgeAmountCents !== tier.amountCents;
  const successHref = `/pledge/success?session=${session.id}&amount=${pledgeAmountCents}`;

  return (
    <main className="min-h-screen bg-ivory px-4 py-8 text-navy md:px-6">
      <div className="vibrant-band fixed inset-x-0 top-0 h-2" />
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-slate-200 lg:grid-cols-[.88fr_1.12fr]">
        <aside className="bg-ivory p-8 md:p-10">
          <Link href={`/pledge?session=${session.id}&tier=${tier.id}&amountCents=${pledgeAmountCents}`} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="mt-12">
            <p className="text-sm font-medium text-slate-500">Payment mockup</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-.035em]">Authorize your pledge</h1>
            <p className="mt-2 text-slate-600">{session.title}</p>
          </div>
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{isCustomBid ? 'Custom pledge' : tier.title}</p>
                <p className="mt-1 text-sm text-slate-500">Qualifies for {tier.title}</p>
              </div>
              <p className="text-xl font-semibold">{formatCurrency(pledgeAmountCents)}</p>
            </div>
            {isCustomBid ? (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <Trophy className="mb-2 h-5 w-5" /> This custom pledge counts toward the highest contributor bonus.
              </div>
            ) : null}
            <div className="mt-5 border-t border-slate-200 pt-5">
              <div className="flex justify-between text-sm text-slate-500"><span>Due today</span><span>$0.00</span></div>
              <div className="mt-2 flex justify-between text-sm text-slate-500"><span>Authorized amount</span><span>{formatCurrency(pledgeAmountCents)}</span></div>
              <div className="mt-4 flex justify-between text-lg font-semibold"><span>Charged if funded</span><span>{formatCurrency(pledgeAmountCents)}</span></div>
            </div>
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
            <p><span className="font-semibold">Your card is authorized today.</span> You are charged only if the session funds. Demo mode: no real payment is processed.</p>
          </div>
        </aside>

        <section className="p-8 md:p-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg font-semibold"><CreditCard className="h-5 w-5" /> stripe</div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">TEST MODE</span>
          </div>

          <form action={successHref} className="mt-10 space-y-6">
            <label className="block text-sm font-medium text-slate-700">Email
              <input readOnly value="demo@example.com" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-violet/20 focus:ring-4" />
            </label>
            <label className="block text-sm font-medium text-slate-700">Card information
              <div className="mt-2 overflow-hidden rounded-xl border border-slate-300">
                <input readOnly value="4242 4242 4242 4242" className="w-full border-b border-slate-300 px-4 py-3 outline-none" />
                <div className="grid grid-cols-2">
                  <input readOnly value="12 / 34" className="border-r border-slate-300 px-4 py-3 outline-none" />
                  <input readOnly value="123" className="px-4 py-3 outline-none" />
                </div>
              </div>
            </label>
            <label className="block text-sm font-medium text-slate-700">Name on card
              <input readOnly value="Demo Backer" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none" />
            </label>
            <label className="block text-sm font-medium text-slate-700">Country or region
              <input readOnly value="United States" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none" />
            </label>

            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-mint px-6 py-4 font-semibold text-white shadow-glow transition hover:bg-[#006f45]">
              <Lock className="h-4 w-4" /> Authorize card pledge
            </button>

            <div className="relative py-1 text-center text-xs font-semibold uppercase tracking-[.18em] text-slate-400">
              <span className="relative z-10 bg-white px-3">or</span>
              <div className="absolute left-0 top-1/2 h-px w-full bg-slate-200" />
            </div>

            <Link href={successHref} className="flex w-full items-center justify-center rounded-xl border border-slate-300 bg-[#ffc439] px-6 py-4 text-lg font-bold text-[#003087] shadow-sm transition hover:bg-[#f2b600]">
              PayPal
            </Link>

            <p className="text-center text-xs leading-5 text-slate-500">
              This is a visual mockup for demos. In production, this step would be hosted by Stripe or PayPal Checkout and connected to manual capture.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
