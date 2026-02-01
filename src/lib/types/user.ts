import type { InferSelectModel } from "drizzle-orm";
import type { usersTable } from "../../db/schemas/users.js";

export type User = InferSelectModel<typeof usersTable>;
