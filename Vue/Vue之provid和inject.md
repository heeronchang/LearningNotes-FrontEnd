# Vue之provid和inject.md

## provide 和 inject 主要为高阶插件/组件库提供用例。不推荐直接在应用程序中使用。

两者需要一起使用，以允许父组件向其子孙后代注入一个依赖，不论组件层级关系多深，在其上下游关系成立的时间里始终生效。
类似 React 的上下文特性。

**provide** 应该是一个对象或返回一个对象的函数。该对象包含可注入子孙组件的属性。可以使用 Symbols 作为 key（支持ES6的环境）。
**inject** 是一个字符串数组或是一个对象（对象的 key 是本地的绑定名，
value 是在可用的注入内容中搜索用的 key（字符串/symbole）或者是一个对象（对象的 from 属性是在可用的注入内容中搜索用的 key字符串/symbole）default 是降级时使用的 value ））。

provide 和 inject 绑定不是可响应的。如果传入一个可监听的对象，其对象的属性还是可响应的。

```JavaScript
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}


/// 利用 ES2015 Symbols、函数 provide 和对象 inject：
const s = Symbol()

const Provider = {
  provide () {
    return {
      [s]: 'foo'
    }
  }
}

const Child = {
  inject: { s },
  // ...
}
```



