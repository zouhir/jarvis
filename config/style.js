const browsers = require("./browsers");

module.exports = [
  {
    loader: "css-loader",
    // options: {
    //   modules: true,
    //   sourceMap: true,
    //   importLoaders: true,
    //   localIdentName: "[local]"
    // }
  }, {
    loader: "postcss-loader",
    options: {
      sourceMap: "inline",
      plugins: [
        require("autoprefixer")({ browsers })
      ]
    }
  }, {
    loader: "sass-loader",
    options: {
      sourceMap: true
    }
  }
];