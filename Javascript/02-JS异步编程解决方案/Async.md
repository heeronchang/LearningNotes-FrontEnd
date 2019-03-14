# Async 学习

## async 函数是什么

async 函数就是 Generator 函数的语法糖。

```javascript
// Generator
const gen = function *() {
  const f1 = yield readFile('file1');
  const f2 = yield readFile('file2');
  console.log(f1.toString());
  console.log(f2.toString());
}

// async
const asyncFunc = async function() {
  const f1 = await readFile('file1');
  const f2 = await readFile('file2');
  console.log(f1.toDateString());
  console.log(f2.toDateString());
}
```
`async` 函数就是将 Generator 函数的星号 `*` 替换成 `async`，`yield` 替换成 `await`。

## async 函数的优点

async 函数相对于 Generator 的改进：
1. 内置执行器：Generator 函数的执行必须靠执行库，所以才有了 co 函数库，而 async 函数自带执行器。
也就是说 async 函数和普通函数一样。`const result = asyncfunc();`
2. 更好的语义：async 和 await，比起 * 和 yield 语义更清楚。async 表示函数里有异步操作，await 表示紧跟
在后面的表达式需要等待结果。
3. 更广的适用性：co 函数库约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令
后面，可以跟 Promise 对象和原始类型的值（数值，字符串，布尔值，此时等同于同步操作）。

## async 函数的实现

async 函数的实现就是将 Generator 函数和自动执行器包装在一个函数里。

```javascript
async function fn(args) {
  // ...
}

// 等同于
function fn(args) {
  return spawn(function*() {
    // ...
  });
}
```
所有 async 函数都可以写成上面第二种形式，其中 spawn 函数是自动执行器。
ayncs 属于 ES7，可以使用 Babel 转码器转码。

## async 函数的用法

同 Generator 函数一样， async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。

```javascript
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('google').then(function (result) {
  console.log(result);
})
```
调用函数时会立即返回一个 Promise 对象。

## 注意点

async 命令后面的 Promise 对象，运行结果可能是 rejected， 所以最好把 await 命令放在 try...catch 代码块中。
```javascript
async function foo() {
  try {
    await readFile('file');
  }
  catch(err) {
    console.log(err);
  }
}

// 另一种写法
async function bar() {
  await readFile('file').catch(function(error){
    console.log(error);
  });
}
```
await 命令只能用在 async 函数中，用在普通函数中会报错。
forEach 方法参数中使用 async 方法也会报错
```javascript
// 报错 因为这时三个 db.post 操作将是并发执行，而不是继发执行。
async function dbFunc(db) {
  let docs = [{}, {}, {}];
  docs.forEach(async function(doc) {
    await db.post(doc);
  });
}

// 正确
async function dbFunc(db) {
  let docs = [{}, {}, {}];
  for (let doc of docs) {
    db.post(doc);
  }
}
```

如果要使多个请求并发执行,可以使用 Promise.all()
```javascript
async function dbFunc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}

// or
async function dbFunc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}
```
