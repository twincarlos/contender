CREATE TABLE IF NOT EXISTS "dms" (
	"id" serial PRIMARY KEY NOT NULL,
	"tournament_event_id" smallint NOT NULL,
	"match_id" smallint NOT NULL,
	"round" smallint NOT NULL,
	"sequence" smallint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "egs" (
	"id" serial PRIMARY KEY NOT NULL,
	"tournament_event_id" smallint NOT NULL,
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
	"match_id" smallint NOT NULL,
	"sequence" smallint
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
	"status" "match_status" DEFAULT 'upcoming' NOT NULL
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
	"allow_unrated_advance" boolean DEFAULT true NOT NULL,
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
