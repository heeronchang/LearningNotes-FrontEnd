# 使用 WebWorks 处理线程

### 基本操作与线程进行数据交互

一个 Worker 对象实际就是一个后台运行线程。

```javascript
// 将需要在后台执行的脚本文件的 URL 地址作为参数，创建 Worker 对象。注意后台线程不能访问页面或窗口，所以在后在执行的脚本文件不能使用 window 或 document 对象。
const worker = new Worker("worker.js");

// 获取后台线程中的消息
worker.onmessage = function(event) {
  // ..
}

// 向后台线程发送消息 message 可以是文本、JSON 字符串
worker.postMessage(message);

// work.js 文件
onmessage = function(event) {
  // do something
  postMessage('rs');
}
```

### 线程嵌套

注意在子线程发送消息后，如果该子线程不再使用，最好使用 `close();` 关闭子线程。

### 线程中可用的变量函数和类

- self: 表示本线程范围内的作用域
- postMessage(message): 用于向创建线程的源窗口发送数据
- onmessage: 获取接收消息的事件句柄
- importScripts(urls): 导入其它 JavaScript 脚本文件，可以导入多个：`importScripts('script1.js', 'scripts/script2.js')`。必须在同一个域中
- navigator: 与 window.navigator 对象类似，具有 appName、platform、userAgent、appVersion。
- sessionStorage/localStorage: 可以在线程中使用 Web Storage
- XMLHttpRequest: 在线程中处理 AJAX 请求
- Web Workers: 在线程中嵌套线程
- setTimeout()/setInterval(): 在线程中实现定时处理
- close: 结束本线程
- eval(),isNan(),escape()等: 可以使用 JS 中所有核心函数
- object: 可以创建和使用本地对象
- WebSockets: 可以使用 WebSockets API 向服务器发送和接收数据
- FileSystem: 可以在线程中通过同步 FileSystem API 实现受沙箱保护的文件系统中的文件及目录的创建、更新和删除操作

### SharedWorker

SharedWorker 可以让多个页面共用一个后台线程。
```javascript
// url 用于指定后台脚本文件的地址，[name] 可选参数，用于指定 worker 的名称
const worker = new SharedWorker(url, [name]);
```
#### 页面通信

当 SharedWorker 对象被创建时，一个 MessagePort 对象也同时被创建，可以通过 SharedWorker 对象的 port 属性值来访问该对象，该对象代表页面通信时需要使用的端口：
- postMessage
- start：用于激活端口，开始监听端口是否接收到消息
- close：用于关闭并停用端口

```Javascript
const worker = new SharedWorker('script1.js');
const port = worker.port;
port.postMessage(message);
port.onmessage = function(event) {}
port.addEventListener('message', function() {}, false);
port.start();
```
当后台线程开始通信时会触发 connect 事件

```JavaScript
onconnect = function(event) {
  // event 对象中的 ports 属性是一个集合
  console.log(event.ports);
}
```