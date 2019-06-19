# JavaScript HTML DOM

通过 HTML DOM 和 JavaScript 能够访问和改变 HTML 文档的所有元素。

# DOM

DOM 是 W3C 标准，定义了文档的访问标准，该标准分为三个部分：
1. Core DOM: 所有文档类型的标准模型
2. XML DOM: XML 文档的标准模型
3. HTML DOM: HTML 文档的标准模型

# HTML DOM （文档对象模型）

网页加载时，浏览器创建的文档对象模型 （Document Object Model）。

HTML DOM 是 HTML 的标准对象模型和编程接口（获取、更改、添加或删除 HTML 元素的标准）。它定义了：
- 作为对象的 HTML 元素
- 所有 HTML 元素的属性
- 访问所有 HTML 元素的方法
- 所有 HTML 元素的事件

# JavaScript HTML DOM 方法

## 查找 HTML 元素的方法 

- 通过 id `document.getElementById('id')`
- 通过标签 `document.getElementsByTag('tag')`
- 通过类名 `document.getElementsByClassName('classname')`
- 通过 CSS 选择器 `document.querySelectorAll('p.classname')`
- 通过 HTML 对象集合 ``

## JavaScript HTML DOM 事件

- 鼠标点击事件 `onclick`
- 网页加载后 `onload` , `onunload`
- 图像加载后
- 鼠标移动到元素上时 `onmouseover` , `onmouseout` , `onmousedown` , `onmouseup`
- 输入字段被改变时 `onchange`
- HTML 表单被提交时
- 敲击键盘时

## JavaScript HTML DOM 事件监听器

`addEventListener()` , `removeEventListener()`

`element.addEventListener(event, function, useCapture)`

- event 事件类型
- function 回调函数
- useCapture 指定使用事件冒泡还是事件捕获



