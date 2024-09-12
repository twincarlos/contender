export const fetchCache = 'force-no-store';
import { arrayToObject } from "@/app/utils";
import { eps, gps, tps } from "@/app/drizzle/schema";
import { and, eq, not, or } from "drizzle-orm";
import { db } from "@/app/drizzle/db";

export async function GET(req, { params }) {
    const firstPlayers = await db.select()
    .from(gps)
    .innerJoin(eps, eq(eps.id, gps.eventPlayerId))
    .innerJoin(tps, eq(tps.id, eps.tournamentPlayerId))
    .where(and(eq(gps.position, 1), eq(eps.tournamentEventId, params.teId)));
    const secondPlayers = await db.select()
    .from(gps)
    .innerJoin(eps, eq(eps.id, gps.eventPlayerId))
    .innerJoin(tps, eq(tps.id, eps.tournamentPlayerId))
    .where(and(eq(gps.position, 2), eq(eps.tournamentEventId, params.teId)));
    const thirdPlayers = await db.select()
    .from(gps)
    .innerJoin(eps, eq(eps.id, gps.eventPlayerId))
    .innerJoin(tps, eq(tps.id, eps.tournamentPlayerId))
    .where(and(not(or(eq(gps.position, 1), eq(gps.position, 2))), eq(eps.tournamentEventId, params.teId)));
    return new Response(JSON.stringify({
        firstGps: arrayToObject(firstPlayers.map(gp => ({
            ...gp.gps,
            ep: {
                ...gp.eps,
                tp: {
                    ...gp.tps
                }
            }
        })), "id"),
        secondGps: arrayToObject(secondPlayers.map(gp => ({
            ...gp.gps,
            ep: {
                ...gp.eps,
                tp: {
                    ...gp.tps
                }
            }
        })), "id"),
        thirdGps: arrayToObject(thirdPlayers.map(gp => ({
            ...gp.gps,
            ep: {
                ...gp.eps,
                tp: {
                    ...gp.tps
                }
            }
        })), "id")
    }));
};