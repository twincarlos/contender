"use server";
import { db } from "../drizzle/db";
import { ts, tes, egs, gms, ms } from "../drizzle/schema";
import { eq, sql } from "drizzle-orm";

export async function createT(data) {
  const t = await db.insert(ts).values(data).returning();
  return t[0];
};

export async function createTe(data) {
  const te = await db.insert(tes).values(data).returning();
  return te[0];
};

export async function beginGroups(teId) {
  const subquery = db.select({ id: ms.id })
  .from(ms)
  .innerJoin(gms, eq(ms.id, gms.matchId))
  .innerJoin(egs, eq(gms.eventGroupId, egs.id))
  .innerJoin(tes, eq(egs.tournamentEventId, tes.id))
  .where(eq(tes.id, teId));

  await db.update(ms)
  .set({ status: "ready" })
  .where(sql`${ms.id} IN (${subquery})`);
};