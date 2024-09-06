"use server";
import { db } from "../drizzle/db";
import { eq, sql } from "drizzle-orm";
import { ms, gms, egs, tes } from "../drizzle/schema";

export async function beginGroups(teId) {
    const matchesSubquery = db.select({ id: ms.id })
        .from(ms)
        .innerJoin(gms, eq(ms.id, gms.matchId))
        .innerJoin(egs, eq(gms.eventGroupId, egs.id))
        .innerJoin(tes, eq(egs.tournamentEventId, tes.id))
        .where(eq(tes.id, teId));

    await db.update(ms)
        .set({ status: "ready" })
        .where(sql`${ms.id} IN (${matchesSubquery})`);

    await db.update(egs).set({ status: "in progress" }).where(eq(egs.tournamentEventId, teId));
};