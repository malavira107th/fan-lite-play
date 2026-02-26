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
- [x] Create sitemap.xml with all public pages
- [x] Create robots.txt allowing all crawlers
- [x] Add comprehensive SEO meta tags (title, description, canonical, OG, Twitter) to index.html
- [x] Add JSON-LD structured data (Organization schema) to homepage
- [x] Push to GitHub and redeploy on Vercel
- [x] Update all SEO URLs from vercel.app to https://www.fanliteplay.com (sitemap, robots.txt, index.html, meta tags, JSON-LD)

## 2-Step Security Gate
- [x] Build SecurityGate component (Step 1: reCAPTCHA v3, Step 2: Age Verification, interlinked)
- [x] Add mobile-only image reveal after both steps pass (removed per user request)
- [x] Add reCAPTCHA secret key to server env and create tRPC verifyCaptcha endpoint
- [x] Wire SecurityGate into App.tsx (mandatory for all visitors)
- [x] Push to GitHub and redeploy on Vercel
- [x] Fix reCAPTCHA v3 not working on security gate (switched to standalone REST endpoint, no DB dependency)

## Neon Postgres Integration
- [x] Migrate ORM from MySQL/mysql2 to Neon Postgres (drizzle-orm/neon-http + @neondatabase/serverless)
- [x] Rewrite drizzle/schema.ts from mysqlTable to pgTable with pgEnum types
- [x] Rewrite server/db.ts to use neon() driver (sync getDb, no lazy init)
- [x] Rewrite server/routers.ts to use .returning({ id }) instead of MySQL insertId pattern
- [x] Update drizzle.config.ts dialect from mysql to postgresql
- [x] Verify Neon DB has all 7 tables and 5 enums (confirmed via psycopg2)
- [x] Push to GitHub and redeploy on Vercel

## reCAPTCHA Enterprise Fix (Feb 2026)
- [x] Fix "Invalid site key" error: rewrite SecurityGate to use onload callback + grecaptcha.ready() for reliable initialization
- [x] Remove conflicting script tags from index.html (none found — script was dynamically injected)
- [x] Use onRecaptchaLoad global callback to ensure grecaptcha is fully initialized before execute()
- [x] Root cause identified: key is reCAPTCHA Enterprise (not standard v3) — switch to enterprise.js + grecaptcha.enterprise.execute()
- [x] Update backend /api/verify-captcha to use Enterprise Assessment API (recaptchaenterprise.googleapis.com)
- [x] Add graceful fallback in backend if Enterprise API key is not configured
- [x] User created new standard reCAPTCHA v3 key — updated site key and secret key, reverted from Enterprise to standard api.js + siteverify

## Custom Slider Captcha (replaces Google reCAPTCHA)
- [x] Build SliderCaptcha component (drag-to-verify, no external dependencies)
- [x] Update SecurityGate Step 1 to use SliderCaptcha instead of reCAPTCHA
- [x] Remove all reCAPTCHA script loading, keys, and backend verify-captcha endpoint
- [x] Push to GitHub and redeploy on Vercel

## Captcha Every Visit
- [x] Remove localStorage gate cache — captcha shows on every page visit

## Performance Optimizations (PageSpeed 83 → 90+)
- [x] Convert logo.png to WebP (28.9 KB → 5.8 KB, 80% smaller) and add explicit width/height attributes
- [x] Fix font loading: switched to non-blocking preload + noscript fallback
- [x] Preload /logo.webp in <head> for faster LCP
- [x] Lazy-load all non-critical routes (About, Login, Dashboard, Admin, etc.) to reduce initial JS bundle

## PageSpeed Round 2 Fixes
- [x] Remove maximum-scale=1 from viewport meta tag (Best Practices fix)
- [x] Removed unused recharts + chart.tsx (saves ~37 KB)
- [x] Replaced framer-motion with CSS @keyframes animations (saves ~114 KB)
- [x] Main JS bundle: 540 KB → 164 KB (70% smaller)
- [x] Further split vendor bundles with function-based manualChunks + cssCodeSplit

## PageSpeed Round 3 Fixes (Best Practices 100 + Performance 90+)
- [x] Fix analytics script 400 error: guard VITE_ANALYTICS_ENDPOINT so script only loads when env var is set
- [x] Self-host Inter font: downloaded inter-latin-wght-normal.woff2 (46 KB), added @font-face in index.css
- [x] Removed Google Fonts Inter dependency from index.html; kept only Playfair Display (headings only, non-blocking)

## Unused JS Reduction (Round 4)
- [x] Rewrite SecurityGate to accept onPassed callback (no children prop)
- [x] Created AppEntry.tsx with all heavy providers (tRPC, QueryClient, React Router)
- [x] Split main.tsx: SecurityGate renders first, AppEntry lazy-loaded only after gate passes
- [x] Main index bundle: 164 KB → 52 KB (68% smaller)
- [x] vendor-react (397 KB), vendor-radix (108 KB), vendor-trpc (84 KB) all deferred until after gate

## PageSpeed Round 5 Fixes
- [x] Replace lucide-react icons in SecurityGate and SliderCaptcha with inline SVGs
- [x] Remove unused Google Fonts preconnect hints from index.html
- [x] Self-host Playfair Display font to eliminate last Google Fonts dependency
