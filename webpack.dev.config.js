const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpackbar = require('webpackbar');
const ESLintPlugin = require('eslint-webpack-plugin');

const modifyVars = {
  'primary-color': '#25b864',
};

module.exports = {
  mode: 'development',
  target: 'web',
  stats: 'errors-only',
  entry: [
    './src/index.tsx', // 项目入口
  ],
  output: {
    path: path.resolve(__dirname, '/'),
    publicPath: '/',
    filename: 'bundle-[contenthash].js',
  },
  cache: {
    type: 'memory',
  },
  devtool: 'eval-source-map',
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
    splitChunks: {
      chunks: 'all',
    },
    // runtimeChunk: "single",
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: "vendors",
    //       chunks: "all",
    //     },
    //   },
    // },
  },
  devServer: {
    host: 'localhost',
    hot: true,
    port: 10100,
    open: true,
    compress: true,
    historyApiFallback: true,
    client: {
      logging: 'error',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:9083',
        // secure: true, // https的时候使用该参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '/api', // 路径重写，将api开头的全部替换为值
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true },
          },
        ],
      },
      // 专门处理antd等组件等样式
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars,
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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.css$/,
        exclude: ['/node_modules/', path.resolve(__dirname, 'src/assets/font')],
        use: [
          'style-loader',
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
        include: path.resolve(__dirname, 'src'),
        use: [
          'style-loader',
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
                modifyVars,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'static/[name].[hash:6][ext]',
        },
      },
    ],
  },
  plugins: [
    new webpackbar(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // 如果在src目录下使用process.env.NODE_ENV，必须先在下面定义
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', //生成的html存放路径，相对于 output.path
      favicon: './public/favicon.png', // 自动把根目录下的favicon.ico图片加入html
      template: './public/index.html', //html模板路径
      inject: true, // 是否将js放在body的末尾
      title: '225title33333333',
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
    new ESLintPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};
