DROP TYPE "tournament_status" CASCADE;
DROP TYPE "tournament_event_type" CASCADE;
DROP TYPE "tournament_event_status" CASCADE;
DROP TYPE "event_group_status" CASCADE;
DROP TYPE "match_status" CASCADE;
DROP TYPE "match_player_position" CASCADE;

DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tournament_status') THEN
      CREATE TYPE "tournament_status" AS ENUM ('finished', 'upcoming', 'current');
   END IF;
   IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tournament_event_type') THEN
      CREATE TYPE "tournament_event_type" AS ENUM ('rr', 'grr', 'teams', 'handicap');
   END IF;
   IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tournament_event_status') THEN
      CREATE TYPE "tournament_event_status" AS ENUM ('finished', 'upcoming', 'groups', 'draw');
   END IF;
   IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'event_group_status') THEN
      CREATE TYPE "event_group_status" AS ENUM ('finished', 'ready', 'upcoming', 'in progress');
   END IF;
   IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'match_status') THEN
      CREATE TYPE "match_status" AS ENUM ('finished', 'upcoming', 'ready', 'in progress', 'pending');
   END IF;
   IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'match_player_position') THEN
      CREATE TYPE "match_player_position" AS ENUM ('top', 'bottom');
   END IF;
END $$;

CREATE TABLE IF NOT EXISTS "egs" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" smallint NOT NULL,
	"number" smallint NOT NULL,
	"status" "event_group_status" DEFAULT 'upcoming' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eps" (
	"id" serial PRIMARY KEY NOT NULL,
	"tournament_event_id" smallint NOT NULL,
	"tournament_player_id" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gms" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_group_id" smallint NOT NULL,
	"match_id" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gps" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_group_id" smallint NOT NULL,
	"event_player_id" smallint NOT NULL,
	"position" smallint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mps" (
	"id" serial PRIMARY KEY NOT NULL,
	"match_id" smallint NOT NULL,
	"event_player_id" smallint,
	"position" "match_player_position" NOT NULL,
	"score1" smallint,
	"score2" smallint,
	"score3" smallint,
	"score4" smallint,
	"score5" smallint,
	"score6" smallint,
	"score7" smallint,
	"games" smallint DEFAULT 0 NOT NULL,
	"is_winner" boolean DEFAULT false NOT NULL,
	"checked_in" boolean DEFAULT false NOT NULL,
	"verified" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ms" (
	"id" serial PRIMARY KEY NOT NULL,
	"best_of" smallint DEFAULT 5 NOT NULL,
	"status" "match_status" DEFAULT 'upcoming' NOT NULL,
	"round" smallint,
	"sequence" smallint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mts" (
	"id" serial PRIMARY KEY NOT NULL,
	"tournament_table_id" smallint NOT NULL,
	"match_id" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tes" (
	"id" serial PRIMARY KEY NOT NULL,
	"tournament_id" smallint NOT NULL,
	"name" varchar(255) NOT NULL,
	"groups_date" date,
	"groups_time" time,
	"draw_date" date,
	"draw_time" time,
	"type" "tournament_event_type" DEFAULT 'rr' NOT NULL,
	"status" "tournament_event_status" DEFAULT 'upcoming' NOT NULL,
	"max_rating" smallint,
	"max_age" smallint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tps" (
	"id" serial PRIMARY KEY NOT NULL,
	"tournament_id" smallint NOT NULL,
	"name" varchar(255) NOT NULL,
	"rating" smallint DEFAULT 0 NOT NULL,
	"location" varchar(255),
	"club" varchar(255),
	"is_admin" boolean DEFAULT false NOT NULL,
	"is_estimated" boolean DEFAULT false NOT NULL,
	"dob" varchar(255),
	"usatt_number" smallint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"status" "tournament_status" DEFAULT 'upcoming' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tts" (
	"id" serial PRIMARY KEY NOT NULL,
	"tournament_id" smallint NOT NULL,
	"number" smallint NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mts" ADD CONSTRAINT "mts_match_id_ms_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."ms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
