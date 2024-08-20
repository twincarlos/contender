"use server";
import { db } from "../drizzle/db";
import { ts, tes, egs, gms, ms, mps } from "../drizzle/schema";
import { eq, sql, and } from "drizzle-orm";

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

export async function updateMScore(mData) {
  const mpTop = db.update(mps).set({
    score1: mData.mps.top.score1,
    score2: mData.mps.top.score2,
    score3: mData.mps.top.score3,
    score4: mData.mps.top.score4,
    score5: mData.mps.top.score5,
    score6: mData.mps.top.score6,
    score7: mData.mps.top.score7,
    games: mData.mps.top.games,
  }).where(and(eq(mps.position, "top"), eq(mps.id, mData.mps.top.id)));
  const mpBottom = db.update(mps).set({
    score1: mData.mps.bottom.score1,
    score2: mData.mps.bottom.score2,
    score3: mData.mps.bottom.score3,
    score4: mData.mps.bottom.score4,
    score5: mData.mps.bottom.score5,
    score6: mData.mps.bottom.score6,
    score7: mData.mps.bottom.score7,
    games: mData.mps.bottom.games,
  }).where(and(eq(mps.position, "bottom"), eq(mps.id, mData.mps.bottom.id)));
  const m = db.update(ms).set({ status: mData.status }).where(eq(ms.id, mData.id));
  await Promise.all([mpTop, mpBottom, m]);
};