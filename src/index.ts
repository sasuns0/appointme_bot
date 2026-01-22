import { server } from "./server.js";
import type { GetUpdateResponse } from "./types.js";

process.loadEnvFile();

const BASE_URL =
  `https://api.telegram.org/${process.env.TOKEN}`;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

let offset = 0;

async function getCommands() {
  const res = await fetch(`${BASE_URL}/getMyCommands`);
  const data = await res.json();
  console.log(data);
}

async function getUpdates() {
  const url = new URL(`${BASE_URL}/getUpdates`);
  url.searchParams.set("timeout", "30");
  url.searchParams.set("offset", String(offset));

  const res = await fetch(url);
  const data = await res.json() as GetUpdateResponse;
  console.log(BASE_URL)

  for (const upd of data) {
    offset = upd.update_id + 1;
    console.log(upd);
  }
}

async function main() {
  server.listen(process.env.PORT);

  getCommands();

  //long polling
  while (true) {
    try {
      await getUpdates();
    } catch (e) {
      console.error("getUpdates error:", e);
      await sleep(1000);
    }
  }
}

main().catch(console.error);

