# Axios

Axios 是一个基于 Promise 的 HTTP 请求库。

## axios 特性

- 从 Node.js 创建 http 请求
- 支持 Promise API
- 客户端防止 CSRF（让每一个请求都带一个从 cookie 中拿到的 key，根据浏览器同源策略，假冒的网站是拿不到你的
cookie 中的 key 的，这样后台就能轻松的辨别）
- 提供了一些并发请求接口

## 简单使用
```javascript
axios({
  method: 'post',
  url: '/user/login',
  data: {
    username: 'heeron',
    password: '123456'
  }
})
.then(response = > {
  console.log(response);
})
.catch(error => {
  console.log(error);
})
```
## Axios 源码深度剖析

Axios 最核心的技术点是：
1. 如何拦截请求响应、修改请求参数以及修改响应数据
2. Axios 是如何使用 Promise 搭建基于 xhr 的异步桥梁点


### 名词解释

1. 拦截器 interceptors

它就是基于 Promise 的中间件的作用。
拦截器分为请求拦截器(interceptors.request)和响应拦截器(interceptors.response)。

2. 数据转换器

对数据转换，比如对象转 JSON 字符串。
数据转换器分为请求转换器(tranformRequest)和响应转换器(transformResponse)。

3. HTTP 请求适配器

一个方法。在 axios 项目里， HTTP 请求适配器主要有两种：XHR 和 HTTP。
XHR 的核心是浏览器端端 XMLHttpRequest 对象，Http 的核心是 Node 的http[s].request 方法。
axios 也可以通过 config 自行配置适配器。

4. config 配置项

一个对象。在 axios 中它有时叫 defaults（默认配置项），有时叫 config （Axios.prototype.request 的参数，或 xhrAddress http 请求适配器方法的参数）。

### Axios 内部运作流程

axios 入口 --> Axios 构造函数 --> interceptors.request 请求拦截器 --> dispatchRequest 方法 --> 请求转换器 transformRequest --> 
http 请求适配器 --> 响应转换器 tranformResponse --> interceptors.response 响应拦截器


#### Axios 中的各种 get、post、delete 

这些请求方式都是是扩展出来的，最终都是调用的 Axios.prototype.request 发起请求。

#### 用户配置的 config 怎么起作用的？

在 Axios 中进行了 merge 操作

#### Axios.prototype.request 是怎么根据我们的配置发起请求的？

一个存储拦截器和 dispathRequest 方法的 chain 数组，通过 Promise 从 chain 数组里按顺序取出回调函数逐一执行，最后将处理后的 promise 放在 Axios.prototype.request 方法里返回。

#### 如何拦截请求响应并修改请求参数修改响应数据？

#### dispatchRequest 是如何发送 http 请求的？

- 拿到 config 对象，对 config 进行传给 http 请求适配器前的最后处理
- http 请求适配器根据 config 配置，发起请求
- http 请求适配器请求完成后，如果成功则根据 header、data 和 config.transformResponse 拿到数据转换数据后 return reponse



#### 

## [Axios 源码解析](https://zhuanlan.zhihu.com/p/58349237)