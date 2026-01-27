import type { InferSelectModel } from "drizzle-orm";
import type { stepEnum, usersTable } from "../../db/schemas/users.js";

export type User = InferSelectModel<typeof usersTable>;
export type Step = typeof stepEnum.enumValues[number];

