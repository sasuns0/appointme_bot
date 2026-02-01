import { drizzle } from 'drizzle-orm/node-postgres';

import * as usersSchema from './schemas/users.js';
import * as appointmentsSchema from './schemas/appointments.js';
import * as sessionsSchema from './schemas/sessions.js';

process.loadEnvFile();

const connectionString = process.env.DATABASE_URL!;

export const db = drizzle({
  connection: connectionString,
  casing: 'snake_case',
  schema: {
    ...usersSchema,
    ...appointmentsSchema,
    ...sessionsSchema
  },
});
