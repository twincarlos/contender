import { pgTable, serial, varchar, boolean, smallint, date, time, pgEnum } from 'drizzle-orm/pg-core';

const tournamentStatusEnum = pgEnum('tournament_status', ['finished', 'upcoming', 'current']);
const tournamentEventTypeEnum = pgEnum('tournament_event_type', ['rr', 'grr', 'teams', 'handicap']);
const tournamentEventStatusEnum = pgEnum('tournament_event_status', ['finished', 'upcoming', 'groups', 'draw']);
const matchStatusEnum = pgEnum('match_status', ['finished', 'upcoming', 'ready', 'in progress']);
const matchPlayerPositionEnum = pgEnum('match_player_position', ['top', 'bottom']);

export const tournament = pgTable('tournament', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    date: date('date').notNull().defaultNow(),
    status: tournamentStatusEnum('status').notNull().default('upcoming')
});

export const tournamentPlayer = pgTable('tournament_player', {
    id: serial('id').primaryKey(),
    tournamentId: smallint('tournament_id').references(() => tournament.id, 'id').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    rating: smallint('rating').notNull().default(0),
    location: varchar('location', { length: 255 }),
    club: varchar('club', { length: 255 }),
    isAdmin: boolean('is_admin').notNull().default(false),
    isEstimated: boolean('is_estimated').notNull().default(false),
    dob: varchar('dob', { length: 255 }),
    usatt_number: smallint('usatt_number')
});

export const tournamentEvent = pgTable('tournament_event', {
    id: serial('id').primaryKey(),
    tournamentId: smallint('tournament_id').references(() => tournament.id, 'id').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    groupsDate: date('groups_date'),
    groupsTime: time('groups_time'),
    drawDate: date('draw_date'),
    drawTime: time('draw_time'),
    type: tournamentEventTypeEnum('type').notNull().default('rr'),
    status: tournamentEventStatusEnum('status').notNull().default('upcoming'),
    maxRating: smallint('max_rating'),
    maxAge: smallint('max_age'),
    allowUnratedAdvance: boolean('allow_unrated_advance').notNull().default(false),
    preferGroupsOf: smallint('prefer_groups_of').notNull().default(4)
});

export const eventPlayer = pgTable('event_player', {
    id: serial('id').primaryKey(),
    eventId: smallint('event_id').references(() => tournamentEvent.id, 'id').notNull(),
    playerId: smallint('player_id').references(() => tournamentPlayer.id, 'id').notNull()
});

export const groupPlayer = pgTable('group_player', {
    id: serial('id').primaryKey(),
    groupId: smallint('group_id').references(() => eventPlayer.id, 'id').notNull(),
    eventPlayerId: smallint('event_player_id').references(() => eventPlayer.id, 'id').notNull(),
    position: smallint('position')
});

export const groupMatch = pgTable('group_match', {
    id: serial('id').primaryKey(),
    groupId: smallint('group_id').references(() => groupPlayer.id, 'id').notNull(),
    matchId: smallint('match_id').references(() => groupPlayer.id, 'id').notNull()
});

export const matchPlayer = pgTable('match_player', {
    id: serial('id').primaryKey(),
    matchId: smallint('match_id').references(() => groupMatch.id, 'id').notNull(),
    eventPlayerId: smallint('event_player_id').references(() => eventPlayer.id, 'id'),
    position: matchPlayerPositionEnum('position').notNull(),
    score1: smallint('score1'),
    score2: smallint('score2'),
    score3: smallint('score3'),
    score4: smallint('score4'),
    score5: smallint('score5'),
    score6: smallint('score6'),
    score7: smallint('score7'),
    games: smallint('games').notNull().default(0),
    isWinner: boolean('is_winner'),
    checkedIn: boolean('checked_in').notNull().default(false),
    verified: boolean('verified').notNull().default(false)
});

export const eventGroup = pgTable('event_group', {
    id: serial('id').primaryKey(),
    eventId: smallint('event_id').references(() => tournamentEvent.id, 'id').notNull(),
    number: smallint('number').notNull()
});

export const match = pgTable('match', {
    id: serial('id').primaryKey(),
    bestOf: smallint('best_of').notNull().default(5),
    status: matchStatusEnum('status').notNull().default('upcoming'),
    round: smallint('round'),
    sequence: smallint('sequence')
});

export const tournamentTable = pgTable('tournament_table', {
    id: serial('id').primaryKey(),
    tournamentId: smallint('tournament_id').references(() => tournament.id, 'id').notNull(),
    number: smallint('number').notNull()
});

export const matchTable = pgTable('match_table', {
    id: serial('id').primaryKey(),
    tableId: smallint('table_id').references(() => tournamentTable.id, 'id').notNull(),
    matchId: smallint('match_id').references(() => match.id, 'id').notNull()
});