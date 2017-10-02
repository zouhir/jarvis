const Formatter = require("ansi-to-html");

function configAnalyser(configs) {
  let report = {};

  /**
   * check if performance budget is set
   */
  if (!config.performance || Object.keys(configs.performance).length < 1) {
    report.performanceBudget = false;
  }

  /**
   * Your other checks
   */

  return report;
}

function _formattedError(errors) {
  if(!error || !error.length ) {
    return []
  }
  let formatter = new Formatter();
  return errors.map(error => {
    return formatter.toHtml(error);
  })
}

function statsReporter(statsJson) {
  let report = {};
  const MODULE_TYPES = { "harmony import": "esm", "cjs require": "cjs" };
  report.assets = statsJson.assets || [];
  report.errors = _formattedError(statsJson.errors);
  report.warnings = _formattedError(statsJson.warnings);
  report.time = statsJson.time || 0;
  report.modules = {};
  report.modules.esmCount = 0;
  report.modules.cjsCount = 0;
  report.modules.table =
    statsJson.modules.map(module => {
      let name = module.name;
      let size = module.size;
      let pureEsm = true;
      let reasons = module.reasons.map(re => {
        if (MODULE_TYPES[re.type] === "esm") {
          report.modules.esmCount++;
        } else if (MODULE_TYPES[re.type] === "cjs") {
          pureEsm = false;
          report.modules.cjsCount++;
        }
        return {
          by: re.moduleName,
          type: MODULE_TYPES[re.type] ? MODULE_TYPES[re.type] : "Other"
        };
      });
      return {
        name,
        size,
        reasons,
        pureEsm
      };
    }) || [];

  report.assetsSize = statsJson.assets.reduce((sum, asset) => {
    return (sum = sum + asset.size);
  }, 0);
  
  return report;
}

module.exports = {
  configAnalyser,
  statsReporter
};
