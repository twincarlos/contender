"use server";
import { db } from "../drizzle/db";
import { egs, gms, ms, mps, eps, tps, gps } from "../drizzle/schema";
import { eq, desc, asc } from "drizzle-orm";

export async function generateGroups({ teId, preferGroupsOf }) {
    const data = {
        egs: {},
        gps: {},
        gms: {},
        ms: {}
    };

    async function groupPlayers(players) {
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

        return groups;
    };

    async function createPairings(groups) {
        for (let group of groups) {
            const n = group.gps.length;
            let sequence = 1;

            const hasOddPlayers = n % 2 !== 0;
            if (hasOddPlayers) {
                group.gps.push(null);
            }

            const rounds = hasOddPlayers ? n : n - 1;

            for (let round = 0; round < rounds; round++) {
                for (let i = 0; i < Math.floor(group.gps.length / 2); i++) {
                    const playerA = group.gps[i];
                    const playerB = group.gps[group.gps.length - i - 1];

                    if (playerA && playerB) {
                        const newMatchQuery = await db.insert(ms).values({}).returning();
                        const newMatch = newMatchQuery[0];
                        const newGroupMatchQuery = await db.insert(gms).values({ eventGroupId: group.id, matchId: newMatch.id, sequence }).returning();
                        const newGroupMatch = newGroupMatchQuery[0];
                        const newMatchPlayerAQuery = await db.insert(mps).values({ eventPlayerId: playerA.ep.id, matchId: newMatch.id, position: "top" }).returning();
                        const newMatchPlayerA = newMatchPlayerAQuery[0];
                        const newMatchPlayerBQuery = await db.insert(mps).values({ eventPlayerId: playerB.ep.id, matchId: newMatch.id, position: "bottom" }).returning();
                        const newMatchPlayerB = newMatchPlayerBQuery[0];

                        data.gms = {
                            ...data.gms,
                            [group.id]: {
                                ...data.gms[group.id],
                                [newGroupMatch.id]: { ...newGroupMatch }
                            }
                        };

                        data.ms = {
                            ...data.ms,
                            [newMatch.id]: {
                                ...newMatch,
                                mps: {
                                    top: {
                                        ...newMatchPlayerA,
                                        ep: {
                                            ...playerA.ep
                                        }
                                    },
                                    bottom: {
                                        ...newMatchPlayerB,
                                        ep: {
                                            ...playerB.ep
                                        }
                                    }
                                }
                            }
                        };

                        sequence++;
                    };
                };

                const groupPlayers = [group.gps[0], ...group.gps.slice(-1), ...group.gps.slice(1, -1)];
                group = { ...group, gps: groupPlayers };
            };
        };
    };


    const allEpsQuery = await db.select()
        .from(eps)
        .innerJoin(tps, eq(tps.id, eps.tournamentPlayerId))
        .orderBy(desc(tps.rating), asc(tps.name))
        .where(eq(eps.tournamentEventId, teId));
    const allEps = allEpsQuery.map(ep => ({
        ...ep.eps,
        tp: {
            ...ep.tps
        }
    }));

    const groups = await groupPlayers(allEps);
    await createPairings(groups);
    return data;
};