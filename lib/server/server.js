/*!
 * webpack-jarvis <https://github.com/zouhir/webpack-jarvis>
 *
 * Copyright (c) 2017, Zouhir C.
 * Licensed under the MIT License.
 */

const polka = require("polka");
const socket = require("socket.io");
const statics = require("serve-static");
const { join } = require("path");

const client = join(__dirname, "..");

exports.init = (compiler, isDev) => {
  let app = polka().get("*", (req, res) => {
    // TODO: fix Polka
    statics(client)(req, res, err => {
      res.statusCode = 404;
      res.end('');
    });
  });

  if (isDev) {
    compiler.outputPath = "/"; // wtf?
    app.use(
      require("webpack-dev-middleware")(compiler),
      require("webpack-hot-middleware")(compiler, {
        heartbeat: 1e4, // 10s
        path: "/__webpack_hmr",
        reload: true
      })
    );
  }
  let http = app.server;
  return { http, io:socket(http) };
};
