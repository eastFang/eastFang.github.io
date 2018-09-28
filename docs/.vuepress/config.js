module.exports = {
  title: '秉殇',
  themeConfig: {
    sidebar: [
      {
        title: '工具',
        children: [
          ['/tools/md-usage', 'markdown语法'],
          ['/tools/window-mac', 'windows和mac差异'],
        ]
      },
      {
        title: 'js',
        children: [
          ['/js/reg', '正则'],
          ['/js/util', '工具'],
          ['/js/arithmetic', '算法'],
          ['/js/raw', '本质']
        ]
      },
      {
        title: '框架',
        children: [
          ['/frame/react', 'react']
        ]
      },
      {
        title: '其他',
        children: [
          ['/discovery/canvas', 'canvas'],
        ]
      }
    ]
  }
}