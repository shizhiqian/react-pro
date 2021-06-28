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

4. 在根目录创建server.js，并安装依赖
```
# webpack
# webpack-cli: Webpack构建工具 - 4.0+版本webpack单独提取了这个npm包，打包时需要
# mockjs
# core-js: 代替babel-polyfill,使浏览器支持ES6+新功能
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
# eslint-loader：Webpack解析器 - 打包时检测代码规范时用
# eslint-plugin-prettier：Eslint插件 - prettier风格的代码格式规范，配置eslint用
# eslint-plugin-react：Eslint插件 - 让Eslint支持检测JSX（.eslintrc22222.json中有配置）
# eslint-plugin-react-hooks：Eslint插件 - 让Eslint支持检测Hooks语法
# prettier：代码自动格式化插工具
# style-loader：Webpack解析器 - 用于提取重复的css代码加入到<style>标签里
# css-loader：Webpack解析器 - 用于解析js中import的css，和css中url()的路径
# postcss:
# postcss-loader：Webpack解析器 - 用于进一步解析CSS，比如自动添加-webkit-前缀等
# postcss-preset-env：postCSS插件，自动添加CSS前缀等
# less：Less核心
# less-loader：Webpack解析器 - 解析Less,主要是解析antd的样式文件
# file-loader：Webpack解析器 - 解析各类文件时有用，图片音频等,处理它们的相对路径
yarn add postcss-preset-env dayjs postcss autoprefixer less less-loader file-loader postcss-loader css-loader style-loader html-webpack-plugin antd-dayjs-webpack-plugin copy-webpack-plugin happypack webpackbar eslint eslint-loader eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks prettier --dev

```
6. 安装babel
```
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
# mini-css-extract-plugin: Webpack插件 - 打包时将CSS提取出来，而不是和js混在一起
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
