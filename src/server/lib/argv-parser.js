const mri = require("mri");

module.exports = args => {
  return mri(args, {
    alias: {
      production: "prod",
      development: "dev"
    }
  });
};
