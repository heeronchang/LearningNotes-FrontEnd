# Generator

## 理解 Generator

- 从语法上，它可以被理解称一个状态机，封装了多个内部状态。
- 执行 Generator 函数可以返回一个遍历器对象，因此它可以被称为遍历器生成函数，这个遍历器对象可以依次遍历 Generator 内部的每一个状态。
  
## yield 

yield 有暂停执行的意思。

yeild 使用注意点：
- yield 不能用在普通函数中
- yield 用在其它表达式中需要用小括号包起来

## next

yield 表达式本身没有返回值或返回值为 undefined。next 方法可以带一个参数，该参数作为上一个 yield 表达式的返回值。

由于 next 方法的参数表示上一个 yield 表达式的返回值，所以在第一次使用 next 方法时，传递参数是无效的。
V8 引擎直接忽略第一次调用 next 方法时的参数。

## Generator.prototype.throw()

Generator 函数返回的遍历器对象都有一个 throw 方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。

Generator 内没有 catch 语句时，则由外部的 catch 捕获。

非遍历器对象的 throw 方法抛出的异常，Generator 内部的 catch 不会捕获。

它的 throw 方法抛出来错误，要被内部捕获需要至少执行过一次 next 方法。

它的 throw 被捕获时，会附带执行下一条 yield 表达式，也就是附带执行一次 next 方法。

一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去，如果此后还调用 next 方法，
将返回一个 { value: undefined done: true } ， 即 JS 引擎认为这个 Generator 已经运行结束了。

## Generator.prototype.return

它返回给定的值，并且终结遍历 Generator 函数

如果 Generator 内部有 try...finally 代码块，且正在执行 try 代码块，那么 return 方法会推迟到 finally 代码块执行完再执行。

## next(), throw(), return() 的共同点

它们都能让 Generator 恢复执行，并且使用不同的语句替换 yield 表达式。

next() 是将 yield 表达式替换成一个值。

throw() 是将 yield 表达式替换成一个 throw 语句。

return() 是将 yield 表达式替换成一个 return 语句。

## yield*

默认情况下，在一个 Generator 内调用另一个 Generator 是不会有任何效果的。
需要用 yield* 来在一个 Generator 函数内执行另一个 Generator。

## Generator 函数的 this

Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，继承了 Generator 函数的 prototype 对象上的方法。

如果把 Generator 函数当作普通的构造函数并不会生效，因为它返回的总是遍历器对象，不是 this 对象。它不能与 new 关键词一起使用。

### 让 Generator 函数返回一个正常的实例对象，既可以调用 next() 方法，又可以获得正常的 this

```JavaScript
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
function F() {
  return gen.call(gen.prototype);
}
const f = new F();
f.next(); // Object {value: 2, done: false}
f.next(); // Object {value: 3, done: false}
f.next(); // Object {value: undefined, done: true}
f.a; // 1
f.b; // 2
f.c; // 3
```

## Generator 函数应用场景

1. 异步操作的同步化
2. 控制流程管理
3. 部署 iterator 接口
4. 作为数据结构

## 