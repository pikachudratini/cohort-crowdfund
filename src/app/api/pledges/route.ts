import { NextResponse } from 'next/server';
import { getSession } from '@/lib/mock-data';

async function readPledgePayload(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => ({}));
    return {
      sessionId: String(body.sessionId ?? ''),
      tierId: String(body.tierId ?? ''),
    };
  }

  const formData = await request.formData();
  return {
    sessionId: String(formData.get('sessionId') ?? ''),
    tierId: String(formData.get('tierId') ?? ''),
  };
}

export async function POST(request: Request) {
  const { sessionId, tierId } = await readPledgePayload(request);
  const session = getSession(sessionId);
  const tier = session?.tiers.find((item) => item.id === tierId);

  if (!session || !tier) {
    return NextResponse.json({ error: 'Invalid pledge request' }, { status: 400 });
  }

  const successUrl = `/pledge/success?session=${session.id}&amount=${tier.amountCents}`;
  const acceptsHtml = request.headers.get('accept')?.includes('text/html');

  if (!acceptsHtml && request.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ ok: true, redirectTo: successUrl, sessionId: session.id, tierId: tier.id, amountCents: tier.amountCents });
  }

  return NextResponse.redirect(new URL(successUrl, request.url), { status: 303 });
}
