# Axios

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
