# JavaScript 基础

#### 自调用函数

```JavaScript
(function(形参) {
  console.log('嘤嘤');
})(实参);
```

可以使用自调用函数把局部变量转换为全局变量，在内部把变量给 Window 对象。

## 函数

#### 方法中 this 指向

普通函数和定时器中的 `this` 都是指向 `window。`
对象.方法/原型对象中方法/构造函数中的 `this` 指向当前实例对象。


**严格模式下** 会把函数看作方法。
严格模式下，以函数方式(`foo();`)调用的普通函数中的 this 为 `undefined`。以方法方式（`window.foo();`）调用普通函数中的 `this` 依然是 `window`。


#### 函数也是对象，对像不一定是函数

函数中有 `prototype` 是对象。
对象中有 `__proto__` 是对象，但是对象中可能没有 `prototype`。

所有的函数实际上都是通过 `Function` 的构造函数创建的实例对象。

```JavaScript
let foo = new Function('num1', 'num2', 'return num1 + num2');
```

#### 数组中函数的调用

首先，数组中可以存储任何类型的数据。

```JavaScript
const arr = [];
arr.forEach(function (ele) {
  ele();
});
```

## 正在表达式

#### 验证身份证

## 作用域、作用域链和预解析

局部作用域和全局作用域。

作用域链是指从里到外层层搜索变量。

预解析就是变量声明、函数声明的提升。

## attr 和 prop 区别

- attr 访问的是元素属性
- prop 访问的是元素对应的 DOM 对象的属性

## 富文本编辑器插件

- UEditor
- CKEditor

实现原理：`document.contentEditable = true;` `document.execCommand()`

`execCommand` 有三个参数：
1. Comand Name - 命令名称；
2. ShowDefaultUI - 未实现，一般设置为 false；
3. ValueArguments - 命令的参数。可以设置为 null，但当要设置一行文本的标签时（h1,h2,p)等，
		需要使用 formatBlock 命令，并把标签放到 ValueArgument 中。

## Object

### create()

创建一个新对象，使用现有对象作为 __proto__。

```javascript
Object.create(proto, [propertiesObject])
```
- propertiesObject: 要添加新对象的可枚举属性（其自身定义的属性，而不是其原型链上
的枚举属性）对象的属性描述以及相应的属性名称。如果参数不是 null 或一个对象，
则抛出异常 TypeError。

### entries()

返回一个给定对象自身可枚举属性的键值对数组。其排列与 for...in 循环遍历该对象时返回的
顺序一致（区别在于 for...in 循环也枚举原型链中的属性）。

```JavaScript
Object.entries(obj);
```
**将 Object 转换为 Map**

new Map() 构造函数接受一个可迭代的 entries。
```javascript
const obj = { foo: "bar", baz: 42 };
const map = new Map(Object.entries(obj)); // Map { foo: "bar", baz: 42 }
```

### call()

调用一个函数，其具有一个指定的 this 值和分别地提供的参数（参数列表）。

该方法和 apply() 类似，apply 和 call 方法中如果没有传入参数，或传入 null，
那么调用对象（函数）中的 this 是 window。唯一的区别是 call() 接收的是若干个参数的列表，
apply() 接收的是一个包含多个参数的数组。

```javascript
func.call(thisArg, arg1, arg2, ...)
```

### bind()

创建一个新函数，在调用时设置 this 指向提供的值。调用新函数时，把给定参数列表作为原函数的参数序列的前若干项。

```JavaScript
func.bind(thisArg [, arg1, arg2, ...])
```
- thisArg 调用函数时，作为 this 参数传递给目标函数的值。如果使用 new 运算符构造
绑定函数，则忽略该值，当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，
作为 thisArg 传递的任何原始值都将转换为 object。如果 bind 函数的参数列表为空，
执行作用域的 this 将被视为新函数的 thisArg。

### assign()

将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

```JavaScript
Object.assign(target, ...sources)
```
如果目标对象中的属性具有相同的键，则属性会被源对象中的属性覆盖，后面的源对象的属性类似地
覆盖前面的源对象的属性。

只会拷贝源对象自身且可枚举的属性。

该方法使用源对象的 Get 和 Set 方法，所以它会调用相关的 getter 和 setter。因此，
它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含 getter，
这可能不适合将新属性合并到原型中。

为了将属性定义（包括可枚举属性）复制到原型，应使用：
`Object.getOwnPropertyDescriptor()` 和 `Object.defineProperty()`。

它不会跳过值为 null 或 undefined 的源对象。

### getOwnPropertyDescriptor()

返回指定对象上一个自有属性对应的属性描述符。
```javascript
Object.getOwnPropertyDescriptor(obj, prop)
```
- obj 需要查找的目标对象
- prop 目标对象内属性名称

### defineProperty()

直接在一个对象上定义一个新属性，或修改现有属性，并返回这个对象。

```JavaScript
Object.defineProperty(obj, prop, descriptor);
```
- prop 要被定义或修改的属性名
- descriptor 将被定义或修改的属性描述符

### 实现多继承

混入的方式实现多继承

```javascript
function MyClass() {
     SuperClass.call(this);
     OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
     // do a thing
};
```

## setTimeout() 和 setInterval() this 指向问题

由于 settimeout 调用的代码运行在与所有函数完全分离的环境上。非严格模式下 this 指向
 window，严格模式下为 undefined 。

 **解决方法：**
 1. 将当前对象的 this 存为一个变量
 ```javascript
const num = 0;
function foo() {
	this.num = 1;
	const that = this;
	setTimeout(function() {
		console.log(that.num); // 1
	}, 1000);
}
 ```
2. 利用 bind() 方法
```JavaScript
const num = 0;
function foo() {
	this.num = 1;
	setTimeout(function() {
		console.log(this.num); // 1
	}.bind(this), 1000);
}
```
3. 箭头函数
```JavaScript
const num = 0;
function foo() {
	this.num = 1;
	setTimeout(() = > {
		console.log(this.num); // 1
	}, 1000);
}
```
也可以使用 call 或 apply 代替 bind 方法，但是 call 会立即执行，定时器的作用就失去了。

