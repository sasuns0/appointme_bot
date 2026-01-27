import { server } from "./lib/server.js";
import { createTelegramApi } from "./api/telegram.js";
import type { State } from "./lib/state.js";
import { handleUpdate } from "./lib/handleUpdates.js";
import { sleep } from "./utils/sleep.js";

process.loadEnvFile();

const BASE_URL =
  `https://api.telegram.org/${process.env.TOKEN}`;

async function main() {
  server.listen(process.env.PORT);

  const state: State = { offset: 0 };
  const telegramApi = createTelegramApi(BASE_URL);
  telegramApi.getCommands();

  //long polling
  while (true) {
    try {
      const updates = await telegramApi.getUpdates(state);
      if (updates.ok) {
        for (let upd of updates.result) {
          handleUpdate(upd, telegramApi);
        }
      }
    } catch (e) {
      console.error("getUpdates error:", e);
      await sleep(1000);
    }
  }
}

main().catch(console.error);

