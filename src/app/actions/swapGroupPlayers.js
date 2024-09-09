"use server";
import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { gps } from "../drizzle/schema";

export default async function swapGroupPlayers({ gp1, gp2 }) {
    await db.update(gps).set({ eventPlayerId: gp2.eventPlayerId }).where(eq(gps.id, gp1.id));
    await db.update(gps).set({ eventPlayerId: gp1.eventPlayerId }).where(eq(gps.id, gp2.id));
};