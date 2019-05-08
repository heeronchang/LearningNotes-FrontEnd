# Vue 组件间传值

## 父组件向子组件传值

在父组件使用子组件的地方绑定子组件的 prop

## 子组件向父组件传值

通过 Vue 的 v-on 和 $emit 实现子组件向父组件传值

```JavaScript
// 子组件
<h2 @click.prevent="click">{{ msg }}</h2>
methods: {
  click() {
    this.$emit('clickWho', {
      value: 'HiWorld',
    });
  },
},

// 父组件
<hi-world v-on:clickWho="clickWhoChanged"></hi-world>

components: {
  'hi-world': HiWorld,
},
data() {
  return {
    clickWho: 'noClick',
  };
},
methods: {
  clickWhoChanged(e) {
    this.clickWho = e.value;
  },
},
```

## 兄弟组件之间传值或两个没有关系的组件之间的传值

1. 将需要改变的值放到父组件中，子组件通过props来获取父组件的值
2. vuex