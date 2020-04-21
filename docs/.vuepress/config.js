// module.exports = {
//   title: '秉殇',
//   themeConfig: {
//     sidebar: [
//       {
//         title: '工具',
//         children: [
//           ['/tools/git-usage', 'git'],
//         ]
//       },
//       {
//         title: 'css',
//         children: [ 
//           ['/css/兼容性', '兼容性'],
//         ]
//       },
//       {
//         title: 'js',
//         children: [
//           ['/js/正则', '正则'],
//           ['/js/工具', '工具'],
//           // ['/js/算法', '算法'],
//           // ['/js/源码', '源码'],
//           // ['/js/规范', '规范'],
//           ['/js/易错', '易错'],
//           ['/js/API', 'API'],
//           ['/js/设计模式', '设计模式']
//         ]
//       },
//       {
//         title: 'ts',
//         children: [
//           ['/ts/语法', '语法']
//         ]
//       },
//       {
//         title: '框架',
//         children: [
//           // ['/frame/react', 'react'],
//           // ['/frame/react-native', 'react-native'],
//           // ['/frame/vue', 'vue'],
//           // ['/frame/node', 'node'],
//           // ['/frame/wxapp', 'wxapp'],
//           // ['frame/cytoscape', 'cytoscape']
//         ]
//       },
//       {
//         title: '服务端',
//         children: [
//           ['/server/nginx', 'nginx']
//         ]
//       },
//       {
//         title: '其他',
//         children: [
//           // ['/discovery/canvas', 'canvas']
//         ]
//       }
//     ]
//   }
// }
module.exports = {
  title: 'bs的八度空间',
  themeConfig: {
    sidebar: [
      {
        title: '工具',
        children: [
          ['/tools/git-more', 'git'],
          ['/tools/code-lint', 'lint']
        ]
      }
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@images': '../../images'
      }
    }
  }
}