export const fetchCache = 'force-no-store';
import { db } from "@/app/drizzle/db";
import { tournament } from "@/app/drizzle/schema";

export async function GET() {
    const tournaments = await db.select().from(tournament);
    return new Response(JSON.stringify(tournaments));
};