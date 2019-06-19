# Promise 学习

## 概述

Promise 是异步编程的一种解决方案。ES6 中新增的一个 API，为了解决回调地狱问题。
Promise 是一个容器，里面存放着某个未来才会结束的事件（通常是一个异步操作）。语法上讲，它是一个对象，从它可以获取异步操作的消息。

Promise 对象的两个特点：
1. 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态： `pending`（进行中）、`fulfilled`（已成功）和 `rejected`（已失败）。只有异步操作的结果可以决定当前是哪一种状态，任何其它操作都无法改变这个状态。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 状态改变只有两种可能：从 `pending` 到 `fulfilled` 和从 `pending` 到 `rejected`。只要这两种情况发生，状态就不会再改变，一直保持这个结果，称为 `resolved`（已定型），此时再给 Promise 添加回调函数，也会立即得到这个结果，这点与事件不同，事件的特点是如果错过了它，再去监听是得不到结果的。

Promise 的缺点：
1. 无法取消 Promise。一旦创建，它就会立即执行，无法中途取消。
2. 如果不设置回调函数，Promise 内部抛出的错误不会反应到外部。
3. 当处于 `pending` 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
4. Promise 的最大问题是代码冗余，原来的任务被Promise 包装了一下，不管什么操作，一眼看去都是一堆 then，
原来的语义变得很不清楚。

如果某些事件不断地重复发生，一般来说，使用 [Stream](https://nodejs.org/api/stream.html) 模式是比 Promise 更好的选择。

## 基本使用

ES6 规定 Promise 对象是一个构造函数，用来生成 Promise 实例。

```javascript
const promise = new Promise(function(resolve, reject) {
  // ...

  if (/* 异步操作完成 */) {
    resolve(value);
  } else {
    reject(error);
  }
})
```

Promise 的两个参数 `resolve`、`reject` 是有 JavaScript 引擎提供，不用自己部署。

`resolve` 函数的作用是将 Promise 对象的状态从 `pending` 改为 `resolved`，在异步操作成功时调用，将异步操作的结果作为参数传递出去；`reject` 函数的作用是将 Promise 对象的状态从 `pending` 改为 `rejected`，在异步操作失败时调用，并将异步操作报出的错误作为参数传递出去。

Promise 实例生成以后，用 `then` 方法指定 `resolved` 状态和 `rejected` 状态的回调函数。

```JavaScript
promise.then(function(value){
  // success
}, function(error){
  // failure
})
```

## Promise 的方法
- `Promise.prototype.then()` `then` 方法是定义在原型对象上的，Promise 实例状态改变时的回调函数。
- `Promise.prototype.catch()` `catch` 方法是 `.then(null, rejection)` 或 `.then(undefined, rejection)` 的别名，用于指定发送错误的回调函数。
- `Promise.prototype.finally()` `finally` 方法用于指定不管 Promise 对象状态如何，都会执行的操作。该方法是 ES2018 引入标准。
- `Promise.all()` 方法用于将多个 Promise 实例包装成一个新的 Promise 实例。参数接受数组或者具有 `Iterator` 接口，且返回的每个成员都是 Promise 实例。数组中所有 Promise 状态都变成 `fulfilled` 时，`Promise.all()` 状态才会变成 `fulfilled`， 数组中有一个状态变成 `rejected`，`Promise.all()` 状态就会变成 `rejected`，此时，第一个被 reject 的实例的返回值传递给 `Promise.all()` 的回调函数。
- `Promise.race()` 方法同样是将多个 Promise 实例包装成一个新的实例。接受的参数和 `Promise.all()` 一样，不同的是，`Promise.race()` 会把数组中最先改变的状态的 Promise 实例的返回值传递给它的回调函数。
- `Promise.reslove()` 将现有对象转为 Promise 对象。如果参数是 Promise 对象，直接返回该对象；如果参数是一个 thenable 对象（具有then方法的对象），会将这个对象转为 Promise 对象，然后立即执行 thenable 对象的 then 方法；如果参数不是具有 then 方法的对象或者就不是对象，是一个原始值，`Promse.resolve()` 方法返回一个新的 Promise 对象，状态为 `resolved`；如果 `Promise.resolve()` 没有参数，直接返回一个 `resolved` 状态的 Promise 对象，需要注意的是，立即 resolve 的 Promise 对象，是在本轮事件循环的结束时，而不是在下一轮事件循环的开始时；
- `Promise.reject()` 方法也会返回一个 Promise 实例，状态为 `rejected`，和 `Promise.resolve` 方法不同的是，`Promise.reject()` 方法的参数会原封不动的作为 reject 的理由返回，变成后续方法的参数。
  

- `Promise.try()` 
