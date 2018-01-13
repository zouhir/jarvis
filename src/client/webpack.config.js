const path = require("path");
const webpack = require("webpack");
const chalk = require("chalk");
const WebpackMessages = require("webpack-messages");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const Jarvis = require("../plugin/index");

const pkg = require("./package.json");
const babelrc = require("./babel");

const ENV = process.env.NODE_ENV || "development";

module.exports = {
  context: path.resolve("./src/client"),
  entry: ["./index.js"],
  output: {
    path: path.resolve("bin/client/"),
    publicPath: "/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".jsx", ".js", ".json", ".scss"],
    modules: [
      path.resolve(__dirname, "demo-app/lib"),
      path.resolve(__dirname, "node_modules"),
      "node_modules"
    ],
    alias: {
      components: path.resolve(__dirname, "demo-app/components"), // used for tests
      style: path.resolve(__dirname, "demo-app/style"),
      react: "preact-compat",
      "react-dom": "preact-compat"
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelrc(ENV)
        }
      },
      {
        test: /(\.css|\.scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: true,
                localIdentName: "[local]"
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: "inline",
                plugins: function() {
                  return [autoprefixer({ browsers: ["> 1%", "IE >= 10"] })];
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.json$/,
        use: "json-loader"
      },
      {
        test: /\.(xml|html|txt|md)$/,
        use: "raw-loader"
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {}
        }
      }
    ]
  },
  plugins: [
    new WebpackMessages({
      name: pkg.name
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(ENV)
    }),
    new ExtractTextPlugin({
      filename: "style.css",
      allChunks: false,
      disable: ENV !== "production"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Jarvis()
  ].concat(
    ENV === "production"
      ? [
          new CopyWebpackPlugin([
            { from: "assets", to: "assets" },
            { from: "DATA", to: "DATA" },
            { from: "index.html" }
          ]),
          new webpack.optimize.UglifyJsPlugin({
            output: {
              comments: false
            },
            mangle: true,
            sourceMap: true,
            compress: {
              properties: true,
              keep_fargs: false,
              pure_getters: true,
              collapse_vars: true,
              warnings: false,
              screw_ie8: true,
              sequences: true,
              dead_code: true,
              drop_debugger: true,
              comparisons: true,
              conditionals: true,
              evaluate: true,
              booleans: true,
              loops: true,
              unused: true,
              hoist_funs: true,
              if_return: true,
              join_vars: true,
              cascade: true,
              drop_console: false,
              pure_funcs: [
                "classCallCheck",
                "_classCallCheck",
                "_possibleConstructorReturn",
                "Object.freeze",
                "invariant",
                "warning"
              ]
            }
          })
        ]
      : []
  ),
  devtool: ENV === "production" ? "source-map" : "eval",
  devServer: {
    port: 3000,
    host: "localhost",
    publicPath: "/",
    contentBase: "./src/client",
    historyApiFallback: true,
    open: true,
    openPage: "",
    proxy: {
      // OPTIONAL: proxy configuration:
      // '/optional-prefix/**': { // path pattern to rewrite
      //   target: 'http://target-host.com',
      //   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
      // }
    }
  }
};
