/**
 * Compiler stuff
 */
const path = require("path");
const cwd = require("cwd");
const importCwd = require("import-cwd");
const WebpackDevServer = importCwd("webpack-dev-server");
const webpack = importCwd("webpack");
/**
 * Stats utility and other helpers
 */
const reporter = require("./reporter");
const compilerEvents = require("../events/compiler");

const compiler = ({ config, env, port }) => {
  /**
   * @idea: convert object to array and keep history
   */
  let devServerStats = {};
  let prodBundleStats = {};
  let progressStats = {};

  let devServerConfigs = config.devServer || {};
  /**
   * hot module entry has to be added!
   */
  if (env === "development") {
    if (config.entry.length) {
      let hotFound = false;
      config.entry.forEach(ent => {
        console.log(ent.indexOf("webpack-dev-server/client"));
        if (ent.indexOf("webpack-dev-server/client") > -1) {
          hotFound = true;
        }
      });
      if (!hotFound) {
        config.entry.push(
          `webpack-dev-server/client?http://localhost:${devServerConfigs.port ||
            "8080"}`
        );
      }
    } else {
      let hmrUpdated = false;
      Object.keys(config.entry).forEach(k => {
        if (typeof config.entry[k] !== "string" && config.entry[k].length) {
          hmrUpdated = true;
          config.entry[k].push(
            `webpack-dev-server/client?http://localhost:${devServerConfigs.port ||
              "8080"}`
          );
        }
      });
      if (!hmrUpdated) {
        config.entry[
          "hmr"
        ] = `webpack-dev-server/client?http://localhost:${devServerConfigs.port ||
          "8080"}`;
        console.log("We have encoutered an issue enabling HMR in your bundle");
        console.log(
          "Please add hmr bundle to your index file in order to enable HMR"
        );
        console.log("Alternatively, convery any of your entries to array");
      }
    }
  }

  const compilerInstance = webpack(config);

  /**
   * progress reporter plugin
   */
  compilerInstance.apply(
    new webpack.ProgressPlugin((percentage, message) => {
      compilerEvents.emitProgress(percentage, message);
    })
  );

  if (env === "development") {
    compilerInstance.apply(new webpack.HotModuleReplacementPlugin());
  }

  /**
   * @TODO: apply pretty message plugin if it does not exist
   */

  compilerInstance.plugin("done", stats => {
    let jsonStats = stats.toJson({ chunkModules: true });
    jsonStats.isDev = env === "development";
    let report = reporter.statsReporter(jsonStats);
    if (env === "development") {
      devServerStats = report;
      compilerEvents.emitStats(report, env);
    } else {
      prodBundleStats = report;
      compilerEvents.emitStats(report, env);
    }
    /**
     * emit those 2
     */
  });

  /**
   * @TODO: emit this to the UI
   */
  const startDevServer = () => {
    if (!compilerInstance) {
      throw new Error("invalid compiler could be invalid configs");
    }
    new WebpackDevServer(compilerInstance, {
      port: devServerConfigs.port || "8080",
      host: config.devServer.host || "localhost",
      publicPath: config.devServer.publicPath || "",
      contentBase: config.devServer.contentBase || "",
      historyApiFallback: config.devServer.historyApiFallback,
      open: config.devServer.open || false,
      openPage: config.devServer.openPage || "",
      proxy: config.devServer.proxy || {},
      inline: config.devServer.inline || false
    }).listen(config.devServer.port || 8080);
  };

  const makeProdBundle = () => {
    if (!compilerInstance) {
      throw new Error("invalid compiler could be invalid configs");
    }
    compilerInstance.run((err, stats) => {});
  };

  const getDevServerStats = () => devServerStats;
  const getProdBundleStats = () => prodBundleStats;

  return {
    startDevServer,
    getDevServerStats,
    getProdBundleStats,
    makeProdBundle
  };
};

module.exports = compiler;
