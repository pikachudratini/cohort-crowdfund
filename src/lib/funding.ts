import type { FundingMilestone, Pledge, Session, Tier } from './types';

export function formatCurrency(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cents / 100);
}

export function authorizedPledges(pledges: Pledge[]) {
  return pledges.filter((pledge) => pledge.status === 'authorized' || pledge.status === 'captured');
}

export function amountRaisedCents(pledges: Pledge[]) {
  return authorizedPledges(pledges).reduce((sum, pledge) => sum + pledge.amountCents, 0);
}

export function uniqueBackerCount(pledges: Pledge[]) {
  return new Set(authorizedPledges(pledges).map((pledge) => pledge.userId)).size;
}

export function percentFunded(session: Pick<Session, 'fundingGoalCents' | 'pledges'>) {
  if (session.fundingGoalCents <= 0) return 0;
  return Math.min(100, Math.round((amountRaisedCents(session.pledges) / session.fundingGoalCents) * 100));
}

export function rawPercentFunded(session: Pick<Session, 'fundingGoalCents' | 'pledges'>) {
  if (session.fundingGoalCents <= 0) return 0;
  return Math.round((amountRaisedCents(session.pledges) / session.fundingGoalCents) * 100);
}

export function daysLeft(deadline: string, now = new Date()) {
  const diff = new Date(deadline).getTime() - now.getTime();
  if (diff <= 0) return 0;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function tierQuantityRemaining(tier: Tier, pledges: Pledge[]) {
  if (!tier.maxQuantity) return null;
  const taken = authorizedPledges(pledges).filter((pledge) => pledge.tierId === tier.id).length;
  return Math.max(0, tier.maxQuantity - taken);
}

export function unlockedMilestones(milestones: FundingMilestone[], raisedCents: number) {
  return milestones.map((milestone) => ({ ...milestone, unlocked: raisedCents >= milestone.thresholdCents }));
}

export function fundingOutcome(session: Pick<Session, 'fundingGoalCents' | 'minBackers' | 'pledges'>) {
  const raised = amountRaisedCents(session.pledges);
  const backers = uniqueBackerCount(session.pledges);
  return {
    raised,
    backers,
    isFunded: raised >= session.fundingGoalCents && backers >= session.minBackers,
  };
}

export function pledgeRankings(pledges: Pledge[]) {
  const totals = new Map<string, { userId: string; userName: string; totalPledgedCents: number }>();
  for (const pledge of authorizedPledges(pledges)) {
    const current = totals.get(pledge.userId) ?? { userId: pledge.userId, userName: pledge.userName, totalPledgedCents: 0 };
    current.totalPledgedCents += pledge.amountCents;
    totals.set(pledge.userId, current);
  }
  return [...totals.values()]
    .sort((a, b) => b.totalPledgedCents - a.totalPledgedCents)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}
