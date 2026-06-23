create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  avatar_url text,
  is_expert boolean default false,
  is_admin boolean default false,
  created_at timestamptz default now()
);

create table if not exists experts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  bio text,
  headline text,
  expertise_tags text[],
  created_at timestamptz default now()
);

create table if not exists sessions (
  id uuid primary key default uuid_generate_v4(),
  expert_id uuid references experts(id) on delete cascade,
  title text not null,
  topic text,
  description text,
  cover_image_url text,
  funding_goal_cents integer not null,
  min_backers integer default 1,
  deadline timestamptz not null,
  status text check (status in ('draft','live','funded','failed','scheduled','completed')) default 'draft',
  scheduled_datetime timestamptz,
  campaign_mode text check (campaign_mode in ('group_fund','bonus_ladder','top_bidder','hybrid')) default 'group_fund',
  offer_version text default 'v1',
  created_at timestamptz default now()
);

create table if not exists tiers (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references sessions(id) on delete cascade,
  title text not null,
  amount_cents integer not null,
  description text,
  perks text[],
  max_quantity integer,
  sort_order integer default 0
);

create table if not exists bonuses (
  id uuid primary key default uuid_generate_v4(),
  expert_id uuid references experts(id) on delete cascade,
  title text not null,
  description text,
  bonus_type text,
  created_at timestamptz default now()
);

create table if not exists tier_bonuses (
  id uuid primary key default uuid_generate_v4(),
  tier_id uuid references tiers(id) on delete cascade,
  bonus_id uuid references bonuses(id) on delete cascade
);

create table if not exists funding_milestones (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references sessions(id) on delete cascade,
  threshold_cents integer not null,
  title text not null,
  description text,
  unlocked boolean default false,
  sort_order integer default 0
);

create table if not exists prize_slots (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references sessions(id) on delete cascade,
  title text not null,
  description text,
  prize_type text,
  quantity integer default 1,
  awarded_by text check (awarded_by in ('highest_pledge','tier_purchase','manual')) default 'highest_pledge',
  created_at timestamptz default now()
);

create table if not exists pledges (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references sessions(id) on delete cascade,
  tier_id uuid references tiers(id),
  user_id uuid references users(id),
  amount_cents integer not null,
  stripe_payment_intent_id text,
  status text check (status in ('authorized','captured','canceled','refunded')) default 'authorized',
  created_at timestamptz default now()
);

create table if not exists comments (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references sessions(id) on delete cascade,
  user_id uuid references users(id),
  body text not null,
  created_at timestamptz default now()
);

create or replace view pledge_rankings as
select
  session_id,
  user_id,
  sum(amount_cents) as total_pledged_cents,
  dense_rank() over (partition by session_id order by sum(amount_cents) desc) as rank
from pledges
where status in ('authorized', 'captured')
group by session_id, user_id;
