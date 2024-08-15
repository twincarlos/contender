export const fetchCache = 'force-no-store';
import { db } from "@/app/drizzle/db";
import { arrayToObject } from "../utils";

export async function GET() {
    const tournaments = await db.query.tournament.findMany();
    return new Response(JSON.stringify(arrayToObject(tournaments)));
};