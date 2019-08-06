# keep-alive 的使用和原理

keep-alive 是 Vue.js 中内置的一个抽象（`abstract: true`）组件，不会渲染到 `DOM` 中，也不会出现在组件链中。
它能够使不活跃的组件实例保存在内存中，而不是直接销毁。
它提供了 `include` 和 `exclude` 两个属性，可以有条件地缓存。

## 用法
> 注意这个 <keep-alive> 要求被切换到的组件都有自己的名字，不论是通过组件的 name 选项还是局部/全局注册。
```HTML
<keep-alive>
  <component></component>
</keep-alive>
```

`component` 组件会被缓存。

### props

keep-alive 提供了 `include` 和 `exclude` 两个属性，进行有条件地缓存，两者都可以使用逗号分割字符串、正则表达式或一个数组。

```HTML
<!-- 将会缓存 name 为 a 的组件 -->
<keep-alive include="a">
  <component></component>
</keep-alive>

<!-- 将不会缓存 name 为 a 的组件 -->
<keep-alive exclude="b">
  <component></component>
</keep-alive>
```

### 生命周期钩子

keep-alive 提供了两个生命周期钩子 `actived` 和 `deactived`。 
因为 keep-alive 使组件保存在内存中，并不会销毁以及重新创建，所以不会重新调用组件的 `created` 等生命周期方法，
需要使用 `actived` 和 `deactived` 两个生命周期方法判断组件的活跃状态。

## keep-alive 实现原理

### created 和 destroyed
keep-alive 的 created 钩子中会创建一个 cache 对象作为缓存容器，用来保存 VNode 节点。
而 destroyed 钩子则在组件被销毁时，清除缓存的所有 VNode 节点。

```JavaScript

created() {
  // 缓存对象
  this.cache = Object.create(null);
}

destroyed() {
  // 销毁所有 cache 中组件实例
  for (const key in this.cache) {
    pruneCacheEntry(this.cache[key]);
  }
}
```

### render 函数

```JavaScript
  render () {
    // 得到slot插槽中的第一个组件，此方法会获取第一个 componentOptions 不会空的组件节点

    // ？？? 如果不存在这样的节点，如何？
    /* 
    注意这个 <keep-alive> 要求被切换到的组件都有自己的名字，不论是通过组件的 name 选项还是局部/全局注册。
    不存在这样的节点时，会按照正常的 Vue 节点渲染
    */

    // 如果有多个这样的节点，如何？
    /*
    注意，<keep-alive> 是用在其一个直属的子组件被开关的情形。如果你在其中有 v-for 则不会工作。如果有上述的多个条件性的子元素，<keep-alive> 要求同时只有一个子元素被渲染。
    */
    const vnode: VNode = getFirstComponentChild(this.$slots.default)

    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      /* 获取组件名称，优先获取组件的name字段，否则是组件的tag */
      const name: ?string = getComponentName(componentOptions)
      /* name不在inlcude中或者在exlude中则直接返回vnode（没有取缓存） */
      // ？？？ 有 name 不在 include 中的不会缓存？
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      /* 如果已经做过缓存了则直接从缓存中获取组件实例给vnode，还未缓存过则进行缓存 */
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance
      } else {
        this.cache[key] = vnode
      }
      /* keepAlive标记位 */
      vnode.data.keepAlive = true
    }
    return vnode
  }
```