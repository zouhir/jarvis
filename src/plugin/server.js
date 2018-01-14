/*!
 * webpack-jarvis <https://github.com/zouhir/webpack-jarvis>
 *
 * Copyright (c) 2017, Zouhir C.
 * Licensed under the MIT License.
 */

/**
 * External Dependencies
 */
const cwd = require("cwd");
const express = require("express");
const http = require("http");
const path = require("path");
const socket = require("socket.io");

/**
 * Setup express with web sockets
 *
 * socket.io docs: https://socket.io/docs/server-api/
 */
const app = express();
const server = http.Server(app);
const io = socket(server);

let PORT = undefined;

exports.io = io;

if (process.env.NODE_ENV !== "jarvis_dev") {
  app.use("/", express.static(path.join(__dirname, "../../bin/client")));
  app.get("/", (_, res) =>
    res.sendFile(path.join(__dirname + "../../dist/bin/index.html"))
  );
} else {
  app.get("/", (_, res) => res.send(`Jarvis client is running on: ${PORT}`));
}

const start = (options, next) => {

  PORT = options.port;

  return server.listen(PORT, () => {
    console.log(`[JARVIS] Starting dashboard on: http://localhost:${PORT}`);
    next();
  });
};

const close = () => {
  server.close();
  io.close();
};
exports.start = start;
exports.close = close;
