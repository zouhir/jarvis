const ProgressPlugin = require("webpack/lib/ProgressPlugin");

const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");

const analyser = require('./analyser');

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
    new ProgressPlugin((percentage, message) => {
      // emit those 2
    })
  );

  /**
   * @TODO: apply pretty message plugin if it does not exist
   */

  compilerInstance.plugin("done", stats => {
    console.log("done fired");
    jsonStats = stats.toJson();
    console.log(analyser.statsReporter(jsonStats));
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

  return {
    startDevServer
  };
};

module.exports = compiler;
