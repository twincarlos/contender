export const fetchCache = 'force-no-store';
import { db } from "@/app/drizzle/db";
import { eq } from "drizzle-orm";
import { tps } from "@/app/drizzle/schema";
import { arrayToObject } from "../../utils";

export async function GET(req, { params }) {
    const allTps = await db.select().from(tps).where(eq(tps.tournamentId, params.tId));
    return new Response(JSON.stringify(arrayToObject(allTps, "id")));
};