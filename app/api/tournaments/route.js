import { db } from "@/drizzle/db";
import { tournamentsTable } from "@/drizzle/schema";

export async function GET(req, { params }) {
    const tournaments = await db.select().from(tournamentsTable);
    console.log(tournaments);
    return new Response(JSON.stringify({}));
};