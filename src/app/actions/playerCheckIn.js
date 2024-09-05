"use server";
import { db } from "../drizzle/db";
import { mps, ms } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

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