# HTML

## Html 表单提交

表单具有默认的提交行为，默认是同步的。
同步提交表单时，浏览器会锁死，等待服务端的响应结果，浏览器会把响应结果渲染出来覆盖当前页面。
异步提交

# CSS 优先级

类选择器>标签选择器


| 属性名 | 权重值 |
|----|----|
| ID选择器 | 0,1,0,0 |
| 类，伪类选择器 | 0,0,1,0 |
| 继承或者* | 0,0,0,0 |
| 行内样式   |  1,0,0,0 |
| !important   |  ∞无穷大 |

# CSS 盒子

### 设置内边距

`padding` `border` 一般会撑开盒子，`padding` 也有不会撑开盒子的情况：

盒子没有给定宽度时，添加 padding 不会撑开盒子


### 嵌套元素的垂直外边距塌陷问题

解决方法一：给父元素一个边框
方法二：给父元素添加 `padding-top`
方法三：父元素添加 `overflow: hidden;`

### 盒子阴影

`box-shadow`
h-shadow v-shadow blur spread color inset/outset

### 浮动

浮动让块级元素能够在行内显示

`float` 浮动只有 left 和 right

浮动不能跨越内边距和边框

#### 清除浮动

为了解决子元素浮动时，父级元素高度为零的问题

1. 添加额外的子标签元素设置 `style="clear:both;"`，此方法的缺点就是添加需要添加无意义的标签
2. `overflow` 给父级元素添加 `overflow: hidden;`

#### 伪标签清除浮动

```CSS
.clearfix: after {
  content: "";
  display: none;
  height: 0;
  visibility: hidden;
  clear: both;
}
// ie 6,7
.clearfix {
  *zoom: 1;
}
```

#### 双伪元素清除浮动

```CSS
.clearfix: before, .clearfix: after {
  content: "";
  display: table;
}
.clearfix: after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
```
# 定位 position

定位模式和边偏移

#### 边偏移

top, bottom, left, right

#### 定位模式

1. static:

默认定位模式，静态定位的唯一用————处取消定位，把其它定位模式设置成 static 就是取消定位

2. relative:

以自己的左上角为基准点移动；在文档流中的位置保留。
```CSS
position: relative;
top: 100px;
```
3. absolute:

在文档流中的位置不保留；
父元素没有定位或没有父元素都会以当前浏览器屏幕为基准点；
如果父元素有定位，则以父元素的左上角为基准点（以最近的有定位的父级元素左上角为基准点）

4. fixed

固定定位，在文档流不保留位置，跟父级元素定位模式也没有关系

**注意**

绝对定位和固定定位都会发生模式转换，块类型元素会转换为行内块类型元素（宽度和内容有关）

加了定位或浮动的盒子，`margin: 0 auto;` 失效

# 元素显示与隐藏

- display: none;

隐藏元素，不保留占用位置

- visibility:

隐藏元素，保留占用位置

- overflow

visible： 可见的，hidden：隐藏，scroll：添加滚动条，auto：超出时添加滚动条

# 溢出文字显示省略号

white-space: nowrap 不换行，

overflow: hidden 超出部分隐藏

text-overflow: clip 不显示省略号，ellipsis 溢出部分省略号代替

# 精灵图

精灵图的价值，减少服务器的请求次数，CSS 主要用来做背景图

```CSS
background: url('images/bg.png') no-repeat;

background-position: 0 -10px;
```

# 滑动门效果

导航栏为例，li 中的 a 标签嵌套 span 标签，a 标签使用背景图的左侧部分，span 使用背景图的右侧部分。
```CSS
.nav a {
  background: url(images/to.png) no-repeat left;
  display: inline-block;
  height: 33px;
  padding-left: 15px;
}
.nav span {
  background: url(images/to.png) no-repeat right;
  display: inline-block;
  height: 33px;
  padding-right: 15px;
}
.nav a:hover, .nav a:hover span {
  background-image: url(images/default.png);
}
```

# 行高不带单位

真实行高就是字体大小乘以行高指定的值

# CSS Reset 库 暴力初始化，解决浏览器兼容问题，现在使用 Normalize.css

# 引入 ico 图标
eg：
https://www.jd.com/favicon.ico
https://login.taobao.com/favicon.ico

```
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
```

# 网站优化三大标签

1. title
标题长度限制（google35个中文，百度28个中文）
最先出现的关键词权重越高

建议：网站名-网站介绍。。

2. description
网站说明

3. Keywords
关键字

# 过渡动画

transition：
- transition-property 应用过渡的 CSS 属性，多个属性用“,”隔开，所有属性用 `all`
- transition-duration 过渡时间
- transition-timing-function 过渡效果的时间曲线
- transition-delay 延迟

```
transition: width .3s ease 0s;
transition: width .3s ease 0s, height .5s ease 0s;
transition: all .3s;
```

过渡动画写到本体的样式上，如果写在 hover 上鼠标离开时没有过渡动画。

# 2D变形（CSS3）transform

可以实现元素的位移、旋转、缩放、倾斜效果。

- 移动

```CSS
div {
  transform: translate(100px, 0);
  transform: translate(0, 100px);
}
```

**利用 transform 让定位的盒子水平居中。**

```CSS
div {
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: pink;
  top: 50%;
  left: 50%;
  transform: translate(-50%; -50%); /* 自身宽高的有一半 */
}
```

`translateX()` `translateY()`

- 缩放

```CSS
div {
  transform: scale(1, 0.8); /* 宽度不变， 高度变为原来的 0.8 */
  transform: scale(0.8); /* 宽度和高度都变为原来的 0.8 */
}
```

- 旋转

```CSS
div {
  transform: rotate(30deg); /* 顺时针旋转 */
  transform: rotate(-30deg); /* 逆时针旋转 */
  transform-origin: left top bottom right; /* 旋转中心点 */
}
```

- 倾斜

```CSS
div {
  transform: skew(30deg, 0deg);
}
```

# 动画 animation

### 声明动画

```CSS
/* 关键帧动画 */
@keyframes identifier {
  from {
    /* CSS 属性 */
  }
  to {
    /* CSS 属性 */
  }
}

@keyframes identifier2 {
  0% {
    /* CSS 属性 */
  }
  50% {
    /* CSS 属性 */
  }
  100% {
    /* CSS 属性 */
  }
}
```

### 调用动画
`animation: animation-name animation-duration animation-timing-function animation-delay animation-iteration-count animation-direction animation-play-state animation-fill-mode`

### 结合 clip-path 动画

clip-path 是用来裁剪的，如对一个 div 应用 clip-path: circle(40% at 50% 50%) 意为裁剪一个半径为 40%，圆心在（50%， 50%）位置的一个圆。

示例：
```CSS
div img {
  clip-path: circle(10% at 50% 50%);
  transition: clip-path 8s ease-in-out;
}
div:hover img {
  clip-path: circle(40% at 50% 50%);
}
```

# 文字阴影

text-shodow: 水平位置 垂直位置 模糊距离 阴影颜色

文字阴影比较影响处理器性能

# 背景缩放

使用场景：iOS 2x 图片等。
`background-size: 100px 100px;` 如果只设置一个值，高度则默认为 auto；

`background-size: cover;` 自动等比例缩放，铺满。

`background-size: content;` 等比例缩放，宽或高铺满。

# 背景渐变

`background: -webkit-linear-gradient(渐变起始位置，渐变起始颜色，渐变结束颜色) `
`background:-webkit-linear-gradient(渐变起始位置，颜色 位置，颜色 位置 ...)`

# 多背景

`background: url(image1) no-repeat top left, url(image2) no-repeat bottom right, ...;`

多背景图时，背景色写在下面，防止被成叠掉。

# 半透明盒子和半透明背景

`background: rbga(0, 0, 0, 0.3)` 盒子背景半透明
`opcacity: 0.2;` 盒子半透明

# 3D

`transform: rorateX()` `transform: rorateY()`

`perspective: 500px;` 透视，一般加给父元素。

`backface-visibility` 元素不面向屏幕时不可见

# 控件修改样式问题

对于 `checkbox` 等不能常规修改外观的控件，可以利用伪元素实现自定义样式。

- checkbox

```HTML
<style>
  .checkbox {
    display: none;
  }

  i {
    font-style: normal;
  }

  .checkbox:checked + i::after {
    content: "🤣";
  }

  .checkbox + i::after {
    content: "😂";
  }
</style>

<label>
  <input type="checkbox" class="checkbox">
  <i></i>
</label>
```

# 
