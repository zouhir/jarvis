const webpack = require("webpack");
const server = require("./server"); // expreess and socket IO for the client
const reporter = require("./reporter-util"); // webpack stats formatters & helpers
const importCwd = require("import-cwd"); // used to get the users project details form their working dir

const pkg = importCwd("./package.json");

function Jarvis(options) {
  // TOOD: add options for port, etc..
  this.env = {
    production: false,
    running: false, // indicator if our express server + sockets are running
    watching: false
  };
  this.reports = {
    stats: {},
    progress: {},
    project: {}
  };
}

Jarvis.prototype.apply = function(compiler) {
  let projectInfo = {
    name: pkg.name,
    version: pkg.version,
    makers: pkg.author
  };

  this.reports.projcect = projectInfo;

  if (!this.env.running) {
    server.start(() => {
      this.env.running = true;
      // if a new client is connected push current bundle info
      server.io.on("connection", socket => {
        socket.emit("project", this.reports.projcect);
        socket.emit("progress", this.reports.progress);
        socket.emit("stats", this.reports.stats);
      });
    });
  }

  compiler.plugin("watch-run", (c, done) => {
    this.env.watching = true;
    done();
  });

  compiler.plugin("run", (c, done) => {
    this.env.watching = false;
    done();
  });

  // check if the current build is production, via defined plugin
  const definePlugin = compiler.options.plugins.filter(
    plugin => plugin.constructor.name === "DefinePlugin"
  )[0];
  if (
    definePlugin &&
    typeof definePlugin["definitions"]["process.env.NODE_ENV"] !== "undefined"
  ) {
    definePlugin["definitions"]["process.env.NODE_ENV"] === "production"
      ? (this.env.production = true)
      : (this.env.production = false);
  }

  // report the webpack compiler progress
  compiler.apply(
    new webpack.ProgressPlugin((percentage, message) => {
      this.reports.progress = { percentage, message };
      server.io.emit("progress", {
        percentage,
        message
      });
    })
  );

  // extract the final reports from the stats!
  compiler.plugin("done", stats => {
    let jsonStats = stats.toJson({ chunkModules: true });
    jsonStats.isDev = !this.env.production;
    let statsReport = reporter.statsReporter(jsonStats);
    this.reports.stats = statsReport;
    server.io.emit("stats", statsReport);
    if (!this.env.watching) {
      server.close();
    }
  });

  // that's it!
};

module.exports = Jarvis;
