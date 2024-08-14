"use server";
import { db } from "../drizzle/db";
import { tournament, tournamentEvent } from "../drizzle/schema";

export async function createTournament(data) {
  const newTournament = await db.insert(tournament).values(data).returning();
  return newTournament[0];
};

export async function createEvent(data) {
  const newEvent = await db.insert(tournamentEvent).values(data).returning();
  return newEvent[0];
};