import type { Expert, Session } from './types';

const inDays = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

export const experts: Expert[] = [
  {
    id: 'exp-1',
    name: 'Marcus Johnson',
    avatarUrl: '/avatars/marcus-johnson.svg',
    headline: 'Tampa operations coach for service businesses',
    bio: 'Marcus helps local operators use practical automations, better handoffs, and simple dashboards to get more output from the same team.',
    tags: ['operations', 'automation', 'service business'],
  },
  {
    id: 'exp-2',
    name: 'Sofia Rivera',
    avatarUrl: '/avatars/sofia-rivera.svg',
    headline: 'Referral and client growth strategist',
    bio: 'Sofia builds referral systems, follow-up campaigns, and local partnership plays for clinics, med spas, contractors, and professional services.',
    tags: ['referrals', 'local growth', 'sales'],
  },
  {
    id: 'exp-3',
    name: 'Tom Bennett',
    avatarUrl: '/avatars/tom-bennett.svg',
    headline: 'Acquisition sprint facilitator for local operators',
    bio: 'Tom teaches buyers how to source, evaluate, and structure local service business acquisition opportunities around real cash flow.',
    tags: ['acquisition', 'local business', 'strategy'],
  },
  {
    id: 'exp-4',
    name: 'Erin Walsh',
    avatarUrl: '/avatars/erin-walsh.svg',
    headline: 'Cash-flow and tax savings advisor for owners',
    bio: 'Erin shows small business owners how to find expense leaks, tighten cash flow, and keep more of what the business already earns.',
    tags: ['cash flow', 'tax savings', 'finance'],
  },
];

export const sessions: Session[] = [
  {
    id: 'session-ai-loops',
    expertId: 'exp-1',
    expert: experts[0],
    title: 'Get More Done With the Same Team',
    topic: 'Operations',
    description:
      'A live build session for Tampa Bay service business owners who want simple automations, clearer handoffs, and a daily operating rhythm that helps the team finish more work without adding headcount.',
    coverImageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    fundingGoalCents: 750000,
    minBackers: 20,
    deadline: inDays(5),
    status: 'live',
    campaignMode: 'group_fund',
    offerVersion: 'v1',
    tiers: [
      { id: 'tier-ai-1', sessionId: 'session-ai-loops', title: 'Live Seat', amountCents: 9900, description: 'Join the live workshop and ask questions.', perks: ['Live access', 'Community chat'], sortOrder: 1 },
      { id: 'tier-ai-2', sessionId: 'session-ai-loops', title: 'Seat + Replay', amountCents: 19900, description: 'Live seat with replay and session notes.', perks: ['Live access', 'Replay', 'Session notes'], sortOrder: 2 },
      { id: 'tier-ai-3', sessionId: 'session-ai-loops', title: 'Implementation Pass', amountCents: 49900, description: 'Everything plus the operating checklist pack.', perks: ['Live access', 'Replay', 'Automation checklist', 'Team handoff templates'], maxQuantity: 25, sortOrder: 3 },
    ],
    milestones: [
      { id: 'm-ai-1', sessionId: 'session-ai-loops', thresholdCents: 750000, title: 'The Team Output Playbook', description: 'Unlock the live workshop plus a practical operating rhythm your team can use the next morning.', sortOrder: 1 },
      { id: 'm-ai-2', sessionId: 'session-ai-loops', thresholdCents: 1000000, title: 'The 3x Follow-Through Toolkit', description: 'Every backer gets checklists, assignment templates, and daily scorecard prompts that help work stop falling through the cracks.', sortOrder: 2 },
    ],
    bonuses: [
      { id: 'b-ai-1', title: 'Done-By-Friday Team Checklist', description: 'A simple weekly system that makes the next action obvious before the owner has to chase it.', bonusType: 'checklist' },
      { id: 'b-ai-2', title: 'No-More-Bottleneck Handoff Templates', description: 'Reusable handoff prompts for sales, service, admin, and follow-up so work moves without waiting on the owner.', bonusType: 'template_pack' },
    ],
    prizes: [
      { id: 'prize-ai-1', sessionId: 'session-ai-loops', title: 'Top contributor operations upgrade pack', description: 'The top contributor gets Marcus’s Tampa operator checklist bundle, a custom role handoff map, and a 30-day team scorecard template.', prizeType: 'teardown', quantity: 1, awardedBy: 'highest_pledge' },
    ],
    pledges: [
      { id: 'p1', sessionId: 'session-ai-loops', tierId: 'tier-ai-2', userId: 'u1', userName: 'Avery', amountCents: 19900, status: 'authorized', createdAt: new Date().toISOString() },
      { id: 'p2', sessionId: 'session-ai-loops', tierId: 'tier-ai-3', userId: 'u2', userName: 'Rowan', amountCents: 49900, status: 'authorized', createdAt: new Date().toISOString() },
      { id: 'p3', sessionId: 'session-ai-loops', tierId: 'tier-ai-3', userId: 'u3', userName: 'Kai', amountCents: 49900, status: 'authorized', createdAt: new Date().toISOString() },
      { id: 'p4', sessionId: 'session-ai-loops', tierId: 'tier-ai-2', userId: 'u4', userName: 'Morgan', amountCents: 19900, status: 'authorized', createdAt: new Date().toISOString() },
    ],
  },
  {
    id: 'session-referrals',
    expertId: 'exp-2',
    expert: experts[1],
    title: 'Referrals on Autopilot for Local Businesses',
    topic: 'Referrals',
    description:
      'A four-week masterclass for turning happy customers, nearby businesses, and past buyers into a repeatable referral engine without feeling pushy.',
    coverImageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    fundingGoalCents: 600000,
    minBackers: 18,
    deadline: inDays(4),
    status: 'live',
    campaignMode: 'top_bidder',
    offerVersion: 'v2',
    tiers: [
      { id: 'tier-ref-1', sessionId: 'session-referrals', title: 'Workshop Seat', amountCents: 9900, description: 'Attend the live kickoff workshop.', perks: ['Live access', 'Replay'], sortOrder: 1 },
      { id: 'tier-ref-2', sessionId: 'session-referrals', title: 'Four-Week Pass', amountCents: 29900, description: 'Join all four weekly implementation sessions.', perks: ['Four live sessions', 'Replays', 'Referral tracker'], sortOrder: 2 },
      { id: 'tier-ref-3', sessionId: 'session-referrals', title: 'Growth Kit Pass', amountCents: 79900, description: 'Everything plus swipe files and partnership scripts.', perks: ['Everything in Four-Week Pass', 'Partner scripts', 'Review request prompts'], maxQuantity: 10, sortOrder: 3 },
    ],
    milestones: [
      { id: 'm-ref-1', sessionId: 'session-referrals', thresholdCents: 600000, title: 'Referral Engine Masterclass Unlocks', description: 'The four-week referral masterclass gets scheduled and every backer receives the implementation calendar.', sortOrder: 1 },
      { id: 'm-ref-2', sessionId: 'session-referrals', thresholdCents: 900000, title: 'The Warm Introduction Script Vault', description: 'Every backer gets referral ask scripts, review prompts, and partner follow-up messages built for local service businesses.', sortOrder: 2 },
      { id: 'm-ref-3', sessionId: 'session-referrals', thresholdCents: 1200000, title: 'The Past-Customer Reactivation Kit', description: 'Every backer gets a simple campaign for bringing back old buyers and turning them into fresh introductions.', sortOrder: 3 },
    ],
    bonuses: [
      { id: 'b-ref-1', title: 'The Ask Without Feeling Awkward Script Pack', description: 'Referral request scripts that feel natural, respectful, and easy to send.', bonusType: 'swipe_file' },
      { id: 'b-ref-2', title: 'Partner Handshake Outreach Kit', description: 'A plug-in local partnership sequence for businesses that already serve your ideal customer.', bonusType: 'template_pack' },
      { id: 'b-ref-3', title: 'Review-to-Referral Follow-Up Map', description: 'A simple flow that turns a good review into a warm introduction instead of letting the moment disappear.', bonusType: 'checklist' },
    ],
    prizes: [
      { id: 'prize-ref-1', sessionId: 'session-referrals', title: 'Top contributor referral launch pack', description: 'The top contributor gets a done-for-you referral calendar, custom partner target sheet, and plug-in scripts for their exact business.', prizeType: 'teardown', quantity: 1, awardedBy: 'highest_pledge' },
    ],
    pledges: [
      { id: 'p5', sessionId: 'session-referrals', tierId: 'tier-ref-3', userId: 'u5', userName: 'Blake', amountCents: 90000, status: 'authorized', createdAt: new Date().toISOString() },
      { id: 'p6', sessionId: 'session-referrals', tierId: 'tier-ref-2', userId: 'u6', userName: 'Casey', amountCents: 29900, status: 'authorized', createdAt: new Date().toISOString() },
      { id: 'p7', sessionId: 'session-referrals', tierId: 'tier-ref-3', userId: 'u7', userName: 'Sam', amountCents: 79900, status: 'authorized', createdAt: new Date().toISOString() },
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
      { id: 'tier-acq-3', sessionId: 'session-local-acquisition', title: 'Deal Room Pass', amountCents: 120000, description: 'Limited access to the full deal review pack.', perks: ['Everything in Deal Builder', 'Deal memo templates', 'Seller outreach library'], maxQuantity: 3, sortOrder: 3 },
    ],
    milestones: [
      { id: 'm3', sessionId: 'session-local-acquisition', thresholdCents: 1000000, title: 'The Hidden Deal Radar', description: 'Unlock the live acquisition sprint and a target-scoring map for finding quiet local service opportunities.', sortOrder: 1 },
      { id: 'm4', sessionId: 'session-local-acquisition', thresholdCents: 1400000, title: 'The Tax Leak Plugger Owner Math Kit', description: 'Every backer gets a tax-saving and expense-recapture worksheet for deal review.', sortOrder: 2 },
      { id: 'm5', sessionId: 'session-local-acquisition', thresholdCents: 1800000, title: 'The Triple-Output Employee Playbook', description: 'Unlock a post-close operating pack for getting employees producing more with less owner babysitting.', sortOrder: 3 },
      { id: 'm6', sessionId: 'session-local-acquisition', thresholdCents: 2200000, title: 'The Referral Flywheel Autopilot', description: 'Unlock customer referral scripts, review prompts, and partner follow-up templates for the acquired business.', sortOrder: 4 },
    ],
    bonuses: [
      { id: 'b3', title: 'Secret-Door Deal List Builder', description: 'A sourcing worksheet that makes hidden local opportunities easier to find and rank.', bonusType: 'template_pack' },
      { id: 'b4', title: 'Seller Math and Tax Leak Calculator', description: 'A scoring sheet for estimating savings, cash flow, and risk before emotions take over.', bonusType: 'template_pack' },
      { id: 'b5', title: 'First-30-Day Safety Checklist', description: 'A control checklist so nothing critical gets missed after closing.', bonusType: 'checklist' },
    ],
    prizes: [
      { id: 'prize-2', sessionId: 'session-local-acquisition', title: 'Top contributor deal room bundle', description: 'The top contributor gets a seller outreach rewrite, risk map, deal memo template pack, and lender question checklist.', prizeType: 'teardown', quantity: 1, awardedBy: 'highest_pledge' },
    ],
    pledges: [
      { id: 'p8', sessionId: 'session-local-acquisition', tierId: 'tier-acq-2', userId: 'u8', userName: 'Devon', amountCents: 39900, status: 'authorized', createdAt: new Date().toISOString() },
      { id: 'p9', sessionId: 'session-local-acquisition', tierId: 'tier-acq-3', userId: 'u9', userName: 'Jordan', amountCents: 120000, status: 'authorized', createdAt: new Date().toISOString() },
      { id: 'p10', sessionId: 'session-local-acquisition', tierId: 'tier-acq-1', userId: 'u10', userName: 'Taylor', amountCents: 14900, status: 'authorized', createdAt: new Date().toISOString() },
    ],
  },
  {
    id: 'session-tax-savings',
    expertId: 'exp-4',
    expert: experts[3],
    title: 'Keep More Cash Without Selling More',
    topic: 'Owner Finance',
    description:
      'A focused owner workshop on finding cash leaks, cleaning up expense habits, and spotting tax-planning conversations that can put money back into the business.',
    coverImageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    fundingGoalCents: 650000,
    minBackers: 18,
    deadline: inDays(7),
    status: 'live',
    campaignMode: 'hybrid',
    offerVersion: 'v2',
    tiers: [
      { id: 'tier-tax-1', sessionId: 'session-tax-savings', title: 'Workshop Seat', amountCents: 12900, description: 'Attend the owner cash-flow session.', perks: ['Live access', 'Replay'], sortOrder: 1 },
      { id: 'tier-tax-2', sessionId: 'session-tax-savings', title: 'Cash-Flow Pack', amountCents: 34900, description: 'Includes worksheets and review checklists.', perks: ['Live access', 'Replay', 'Expense leak worksheet', 'Cash-flow checklist'], sortOrder: 2 },
      { id: 'tier-tax-3', sessionId: 'session-tax-savings', title: 'Owner Toolkit', amountCents: 89900, description: 'Everything plus the vendor savings and quarterly review templates.', perks: ['Everything in Cash-Flow Pack', 'Vendor savings scripts', 'Quarterly review templates'], maxQuantity: 12, sortOrder: 3 },
    ],
    milestones: [
      { id: 'm-tax-1', sessionId: 'session-tax-savings', thresholdCents: 650000, title: 'Owner Cash-Savings Workshop Unlocks', description: 'The workshop gets scheduled and every backer receives the expense leak worksheet.', sortOrder: 1 },
      { id: 'm-tax-2', sessionId: 'session-tax-savings', thresholdCents: 900000, title: 'Vendor Savings Script Kit', description: 'Every backer gets scripts for renegotiating recurring expenses and finding savings without cutting quality.', sortOrder: 2 },
    ],
    bonuses: [
      { id: 'b-tax-1', title: 'Expense Leak Finder', description: 'A quick worksheet for spotting waste hiding in subscriptions, vendors, payroll habits, and owner spending.', bonusType: 'checklist' },
      { id: 'b-tax-2', title: 'Quarterly Cash Review Template', description: 'A simple recurring review that helps owners keep savings from disappearing again.', bonusType: 'template_pack' },
    ],
    prizes: [
      { id: 'prize-tax-1', sessionId: 'session-tax-savings', title: 'Top contributor cash-control bundle', description: 'The top contributor gets the vendor savings script pack, quarterly review template, and bookkeeper question list.', prizeType: 'teardown', quantity: 1, awardedBy: 'highest_pledge' },
    ],
    pledges: [
      { id: 'p11', sessionId: 'session-tax-savings', tierId: 'tier-tax-2', userId: 'u11', userName: 'Riley', amountCents: 34900, status: 'authorized', createdAt: new Date().toISOString() },
      { id: 'p12', sessionId: 'session-tax-savings', tierId: 'tier-tax-3', userId: 'u12', userName: 'Dana', amountCents: 89900, status: 'authorized', createdAt: new Date().toISOString() },
    ],
  },
];

export function getSession(id: string) {
  return sessions.find((session) => session.id === id);
}
