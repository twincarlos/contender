export const fetchCache = 'force-no-store';
import { db } from "@/app/drizzle/db";
import { tournament, tournamentPlayer, tournamentEvent } from "@/app/drizzle/schema";
import { eq } from "drizzle-orm";
import { arrayToObject } from "../../utils";

export async function GET(req, { params }) {
    const data = await db.query.tournament.findFirst({
        with: {
            tournamentPlayer,
            tournamentEvent
        },
        where: eq(tournament.id, params.tournamentId)
    });
    return new Response(JSON.stringify({
        ...data,
        tournamentPlayer: arrayToObject(data.tournamentPlayer),
        tournamentEvent: arrayToObject(data.tournamentEvent)
    }));
};