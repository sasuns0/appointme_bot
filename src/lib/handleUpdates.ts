import type { Update } from "../../dist/lib/types.js";

export function handleUpdate(update: Update) {
  switch (update.message.text) {
    case "/start":
      return "Please write your username";
    default:
      return "Wrong command";
  }
}
