### 应用场景
移动端h5（下面简称h5）video元素不会默认展示视频的第一帧，因为h5不会默认去加载视频

### 解决思路
[mdn参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Using_images)
mdn上有一句话, canvas中有个API-drawImage: 用一个HTML的 video元素作为你的图片源，可以从视频中抓取当前帧作为一个图像

### 解决方案
```javascript
// 获取视频首帧，以下是完整代码
/**
 * 根据video获取首帧，用canvas绘画出来
 * canvas => base64
 * base64 => File对象
 *   1. base64解码
 *   2. 将解码后的字符format unit8Array
 */
function getFirstFrameFile(videoSrc) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.src = videoSrc
    video.setAttribute('preload', 'auto') // !!! 必须设置
    
    video.addEventListener('loadeddata', () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = video.videoWidth // 获取video的宽度
      canvas.height = video.videoHeight // 获取video的高度
      ctx.drawImage(video, 0, 0)
      
      const base64Url = canvas.toDataURL('image/png') // 将canvas转化为base64

      resolve(this.base64UrltoFile(base64Url))
    })
  })
}

function base64UrltoFile(base64Url) {
  const arr = base64Url.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = arr[1]

  const dbstr = window.atob(bstr) // 解码base64字符串
  let n = dbstr.length
  const uint8Array = new Uint8Array(n)

  let i = 0
  while(i < n) {
    uint8Array[i] = dbstr.charCodeAt(i) // 将字符串转为code值，塞入unit8array
    i++
  }

  return new File([uint8Array], 'xxx.png', { type: mime })
}
```