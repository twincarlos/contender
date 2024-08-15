export const fetchCache = 'force-no-store';
import { db } from "@/app/drizzle/db";
import { tournamentEvent } from "@/app/drizzle/schema";
import { eq } from "drizzle-orm";
import { arrayToObject } from "../../utils";

export async function GET(req, { params }) {
    const events = await db.query.tournamentEvent.findMany({
        where: eq(tournamentEvent.id, params.eventId)
    });
    return new Response(JSON.stringify(arrayToObject(events)));
};