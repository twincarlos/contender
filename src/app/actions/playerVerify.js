"use server";
import { db } from "../drizzle/db";
import { mps, ms, gps, egs, gms } from "../drizzle/schema";
import { and, eq, not, count } from "drizzle-orm";
import { calculateStandings } from "../utils";

export async function playerVerify({ egId, mId, mpId }) {
    const mp = await db.update(mps).set({ verified: true }).where(eq(mps.id, mpId)).returning();
    const otherMp = await db.select({ verified: mps.verified }).from(mps).where(and(eq(mps.matchId, mId), eq(mps.position, mp[0].position === "top" ? "bottom" : "top")));
    if (mp[0].verified && otherMp[0].verified) {
        const m = await db.update(ms).set({ status: "finished" }).where(eq(ms.id, mId)).returning();

        if (egId) {
            const allGms = await db.query.gms.findMany({
                with: {
                    m: {
                        with: {
                            mps: {
                                with: {
                                    ep: {
                                        with: {
                                            tp: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                where: eq(gms.eventGroupId, egId)
            });
            const standings = calculateStandings(allGms.map(gm => gm.m).filter(m => m.status === "finished"));
            const updatedGps = [];
            let position = 1;
    
            for (const gp of standings) {
                const updatedGp = await db.update(gps).set({ position }).where(and(eq(gps.eventPlayerId, gp.eventPlayerId), eq(gps.eventGroupId, egId))).returning();
                updatedGps.push(updatedGp[0]);
                position++;
            };
    
            const notFinishedMs = await db.select({ count: count() })
                .from(ms)
                .innerJoin(gms, eq(ms.id, gms.matchId))
                .where(and(eq(gms.eventGroupId, egId), not(eq(ms.status, "finished"))));
    
            if (notFinishedMs[0].count === 0) {
                const eg = await db.update(egs).set({ status: "finished" }).where(eq(egs.id, egId)).returning();
                return { mp: mp[0], m: m[0], eg: eg[0], gps: updatedGps }; // if group is done
            } else {
                return { mp: mp[0], m: m[0], gps: updatedGps }; // if match is done
            };
        } else {
            return { mp: mp[0] }; // update player
        };
        
    } else {
        return { mp: mp[0] }; // update player
    };
};