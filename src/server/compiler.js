const webpack = require("webpack");
const config = require("../../webpack.config");
const ProgressPlugin = require("webpack/lib/ProgressPlugin");
const emitter = require("./emitter");
const compiler = webpack(config("env"));
const io = require("./index").io;

const util = require('util');


let _stats = null;

compiler.apply(
  new ProgressPlugin((percentage, message) => {
    emitter.emitPrecentage(percentage, message);
  })
);

compiler.plugin("done", stats => {
  console.log(stats.compilation.modules[0]);
  _stats = stats.toJson();
  if (stats.hasErrors() || stats.hasWarnings()) {
    return emitter.emitStats(
      stats.hasError() ? "ERROR" : stats.hasWarning(),
      _stats
    );
  }
  emitter.emitStats("SUCCESS", _stats);
});

// compiler.watch(
//   {
//     ignored: "/node_modules/"
//   },
//   (error, stats) => {
//     if (error) {
//       emitter.emitStats("ERROR", error);
//       return;
//     }
//     _stats = stats.toJson();
//     if (stats.hasErrors() || stats.hasWarnings()) {
//       return emitter.emitStats(
//         stats.hasError() ? "ERROR" : stats.hasWarning(),
//         _stats
//       );
//     }
//     emitter.emitStats("SUCCESS", _stats);
//   }
// );


compiler.getStats = () => _stats;

module.exports = compiler;
