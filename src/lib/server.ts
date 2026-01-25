import http from "node:http";

export const server = http.createServer();
server.on("request", (request) => {
  console.log(request);
});

