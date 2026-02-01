import type { TelegramApi } from "../../api/telegram.js"
import { getNextDays } from "../../utils/index.js";
import type { Update } from "../types/base.js";

type handlerParams = {
  update: Update,
  telegramApi: TelegramApi
}

export async function newAppointmentHandler({ update, telegramApi }: handlerParams) {
  const next4Days = getNextDays(4);
  const replyMarkup = {
    inline_keyboard: [
      next4Days.map(date => ({ text: `${date.day}.${date.month}.${date.year}`, callback_data: "btn_1" })),
      [
        { text: "Previous", callback_data: "btn_2" },
        { text: "Next", callback_data: "btn_2" }
      ]
    ]
  }

  await telegramApi.createButton(update.message.chat.id, "Choose Date", replyMarkup);
}
