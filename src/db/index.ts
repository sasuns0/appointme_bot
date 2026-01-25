import { drizzle } from 'drizzle-orm/node-postgres';

import * as usersSchema from './schemas/users';
import * as appointmentsSchema from './schemas/appointments';

const connectionString = process.env.DATABASE_URL!;

export const db = drizzle({
  connection: connectionString,
  casing: 'snake_case',
  schema: {
    usersSchema,
    appointmentsSchema
  },
});
