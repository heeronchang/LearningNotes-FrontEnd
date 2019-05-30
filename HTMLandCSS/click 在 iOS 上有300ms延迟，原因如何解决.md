# 产生原因

苹果工程师为了让 iPhone 这种小屏幕手机能够访问只为大屏幕设备设计的网站时，safari 添加了双击缩放功能，
所以当用户点击一次时，Safari 并不能判断这次点击是不是双击中的第一次，所以 iOS Safari 就会等待 300 ms，
以判断用户是否会有下次点击，也就是这次操作是不是双击。

# 解决方案

1. 禁止缩放
``` HTML
<meta name="viewport" content="width=device-width, user-scalable=no">
```
2. 利用 FastClick
其原理是，检测到 touch 事件后，立即发出模拟 click 事件，并且把浏览器 300 ms 之后真正触发的事件给阻断