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

const client = join(__dirname, "../../bin/client");

exports.init = (compiler, isDev) => {
  let app = polka().get("*", statics(client));
  let http = app.server;
  return { http, io:socket(http) };
};