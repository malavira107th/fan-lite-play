import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users, type InsertUser, type User } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    // Use max:1 for serverless to avoid connection pool exhaustion
    const client = postgres(url, { ssl: "require", max: 1 });
    _db = drizzle(client);
  }
  return _db;
}

export async function createUser(user: InsertUser): Promise<void> {
  const db = getDb();
  await db.insert(users).values(user);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = getDb();
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0];
}

export async function getUserByUsername(username: string): Promise<User | undefined> {
  const db = getDb();
  const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
  return result[0];
}

export async function getUserById(id: number): Promise<User | undefined> {
  const db = getDb();
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

export async function updateUserLastSignedIn(id: number): Promise<void> {
  const db = getDb();
  await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, id));
}
