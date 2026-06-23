import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib/funding';

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session?: string; amount?: string }> }) {
  const params = await searchParams;
  const amount = Number(params.amount ?? 0);
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-white">
      <section className="max-w-xl rounded-[36px] border border-white/10 bg-white/[0.06] p-10 text-center shadow-stripe">
        <CheckCircle2 className="mx-auto h-14 w-14 text-mint" />
        <h1 className="mt-6 text-4xl font-semibold tracking-[-.05em]">Pledge authorized</h1>
        <p className="mt-4 text-lg text-white/62">Your {formatCurrency(amount)} pledge is authorized. You are charged only if the session funds before the deadline.</p>
        <Link href={params.session ? `/sessions/${params.session}` : '/'} className="mt-8 inline-flex rounded-full bg-white px-6 py-4 font-semibold text-ink">Return to session</Link>
      </section>
    </main>
  );
}
