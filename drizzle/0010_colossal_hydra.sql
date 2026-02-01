CREATE TYPE "public"."flow" AS ENUM('registration', 'appointment');--> statement-breakpoint
CREATE TABLE "bot_sessions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bot_sessions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"telegram_user_id" bigint NOT NULL,
	"flow" "flow" NOT NULL,
	"step" varchar(255),
	"state" jsonb DEFAULT '{}'::jsonb NOT NULL,
	CONSTRAINT "bot_sessions_telegram_user_id_unique" UNIQUE("telegram_user_id")
);
--> statement-breakpoint
ALTER TABLE IF EXISTS "users" DROP COLUMN "step";--> statement-breakpoint
ALTER TABLE IF EXISTS "users" DROP COLUMN "state";
