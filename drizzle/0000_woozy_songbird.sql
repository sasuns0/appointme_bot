DO $$ BEGIN
    CREATE TYPE "public"."flow" AS ENUM('registration', 'appointment');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE "appointments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "appointments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"description" varchar(255),
	"from_id" integer,
	"to_id" integer,
	"start" timestamp with time zone,
	"end" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "bot_sessions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bot_sessions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"telegram_user_id" bigint NOT NULL,
	"flow" "flow" NOT NULL,
	"step" varchar(255),
	"state" jsonb DEFAULT '{}'::jsonb NOT NULL,
	CONSTRAINT "bot_sessions_telegram_user_id_unique" UNIQUE("telegram_user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"telegram_user_id" bigint NOT NULL,
	"chat_id" bigint NOT NULL,
	"username" varchar(255),
	"name" varchar(255),
	"bio" varchar(255),
	"isComplete" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_telegram_user_id_unique" UNIQUE("telegram_user_id")
);
