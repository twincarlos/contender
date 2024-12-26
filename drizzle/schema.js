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