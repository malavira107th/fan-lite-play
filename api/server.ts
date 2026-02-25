/**
 * Vercel Serverless Function Entry Point
 *
 * This file is the bridge between Vercel's serverless Node.js runtime and the
 * Express application. Vercel expects a default export of a request handler.
 *
 * The Express app is created once (module-level) so it is reused across warm
 * invocations — avoiding a fresh DB connection on every request.
 */
import { createApp } from "../server/_core/app";
import path from "path";
import express from "express";
import type { Request, Response } from "express";

const { app } = createApp();

// Serve the pre-built Vite frontend from dist/public
const distPath = path.resolve(process.cwd(), "dist", "public");
app.use(express.static(distPath));

// SPA fallback — all non-API routes serve index.html
app.use("*", (_req: Request, res: Response) => {
  res.sendFile(path.resolve(distPath, "index.html"));
});

// Vercel expects a default export of the Express app (acts as the handler)
export default app;
