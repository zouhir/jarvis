const webpack = require("webpack");
const server = require("./server"); // expreess and socket IO for the client
const reporter = require("./reporter-util"); // webpack stats formatters & helpers
const importFrom = require("import-from"); // used to get the users project details form their working dir
const fs = require('fs');

function Jarvis(options = {}) {
  this.options = {
    port: isNaN(parseInt(options.port)) // if port is not a number console.error if port is port given in config and fall back to 1337
      ? (options.port &&
          console.error(
            `[JARVIS] error: the specified port (${
              options.port
            }) is not valid, falling back to 1337...`
          ) &&
          false) ||
        1337
      : options.port,
    packageJsonPath: fs.existsSync(options.packageJsonPath) //Check if path actually exists otherwise fallback to currenty
      ? options.packageJsonPath : process.cdw(),
  };

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

  this.pkg = importFrom(this.options.packageJsonPath, "./package.json");
}

Jarvis.prototype.apply = function(compiler) {
  const { name, version, author: makers } = this.pkg;
  this.reports.project = { name, version, makers };

  if (!this.env.running) {
    server.start(this.options, () => {
      this.env.running = true;
      // if a new client is connected push current bundle info
      server.io.on("connection", socket => {
        socket.emit("project", this.reports.project);
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

  if (definePlugin) {
    const pluginNodeEnv = definePlugin["definitions"]["process.env.NODE_ENV"];
    if (typeof pluginNodeEnv !== "undefined") {
      pluginNodeEnv === "production"
        ? (this.env.production = true)
        : (this.env.production = false);
    }
  }

  // report the webpack compiler progress
  compiler.apply(
    new webpack.ProgressPlugin((percentage, message) => {
      this.reports.progress = { percentage, message };
      server.io.emit("progress", { percentage, message });
    })
  );

  // extract the final reports from the stats!
  compiler.plugin("done", stats => {
    const jsonStats = stats.toJson({ chunkModules: true });
    jsonStats.isDev = !this.env.production;
    this.reports.stats = reporter.statsReporter(jsonStats);
    server.io.emit("stats", this.reports.stats);

    if (!this.env.watching) {
      server.close();
    }
  });

  // that's it!
};

module.exports = Jarvis;
