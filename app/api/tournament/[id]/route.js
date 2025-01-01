import { db } from "@/drizzle/db";
import { tournamentEventsTable, tournamentPlayersTable, tournamentsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { arrayToObject } from "../../utils";

export async function GET(req, { params }) {
    const { id } = await params;
    const tournament = await db.select().from(tournamentsTable).where(eq(tournamentsTable.id, id));
    const tournamentPlayers = await db.select().from(tournamentPlayersTable).where(eq(tournamentPlayersTable.tournamentId, id));
    const tournamentEvents = await db.select().from(tournamentEventsTable).where(eq(tournamentEventsTable.tournamentId, id));
    return new Response(JSON.stringify({
        tournament: tournament[0],
        tournamentPlayers: arrayToObject(tournamentPlayers, "id"),
        tournamentEvents: arrayToObject(tournamentEvents, "id")
    }));
};