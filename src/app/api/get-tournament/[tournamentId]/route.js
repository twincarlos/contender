export const fetchCache = 'force-no-store';
import { db } from "@/app/drizzle/db";
import { tournament, tournamentPlayer, tournamentEvent } from "@/app/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req, { params }) {
    const tournaments = await db.query.tournament.findMany({
        with: {
            tournamentPlayer,
            tournamentEvent
        },
        where: eq(tournament.id, params.tournamentId)
    });
    return new Response(JSON.stringify(tournaments[0]));
};