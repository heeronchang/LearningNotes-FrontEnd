# 浏览器输入 URL 后发生了什么

## DNS 解析过程

迭代查询/递归查询

本地域名服务器 --> 根域名服务器 --> 顶级域名服务器 --> 权威域名服务器

## HTTP 请求

1. 建立连接
2. 发送 HTTP 请求
3. 返回 HTTP 响应
4. 维持连接
5. 断开连接
   
## 浏览器解析过程

Chrome 为例：

Chrome 是基于开源的 Chromium 项目，Chromium 内核是基于 Webkit 的 Blink 内核和 JavaScript 的 V8 引擎。

Chrominum 是多进程多线程架构：
- 一个 Browser 进程
- 多个 Renderer 进程
- 一个 CPU 进程
- 多个 NPAI Render 进程
- 多个 Pepper Plugin 进程

### 主流程

页面解析工作是在 Renderer 进程中进行的，Renderer 通过在主线程中持有的 Blink 实例边接收边解析 HTML 内容，
每次从网络缓存区中读取 8k 以内的数据。
浏览器自上而下逐行解析 HTML 内容，通过语法、词法分析构建 DOM 树。

遇到 CSS 外部链时，主线程调用网络请求模块异步获取资源，不阻塞而继续构建 DOM 树。CSS 下载完毕后，主线程在合适的时机解析 CSS 内容，构建CSSOM 树。浏览器结合 DOM 树和 CSSOM 树构建 Render 树，计算布局属性等，绘制展示到屏幕上。

遇到 JS 外部链时，主线程调用网络请求模块异步请求资源，由于 JS 可能会修改 DOM 树和 CSSOM 树而造成回流重绘，
此时 DOM 书等构建是处于阻塞状态的。但主线程并不会挂起，浏览器会使用一个轻量级的扫描器扫描需要下载的后续资源，
脚本内的代码不会在此时执行。JS 下载完毕后，浏览器调用 V8 引擎 在 Script Streamer 线程中解析，编译 JS 内容，
并在主线程中执行。

### 渲染流程

DOM 树构建完毕后还要经过多次转换。

首先，布局计算，绘图样式，转换为 RenderObject 树（Render树）。再转换为 RenderLayer 树，
如果 RenderObject 拥有同一个坐标系（canvas，absolute）时，它们会合并成一个 RenderLayer，这一步由 CPU 负责。
接着转换为 GraphicsLayer 树，当 RenderLayer 满足合成条件（比如 transform，硬件加速）时，
会有自己的 GraphicsLayer，否则，与父节点合并，这一步由 CPU 负责。最后，由 GraphicLayer 的 GraphicsContext 对象，
负责把图层绘制成位图，作为纹理上传到 GPU，由 GPU 负责合成多个纹理，最终显示在屏幕上。

为了提升渲染性能，浏览器会有专用的 Compositor 线程负责 层合成，同时负责处理部分交互事件（如滚动、触摸），
直接响应 UI 更新而不阻塞主线程。主线程把 RenderLayer 同步给 Compositor 线程，Compositor 开启多个 Rasterizer 线程，
进行光栅化处理。

### 页面生命周期

Navigation timing 和 Resource Timing 记录每个资源的事件发生时间点。

DOMContentLoaded 表示 DOM 树构建完毕，可以安全的访问 DOM 树所有 Node 节点、绑定事件等。

load 表示所有资源加载完毕，图片、背景、内容已经渲染完毕，页面可以进行交互。

Chrome68 之后提供 Page lifecycle API 定义了全新的浏览器生命周期。


## [浏览器输入 URL 后发生了什么？](https://zhuanlan.zhihu.com/p/43369093)