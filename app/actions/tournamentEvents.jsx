"use server";
import { db } from "@/drizzle/db";
import { tournamentEventsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function createTournamentEvent(initialState, formData) {
  const tournamentId = Number(formData.get("tournament-id"));
  const allowUnratedAdvance = formData.get("allow-unrated-advance") === "on";
  const data = {
    tournamentId,
    allowUnratedAdvance
  };

  const name = formData.get("tournament-event-name");
  const date = formData.get("tournament-event-date");
  const time = formData.get("tournament-event-time");
  const format = formData.get("tournament-event-format");
  const status = formData.get("tournament-event-status");
  const teamsFormat = formData.get("tournament-event-teams-format");

  if (name) data.name = name;
  if (date) data.date = date;
  if (time) data.time = time;
  if (format) data.format = format;
  if (status) data.status = status;
  if (teamsFormat) data.teamsFormat = teamsFormat;

  const tournamentEventData = await db.insert(tournamentEventsTable).values(data).returning();
  return tournamentEventData[0];
};

export async function updateTournamentEvent(initialState, formData) {
  const tournamentEventId = Number(formData.get("tournament-event-id"));
  const allowUnratedAdvance = formData.get("allow-unrated-advance") === "on";
  const data = { allowUnratedAdvance };

  const name = formData.get("tournament-event-name");
  const date = formData.get("tournament-event-date");
  const time = formData.get("tournament-event-date");
  const format = formData.get("tournament-event-format");
  const status = formData.get("tournament-event-status");
  const teamsFormat = formData.get("tournament-event-teams-format");

  if (name) data.name = name;
  if (date) data.date = date;
  if (time) data.time = time;
  if (format) data.format = format;
  if (status) data.status = status;
  if (teamsFormat) data.teamsFormat = teamsFormat;

  const tournamentEventData = await db.update(tournamentEventsTable).set(data).where(eq(tournamentEventsTable.id, tournamentEventId)).returning();
  return tournamentEventData[0];
};

export async function deleteTournamentEvent(id) {
  await db.delete(tournamentEventsTable).where(eq(tournamentEventsTable.id, id));
  return id;
};