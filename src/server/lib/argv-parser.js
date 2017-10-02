const mri = require("mri");

const parser = args => {
  return mri(args, {
    alias: {
      production: ["prod"],
      development: ["dev"],
      port: ["port"],
      config: ["config"]
    }
  });
};

exports.parser = parser;
