# this 指向

## 在全局环境中（任何函数体外部），无论是否在严格模式下，this 都指向全局对象

## 在函数（运行内）环境

1. 简单调用时，this 指向全局对象，严格模式下则为 undefined。

2. call 和 apply 方法可以把 this 从一个环境传到另一个环境。

使用 call 和 apply 传递的 this 值不是一个对象，JavaScript 会尝试使用内部 ToObject 操作将其转为对象，
因此，如果传递的是一个原始值，会使用相关到构造函数将其转为对象，例如，new Number(0), new String('foo') 。

3. bind 方法

调用 f.bind(obj) 会创建一个和 f 具有相同函数体和作用域的函数，
**注意，在这个新函数中，this 将永久地被绑定到了 bind 的第一个参数，无论这个函数是如何调用的**

```JavaScript
 function f() {
   return this.a;
 }

 var g = f.bind({a:'g'});
 console.log(g()); // g

 var h = g.bind({a:'h'});
 console.log(h()); // g

 var i = f.bind({a:'i'});
 console.log(i()); // i
```

4. 箭头函数

在箭头函数中，this 与封闭词法的 this 保持一致。在全局代码中，是全局对象。不能使用 call, apply, bind 修改。
[箭头函数的this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)

5. 作为对象的方法

当函数作为对象的方法被调用时，this 指向调用该函数的对象。

6. 原型链中的 this

在对象原型链中定义的某个方法，this 指向真正调用该方法的对象。

7. setter, getter 中的 this

用作 setter 或 getter 的函数会把 this 绑定到设置或获取属性的对象。

8. 构造函数

当一个函数用作构造函数时，它的 this 指向正在构造的新对象。

构造函数默认返回的是 this 所指的那个对象，但可以手动返回其它的对象（如果返回值不是一个对象，则返回 this 对象）。

9. 函数被当作事件处理函数时，它 this 指向触发事件的元素。

10. setTimeout 回调函数的 this 指向全局对象 window。
  > 在严格模式下，setTimeout( )的回调函数里面的this仍然默认指向window对象， 并不是undefined