export const fetchCache = 'force-no-store';
import { db } from "@/app/drizzle/db";
import { eq } from "drizzle-orm";
import { tps } from "@/app/drizzle/schema";
import { arrayToObject } from "@/app/utils";

export async function GET(req, { params }) {
    const allTps = await db.query.tps.findMany({
        where: eq(tps.tournamentId, params.tId),
        with: {
            eps: true
        }
    });

    return new Response(JSON.stringify(arrayToObject(allTps.filter(tp => {
        const ep = tp.eps.find(ep => ep.tournamentEventId == params.teId);
        if (ep) return false;
        else return true;
    }), "id")));
};