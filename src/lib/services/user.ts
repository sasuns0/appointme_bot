import { eq } from "drizzle-orm";
import { db } from "../../db/index";
import { usersTable } from "../../db/schemas/users";
import { sessionsTable } from "../../db/schemas/sessions";

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

type updateStepParams = { step: string, telegramUserId: number };

export async function updateStep({ step, telegramUserId }: updateStepParams) {
  const res = await db.update(sessionsTable)
    .set({ step })
    .where(eq(sessionsTable.userId, telegramUserId));

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
