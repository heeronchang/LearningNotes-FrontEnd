<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [JavaScript 基础](#javascript-基础)
	- [对象](#对象)
			- [三种创建对象的方式](#三种创建对象的方式)
			- [判断一个对象的数据类型](#判断一个对象的数据类型)
			- [构造函数创建对象的问题](#构造函数创建对象的问题)
			- [构造函数、实例对象和原型之间的关系](#构造函数实例对象和原型之间的关系)
			- [自调用函数](#自调用函数)
	- [原型](#原型)
			- [原型的作用](#原型的作用)
			- [原型链](#原型链)
			- [原型继承](#原型继承)
			- [构造函数继承](#构造函数继承)
			- [拷贝继承](#拷贝继承)
	- [函数](#函数)
			- [方法中 this 指向](#方法中-this-指向)
			- [函数也是对象，对像不一定是函数](#函数也是对象对像不一定是函数)
			- [数组中函数的调用](#数组中函数的调用)
	- [正在表达式](#正在表达式)
			- [验证身份证](#验证身份证)
	- [apply 和 call](#apply-和-call)
	- [bind](#bind)
	- [作用域、作用域链和预解析](#作用域作用域链和预解析)
	- [闭包](#闭包)
	- [沙箱](#沙箱)
	- [递归](#递归)
	- [真数组和伪数组](#真数组和伪数组)

<!-- /TOC -->

# JavaScript 基础

## 对象
#### 三种创建对象的方式

**字面量方式/调用系统构造函数/自定义构造函数**

```JavaScript
// 1. 字面量的方式
const obj1 = {
  name: 'name',
  age: 20,
  eat: function() {
    console.log('eat');
  }
}

// 2. 调用系统构造函数
const obj2 = new Object();
obj2.name = 'name2';
obj2.age = 18;
obj2.play = function() {
  console.log('play');
}

// 3. 自定义构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.play = function() {
    console.log('play');
  }
}

// 工厂模式
function createObj(name, age) {
  let obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.sayHi = function() {
    console.log('hi');
  }

  return obj;
}
```
**⚠️ 工厂模式和自定义构造函数创建对象的区别**

#### 判断一个对象的数据类型

```JavaScript
// 1 通过实例对象的构造器与构造函数名
obj.constructor == Obj
// 2 obj.instanceOf(构造函数名)
obj.instanceOf(Obj)
```

#### 构造函数创建对象的问题

构造函数创建对象时，如果想要数据共享以节省空间，容易造成命名冲突。

此时使用原型可以解决这种问题：

```JavaScript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.eat = function() {
  console.log('eat');
}
```

#### 构造函数、实例对象和原型之间的关系

构造函数可以实例化一个实例对象
构造函数中的 prototype 是构造函数的原型
构造函数的原型对象（prototype)中的 constructor 构造器就是这个构造函数
实例对象的原型对象 __proto__ 指向的是构造函数的原型

#### 自调用函数

```JavaScript
(function(形参) {
  console.log('嘤嘤');
})(实参);
```

可以使用自调用函数把局部变量转换为全局变量，在内部把变量给 Window 对象。

## 原型

#### 原型的作用



#### 原型链

实例对象和原型对象之间的关系。两者之间的关系是通过原型（__proto__）联系在一起的。

原型（__proto__）的指向可以改变。

#### 原型继承

#### 构造函数继承

`构造函数.call(当前对象,pro1, pro2, pro3)`

这种方式方法不能被继承，可以结合使用原型继承与构造函数继承，构造函数负责继承方法，原型继承负责属性。

#### 拷贝继承

把一个对象中的属性或方法复制到另一个对象中。

```JavaScript
const obj1 = {
  name: 'name'
};
let obj2 = {};
for (let key in obj1) {
  obj2[key] = obj1[key];
}
// 不允许拷贝的原型属性/方法不能被拷贝。Object1 是 obj1 对象的构造函数
for (let key in Object1.prototype) {
  obj2[key] = Object1.prototype[key];
}
```

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


## apply 和 call

apply 和 call 方法中如果没有传入参数，或传入 null，那么调用对象（函数）中的 this 是 window。

apply 对象参数后面接收的是一个数组，call 的对象参数后面接收的是多个任意类型的参数。

## bind

相当于复制，也会改变 this 指向

```JavaScript
// this 会指向 obj, 返回值复制之后这个方法/函数
let foo = funcName.bind(obj, arg1, arg2, ...);
```

## 作用域、作用域链和预解析

局部作用域和全局作用域。

作用域链是指从里到外层层搜索变量。

预解析就是变量声明、函数声明的提升。

## 闭包

```JavaScript
function foo() {
  let num = 1;
  return function() {
    num ++;
    return num;
  }
}

const bar = foo();
console.log(bar()); // 2
console.log(bar()); // 3
```

## 沙箱

## 递归

## 真数组和伪数组

```JavaScript
let arr = [10, 20, 30];
let obj = {
  0: 10,
  1: 20,
  3: 30,
  length: 3
}
```

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
