import type { User } from "../types/user";
import type { TelegramApi } from "../../api/telegram";
import { updateStep, updateUser } from "../services/user";
import type { Update } from "../types/base";
import { db } from "../../db/index";
import { eq } from "drizzle-orm";
import { sessionsTable } from "../../db/schemas/sessions";

type handlerParams = {
  update: Update,
  telegramApi: TelegramApi,
  user: User
}

export async function registerUserHandler({ update, user, telegramApi }: handlerParams) {
  const userSession = await db.query.sessionsTable.findFirst({ where: eq(sessionsTable.userId, user.telegramUserId) });

  switch (userSession?.step) {
    case "idle":
      await updateStep({ step: "username", telegramUserId: user.telegramUserId });
      await telegramApi.sendMessage(update.message.chat.id, "Please write your username")
      break;
    case "username":
      await updateUser({
        input: {
          username: update.message.text
        },
        telegramUserId: user.telegramUserId
      });

      await updateStep({ step: "fullname", telegramUserId: user.telegramUserId });
      await telegramApi.sendMessage(update.message.chat.id, "Please write your full name")
      break;
    case "fullname":
      await updateUser({
        input: {
          name: update.message.text
        },
        telegramUserId: user.telegramUserId
      });

      await updateStep({ step: "bio", telegramUserId: user.telegramUserId });
      await telegramApi.sendMessage(update.message.chat.id, "Please write your bio")
      break;
    case "bio":
      await updateUser({
        input: {
          bio: update.message.text
        },
        telegramUserId: user.telegramUserId
      });

      await updateStep({ step: "complete", telegramUserId: user.telegramUserId });
      await telegramApi.sendMessage(update.message.chat.id, "You have successfuly registered")
      break;
  }
}

