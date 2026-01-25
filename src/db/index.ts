import { drizzle } from 'drizzle-orm/node-postgres';

import * as usersSchema from './users.js';
import * as appointmentsSchema from './appointments.js';

const connectionString = process.env.DATABASE_URL!;

export const db = drizzle({
  connection: connectionString,
  casing: 'snake_case',
  schema: {
    usersSchema,
    appointmentsSchema
  },
});
