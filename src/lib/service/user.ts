import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { usersTable } from "../../db/schemas/users.js";
import type { Step } from "../types/user.js";

type getUserParams = { userId: number };

export async function getUser({ userId }: getUserParams) {
  const result = await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.telegramUserId, userId),
  });

  return result;
}

type createUserParams = { userId: number, chatId: number };

export async function createUser({ userId, chatId }: createUserParams) {
  const [user] = await db.insert(usersTable).values({ telegramUserId: userId, chatId: chatId }).returning();
  return user;
}

type updateStepParams = { step: Step, telegramUserId: number };

export async function updateStep({ step, telegramUserId }: updateStepParams) {
  const res = await db.update(usersTable)
    .set({ step })
    .where(eq(usersTable.telegramUserId, telegramUserId));

  if (res.rowCount === 0) {
    throw new Error("Something went wrong");
  }
}

type updateUserParams = { input: { username?: string, name?: string, bio?: string }, telegramUserId: number };
export async function updateUser(data: updateUserParams) {
  const res = await db.update(usersTable)
    .set(data.input)
    .where(eq(usersTable.telegramUserId, data.telegramUserId));

  if (res.rowCount === 0) {
    throw new Error("Something went wrong");
  }
}
