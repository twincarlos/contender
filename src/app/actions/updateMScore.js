"use server";
import { db } from "../drizzle/db";
import { mps, ms } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

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