import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
//
// - Appointments
// from(user)
// to(user)
// start
// end
// title
// description ?
//

export const appointmentsTable = pgTable("appointments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
});
