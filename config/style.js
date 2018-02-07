const browsers = require("./browsers");

module.exports = isProd => {
  // assume dev/HMR values initially
  let css={ minimize:isProd }, arr=[{ loader:'style-loader' }];

  if (isProd) {
    arr = [];
    css.localIdentName = "[local]";
    css.modules = css.sourceMap = css.importLoaders = true;
  }

  return arr.concat(
    {
      loader: "css-loader",
      options: css
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
  );
};