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
  if (stats.errors.length > 0 || stats.warnings.length > 0) {
    return [];
  }
  let html = [
    `
    <div style="color:#06FFFF">
    Hash: ${stats.hash} <br />
    Webpack version: ${stats.version} <br /><br />
    </div>
  `
  ];
  if (stats.isDev) {
    html.push(`<div style="color: #F3F661">Note: Running dev-server does not necessarily 
      represent accurate final assets size and performance metrics.<br /><br /></div>`);
  }
  html.push(
    `<div style="color:#0DF9A3">Project has been successfully compiled <br /></div>`
  );
  return html;
}

function _transformModules(modules = []) {
  const MODULE_TYPES = {
    "harmony import": "esm",
    "module.hot.accept": "esm",
    "harmony accept": "esm",
    "cjs require": "cjs"
  };
  let esmCount = 0;
  let cjsCount = 0;
  let table = {};
  let type;
  table.cjs = [];
  table.esm = [];
  table.mixed = [];
  modules.forEach(module => {
    let name = module.name;
    let size = module.size;
    let _esmFound = false;
    let _cjsFound = false;
    let reasons = [];
    module.reasons.forEach(re => {
      if (MODULE_TYPES[re.type] === "esm") {
        _esmFound = true;
      } else if (MODULE_TYPES[re.type] === "cjs") {
        _cjsFound = true;
      }
      reasons.push({
        by: re.moduleName,
        type: re.type
      });
    });
    if (_esmFound && !_cjsFound) {
      type = "esm";
    } else if (_esmFound && _cjsFound) {
      type = "mixed";
    } else if (!_esmFound) {
      type = "cjs";
    }
    if (table[type]) {
      table[type].push({
        name,
        size,
        reasons
      });
    }
  });

  return table;
}

function statsReporter(statsJson, env) {
  let report = {};
  report.assets = statsJson.assets || [];
  report.errors = _formattedError(statsJson.errors);
  report.warnings = _formattedError(statsJson.warnings);
  report.success = _formattedSuccessfulRun(statsJson);
  report.time = statsJson.time || 0;
  report.modules = _transformModules(statsJson.modules);
  report.assetsSize = statsJson.assets.reduce((sum, asset) => {
    let size = 0;
    if (asset.name && !asset.name.endsWith(".map")) {
      size = asset.size;
    }
    return (sum = sum + size);
  }, 0);

  return report;
}

module.exports = {
  configAnalyser,
  statsReporter
};
