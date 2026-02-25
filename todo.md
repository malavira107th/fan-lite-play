# Fan Lite Play — Project TODO

## Phase 1: Foundation
- [x] Design system (colors, fonts, global CSS)
- [x] Database schema (users, matches, players, teams, entries, points, challenges)
- [x] Push schema migrations

## Phase 2: Authentication
- [x] Custom register endpoint (username, email, password + bcrypt)
- [x] Custom login endpoint (JWT in HTTP-only cookie)
- [x] Logout endpoint
- [x] Auth middleware / protectedProcedure
- [x] Role-based access (admin vs user)
- [x] Register page UI
- [x] Login page UI

## Phase 3: Public Pages & Layout
- [x] Global Navbar (public + authenticated states)
- [x] Footer with brand info
- [x] Homepage (hero, features, how it works, CTA)
- [x] About Us page
- [x] How It Works page
- [x] Contact Us page (email + address)
- [x] Terms of Use page
- [x] Privacy Policy page

## Phase 4: Admin Panel
- [x] Admin layout / sidebar
- [x] Create/edit match (teams, date, venue, status)
- [x] Add/edit players to match pool (role, credits, image)
- [x] Update player performance points
- [x] Manage match status (upcoming → live → completed)
- [x] Admin challenge management
- [x] Admin user management (role assignment)
- [x] Admin stats dashboard

## Phase 5: Team Builder & Challenges
- [x] Challenge listing page
- [x] Match detail / player pool page
- [x] Team builder UI (11 players, credit cap, position validation)
- [x] Save team entry to DB
- [x] Join challenge with team entry
- [x] Multiple entries per user per challenge
- [x] Captain / Vice-Captain selection (2x / 1.5x multipliers)

## Phase 6: Points, Leaderboard & Dashboard
- [x] Points calculation engine (runs, wickets, catches, SR bonus, haul bonuses)
- [x] Per-challenge leaderboard
- [x] Overall leaderboard
- [x] User dashboard (team history, analytics, challenge tracking)
- [x] User profile page

## Phase 7: Polish & Delivery
- [x] Responsive design audit
- [x] Vitest unit tests (22 tests — all passing)
- [x] Checkpoint & delivery

## UI Improvements
- [x] Redesign homepage hero section (more visually striking, asymmetric, elegant)
- [x] Fix Navbar: hide Challenges and My Dashboard links from unauthenticated users
- [x] Fix Footer: hide Challenges and My Dashboard links from unauthenticated users
- [x] Move Leaderboard to auth-gated links in Navbar and Footer
- [x] Redesign Footer with elegant layout and 18+ age restriction notice

## Full Website Redesign
- [x] Redesign Homepage as clean, honest landing page (remove fake data, real images)
- [x] Redesign Navbar (clean, minimal, no confusion)
- [x] Redesign Footer (already done, keep 18+ notice)
- [x] Redesign About Us page
- [x] Redesign How It Works page
- [x] Redesign Contact Us page
- [x] Redesign Terms of Use page
- [x] Redesign Privacy Policy page
- [x] Redesign Login page
- [x] Redesign Register page

## Responsible Play
- [x] Create Responsible Play page with 18+ notice, free-to-play statement, and support contact
- [x] Add Responsible Play link to Footer
- [x] Add Responsible Play link to Navbar (public)
- [x] Add route in App.tsx

## Logo
- [x] Generate Fan Lite Play logo image
- [x] Integrate logo into Navbar, Footer, Login, Register pages
- [x] Set logo as favicon
- [x] Replace AI logo with user-provided logo and favicon from uploaded ZIP
- [x] Replace text wordmarks and Trophy icons with /logo.png on all pages (Login, Register, admin pages, etc.)

## Vercel Deployment Readiness
- [x] Create vercel.json with correct build/output/routes config
- [x] Remove vite-plugin-manus-runtime from production build (Manus-specific)
- [x] Remove vite-plugin-jsx-loc from production build (dev-only debug tool)
- [x] Add code splitting to reduce 1.18 MB JS bundle
- [x] Create VERCEL_SETUP.md documenting all required environment variables
- [x] Update GitHub with all Vercel-ready changes

## Google Search Console / SEO Indexing
- [ ] Create sitemap.xml with all public pages
- [ ] Create robots.txt allowing all crawlers
- [ ] Add comprehensive SEO meta tags (title, description, canonical, OG, Twitter) to index.html
- [ ] Add JSON-LD structured data (Organization schema) to homepage
- [ ] Push to GitHub and redeploy on Vercel
