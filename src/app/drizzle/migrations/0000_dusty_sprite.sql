CREATE TABLE IF NOT EXISTS "event_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" smallint NOT NULL,
	"number" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event_player" (
	"id" serial PRIMARY KEY NOT NULL,
	"tournament_event_id" smallint NOT NULL,
	"tournament_player_id" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group_match" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_group_id" smallint NOT NULL,
	"match_id" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group_player" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_group_id" smallint NOT NULL,
	"event_player_id" smallint NOT NULL,
	"position" smallint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match" (
	"id" serial PRIMARY KEY NOT NULL,
	"best_of" smallint DEFAULT 5 NOT NULL,
	"status" "match_status" DEFAULT 'upcoming' NOT NULL,
	"round" smallint,
	"sequence" smallint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match_player" (
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
	"is_winner" boolean,
	"checked_in" boolean DEFAULT false NOT NULL,
	"verified" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"tournament_table_id" smallint NOT NULL,
	"match_id" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tournament" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"status" "tournament_status" DEFAULT 'upcoming' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tournament_event" (
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
	"max_age" smallint,
	"allow_unrated_advance" boolean DEFAULT false NOT NULL,
	"prefer_groups_of" smallint DEFAULT 4 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tournament_player" (
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
CREATE TABLE IF NOT EXISTS "tournament_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"tournament_id" smallint NOT NULL,
	"number" smallint NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_table" ADD CONSTRAINT "match_table_match_id_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
