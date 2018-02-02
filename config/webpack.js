const { join } = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const Jarvis = require("../lib/server");
const pkg = require("../package.json");

const babel = require("./babel");
const styles = require("./style");
const uglify = require("./uglify");

const dist = join(__dirname, "../lib");

module.exports = env => {
  const isProd = env && env.production;

  // Our entry file
  let entry = './src/index.js';

  // Base plugins
  let plugins = [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(isProd ? 'production' : 'development')
    })
  ];

  if (isProd) {
    babel.plugins.push('babel-plugin-transform-react-remove-prop-types');
    plugins.push(
      new webpack.optimize.UglifyJsPlugin(uglify),
      new ExtractTextPlugin({
        filename: "style.css",
        allChunks: false
      })
    );
  } else {
    // Add HMR client
    entry = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', entry];
    // Allow styles HMR
    styles.unshift({ loader:'style-loader' });
    // Add dev-only plugins
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new Jarvis()
    )
  }
  
  return {
    entry,
    output: {
      path: dist,
      publicPath: "/",
      filename: "bundle.js"
    },
    resolve: {
      extensions: [".jsx", ".js", ".json", ".scss"],
      alias: {
        "react": "preact-compat",
        "react-dom": "preact-compat"
      }
    },
    plugins,
    devtool: !isProd && 'eval',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: "babel-loader",
            options: babel
          }
        }, {
          test: /(\.css|\.scss)$/,
          use: isProd ? ExtractTextPlugin.extract({ fallback: "style-loader", use:styles }) : styles
        }, {
          test: /\.json$/,
          use: "json-loader"
        }, {
          test: /\.(xml|html|txt|md)$/,
          use: "raw-loader"
        }, {
          test: /\.ico$/,
          use: "url-loader"
        }, {
          test: /\.svg/,
          use: {
            loader: "svg-url-loader",
            options: {}
          }
        }
      ]
    }
  };
};
