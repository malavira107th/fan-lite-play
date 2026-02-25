var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/_core/env.ts
var ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    ENV = {
      appId: process.env.VITE_APP_ID ?? "",
      cookieSecret: process.env.JWT_SECRET ?? "",
      databaseUrl: process.env.DATABASE_URL ?? "",
      oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
      ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
      isProduction: process.env.NODE_ENV === "production",
      forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
      forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
    };
  }
});

// server/_core/notification.ts
var notification_exports = {};
__export(notification_exports, {
  notifyOwner: () => notifyOwner
});
import { TRPCError as TRPCError2 } from "@trpc/server";
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError2({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError2({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}
var TITLE_MAX_LENGTH, CONTENT_MAX_LENGTH, trimValue, isNonEmptyString2, buildEndpointUrl, validatePayload;
var init_notification = __esm({
  "server/_core/notification.ts"() {
    "use strict";
    init_env();
    TITLE_MAX_LENGTH = 1200;
    CONTENT_MAX_LENGTH = 2e4;
    trimValue = (value) => value.trim();
    isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
    buildEndpointUrl = (baseUrl) => {
      const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
      return new URL(
        "webdevtoken.v1.WebDevService/SendNotification",
        normalizedBase
      ).toString();
    };
    validatePayload = (input) => {
      if (!isNonEmptyString2(input.title)) {
        throw new TRPCError2({
          code: "BAD_REQUEST",
          message: "Notification title is required."
        });
      }
      if (!isNonEmptyString2(input.content)) {
        throw new TRPCError2({
          code: "BAD_REQUEST",
          message: "Notification content is required."
        });
      }
      const title = trimValue(input.title);
      const content = trimValue(input.content);
      if (title.length > TITLE_MAX_LENGTH) {
        throw new TRPCError2({
          code: "BAD_REQUEST",
          message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
        });
      }
      if (content.length > CONTENT_MAX_LENGTH) {
        throw new TRPCError2({
          code: "BAD_REQUEST",
          message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
        });
      }
      return { title, content };
    };
  }
});

// server/_core/app.ts
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// server/_core/oauth.ts
function registerOAuthRoutes(_app) {
}

// server/routers.ts
import bcrypt from "bcryptjs";
import { and, desc, eq as eq2, sql } from "drizzle-orm";
import { z } from "zod";

// drizzle/schema.ts
import {
  boolean,
  numeric,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
  serial
} from "drizzle-orm/pg-core";
var userRoleEnum = pgEnum("user_role", ["user", "admin"]);
var matchFormatEnum = pgEnum("match_format", ["T20", "ODI", "Test"]);
var matchStatusEnum = pgEnum("match_status", ["upcoming", "live", "completed"]);
var playerRoleEnum = pgEnum("player_role", ["batsman", "bowler", "all-rounder", "wicket-keeper"]);
var challengeStatusEnum = pgEnum("challenge_status", ["open", "locked", "completed"]);
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 64 }).notNull().unique(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 256 }).notNull(),
  name: text("name"),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});
var matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  teamA: varchar("teamA", { length: 128 }).notNull(),
  teamB: varchar("teamB", { length: 128 }).notNull(),
  venue: varchar("venue", { length: 256 }),
  matchDate: timestamp("matchDate").notNull(),
  format: matchFormatEnum("format").default("T20").notNull(),
  status: matchStatusEnum("status").default("upcoming").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull()
});
var players = pgTable("players", {
  id: serial("id").primaryKey(),
  matchId: integer("matchId").notNull().references(() => matches.id),
  name: varchar("name", { length: 128 }).notNull(),
  team: varchar("team", { length: 128 }).notNull(),
  role: playerRoleEnum("role").notNull(),
  credits: numeric("credits", { precision: 4, scale: 1 }).notNull().default("8.0"),
  imageUrl: text("imageUrl"),
  isCaptainEligible: boolean("isCaptainEligible").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});
var playerPerformance = pgTable("playerPerformance", {
  id: serial("id").primaryKey(),
  playerId: integer("playerId").notNull().references(() => players.id),
  matchId: integer("matchId").notNull().references(() => matches.id),
  // Batting
  runsScored: integer("runsScored").default(0).notNull(),
  ballsFaced: integer("ballsFaced").default(0).notNull(),
  fours: integer("fours").default(0).notNull(),
  sixes: integer("sixes").default(0).notNull(),
  fifties: integer("fifties").default(0).notNull(),
  hundreds: integer("hundreds").default(0).notNull(),
  ducks: integer("ducks").default(0).notNull(),
  // Bowling
  wickets: integer("wickets").default(0).notNull(),
  oversBowled: numeric("oversBowled", { precision: 4, scale: 1 }).default("0.0").notNull(),
  maidens: integer("maidens").default(0).notNull(),
  dotBalls: integer("dotBalls").default(0).notNull(),
  // Fielding
  catches: integer("catches").default(0).notNull(),
  stumpings: integer("stumpings").default(0).notNull(),
  runOuts: integer("runOuts").default(0).notNull(),
  // Computed
  totalPoints: numeric("totalPoints", { precision: 8, scale: 2 }).default("0.00").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull()
});
var challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  matchId: integer("matchId").notNull().references(() => matches.id),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  creditLimit: numeric("creditLimit", { precision: 5, scale: 1 }).notNull().default("100.0"),
  maxEntriesPerUser: integer("maxEntriesPerUser").default(3).notNull(),
  status: challengeStatusEnum("status").default("open").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull()
});
var teamEntries = pgTable("teamEntries", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id),
  challengeId: integer("challengeId").notNull().references(() => challenges.id),
  matchId: integer("matchId").notNull().references(() => matches.id),
  teamName: varchar("teamName", { length: 128 }).notNull(),
  captainId: integer("captainId").references(() => players.id),
  viceCaptainId: integer("viceCaptainId").references(() => players.id),
  totalPoints: numeric("totalPoints", { precision: 8, scale: 2 }).default("0.00").notNull(),
  rank: integer("rank"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull()
});
var teamEntryPlayers = pgTable("teamEntryPlayers", {
  id: serial("id").primaryKey(),
  teamEntryId: integer("teamEntryId").notNull().references(() => teamEntries.id),
  playerId: integer("playerId").notNull().references(() => players.id)
});

// server/routers.ts
import axios from "axios";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers?.["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";

// server/db.ts
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
var _db = null;
function getDb() {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    const client = postgres(url, { ssl: "require", max: 1 });
    _db = drizzle(client);
  }
  return _db;
}
async function getUserById(id) {
  const db = getDb();
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

// server/_core/sdk.ts
init_env();
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var SDKServer = class {
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) return /* @__PURE__ */ new Map();
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({ userId: payload.userId, role: payload.role }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) return null;
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { userId, role } = payload;
      if (typeof userId !== "number" || !isNonEmptyString(role)) return null;
      return { userId, role };
    } catch {
      return null;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers?.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const user = await getUserById(session.userId);
    if (!user) {
      throw ForbiddenError("User not found");
    }
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/routers.ts
function calculatePoints(perf) {
  let pts = 0;
  pts += perf.runsScored * 1;
  pts += perf.fours * 1;
  pts += perf.sixes * 2;
  pts += perf.fifties * 8;
  pts += perf.hundreds * 16;
  pts -= perf.ducks * 2;
  if (perf.ballsFaced >= 10) {
    const sr = perf.runsScored / perf.ballsFaced * 100;
    if (sr >= 170) pts += 6;
    else if (sr >= 150) pts += 4;
    else if (sr >= 130) pts += 2;
    else if (sr < 50) pts -= 6;
    else if (sr < 60) pts -= 4;
    else if (sr < 70) pts -= 2;
  }
  pts += perf.wickets * 25;
  pts += perf.maidens * 8;
  pts += perf.dotBalls * 1;
  if (perf.wickets >= 5) pts += 16;
  else if (perf.wickets >= 4) pts += 8;
  else if (perf.wickets >= 3) pts += 4;
  pts += perf.catches * 8;
  pts += perf.stumpings * 12;
  pts += perf.runOuts * 6;
  return pts;
}
var appRouter = router({
  // ── reCAPTCHA Verification ────────────────────────────────────────────────
  verifyCaptcha: publicProcedure.input(z.object({ token: z.string().min(1) })).mutation(async ({ input }) => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY || "6LcgincsAAAAAVyljRGakK1d31_Pr9pHCDj-BKq";
    try {
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${input.token}`,
        {},
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      const data = response.data;
      return {
        success: data.success,
        score: data.score ?? 0
      };
    } catch {
      return { success: false, score: 0 };
    }
  }),
  // ── Auth ──────────────────────────────────────────────────────────────────
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    register: publicProcedure.input(
      z.object({
        username: z.string().min(3).max(32).regex(/^[a-zA-Z0-9_]+$/),
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(1).max(64).optional()
      })
    ).mutation(async ({ input, ctx }) => {
      const db = getDb();
      const existing = await db.select({ id: users.id }).from(users).where(eq2(users.email, input.email)).limit(1);
      if (existing.length > 0) throw new Error("Email already registered");
      const existingUsername = await db.select({ id: users.id }).from(users).where(eq2(users.username, input.username)).limit(1);
      if (existingUsername.length > 0) throw new Error("Username already taken");
      const passwordHash = await bcrypt.hash(input.password, 12);
      const [newUser] = await db.insert(users).values({
        username: input.username,
        email: input.email,
        passwordHash,
        name: input.name ?? input.username,
        role: "user"
      }).returning({ id: users.id });
      const userId = newUser.id;
      const token = await sdk.signSession({ userId, role: "user" }, { expiresInMs: ONE_YEAR_MS });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      return { success: true };
    }),
    login: publicProcedure.input(z.object({ email: z.string().email(), password: z.string() })).mutation(async ({ input, ctx }) => {
      const db = getDb();
      const [user] = await db.select().from(users).where(eq2(users.email, input.email)).limit(1);
      if (!user) throw new Error("Invalid email or password");
      const valid = await bcrypt.compare(input.password, user.passwordHash);
      if (!valid) throw new Error("Invalid email or password");
      await db.update(users).set({ lastSignedIn: /* @__PURE__ */ new Date() }).where(eq2(users.id, user.id));
      const token = await sdk.signSession(
        { userId: user.id, role: user.role },
        { expiresInMs: ONE_YEAR_MS }
      );
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      return { success: true, role: user.role };
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    })
  }),
  // ── Matches ───────────────────────────────────────────────────────────────
  matches: router({
    list: publicProcedure.input(z.object({ status: z.enum(["upcoming", "live", "completed"]).optional() }).optional()).query(async ({ input }) => {
      const db = getDb();
      const query = db.select().from(matches).orderBy(desc(matches.matchDate));
      if (input?.status) {
        return db.select().from(matches).where(eq2(matches.status, input.status)).orderBy(desc(matches.matchDate));
      }
      return query;
    }),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      const db = getDb();
      const [match] = await db.select().from(matches).where(eq2(matches.id, input.id)).limit(1);
      return match ?? null;
    }),
    create: adminProcedure.input(
      z.object({
        title: z.string().min(1),
        teamA: z.string().min(1),
        teamB: z.string().min(1),
        venue: z.string().optional(),
        matchDate: z.string(),
        format: z.enum(["T20", "ODI", "Test"])
      })
    ).mutation(async ({ input }) => {
      const db = getDb();
      const [result] = await db.insert(matches).values({
        ...input,
        matchDate: new Date(input.matchDate),
        status: "upcoming"
      }).returning({ id: matches.id });
      return { id: result.id };
    }),
    update: adminProcedure.input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        teamA: z.string().optional(),
        teamB: z.string().optional(),
        venue: z.string().optional(),
        matchDate: z.string().optional(),
        format: z.enum(["T20", "ODI", "Test"]).optional(),
        status: z.enum(["upcoming", "live", "completed"]).optional()
      })
    ).mutation(async ({ input }) => {
      const db = getDb();
      const { id, matchDate, ...rest } = input;
      const updateData = { ...rest };
      if (matchDate) updateData.matchDate = new Date(matchDate);
      await db.update(matches).set(updateData).where(eq2(matches.id, id));
      return { success: true };
    })
  }),
  // ── Players ───────────────────────────────────────────────────────────────
  players: router({
    byMatch: publicProcedure.input(z.object({ matchId: z.number() })).query(async ({ input }) => {
      const db = getDb();
      return db.select().from(players).where(eq2(players.matchId, input.matchId));
    }),
    create: adminProcedure.input(
      z.object({
        matchId: z.number(),
        name: z.string().min(1),
        team: z.string().min(1),
        role: z.enum(["batsman", "bowler", "all-rounder", "wicket-keeper"]),
        credits: z.string(),
        imageUrl: z.string().optional(),
        isCaptainEligible: z.boolean().optional()
      })
    ).mutation(async ({ input }) => {
      const db = getDb();
      const [result] = await db.insert(players).values({
        ...input,
        isCaptainEligible: input.isCaptainEligible ?? true
      }).returning({ id: players.id });
      return { id: result.id };
    }),
    update: adminProcedure.input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        team: z.string().optional(),
        role: z.enum(["batsman", "bowler", "all-rounder", "wicket-keeper"]).optional(),
        credits: z.string().optional(),
        imageUrl: z.string().optional(),
        isCaptainEligible: z.boolean().optional()
      })
    ).mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...rest } = input;
      await db.update(players).set(rest).where(eq2(players.id, id));
      return { success: true };
    }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(players).where(eq2(players.id, input.id));
      return { success: true };
    })
  }),
  // ── Performance ───────────────────────────────────────────────────────────
  performance: router({
    byMatch: publicProcedure.input(z.object({ matchId: z.number() })).query(async ({ input }) => {
      const db = getDb();
      return db.select().from(playerPerformance).where(eq2(playerPerformance.matchId, input.matchId));
    }),
    upsert: adminProcedure.input(
      z.object({
        playerId: z.number(),
        matchId: z.number(),
        runsScored: z.number().default(0),
        ballsFaced: z.number().default(0),
        fours: z.number().default(0),
        sixes: z.number().default(0),
        fifties: z.number().default(0),
        hundreds: z.number().default(0),
        ducks: z.number().default(0),
        wickets: z.number().default(0),
        oversBowled: z.string().default("0.0"),
        maidens: z.number().default(0),
        dotBalls: z.number().default(0),
        catches: z.number().default(0),
        stumpings: z.number().default(0),
        runOuts: z.number().default(0)
      })
    ).mutation(async ({ input }) => {
      const db = getDb();
      const totalPoints = calculatePoints({
        runsScored: input.runsScored,
        ballsFaced: input.ballsFaced,
        fours: input.fours,
        sixes: input.sixes,
        fifties: input.fifties,
        hundreds: input.hundreds,
        ducks: input.ducks,
        wickets: input.wickets,
        maidens: input.maidens,
        dotBalls: input.dotBalls,
        catches: input.catches,
        stumpings: input.stumpings,
        runOuts: input.runOuts
      });
      const existing = await db.select({ id: playerPerformance.id }).from(playerPerformance).where(
        and(
          eq2(playerPerformance.playerId, input.playerId),
          eq2(playerPerformance.matchId, input.matchId)
        )
      ).limit(1);
      if (existing.length > 0) {
        await db.update(playerPerformance).set({ ...input, totalPoints: String(totalPoints) }).where(eq2(playerPerformance.id, existing[0].id));
      } else {
        await db.insert(playerPerformance).values({ ...input, totalPoints: String(totalPoints) });
      }
      const entries = await db.select().from(teamEntries).where(eq2(teamEntries.matchId, input.matchId));
      for (const entry of entries) {
        const entryPlayers = await db.select({ playerId: teamEntryPlayers.playerId }).from(teamEntryPlayers).where(eq2(teamEntryPlayers.teamEntryId, entry.id));
        let entryPoints = 0;
        for (const ep of entryPlayers) {
          const [perf] = await db.select({ totalPoints: playerPerformance.totalPoints }).from(playerPerformance).where(
            and(
              eq2(playerPerformance.playerId, ep.playerId),
              eq2(playerPerformance.matchId, input.matchId)
            )
          ).limit(1);
          if (perf) {
            let pts = Number(perf.totalPoints);
            if (ep.playerId === entry.captainId) pts *= 2;
            else if (ep.playerId === entry.viceCaptainId) pts *= 1.5;
            entryPoints += pts;
          }
        }
        await db.update(teamEntries).set({ totalPoints: String(entryPoints) }).where(eq2(teamEntries.id, entry.id));
      }
      const challengeEntries = await db.select().from(teamEntries).where(eq2(teamEntries.matchId, input.matchId)).orderBy(desc(teamEntries.totalPoints));
      for (let i = 0; i < challengeEntries.length; i++) {
        await db.update(teamEntries).set({ rank: i + 1 }).where(eq2(teamEntries.id, challengeEntries[i].id));
      }
      return { success: true, totalPoints };
    })
  }),
  // ── Challenges ────────────────────────────────────────────────────────────
  challenges: router({
    list: publicProcedure.input(z.object({ matchId: z.number().optional() }).optional()).query(async ({ input }) => {
      const db = getDb();
      if (input?.matchId) {
        return db.select().from(challenges).where(eq2(challenges.matchId, input.matchId)).orderBy(desc(challenges.createdAt));
      }
      return db.select().from(challenges).orderBy(desc(challenges.createdAt));
    }),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      const db = getDb();
      const [c] = await db.select().from(challenges).where(eq2(challenges.id, input.id)).limit(1);
      return c ?? null;
    }),
    create: adminProcedure.input(
      z.object({
        matchId: z.number(),
        title: z.string().min(1),
        description: z.string().optional(),
        creditLimit: z.string().default("100.0"),
        maxEntriesPerUser: z.number().default(3)
      })
    ).mutation(async ({ input }) => {
      const db = getDb();
      const [result] = await db.insert(challenges).values({ ...input, status: "open" }).returning({ id: challenges.id });
      return { id: result.id };
    }),
    update: adminProcedure.input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        status: z.enum(["open", "locked", "completed"]).optional(),
        maxEntriesPerUser: z.number().optional()
      })
    ).mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...rest } = input;
      await db.update(challenges).set(rest).where(eq2(challenges.id, id));
      return { success: true };
    })
  }),
  // ── Team Entries ──────────────────────────────────────────────────────────
  teams: router({
    myEntries: protectedProcedure.input(z.object({ challengeId: z.number().optional() }).optional()).query(async ({ ctx, input }) => {
      const db = getDb();
      if (input?.challengeId) {
        return db.select().from(teamEntries).where(
          and(
            eq2(teamEntries.userId, ctx.user.id),
            eq2(teamEntries.challengeId, input.challengeId)
          )
        ).orderBy(desc(teamEntries.createdAt));
      }
      return db.select().from(teamEntries).where(eq2(teamEntries.userId, ctx.user.id)).orderBy(desc(teamEntries.createdAt));
    }),
    entryPlayers: protectedProcedure.input(z.object({ teamEntryId: z.number() })).query(async ({ input }) => {
      const db = getDb();
      return db.select({
        id: players.id,
        name: players.name,
        team: players.team,
        role: players.role,
        credits: players.credits,
        imageUrl: players.imageUrl
      }).from(teamEntryPlayers).innerJoin(players, eq2(teamEntryPlayers.playerId, players.id)).where(eq2(teamEntryPlayers.teamEntryId, input.teamEntryId));
    }),
    create: protectedProcedure.input(
      z.object({
        challengeId: z.number(),
        matchId: z.number(),
        teamName: z.string().min(1).max(64),
        playerIds: z.array(z.number()).length(11),
        captainId: z.number(),
        viceCaptainId: z.number()
      })
    ).mutation(async ({ ctx, input }) => {
      const db = getDb();
      const [challenge] = await db.select().from(challenges).where(eq2(challenges.id, input.challengeId)).limit(1);
      if (!challenge || challenge.status !== "open")
        throw new Error("Challenge is not open for entries");
      const existingEntries = await db.select({ id: teamEntries.id }).from(teamEntries).where(
        and(
          eq2(teamEntries.userId, ctx.user.id),
          eq2(teamEntries.challengeId, input.challengeId)
        )
      );
      if (existingEntries.length >= challenge.maxEntriesPerUser)
        throw new Error(`Maximum ${challenge.maxEntriesPerUser} entries allowed per user`);
      const matchPlayers = await db.select().from(players).where(eq2(players.matchId, input.matchId));
      const selectedPlayers = matchPlayers.filter((p) => input.playerIds.includes(p.id));
      const totalCredits = selectedPlayers.reduce((sum, p) => sum + Number(p.credits), 0);
      if (totalCredits > Number(challenge.creditLimit))
        throw new Error(`Team exceeds credit limit of ${challenge.creditLimit}`);
      if (!input.playerIds.includes(input.captainId))
        throw new Error("Captain must be in selected players");
      if (!input.playerIds.includes(input.viceCaptainId))
        throw new Error("Vice-captain must be in selected players");
      const [result] = await db.insert(teamEntries).values({
        userId: ctx.user.id,
        challengeId: input.challengeId,
        matchId: input.matchId,
        teamName: input.teamName,
        captainId: input.captainId,
        viceCaptainId: input.viceCaptainId,
        totalPoints: "0.00"
      }).returning({ id: teamEntries.id });
      const entryId = result.id;
      await db.insert(teamEntryPlayers).values(
        input.playerIds.map((playerId) => ({ teamEntryId: entryId, playerId }))
      );
      return { id: entryId };
    })
  }),
  // ── Leaderboard ───────────────────────────────────────────────────────────
  leaderboard: router({
    byChallenge: publicProcedure.input(z.object({ challengeId: z.number(), limit: z.number().default(50) })).query(async ({ input }) => {
      const db = getDb();
      return db.select({
        rank: teamEntries.rank,
        teamName: teamEntries.teamName,
        totalPoints: teamEntries.totalPoints,
        userId: teamEntries.userId,
        userName: users.name,
        username: users.username
      }).from(teamEntries).innerJoin(users, eq2(teamEntries.userId, users.id)).where(eq2(teamEntries.challengeId, input.challengeId)).orderBy(desc(teamEntries.totalPoints)).limit(input.limit);
    }),
    overall: publicProcedure.input(z.object({ limit: z.number().default(50) })).query(async ({ input }) => {
      const db = getDb();
      return db.select({
        userId: teamEntries.userId,
        userName: users.name,
        username: users.username,
        totalPoints: sql`SUM(${teamEntries.totalPoints})`,
        entriesCount: sql`COUNT(${teamEntries.id})`
      }).from(teamEntries).innerJoin(users, eq2(teamEntries.userId, users.id)).groupBy(teamEntries.userId, users.name, users.username).orderBy(desc(sql`SUM(${teamEntries.totalPoints})`)).limit(input.limit);
    })
  }),
  // ── Dashboard ─────────────────────────────────────────────────────────────
  dashboard: router({
    stats: protectedProcedure.query(async ({ ctx }) => {
      const db = getDb();
      const entries = await db.select().from(teamEntries).where(eq2(teamEntries.userId, ctx.user.id));
      const totalPoints = entries.reduce((sum, e) => sum + Number(e.totalPoints), 0);
      const ranks = entries.map((e) => e.rank).filter(Boolean);
      const bestRank = ranks.length > 0 ? Math.min(...ranks) : null;
      const challengeIds = new Set(entries.map((e) => e.challengeId));
      return {
        totalEntries: entries.length,
        totalPoints,
        bestRank,
        challengesJoined: challengeIds.size
      };
    }),
    recentEntries: protectedProcedure.input(z.object({ limit: z.number().default(10) })).query(async ({ ctx, input }) => {
      const db = getDb();
      return db.select({
        id: teamEntries.id,
        teamName: teamEntries.teamName,
        totalPoints: teamEntries.totalPoints,
        rank: teamEntries.rank,
        createdAt: teamEntries.createdAt,
        matchTitle: matches.title,
        challengeTitle: challenges.title,
        matchStatus: matches.status
      }).from(teamEntries).innerJoin(matches, eq2(teamEntries.matchId, matches.id)).innerJoin(challenges, eq2(teamEntries.challengeId, challenges.id)).where(eq2(teamEntries.userId, ctx.user.id)).orderBy(desc(teamEntries.createdAt)).limit(input.limit);
    })
  }),
  // ── Admin ─────────────────────────────────────────────────────────────────
  admin: router({
    stats: adminProcedure.query(async () => {
      const db = getDb();
      const [userCount] = await db.select({ count: sql`COUNT(*)` }).from(users);
      const [matchCount] = await db.select({ count: sql`COUNT(*)` }).from(matches);
      const [challengeCount] = await db.select({ count: sql`COUNT(*)` }).from(challenges);
      const [entryCount] = await db.select({ count: sql`COUNT(*)` }).from(teamEntries);
      return {
        users: Number(userCount?.count ?? 0),
        matches: Number(matchCount?.count ?? 0),
        challenges: Number(challengeCount?.count ?? 0),
        entries: Number(entryCount?.count ?? 0)
      };
    }),
    allUsers: adminProcedure.query(async () => {
      const db = getDb();
      return db.select({
        id: users.id,
        username: users.username,
        email: users.email,
        name: users.name,
        role: users.role,
        createdAt: users.createdAt,
        lastSignedIn: users.lastSignedIn
      }).from(users).orderBy(desc(users.createdAt));
    }),
    setUserRole: adminProcedure.input(z.object({ userId: z.number(), role: z.enum(["user", "admin"]) })).mutation(async ({ input }) => {
      const db = getDb();
      await db.update(users).set({ role: input.role }).where(eq2(users.id, input.userId));
      return { success: true };
    })
  }),
  // ── System ────────────────────────────────────────────────────────────────
  system: router({
    notifyOwner: protectedProcedure.input(z.object({ title: z.string(), content: z.string() })).mutation(async ({ input }) => {
      const { notifyOwner: notifyOwner2 } = await Promise.resolve().then(() => (init_notification(), notification_exports));
      return notifyOwner2({ title: input.title, content: input.content });
    })
  })
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/app.ts
import axios2 from "axios";
function createApp() {
  const app = express();
  const server = createServer(app);
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerOAuthRoutes(app);
  app.post("/api/verify-captcha", async (req, res) => {
    const { token } = req.body;
    if (!token) {
      res.json({ success: false, score: 0, error: "No token provided" });
      return;
    }
    const secretKey = process.env.RECAPTCHA_SECRET_KEY || "6LcgincsAAAAAVyljRGakK1d31_Pr9pHCDj-BKq";
    try {
      const response = await axios2.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        new URLSearchParams({ secret: secretKey, response: token }).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      const data = response.data;
      res.json({ success: data.success, score: data.score ?? 0, errorCodes: data["error-codes"] });
    } catch (err) {
      res.json({ success: false, score: 0, error: "Verification request failed" });
    }
  });
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  return { app, server };
}

// server/vercel-entry.ts
import path from "path";
import fs from "fs";
import express2 from "express";
var appInstance = null;
var startupError = null;
try {
  const { app } = createApp();
  const distPath = path.resolve(process.cwd(), "dist", "public");
  app.use(express2.static(distPath));
  app.use("*", (_req, res) => {
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
function handler(req, res) {
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
export {
  handler as default
};
