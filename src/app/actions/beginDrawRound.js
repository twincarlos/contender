"use server";

import { db } from "../drizzle/db";
import { ms, dms } from "../drizzle/schema";
import { sql, eq, and } from "drizzle-orm";

export async function beginDrawRound({ round }) {
    const subquery = db.select({ id: ms.id })
        .from(ms)
        .innerJoin(dms, eq(ms.id, dms.matchId))
        .where(and(eq(dms.round, round), eq(ms.status, "upcoming")));
        
    const msIds = await db.update(ms)
        .set({ status: "ready" })
        .where(sql`${ms.id} IN (${subquery})`)
        .returning();
    
    return msIds.map(mId => mId.id);
};