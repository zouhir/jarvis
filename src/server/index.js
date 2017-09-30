const express = require("express");
const chalk = require("chalk");
const http = require("http");
const socket = require("socket.io");
const path = require("path");
const WebpackDevServer = require("webpack-dev-server");

const app = express();

const server = http.Server(app);
const io = socket(server);
exports.io = io;

const compiler = require('./compiler');
const emitter = require("./emitter");

const solariFs = require('./fs')

// ask compiler watch
// compiler.progress();
// compiler.watch();
// TODO: ask compiler to run
// TODO: compiler.watch('dev')

app.use(express.static(path.join(__dirname, "../../client/")));


// servers the Preact dashboard main page
app.get("/", function(req, res) {
  // TODO: improve this
  res.sendFile(path.join(__dirname, "../../client/index.html"));
});

/**
 * Socket.io main connection
 */
let MEM_LEAK_COUTER = 20;
io.on("connection", function(socket) {
  MEM_LEAK_COUTER--;
  if (MEM_LEAK_COUTER < 1) {
    console.log("memory leak, open a Github issue please");
    process.exit(1);
  }
  emitter.emitStats("SUCCESS", compiler.getStats());
});


const devServer = new WebpackDevServer(compiler, {
});

server.listen(3000, function() {
  console.log("Starting Solari on: http://localhost:3000");
});