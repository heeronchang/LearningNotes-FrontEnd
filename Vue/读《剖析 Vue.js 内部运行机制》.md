## 组件挂载($mount) render function、template 和 el

**Q: 哪种情况是运行时编译？运行时编译是什么？有什么作用？**

`template` 是运行时编译。它包括 `parse`、`optimize` 和 `generate` 三个阶段，最终得到需要的 render function 。

- `parse`：它会用正则等方式解析 `template` 模板中指令、`class`、`style` 等数据，形成 AST 。
- `optimze`：主要作用是标记 static 静态节点，这是 Vue 编译的一个优化点，`update` 更新界面时，在 patch 的过程，diff 算法会直接跳过静态节点。
- `generate`：将 AST 转化成 render function 的过程，得到结果是 render 字符串以及 staticRenderFns 字符串。

**Q: 非运行时编译，不需要编译这一步？那么它是怎么渲染的？**
**Q: el 是怎么渲染的？**

## 响应式系统的基本原理

Vue.js 是通过 `Object.defineProperty` 实现[响应式系统]的。

### 使用 `Object.defineProperty` 实现 `observer`

```JavaScript
function observer (value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }
    
    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key]);
    });
}

function cb (val) {
    console.log("视图更新啦～", val);
}

function defineReactive (obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            return val;         
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            val = newVal;
            cb(newVal);
        }
    });
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
    }
}

let o = new Vue({
    data: {
        test: "I am test."
    }
});
o._data.test = "hello,test.";
```

### 数组怎么实现的响应式


### 为什么要进行依赖收集

让数据知道有视图用到了它，它改变时应该通知视图数据变了。
修改了视图中不需要的数据，此时不应该进行依赖收集。

**Q 多个属性时， Watcher 的创建**

## 批量异步更新策略以及 nextTick 原理

Vue.js 在默认的情况下，每次触发数据的 setter 方法后，对应的 Watcher 对象会被 push 进一个队列 queue 中，在下一个 tick 的时候，
将这个队列 queue 全部拿出来 run (Watcher 对象的一个方法，用来触发 patch 操作) 一遍。

### nextTick

Vue.js 实现了一个 nextTick 函数，传入一个 cb，这个 cb 会被存储在一个队列中，在下一个 tick 时触发队列中的所有 cb 事件。

