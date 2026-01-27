import type { User } from "../types/user.js";
import type { TelegramApi } from "../../api/telegram.js";
import { createUser, getUser } from "../services/user.js";
import type { Update } from "../types/base.js";
import { registerUserHandler } from "./registerUserHandler.js";

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
    await registerUserHandler(update, telegramApi, user)
  }
}
