import type { User } from "../types/user";
import type { TelegramApi } from "../../api/telegram";
import { createUser, getUser } from "../services/user";
import type { Update } from "../types/base";
import { registerUserHandler } from "./registerUserHandler";
import { newAppointmentHandler } from "./newAppointmentHandler";

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

  if (!user.isComplete) {
    await registerUserHandler({ update, telegramApi, user })
  }

  if (messageText === "/new") {
    await newAppointmentHandler({ update, telegramApi })
  }
}
