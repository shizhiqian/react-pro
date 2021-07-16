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
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PUBLIC_PATH = '/';
console.log(process.env.ANALYZE);
console.log(3333);
const config = {
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
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      minChunks: 1,
      minSize: 0, // 这里自定义不管文件有多小，都要抽取公共代码
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 2, //2>0  nodulesmodules里的模块将优先打包进vendor
        },
        commons: {
          name: 'commons', //async异步代码分割 initial同步代码分割 all同步异步分割都开启
          chunks: 'all',
          minSize: 30000, //字节 引入的文件大于30kb才进行分割
          priority: 0, //优先级，先打包到哪个组里面，值越大，优先级越高
        },
      },
      // cacheGroups: {
      //   // node_modules 中的直接加载的代码：
      //   nodeSrc: {
      //     name: 'nodeSrc',
      //     // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块。这可能会影响 chunk 的结果文件名。
      //     reuseExistingChunk: true,
      //     // 控制此缓存组选择的模块。省略它会选择所有模块。它可以匹配绝对模块资源路径或 chunk 名称。匹配 chunk 名称时，将选择 chunk 中的所有模块。
      //     test: /[\\/]node_modules[\\/]/,
      //     chunks: 'initial', // 指定为初始的 chunk
      //     // 一个模块可以属于多个缓存组。优化将优先考虑具有更高 priority（优先级）的缓存组。默认组的优先级为负，以允许自定义组获得更高的优先级（自定义组的默认值为 0）。
      //     priority: 3,
      //   },
      //   // node_modules 中的按需加载的代码：
      //   nodeAsync: {
      //     name: 'nodeAsync',
      //     reuseExistingChunk: true,
      //     test: /[\\/]node_modules[\\/]/,
      //     chunks: 'async', // 指定为按需加载的 chunk
      //     priority: 2,
      //   },
      //   // 项目中的直接加载的代码：
      //   commonSrc: {
      //     name: 'commonSrc',
      //     reuseExistingChunk: true,
      //     chunks: 'initial', // 指定为初始的 chunk
      //     priority: 1,
      //   },
      //   // 项目中的按需加载的代码：
      //   commonAsync: {
      //     name: 'commonAsync',
      //     reuseExistingChunk: true,
      //     chunks: 'async', // 指定为按需加载的 chunk
      //     priority: 0,
      //   },
      // },
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
                localIdentName: 'zhiqian-[path][name]-[local]-[hash:base64:5]',
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
                localIdentName: 'zhiqian-[path][name]-[local]-[hash:base64:5]',
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
      'process.env.ANALYZE': JSON.stringify('false'),
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

if (process.env.ANALYZE === 'true') {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
