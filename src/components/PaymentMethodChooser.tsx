'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CreditCard, Lock } from 'lucide-react';

type PaymentMethodChooserProps = {
  successHref: string;
};

type Method = 'card' | 'paypal' | 'wallets';

const walletOptions = ['Apple Pay', 'Google Pay', 'Amazon Pay'];

export function PaymentMethodChooser({ successHref }: PaymentMethodChooserProps) {
  const [method, setMethod] = useState<Method>('card');

  return (
    <section aria-labelledby="payment-method-title">
      <h2 id="payment-method-title" className="text-lg font-semibold tracking-[-.02em]">Choose payment method</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => setMethod('card')}
          className={`min-h-16 rounded-2xl border-2 p-4 text-left transition ${method === 'card' ? 'border-mint bg-mint/5 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
          aria-pressed={method === 'card'}
        >
          <span className="flex items-center gap-2 font-semibold"><CreditCard className="h-5 w-5 text-mint" /> Card</span>
          <span className="mt-1 block text-xs text-slate-500">Secure card hold</span>
        </button>

        <button
          type="button"
          onClick={() => setMethod('paypal')}
          className={`min-h-16 rounded-2xl border-2 p-4 text-left transition ${method === 'paypal' ? 'border-[#003087] bg-[#ffc439]/20 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
          aria-pressed={method === 'paypal'}
        >
          <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-color.svg" alt="PayPal" className="h-6 w-auto" />
          <span className="mt-2 block text-xs text-slate-500">Log in with PayPal</span>
        </button>

        <button
          type="button"
          onClick={() => setMethod('wallets')}
          className={`min-h-16 rounded-2xl border-2 p-4 text-left transition ${method === 'wallets' ? 'border-navy bg-slate-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
          aria-pressed={method === 'wallets'}
        >
          <span className="font-semibold">Digital wallets</span>
          <span className="mt-1 block text-xs text-slate-500">Apple, Google, Amazon</span>
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white">
        {method === 'card' ? (
          <div className="animate-[reveal-up_.28s_ease-out_both] p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold">Enter card details</p>
              <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-white">Selected</span>
            </div>
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-300 bg-white">
              <input readOnly value="4242 4242 4242 4242" aria-label="Card number" className="w-full border-b border-slate-300 px-4 py-3 outline-none" />
              <div className="grid grid-cols-2">
                <input readOnly value="12 / 34" aria-label="Expiration date" className="border-r border-slate-300 px-4 py-3 outline-none" />
                <input readOnly value="123" aria-label="Security code" className="px-4 py-3 outline-none" />
              </div>
            </div>
          </div>
        ) : null}

        {method === 'paypal' ? (
          <div className="animate-[reveal-up_.28s_ease-out_both] p-5 text-center">
            <p className="font-semibold">Continue with PayPal</p>
            <p className="mt-1 text-sm text-slate-500">This would open PayPal login in a live checkout.</p>
            <Link href={successHref} className="mt-4 flex min-h-14 w-full items-center justify-center rounded-xl bg-[#ffc439] px-6 shadow-sm transition hover:bg-[#f2b600]" aria-label="Pay with PayPal">
              <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-color.svg" alt="PayPal" className="h-7 w-auto" />
            </Link>
          </div>
        ) : null}

        {method === 'wallets' ? (
          <div className="animate-[reveal-up_.28s_ease-out_both] p-5">
            <p className="font-semibold">Choose a wallet</p>
            <p className="mt-1 text-sm text-slate-500">These show how wallet options would appear in production.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {walletOptions.map((option) => (
                <Link key={option} href={successHref} className="flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 font-semibold text-navy transition hover:bg-slate-50">
                  {option}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-mint px-6 py-4 font-semibold text-white shadow-glow transition hover:bg-[#006f45]">
        <Lock className="h-4 w-4" /> Authorize card pledge
      </button>
    </section>
  );
}
