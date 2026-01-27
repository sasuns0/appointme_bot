import type { User } from "./types/user.js";
import type { TelegramApi } from "../api/telegram.js";
import { createUser, getUser, updateStep, updateUser } from "./service/user.js";
import type { Update } from "./types/base.js";

async function registerUser(update: Update, telegramApi: TelegramApi, user: User) {
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

export async function handleUpdate(update: Update, telegramApi: TelegramApi) {
  const userId = update.message.from.id;
  const chatId = update.message.chat.id;
  const messageText = update.message.text;

  let user: User | undefined = await getUser({ userId });

  if (messageText === "/start") {
    if (!user) {
      user = await createUser({ userId, chatId });
    }
  }

  if (!user) {
    await telegramApi.sendMessage(update.message.chat.id, "Please register first by running /start")
    return;
  }

  if (user.step !== "complete") {
    await registerUser(update, telegramApi, user)
  }
}
