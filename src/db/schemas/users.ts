import { integer, pgTable, varchar, bigint, timestamp, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { appointmentsTable } from "./appointments.js";
import { relations } from "drizzle-orm";

export const stepEnum = pgEnum('step', ['idle', 'username', 'fullname', 'bio', 'complete']);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  telegramUserId: bigint("telegram_user_id", { mode: "number" }).unique().notNull(),
  chatId: bigint("chat_id", { mode: "number" }).notNull(),
  username: varchar({ length: 255 }),
  name: varchar({ length: 255 }),
  bio: varchar({ length: 255 }),

  step: stepEnum().default("idle"),
  state: jsonb("state").notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(appointmentsTable),
}));

