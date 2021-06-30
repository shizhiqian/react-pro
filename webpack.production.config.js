const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将CSS提取出来，而不是和js混在一起
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // 对js进行压缩
const webpackbar = require('webpackbar');

// 基础路径
const PUBLIC_PATH = '/';

module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, 'src', 'index'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 将文件打包到此目录下
    publicPath: PUBLIC_PATH, // 在生成的html中，文件的引入路径会相对于此地址，生成的css中，以及各类图片的URL都会相对于此地址
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].async.js',
  },
  stats: {
    children: false, // 不输出子模块的打包信息
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 多线程并行构建
        terserOptions: {
          // https://github.com/terser/terser#minify-options
          compress: {
            warnings: false, // 删除无用代码时是否给出警告
            drop_debugger: true, // 删除所有的debugger
            drop_console: true, // 删除所有的console.*
            pure_funcs: ['console.log'], // 删除所有的console.log
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)?$/i,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader'],
      },
      // 专门处理antd等组件等样式
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      // 专门处理iconfont的css
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/assets/font'),
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.css$/,
        exclude: ['/node_modules/', path.resolve(__dirname, 'src/assets/font')],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
                localIdentName: 'zhiqian__[path][name]__[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'local',
                localIdentName: 'zhiqian__[path][name]__[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        // 文件解析
        test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[name].[hash:6][ext]',
        },
      },
      {
        // 图片解析
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb以内转换为base64
          },
        },
        generator: {
          filename: 'static/[name].[hash:6][ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpackbar(),
    new AntdDayjsWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].chunk.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      hash: true,
      inject: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './public/**/*',
          to: './',
          globOptions: {
            ignore: ['**/favicon.png', '**/index.html'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css', '.wasm'], // 后缀名自动补全
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
