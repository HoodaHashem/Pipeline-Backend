import app from "./src/app.js";
import http from "http";
import setupSocket from "./src/services/socket.js";

const server = http.createServer(app);

setupSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT}`);
});
