import type { State } from "../lib/state.js";
import type { GetUpdateResponse } from "../lib/types/base.js";

export type TelegramApi = ReturnType<typeof createTelegramApi>;

export function createTelegramApi(baseUrl: string) {
  return {
    getUpdates: async (state: State) => {
      const url = new URL(`${baseUrl}/getUpdates`);
      url.searchParams.set("timeout", "30");
      url.searchParams.set("offset", String(state.offset));

      const res = await fetch(url);
      const data = await res.json() as GetUpdateResponse;

      for (const upd of data.result) {
        state.offset = upd.update_id + 1;
      }

      return data;
    },
    getCommands: async () => {
      const res = await fetch(`${baseUrl}/getMyCommands`);
      const data = await res.json();
    },
    sendMessage: async (chatId: number, text: string) => {
      const url = new URL(`${baseUrl}/sendMessage`);
      url.searchParams.set("chat_id", chatId.toString());
      url.searchParams.set("text", text);

      const res = await fetch(url);
      const data = await res.json();
    }
  }
}
