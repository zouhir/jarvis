const path = require("path");
const webpack = require("webpack");
const chalk = require("chalk");
const WebpackMessages = require("webpack-messages");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const pkg = require("./package.json");
const babelrc = require("./babel");
const PrettyMessage = require("./src/pretty-message");

module.exports = env => {
  return {
    context: path.resolve("demo-app"),
    entry: ["./index.js", "webpack-dev-server/client?http://localhost:8080"],
    output: {
      path: path.resolve("dist"),
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
            options: babelrc(env)
          }
        },
        {
          test: /emotion\.css$/,
          use: ["style-loader", { loader: "css-loader" }]
        },
        {
          test: /\.json$/,
          use: "json-loader"
        },
        {
          test: /\.(xml|html|txt|md)$/,
          use: "raw-loader"
        }
      ]
    },
    plugins: [
      new WebpackMessages({
        name: pkg.name,
        logger: PrettyMessage,
        onComplete: (name, stats) => {
          PrettyMessage(
            chalk.green(
              `Completed${name} in ${(stats.endTime - stats.startTime) / 1e3}`
            )
          );
          PrettyMessage(chalk.yellow(`Serving${name} on localhost:8080`));
        }
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env)
      }),
      new ExtractTextPlugin("styles.css"),
      new webpack.HotModuleReplacementPlugin()
    ].concat(
      env === "production"
        ? [
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

    devtool: env === "production" ? "source-map" : "eval",
    devServer: {
      port: 8080,
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
};
