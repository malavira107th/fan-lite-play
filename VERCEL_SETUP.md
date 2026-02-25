# Fan Lite Play — Vercel Deployment Guide

This document explains how to deploy Fan Lite Play to Vercel step by step.

---

## Architecture Overview

The project is a **full-stack Express + React SPA**:

- **Frontend:** React 19 + Vite, built to `dist/public/`
- **Backend:** Express 4 + tRPC 11, served via `api/server.ts` as a Vercel Serverless Function
- **Database:** MySQL (PlanetScale or TiDB recommended for serverless compatibility)

All HTTP requests are routed through the Express serverless handler, which serves both the API (`/api/trpc/*`) and the static frontend (`dist/public/`).

---

## Step 1 — Connect GitHub Repository

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New Project** → Import the `fan-lite-play` repository from GitHub.
3. Vercel will auto-detect the `vercel.json` configuration.

---

## Step 2 — Set Environment Variables

In the Vercel project dashboard, go to **Settings → Environment Variables** and add the following:

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | **Yes** | MySQL connection string. Use PlanetScale or TiDB Cloud for serverless. Format: `mysql://user:pass@host:3306/dbname` |
| `JWT_SECRET` | **Yes** | Long random string for signing session cookies. Generate: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `NODE_ENV` | **Yes** | Set to `production` |
| `VITE_APP_ID` | No | Leave blank on Vercel |
| `OAUTH_SERVER_URL` | No | Leave blank on Vercel |
| `OWNER_OPEN_ID` | No | Leave blank on Vercel |
| `OWNER_NAME` | No | Leave blank on Vercel |
| `BUILT_IN_FORGE_API_URL` | No | Leave blank on Vercel |
| `BUILT_IN_FORGE_API_KEY` | No | Leave blank on Vercel |

---

## Step 3 — Database Setup

Fan Lite Play uses **MySQL**. For Vercel serverless, use one of these providers:

- **[PlanetScale](https://planetscale.com)** — Recommended. Free tier available. Serverless-compatible.
- **[TiDB Cloud](https://tidbcloud.com)** — MySQL-compatible, free tier available.
- **[Railway](https://railway.app)** — Simple MySQL hosting.

After creating your database, run the migrations:

```bash
DATABASE_URL="your-connection-string" pnpm db:push
```

---

## Step 4 — Deploy

Click **Deploy** in the Vercel dashboard. The build command (`pnpm build`) will:
1. Build the React frontend to `dist/public/`
2. Bundle the Express server to `dist/index.js`

The `api/server.ts` serverless function will handle all requests.

---

## Step 5 — Create Admin Account

After deployment:
1. Visit your Vercel URL and register a new account.
2. In your database, run: `UPDATE users SET role = 'admin' WHERE email = 'your@email.com';`
3. Sign in — you will be redirected to the Admin Panel automatically.

---

## Build Commands Reference

| Command | Purpose |
|---|---|
| `pnpm build` | Build frontend + bundle server |
| `pnpm start` | Start production server locally |
| `pnpm db:push` | Push schema migrations to database |
| `pnpm test` | Run all unit tests |

---

## Important Notes

- **Session cookies** use `SameSite=None; Secure` in production — HTTPS is required (Vercel provides this automatically).
- **File uploads** are not persisted on Vercel (ephemeral filesystem). The platform does not currently use file uploads, so this is not an issue.
- **Cold starts** — the first request after inactivity may take 1–2 seconds as the serverless function initialises.
