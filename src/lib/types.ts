export type CampaignMode = 'group_fund' | 'bonus_ladder' | 'top_bidder' | 'hybrid';
export type SessionStatus = 'draft' | 'live' | 'funded' | 'failed' | 'scheduled' | 'completed';
export type PledgeStatus = 'authorized' | 'captured' | 'canceled' | 'refunded';

export interface Expert {
  id: string;
  name: string;
  avatarUrl: string;
  headline: string;
  bio: string;
  tags: string[];
}

export interface Tier {
  id: string;
  sessionId: string;
  title: string;
  amountCents: number;
  description: string;
  perks: string[];
  maxQuantity?: number;
  sortOrder: number;
}

export interface Bonus {
  id: string;
  title: string;
  description: string;
  bonusType: 'recording' | 'workbook' | 'template_pack' | 'prompt_pack' | 'teardown' | 'hot_seat' | 'one_on_one' | 'extra_training' | 'group_qa' | 'audit' | 'swipe_file' | 'checklist';
}

export interface FundingMilestone {
  id: string;
  sessionId: string;
  thresholdCents: number;
  title: string;
  description: string;
  sortOrder: number;
}

export interface PrizeSlot {
  id: string;
  sessionId: string;
  title: string;
  description: string;
  prizeType: 'one_on_one' | 'teardown' | 'sponsor_seat' | 'hot_seat';
  quantity: number;
  awardedBy: 'highest_pledge' | 'tier_purchase' | 'manual';
}

export interface Pledge {
  id: string;
  sessionId: string;
  tierId: string;
  userId: string;
  userName: string;
  amountCents: number;
  status: PledgeStatus;
  stripePaymentIntentId?: string;
  createdAt: string;
}

export interface Session {
  id: string;
  expertId: string;
  expert: Expert;
  title: string;
  topic: string;
  description: string;
  coverImageUrl: string;
  fundingGoalCents: number;
  minBackers: number;
  deadline: string;
  status: SessionStatus;
  scheduledDatetime?: string;
  campaignMode: CampaignMode;
  offerVersion: 'v1' | 'v2';
  tiers: Tier[];
  milestones: FundingMilestone[];
  bonuses: Bonus[];
  prizes: PrizeSlot[];
  pledges: Pledge[];
}
