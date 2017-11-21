var minimist = require("minimist");

module.exports = args => {
  return minimist(args, {
    alias: {
      production: "prod",
      development: "dev",
      "--env": "env"
    }
  });
};
