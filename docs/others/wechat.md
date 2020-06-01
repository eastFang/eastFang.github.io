### 微信分享：node作为服务端微信签名

### 需求背景
- 之前有个h5活动页的开发，后端大佬们他们那边只需要提供下微信签名的接口，所以前端团队这边就决定自己用node层作为服务端做掉了

- [微信官方文档链接](https://developers.weixin.qq.com/doc/) => 进入公众号开发 => 左侧菜单栏进入[微信网页开发](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)

### 客户端
根据JS SDK的步骤指引，完成前3步；这里不再赘述；这里有几个需要注意的点
- appSecret需要超管生成，生成后需要保存
- 需要配置jsApiList

### 服务端

- 几个核心的包 koa + koa-router + sha1

- 直接看JSSDK使用步骤的第三步wx.config配置需要签名相关的数据，下面介绍获取签名的步骤(微信的官方文档更加详细，我这边列出了大概的步骤; [原文](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62))
  - 获取access_token [微信open api接口](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html)

  - 根据access_token获取jsapi_ticket [微信open api接口](https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi)

  - access_token和jsapi_ticket需要缓存，原因是jsapi_ticket有调用次数限制，并且也有时效性，没有必要实时获取

  - 获取签名  
  ```javascript
  // 参数顺序必须严格按照这个
  str = jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}
  signature = sha1(str)

  // jsapi_ticket： 上面获取的
  // noncestr: 随机字符串
  // timestamp: Date.parse(new Date())) / 1000 注意：这里是秒时间戳，不是毫秒时间戳
  // url: domain + '/' (domain:步骤一中公众号后台绑定的域名；或者客户端传过来: location.href.split('#')[0]，这样可以保证域名后面有个'/')  
  ```

### 说明
- 服务端签名的url参数，我之前是在服务单写死的域名，尾部缺少'/'，导致签名一直错误
- 调用微信open api,需要借助node内置库https(不是http)，否则会一直抛 'socket hangup'
- 本地开发访问的域名需要与线上的域名保持一致, 可以用nginx + 绑hosts的方式
- 具体开发的时候，建议参考微信官方文档，更详细些而且后续sdk升级，一些配置也会变，本文记录的是一些大概的实现和遇到的几个坑