const webpack = require("webpack");
const config = require("../../webpack.config");
const ProgressPlugin = require("webpack/lib/ProgressPlugin");
const emitter = require("./emitter");
const compiler = webpack(config("env"));
const io = require("./index").io;

const solariFs = require('./fs');

const MODTYPES = {'harmony import': 'esm', 'cjs require': 'cjs'}

const performance = config("env").performance || {}

let _stats = null;
let reporter = null

compiler.apply(
  new ProgressPlugin((percentage, message) => {
    emitter.emitPrecentage(percentage, message);
  })
);


solariFs.initReporter((err, data) => {
  if(err) {
    emitter.emitError('REPORT_ERROR', { errors: ['Error creating or reading solari-stats'] })
    return
  }
  reporter = data
})

compiler.plugin("done", stats => {
  console.log('done fired');
  jsonStats = stats.toJson();
  _stats = {};
  _stats.assets = jsonStats.assets || [];
  _stats.errors = jsonStats.errors || [];
  _stats.warnings = jsonStats.warnings || [];
  _stats.time = jsonStats.time;
  _stats.performance = performance;
  _stats.assetsSize = 0;
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

  _stats.assetsSize = _stats.assets.reduce((sum, asset) => {
    return sum = sum + asset.size
  }, 0)
  reporter['development'].time.push(_stats.time)
  reporter['development'].assetsSize.push(_stats.assetsSize)
  solariFs.writeReport(JSON.stringify(reporter), (err, data) => {
    if(err) {
      console.log('error generating report')
      return
    }
    emitter.emitGraphReport("SUCCESS", reporter)
  })
  
  console.log(_stats);
  emitter.emitStats("SUCCESS", _stats);
});

compiler.getStats = () => _stats;

module.exports = compiler;
