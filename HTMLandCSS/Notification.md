# 通知 API

无论用户在查看哪一个浏览器标签中的内容，都可以向用户显示通知信息

## 使用通知 API

1. 检查浏览器是否支持

```javascript
if (window.Notification) {

}
```
2. 请求显示通知的权限

```javascript
window.Notification.requestPermission();
```
此方法只在用户显式触发的事件（单击按钮、单击鼠标左键或键盘上某个键）中有效。

```javascript
// 判断权限 perssion 取值：default，granted，denied
if (window.Notification.perssion == 'granted') {
  // ..
} else {
  window.Notification.requestPermission();
}
```

3. 创建通知

`let nofification = new Notification(title, options)`

options 取值：
- dir：通知中文字方向。ltr（从左向右），rtl（从右向左），默认 ltr
- lang：语言
- body：通知内容
- tag：通知的ID
- icon：图片的 URL 地址

  **通知方法和事件**
onshow() 通知显示事件
close() 关闭通知
onclose() 通知关闭事件
onclick() 单击事件
onerror()