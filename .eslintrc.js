// https://blog.csdn.net/mafan121/article/details/77965252
module.exports = {
  // 默认情况下，所有环境变量都为false，且这些环境并不冲突，可以自由选择搭配。
  "env": {
    "browser": true, //启用浏览器全局变量。
    "commonjs": true,//CommonJS全局变量和CommonJS范围。
    "es6": true,// 启用ES6的功能。
    "node": true,
    "mocha": true//添加所有的摩卡测试全局变量。
  },
  // ESLint 默认使用Espree作为其解析器，你可以在配置文件中指定一个不同的解析器
  "parser": "babel-eslint",// babel-eslint一个对Babel解析器的包装，使其能够与 ESLint 兼容。
  // 配置解析器支持的语法，指定ECMAScript的版本、sourceType的类型
  "parserOptions": {
    "allowImportExportEverywhere": true,
    "ecmaFeatures": { // 指定要使用其他那些语言对象
      "impliedStrict": true, // 启用严格校验模式
      "jsx": true // 启用jsx语法
    },
    "ecmaVersion": 2018, // ES的版本，默认为5
    "sourceType": "module" //指定源代码存在的位置，设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
  },
  // 共享配置（extends）
  // eslint:all:表示引入当前版本eslint的所有核心规则。
  // 表示引入eslint的核心功能，并且报告一些常见的共同错误。
  // "extends": "eslint:recommended", 所有在https://eslint.bootcss.com/docs/rules/, 被标记为绿色对号的规则将会默认开启
  // "extends": "eslint:recommended",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended", // 这里会先继承 eslint:recommended 的配置]
    "prettier"
  ],
  // 插件名称可以省略 eslint-plugin- 前缀。
  "plugins": ["react", "react-hooks", "prettier"],
  "rules": {
    // 启用的规则及各自的错误级别
    // 'off' 或 0 - 关闭规则
    // 'warn' 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    // 'error' 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    // ['error', 'double'] 数组的第一项总是规则的严重程度（数字或字符串）。其他选项使用数组字面量指定它们
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    // 插件名/规则ID
    "react/jsx-uses-react": 2,
    "semi": ["error", "always"],
    "react/prop-types": 0 //防止在react组件定义中缺少props验证
  }
};

// 块注释来临时禁止规则出现警告
/* eslint-disable */
/* eslint-enable */

// 如果在整个文件范围内禁止规则出现警告，将 /* eslint-disable */ 块注释放在文件顶部
/* eslint-disable */

// 使用以下格式的行注释或块注释在某一特定的行上禁用所有规则
// eslint-disable-line
/* eslint-disable-line */
// eslint-disable-next-line
/* eslint-disable-next-line */
