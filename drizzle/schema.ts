import {
  boolean,
  numeric,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
  serial,
} from "drizzle-orm/pg-core";

// ─── Enums ────────────────────────────────────────────────────────────────────
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const matchFormatEnum = pgEnum("match_format", ["T20", "ODI", "Test"]);
export const matchStatusEnum = pgEnum("match_status", ["upcoming", "live", "completed"]);
export const playerRoleEnum = pgEnum("player_role", ["batsman", "bowler", "all-rounder", "wicket-keeper"]);
export const challengeStatusEnum = pgEnum("challenge_status", ["open", "locked", "completed"]);

// ─── Users ────────────────────────────────────────────────────────────────────
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 64 }).notNull().unique(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 256 }).notNull(),
  name: text("name"),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Matches ──────────────────────────────────────────────────────────────────
export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  teamA: varchar("teamA", { length: 128 }).notNull(),
  teamB: varchar("teamB", { length: 128 }).notNull(),
  venue: varchar("venue", { length: 256 }),
  matchDate: timestamp("matchDate").notNull(),
  format: matchFormatEnum("format").default("T20").notNull(),
  status: matchStatusEnum("status").default("upcoming").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Match = typeof matches.$inferSelect;
export type InsertMatch = typeof matches.$inferInsert;

// ─── Players ──────────────────────────────────────────────────────────────────
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  matchId: integer("matchId").notNull().references(() => matches.id),
  name: varchar("name", { length: 128 }).notNull(),
  team: varchar("team", { length: 128 }).notNull(),
  role: playerRoleEnum("role").notNull(),
  credits: numeric("credits", { precision: 4, scale: 1 }).notNull().default("8.0"),
  imageUrl: text("imageUrl"),
  isCaptainEligible: boolean("isCaptainEligible").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Player = typeof players.$inferSelect;
export type InsertPlayer = typeof players.$inferInsert;

// ─── Player Performance ───────────────────────────────────────────────────────
export const playerPerformance = pgTable("playerPerformance", {
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
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type PlayerPerformance = typeof playerPerformance.$inferSelect;
export type InsertPlayerPerformance = typeof playerPerformance.$inferInsert;

// ─── Challenges ───────────────────────────────────────────────────────────────
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  matchId: integer("matchId").notNull().references(() => matches.id),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  creditLimit: numeric("creditLimit", { precision: 5, scale: 1 }).notNull().default("100.0"),
  maxEntriesPerUser: integer("maxEntriesPerUser").default(3).notNull(),
  status: challengeStatusEnum("status").default("open").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = typeof challenges.$inferInsert;

// ─── Team Entries ─────────────────────────────────────────────────────────────
export const teamEntries = pgTable("teamEntries", {
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
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type TeamEntry = typeof teamEntries.$inferSelect;
export type InsertTeamEntry = typeof teamEntries.$inferInsert;

// ─── Team Entry Players (junction) ────────────────────────────────────────────
export const teamEntryPlayers = pgTable("teamEntryPlayers", {
  id: serial("id").primaryKey(),
  teamEntryId: integer("teamEntryId").notNull().references(() => teamEntries.id),
  playerId: integer("playerId").notNull().references(() => players.id),
});

export type TeamEntryPlayer = typeof teamEntryPlayers.$inferSelect;
