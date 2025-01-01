import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgEnum, pgTable } from "drizzle-orm/pg-core";

export const tournamentStatusEnum = pgEnum("tournament_status", ["Upcoming", "In Progress", "Finished"]);
export const tournamentEventStatusEnum = pgEnum("tournament_event_status", ["Upcoming", "Groups", "Draw", "Finished"]);
export const tournamentEventFormatEnum = pgEnum("tournament_event_format", ["Singles", "Doubles", "Teams", "Handicap"]);
export const tournamentEventTeamsFormatEnum = pgEnum("tournament_event_teams_format", ["Snake", "Olympic"]);

export const tournamentsTable = pgTable(
    "tournaments",
    {
        id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
        name: t.varchar("name").notNull().default("Unnamed"),
        date: t.date("date").notNull().default(sql`CURRENT_DATE`),
        ranked: t.boolean("ranked").notNull().default(false),
        status: tournamentStatusEnum().notNull().default("Upcoming")
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
        tournamentId: t.integer("tournament_id").notNull().references(() => tournamentsTable.id)
    }
);

export const tournamentEventsTable = pgTable(
    "tournament_events",
    {
        id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
        name: t.varchar("name").notNull().default("Unnamed"),
        date: t.date("date"),
        time: t.time("time"),
        format: tournamentEventFormatEnum().notNull().default("Singles"),
        status: tournamentEventStatusEnum().notNull().default("Upcoming"),
        teamsFormat: tournamentEventTeamsFormatEnum().notNull().default("Snake"),
        allowUnratedAdvance: t.boolean("allow_unrated_advance").notNull().default(false),
        tournamentId: t.integer("tournament_id").notNull().references(() => tournamentsTable.id) 
    }
);