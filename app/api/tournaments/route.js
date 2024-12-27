import { db } from "@/drizzle/db";
import { tournamentsTable } from "@/drizzle/schema";
import { arrayToObject } from "../utils";

export async function GET(req, { params }) {
    const tournaments = await db.select().from(tournamentsTable);
    return new Response(JSON.stringify(arrayToObject(tournaments, "id")));
};