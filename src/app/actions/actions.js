"use server";
import { db } from "../drizzle/db";
import { ts, tes, egs, gms, ms, mps } from "../drizzle/schema";
import { eq, sql, and, count, not } from "drizzle-orm";

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
    checkedIn: false,
    verified: false,
    isWinner: mData.mps.top.isWinner
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
    checkedIn: false,
    verified: false,
    isWinner: mData.mps.bottom.isWinner
  }).where(and(eq(mps.position, "bottom"), eq(mps.id, mData.mps.bottom.id)));
  const m = db.update(ms).set({ status: mData.status }).where(eq(ms.id, mData.id));
  await Promise.all([mpTop, mpBottom, m]);
};

export async function playerCheckIn({ mId, mpId }) {
  const mp = await db.update(mps).set({ checkedIn: true }).where(eq(mps.id, mpId)).returning();
  const otherMp = await db.select({ checkedIn: mps.checkedIn }).from(mps).where(and(eq(mps.matchId, mId), eq(mps.position, mp[0].position === "top" ? "bottom" : "top")));
  if (mp[0].checkedIn && otherMp[0].checkedIn) {
    const m = await db.update(ms).set({ status: "in progress" }).where(eq(ms.id, mId)).returning();
    return { mp: mp[0], m: m[0] };
  } else {
    return { mp: mp[0] };
  };
};

export async function playerVerify({ egId, mId, mpId }) {
  const mp = await db.update(mps).set({ verified: true }).where(eq(mps.id, mpId)).returning();
  const otherMp = await db.select({ verified: mps.verified }).from(mps).where(and(eq(mps.matchId, mId), eq(mps.position, mp[0].position === "top" ? "bottom" : "top")));
  if (mp[0].verified && otherMp[0].verified) {
    const m = await db.update(ms).set({ status: "finished" }).where(eq(ms.id, mId)).returning();
    const notFinishedMs = await db.select({ count: count() })
      .from(ms)
      .innerJoin(gms, eq(ms.id, gms.matchId))
      .where(and(eq(gms.eventGroupId, egId), not(eq(ms.status, "finished"))));
    if (notFinishedMs[0].count === 0) {
      const eg = await db.update(egs).set({ status: "finished" }).where(eq(egs.id, egId)).returning();
      return { mp: mp[0], m: m[0], eg: eg[0] }; // if group is done
    } else {
      return { mp: mp[0], m: m[0] }; // if match is done
    };
  } else {
    return { mp: mp[0] }; // update player
  };
};