#!/usr/bin/env node

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
 * Compiler Dependencies
 */
const compiler = require("./webpack/compiler");

/**
 * Utility functions
 */
const parser = require("./lib/argv-parser");

/**
 * System custom events
 */
const clientEvents = require("./events/client");

/**
 * Setup express with live web sockets
 * 
 * socket.io docs: https://socket.io/docs/server-api/
 */
const app = express();
const server = http.Server(app);
const io = socket(server);
/**
 * init client events
 */
clientEvents(io);
/**
 * Mandatory service variables
 */
let env, port, configFile, config;
const DEFAULT_ENV = "development";
const DEFAULT_PORT = 1337;
const DEFAULT_WEBPACK_CONFIGS_PATH = "webpack.config";

/**
 * Default configs are the weakest configs
 */
env = DEFAULT_ENV;
port = DEFAULT_PORT;
configFilePath = DEFAULT_WEBPACK_CONFIGS_PATH;
/**
 * Read configs from user arguments
 * Required:
 * @arg1: NODE_ENV
 *        usage: --env.NODE_ENV=production for "production"
 * @arg2: Port
 *        usage: --env.port=3000 
 */
const args = process.argv.slice(2);
let parsed = parser(args);
if (typeof parsed.env === "undefined") parsed.env = {};

if (!parsed.env.NODE_ENV) {
  parsed.env.NODE_ENV = DEFAULT_ENV;
}

if (!parsed.env.port) {
  parsed.env.port = DEFAULT_PORT;
}

if (parsed.config) {
  configFilePath = parsed.config;
}

// Load the configs from the file
config = require(path.join(cwd(), configFilePath));

if (!config) {
  throw new Error("Config file error");
}

// check if confngs are functional or an  object
if (typeof config === "function") {
  config = config(parsed.env);
}

let c = compiler({ config: config, env: env });

if (env === "production") {
  c.makeProdBundle();
} else {
  c.startDevServer();
}

if (process.env.NODE_ENV !== "jarvis_dev") {
  app.use("/", express.static(path.join(__dirname, "../../dist/client")));
  app.get("/", (_, res) =>
    res.sendFile(path.join(__dirname + "../../dist/client/index.html"))
  );
} else {
  app.get("/", (_, res) => res.send("Jarvis client is running on: 1337"));
}
server.listen(1337, () =>
  console.log("Starting JARVIS on: http://localhost:1337")
);
