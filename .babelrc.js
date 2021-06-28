module.exports = {
  // 我们不需要一个接一个地添加所有需要的插件，我们可以使用一个 "preset" （即一组预先设定的插件）。
  "presets": [
    // 主要对 JavaScript 最新的语法糖进行编译，并不负责转译新增的 API 和全局对象。
    // 而 Promise,Iterator,Generator,Set,Maps,Proxy,Symbol 等全局对象，
    // 以及一些定义在全局对象的方法（比如 includes/Object.assign 等）并不能被编译。
    // babel7.0后添加了preset-env，它会根据你所配置的浏览器的列表，自动的去加载当前浏览器所需要的插件，然后对es语法做转换。
    "@babel/preset-env",
    // 使用 react 项目时，需要使用此包配合转译,转换React jsx语法
    "@babel/preset-react",
    //当你项目是用 TypeScript 编写时，需要使用此包配合转译
    // "@babel/preset-typescript"
  ],
  "plugins": [
    // 抽离babel的一些公共工具类用来减少代码的大小
    // runtime不做语法的转换，它只能算是一个转换帮助类、一个自动添加polyfill的工具，
    "@babel/plugin-transform-runtime",
    // "@babel/plugin-proposal-object-rest-spread",
    // "@babel/plugin-syntax-dynamic-import",
    // ["@babel/plugin-proposal-decorators", { "legacy": true }],
    // "@babel/plugin-proposal-class-properties",
    // "@babel/plugin-proposal-optional-chaining",
    // "@babel/plugin-proposal-nullish-coalescing-operator",
    // "react-loadable/babel",
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
