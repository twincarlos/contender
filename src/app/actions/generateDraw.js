"use server";
import { db } from "../drizzle/db";
import { asc, eq } from "drizzle-orm";
import { dms, egs, mps, ms } from "../drizzle/schema";
import { determineDrawRound, determineDrawSequence } from "../utils";

export async function generateDraw({ teId, allowUnratedAdvance }) {
    const firstPlayers = [];
    const secondPlayers = [];
    const allEgs = await db.query.egs.findMany({
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
        where: eq(egs.tournamentEventId, teId),
        orderBy: asc(egs.number)
    });
    allEgs.forEach(eg => {
        const sortedPlayers = eg.gps.sort((a, b) => (a.position || eg.gps.length) - (b.position || eg.gps.length));
        if (allowUnratedAdvance) {
            firstPlayers.push(sortedPlayers[0].ep);
            secondPlayers.unshift(sortedPlayers[1].ep);
        } else {
            const filteredPlayers = sortedPlayers.filter(player => player.ep.tp.isEstimated === false);
            firstPlayers.push(filteredPlayers[0].ep);
            secondPlayers.unshift(filteredPlayers[1].ep);
        };
    });
    const players = [...firstPlayers, ...secondPlayers];
    let drawRound = determineDrawRound(players.length);
    const drawSequence = determineDrawSequence(players.length);
    let sequenceNumber = 1;
    const draw = {};
    // PASS 1
    for (const sequence of drawSequence) {
        const matchQuery = await db.insert(ms).values({}).returning();
        const match = matchQuery[0];
        const drawMatchQuery = await db.insert(dms).values({
            tournamentEventId: teId,
            matchId: match.id,
            round: drawRound,
            sequence: sequenceNumber
        }).returning();
        const drawMatch = drawMatchQuery[0];
        let matchPlayerA = players[(sequence[0] || players.length + 1) - 1];
        let matchPlayerB = players[(sequence[1] || players.length + 1) - 1];
        if (matchPlayerA) {
            const matchPlayerQuery = await db.insert(mps).values({
                matchId: match.id,
                eventPlayerId: matchPlayerA.id,
                position: "top"
            }).returning();
            matchPlayerA = matchPlayerQuery[0];
        } else {
            matchPlayerA = { bye: true };
        };
        if (matchPlayerB) {
            const matchPlayerQuery = await db.insert(mps).values({
                matchId: match.id,
                eventPlayerId: matchPlayerB.id,
                position: "bottom"
            }).returning();
            matchPlayerB = matchPlayerQuery[0];
        } else {
            matchPlayerB = { bye: true };
        };
        draw[drawRound] = {
            ...draw[drawRound],
            [drawMatch.id]: {
                ...drawMatch,
                m: {
                    ...match,
                    mps: {
                        top: matchPlayerA,
                        bottom: matchPlayerB
                    }
                }
            }
        };
        sequenceNumber++;
    };
    // PASS 2
    let mayAdvance = true;
    for (drawRound; drawRound > 2; drawRound = drawRound / 2) {
        sequenceNumber = 1;
        const nextRound = drawRound / 2;
        const currentDrawMatches = Object.values(draw[drawRound]).sort((a, b) => a.sequence - b.sequence);
        for (const currentDrawMatch of currentDrawMatches) {
            if (currentDrawMatch.m.mps.top.id && currentDrawMatch.m.mps.bottom.id) {
                if (draw[nextRound]) {
                    const nextDrawMatch = Object.values(draw[nextRound]).find(dm => dm.sequence === Math.floor(sequenceNumber));
                    if (nextDrawMatch) {
                        draw[nextRound][nextDrawMatch.id].m.mps.bottom = { upcoming: true };
                    } else {
                        const matchQuery = await db.insert(ms).values({}).returning();
                        const match = matchQuery[0];
                        const drawMatchQuery = await db.insert(dms).values({
                            tournamentEventId: teId,
                            matchId: match.id,
                            round: nextRound,
                            sequence: Math.floor(sequenceNumber)
                        }).returning();
                        const drawMatch = drawMatchQuery[0];
                        draw[nextRound][drawMatch.id] = {
                            ...drawMatch,
                            m: {
                                ...match,
                                mps: {
                                    top: { upcoming: true }
                                }
                            }
                        };
                    };
                } else {
                    const matchQuery = await db.insert(ms).values({}).returning();
                    const match = matchQuery[0];
                    const drawMatchQuery = await db.insert(dms).values({
                        tournamentEventId: teId,
                        matchId: match.id,
                        round: nextRound,
                        sequence: Math.floor(sequenceNumber)
                    }).returning();
                    const drawMatch = drawMatchQuery[0];
                    draw[nextRound] = {
                        ...draw[nextRound],
                        [drawMatch.id]: {
                            ...drawMatch,
                            m: {
                                ...match,
                                mps: {
                                    top: { upcoming: true }
                                }
                            }
                        }
                    };
                };
            } else {
                if (draw[nextRound]) {
                    const nextDrawMatch = Object.values(draw[nextRound]).find(dm => dm.sequence === Math.floor(sequenceNumber));
                    if (nextDrawMatch) {
                        let matchPlayer = { upcoming: true };
                        if (mayAdvance) {
                            const matchPlayerQuery = await db.insert(mps).values({
                                matchId: nextDrawMatch.m.id,
                                eventPlayerId: draw[drawRound][currentDrawMatch.id].m.mps.top.eventPlayerId || draw[drawRound][currentDrawMatch.id].m.mps.bottom.eventPlayerId,
                                position: "bottom"
                            }).returning();
                            matchPlayer = matchPlayerQuery[0];
                        };
                        draw[nextRound][nextDrawMatch.id].m.mps.bottom = matchPlayer;
                    } else {
                        const matchQuery = await db.insert(ms).values({}).returning();
                        const match = matchQuery[0];
                        const drawMatchQuery = await db.insert(dms).values({
                            tournamentEventId: teId,
                            matchId: match.id,
                            round: nextRound,
                            sequence: Math.floor(sequenceNumber)
                        }).returning();
                        const drawMatch = drawMatchQuery[0];
                        let matchPlayer = { upcoming: true };
                        if (mayAdvance) {
                            const matchPlayerQuery = await db.insert(mps).values({
                                matchId: match.id,
                                eventPlayerId: draw[drawRound][currentDrawMatch.id].m.mps.top.eventPlayerId || draw[drawRound][currentDrawMatch.id].m.mps.bottom.eventPlayerId,
                                position: "top"
                            }).returning();
                            matchPlayer = matchPlayerQuery[0];
                        };
                        draw[nextRound][drawMatch.id] = {
                            ...drawMatch,
                            m: {
                                ...match,
                                mps: {
                                    top: matchPlayer
                                }
                            }
                        };
                    };
                } else {
                    const matchQuery = await db.insert(ms).values({}).returning();
                    const match = matchQuery[0];
                    const drawMatchQuery = await db.insert(dms).values({
                        tournamentEventId: teId,
                        matchId: match.id,
                        round: nextRound,
                        sequence: Math.floor(sequenceNumber)
                    }).returning();
                    const drawMatch = drawMatchQuery[0];
                    let matchPlayer = { upcoming: true };
                    if (mayAdvance) {
                        const matchPlayerQuery = await db.insert(mps).values({
                            matchId: match.id,
                            eventPlayerId: draw[drawRound][currentDrawMatch.id].m.mps.top.eventPlayerId || draw[drawRound][currentDrawMatch.id].m.mps.bottom.eventPlayerId,
                            position: "top"
                        }).returning();
                        matchPlayer = matchPlayerQuery[0];
                    };
                    draw[nextRound] = {
                        ...draw[nextRound],
                        [drawMatch.id]: {
                            ...drawMatch,
                            m: {
                                ...match,
                                mps: {
                                    top: matchPlayer
                                }
                            }
                        }
                    };
                };
            };
            sequenceNumber = sequenceNumber + 0.5;
        };
        mayAdvance = false;
    };

    return draw;
};