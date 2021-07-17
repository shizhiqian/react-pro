# 从零开始使用webpack5.0构建react+antd项目
***
### 功能
- [x] Webpack5基础配置
- [x] 开发服务器配置
- [x] 抽取公共代码
- [x] Babel7
- [x] Css modules配置
- [x] Postcss配置
- [x] Eslint配置
- [x] Stylelint配置
- [x] Prettier配置
- [x] 支持less、css，hash格式命名样式
- [x] Husky，git commit钩子格式化代码
- [x] 构建bundle分析
- [x] 支持typescript
- [x] 支持Mock
- [x] React17
- [x] Hooks
- [x] React-router-dom
- [x] React-router-cache-route 缓存页面
- [x] 封装错误边界
- [x] @loadable/component按需加载路由
- [x] @rematch/core 替代Redux
- [x] @rematch/loading自动处理 loading 状态
- [x] Axios统一封装，如：拦截异常
- [x] Antd
- [x] 定制antd主题
- [x] ES6+
- [x] 布局：顶部导航、左侧菜单

### 实现过程
1. 在根目录初始化项目，自动生成`package.json`。
```
npm init -y
```
2. 在根目录初始化git，创建.gitignore忽略指定文件(node_modules等)。
```
git init
touch .gitignore
```
3. 在根目录创建.gitignore、push.sh、merge.sh、.editorconfig文件

4. 兼容 ES6+
```
# babel-loader：用于处理 ES6+ 语法，将其编译为浏览器可以执行的 js
# webpack
# webpack-cli: Webpack构建工具 - 4.0+版本webpack单独提取了这个npm包，打包时需要
# mockjs
# core-js: @babel/preset-env依赖core-js,代替babel-polyfill,使浏览器支持ES6+新功能
# react: react核心
# react-dom: react Dom操作工具库（render函数等）
# react-loadable: 代码分割按需加载插件
# react-redux: react与redux连接的桥梁，挂载组件，同步状态
# react-router-dom: react前端路由（现在的版本不再需要react-router）
# redux: redux核心 状态管理
# @rematch/core: redux中间件，按model划分，类似dva或vuex，但比dva轻量
# antd: 蚂蚁金服UI组件库
# axios: 封装了fetch的异步请求库
yarn add axios antd @rematch/core redux react-router-dom react-redux react-dom react-loadable react core-js webpack-cli webpack mockjs --dev
```

5. 在根目录创建webpack.dev.config.js
```
# html-webpack-plugin：Webpack插件 - 最终打包时自动生成index.html，并配置其类容
# dayjs: dayjs 替代 momentjs
# antd-dayjs-webpack-plugin：dayjs 替代 momentjs
# copy-webpack-plugin：用于直接复制public中的文件到打包的最终文件夹中
# happypack：Webpack插件 - 多线程编译，速度更快，开发环境用
# webpackbar：控制台美化webpack进度条
# eslint：代码规范检测器
# eslint-plugin-prettier：Eslint插件 - prettier风格的代码格式规范，配置eslint用
# eslint-plugin-react：Eslint插件 - 让Eslint支持检测JSX（.eslintrc22222.json中有配置）
# eslint-plugin-react-hooks：Eslint插件 - 让Eslint支持检测Hooks语法
# prettier：代码自动格式化插工具
# style-loader：Webpack解析器 - 用于提取重复的css代码加入到<style>标签里,适用devlopment环境
# css-loader：Webpack解析器 - 用于解析js中import的css，和css中url()的路径
# postcss:
# postcss-loader：Webpack解析器 - 用于进一步解析CSS，用来添加浏览器css兼容性代码
# postcss-preset-env：跟babel类似，把新css语法转换为旧css语法
# less：Less核心
# less-loader：Webpack解析器 - 解析Less,主要是解析antd的样式文件
# stylelint: http://stylelint.docschina.org/
# stylelint-order：指定事物的排序，例如声明块中的属性（插件包）。
# stylelint-prettier：将 Prettier 作为 stylelint 规则运行。
yarn add postcss-preset-env dayjs postcss autoprefixer less less-loader file-loader postcss-loader css-loader style-loader html-webpack-plugin antd-dayjs-webpack-plugin copy-webpack-plugin happypack webpackbar eslint eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks prettier --dev

```
6. 安装babel
```
Babel默认只转换新的 js 语法，而不转换新的API，如 Iterator、Generator、Set、Maps、Proxy、 Reflect、Symbol、Promise 等全局对象，以及一些在全局对象上的方法如 Object.assign都不会转码（如ES6在 Array 对象上新增了 Array.form 方法，Babel就不会转码这个方法，如果想让这个方法运行，必须使用babel-polyfill 、babel-runtime 、plugin-transform-runtime 等插件来转换）
# @babel/core：babel核心，编译ES6+新语法
# @babel/plugin-proposal-class-properties：Babel插件 - 用于让class类中支持定义箭头函数的语法
# @babel/plugin-proposal-decorators：Babel插件 - 支持修饰器语法 Decorator
# @babel/plugin-proposal-object-rest-spread：Babel插件 - 支持对象的扩展运算符
# @babel/plugin-syntax-dynamic-import：Babel插件 - 支持异步import语法，代码分割需要
# @babel/plugin-transform-runtime：Babel插件 - 所有的垫片函数将引用babel-runtime中的，避免重复编译.Porfill引入都是引入到全局的，如果是自己的项目没关系，但是如果是我们要编写一个工具库，就会造成当别人引用我们的库的时候，对他们的项目环境造成污染，因为profill目前我们是设置全局的。
# @babel/preset-env：Babel根据浏览器和运行时环境自动识别运用哪些垫片库来兼容ES6+语法
# @babel/preset-react：Babel支持react语法
# @babel/runtime：Babel运行时垫片库，提供了各种ES6的垫片，最终会自动编译为ES5
# @babel/plugin-proposal-nullish-coalescing-operator：支持“双问号”语法：a ?? b, 相当于： a ? a : b;
# @babel/plugin-proposal-optional-chaining：支持“可选链”语法： a.b?.c, 相当于： a.b ? a.b.c : undefined
# babel-plugin-import：Babel插件 - 按需加载，用于antd
# babel-eslint：适配babel ES6+的eslint规范插件
# babel-loader: Webpack解析器 - 解析JS ES6+ 新语法
yarn add babel-loader babel-eslint babel-plugin-import @babel/plugin-proposal-optional-chaining @babel/plugin-proposal-nullish-coalescing-operator @babel/preset-react @babel/runtime @babel/preset-env @babel/plugin-syntax-dynamic-import @babel/plugin-transform-runtime @babel/plugin-proposal-object-rest-spread @babel/core @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators --dev
```
7. 在根目录创建webpack.production.config.js
```
# terser-webpack-plugin: 对js进行压缩,Webpack插件 - 这个插件修复了很多错误，覆盖webpack内置的uglifyJS
# mini-css-extract-plugin: Webpack插件 - 打包时将CSS提取出来，而不是和js混在一起,区别是使用link标签作为独立的文件引入，适用production环境
# css-minimizer-webpack-plugin: 压缩css
# clean-webpack-plugin: 每次打包前清除旧的build文件夹
# favicons-webpack-plugin: 自动生成适配各终端得ico图标，pwa会用到部分

yarn add favicons favicons-webpack-plugin clean-webpack-plugin terser-webpack-plugin mini-css-extract-plugin css-minimizer-webpack-plugin --dev
```
8. 配置eslint
```
eslint --init
```

### 操作git
```bash
# 把当前分支提交到远程分支（当前和远程分支名称一样），例如：sh push.sh 新功能
sh push.sh 这里写描述（必须）

# 把当前分支合并到哪个分支，请确保当前分支已经提交，例如合并到master分支，例如：sh merge.sh master
sh merge.sh 分支名称（必须）
```
