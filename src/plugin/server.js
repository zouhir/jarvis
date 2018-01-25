/*!
 * webpack-jarvis <https://github.com/zouhir/webpack-jarvis>
 *
 * Copyright (c) 2017, Zouhir C.
 * Licensed under the MIT License.
 */

/**
 * External Dependencies
 */
const polka = require("polka");
const socket = require("socket.io");
const statics = require("serve-static");
const { join } = require("path");

/**
 * Setup Polka w/ Socket.io
 *
 * socket.io docs: https://socket.io/docs/server-api/
 */
const app = polka();
const io = socket(app.server);

let PORT;
const client = join(__dirname, "../../bin/client");

exports.io = io;

if (process.env.NODE_ENV !== "jarvis_dev") {
  app.use(statics(client));
} else {
  app.get("/", (_, res) => {
    res.end(`Jarvis client is running on: ${PORT}`);
  });
}

exports.start = (options, next) => {
  HOST = options.host;
  PORT = options.port;
  return app.listen(PORT).then(() => {
    console.log(`[JARVIS] Starting dashboard on: http://${HOST}:${PORT}`);
    next();
  });
};

exports.close = () => {
  app.server.close();
  io.close();
};
