"use server";

import { db } from "../drizzle/db";
import { ms, dms } from "../drizzle/schema";
import { sql, eq, and } from "drizzle-orm";

export async function beginDrawRound({ teId, round }) {
    // const subquery = db.select({ id: ms.id })
    //     .from(ms)
    //     .innerJoin(dms, eq(ms.id, dms.matchId))
    //     .where(and(
    //         eq(dms.round, round),
    //         eq(ms.status, "upcoming")
    //     ));
        
    // const msIds = await db.update(ms)
    //     .set({ status: "ready" })
    //     .where(sql`${ms.id} IN (${subquery})`)
    //     .returning();

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