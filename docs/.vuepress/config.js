module.exports = {
  title: '秉殇',
  themeConfig: {
    sidebar: [
      {
        title: '工具',
        children: [
          ['/tools/git-usage', 'git使用方法'],
          ['/tools/md-usage', 'markdown语法'],
          ['/tools/window-mac', 'windows和mac差异'],
        ]
      },
      {
        title: 'html',
        children: [
          ['/html/语义化', '语义化']
        ]
      },
      {
        title: 'css',
        children: [ 
          ['/css/伪元素', '伪元素'],
          ['/css/兼容性', '兼容性'],
          ['/css/flex布局', 'flex布局']
        ]
      },
      {
        title: 'js',
        children: [
          ['/js/正则', '正则'],
          ['/js/工具', '工具'],
          ['/js/算法', '算法'],
          ['/js/源码', '源码'],
          ['/js/规范', '规范'],
          ['/js/易错', '易错'],
          ['/js/API', 'API']
        ]
      },
      {
        title: 'ts',
        children: [
          ['/ts/语法', '语法']
        ]
      },
      {
        title: '框架',
        children: [
          ['/frame/react', 'react'],
          ['/frame/react-native', 'react-native'],
          ['/frame/vue', 'vue'],
          ['/frame/node', 'node'],
          ['/frame/wxapp', 'wxapp'],
          ['frame/cytoscape', 'cytoscape']
        ]
      },
      {
        title: '服务端',
        children: [
          ['/server/nginx', 'nginx']
        ]
      },
      {
        title: '其他',
        children: [
          ['/discovery/canvas', 'canvas'],
          ['/discovery/animation', 'animation']
        ]
      }
    ]
  }
}