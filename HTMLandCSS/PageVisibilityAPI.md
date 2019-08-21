# Page Visibility API

该 API 让开发者知道一个 Web 页面在何时变为可见或获取焦点。

## 实现 Page Visibility API

1. 检测浏览器是否支持
`document.hidden` `document.mozHidden` `document.msHidden` `document.webkitHidden`

2. 监听 visibilityState
`document.visibilityState` 取值 visible,hidden,prerender
document.addEventListener(visibilityChange, function() {
  if (document["hidden"]) {}
}, false)