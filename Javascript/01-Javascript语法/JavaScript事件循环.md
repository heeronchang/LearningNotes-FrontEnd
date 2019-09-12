# JavaScript 事件循环

事件循环 Event Loop。浏览器的 Event Loop 是在 HTML5 规范中定义。NodeJS 的 Event Loop 是基于 libuv 实现的。

## Event Loop 的作用

> Event Loop 为了协调事件、交互、网络请求、UI 渲染，使得主线程不会阻塞。

## Event Loop 包含两种

一种是基于 Browsing Context ，一种是基于 Worker ，两者的运行是独立的。即每一个 JavaScript 运行的”线程环境“都有一个
独立的 Event Loop ，每一个 Web Worker 也有一个独立的 Event Loop。

## 宏队列(macroTask)和微队列(microTask)

#### 宏队列
宏队列，macroTask, tasks 。
一些异步任务的回到函数会依次进入 macro task queue 中，等待后续被调用，这些异步任务包括：
- setTimeOut
- setInterval
- setImmediate(Node)
- requestAnimationFrame(Browser)
- I/O
- UI Rendering(Browser)

#### 微队列

微队列，microTask, jobs 。
还有一些异步任务的回调函数会依次进入 micro task queue 中，等待后续调用，这些异步任务包括：
- Process.next(Node)
- Promise
- Object.observe
- MutationObserver

## 浏览器 Event loop 调度流程

1. 同步执行全局 script 脚本，脚本可能包含异步语句和同步语句（如 setTimeout）此时会区分全局作用域中的 macroTask 和 microTask 代码，放入各自队列。
2. 全局 script 代码执行完毕后，调用栈 stack 会清空。
3. 每执行完一个 macroTask 紧接着会从 microTasks 中依次取出 microTask 放入调用栈执行。如此过程中产生的 microTask 会放入 microTasks 中，且在当前周期中执行。
4. microTasks 中所有任务执行完毕后，从 macroTasks 中取位于队首的 macroTask 放入调用栈执行。执行完毕后重复步骤 3 - 4 。

#### 调度流程图

<img src="../../images/eventLoop.jpg" alt="调度流程图" title="调度流程图" width="500" />


# 链接
[从event loop规范探究javaScript异步及浏览器更新渲染时机](https://github.com/aooy/blog/issues/5)
[带你彻底弄懂Event Loop](https://juejin.im/post/5b8f76675188255c7c653811)