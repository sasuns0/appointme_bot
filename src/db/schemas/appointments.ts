import { relations } from "drizzle-orm";
import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const appointmentsTable = pgTable("appointments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  fromId: integer("from_id"),
  toId: integer("to_id"),
  start: timestamp({ withTimezone: true }),
  end: timestamp({ withTimezone: true })
})

export const appointmentsRelations = relations(appointmentsTable, ({ one }) => ({
  from: one(usersTable, {
    fields: [appointmentsTable.fromId],
    references: [usersTable.id],
  }),
  to: one(usersTable, {
    fields: [appointmentsTable.toId],
    references: [usersTable.id],
  }),
}));

