import { integer, pgEnum, pgTable, varchar, bigint, jsonb } from "drizzle-orm/pg-core";

export const flowEnum = pgEnum('flow', ['registration', 'appointment']);
// export const stepEnum = pgEnum('user_step', ['idle', 'username', 'fullname', 'bio', 'complete']);

export const sessionsTable = pgTable("bot_sessions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: bigint("telegram_user_id", { mode: "number" }).unique().notNull(),
  flow: flowEnum().notNull(),
  step: varchar({ length: 255 }),
  state: jsonb("state").notNull().default({}),
})

