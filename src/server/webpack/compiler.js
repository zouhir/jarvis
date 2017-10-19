/**
 * Compiler stuff
 */
const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
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

  const compilerInstance = webpack(config);

  /**
   * progress reporter plugin
   */
  compilerInstance.apply(
    new webpack.ProgressPlugin((percentage, message) => {
      compilerEvents.emitProgress(percentage, message);
    })
  );

  /**
   * @TODO: apply pretty message plugin if it does not exist
   */

  compilerInstance.plugin("done", stats => {
    let jsonStats = stats.toJson({ chunkModules: true });
    jsonStats.isDev = env === "development";
    let report = reporter.statsReporter(jsonStats);
    if (env === "development") {
      devServerStats = report;
      compilerEvents.emitStats(report);
    } else {
      prodBundleStats = report;
      compilerEvents.emitStats(report);
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
      /* ATM I don't need custom options here, let's see what happens later tho */
    });
  };

  const getDevServerStats = () => devServerStats;
  const getProdBundleStats = () => prodBundleStats;

  return {
    startDevServer,
    getDevServerStats,
    getProdBundleStats
  };
};

module.exports = compiler;
