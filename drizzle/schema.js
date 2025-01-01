import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgEnum, pgTable } from "drizzle-orm/pg-core";

export const tournamentStatusEnum = pgEnum("tournament_status", ["Upcoming", "In Progress", "Finished"]);

export const tournamentsTable = pgTable(
    "tournaments",
    {
        id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
        name: t.varchar("name").notNull().default("Unnamed"),
        date: t.date("date").notNull().default(sql`CURRENT_DATE`),
        ranked: t.boolean("ranked").notNull().default(false),
        status: tournamentStatusEnum().notNull().default("Upcoming"),
    }
);

export const tournamentPlayersTable = pgTable(
    "tournament_players",
    {
        id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
        name: t.varchar("name").notNull().default("Unnamed"),
        rating: t.integer().notNull().default(0),
        dob: t.date("date"),
        location: t.varchar(),
        club: t.varchar(),
        rated: t.boolean("rated").notNull().default(false),
        tournamentId: t.integer("tournament_id").notNull().references(() => tournamentsTable.id),
    }
);