import type { User } from "../types/user.js";
import type { TelegramApi } from "../../api/telegram.js";
import { updateStep, updateUser } from "../services/user.js";
import type { Update } from "../types/base.js";

export async function registerUserHandler(update: Update, telegramApi: TelegramApi, user: User) {
  switch (user.step) {
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

