const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const path = require('path');
const WebpackBar = require('webpackbar');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

process.env.NODE_ENV = 'development';

const getWebpackConfig = (name, library) => {
  return {
    entry: {
      [name]: './examples/index.tsx',
    },
    output: {
      filename: '[name].min.js',
      library: library,
      libraryTarget: 'umd',
      path: resolveApp('dist/'),
      publicPath: '/',
    },
    resolve: {
      mainFields: ['module', 'main'],
      extensions: ['.ts', '.tsx', '.js', 'jsx'],
      modules: ['node_modules'],
      fallback: { tty: false, os: false, util: false },
    },
    devServer: {
      compress: true,
      port: 9000,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      hot: true,
      open: true,
      historyApiFallback: true,
    },
    externals: {
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: [path.resolve('src'), path.resolve('examples'), path.resolve('documents')],
          loader: require.resolve('babel-loader'),
          options: {
            customize: require.resolve('babel-preset-react-app/webpack-overrides'),
            presets: [
              [
                require.resolve('babel-preset-react-app'),
                {
                  runtime: 'classic',
                },
              ],
            ],
            plugins: [
              [
                require.resolve('babel-plugin-named-asset-import'),
                {
                  loaderMap: {
                    svg: {
                      ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                    },
                  },
                },
              ],
            ].filter(Boolean),
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            // See #6846 for context on why cacheCompression is disabled
            cacheCompression: false,
            compact: true,
          },
        },
        {
          test: /\.(js|mjs)$/,
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            configFile: false,
            compact: false,
            presets: [[require.resolve('babel-preset-react-app/dependencies'), { helpers: true }]],
            cacheDirectory: true,
            // See #6846 for context on why cacheCompression is disabled
            cacheCompression: false,
            // Babel sourcemaps are needed for debugging into node_modules
            // code.  Without the options below, debuggers like VSCode
            // show incorrect code and set breakpoints on the wrong lines.
            sourceMaps: true,
            inputSourceMap: true,
          },
        },
        {
          test: /\.css$/,
          // exclude: /node_modules/,
          use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }],
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader', options: {
              modules: {
                // localIdentName: '[hash:base64:6]'
                localIdentName: '[folder]_[local]',
              },
              importLoaders: 2
            } },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                lessOptions: {
                  javascriptEnabled: true,
                  modifyVars: {},
                }
              },
            },
          ],
        },
        {
          test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
          use: [
            {
              loader: 'url-loader',
              options: {
                  limit: 8192,
                  outputPath: 'assets'
              }
            }
          ]
        }
      ],
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new HtmlWebpackPlugin({
        template: 'examples/index.html',
        filename: 'index.html',
        inject: true,
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      ...(process.env.MODE === 'ANALYZER' ? [new BundleAnalyzerPlugin({ analyzerMode: 'static' })] : []),
      new WebpackBar(),
    ],
    performance: {
      hints: false,
    },
    devtool: 'source-map',
  };
};

module.exports = getWebpackConfig('index', 'index');;
