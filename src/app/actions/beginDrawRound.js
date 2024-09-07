"use server";
import { db } from "../drizzle/db";
import { ms, dms } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function beginDrawRound({ teId, round }) {
    const msIds = [];

    const dmsQuery = await db.query.dms.findMany({
        where: and(eq(dms.tournamentEventId, teId), eq(dms.round, round)),
        with: {
            m: {
                with: {
                    mps: true
                }
            }
        }
    });

    for (const dm of dmsQuery) {
        if (dm.m.status === "upcoming" && dm.m.mps.length === 2) {
            await db.update(ms).set({ status: "ready" }).where(eq(ms.id, dm.m.id));
            msIds.push(dm.m.id);
        };
    };
    
    return msIds;
};