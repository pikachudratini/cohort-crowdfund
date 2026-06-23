# Cohort CrowdFund

A Next.js MVP for crowdfunding live expert lessons. Experts publish high-value sessions, backers pledge together, and cards are only captured if the session reaches its funding goal.

## What is included

- Version 1 crowdfunding flow: session discovery, detail pages, pledge page, and success page.
- Version 2 offer mechanics preview: bonus ladders, top-bidder prizes, limited premium tiers, and hybrid campaign examples.
- Expert dashboard mockup with campaign stats and tier management concepts.
- Mock Stripe-style all-or-nothing pledge behavior through `/api/pledges`.
- Supabase schema draft in `supabase/schema.sql`.
- Funding math unit tests with Vitest.

## Tech stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4
- Vitest
- Playwright config scaffold
- Supabase schema draft
- Stripe/Resend dependencies prepared for production integration

## Commands

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

## Verified locally

- `npm test`: 7 tests passed
- `npm run lint`: 0 errors, 3 image optimization warnings
- `npm run build`: production build passed
- Browser check: homepage, session detail, pledge page, pledge success redirect, and console clean

## Notes

This is an MVP scaffold with mocked data and mocked pledge authorization. Real production use still needs authentication, persisted database writes, real Stripe checkout/manual capture, email notifications, and deployment secrets.
