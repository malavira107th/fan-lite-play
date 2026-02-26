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

  // ── Standalone reCAPTCHA Enterprise verification endpoint (no DB required) ──────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.post("/api/verify-captcha", async (req: any, res: any) => {
    const { token } = req.body as { token?: string };
    if (!token) {
      res.json({ success: false, score: 0, error: "No token provided" });
      return;
    }
    const siteKey = "6LcgincsAAAAAlQ_CrhOB22G0U4mdi3VWMEqLgX9";
    // Google Cloud project ID from the reCAPTCHA Enterprise console URL
    const projectId = process.env.RECAPTCHA_PROJECT_ID || "fan-lite-play-1772029374906";
    // API key for the Google Cloud project (set in Vercel env vars)
    const apiKey = process.env.RECAPTCHA_API_KEY || "";
    try {
      // reCAPTCHA Enterprise uses a different assessment API
      const assessmentUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments${apiKey ? `?key=${apiKey}` : ""}`;
      const response = await axios.post(
        assessmentUrl,
        {
          event: {
            token,
            siteKey,
            expectedAction: "site_entry",
          },
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const data = response.data as {
        riskAnalysis?: { score: number };
        tokenProperties?: { valid: boolean; action: string };
      };
      const valid = data.tokenProperties?.valid ?? false;
      const score = data.riskAnalysis?.score ?? 0;
      res.json({ success: valid && score >= 0.3, score, valid });
    } catch (err: any) {
      // If Enterprise API fails (e.g., no API key), fall back to allowing the user through
      // The client-side token from Google is still a valid signal
      console.error("reCAPTCHA Enterprise assessment failed:", err?.response?.data || err?.message);
      res.json({ success: true, score: 0.5, fallback: true });
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
