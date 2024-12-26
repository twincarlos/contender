import { db } from "@/drizzle/db";
import { tournamentsTable } from "@/drizzle/schema";

export async function GET(req, { params }) {
    const tournaments = await db.select().from(tournamentsTable);
    const obj = {};
    tournaments.forEach(tournament => obj[tournament.id] = tournament);
    return new Response(JSON.stringify(obj));
};