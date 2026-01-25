ALTER TABLE "appointments" ADD COLUMN "description" varchar(255);--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "from_id" integer;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "to_id" integer;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "start" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "end" timestamp with time zone;