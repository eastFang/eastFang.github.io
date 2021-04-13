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
      },
      {
        title: '进阶',
        children: [
          ['/bottom/js-engine', 'js-engine'],
          ['/bottom/vue', 'vue']
        ]
      },
      {
        title: 'igdl',
        children: [
          ['/igdl/bf', 'bf']
        ]
      },
      {
        title: '其他',
        children: [
          ['/others/wechat', '微信分享'],
          ['/others/videoFirstFrame', '获取视频第一帧']
        ]
      },
      {
        title: 'vue',
        children: [
          ['/vue/vue3', 'vue3']
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