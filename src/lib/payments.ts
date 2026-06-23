import type { Pledge, Session } from './types';
import { fundingOutcome } from './funding';

export interface StripeLike {
  createPaymentIntent(input: { amount: number; captureMethod: 'manual'; metadata: Record<string, string> }): Promise<{ id: string }>;
  capturePaymentIntent(id: string): Promise<{ id: string; status: 'succeeded' }>;
  cancelPaymentIntent(id: string): Promise<{ id: string; status: 'canceled' }>;
}

export class MockStripe implements StripeLike {
  public created: string[] = [];
  public captured: string[] = [];
  public canceled: string[] = [];

  async createPaymentIntent(input: { amount: number; captureMethod: 'manual'; metadata: Record<string, string> }) {
    const id = `pi_mock_${input.metadata.sessionId}_${input.amount}`;
    this.created.push(id);
    return { id };
  }

  async capturePaymentIntent(id: string) {
    this.captured.push(id);
    return { id, status: 'succeeded' as const };
  }

  async cancelPaymentIntent(id: string) {
    this.canceled.push(id);
    return { id, status: 'canceled' as const };
  }
}

export async function authorizePledge(stripe: StripeLike, input: { sessionId: string; tierId: string; userId: string; amountCents: number }): Promise<Pick<Pledge, 'stripePaymentIntentId' | 'status'>> {
  const intent = await stripe.createPaymentIntent({
    amount: input.amountCents,
    captureMethod: 'manual',
    metadata: { sessionId: input.sessionId, tierId: input.tierId, userId: input.userId },
  });
  return { stripePaymentIntentId: intent.id, status: 'authorized' };
}

export async function settleDeadline(stripe: StripeLike, session: Session) {
  const outcome = fundingOutcome(session);
  const authorized = session.pledges.filter((pledge) => pledge.status === 'authorized' && pledge.stripePaymentIntentId);
  const errors: Array<{ pledgeId: string; error: string }> = [];

  for (const pledge of authorized) {
    try {
      if (outcome.isFunded) {
        await stripe.capturePaymentIntent(pledge.stripePaymentIntentId as string);
        pledge.status = 'captured';
      } else {
        await stripe.cancelPaymentIntent(pledge.stripePaymentIntentId as string);
        pledge.status = 'canceled';
      }
    } catch (error) {
      errors.push({ pledgeId: pledge.id, error: error instanceof Error ? error.message : 'Unknown payment error' });
    }
  }

  if (errors.length) return { status: 'needs_review' as const, outcome, errors };
  return { status: outcome.isFunded ? 'funded' as const : 'failed' as const, outcome, errors };
}
