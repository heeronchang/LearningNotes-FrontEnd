# JavaScript 内存泄露

## 内存泄露

指由于疏忽或错误造成程序未能释放已经不再使用的内存。

## 内存泄露的情况

1. 全局变量

只有在页面关闭和刷新的时候才会释放

2. console.log,console.dir,console.error,console.warn... 

打印的对象不会被销毁，因为要在调试工具中查看

3. closures(闭包)

```HTML
<script>
    function f() {
      var str = Array(10000).join('#');
      var foo = {
        name: 'foo'
      }
      function unused() {
        var message = 'it is only a test message';
        str = 'unused: ' + str;
      }
      function getData() {
        // str = 'xx';
        return 'data';
      }
      return getData;
    }
    var list = [];
    
    document.querySelector('#click_button').addEventListener('click', function () {
      list.push(f());
    }, false);
  </script>
```

上面的代码，f 函数的 str 只在内部函数 unused() 函数中使用并没有在内部函数 getData()中使用， 
但内部函数 getData()被 f 函数外部对象引用，但依然会导致内存泄露。

原因是：在相同的作用域内创建的多个内部函数对象是共享同一个变量对象。如果创建的内部函数没有被其它对象引用，
不管内部函数是否引用外部函数的变量和函数，在外部函数执行完，对应变量或函数对象都会被销毁。
反之，如果内部函数中存在有对外部函数变量或函数的访问（可以不是被引用的内部函数），
并且存在某个或多个内部函数被其它对象引用，那么就会形成闭包，外部函数的变量对象就会存在于闭包函数的作用域中。
这样确保了闭包函数有权访问外部函数的所有变量和函数。

4. DOM 泄漏

在 JavaScript 中，DOM 操作是非常耗时的。因为 JavaScript/ECMAScript 引擎独立于渲染引擎，而 DOM 是位于渲染引擎，
相互访问需要消耗一定的资源。如 Chrome 浏览器 DOM 位于 WebCore，而 JavaScript/ECMAScript 位于 V8 中。

为了减少 DOM 访问次数，一般情况下，当需要多次访问同一个 DOM 方法或属性时，会将 DOM 引用缓存到一个局部变量中。
但如果在执行某些删除、更新操作后，可能会忘记释放掉代码中对应的 DOM 引用，这样会造成 DOM 内存泄露。

5. timers

如果不需要 setInterval(), setTimeout() 时要记得及时 clearInterval()。

6. EventListener

## [javascript常见的内存泄漏](https://zhuanlan.zhihu.com/p/60538328)