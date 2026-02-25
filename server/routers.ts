import bcrypt from "bcryptjs";
import { and, desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import {
  challenges,
  matches,
  playerPerformance,
  players,
  teamEntries,
  teamEntryPlayers,
  users,
} from "../drizzle/schema";
import axios from "axios";
import { COOKIE_NAME, ONE_YEAR_MS } from "../shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { sdk } from "./_core/sdk";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";

// ─── Points Calculation ───────────────────────────────────────────────────────
function calculatePoints(perf: {
  runsScored: number;
  ballsFaced: number;
  fours: number;
  sixes: number;
  fifties: number;
  hundreds: number;
  ducks: number;
  wickets: number;
  maidens: number;
  dotBalls: number;
  catches: number;
  stumpings: number;
  runOuts: number;
}): number {
  let pts = 0;
  // Batting
  pts += perf.runsScored * 1;
  pts += perf.fours * 1;
  pts += perf.sixes * 2;
  pts += perf.fifties * 8;
  pts += perf.hundreds * 16;
  pts -= perf.ducks * 2;
  // Strike rate bonus/penalty (if balls faced > 10)
  if (perf.ballsFaced >= 10) {
    const sr = (perf.runsScored / perf.ballsFaced) * 100;
    if (sr >= 170) pts += 6;
    else if (sr >= 150) pts += 4;
    else if (sr >= 130) pts += 2;
    else if (sr < 50) pts -= 6;
    else if (sr < 60) pts -= 4;
    else if (sr < 70) pts -= 2;
  }
  // Bowling
  pts += perf.wickets * 25;
  pts += perf.maidens * 8;
  pts += perf.dotBalls * 1;
  if (perf.wickets >= 5) pts += 16;
  else if (perf.wickets >= 4) pts += 8;
  else if (perf.wickets >= 3) pts += 4;
  // Fielding
  pts += perf.catches * 8;
  pts += perf.stumpings * 12;
  pts += perf.runOuts * 6;
  return pts;
}

// ─── App Router ───────────────────────────────────────────────────────────────
export const appRouter = router({
  // ── reCAPTCHA Verification ────────────────────────────────────────────────
  verifyCaptcha: publicProcedure
    .input(z.object({ token: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const secretKey = process.env.RECAPTCHA_SECRET_KEY || "6LcgincsAAAAAVyljRGakK1d31_Pr9pHCDj-BKq";
      try {
        const response = await axios.post(
          `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${input.token}`,
          {},
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        const data = response.data as { success: boolean; score: number; action: string };
        return {
          success: data.success,
          score: data.score ?? 0,
        };
      } catch {
        return { success: false, score: 0 };
      }
    }),

  // ── Auth ──────────────────────────────────────────────────────────────────
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),

    register: publicProcedure
      .input(
        z.object({
          username: z.string().min(3).max(32).regex(/^[a-zA-Z0-9_]+$/),
          email: z.string().email(),
          password: z.string().min(8),
          name: z.string().min(1).max(64).optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const db = getDb();

        const existing = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.email, input.email))
          .limit(1);
        if (existing.length > 0) throw new Error("Email already registered");

        const existingUsername = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.username, input.username))
          .limit(1);
        if (existingUsername.length > 0) throw new Error("Username already taken");

        const passwordHash = await bcrypt.hash(input.password, 12);
        const [newUser] = await db.insert(users).values({
          username: input.username,
          email: input.email,
          passwordHash,
          name: input.name ?? input.username,
          role: "user",
        }).returning({ id: users.id });

        const userId = newUser!.id;
        const token = await sdk.signSession({ userId, role: "user" }, { expiresInMs: ONE_YEAR_MS });
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });

        return { success: true };
      }),

    login: publicProcedure
      .input(z.object({ email: z.string().email(), password: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const db = getDb();

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, input.email))
          .limit(1);
        if (!user) throw new Error("Invalid email or password");

        const valid = await bcrypt.compare(input.password, user.passwordHash);
        if (!valid) throw new Error("Invalid email or password");

        await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));

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
      return { success: true } as const;
    }),
  }),

  // ── Matches ───────────────────────────────────────────────────────────────
  matches: router({
    list: publicProcedure
      .input(z.object({ status: z.enum(["upcoming", "live", "completed"]).optional() }).optional())
      .query(async ({ input }) => {
        const db = getDb();
        const query = db.select().from(matches).orderBy(desc(matches.matchDate));
        if (input?.status) {
          return db.select().from(matches).where(eq(matches.status, input.status)).orderBy(desc(matches.matchDate));
        }
        return query;
      }),

    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const db = getDb();
        const [match] = await db.select().from(matches).where(eq(matches.id, input.id)).limit(1);
        return match ?? null;
      }),

    create: adminProcedure
      .input(
        z.object({
          title: z.string().min(1),
          teamA: z.string().min(1),
          teamB: z.string().min(1),
          venue: z.string().optional(),
          matchDate: z.string(),
          format: z.enum(["T20", "ODI", "Test"]),
        })
      )
      .mutation(async ({ input }) => {
        const db = getDb();
        const [result] = await db.insert(matches).values({
          ...input,
          matchDate: new Date(input.matchDate),
          status: "upcoming",
        }).returning({ id: matches.id });
        return { id: result!.id };
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          teamA: z.string().optional(),
          teamB: z.string().optional(),
          venue: z.string().optional(),
          matchDate: z.string().optional(),
          format: z.enum(["T20", "ODI", "Test"]).optional(),
          status: z.enum(["upcoming", "live", "completed"]).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = getDb();
        const { id, matchDate, ...rest } = input;
        const updateData: Record<string, unknown> = { ...rest };
        if (matchDate) updateData.matchDate = new Date(matchDate);
        await db.update(matches).set(updateData).where(eq(matches.id, id));
        return { success: true };
      }),
  }),

  // ── Players ───────────────────────────────────────────────────────────────
  players: router({
    byMatch: publicProcedure
      .input(z.object({ matchId: z.number() }))
      .query(async ({ input }) => {
        const db = getDb();
        return db.select().from(players).where(eq(players.matchId, input.matchId));
      }),

    create: adminProcedure
      .input(
        z.object({
          matchId: z.number(),
          name: z.string().min(1),
          team: z.string().min(1),
          role: z.enum(["batsman", "bowler", "all-rounder", "wicket-keeper"]),
          credits: z.string(),
          imageUrl: z.string().optional(),
          isCaptainEligible: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = getDb();
        const [result] = await db.insert(players).values({
          ...input,
          isCaptainEligible: input.isCaptainEligible ?? true,
        }).returning({ id: players.id });
        return { id: result!.id };
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          team: z.string().optional(),
          role: z.enum(["batsman", "bowler", "all-rounder", "wicket-keeper"]).optional(),
          credits: z.string().optional(),
          imageUrl: z.string().optional(),
          isCaptainEligible: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = getDb();
        const { id, ...rest } = input;
        await db.update(players).set(rest).where(eq(players.id, id));
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = getDb();
        await db.delete(players).where(eq(players.id, input.id));
        return { success: true };
      }),
  }),

  // ── Performance ───────────────────────────────────────────────────────────
  performance: router({
    byMatch: publicProcedure
      .input(z.object({ matchId: z.number() }))
      .query(async ({ input }) => {
        const db = getDb();
        return db
          .select()
          .from(playerPerformance)
          .where(eq(playerPerformance.matchId, input.matchId));
      }),

    upsert: adminProcedure
      .input(
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
          runOuts: z.number().default(0),
        })
      )
      .mutation(async ({ input }) => {
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
          runOuts: input.runOuts,
        });

        const existing = await db
          .select({ id: playerPerformance.id })
          .from(playerPerformance)
          .where(
            and(
              eq(playerPerformance.playerId, input.playerId),
              eq(playerPerformance.matchId, input.matchId)
            )
          )
          .limit(1);

        if (existing.length > 0) {
          await db
            .update(playerPerformance)
            .set({ ...input, totalPoints: String(totalPoints) })
            .where(eq(playerPerformance.id, existing[0]!.id));
        } else {
          await db.insert(playerPerformance).values({ ...input, totalPoints: String(totalPoints) });
        }

        // Recalculate all team entries for this match
        const entries = await db
          .select()
          .from(teamEntries)
          .where(eq(teamEntries.matchId, input.matchId));

        for (const entry of entries) {
          const entryPlayers = await db
            .select({ playerId: teamEntryPlayers.playerId })
            .from(teamEntryPlayers)
            .where(eq(teamEntryPlayers.teamEntryId, entry.id));

          let entryPoints = 0;
          for (const ep of entryPlayers) {
            const [perf] = await db
              .select({ totalPoints: playerPerformance.totalPoints })
              .from(playerPerformance)
              .where(
                and(
                  eq(playerPerformance.playerId, ep.playerId),
                  eq(playerPerformance.matchId, input.matchId)
                )
              )
              .limit(1);
            if (perf) {
              let pts = Number(perf.totalPoints);
              if (ep.playerId === entry.captainId) pts *= 2;
              else if (ep.playerId === entry.viceCaptainId) pts *= 1.5;
              entryPoints += pts;
            }
          }

          await db
            .update(teamEntries)
            .set({ totalPoints: String(entryPoints) })
            .where(eq(teamEntries.id, entry.id));
        }

        // Update leaderboard ranks for the challenge
        const challengeEntries = await db
          .select()
          .from(teamEntries)
          .where(eq(teamEntries.matchId, input.matchId))
          .orderBy(desc(teamEntries.totalPoints));

        for (let i = 0; i < challengeEntries.length; i++) {
          await db
            .update(teamEntries)
            .set({ rank: i + 1 })
            .where(eq(teamEntries.id, challengeEntries[i]!.id));
        }

        return { success: true, totalPoints };
      }),
  }),

  // ── Challenges ────────────────────────────────────────────────────────────
  challenges: router({
    list: publicProcedure
      .input(z.object({ matchId: z.number().optional() }).optional())
      .query(async ({ input }) => {
        const db = getDb();
        if (input?.matchId) {
          return db
            .select()
            .from(challenges)
            .where(eq(challenges.matchId, input.matchId))
            .orderBy(desc(challenges.createdAt));
        }
        return db.select().from(challenges).orderBy(desc(challenges.createdAt));
      }),

    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const db = getDb();
        const [c] = await db.select().from(challenges).where(eq(challenges.id, input.id)).limit(1);
        return c ?? null;
      }),

    create: adminProcedure
      .input(
        z.object({
          matchId: z.number(),
          title: z.string().min(1),
          description: z.string().optional(),
          creditLimit: z.string().default("100.0"),
          maxEntriesPerUser: z.number().default(3),
        })
      )
      .mutation(async ({ input }) => {
        const db = getDb();
        const [result] = await db.insert(challenges).values({ ...input, status: "open" }).returning({ id: challenges.id });
        return { id: result!.id };
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          description: z.string().optional(),
          status: z.enum(["open", "locked", "completed"]).optional(),
          maxEntriesPerUser: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = getDb();
        const { id, ...rest } = input;
        await db.update(challenges).set(rest).where(eq(challenges.id, id));
        return { success: true };
      }),
  }),

  // ── Team Entries ──────────────────────────────────────────────────────────
  teams: router({
    myEntries: protectedProcedure
      .input(z.object({ challengeId: z.number().optional() }).optional())
      .query(async ({ ctx, input }) => {
        const db = getDb();
        if (input?.challengeId) {
          return db
            .select()
            .from(teamEntries)
            .where(
              and(
                eq(teamEntries.userId, ctx.user.id),
                eq(teamEntries.challengeId, input.challengeId)
              )
            )
            .orderBy(desc(teamEntries.createdAt));
        }
        return db
          .select()
          .from(teamEntries)
          .where(eq(teamEntries.userId, ctx.user.id))
          .orderBy(desc(teamEntries.createdAt));
      }),

    entryPlayers: protectedProcedure
      .input(z.object({ teamEntryId: z.number() }))
      .query(async ({ input }) => {
        const db = getDb();
        return db
          .select({
            id: players.id,
            name: players.name,
            team: players.team,
            role: players.role,
            credits: players.credits,
            imageUrl: players.imageUrl,
          })
          .from(teamEntryPlayers)
          .innerJoin(players, eq(teamEntryPlayers.playerId, players.id))
          .where(eq(teamEntryPlayers.teamEntryId, input.teamEntryId));
      }),

    create: protectedProcedure
      .input(
        z.object({
          challengeId: z.number(),
          matchId: z.number(),
          teamName: z.string().min(1).max(64),
          playerIds: z.array(z.number()).length(11),
          captainId: z.number(),
          viceCaptainId: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const db = getDb();

        // Check challenge is open
        const [challenge] = await db
          .select()
          .from(challenges)
          .where(eq(challenges.id, input.challengeId))
          .limit(1);
        if (!challenge || challenge.status !== "open")
          throw new Error("Challenge is not open for entries");

        // Check max entries
        const existingEntries = await db
          .select({ id: teamEntries.id })
          .from(teamEntries)
          .where(
            and(
              eq(teamEntries.userId, ctx.user.id),
              eq(teamEntries.challengeId, input.challengeId)
            )
          );
        if (existingEntries.length >= challenge.maxEntriesPerUser)
          throw new Error(`Maximum ${challenge.maxEntriesPerUser} entries allowed per user`);

        // Validate credit limit
        const matchPlayers = await db
          .select()
          .from(players)
          .where(eq(players.matchId, input.matchId));
        const selectedPlayers = matchPlayers.filter(p => input.playerIds.includes(p.id));
        const totalCredits = selectedPlayers.reduce((sum, p) => sum + Number(p.credits), 0);
        if (totalCredits > Number(challenge.creditLimit))
          throw new Error(`Team exceeds credit limit of ${challenge.creditLimit}`);

        // Validate captain/vc are in team
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
          totalPoints: "0.00",
        }).returning({ id: teamEntries.id });
        const entryId = result!.id;

        await db.insert(teamEntryPlayers).values(
          input.playerIds.map(playerId => ({ teamEntryId: entryId, playerId }))
        );

        return { id: entryId };
      }),
  }),

  // ── Leaderboard ───────────────────────────────────────────────────────────
  leaderboard: router({
    byChallenge: publicProcedure
      .input(z.object({ challengeId: z.number(), limit: z.number().default(50) }))
      .query(async ({ input }) => {
        const db = getDb();
        return db
          .select({
            rank: teamEntries.rank,
            teamName: teamEntries.teamName,
            totalPoints: teamEntries.totalPoints,
            userId: teamEntries.userId,
            userName: users.name,
            username: users.username,
          })
          .from(teamEntries)
          .innerJoin(users, eq(teamEntries.userId, users.id))
          .where(eq(teamEntries.challengeId, input.challengeId))
          .orderBy(desc(teamEntries.totalPoints))
          .limit(input.limit);
      }),

    overall: publicProcedure
      .input(z.object({ limit: z.number().default(50) }))
      .query(async ({ input }) => {
        const db = getDb();
        return db
          .select({
            userId: teamEntries.userId,
            userName: users.name,
            username: users.username,
            totalPoints: sql<number>`SUM(${teamEntries.totalPoints})`,
            entriesCount: sql<number>`COUNT(${teamEntries.id})`,
          })
          .from(teamEntries)
          .innerJoin(users, eq(teamEntries.userId, users.id))
          .groupBy(teamEntries.userId, users.name, users.username)
          .orderBy(desc(sql`SUM(${teamEntries.totalPoints})`))
          .limit(input.limit);
      }),
  }),

  // ── Dashboard ─────────────────────────────────────────────────────────────
  dashboard: router({
    stats: protectedProcedure.query(async ({ ctx }) => {
      const db = getDb();

      const entries = await db
        .select()
        .from(teamEntries)
        .where(eq(teamEntries.userId, ctx.user.id));

      const totalPoints = entries.reduce((sum, e) => sum + Number(e.totalPoints), 0);
      const ranks = entries.map(e => e.rank).filter(Boolean) as number[];
      const bestRank = ranks.length > 0 ? Math.min(...ranks) : null;
      const challengeIds = new Set(entries.map(e => e.challengeId));

      return {
        totalEntries: entries.length,
        totalPoints,
        bestRank,
        challengesJoined: challengeIds.size,
      };
    }),

    recentEntries: protectedProcedure
      .input(z.object({ limit: z.number().default(10) }))
      .query(async ({ ctx, input }) => {
        const db = getDb();
        return db
          .select({
            id: teamEntries.id,
            teamName: teamEntries.teamName,
            totalPoints: teamEntries.totalPoints,
            rank: teamEntries.rank,
            createdAt: teamEntries.createdAt,
            matchTitle: matches.title,
            challengeTitle: challenges.title,
            matchStatus: matches.status,
          })
          .from(teamEntries)
          .innerJoin(matches, eq(teamEntries.matchId, matches.id))
          .innerJoin(challenges, eq(teamEntries.challengeId, challenges.id))
          .where(eq(teamEntries.userId, ctx.user.id))
          .orderBy(desc(teamEntries.createdAt))
          .limit(input.limit);
      }),
  }),

  // ── Admin ─────────────────────────────────────────────────────────────────
  admin: router({
    stats: adminProcedure.query(async () => {
      const db = getDb();
      const [userCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(users);
      const [matchCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(matches);
      const [challengeCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(challenges);
      const [entryCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(teamEntries);
      return {
        users: Number(userCount?.count ?? 0),
        matches: Number(matchCount?.count ?? 0),
        challenges: Number(challengeCount?.count ?? 0),
        entries: Number(entryCount?.count ?? 0),
      };
    }),

    allUsers: adminProcedure.query(async () => {
      const db = getDb();
      return db
        .select({
          id: users.id,
          username: users.username,
          email: users.email,
          name: users.name,
          role: users.role,
          createdAt: users.createdAt,
          lastSignedIn: users.lastSignedIn,
        })
        .from(users)
        .orderBy(desc(users.createdAt));
    }),

    setUserRole: adminProcedure
      .input(z.object({ userId: z.number(), role: z.enum(["user", "admin"]) }))
      .mutation(async ({ input }) => {
        const db = getDb();
        await db.update(users).set({ role: input.role }).where(eq(users.id, input.userId));
        return { success: true };
      }),
  }),

  // ── System ────────────────────────────────────────────────────────────────
  system: router({
    notifyOwner: protectedProcedure
      .input(z.object({ title: z.string(), content: z.string() }))
      .mutation(async ({ input }) => {
        const { notifyOwner } = await import("./_core/notification");
        return notifyOwner({ title: input.title, content: input.content });
      }),
  }),
});

export type AppRouter = typeof appRouter;
