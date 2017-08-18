/**
 * MASSIVE FILE OR TRASH CODE
 * DON'T STEP IN HERE UNTIL ZOUHIR IS DONE
 */
const express = require("express");
const chalk = require("chalk");
const config = require("../../webpack.config")("dev");
const http = require("http");
const socket = require("socket.io");
const mri = require("mri");
const path = require("path");
const webpack = require("webpack");
/**
 * solari express server stuff
 */
const app = express();
const server = http.Server(app);
const io = socket(server);
/**
 * webpack stuff
 */
const compiler = webpack(config);
const compilerStatus = {}

let MEM_LEAK_COUTER = 20;

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

io.on("connection", function(socket) {
  MEM_LEAK_COUTER--;
  if (MEM_LEAK_COUTER < 1) {
    // BAM! memory leak baby
    // TODO:  handle properly please
    process.exit(1);
  }
  if (compilerStatus.stats)
  io.emit("webpack_watch_success", compilerStatus.stats);
});

compiler.watch(
  {
    ignored: "/node_modules/"
  },
  (error, stats) => {
    compilerStatus.watching = true;
    if (error) {
      return console.log(error);
    }
    let info = stats.toJson();
    compilerStatus.stats = info
    io.emit("webpack_watch_success", 
      info
    );
  }
);

server.listen(3000, function() {
  console.log("listening on *:3000");
});