"use server";
import { db } from "../drizzle/db";
import { asc, eq } from "drizzle-orm";
import { ms, gms, egs, mps } from "../drizzle/schema";

export async function beginGroups(teId) {
    const data = {
        gms: {},
        ms: {}
    };

    const groups = await db.query.egs.findMany({
        where: eq(egs.tournamentEventId, teId),
        with: {
            gps: {
                with: {
                    ep: {
                        with: {
                            tp: true
                        }
                    }
                }
            }
        },
        orderBy: asc(egs.number)
    });

    for (let group of groups) {
        await db.update(egs).set({ status: "in progress" }).where(eq(egs.id, group.id));
        group.gps.sort((a, b) => b.ep.tp.rating - a.ep.tp.rating);
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
                    const newMatchQuery = await db.insert(ms).values({ status: "ready" }).returning();
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
            group = { ...group, status: "in progress", gps: groupPlayers };
        };
    };

    return data;
};