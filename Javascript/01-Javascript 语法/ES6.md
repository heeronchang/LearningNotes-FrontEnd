# ES6
## 无分号代码风格
采用无分号代码风格时，为了避免语法解析错误，需要在以 `[`,`(`,``` 开头的代码前添加分号`;`

## 模版字符串 ` ` `
ES6 中的模版字符使用 `${}` 引用变量

```
<a>${content}</a>
```

## ES6 判断两个对象相等问题

ES5 中有相等运算符 `==` 和 严格相等运算符 `===` ，但是两者都存在问题，前者会自动转换数据类型，
后者 `NaN` 不等于自身，以及 -0 等于 +0。
```javascript
console.log(NaN === NaN); // false
console.log(+0 === -0); // true
```

ES6 中添加了 Object.is 判断两个值是否严格相等，与 `===` 的行为基本一致，不同之处是 `NaN` 等于自身，-0 不等于 +0。

```javascript
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0)); // false
```

### 在ES5 中的实现
```javascript
Object.defineProperty(Object, 'isEqualHC', {
  value(x, y) {
    if (x === y) {
      // 处理 -0 等于 + 0
      return x !== 0 || 1 / x === 1 / y;
    }
    // 处理 NaN 不等于自身
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: true,
  writable: true,
});

console.log(Object.isEqualHC(NaN, NaN)); // true
console.log(Object.isEqualHC(-0, +0)); // false

```

### tips:
``` javascript
console.log(1 / -0); // -Infinity
console.log(1 / +0); // Infinity
```

## Set
- 操作方法
1. `add(value)` 添加某个值，返回 Set 结构本身
2. `delete(value)` 删除某个值，返回一个布尔值，表示删除是否成功
3. `has(value)` 返回一个布尔值，表示该值是否为 Set 的成员
4. `clear()` 清除所有成员，没有返回值

- 遍历操作
1. `keys()` 返回键名的遍历器
2. `values()` 返回键值的遍历器
3. `entries()` 返回键值对的遍历器
4. `forEach()` 使用回调函数遍历每个成员

Set 的遍历顺序就是插入顺序。

##### WeakSet

WeakSet 和 Set 类似，它有两个不同点：
1. WeakSet 的成员只能是对象，不能是其他类型的值。
2. WeakSet 中的对象都是弱引用。

## Map

Javascript 的对象（Object）本质上是键值对的集合（Hash结构)，但是传统上只能用字符串当作键。

Map 数据结构类似于对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

## Symobol

为了保证每个属性名都是独一无二的（防止mixin模式属性名冲突），引入 Symbol。

Symbol 是一种新的原始类型，表示独一无二的值。Symbol 值不能与其它类型的值进行运算，但可以显式转为字符串，
也可以转为布尔值，但是不能转为数值，会报错。
Symbol 值通过 Symbol 函数生成，可以传入一个字符串参数(如果是对象，调用该对象的 toString())，
表示 Symbol 实例的描述，主要是为了在控制台显示，或转为字符串时容易区分。
相同参数时 Symbol 函数的返回值不想等。Symbol 前不能使用 new 关键词，因为它是原始类型的值。

### 作为属性名

由于每一个 Symbol 值都是不相等的，它可以作为标识符，用于对象的属性名。对于由多个模块构成的对象非常有用，
有效地防止键被改写或覆盖。

### 消除魔术字符串

风格良好的代码应该尽量消除魔术字符串，改为由含义清晰的变量代替。

```JavaScript
const shapeType = {
  triangle: 'Triangle'
}

// Symbol 形式
const shapeType2 = {
  triangle: Symbol('triangle')
}
```

### 属性名的遍历

Symbol 作为属性名时，该属性不会出现在 for...in, for...of 循环中，也不会被 Object.keys(), 
Object.getOwnPropertyNames(), JSON.stringfy() 返回。但它不是私有属性，
用 Object.getOwnPropertySymbols() 可以获取指定对象的所有 Symbol 属性名。

Reflect.ownKeys 可以获取所有类型的键名。

### Symbol.for(), Symbol.keyFor()

Symbol.for() 接收一个参数，创建一个 Symbol 值，创建之前先搜索是否有以参数作为名称创建的 Symbol 值，
有就返回该值，没有才去创建并返回。

#### Symbol.for() 和 Symbol() 区别：

Symbol.for() 会被登记再全局环境中供搜索，后者不会。每次调用，前者是先检索不存在时再创建，后者是直接创建。

#### Symbol.keyFor() 

返回一个已登记的 Symbol 类型值的 key。

#### 实例：模块的 Singleton 模式

1. 如果把实例放在 global 上，其它地方可以修改重写
2. 如果使用 Symbol.for() 只是可以保证不被无意间修改，但效果和上面一样
3. 如果使用 Symbol() 因为外部无法访问该 Symbol ，可以依靠 node 将脚本执行结果缓存的特性实现，
但是用户可以手动清除缓存，依旧不可靠。

### 内置的 Symbol 值

#### Symbol.hasInstance

对象的 Symbol.hasInstance 属性指向一个内部方法。instanceof 方法内部调用的就是 [Symbol.hasInstance]()

#### Symbol.isConcatSpreadable

布尔值，表示该对象用于 Array.prototype.concat() 时，是否可以展开。
数组的 Symbol.isConcatSpreadable 默认为 true，对象则默认为 false。

#### Symbol.species

指向一个构造函数。创建衍生对象时会使用该属性。
```JavaScript
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
```

#### Symbol.match

指向一个函数。当执行 str.match(obj) 时，如果该属性存在，会调用它，返回该方法的返回值。

#### Symbol.replace

指向一个方法。当对象被 String.prototype.replace 方法调用时，会返回该方法的返回值。

#### Symbol.search

String.prototype.search 方法调用

#### Symbol.split

String.prototype.split 方法调用

#### Symbol.iterator

指向对象的默认遍历器方法。

#### Symbol.toPrimitive

指向一个方法。该对象被转为原始类型的值时，会调用该方法。

#### Symbol.toStringTag

Object.prototype.toString

#### Symbol.unscopables 

指向一个对象，该对象指定使用 with 关键字时，哪些属性会被 with 环境排除

## Proxy

Proxy 用于修改某些操作的默认行为。

```JavaScript 
const obj = {
  name: 'heeron',
  age: 18,
};

const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    if (key in target) {
      return target[key];
    } else {
      throw new RefrenceError(`Key ${key} does not exists.`);
    }
  }
})
```

- get 拦截属性获取
- set 拦截属性设置
- apply 拦截方法调用
- has 拦截 HasProperty 操作，不是判断的 hasOwnProperty 操作
- construct 用于拦截 new 命令
- deleteProperty 用于拦截 delete 操作，如果这个方法抛出错误或者返回 false，
当前属性就无法被 delete 命令删除
- defineProperty 拦截 Object.defineProperty 操作，如果这个方法返回 false，则添加新属性时无效
- getOwnPropertyDescriptor 拦截 Object.getOwnPropertyDescriptor 返回一个属性描述对象或者 undefined
- getPropertyOf 主要用来拦截获取对象原型(Object.prototype.__proto__, Object.prototype.isPrototypeOf,
Object.getPropertyeOf, Reflect.getPropertyOf, instanceof)
- isExtensible 拦截 Object.isExtensible 操作，它的返回值必须和目标对象的 isExtensible 属性一致
- ownKeys 方法用来拦截对象自身属性的读取操作(Object.getOwnPropertynames, Object.getOwnPropertySymbols,
Object.keys, for...in)，如果目标对象自身包含不可配置的属性，该属性必须被 ownKeys 方法返回。
如果目标对象是不可扩展的（non-extensible)这时 ownKeys 方法返回的数组中，必须包含源对象的所有属性，
且不能包含多余属性。
- preventextensions 拦截 Object.preventExtension，只有目标对象不可扩展时，它才能返回 true
- setPrototypeOf 拦截 Object.setPrototypeOf，目标对象不可扩展时， setPrototypeOf 不能修改目标对象的原型

### Proxy.revocable 

返回一个可取消的 Proxy 实例。
```JavaScript
const target = {};
const handler = {};

const { proxy, revoke } = Proxy.revocable(target, handler);
proxy.foo = 123;
console.log(proxy.foo); // 123
revoke();
console.log(proxy.foo); // TypeError: Cannot perform 'get' on a proxy that has been revoked
```

### this 问题

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象但透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。
主要原因是在 Proxy 代理的情况下，目标对象内部的 this 关键字指向 Proxy 代理。

### 实例： Web 服务的客户端

Proxy 可以拦截目标对象的任意属性，这使得它很适合用来写 Web 服务的客户端。

```JavaScript
const service = createWebService(baseUrl) {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return () => httpGet(baseUrl+'/' + propKey);
    }
  });
}
```

同理也可以实现数据库的 ORM 层。

## Reflect 

### 概述

Reflect 设计的目的：
1. 将 Object 对象上明显属于语言内部的操作方法（比如 Object.defineProperty）放到 Reflect 对象上。
也就是说从 Reflect 对上可以拿到语言内部的方法。
2. 修改某些 Object 方法的返回结果，让其变得更合理。比如， Object.defineProperty(obj, name, desc) 在无法定义一个属性时，
会抛出一个错误，而 Relect.defineProperty(obj, name, desc) 则会返回 false。
```JavaScript
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch(e) {
  // failure
}
// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```
3. 让 Object 某些操作都变成函数行为。某些 Object 操作是命令式，如 name in obj, delete obj[name]，
而 Reflect.has(obj, name), Reflect.deleteProperty(obj, name) 让它们变成了函数行为。
```JavaScript
// old
'assign' in Object // true
// new
Reflect.has(Object, 'assign') // true
```
4. Reflect 对象的方法与 Proxy 对象的方法一一对应。只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy
对象可以方便地调用对应的 Reflect 方法，完成默认的行为，作为修改行为的基础。
```JavaScript
Proxy(target, {
  set(target, name, value, receiver) {
    const success = Reflect.set(target, name, value, receiver);
    if (success) {
      // to do
    }
    return success;
  }
});
```
5. Reflect 对象让一些操作更已读。
```JavaScript
// old
Function.prototype.apply(Math.floor, undefined, [1.75]) // 1
// new 
Reflect.apply(Math.floor, undefined, [1.75]) // 1
```
### 静态方法

Reflect 对象一共有13个静态方法
1. Reflect.apply(target, thisArg, args)

等同于 Function.prototype.apply.call(target, thisArg, args) ，用于绑定 this 对象后执行给定函数。

一般来说，如果要绑定一个函数的 this 对象，可以这样写 fn.apply(obj, arg) ， 但是如果函数定义了自己的 apply 方法，就只能这样写：
Function.prototype.apply.call(target, thisArg, args) ，采用 Reflect.apply(target, thisArg, args) 可以简化操作。

2. Reflect.construct(target, args)
3. Reflect.get(target, name, receiver)

如果 name 属性部署了读取函数(getter)，则读取函数的 this 指向 receiver。如果第一个参数不是对象会报错
```JavaScript
const obj = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};
const receiver = {
  foo: 2,
  bar: 3,
};
Reflect.get(obj, 'baz', receiver) // 5
```
4. Reflect.set(target, name, value, receiver)

同 get 方法，给 name 设置了赋值函数时，赋值函数的 this 绑定 receiver。

5. Reflect.defineProperty(target, name, desc)
6. Reflect.deleteProperty(target, name)

删除成功或 name 不存在，均返回 true

7. Reflect.has(target, name)

对应 name in obj 里的 in 运算

8. Reflect.ownKeys(target)

基本等同于 Object.getOwnPropertyNames 和 Object.getOwnPropertySymbols 之和。

9. Reflect.isExtensible(target)
10. Reflect.preventExtensions(target)
11. Reflect.getOwnPropertyDescriptor(target, name)
12. Reflect.getPropertyOf(target)

它与 Object.getPropertyOf 的区别是后会把传入的非对象参数转为对象后再运行，而前者会直接报错

13. Reflect.setPropertyOf(target, prototype)

对应 Object.setPropertyOf(target, prototype), 如果第一个参数不是对象，Reflect..报错，Object..返回参数本身。
如果第一个参数是 undefined 或 null ，两者都会报错。

### 实例：使用 Proxy 实现观察者模式

## Iterator 和 for...of 循环

