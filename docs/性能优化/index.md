## 性能优化比较大，这里单开一个章节来看

### webpack打包优化
- DllPlugin && DllReferencePlugin

  - 借鉴了windows系统的动态链接库dll的思想
  - 将第三方库单独打包成一个文件，这个文件就是一个单纯的依赖库，不会跟着业务代码一起打包，只有当依赖自身版本变化时需要单独打包

- DllPlugin
  - 项目额外配置webpack.dll.config.js
```javascript
// 这里贴下最简单的配置
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    vendor: [
      'dayjs',
      'lodash'
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].dll.js', // 会生成vendor.dll.js文件
    library: '[name]_dll' // 暴露vendor_dll变量
  },

  plugins: [
    // 更多详细配置参考: https://webpack.docschina.org/plugins/dll-plugin/#root
    new webpack.DllPlugin({
      path: path.join(__dirname, 'manifest.json'), // 生成的manifest.json路径，给DllReferencePlugin使用，业务代码使用第三方库的映射文件
      name: '[name]_dll' // 对外暴露的第三方库引入函数
    })
  ]
}

// 生成的manifest.json
{
  "name": "vendor_dll",
  "content": {
    "./node_modules/dayjs/dayjs.min.js": {
      "id": "./node_modules/dayjs/dayjs.min.js",
      "buildMeta": {
        "providedExports": true
      }
    },
    "./node_modules/lodash/lodash.js": {
      "id": "./node_modules/lodash/lodash.js",
      "buildMeta": {
        "providedExports": true
      }
    }
  }
}
// 生成的vendor.dll.js文件, 需要在index.html引入该js
var vendor_dll = (function(modules) {
  return __webpack_require__(__webpack_require__.s = 0)
})({
  "./node_modules/dayjs/dayjs.min.js": (function() {
    // 。。。
  })
})
```

- DllReferencePlugin
  - webpack.config.js
```javascript
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: path.join(__dirname, '..', 'src/index.js'),

  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'main.js'
  },

  plugins: [
    // 更多配置参考：https://webpack.docschina.org/plugins/dll-plugin/#root
    new webpack.DllReferencePlugin({
      manifest: require('./manifest.json') // 上一步生成的manifest.json
    })
  ]
}

// 贴一下打包后main.js代码的片段
(function(modules) {
  // 省略
})({
  "./src/index.js": (function(module, __webpack_exports__, __webpack_require__) {
    eval("var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ \"./node_modules/dayjs/dayjs.min.js\")")
  }),
  "./node_modules/dayjs/dayjs.min.js": (function(module, exports, __webpack_require__) {
    // 获取dayjs的方式发生改变：从dll-reference vendor_dll获取
    eval("moudle.exports = (__webpack_require__('dll-reference vendor_dll))('./node_modules/dayjs/dayjs.min.js')")
  }),
  "dll-reference vendor_dll": (function(module) {
    eval("module.exports = vendor_dll")
  })
})
```

- 总结
1. DllPlugin将第三方库打包成一个文件(vendor.dll.js) 并暴露vendor_dll全局变量 和 manifest.json（库映射文件）
2. var vendor_dll = __webpack_require__(moduleId) {}
3. 业务代码引用第三方库时，调用vendor_dll函数获取库代码

### 图片

- JPG/JPEG
  - 特点：有损压缩、不支持透明
  - 适用场景：体积较大的图片用JPG/JPEG格式，在体积压缩能够减少到原来的50%的情况下，能够保证60%左右的图片质量是非常划算的

- PNG-8/PNG-24
  - 特点：无损压缩、支持透明、体积大
  - 8和24分别指的是二进制的位数,支持的颜色种类：PNG-8(256个)，PNG-24(1600多万个)

- SVG
  - 特点：不失真、体积小、文本文件、兼容性好

- base64
  - 特点
  - 适用场景

- webp
  - 特点
  - 适用场景  