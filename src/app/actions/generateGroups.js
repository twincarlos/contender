"use server";
import { db } from "../drizzle/db";
import { egs, eps, tps, gps } from "../drizzle/schema";
import { eq, desc, asc } from "drizzle-orm";

export async function generateGroups({ teId, preferGroupsOf }) {
    const data = {
        egs: {},
        gps: {}
    };

    const playersQuery = await db.select()
        .from(eps)
        .innerJoin(tps, eq(tps.id, eps.tournamentPlayerId))
        .orderBy(desc(tps.rating), asc(tps.name))
        .where(eq(eps.tournamentEventId, teId));
    const players = playersQuery.map(ep => ({
        ...ep.eps,
        tp: {
            ...ep.tps
        }
    }));

    const totalPlayers = players.length;
    const numGroups = Math.ceil(totalPlayers / preferGroupsOf);

    const groups = Array.from({ length: numGroups }, () => ({}));

    let direction = 1;
    let groupIndex = 0;

    for (const player of players) {
        if (!groups[groupIndex].id) {
            const newGroupQuery = await db.insert(egs).values({ tournamentEventId: teId, number: groupIndex + 1 }).returning();
            const newGroup = newGroupQuery[0];
            const newGroupPlayerQuery = await db.insert(gps).values({ eventGroupId: newGroup.id, eventPlayerId: player.id }).returning();
            const newGroupPlayer = newGroupPlayerQuery[0];

            groups[groupIndex] = { ...newGroup, gps: [{ ...newGroupPlayer, ep: { ...player } }] };
            data.egs = { ...data.egs, [newGroup.id]: { ...newGroup } };
            data.gps = { ...data.gps, [newGroup.id]: { ...data.gps[newGroup.id], [newGroupPlayer.id]: { ...newGroupPlayer, ep: { ...player } } } };
        }

        else {
            const newGroupPlayerQuery = await db.insert(gps).values({ eventGroupId: groups[groupIndex].id, eventPlayerId: player.id }).returning();
            const newGroupPlayer = newGroupPlayerQuery[0];
            groups[groupIndex] = { ...groups[groupIndex], gps: [...groups[groupIndex].gps, { ...newGroupPlayer, ep: { ...player } }] };
            data.gps = { ...data.gps, [groups[groupIndex].id]: { ...data.gps[groups[groupIndex].id], [newGroupPlayer.id]: { ...newGroupPlayer, ep: { ...player } } } };
        };

        groupIndex += direction;

        if (groupIndex === numGroups || groupIndex === -1) {
            direction *= -1;
            groupIndex += direction;
        };
    };

    return data;
};