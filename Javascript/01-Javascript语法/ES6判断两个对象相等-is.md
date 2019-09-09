# ES6 判断两个对象相等问题

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

# 在ES5 中的实现
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

# tips:
``` javascript
console.log(1 / -0); // -Infinity
console.log(1 / +0); // Infinity
```