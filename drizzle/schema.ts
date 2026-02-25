import {
  boolean,
  decimal,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

// ─── Users ────────────────────────────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 64 }).notNull().unique(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 256 }).notNull(),
  name: text("name"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Matches ──────────────────────────────────────────────────────────────────
export const matches = mysqlTable("matches", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  teamA: varchar("teamA", { length: 128 }).notNull(),
  teamB: varchar("teamB", { length: 128 }).notNull(),
  venue: varchar("venue", { length: 256 }),
  matchDate: timestamp("matchDate").notNull(),
  format: mysqlEnum("format", ["T20", "ODI", "Test"]).default("T20").notNull(),
  status: mysqlEnum("status", ["upcoming", "live", "completed"]).default("upcoming").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Match = typeof matches.$inferSelect;
export type InsertMatch = typeof matches.$inferInsert;

// ─── Players ──────────────────────────────────────────────────────────────────
export const players = mysqlTable("players", {
  id: int("id").autoincrement().primaryKey(),
  matchId: int("matchId").notNull().references(() => matches.id),
  name: varchar("name", { length: 128 }).notNull(),
  team: varchar("team", { length: 128 }).notNull(),
  role: mysqlEnum("role", ["batsman", "bowler", "all-rounder", "wicket-keeper"]).notNull(),
  credits: decimal("credits", { precision: 4, scale: 1 }).notNull().default("8.0"),
  imageUrl: text("imageUrl"),
  isCaptainEligible: boolean("isCaptainEligible").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Player = typeof players.$inferSelect;
export type InsertPlayer = typeof players.$inferInsert;

// ─── Player Performance ───────────────────────────────────────────────────────
export const playerPerformance = mysqlTable("playerPerformance", {
  id: int("id").autoincrement().primaryKey(),
  playerId: int("playerId").notNull().references(() => players.id),
  matchId: int("matchId").notNull().references(() => matches.id),
  // Batting
  runsScored: int("runsScored").default(0).notNull(),
  ballsFaced: int("ballsFaced").default(0).notNull(),
  fours: int("fours").default(0).notNull(),
  sixes: int("sixes").default(0).notNull(),
  fifties: int("fifties").default(0).notNull(),
  hundreds: int("hundreds").default(0).notNull(),
  ducks: int("ducks").default(0).notNull(),
  // Bowling
  wickets: int("wickets").default(0).notNull(),
  oversBowled: decimal("oversBowled", { precision: 4, scale: 1 }).default("0.0").notNull(),
  maidens: int("maidens").default(0).notNull(),
  dotBalls: int("dotBalls").default(0).notNull(),
  // Fielding
  catches: int("catches").default(0).notNull(),
  stumpings: int("stumpings").default(0).notNull(),
  runOuts: int("runOuts").default(0).notNull(),
  // Computed
  totalPoints: decimal("totalPoints", { precision: 8, scale: 2 }).default("0.00").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PlayerPerformance = typeof playerPerformance.$inferSelect;
export type InsertPlayerPerformance = typeof playerPerformance.$inferInsert;

// ─── Challenges ───────────────────────────────────────────────────────────────
export const challenges = mysqlTable("challenges", {
  id: int("id").autoincrement().primaryKey(),
  matchId: int("matchId").notNull().references(() => matches.id),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  creditLimit: decimal("creditLimit", { precision: 5, scale: 1 }).notNull().default("100.0"),
  maxEntriesPerUser: int("maxEntriesPerUser").default(3).notNull(),
  status: mysqlEnum("status", ["open", "locked", "completed"]).default("open").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = typeof challenges.$inferInsert;

// ─── Team Entries ─────────────────────────────────────────────────────────────
export const teamEntries = mysqlTable("teamEntries", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  challengeId: int("challengeId").notNull().references(() => challenges.id),
  matchId: int("matchId").notNull().references(() => matches.id),
  teamName: varchar("teamName", { length: 128 }).notNull(),
  captainId: int("captainId").references(() => players.id),
  viceCaptainId: int("viceCaptainId").references(() => players.id),
  totalPoints: decimal("totalPoints", { precision: 8, scale: 2 }).default("0.00").notNull(),
  rank: int("rank"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TeamEntry = typeof teamEntries.$inferSelect;
export type InsertTeamEntry = typeof teamEntries.$inferInsert;

// ─── Team Entry Players (junction) ────────────────────────────────────────────
export const teamEntryPlayers = mysqlTable("teamEntryPlayers", {
  id: int("id").autoincrement().primaryKey(),
  teamEntryId: int("teamEntryId").notNull().references(() => teamEntries.id),
  playerId: int("playerId").notNull().references(() => players.id),
});

export type TeamEntryPlayer = typeof teamEntryPlayers.$inferSelect;
