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
  let formatter = new Formatter({
    newline: true,
    escapeXML: true
  });
  return errors.map(error => {
    return formatter.toHtml(error);
  });
}

function _formattedSuccessfulRun(stats) {
  if( stats.errors.length > 0 || stats.warnings.length > 9) {
    return null
  } 
  let html = [`
    <div style="color:#B0F68E">
    Hash: ${stats.hash} <br />
    Webpack version: ${stats.version} <br /><br />
    </div>
  `];
  if(stats.isDev) {
    html.push(`<div style="color: #F3F661">Note: Running dev-server does not necessarily 
      represent accurate final assets size and performance metrics.<br /><br /></div>`);
  }
  html.push(`<div style="color:#B0F68E">Project has been successfully compiled <br /></div>`)
  return html;
}

function _transformModules(modules = []) {
  const MODULE_TYPES = { "harmony import": "esm", "cjs require": "cjs" };
  let esmCount = 0;
  let cjsCount = 0;
  let table = modules.map(module => {
    let name = module.name;
    let size = module.size;
    let esmFound = true;
    let cjsFound = false;
    let reasons = module.reasons.map(re => {
      if (MODULE_TYPES[re.type] === "esm") {
        esmCount++;
      } else if (MODULE_TYPES[re.type] === "cjs") {
        esmFound = false;
        cjsFound = true;
      } else {
        esmFound = false;
      }
      return {
        by: re.moduleName,
        type: MODULE_TYPES[re.type] ? MODULE_TYPES[re.type] : "Other"
      };
    });
    let type = "Other";
    if (esmFound) {
      type = "esm";
      esmCount++;
    } else if (cjsFound) {
      type = "cjs";
      cjsCount++;
    }
    return {
      name,
      size,
      reasons,
      type
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
  report.success = _formattedSuccessfulRun(statsJson)
  report.time = statsJson.time || 0;
  report.modules = _transformModules(statsJson.modules);
  report.assetsSize = statsJson.assets.reduce((sum, asset) => {
    return (sum = sum + asset.size);
  }, 0);

  return report;
}

module.exports = {
  configAnalyser,
  statsReporter
};
