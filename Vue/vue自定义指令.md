# 自定义指令 Directive

```JavaScript 
// 1. 注册全局自定义指令
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中
  inserted: function(el) {
    el.focus();
  }
});

// 2. 注册局部自定义指令，组件中接受
directives: {
  focus: {
    inserted: function(el) {
      el.focus();
    }
  }
}

// 使用
<input v-focus />
```

# 钩子函数

- bind 只调用一次，指令第一次绑定到元素时调用
- inserted 被绑定元素插入到父节点时调用（仅保证父节点存在，但不一定已被插入到节点中）
- update 所有组件的 VNode 更新时调用，可能发生在其子 VNode 更新之前。不能确定指令的值是否改变，需要比较更新前后的值
- componentUpdate 指令所在组件的 VNode 及其子 VNode 全部更新后调用
- unbind 只调用一次，指令与元素解绑时调用

## 钩子函数的参数

- el
- binding 对象
- vnode
- oldVnode