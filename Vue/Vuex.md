# Vuex

## Vuex 概述
Vuex 把组件的共享状态抽取出来，以一个全局单例模式管理，通过定义和隔离状态管理中的各种概念并强制遵守一定的原则，使代码变得更加结构化且易维护。

Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 细粒度数据响应机制来进行高效的状态更新。

## Vuex 和单纯的全局对象有何不同
- Vuex 的状态存储是响应式的。Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么组件也会得到响应的高效更新。
- 不能直接改变 store 中的状态。只能通过显示地提交（commit）mutation。这样方便跟踪每一个状态的变化。

## Vuex 单状态树和模块化

#### 通过计算属性获取某个状态的缺点

组件依赖全局状态单例。在模块化构建的系统中，需要在每个使用 store 的组件中频繁导入，并且在测试组件时需要模拟状态。
#### Vuex 通过 store 选项将状态从根组件注入子组件中的机制

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

#### 使用常量替代 Mutation 事件类型

使用常量替代 mutation 事件类型在 Flux 实现中很常见。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让开发团队对整个 app 的 mutation 一目了然。

#### Mutation 必须是同步函数

因为在回掉函数中进行的状态改变不可追踪。

#### Action 和 Mutation 的区别

Action 类似于 Mutation，不同之处是：
- Action 提交的是 Mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。
- Action 需要使用 dispatch 分发 ？？？

#### 为什么 Action 函数接受一个和 store 实例具有相同方法和属性的 context 对象，而不是 store 实例本身

？？？

#### Module 解决 store 对象臃肿问题

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

#### 模块的命名空间

设置 `namespaced: true` 可以让模块具有更高的封装度和复用性。模块注册后，它的所有 getter、action、mutation 都会自动根据模块注册的路径调整命名。


#### 表单处理 `v-model` 问题

在严格模式中使用 Vuex 时，如果变更状态的发生不是 mutation 函数引起的，会抛出异常。而使用 `v-model` 会直接修改状态。

```javascript
<input v-model="obj.message">
```

**解决方案：**

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
