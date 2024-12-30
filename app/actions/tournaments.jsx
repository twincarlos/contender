"use server";
import { db } from "@/drizzle/db";
import { tournamentsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function createTournament(initialState, formData) {
  const data = {};

  const name = formData.get("tournament-name");
  const date = formData.get("tournament-date");
  const ranked = formData.get("enable-ranking");

  if (name) data.name = name;
  if (date) data.date = date;
  if (ranked === "on") data.ranked = true;

  const tournamentData = await db.insert(tournamentsTable).values(data).returning();
  return tournamentData[0];
};

export async function updateTournament(initialState, formData) {
  const data = {};

  const id = formData.get("tournament-id");
  const status = formData.get("tournament-status");
  const name = formData.get("tournament-name");
  const date = formData.get("tournament-date");
  const ranked = formData.get("enable-ranking");

  if (name) data.name = name;
  if (date) data.date = date;
  if (ranked === "on") data.ranked = true;
  if (status) data.status = status;

  const tournamentData = await db.update(tournamentsTable).set(data).where(eq(tournamentsTable.id, id)).returning();
  return tournamentData[0];
};

export async function deleteTournament(id) {
  await db.delete(tournamentsTable).where(eq(tournamentsTable.id, id));
  return id;
};