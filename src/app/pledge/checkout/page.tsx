import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, CreditCard, ShieldCheck, Trophy } from 'lucide-react';
import { PaymentMethodChooser } from '@/components/PaymentMethodChooser';
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
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-slate-200">
        <div className="grid lg:grid-cols-[1.16fr_.84fr]">
          <section className="p-8 md:p-10">
            <Link href={`/pledge?session=${session.id}&tier=${tier.id}&amountCents=${pledgeAmountCents}`} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Secure payment mockup</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-.035em]">Enter your details</h1>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">TEST MODE</span>
            </div>

            <form action={successHref} className="mt-8 space-y-7">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">Name
                  <input readOnly value="Demo Backer" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-violet/20 focus:ring-4" />
                </label>
                <label className="block text-sm font-medium text-slate-700">Email
                  <input readOnly value="demo@example.com" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-violet/20 focus:ring-4" />
                </label>
                <label className="block text-sm font-medium text-slate-700 md:col-span-2">Country or region
                  <input readOnly value="United States" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none" />
                </label>
              </div>

              <PaymentMethodChooser successHref={successHref} />

              <div className="rounded-3xl border border-slate-200 bg-ivory p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[.16em] text-graphite">Review pledge</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-.03em]">{isCustomBid ? 'Custom pledge' : tier.title}</h2>
                    <p className="mt-1 text-sm text-graphite">{session.title}</p>
                    <p className="mt-1 text-sm text-slate-500">Qualifies for {tier.title}</p>
                  </div>
                  <p className="text-3xl font-semibold text-navy">{formatCurrency(pledgeAmountCents)}</p>
                </div>
                {isCustomBid ? (
                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    <Trophy className="mt-0.5 h-5 w-5 shrink-0" />
                    <p>This custom pledge counts toward the highest contributor bonus.</p>
                  </div>
                ) : null}
                <div className="mt-5 border-t border-slate-200 pt-5">
                  <div className="flex justify-between text-sm text-slate-500"><span>Due today</span><span>$0.00</span></div>
                  <div className="mt-2 flex justify-between text-sm text-slate-500"><span>Authorized hold</span><span>{formatCurrency(pledgeAmountCents)}</span></div>
                  <div className="mt-4 flex justify-between text-lg font-semibold"><span>Charged if lesson is funded</span><span>{formatCurrency(pledgeAmountCents)}</span></div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                <p><span className="font-semibold">This creates an authorized hold.</span> You are not charged unless the lesson funds. Demo mode: no real payment is processed.</p>
              </div>

            </form>
          </section>

          <aside className="bg-ivory p-8 md:p-10">
            <div className="flex items-center gap-2 text-lg font-semibold"><CreditCard className="h-5 w-5" /> Checkout notes</div>
            <div className="mt-8 rounded-3xl border border-sky/20 bg-white p-6 shadow-stripe">
              <h2 className="text-2xl font-semibold tracking-[-.035em]">Safe all-or-nothing pledge</h2>
              <div className="mt-5 space-y-4 text-sm leading-6 text-graphite">
                <p>First enter name and email, then choose card or PayPal.</p>
                <p>After the payment method, the pledge amount is shown clearly for review.</p>
                <p>You are charged only if the funding goal and minimum backer count are met by the deadline.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
