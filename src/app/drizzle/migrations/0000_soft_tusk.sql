CREATE TABLE IF NOT EXISTS "event_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" smallint NOT NULL,
	"number" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event_player" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" smallint NOT NULL,
	"player_id" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group_match" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_id" smallint NOT NULL,
	"match_id" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group_player" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_id" smallint NOT NULL,
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
	"table_id" smallint NOT NULL,
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
 ALTER TABLE "event_group" ADD CONSTRAINT "event_group_event_id_tournament_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."tournament_event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_player" ADD CONSTRAINT "event_player_event_id_tournament_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."tournament_event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_player" ADD CONSTRAINT "event_player_player_id_tournament_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."tournament_player"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_match" ADD CONSTRAINT "group_match_group_id_group_player_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."group_player"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_match" ADD CONSTRAINT "group_match_match_id_group_player_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."group_player"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_player" ADD CONSTRAINT "group_player_group_id_event_player_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."event_player"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_player" ADD CONSTRAINT "group_player_event_player_id_event_player_id_fk" FOREIGN KEY ("event_player_id") REFERENCES "public"."event_player"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_player" ADD CONSTRAINT "match_player_match_id_group_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."group_match"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_player" ADD CONSTRAINT "match_player_event_player_id_event_player_id_fk" FOREIGN KEY ("event_player_id") REFERENCES "public"."event_player"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_table" ADD CONSTRAINT "match_table_table_id_tournament_table_id_fk" FOREIGN KEY ("table_id") REFERENCES "public"."tournament_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_table" ADD CONSTRAINT "match_table_match_id_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournament_event" ADD CONSTRAINT "tournament_event_tournament_id_tournament_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournament"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournament_player" ADD CONSTRAINT "tournament_player_tournament_id_tournament_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournament"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournament_table" ADD CONSTRAINT "tournament_table_tournament_id_tournament_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournament"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
