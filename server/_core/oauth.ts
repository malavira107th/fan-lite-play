import type { Express } from "express";

// Custom authentication is handled via tRPC procedures (auth.register / auth.login).
// This file is kept to satisfy the import in index.ts.
export function registerOAuthRoutes(_app: Express) {
  // No-op: Manus OAuth is replaced by custom email/password auth.
}
