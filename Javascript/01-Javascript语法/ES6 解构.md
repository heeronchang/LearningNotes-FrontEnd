# ES6 解构

## 关键词及规则：
**模式 表达式**
**
**解构赋值的规则是，只要等号右边不是对象，都会先将其转为对象。 **`**undefined**` 和 `null` 不能转为对象，对它们解构赋值会报错 `TypeError` 。
## 解构数组
```javascript
let [foo = true] = [];
foo // true
```
## 解构对象
```javascript
let { foo, bar } = { foo: 'aaa', bar: 'bbb' }
foo // 'aaa'
bar // 'bbb'
```
对象的解构赋值是下面形式的简写：
```javascript
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' }
foo // 'aaa'
bar // 'bbb'
```
也就是说，对象的解构赋值是先找到同名属性，然后再赋值给对应的变量。真正被赋值的是后者，而不是前者。
```javascript
let { foo: f, bar: b } = { foo: 'aaa', bar: 'bbb' }
f // 'aaa'
b // 'bbb'
foo // Uncaught ReferenceError: foo is not defined
```
## 解构字符串
字符串会被转成一个类似数组的对象。
```javascript
const [a, b, c, d, e] = 'hello'
a // 'h'
b // 'e'
c // 'l'
...
```
类似数组的对象都有一个 `length` 属性。
```javascript
let { length: len } = 'hello'
len // 5
```
## 解构数值和布尔值
数值和布尔值会先被转换成对象。
```javascript
let { toString: s } = 123
s === Number.prototype.toString // true
let { toString: s } = true
s === Boolean.prototype.toString // true
```
## 解构函数参数
```javascript
function add([x, y]) {
  return x + y
}
add([1, 2]) // 3
```
`add` 函数的参数表面上是一个数组，但是在传入参数的那一刻，数组参数就被解构成变量 `x` 和 `y` ，对于函数内部来说，它们能感受到的参数就是 `x` 和 `y` 。
解构函数参数也可以使用默认值：
```javascript
// 为 x，y 指定默认值
function move({x = 0, y = 0} = {}) {
  return [x, y]
}
move({x: 3, y: 8}) // [3, 8]
move({x: 3}) // [3, 0]
move({}) // [0, 0]
move() // [0, 0]

// 为函数的参数指定默认值
function move2({x, y} = {x: 0, y: 0}) {
  return [x, y]
}
move2({x: 3, y: 8}) // [3, 8]
move2({x: 3}) // [3, undefined]
move2({}) // [undefined, undefined]
move2() // [0, 0]
```
## 用途

1. 交换变量
```javascript
let x = 1;
let y = 2;
[x, y] = [y, x];
```

2. 从函数返回多个值
```javascript
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

3. 函数参数的定义
```javascript
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

4. 提取JSON数据
```javascript
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

5. 函数参数的默认值
```javascript
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```

6. 遍历 Map 结构
```javascript
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

7. 输入模块的指定方法
```javascript
const { SourceMapConsumer, SourceNode } = require("source-map");
```
## 其它
### 默认值生效的条件是，对象的属性值严格等于 `undefined` 。
```javascript
 const { x = 3 } = { x: undefined }
 x // 3
 const { y = 3 } = { y: null }
 y // null
```
### 解构赋值中使用圆括号的情况
解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没办法一开始就知道，必须解析到（或解析不到）等号才能知道。
由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不能使用圆括号。建议只要有可能就不要在模式中使用圆括号。
#### 不能使用圆括号的情况：

1. 变量声明语句
```javascript
// 全部报错
let [(a)] = [1]
let {x: (c)} = {}
let ({x: c}) = {}
let {(x: c)} = {}
let {(x): c} = {}
let {o: ({p: p})} = {o: {p:2}}
```

2. 函数参数
```javascript
// 报错
function f([(z)]) { return z }
// 报错
funtion f([z, (x)]) { return z }
```

3. 赋值语句的模式
```javascript
// 全部报错
({p: 1}) = { p: 41}
([a]) = [5]
[({p: a}), {x: c}] = [{}, {}]
```
#### 可以使用圆括号的情况
可以使用圆括号的情况只有一种：赋值语句的非模式部分。
```javascript
// 都正确
// 三个语句都是赋值语句，而不是声明语句，它们的圆括号都不是模式的一部分。
[(b)] = [3] // 模式是取数组的第一个成员，跟圆括号无关
({p: (d)} = {}) // 模式是 p, 而不是 d
[(parseInt.prop)] = [3] // 与第一行性质一致
```
## 参考资料
[ES6入门-变量的解构赋值-阮一峰](https://es6.ruanyifeng.com/#docs/destructuring)
