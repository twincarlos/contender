"use server";
import { db } from "../drizzle/db";
import { tournament } from "../drizzle/schema";

export async function createTournament(data) {
  const newTournament = await db.insert(tournament).values(data).returning();
  return newTournament[0];
};