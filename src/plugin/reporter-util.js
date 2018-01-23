const Formatter = require("ansi-to-html");

function configAnalyser(configs) {
  const hasPerformanceBudget =
    !config.performance || Object.keys(configs.performance).length < 1;

  return { performance: hasPerformanceBudget };
}

function _formattedError(errors = []) {
  const newFormat = { newline: true, escapeXML: true };
  const formatter = new Formatter(newFormat);
  return errors.map(error => formatter.toHtml(error));
}

const successFooter = `<div class="stats-success-footer">
  Project has been successfully compiled</div>`;

function _formattedSuccessfulRun(stats) {
  if (stats.errors.length > 0 || stats.warnings.length > 0) {
    return [];
  }

  const head = `<div class="stats-success-head">Hash: ${stats.hash}<br />
      Webpack version: ${stats.version}</div>`;

  const dev = stats.isDev
    ? `<div class="stats-success-dev">
      Note: Running dev-server does not necessarily 
      represent accurate final assets size and performance metrics.
    </div>`
    : "";

  return [head, dev, successFooter].filter(Boolean);
}

const MODULE_TYPES = {
  "harmony import": "esm",
  "module.hot.accept": "esm",
  "harmony accept": "esm",
  "cjs require": "cjs"
};

function _transformModules(modules = []) {
  const table = { cjs: [], esm: [], mixed: [] };

  modules.forEach(module => {
    const { name, size, reasons } = module;
    const hasEsm = reasons.some(re => MODULE_TYPES[re.type] === "esm");
    const hasCjs = reasons.some(re => MODULE_TYPES[re.type] === "cjs");

    const transformedReasons = reasons.map(re => {
      return { by: re.moduleName, type: re.type };
    });

    const transformedModule = { name, size, transformedReasons };

    if (table["esm"] && hasEsm && !hasCjs) {
      table["esm"].push(transformedModule);
    } else if (table["mixed"] && hasEsm && hasCjs) {
      table["mixed"].push(transformedModule);
    } else if (table["cjs"] && !hasEsm) {
      table["cjs"].push(transformedModule);
    }
  });

  return table;
}

function statsReporter(statsJson, env) {
  const assetSize = statsJson.assets.reduce((sum, asset) => {
    const hasAssetNameMap = asset.name && !asset.name.endsWith(".map");
    const size = hasAssetNameMap ? asset.size : 0;
    return (sum = sum + size);
  }, 0);

  return {
    assets: statsJson.assets || [],
    errors: _formattedError(statsJson.errors),
    warnings: _formattedError(statsJson.warnings),
    success: _formattedSuccessfulRun(statsJson),
    time: statsJson.time || 0,
    modules: _transformModules(statsJson.modules),
    assetsSize: assetSize
  };
}

module.exports = {
  configAnalyser,
  statsReporter
};
