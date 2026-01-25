import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { appointmentsTable } from "./appointments";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull(),
  fullName: varchar({ length: 255 }).notNull(),
  bio: varchar({ length: 255 }).notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(appointmentsTable),
}));

