import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import axios from "axios";

/**
 * Creates and configures the Express app.
 * Used by both the local dev/prod server (index.ts) and the Vercel handler (api/server.ts).
 */
export function createApp() {
  const app = express();
  const server = createServer(app);

  // Body parsers
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // OAuth routes (no-op stub for custom auth, kept for compatibility)
  registerOAuthRoutes(app);

  // ── Standalone reCAPTCHA verification endpoint (no DB required) ──────────────
  app.post("/api/verify-captcha", async (req, res) => {
    const { token } = req.body as { token?: string };
    if (!token) {
      res.json({ success: false, score: 0, error: "No token provided" });
      return;
    }
    const secretKey = process.env.RECAPTCHA_SECRET_KEY || "6LcgincsAAAAAVyljRGakK1d31_Pr9pHCDj-BKq";
    try {
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        new URLSearchParams({ secret: secretKey, response: token }).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      const data = response.data as { success: boolean; score: number; "error-codes"?: string[] };
      res.json({ success: data.success, score: data.score ?? 0, errorCodes: data["error-codes"] });
    } catch (err) {
      res.json({ success: false, score: 0, error: "Verification request failed" });
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  return { app, server };
}
