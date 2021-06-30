const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 动态生成html插件
const CopyPlugin = require('copy-webpack-plugin'); // 用于直接复制public中的文件到打包的最终文件夹中
const webpackbar = require('webpackbar'); // 控制台美化webpack进度条
const ESLintPlugin = require('eslint-webpack-plugin'); // 用于替代eslint-loader(eslint-loader已经废弃)

module.exports = {
  mode: 'development',
  target: 'web',
  stats: 'errors-only',
  entry: [
    './src/index.js', // 项目入口
  ],
  output: {
    path: path.resolve(__dirname, '/'), // 将打包好的文件放在此路径下，dev模式中，只会在内存中存在，不会真正的打包到此路径,要求值必须为绝对路径
    publicPath: '/', // 文件解析路径，index.html中引用的路径会被设置为相对于此路径,若publicPath的值以“/”开始，则代表此时publicPath是以当前页面的host name为基础路径的
    filename: 'bundle-[contenthash].js', // 编译后的文件名字
  },
  devtool: 'eval-source-map', // 报错的时候在控制台输出哪一行报错
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    host: 'localhost', // 监听IPV4上所有的地址，再根据端口找到不同的应用程序，比如我们监听0.0.0.0时，在同一个网段下的主机中，通过ip地址是可以访问的
    hot: true,
    port: 8083,
    open: true, // 编译成功时自动打开服务器
    compress: true, // 为静态文件开启gzip压缩
    historyApiFallback: true, // 只要返回的是404，一律返回index.html页面
    proxy: {
      '/api': {
        target: 'http://10.254.60.11:21102', // 测试
        // secure: true, // https的时候使用该参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '', // 路径重写，将api开头的全部替换成空字符串
        },
      },
    },
    client: {
      logging: 'info',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)?$/i,
        exclude: /node_modules/,
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
          'style-loader',
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
    new webpackbar(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      // 根据模板插入css/js等生成最终HTML
      filename: 'index.html', //生成的html存放路径，相对于 output.path
      favicon: './public/favicon.png', // 自动把根目录下的favicon.ico图片加入html
      template: './public/index.html', //html模板路径
      inject: true, // 是否将js放在body的末尾
      title: 'title33333333',
    }),
    // 拷贝public中的文件到最终打包文件夹里
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
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css'], //后缀名自动补全
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};
