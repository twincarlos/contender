"use server";
import { db } from "@/drizzle/db";
import { tournamentPlayersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function createTournamentPlayer(initialState, formData) {
  const tournamentId = Number(formData.get("tournament-id"));
  const data = { tournamentId };

  const name = formData.get("tournament-player-name");
  const rating = formData.get("tournament-player-rating");
  const dob = formData.get("tournament-player-dob");
  const location = formData.get("tournament-player-location");
  const club = formData.get("tournament-player-club");
  const rated = formData.get("is-rated");

  if (name) data.name = name;
  if (rating) data.rating = Number(rating);
  if (dob) data.dob = dob;
  if (location) data.location = location;
  if (club) data.club = club;
  if (rated === "on") data.rated = true;

  const tournamentPlayerData = await db.insert(tournamentPlayersTable).values(data).returning();
  return tournamentPlayerData[0];
};

export async function updateTournamentPlayer(initialState, formData) {
  const tournamentPlayerId = Number(formData.get("tournament-player-id"));
  const data = { tournamentPlayerId };

  const name = formData.get("tournament-player-name");
  const rating = formData.get("tournament-player-rating");
  const dob = formData.get("tournament-player-dob");
  const location = formData.get("tournament-player-location");
  const club = formData.get("tournament-player-club");
  const rated = formData.get("is-rated");

  if (name) data.name = name;
  if (rating) data.rating = Number(rating);
  if (dob) data.dob = dob;
  if (location) data.location = location;
  if (club) data.club = club;

  console.log(data);

  const tournamentPlayerData = await db.update(tournamentPlayersTable).set(data).where(eq(tournamentPlayersTable.id, tournamentPlayerId)).returning();
  return tournamentPlayerData[0];
};

export async function deleteTournamentPlayer(id) {
  await db.delete(tournamentPlayersTable).where(eq(tournamentPlayersTable.id, id));
  return id;
};