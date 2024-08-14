import { pgTable, serial, varchar, boolean, smallint, date, time, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

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
    tournamentEventId: smallint('event_id').references(() => tournamentEvent.id, 'id').notNull(),
    tournamentPlayerId: smallint('player_id').references(() => tournamentPlayer.id, 'id').notNull()
});

export const groupPlayer = pgTable('group_player', {
    id: serial('id').primaryKey(),
    eventGroupId: smallint('group_id').references(() => group.id, 'id').notNull(),
    eventPlayerId: smallint('event_player_id').references(() => eventPlayer.id, 'id').notNull(),
    position: smallint('position')
});

export const groupMatch = pgTable('group_match', {
    id: serial('id').primaryKey(),
    eventGroupId: smallint('group_id').references(() => groupPlayer.id, 'id').notNull(),
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
    tournamentEventId: smallint('event_id').references(() => tournamentEvent.id, 'id').notNull(),
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
    tournamentTableId: smallint('table_id').references(() => tournamentTable.id, 'id').notNull(),
    matchId: smallint('match_id').references(() => match.id, 'id').notNull()
});

// RELATIONS

export const tournamentRelations = relations(tournament, ({ many }) => ({
    tournamentPlayer: many(tournamentPlayer),
    tournamentEvent: many(tournamentEvent),
    tournamentTable: many(tournamentTable)
}));

export const tournamentPlayerRelations = relations(tournamentPlayer, ({ one, many }) => ({
    tournament: one(tournament, { fields: [tournamentPlayer.tournamentId], references: [tournament.id] }),
    eventPlayer: many(eventPlayer)
}));

export const tournamentEventRelations = relations(tournamentEvent, ({ one, many }) => ({
    tournament: one(tournament, { fields: [tournamentEvent.tournamentId], references: [tournament.id] }),
    eventPlayer: many(eventPlayer),
    eventGroup: many(eventGroup),
}));

export const eventPlayerRelations = relations(eventPlayer, ({ one, many }) => ({
    tournamentEvent: one(tournamentEvent, { fields: [eventPlayer.tournamentEventId], references: [tournamentEvent.id] }),
    tournamentPlayer: one(tournamentPlayer, { fields: [eventPlayer.tournamentPlayerId], references: [tournamentPlayer.id] }),
    groupPlayer: one(groupPlayer, { fields: [eventPlayer.tournamentPlayerId], references: [groupPlayer.eventPlayerId] }),
    matchPlayer: many(matchPlayer, { fields: [eventPlayer.tournamentPlayerId], references: [matchPlayer.eventPlayerId] })
}));

export const groupPlayerRelations = relations(groupPlayer, ({ one }) => ({
    eventGroup: one(eventGroup, { fields: [groupPlayer.eventGroupId], references: [eventGroup.id] }),
    eventPlayer: one(eventPlayer, { fields: [groupPlayer.eventPlayerId], references: [eventPlayer.id] })
}));

export const groupMatchRelations = relations(groupMatch, ({ one }) => ({
    eventGroup: one(eventGroup, { fields: [groupMatch.eventGroupId], references: [eventGroup.id] }),
    match: one(match, { fields: [groupMatch.matchId], references: [match.id] })
}));

export const matchPlayerRelations = relations(matchPlayer, ({ one }) => ({
    match: one(match, { fields: [matchPlayer.matchId], references: [match.id] }),
    eventPlayer: one(match, { fields: [eventPlayer.id], references: [matchPlayer.eventPlayerId] })
}));

export const eventGroupRelations = relations(eventGroup, ({ one, many }) => ({
    tournamentEvent: one(tournamentEvent, { fields: [eventGroup.tournamentEventId], references: [tournamentEvent.id] }),
    groupPlayer: many(groupPlayer),
    groupMatch: many(groupMatch)
}));

export const matchRelations = relations(match, ({ one, many }) => ({
    groupMatch: one(groupMatch, { fields: [match.id], references: [groupMatch.matchId] }),
    matchPlayer: many(eventPlayer),
    matchTable: many(matchTable)
}));

export const tournamentTableRelations = relations(tournamentTable, ({ one, many }) => ({
    tournament: one(tournament, { fields: [tournamentTable.tournamentId], references: [tournament.id] }),
    matchTable: many(matchTable)
}));

export const matchTableRelations = relations(matchTable, ({ one }) => ({
    tournamentTable: one(tournamentTable, { fields: [matchTable.tournamentTableId], references: [tournamentTable.id] }),
    match: one(match, { fields: [matchTable.matchId], references: [match.id] })
}));