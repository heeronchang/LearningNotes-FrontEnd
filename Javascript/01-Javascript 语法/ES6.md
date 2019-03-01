# ES6
#### 1. 无分号代码风格
采用无分号代码风格时，为了避免语法解析错误，需要在以 `[`,`(`,``` 开头的代码前添加分号`;`

#### 2. 模版字符串 ```
ES6 中的模版字符使用 `${}` 引用变量

```
<a>${content}</a>
```

#### ES6 判断两个对象相等问题

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

**在ES5 中的实现**
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

tips:
``` javascript
console.log(1 / -0); // -Infinity
console.log(1 / +0); // Infinity
```

#### Set
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

#### Map

Javascript 的对象（Object）本质上是键值对的集合（Hash结构)，但是传统上只能用字符串当作键。

Map 数据结构类似于对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
