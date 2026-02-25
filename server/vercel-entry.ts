/**
 * Vercel Serverless Function Entry Point
 *
 * This file is the bridge between Vercel's serverless Node.js runtime and the
 * Express application. Vercel expects a default export of a request handler.
 *
 * The Express app is created once (module-level) so it is reused across warm
 * invocations — avoiding a fresh DB connection on every request.
 */
import { createApp } from "./_core/app";
import path from "path";
import fs from "fs";
import express from "express";

let appInstance: ReturnType<typeof express> | null = null;
let startupError: Error | null = null;

try {
  const { app } = createApp();

  // Serve the pre-built Vite frontend from dist/public
  const distPath = path.resolve(process.cwd(), "dist", "public");
  app.use(express.static(distPath));

  // SPA fallback — all non-API routes serve index.html
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.use("*", (_req: any, res: any) => {
    const indexPath = path.resolve(distPath, "index.html");
    const content = fs.readFileSync(indexPath);
    res.setHeader("Content-Type", "text/html");
    res.end(content);
  });

  appInstance = app;
} catch (err) {
  startupError = err instanceof Error ? err : new Error(String(err));
  console.error("[STARTUP ERROR]", startupError.message, startupError.stack);
}

// Vercel expects a default export of the Express app (acts as the handler)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function handler(req: any, res: any) {
  if (startupError) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Server startup failed", message: startupError.message, stack: startupError.stack }));
    return;
  }
  if (!appInstance) {
    res.statusCode = 500;
    res.end("App not initialized");
    return;
  }
  appInstance(req, res);
}
