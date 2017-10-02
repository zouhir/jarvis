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

function _formattedError(errors = []) {
  let formatter = new Formatter();
  return errors.map(error => {
    return formatter.toHtml(error);
  });
}

function _transformModules(modules = []) {
  const MODULE_TYPES = { "harmony import": "esm", "cjs require": "cjs" };
  let esmCount = 0;
  let cjsCount = 0;
  let table = modules.map(module => {
    let name = module.name;
    let size = module.size;
    let pureEsm = true;
    let reasons = module.reasons.map(re => {
      if (MODULE_TYPES[re.type] === "esm") {
        esmCount++;
      } else if (MODULE_TYPES[re.type] === "cjs") {
        pureEsm = false;
        cjsCount++;
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
  });
  return {
    esmCount,
    cjsCount,
    table
  };
}

function statsReporter(statsJson) {
  let report = {};
  report.assets = statsJson.assets || [];
  report.errors = _formattedError(statsJson.errors);
  report.warnings = _formattedError(statsJson.warnings);
  report.time = statsJson.time || 0;
  report.modules = _transformModules(statsJson.modules)
  report.assetsSize = statsJson.assets.reduce((sum, asset) => {
    return (sum = sum + asset.size);
  }, 0);

  return report;
}

module.exports = {
  configAnalyser,
  statsReporter
};
