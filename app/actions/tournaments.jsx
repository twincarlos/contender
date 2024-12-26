"use server";
import { db } from "@/drizzle/db";
import { tournamentsTable } from "@/drizzle/schema";
import { formDataEntries } from "./utils";

export async function createTournament(initialState, formData) {
  return await db.insert(tournamentsTable).values(formDataEntries(formData)).returning();
};