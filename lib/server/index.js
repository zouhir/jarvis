const webpack = require("webpack");
const authors = require("parse-authors");
const importFrom = require("import-from"); // used to get the users project details form their working dir
const reporter = require("./reporter-util"); // webpack stats formatters & helpers
const server = require("./server"); // client server
const fs = require('fs');

class Jarvis {
  constructor(opts = {}) {
    const currentWorkingDirectory = process.cwd();
    opts.host = opts.host || "localhost";
    opts.port = parseInt(opts.port || 1337, 10);
    opts.keepAlive = !!opts.keepAlive;
    opts.packageJsonPath = opts.packageJsonPath || currentWorkingDirectory;    

    if (opts.port && isNaN(opts.port)) {
      console.error(`[JARVIS] error: the specified port (${opts.port}) is invalid. Reverting to 1337`);
      opts.port = 1337;
    }

    if (opts.packageJsonPath && !fs.existsSync(opts.packageJsonPath)) {
      console.warn(`[JARVIS] warning: the specified path (${opts.packageJsonPath}) does not exist. Falling back to ${currentWorkingDirectory}`); //Fallback to cwd and warn
      opts.packageJsonPath = currentWorkingDirectory
    }

    this.options = opts;

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

  apply(compiler) {
    const { name, version, author: makers } = this.pkg;
    const normalizedAuthor = parseAuthor(makers);

    this.reports.project = { name, version, makers: normalizedAuthor };

    // check if the current build is production, via defined plugin
    const definePlugin = compiler.options.plugins.find(fn => fn.constructor.name === "DefinePlugin");

    if (definePlugin) {
      const pluginNodeEnv = definePlugin["definitions"]["process.env.NODE_ENV"];
      this.env.production = pluginNodeEnv === "production";
    }

    let jarvis;
    let isDev = !this.env.production;
    let { port, host } = this.options;

    if (!this.env.running) {
      jarvis = this.server = server.init(compiler, isDev);
      jarvis.http.listen(port, host, _ => {
        console.log(`[JARVIS] Starting dashboard on: http://${host}:${port}`);
        this.env.running = true;
        // if a new client is connected push current bundle info
        jarvis.io.on("connection", socket => {
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

    // report the webpack compiler progress
    compiler.apply(
      new webpack.ProgressPlugin((percentage, message) => {
        this.reports.progress = { percentage, message };
        jarvis.io.emit("progress", { percentage, message });
      })
    );

    // extract the final reports from the stats!
    compiler.plugin("done", stats => {
      const jsonStats = stats.toJson({ chunkModules: true });
      jsonStats.isDev = isDev;
      this.reports.stats = reporter.statsReporter(jsonStats);
      jarvis.io.emit("stats", this.reports.stats);

      if (!this.options.keepAlive && !this.env.watching) {
        jarvis.http.close();
        jarvis.io.close();
      }
    });
  }
}

function parseAuthor(author) {
  if (author && author.name) return author;

  if (typeof author === "string") {
    const authorsArray = authors(author);
    if (authorsArray.length > 0) {
      return authorsArray[0];
    }
  }

  return { name: "", email: "", url: "" };
};

module.exports = Jarvis;
