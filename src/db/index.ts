import { drizzle } from 'drizzle-orm/node-postgres';

import * as usersSchema from './schemas/users';
import * as appointmentsSchema from './schemas/appointments';
import * as sessionsSchema from './schemas/sessions';

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
