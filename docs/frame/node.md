## 发布npm包
- 需要一个npm账号
  - 两种方式
    - npm官网注册
    - npm adduser

- npm 账号登录
  - npm login --registry ${registry}
  - npm publish --registry ${registry}

- 包更新
  - npm version ${version}
  - npm publish --registry ${registry}