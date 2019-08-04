# Vuex

## Vuex 概述
Vuex 把组件的共享状态抽取出来，以一个全局单例模式管理，通过定义和隔离状态管理中的各种概念并强制遵守一定的原则，使代码变得更加结构化且易维护。

Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 细粒度数据响应机制来进行高效的状态更新。

## Vuex 基本用法

### mapState 辅助函数

mapState 帮助我们生成计算属性：
```JavaScript
import { mapState } from 'Vuex';
export default {
  // ...
  computed: mapState({
    count: state => state.count,
    // 传字符串等同于 'state => state.count'
    countAlias: 'count',
    // 为了能够使用 'this' 获取局部状态，必须使用普通函数
    countPlusLocal(state) {
      return state.count + this.localCount;
    },
    // 当映射的计算属性的名称和 state 子节点名称相同时
    'count'
  })
}
```
利用“对象展开运算符”把局部计算属性和 mapState 函数生成的计算属性合并：
```JavaScript
computed: {
  localComputed(): { ... },
  // 使用对象展开运算符将 mapState 函数返回的对象混入外部对象中
  ...mapState({
    // ...
  })
}
```

## Vuex 和单纯的全局对象有何不同
- Vuex 的状态存储是响应式的。Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么组件也会得到相应的高效更新。
- 不能直接改变 store 中的状态。只能通过显式地提交（commit）mutation。这样方便跟踪每一个状态的变化。

## Vuex 单状态树和模块化

### 通过计算属性获取某个状态的缺点

组件依赖全局状态单例。在模块化构建的系统中，需要在每个使用 store 的组件中频繁导入，并且在测试组件时需要模拟状态。

### Vuex 通过 store 选项将状态从根组件注入子组件中的机制

使用 `Vue.use(Vuex)`
``` javascript
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```
在根组件中注册 store 选项，根组件的 store 实例会注册到根组件下所有子组件中，子组件通过 `this.$store` 访问。

### 使用常量替代 Mutation 事件类型

使用常量替代 mutation 事件类型在 Flux 实现中很常见。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让开发团队对整个 app 的 mutation 一目了然。

### Mutation 必须是同步函数

因为在回掉函数中进行的状态改变不可追踪。会影响到 devtool 调试，如果真的使用了异步函数是否会影响数据展示的正确性？？？

### Action 和 Mutation 的区别

Action 类似于 Mutation，不同之处是：
- Action 提交的是 Mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise ，并且 store.dispatch 仍旧返回 Promise。

一个 store.dispatch 在不同模块中可以触发多个 action 函数，此时，只有当所有触发函数完成后，返回 Promise 才会执行。

### 为什么 Action 函数接受一个和 store 实例具有相同方法和属性的 context 对象，而不是 store 实例本身

使用了命名空间时，action 还能接收根节点状态

### Module 解决 store 对象臃肿问题

使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用非常复杂时， store 对象就有可能变得非常臃肿。

为了解决这个问题，Vuex 中可以使用 Module 分割模块，每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。

```javascript
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
模块内部的 mutation 接收的第一个参数 state 是模块的局部状态对象。
模块内部的 getter 接收的第一个参数 state 也是模块的局部状态对象，第二个参数是 其它 getter ，第三个参数是根节点状态。
模块内部的 action 局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState 。

### 模块的命名空间

默认地，模块内部的 action、mutation 和 getter 是注册在全局命名空间的，这样使得多个模块能够对同一 mutation 或 action 做出响应。

模块内对状态 state 本身就是嵌套，使用命名空间不会对其产生影响。

设置 `namespaced: true` 可以让模块具有更高的封装度和复用性。模块注册后，它的所有 getter、action、mutation 都会自动根据模块注册的路径调整命名。

### 表单处理 `v-model` 问题

在严格模式中使用 Vuex 时，如果变更状态的发生不是 mutation 函数引起的，会抛出异常。而使用 `v-model` 会直接修改状态。

```javascript
<input v-model="obj.message">
```

#### 解决方案：

1. 给 `<input>` 绑定 `value`,然后监听 `input` 或 `change` 事件，在事件回调中调用 action：

```html
<input :value="message" @input="updateMessage">
```

```javascript
// ...
computed: {
  ...mapState({
    message: state => state.obj.message
  }),
  method: {
    updateMessage (e) {
      this.$store.commit('updateMessage', e.target.value)
    }
  }
}
```

2. 使用带有 `setter` 的双向绑定计算属性：

```html
<input v-model="message">
```

```javascript
// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```

## 关于 Vuex 的测试

主要针对 Vuex 中的 mutation 和 action 进行单元测试。

暂无

## 热重载

暂无
