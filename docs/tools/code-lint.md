## vue项目

- vscode 安装插件 eslint + prettier + EditorConfig

- 项目安装几个npm包：babel-eslint、eslint、eslint-config-prettier、eslint-loader、eslint-plugin-prettier、eslint-plugin-vue、prettier、husky、lint-staged

- 项目根目录下
```javascript
// .vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": false
}
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended', // eslint默认规则详见：https://eslint.org/docs/rules
    'plugin:vue/recommended', // eslint-plugin-vue默认规则详见：https://eslint.vuejs.org/rules/
    'plugin:prettier/recommended' // 详见：https://prettier.io/docs/en/integrating-with-linters.html
  ],
  // add your custom rules here
  rules: {
    'prettier/prettier': 'error'
  }
}
// .eslintignore
/static/**/*.js
```

#### husky + lint-staged 做最后防护，如果存在未校验通过的代码，本地git commit 会抛错
```javascript
// package.json配置
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "**/*.{js,vue}": [
    "eslint",
    "git add"
  ]
}
```

### QA
Q: 为什么prettier

A: prettier很强势，不管你的代码是什么样子，必须按照我的格式来, 例如：
```javascript
// 原始代码
const { userName, userAge, userAvatar } = userInfo

// eslint转换后，各种稀奇古怪的代码样式都可以通过eslint校验，👇
const {
  userName,
userAge,
   userAvatar,
} = userInfo
// prettier转换后, 只有这一种 👇可以通过校验
const {
  userName,
  userAge,
  userAvatar,
} = userInfo
```

Q: 这几个npm包有啥用.

A:
```javascript
- eslint-plugin-prettier：eslint启用prettier校验预代码样式,专注代码质量检测
- eslint-plugin-vue：集成了一些vue的校验规则
- eslint-config-prettier：解决一些与prettier冲突的规则
```


### 这里推荐下我自己的一个最佳实践
```javascript
"babel-eslint": "^8.2.1",
"eslint": "6.1.0",
"eslint-config-prettier": "^6.10.1",
"eslint-friendly-formatter": "^4.0.1",
"eslint-loader": "^4.0.0",
"eslint-plugin-prettier": "^3.1.3",
"eslint-plugin-vue": "^6.2.2",
"prettier": "1.14.3",
"husky": "^3.1.0",
"lint-staged": "^10.1.3"
```