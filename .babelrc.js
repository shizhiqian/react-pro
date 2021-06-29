module.exports = {
  // babel的插件，会在preset之前执行，preset不支持的一些特性，就需要导入plugin了,plugin的顺序为从前至后
  plugins: [
    //
    // runtime不做语法的转换，它只能算是一个转换帮助类、一个自动添加polyfill的工具，提供沙箱垫片的方式来转换代码
    /*
    "@babel/plugin-transform-runtime"：
    抽离babel的一些公共工具类用来减少代码的大小
    启用插件 babel-plugin-transform-runtime 后，Babel 就会使用 babel-runtime 下的工具函数
     */
    '@babel/plugin-transform-runtime',
    // "@babel/plugin-proposal-object-rest-spread", // 扩展运算符
    // "@babel/plugin-syntax-dynamic-import", // 动态导入
    // ["@babel/plugin-proposal-decorators", { "legacy": true }],
    // "@babel/plugin-proposal-class-properties", // 转码class
    // "@babel/plugin-proposal-optional-chaining",
    // "@babel/plugin-proposal-nullish-coalescing-operator",
    // "react-loadable/babel",
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  /*
  presets：
  babel预设的一些转码规则集，我们不需要一个接一个地添加所有需要的插件，preset的顺序为从后至前
   */
  presets: [
    [
      /*
      @babel/preset-env:
      按需加载polyfill，主要对 JavaScript 最新的语法糖进行编译。
      它会根据你所配置的浏览器的列表，自动去加载当前浏览器所需要的插件，然后对es语法做转换。
      并不负责转译新增的 API 和全局对象，如：Promise,Iterator,Generator,Set,Maps,Proxy,Symbol 等全局对象，
      以及一些定义在全局对象的方法（比如 includes/Object.assign 等）。
       */
      '@babel/preset-env',
      {
        /*
        参考目标浏览器（browserslist） 和 代码中所使用到的特性来按需加入 polyfill
        缺点：这种方式打包体积不大，但是如果我们排除node_modules/目录，遇上没有经过转译的第三方包，
        就检测不到第三方包内部的 ‘hello‘.includes(‘h‘)这种句法，这时候我们就会遇到bug
         */
        useBuiltIns: 'usage',
        /*
        core-js支持两个版本，2或3，很多新特性已经不会加入到2里面了，比如: flat等等最新的方法，2这个版本里面都是没有的，
        所以建议用3
         */
        corejs: 3,
      },
    ],
    // 使用 react 项目时，需要使用此包配合转译,转换React jsx语法
    '@babel/preset-react', // 转码react
    //当你项目是用 TypeScript 编写时，需要使用此包配合转译
    '@babel/preset-typescript', // 转码ts
  ],
};
