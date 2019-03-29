# Fetch API

## Fetch 特性

- 符合关注分离，没有将输入输出和用事件来跟踪的状态混杂在一个对象里
- 更加底层，提供的 API 丰富
- 脱离了 XHR 是 ES 规范里的新实现方式

## 进行 fetch 请求
```javascript
fetch('https://api.github.com/users/github', {})
 .then((response) => {
   return response.json();
 })
 .then((myJson) => {
   console.log(myJson);
 })
```

## 注意
- 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 rejected，即使该 HTTP 响应
的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve ，但是会将 resolve 的返回值的 ok 设置为
 false 仅当网络故障时或请求被阻止时，才会被标记为 reject。
- 默认情况下，fetch 不会从服务端发送或接收任何 cookies ， 如果站点依赖于用户 session， 则会导致未经认证的
请求（要发送 cookies， 必须设置 credentials 选项）。
