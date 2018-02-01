const webpack = require("webpack");
const server = require("./server"); // expreess and socket IO for the client
const reporter = require("./reporter-util"); // webpack stats formatters & helpers
const importFrom = require("import-from"); // used to get the users project details form their working dir
const authors = require("parse-authors");

const pkg = importFrom(process.cwd(), "./package.json");

function Jarvis(opts = {}) {
  opts.host = opts.host || "localhost";
  opts.port = parseInt(opts.port || 1337, 10);

  if (opts.port && isNaN(opts.port)) {
    console.error(`[JARVIS] error: the specified port (${opts.port}) is invalid. Reverting to 1337`);
    opts.port = 1337;
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
}

Jarvis.prototype.apply = function(compiler) {
  const { name, version, author: makers } = pkg;
  const normalizedAuthor = parseAuthor(makers);

  this.reports.project = { name, version, makers: normalizedAuthor };

  // check if the current build is production, via defined plugin
  const definePlugin = compiler.options.plugins.find(fn => fn.constructor.name === "DefinePlugin");

  if (definePlugin) {
    const pluginNodeEnv = definePlugin["definitions"]["process.env.NODE_ENV"];
    this.env.production = pluginNodeEnv === "production";
  }

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

const parseAuthor = function(author) {
  if (typeof author === "string") {
    const authorsArray = authors(author);
    if (authorsArray.length > 0) {
      return authorsArray[0];
    }
  } else if (author.name) {
    return author;
  }

  return { name: "", email: "", url: "" };
};
module.exports = Jarvis;
