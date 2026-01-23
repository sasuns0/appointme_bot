import type { State } from "../state.js";
import type { GetUpdateResponse } from "../types.js";

export function createTelegramApi(baseUrl: string) {
  return {
    getUpdates: async (state: State) => {
      const url = new URL(`${baseUrl}/getUpdates`);
      url.searchParams.set("timeout", "30");
      url.searchParams.set("offset", String(state.offset));

      const res = await fetch(url);
      const data = await res.json() as GetUpdateResponse;
      console.log(baseUrl)

      for (const upd of data) {
        state.offset = upd.update_id + 1;
        console.log(upd);
      }
    },
    getCommands: async () => {
      const res = await fetch(`${baseUrl}/getMyCommands`);
      const data = await res.json();
      console.log(data);
    },
    sendMessage: () => { }
  }
}
