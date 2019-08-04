# Vuex 原理分析

将共享的数据抽离到全局，以单例形式存储，同时利用 Vue 的响应式机制进行高效的状态管理和更新。

## Vuex 安装

通过 `Vue.use(Vuex)` 和 提供的 store 实例完成 Vuex 的引入。

Vue.js 提供 `Vue.use` 方法用来给 Vue.js 安装插件，内部通过调用插件的 `install` 方法来进行插件的安装。

