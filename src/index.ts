import { server } from "./server.js";
import { createTelegramApi } from "./api/telegram.js";
import type { State } from "./state.js";

process.loadEnvFile();

const BASE_URL =
  `https://api.telegram.org/${process.env.TOKEN}`;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function main() {
  server.listen(process.env.PORT);

  const state: State = { offset: 0 };
  const telegramApi = createTelegramApi(BASE_URL);
  telegramApi.getCommands();

  //long polling
  while (true) {
    try {
      await telegramApi.getUpdates(state);
    } catch (e) {
      console.error("getUpdates error:", e);
      await sleep(1000);
    }
  }
}

main().catch(console.error);

