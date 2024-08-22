import { pgTable, serial, varchar, boolean, smallint, date, time, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

const tournamentStatusEnum = pgEnum('tournament_status', ['finished', 'upcoming', 'current']);
const tournamentEventTypeEnum = pgEnum('tournament_event_type', ['rr', 'grr', 'teams', 'handicap']);
const tournamentEventStatusEnum = pgEnum('tournament_event_status', ['finished', 'upcoming', 'groups', 'draw']);
const eventGroupStatusEnum = pgEnum('event_group_status', ['finished', 'ready', 'upcoming', 'in progress']);
const matchStatusEnum = pgEnum('match_status', ['finished', 'upcoming', 'ready', 'in progress', 'pending']);
const matchPlayerPositionEnum = pgEnum('match_player_position', ['top', 'bottom']);

export const ts = pgTable('ts', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    date: date('date').notNull().defaultNow(),
    status: tournamentStatusEnum('status').notNull().default('upcoming')
});

export const tps = pgTable('tps', {
    id: serial('id').primaryKey(),
    tournamentId: smallint('tournament_id').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    rating: smallint('rating').notNull().default(0),
    location: varchar('location', { length: 255 }),
    club: varchar('club', { length: 255 }),
    isAdmin: boolean('is_admin').notNull().default(false),
    isEstimated: boolean('is_estimated').notNull().default(false),
    dob: varchar('dob', { length: 255 }),
    usatt_number: smallint('usatt_number')
});

export const tes = pgTable('tes', {
    id: serial('id').primaryKey(),
    tournamentId: smallint('tournament_id').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    groupsDate: date('groups_date'),
    groupsTime: time('groups_time'),
    drawDate: date('draw_date'),
    drawTime: time('draw_time'),
    type: tournamentEventTypeEnum('type').notNull().default('rr'),
    status: tournamentEventStatusEnum('status').notNull().default('upcoming'),
    maxRating: smallint('max_rating'),
    maxAge: smallint('max_age')
});

export const eps = pgTable('eps', {
    id: serial('id').primaryKey(),
    tournamentEventId: smallint('tournament_event_id').notNull(),
    tournamentPlayerId: smallint('tournament_player_id').notNull()
});

export const gps = pgTable('gps', {
    id: serial('id').primaryKey(),
    eventGroupId: smallint('event_group_id').notNull(),
    eventPlayerId: smallint('event_player_id').notNull(),
    position: smallint('position')
});

export const gms = pgTable('gms', {
    id: serial('id').primaryKey(),
    eventGroupId: smallint('event_group_id').notNull(),
    matchId: smallint('match_id').notNull()
});

export const mps = pgTable('mps', {
    id: serial('id').primaryKey(),
    matchId: smallint('match_id').notNull(),
    eventPlayerId: smallint('event_player_id'),
    position: matchPlayerPositionEnum('position').notNull(),
    score1: smallint('score1'),
    score2: smallint('score2'),
    score3: smallint('score3'),
    score4: smallint('score4'),
    score5: smallint('score5'),
    score6: smallint('score6'),
    score7: smallint('score7'),
    games: smallint('games').notNull().default(0),
    isWinner: boolean('is_winner').notNull().default(false),
    checkedIn: boolean('checked_in').notNull().default(false),
    verified: boolean('verified').notNull().default(false)
});

export const egs = pgTable('egs', {
    id: serial('id').primaryKey(),
    tournamentEventId: smallint('event_id').notNull(),
    number: smallint('number').notNull(),
    status: eventGroupStatusEnum('status').notNull().default('upcoming')
});

export const ms = pgTable('ms', {
    id: serial('id').primaryKey(),
    bestOf: smallint('best_of').notNull().default(5),
    status: matchStatusEnum('status').notNull().default('upcoming'),
    round: smallint('round'),
    sequence: smallint('sequence')
});

export const tts = pgTable('tts', {
    id: serial('id').primaryKey(),
    tournamentId: smallint('tournament_id').notNull(),
    number: smallint('number').notNull()
});

export const mts = pgTable('mts', {
    id: serial('id').primaryKey(),
    tournamentTableId: smallint('tournament_table_id').notNull(),
    matchId: smallint('match_id').references(() => ms.id, 'id').notNull()
});

// RELATIONS

export const tournamentRelations = relations(ts, ({ many }) => ({
    tps: many(tps),
    tes: many(tes),
    tts: many(tts)
}));

export const tournamentPlayerRelations = relations(tps, ({ one, many }) => ({
    t: one(ts, { fields: [tps.tournamentId], references: [ts.id] }),
    eps: many(eps)
}));

export const tournamentEventRelations = relations(tes, ({ one, many }) => ({
    t: one(ts, { fields: [tes.tournamentId], references: [ts.id] }),
    eps: many(eps),
    egs: many(egs),
}));

export const eventPlayerRelations = relations(eps, ({ one, many }) => ({
    te: one(tes, { fields: [eps.tournamentEventId], references: [tes.id] }),
    tp: one(tps, { fields: [eps.tournamentPlayerId], references: [tps.id] }),
    gp: one(gps, { fields: [eps.id], references: [gps.eventPlayerId] }),
    mps: many(mps)
}));

export const groupPlayerRelations = relations(gps, ({ one }) => ({
    eg: one(egs, { fields: [gps.eventGroupId], references: [egs.id] }),
    ep: one(eps, { fields: [gps.eventPlayerId], references: [eps.id] })
}));

export const groupMatchRelations = relations(gms, ({ one }) => ({
    eg: one(egs, { fields: [gms.eventGroupId], references: [egs.id] }),
    m: one(ms, { fields: [gms.matchId], references: [ms.id] })
}));

export const matchPlayerRelations = relations(mps, ({ one }) => ({
    m: one(ms, { fields: [mps.matchId], references: [ms.id] }),
    ep: one(eps, { fields: [mps.eventPlayerId], references: [eps.id] })
}));

export const eventGroupRelations = relations(egs, ({ one, many }) => ({
    te: one(tes, { fields: [egs.tournamentEventId], references: [tes.id] }),
    gps: many(gps),
    gms: many(gms)
}));

export const matchRelations = relations(ms, ({ one, many }) => ({
    gm: one(gms, { fields: [ms.id], references: [gms.matchId] }),
    mps: many(mps),
    mts: many(mts)
}));

export const tournamentTableRelations = relations(tts, ({ one, many }) => ({
    t: one(ts, { fields: [tts.tournamentId], references: [ts.id] }),
    mts: many(mts)
}));

export const matchTableRelations = relations(mts, ({ one }) => ({
    tt: one(tts, { fields: [mts.tournamentTableId], references: [tts.id] }),
    m: one(ms, { fields: [mts.matchId], references: [ms.id] })
}));