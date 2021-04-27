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
          ['/bottom/vue', 'vue'],
          ['/bottom/http', 'http']
        ]
      },
      {
        title: 'igdl',
        children: [
          ['/igdl/bf', 'bf']
        ]
      },
      {
        title: 'js',
        children: [
          ['/js/es6', 'es6'],
          ['/js/js运行三部曲', 'js运行三部曲']
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