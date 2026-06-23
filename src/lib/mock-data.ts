import type { Expert, Session } from './types';

const inDays = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

export const experts: Expert[] = [
  {
    id: 'exp-1',
    name: 'Maya Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
    headline: 'AI operations architect for founder-led teams',
    bio: 'Maya helps small teams build agent loops, internal tools, and workflow automation without hiring a full platform team.',
    tags: ['AI agents', 'operations', 'automation'],
  },
  {
    id: 'exp-2',
    name: 'Julian Hart',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    headline: 'Outbound strategist for B2B founders',
    bio: 'Julian designs outbound systems that turn niche expertise into booked calls, partnerships, and high-value conversations.',
    tags: ['outbound', 'email', 'sales'],
  },
  {
    id: 'exp-3',
    name: 'Priya Raman',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=80',
    headline: 'Acquisition sprint facilitator for local operators',
    bio: 'Priya teaches operators how to source, evaluate, and structure local service business acquisition opportunities.',
    tags: ['acquisition', 'local business', 'strategy'],
  },
];

export const sessions: Session[] = [
  {
    id: 'session-ai-loops',
    expertId: 'exp-1',
    expert: experts[0],
    title: 'AI Agent Loops for Startup Operators',
    topic: 'AI Operations',
    description:
      'A live build session on replacing one-off prompting with repeatable agent loops. We will map triggers, goals, validation checks, retry rules, and human approval points for real startup workflows.',
    coverImageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    fundingGoalCents: 750000,
    minBackers: 20,
    deadline: inDays(5),
    status: 'live',
    campaignMode: 'group_fund',
    offerVersion: 'v1',
    tiers: [
      { id: 'tier-ai-1', sessionId: 'session-ai-loops', title: 'Seat', amountCents: 9900, description: 'Join the live session and ask questions.', perks: ['Live access', 'Community chat'], sortOrder: 1 },
      { id: 'tier-ai-2', sessionId: 'session-ai-loops', title: 'Seat + Replay', amountCents: 19900, description: 'Live seat with replay and session notes.', perks: ['Live access', 'Replay', 'Session notes'], sortOrder: 2 },
      { id: 'tier-ai-3', sessionId: 'session-ai-loops', title: 'Builder Pass', amountCents: 49900, description: 'Everything plus a workflow template pack.', perks: ['Live access', 'Replay', 'Loop templates', 'Implementation checklist'], maxQuantity: 25, sortOrder: 3 },
    ],
    milestones: [],
    bonuses: [],
    prizes: [],
    pledges: [
      { id: 'p1', sessionId: 'session-ai-loops', tierId: 'tier-ai-2', userId: 'u1', userName: 'Avery', amountCents: 19900, status: 'authorized', createdAt: new Date().toISOString() },
      { id: 'p2', sessionId: 'session-ai-loops', tierId: 'tier-ai-3', userId: 'u2', userName: 'Rowan', amountCents: 49900, status: 'authorized', createdAt: new Date().toISOString() },
      { id: 'p3', sessionId: 'session-ai-loops', tierId: 'tier-ai-3', userId: 'u3', userName: 'Kai', amountCents: 49900, status: 'authorized', createdAt: new Date().toISOString() },
      { id: 'p4', sessionId: 'session-ai-loops', tierId: 'tier-ai-2', userId: 'u4', userName: 'Morgan', amountCents: 19900, status: 'authorized', createdAt: new Date().toISOString() },
    ],
  },
  {
    id: 'session-outbound',
    expertId: 'exp-2',
    expert: experts[1],
    title: 'Outbound Email Systems That Book Calls',
    topic: 'Sales Systems',
    description:
      'Build a lean outbound machine for expert-led businesses. The lesson covers niche selection, proof assets, personalization, follow-up, and handoff into sales conversations.',
    coverImageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    fundingGoalCents: 500000,
    minBackers: 15,
    deadline: inDays(3),
    status: 'live',
    campaignMode: 'top_bidder',
    offerVersion: 'v2',
    tiers: [
      { id: 'tier-out-1', sessionId: 'session-outbound', title: 'Scout Seat', amountCents: 7500, description: 'Watch live and get the replay.', perks: ['Live access', 'Replay'], sortOrder: 1 },
      { id: 'tier-out-2', sessionId: 'session-outbound', title: 'Builder Seat', amountCents: 25000, description: 'Includes the campaign worksheet.', perks: ['Live access', 'Replay', 'Campaign worksheet'], sortOrder: 2 },
      { id: 'tier-out-3', sessionId: 'session-outbound', title: 'Rainmaker Seat', amountCents: 75000, description: 'Limited hot-seat review for your offer.', perks: ['Everything in Builder', 'Hot-seat review'], maxQuantity: 5, sortOrder: 3 },
    ],
    milestones: [
      { id: 'm1', sessionId: 'session-outbound', thresholdCents: 500000, title: 'Live session unlocks', description: 'The core lesson funds and gets scheduled.', sortOrder: 1 },
      { id: 'm2', sessionId: 'session-outbound', thresholdCents: 750000, title: 'Swipe file for everyone', description: 'All backers receive 12 proven opener angles.', sortOrder: 2 },
    ],
    bonuses: [
      { id: 'b1', title: 'Outbound swipe file', description: 'Twelve opener and follow-up angles.', bonusType: 'swipe_file' },
      { id: 'b2', title: 'Private teardown', description: 'Julian reviews one campaign live.', bonusType: 'teardown' },
    ],
    prizes: [
      { id: 'prize-1', sessionId: 'session-outbound', title: 'Highest backer teardown', description: 'Top backer gets a one-on-one campaign teardown.', prizeType: 'one_on_one', quantity: 1, awardedBy: 'highest_pledge' },
    ],
    pledges: [
      { id: 'p5', sessionId: 'session-outbound', tierId: 'tier-out-3', userId: 'u5', userName: 'Blake', amountCents: 75000, status: 'authorized', createdAt: new Date().toISOString() },
      { id: 'p6', sessionId: 'session-outbound', tierId: 'tier-out-2', userId: 'u6', userName: 'Casey', amountCents: 25000, status: 'authorized', createdAt: new Date().toISOString() },
      { id: 'p7', sessionId: 'session-outbound', tierId: 'tier-out-3', userId: 'u7', userName: 'Sam', amountCents: 75000, status: 'authorized', createdAt: new Date().toISOString() },
    ],
  },
  {
    id: 'session-local-acquisition',
    expertId: 'exp-3',
    expert: experts[2],
    title: 'Local Service Business Acquisition Sprint',
    topic: 'Acquisition',
    description:
      'A tactical workshop for finding under-marketed local service businesses, scoring opportunities, structuring owner outreach, and building a first-deal pipeline.',
    coverImageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    fundingGoalCents: 1000000,
    minBackers: 25,
    deadline: inDays(6),
    status: 'live',
    campaignMode: 'bonus_ladder',
    offerVersion: 'v2',
    tiers: [
      { id: 'tier-acq-1', sessionId: 'session-local-acquisition', title: 'Operator Seat', amountCents: 14900, description: 'Join the live sprint.', perks: ['Live access'], sortOrder: 1 },
      { id: 'tier-acq-2', sessionId: 'session-local-acquisition', title: 'Deal Builder', amountCents: 39900, description: 'Includes scoring sheets and outreach templates.', perks: ['Live access', 'Replay', 'Scoring sheets', 'Outreach templates'], sortOrder: 2 },
      { id: 'tier-acq-3', sessionId: 'session-local-acquisition', title: 'Bugatti Seat', amountCents: 120000, description: 'Limited private deal review.', perks: ['Everything in Deal Builder', 'Private deal review'], maxQuantity: 3, sortOrder: 3 },
    ],
    milestones: [
      { id: 'm3', sessionId: 'session-local-acquisition', thresholdCents: 1000000, title: 'Sprint funded', description: 'The live acquisition sprint unlocks.', sortOrder: 1 },
      { id: 'm4', sessionId: 'session-local-acquisition', thresholdCents: 1400000, title: 'Bonus Q&A unlocks', description: 'All backers get a second group Q&A.', sortOrder: 2 },
      { id: 'm5', sessionId: 'session-local-acquisition', thresholdCents: 1800000, title: 'Deal memo pack unlocks', description: 'All backers receive a deal memo template pack.', sortOrder: 3 },
    ],
    bonuses: [
      { id: 'b3', title: 'Deal memo pack', description: 'Templates for acquisition notes and seller outreach.', bonusType: 'template_pack' },
    ],
    prizes: [],
    pledges: [
      { id: 'p8', sessionId: 'session-local-acquisition', tierId: 'tier-acq-2', userId: 'u8', userName: 'Devon', amountCents: 39900, status: 'authorized', createdAt: new Date().toISOString() },
      { id: 'p9', sessionId: 'session-local-acquisition', tierId: 'tier-acq-3', userId: 'u9', userName: 'Jordan', amountCents: 120000, status: 'authorized', createdAt: new Date().toISOString() },
      { id: 'p10', sessionId: 'session-local-acquisition', tierId: 'tier-acq-1', userId: 'u10', userName: 'Taylor', amountCents: 14900, status: 'authorized', createdAt: new Date().toISOString() },
    ],
  },
];

export function getSession(id: string) {
  return sessions.find((session) => session.id === id);
}
