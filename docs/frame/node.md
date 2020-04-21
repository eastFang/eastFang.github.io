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


<!-- 官网

- 准备用html css js 往上堆，考虑到后面的维护成本，特别是css，开发过程写样式就特别痛苦
  - .page-index .banner-wrapper .banner
  - webpack 打包scss, js
  ...
  - 写html的时候，碰到了问题，每个页面的header footer部分都要copy一份
    - handlebars-loader
    - {{> path/to/hbs}}
  ...
- 小的图标用了iconfont, head 中 link iconfont cdn path; 新增图标，每个页面引入的cdn路径都要修改&& 考虑到后面要对接后端，想把服务端渲染在前端这边可以控制
  - koa koa-router, koa-views, node-fetch
  - 
  - node层发起请求，调用后端接口，给页面吐出返回数据，利用handlebars模版引擎编译成html返回给前端；
  
  - 服务端handlebars可以自定义helper： partial inject 内置partials > 实现了现在的效果；公共head，ceiling, footer, ;只需要写页面的差异化内容
  
  - node层mock接口，类似新闻列表这种接口
  - 
  - 自定义handlebars helper
  
  - 本地开发的时候，nodemon热更新重启端口


- 额外的一些
  - 性能
    - 第一版几乎没考虑什么性能问题，图片懒加载，gzip 什么都没搞，第一版上线，各种卡。。。
      - 图片懒加载
      - nginx gzip开启
      - iconfont小图标代替图片（待设计研究出来怎么搞...目前用的是iconfont搜索的一些）
  - postcss-loader autoprefix
    - 自动补全属性前缀太难受...有插件还是用插件
  - 渐变字体
    - svg
    - css
    - background-image 渐变背景色;
    - background-clip: text; 
    - color: transparent
  - scp 本地拷贝到服务器上（不采纳，紧急处理用的）
    - 生产环境服务器内存吃紧，webpack无法跑...
  - pm2 启动 node实例
    - 如果以后有并发问题，可以利用pm2启多个实例
    - nginx -->

  
  

  