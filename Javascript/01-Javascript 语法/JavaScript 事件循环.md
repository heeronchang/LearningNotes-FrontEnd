# JavaScript 事件循环

事件循环 Event Loop。

## 事件循环的作用

事件循环为了协调事件、交互、网络请求、UI 渲染，使得主线程不会阻塞。

## Event Loop 包含两种

一种是基于 Browsing Context ，一种是基于 Worker ，两者的运行是独立的。即每一个 JavaScript 运行的”线程环境“都有一个
独立的 Event Loop ，每一个 Web Worker 也有一个独立的 Event Loop。

## 在 Event Loop 中，事件的调用和任务的调度方式


# 链接
[从event loop规范探究javaScript异步及浏览器更新渲染时机](https://github.com/aooy/blog/issues/5)