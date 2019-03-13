<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Ajax](#ajax)
			- [onload 事件是 H5 中的 API，注意兼容性问题。](#onload-事件是-h5-中的-api注意兼容性问题)
			- [同步模式/异步模式](#同步模式异步模式)
	- [AJax 的问题（SEO）](#ajax-的问题seo)

<!-- /TOC -->

# Ajax

`Asynchronouse JavaScript and XML`

```JavaScript
const rhr = new XMLHttpRequest();
// 设置请求行
// rhr.open('GET','./Promise.js');
// 传参
rhr.open('GET', './Promise.js?id=1&name=tom')
// 设置请求头
rhr.setRequestHeader('deviceId': 'ifejnofjo83fongojof');
rhr.onreadystatechange = function(e) {
  if (this.readyState === 4) {
    if (this.status == 200) {
      console.log(this.responseText);
    }
  } else {
    console.log('else');
  }
}
rhr.send();
// rhr.send(obj); // 设置请求体

```
#### onload 事件是 H5 中的 API，注意兼容性问题。

```JavaScript
// 相当于 onreadystatechange 中 readyState == 4 的情况
rhr.onload = function() {}
```

#### 同步模式/异步模式

```JavaScript
// 此处传入 false 代表同步请求，默认是 true 代表异步请求。
rhr.open('GET','./Promise.js', false);
```

## AJax 的问题（SEO）

`SEO - Serach engine optimiaztion`
