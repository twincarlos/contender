import { db } from "@/drizzle/db";
import { tournamentsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req, { params }) {
    const { id } = await params;
    const tournament = await db.select().from(tournamentsTable).where(eq(tournamentsTable.id, id));
    return new Response(JSON.stringify(tournament[0]));
};