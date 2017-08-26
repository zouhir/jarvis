const webpack = require("webpack");
const config = require("../../webpack.config");
const ProgressPlugin = require("webpack/lib/ProgressPlugin");
const emitter = require("./emitter");
const compiler = webpack(config("env"));
const io = require("./index").io;

const MODTYPES = {'harmony import': 'esm', 'cjs require': 'cjs'}

const performance = config("env").performance || {}

let _stats = null;

compiler.apply(
  new ProgressPlugin((percentage, message) => {
    emitter.emitPrecentage(percentage, message);
  })
);

compiler.plugin("done", stats => {
  jsonStats = stats.toJson();
  _stats = {};
  _stats.assets = jsonStats.assets || [];
  _stats.errors = jsonStats.errors || [];
  _stats.warnings = jsonStats.warnings || [];
  _stats.time = jsonStats.time;
  _stats.performance = performance
  _stats.modules = jsonStats.modules.map(module => {
    let name = module.name;
    let size = module.size;
    let required = module.reasons.map(re => {
      return {
        by: re.moduleName,
        type: MODTYPES[re.type] ?  MODTYPES[re.type] : 'Other'
      }
    })
    return {
      name, size, required
    }
  })
  emitter.emitStats("SUCCESS", _stats);
});

compiler.getStats = () => _stats;

module.exports = compiler;
