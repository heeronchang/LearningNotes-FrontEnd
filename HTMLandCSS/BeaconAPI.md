# Beacon API

从一个页面向服务器端发送一些数据，并且不需要等待服务器端响应。例如在用户离开页面之前提交一些分析或诊断数据。

通常，在离开页面前发送数据需要监听页面的 unload 事件，但是 unload 事件回调函数中发出的请求必须是一个同步请求，因为大多数浏览器通常忽略 unload 事件回调函数中发出的异步请求。

而 Beacon API 就解决了这一问题。它允许在 unload 事件回调函数中发送携带少量数据的异步请求，它不会阻塞 unload 事件回调函数中的其它任何代码。

### Beacon API 使用方法

在 Beacon 中为 navigator 对象提供了一个 sendBeacon 方法，该方法将数据放入一个队列中，当前页面被关闭时将立即发送数据

```JavaScript
// url 接受数据的服务器地址（必须），data ArrayBufferView/Blob/FormData/字符串
navigator.sendBeacon(url, data);
```