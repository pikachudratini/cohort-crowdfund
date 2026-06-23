import { describe, expect, it } from 'vitest';
import { amountRaisedCents, fundingOutcome, percentFunded, pledgeRankings, tierQuantityRemaining, uniqueBackerCount, unlockedMilestones } from './funding';
import type { Pledge, Tier } from './types';

const pledges: Pledge[] = [
  { id: '1', sessionId: 's', tierId: 't1', userId: 'u1', userName: 'A', amountCents: 10000, status: 'authorized', createdAt: '' },
  { id: '2', sessionId: 's', tierId: 't2', userId: 'u2', userName: 'B', amountCents: 20000, status: 'captured', createdAt: '' },
  { id: '3', sessionId: 's', tierId: 't2', userId: 'u2', userName: 'B', amountCents: 20000, status: 'canceled', createdAt: '' },
  { id: '4', sessionId: 's', tierId: 't3', userId: 'u3', userName: 'C', amountCents: 50000, status: 'refunded', createdAt: '' },
];

describe('funding math', () => {
  it('counts only authorized and captured pledges toward raised total', () => {
    expect(amountRaisedCents(pledges)).toBe(30000);
  });

  it('counts unique active backers', () => {
    expect(uniqueBackerCount(pledges)).toBe(2);
  });

  it('caps displayed percent funded at 100', () => {
    expect(percentFunded({ fundingGoalCents: 25000, pledges })).toBe(100);
  });

  it('requires both dollars and minimum backers to fund', () => {
    expect(fundingOutcome({ fundingGoalCents: 30000, minBackers: 2, pledges }).isFunded).toBe(true);
    expect(fundingOutcome({ fundingGoalCents: 30000, minBackers: 3, pledges }).isFunded).toBe(false);
    expect(fundingOutcome({ fundingGoalCents: 31000, minBackers: 2, pledges }).isFunded).toBe(false);
  });

  it('computes tier quantity remaining from active pledges', () => {
    const tier: Tier = { id: 't2', sessionId: 's', title: 'Hot Seat', amountCents: 20000, description: '', perks: [], maxQuantity: 3, sortOrder: 1 };
    expect(tierQuantityRemaining(tier, pledges)).toBe(2);
  });

  it('unlocks milestones by raised amount', () => {
    const unlocked = unlockedMilestones([
      { id: 'm1', sessionId: 's', thresholdCents: 10000, title: 'A', description: '', sortOrder: 1 },
      { id: 'm2', sessionId: 's', thresholdCents: 40000, title: 'B', description: '', sortOrder: 2 },
    ], 30000);
    expect(unlocked[0].unlocked).toBe(true);
    expect(unlocked[1].unlocked).toBe(false);
  });

  it('ranks backers by active pledge total', () => {
    const ranks = pledgeRankings(pledges);
    expect(ranks[0]).toMatchObject({ userId: 'u2', rank: 1, totalPledgedCents: 20000 });
    expect(ranks[1]).toMatchObject({ userId: 'u1', rank: 2, totalPledgedCents: 10000 });
  });
});
