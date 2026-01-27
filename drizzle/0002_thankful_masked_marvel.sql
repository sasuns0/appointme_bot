CREATE TYPE "public"."step" AS ENUM('username', 'fullname', 'bio');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "telegram_user_id" bigint;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "chat_id" bigint NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "step" "step";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "state" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;