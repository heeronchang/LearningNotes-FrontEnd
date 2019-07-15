# HTML 5 的目标

为 Web 平台提供更多的 API，能够不使用 JavaScript 脚本的情况下实现一些功能，让 HTML 代码更简洁。
页面结构清楚明了，减少或不实用 div 标签，使用 HTML 5 提供的更加语义化的结构标签。

标准化各个平台上音频、视频、图像、动画以及同电脑的交互。

## HTML 5 想要解决的问题

1. Web 浏览器之间的兼容性
2. 文档结构不够明确
3. Web 应用程序功能限制

# HTML 5 与 HTML 4 的区别

HTML 5 以 HTML 4 为基础做了大量的修改。

## 语法的改变

关于 HTML 5 的语法解析算法提供了详细的记载，各 Web 浏览器可以把 H5 语法解析器集中封装在自己的浏览器中。
所以，浏览器之间的兼容性问题得到了解决。

### 新增结构元素

- `section` 表示页面中的一个内容区块
- `article` 表示页面中的一块与上下文不相关的独立内容，例如博客中的一篇文章或报纸中的一篇文章。
- `aside` 表示 `article` 元素的内容之外的，与 `article` 元素的内容相关的辅助信息。
- `header` 表示页面中的一个内容区块或整个页面的标题。
- `footer` 表示整个页面或页面中一个区域块的脚注。
- `nav` 表示页面中导航链接的部分。
- `figure` 表示一段独立的流内容，一般表示文档主题流内容中的一个独立单元。使用 `figuration` 元素 `figure` 元素组添加标题。
- `main` 表示网页中的主要内容。
- `video` 定义视频
- `audio` 音频
- `embed` 用来插入各种多媒体
- `mark` 在视觉上向用户呈现那些需要突出或高亮显示的文字。例如搜索结果中显示匹配的关键词。
- `progress` 显示进度条
- `meter` 度量衡，仅用于已知最大值和最小值的度量。
- `timer` 表示日期/时间
- `ruby` 表示 `ruby` 注释（中文注音或字符）
- `rt` 字符的解释或发音
- `rp` 定义不支持 `ruby` 元素的浏览器要显示的内容。
- `wbr` 软换行，与 `br` `的区别是：br` 元素在此处必须换行，而 `wbr` 元素意思是浏览器窗口或父级元素宽度足够宽时，不进行换行，宽度不够时自动换行，对中文用处不大。
- `canvas` 表示图形，比如图表和其它图像。本身没有行为，仅提供一块画布，但把一个绘图 API 展现给客户端 Javascript ，使脚本能够把想绘制的东西绘制到这块画布上。
- `command` 命令按钮，比如单选按钮，复选框。
- `details` 表示用户要求得到并且可以得到的详细信息。它与 `summary` 元素配合使用，`summary` 提供标题或图例。标题是可见的，用户点击标题时，会显示细节信息，`summary` 元素应该是 `details` 元素的第一个子元素。

### 全局属性

- `contentEditable` 指定用户是否可以编辑元素中的内容，该元素必须是可以获取鼠标焦点的元素。
- `designMode` 用来指定整个页面是否可编辑，当页面可编辑时，页面中任何支持 `contentEditable` 的元素都变成了可编辑状态。`designMode` 属性只能在 javascript 脚本中被编辑。取值 `on` 和 `off。`

# HTML 5 结构

## 新增主体结构元素

### time 元素与微格式

微格式是一种利用 HTML 的 class 属性来对网页 添加诸如新闻事件发生的时间、个人电话号码、企业邮箱之类的附加信息的方法。
微格式并不是 H5 之后才有的，在 H5 之前它就和 HTML 结合使用了，但是在使用过程中，日期和时间的机器编码上出现了一些问题，编码过程中会产生一些歧义。H5 只是添加了新的元素来无歧义地、明确地对机器编码日期和时间，并且以让人易读的方式来展现。这个元素就是 time

time 元素代表 24 小时中的某个时刻或某个日期，表示时刻允许带时差。它可以定义很多格式的日期和时间。
在编码时及其读到的部分在 datetime 属性里，而元素的开始标记与结束标记中间的部分显示在网页中。datetime 属性中日期和时间之间要用 T 文字隔开，T 表示时间。Z 表示使用 UTC 标准时间。
```HTML
<time datetime="2019-02-12T09:30+09:00">美国时间 2019-02-12 09:30</time>
```

### pubdate 属性

可选的 boolean 属性，可以用在 article 元素中的 time 元素上，表示 time 元素代表了文章（article 元素的内容）或整个网页的发布日期。

## 新增非主题结构元素

### header

具有引导和导航作用的结构元素，通常用来放置整个页面或页面内的一个内容块的标题，也可以包含其他数据，例如表格，搜索表单或相关的logo图

### footer

和 header 类似

### address

用来呈现联系信息

### main

网页中的主要内容。每个网页中只能放置一个 main 元素。不能把 main 放置在任何 article、aside、header、footer、nav 元素内部。

main 元素不对页面内容进行分区或分块，所以不会对网页大纲产生任何影响。

## 网页结构

### 大纲编排规则

内容区块编排规则分为显式编排和隐式编排。显式编排指明确使用 section 等元素创建文档结构，隐式编排不明确使用 section 等元素，而是根据页面中所书写等各级标题自动创建各级内容区块。

**隐式编排规则**

- 新出现的标题比上一个标题级别低，则生成下级内容区块。
- 新出现的标题比上一个标题级别高或相等，则生成新的内容区块。

### 对新结构元素使用样式

由于浏览器对 H5 支持问题，不知道浏览器是否支持这些新元素，所以需要使用 CSS 通知浏览器页面中使用的 H5 中新增元素都以块方式显示。
```CSS
// 追加 block 声明
article, nav, main, aside, section, header, footer, address,  dialog, figure, legend {
  display: block;
}
// 正常使用
nav { float; left; width: 20%; }
article { float; right; width: 79%; }
```

另外，IE8 及以前的浏览器不支持使用 CSS 的方法使用这些尚未支持的结构元素，为了在 IE8 浏览器中也能使用这些结构元素，需要使用 JS 脚本：

```HTML
<script>
// 在脚本中创建元素
document.createElement("article");
document.createElement("nav");
document.createElement("main");
// ...

</script>
<style>
// 正常使用样式
nav { float; left; width: 20%; }
article { float; left; width: 79%; }
// ...
</style>
```

这些 JS 脚本在其它不需要的浏览器中不会造成不良影响。

# 表单

## 新增的表单内元素可以使用的属性

### 表单内元素的 form 属性

H4 中表单内从属元素必须写在表单内，H5 则可以任何位置，只需要为该元素指定一个 form 属性，值为表单的 id

### 表单内元素的 formaction 属性

H4 一个表单内的所有元素只能通过表单的 action 属性统一提交到另一个页面，H5 则可以所有的提交按钮增加不同的 formaction 属性，
使得在点击不同的按钮时，可以将表单提交到不同的页面
示例：

```HTML
<form id="testform" action="server.jsp">
  <input type="submit" formaction="s1.jsp">提交到s1
  <input type="submit" formaction="s2.jsp">提交到s2
  <input type="submit" formaction="s3.jsp">提交到s3
  <input type="submit">
</form>
```
### 表单内元素的 formmethod 属性

该属性和 formaction 类似

### 表单内元素的 formenctype 属性

与 formaction 类似。该属性是用来指定表单中的数据在提交到服务器之前以何种方式进行编码，可取值如下：
- appliction/x-www-form-urlencoded 默认值，在发送前编码所有字符，当 method 属性为 get 时，浏览器用 x-www-form-urlencoded 的编码方式把表单数据转换成一个字符串（形式如?name=xx&age=18&sex=1），然后把这个字符串添加到提交的目标 URL 地址后面，使其称为新的目标 URL 地址
- multipart/form-data 不对字符编码，文件上传时使用
- text/plain 表单数据中的空格转换为 “+” 号，不对表单数据中的特殊字符进行编码

### 表单元素中的 fromtarget 属性

- _blank 新窗口打开
- _self 默认值，在相同框架中打开
- _top 在当前浏览器窗口打开
- parent 在当前框架的父框架打开
- framename 在指定框架中打开

### autofocus

自动获取焦点

### required

如果元素内容空白，不允许表单提交

### 表单内元素的 labels 属性

Nodelist 对象，表示该元素所绑定的标签元素所构成的集合

### 标签的 control 属性

标签（label 元素）内部可以放置一个表单元素，并且通过该标签的 control 属性来访问该表单元素

### 文本框的 palceholder 属性

显示提示文字

### 文本框的 list 属性

该属性值为某个 datalist 的 id ，datalist 也是 H5 新增的元素，类似于选择框 select，但是用户想要设定的值不在列表中时，可以输入，它本身不显示
当文本获取焦点时以提示输入的方式显示。为了避免在没有支持的浏览器上显示错误，可以用 CSS 将它设定为不显示。

## 新增的表单元素

### figure 和 figcaption 元素

figure 是一种元素组合，带有可选标题，用来表示网页上一块独立的内容，将其从网页上移除后不会对其它内容产生任何影响，figure 元素表示的内容可以是图片、统计图、实例代码。
figcaption 元素表示 figure 元素的标题，它从属于 figure 元素，必须书写在 figure 元素内其它元素的前面或后面。

### 增强的 script 元素

新增 async 和 defer 属性，都是用来加快页面的加载速度，使脚本代码的读取不再妨碍页面上其它元素的加载。
H5 之前，浏览器加载页面时，如果页面上的某个 script 元素引用一个外部 script 脚本文件，浏览器在读取该 script 文件时，会暂停页面的加载，发出一个下载该脚本文件的请求，该脚本文件下载完成后，继续加载页面。async 和 defer 就是用来解决这个性能问题的：
```HTML
<script async src="script.js" onload="asyncInit()"></script>
<script defer src="script.js" onload="deferInit()"></script>
```
使用这两个属性时，浏览器在开始下载脚本时，会立即继续执行页面的加载工作，脚本下载完毕会触发 onload 事件。
async 和 defer 的区别：
async 会在脚本下载完毕后立即执行该脚本文件的 onload 函数，defer 则是等到页面全部加载完毕后，按照脚本文件的引用顺序来执行这些脚本文件的 onload 函数。

## 新增表单内元素内容有效性验证方法

# 绘制图像

## 绘制的基本流程

- 获取 `canvas`，`document.getElementById`
- 获取上下文 `context`，`let context = canvas.getContext('2d')`
- 设置绘制样式，填充样式，线宽，`fillStyle`，`strokeStyle`，`lineWidth`
- 绘制简单图形：`fillRect` `strokeRect` `clearRect`
- 路径绘制：
1. 开始创建路径：`context.beginPath()`；
2. 创建路径；
3. 结束创建路径：`context.closePath()`；
4. 绘制：`context.fill()`

- `moveTo` `lineTo` `arcTo` `bezierCurveTo`
- `lineCap` `lineJoin` `setLineDash`
- path2D 对象作为路径
- 绘制渐变色 `context.createLinearGradient(xStart, yStart, xEnd, yEnd)` `context.addColorStop(offset, color)`
- 绘制径向渐变 `context.createRadialGradient(xStart, yStart, radiusStart, xEnd, yEnd, radiusEnd)`
- 绘制变形图形
1. 平移 `context.translate(x, y)`
2. 缩放 `context.scale(x, y)`
3. 旋转 `context.rotate(angle)`
- 矩阵变换 `context.transform(m11, m12, m21, m22, dx, dy)`
- 绘制阴影 `shadowOffsetX` `shadowOffsetY` `shadowColor` `shadowBlur`
- 绘制图像 `context.drawImage(image, x, y)` `context.drawImage(image, x, y, w, h)` `context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)`
- 平铺图像 `context.createPattern(image, type)`
- 图像裁剪 只绘制路径包括区域内的图像。创建路径，调用 `context.clip()` 设置裁剪区域，绘制图像 `context.drawImage(image, x, y, w, h)`。
- 像素处理。`var imageData = context.getImageData(sx, sy, sw, sh)`
- 图形组合 `context.globalCompositeOperation=type`
- 混合图像：
```javascript
context.globalCompositeOperation = "darken"
var image = new Image();
image.src = 'one.jgp';
image.onload = function() {
  context.drawImage(image, 0, 0);
  var image2 = new Image();
  image2.src = 'two.jpg';
  image2.onload = function() {
    context.drawImage(image2, 0, 0);
  }
}
```
- 绘制文字 `fillText(text, x, y, [maxWidth])`
- 保存与恢复状态 `save` `restore`
- 保存文件 `canvas.toDataUrl(type)`
- 简单动画 `setInterval(rotate, 1000)`

# 多媒体

video audio

## 播放事件处理

`video.addEventListener(type, listener, useCapture)`
type 为事件名称，listener 表示绑定的函数，useCapture 是一个布尔值，表示在事件捕获阶段响应函数还是在事件响应传递阶段响应函数。

## 为音频视频添加字幕

### track 元素的基础知识

H5 可以用 track 元素为 video 元素播放的视频或使用 audio 元素播放的音频中添加字幕，标题或章节等信息。

track 能够为 video audio 元素指定媒体轨道。也就是 track 元素可以沿着 audio 元素播放的音频文件中时间轴或 video 元素播放的视频文件中的时间轴而指定时间同步的文字资源。

在 track 元素中，使用内部包含了一系列时间标记的文本文件，这些时间标记中可以包含诸如 JSON、CSV 之类格式的数据。

在使用 track 元素时，track 元素必须是 audio 元素或 video 元素的子元素，并且在使用 track 元素时，不能使用带有 “file://” 前缀的 URL 地址。

### track 元素的各种属性

track 除了可以使用任何全局属性，本身具有 `kind`, `src`, `srclang`, `default` 属性。

- default：
默认使用 该 track 文件。不允许在 audio video 元素中使用多个指定了 default 的 track 元素。
- src ：
字幕文件的存放路径，必须值，可以是绝对路径和相对路径。
- srclang：
用于指定字幕文件的语言，必须是一个有效的 BCP47 语言。
- kind：
kind 属性用来指定字幕文件的种类，默认是 subtitles，可取的值有：subtitles, captions, descriptions, chapters, metadata。

# History API

## History API 基本概念，H5 中新增的方法与事件

## 如何通过 JS 脚本代码使用 History API 在浏览器的历史记录中添加记录

## 如何保存当前页面的各种状态

## 如何控制浏览器地址栏中 URL地址的显示

# 离线应用程序

## 离线 web 应用程序

离线 web 应用程序是指，当客户端本地与 web 应用程序当服务器没有建立连接时，也能正常在客户端本地使用该 web 应用程序进行有关操作。

web 应用程序的一个致命缺点是，如果用户没有和 Internet 建立连接，web 应用程序就不能再使用了。

H5 新增了一个 API，它使用本地缓存机制，解决了这个问题。

## 本地缓存和浏览器网页缓存的区别

1. 本地缓存是为整个 web 应用程序服务的，而浏览器网页缓存只服务于单个网页
2. 本地缓存可以只缓存我们指定的页面，增加了安全性、可靠性。而浏览器网页缓存具有不确定性。
3. 我们可以用编程手段控制本地缓存的更新，利用缓存对象的各种属性、状态和事件来开发出更加强大的离线应用程序。

## mainifest 文件

用来管理 web 应用程序的本地缓存，可以指定一个总的 mainifest 文件，或者每一个页面都指定一个单独的 mainifest 文件。

``` mainifest
# 文件的开头必须要写 CACHE MAINIFEST
CACHE MAINIFEST
# mainifest 文件的版本号
version 201902211010
# CACHE: 指定需要被缓存在本地的资源文件。为某个页面指定需要本地缓存的资源文件时，不需要把这个页面本身指定在 CACHE 类别中，因为如果一个页面具有 mainifest 文件，浏览器会自动对这个页面进行缓存
CACHE:
other.html
hello.js  
images/myphoto.jpg
# NETWORK 类别为显式指定不进行缓存的资源文件，这些资源文件只有与服务器建立连接时才能访问，通配符 “*” 表示没有在本 mainifest 文件中指定的资源都不进行本地缓存。
NETWORK:
http://heeronchang/sample
sample.asp   
*
# FALLBACK 类别中每行指定两个资源文件，表示能够与服务器建立连接时访问第一个资源文件，否则访问第二个资源文件。
FALLBACK:
online.js local.js      
CACHE:
newhello.html   
newhello.js
```

真正运行或测试离线 web 应用程序的时候，还需要配置服务器，让服务器支持 text/cache-mainfest 这个 MIME 类型。为了让浏览器能够阅读 mainifest 文件，需要在 web 应用程序页面上的 html 标签的 mainifest 属性中指定 mainifest 文件的 URL 地址。

```HTML
<html mainifest="hello.mainifest">
...
</html>
```

## 浏览器与服务器的交互过程

例如一个 http://heeronchang 网站，以 index.html 为主页，该主页 mainifest 文件使用 index.mainifest 文件，mainifest 指定本地缓存 index.html, hello.js, hello.jpg 这几个资源文件。
**首次访问**
1. 浏览器请求访问 http://heeronchang
2. 服务器返回 index.html 网页
3. 浏览器解析 index.html 网页，请求页面上所有资源文件，包括 HTML 文件、图像文件、CSS 文件、JS 脚本文件以及 mainifest 文件(如果指定了)
4. 服务器返回所有资源
5. 如果能够成功请求下来指定的 mainifest 文件，浏览器处理 mainifest 文件，请求 mainifest 中所有要求本地缓存的文件，包括 index.html 页面本身，即使刚才已经请求过这些文件。如果缓存所有文件，这将是一个比较大的重复的请求过程
6. 服务器返回所有要求本地缓存的资源
7. 浏览器触发 downloading 事件并周期性触发 progress 事件，下载完毕触发 cached 事件。浏览器对本地缓存进行更新，存入包括页面本身在内的所有要求本地缓存的资源，并触发一个事件，通知本地缓存被更新

浏览器本地缓存更新完毕

**再次访问且 mainifest 文件没有被更新**
1. 浏览器再次请求访问 http://heeronchang
2. 浏览器发现 index.html 这个页面被本地缓存，于是使用本地缓存中的 index.html 页面
3. 浏览器解析 index.html 页面，使用所有缓存中的资源
4. 浏览器向服务器请求 mainifest 文件
5. 服务器返回一个 304 代码，通知浏览器 mainifest 没有发生变化

只要页面上的资源被本地缓存过，下次浏览器打开页面时，总是先使用本地缓存中的资源，然后请求 mainifest 文件

**再次访问且 mainifest 文件被更新**
1. 浏览器再次请求 http://heeronchang
2. 浏览器发现 index.html 页面被本地缓存，于是使用本地缓存中的 index.html 页面
3. 浏览器解析 index.html 页面，使用所有本地缓存中的资源文件
4. 浏览器向服务器请求 mainifest 文件
5. 服务器返回更新过的 mainifest 文件
6. 浏览器处理 mainifest 文件，请求所有要求进行本地缓存的资源文件，包括 index.html 页面本身
7. 服务器返回所有要求本地缓存的资源
8. 浏览器对本地缓存进行更新，存入所有新资源文件，并且触发一个事件，通知本地缓存被更新

需要注意的是，即使资源文件被修改过了，3 中已经载入的资源文件也不会发生变化，只有重新打开这个页面时才会使用更新过的资源

## applicationCache 对象

可以用来通知用户本地缓存已经被更新，也允许用户手动更新本地缓存。

当浏览器对本地缓存进行更新时，会触发 applicationCache 对象的 updateready 事件

```javascript
applicationCache.onUpdateReady = function() {
  // 本地缓存已被更新
}
```

swipCache 用来手动更新本地缓存，它只能在 updateReady 事件触发时调用

使用场景，如果本地缓存容量非常大（譬如超过100M），本地缓存的更新工作将需要较长的时间，并且还会把浏览器锁住，这时最好给用户一个提示
```javascript
applicationCache.onUpdateReady = function() {
  // 本地缓存已经被更新，通知用户
  alert('正在更新本地缓存(^_^)');
  applicationCache.swipCache(); // 此时不调用 swipCache 方法，本地缓存将在下次打开页面时被更新
  alert('本地缓存更新完毕，刷新页面使用')
}
```

applicationCache.update() 检查服务器上 mainifest 文件是否有更新。

# 文件 API

读取文件内容的 FileReader API, 存取受浏览器沙箱保护的文件系统的 FileSystem API。

## FileList 对象和 file 对象

FileList 对象是 file 控件选择的文件列表对象，file 对象是 FileList 列表对象中的单个文件，file 对象有 name 和 lastModifiedDate 两个属性。

## ArrayBuffer 和 ArrayBufferView

访问原始二进制数据，在 H5 之前通常是将原始二进制数据转为代表二进制的字符串，并使用 charCodeAt 方法读取其中的每一个字节，这种方式效率低，且经常会产生许多错误，例如原始二进制数据的数据类型并不是字节类型，而是整型或浮点型。

H5 提供了更加高效的处理方式：ArrayBuffer 和 ArrayBufferView。一个 ArrayBuffer 对象代表一个固定长度的用于装载数据的缓冲区，通常这些数据来自网络或文件。不能直接对其中的内容进行操作，需要使用 ArrayBufferView 对象来读写 ArrayBuffer 中的内容。ArrayBufferView 对象将缓冲区中的数据转换为各种数值类型的数组。

一般不直接使用 ArrayBufferView 对象，而是使用继承自它的响应的子类对象
Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array

## Blob 对象

Blob 代表原始二进制数据，上面的 file 对象继承自 Blob 对象。

Blob 有两个属性，size 表示 Blob 对象的字节长度，type 表示 Blob 对象的 MIME 类型，未知类型返回空字符串。

图像类型的文件 Blob 对象的 type 属性都是以 “image/” 开头，后跟图像类型，以此可以沿着选择的是否是图像文件。

## FileReader 对象

把文件读入内存，读取文件中的数据
- readerAsText 读取为文本数据
- readerAsBinaryString 读取为二进制字符串
- readerAsDataUrl 读取为 DataUrl
- readerAsArrayBuffer 读取为 ArrayBuffer
- abort 中断读取操作

事件
- onabort 中断读取
- onerror 读取错误
- onloadstart 读取完成触发，无论成功失败

```JavaScript
const reader = new FileReader();
reader.readAsDataUrl(file);
reader.onload = function(e) {
  console.log(e.result)
}
```

## FileSystem API

- 每一个域中的文件系统只能被该域专用，不能被其它域访问
- 存储在永久文件系统中的数据不能被浏览器在用户不知情的情况下删除，除非通过一个不需要通知用户的方法调用，存储在临时文件系统中的数据可以被浏览器自行删除
- 当应用程序中连续发出多次对文件系统的操作请求时，每一个请求都将得到响应，同时第一个请求中所保存的数据可以被之后的请求立即得到。

### 请求访问文件系统

```JavaScript
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem
window.requestFileSystem(type, size, successcallback, opt_errorcallback)
```
type 取值：window.TEMPORARY(临时存储空间), window.PERSISTENT(永久存储空间)

### 申请磁盘配额

### 创建文件

文件系统对象具有一个 root 属性，是一个 DirectoryEntry 对象，代表文件系统的根目录对象，用它的 getFile 方法创建文件

```JavaScript
window.requestFileSystem(window.TEMPORARY, 1024*1024,
  // 请求文件系统成功回调
  function(fs) {
    fs.root.getFile(
        filename,
        { create: true },
        // 参加文件成功回调
        function(fileEntry){

        },
        errorHandler
      )
    })
```

`getFile` 方法有四个参数：
1. filename
2. 自定义对象，创建文件时，对象的 create 属性设置为 true；读取文件时设置为 false
3. 成功回到函数
4. 失败回调函数

FileEntry 对象具有属性 isFile, isDirectory, name, fullpath, filesytem

# 通信 API

跨文档消息传输、使用 WebSockets API 来通过 socket 端口传递数据、通过 Server-Sent Events API 将服务端事件主动推送到客户端

- 跨文档消息传输
可以在不同的网页文档、不同端口、不同域之间进行消息的传递

- 使用 WebSockets API 来通过 socket 端口传递数据
这样做的好处是可以实现数据推送技术——服务器端不再是被动地等待客户端发出的请求，只要客户端与服务器端建立了一次连接之后，服务器端就可以在需要的时候，主动地将数据推送到客户端，直到客户端显示关闭这个连接。

- 通过 Server-Sent Events API 将服务端事件主动推送到客户端
服务器端可以每隔一段时间主动向客户端发送一个携带数据的事件，客户端在接收到该事件后可以使用该事件中所携带的数据进行页面上内容的更新或其它一些必要的处理。


### 利用跨文档通信实现不同页面、不同端口、不同域之间的消息传递

#### 接收消息、发送消息
```JavaScript
// 接收消息
window.addEventListener("message", function() {
  // ...
}, false)

// 发送消息
window.postMessage(message, targetOrigin);
```

### 实现通道通信

注意：
1. 接收页面加载完成之后才能进行 `postMessage` 跨域通信
2. 如果不是使用 `window.open()` 打开的页面或者 `iframe` 嵌入的页面，就跟当前页面扯不上关系，是无法使用 window.postMessage() 进行跨域通信的
3. `window` 始终是要通信的目标页面的 window。（1. PageA 内嵌 `iframe` 一个 PageB：PageA 向 PageB 发送跨域信息，`window` 是 PageB 页面的 `window`，即 `iframe.contentWindow` 。PageB 向 PageA 发送跨域信息，`window` 是 PageA 的 `window`，即 `top` 或者 `window.parent` 。2. PageA 内代码使用 `window.open()` 打开 PageB：PageA 向 PageB 发送跨域信息，`window` 为 `var pageB = window.open('http://xxx')` 中的变量 `pageB`。PageB 无法主动向 PageA 发送跨域信息，必须先接收到 PageA 发送过来的 `message` 然后再通过 `event.source` 发送给 PageA，此时 `window` 就是 `event.source` 即 PageA 的 `window` 。
[参考](https://github.com/Monine/monine.github.io/issues/2)

### WebSocket 通信技术

H5 提供的在 Web 应用程序中客户端与服务器端之间进行的非 HTTP 的通信机制。

#### 使用 WebSockets API

1. 建立通信连接
`var webSocket = new WebSocket("ws://localhost:8081/socket")`

URL 字符串作为参数，字符串必须以 "ws" 或 "wss"（加密通信时）文字作为开头。

2. 发送数据，只能发送文本数据，或 JSON 字符串
`websocket.send("data")`

3. 接收消息
```JavaScript
webSocket.onmessage = function(event) {
  const data = event.data;
}
```

4. 监听 socket 的打开事件
```JavaScript
webSocket.onopen = function(event) {}
```

5. 监听 socket 的关闭事件
```JavaScript
webSocket.onclose = function(event) {}
```

6. 关闭 socket
```JavaScript
webSocket.close();
```

### Server-Sent Events API 基本概念和使用方法

服务器端发送一些事件，由客户端接收。该 API 和 WebSockets API 相似之处在于都是服务器端主动发送数据，但是该 API 实现的是一种从服务器端向客户端发送数据的单向通信机制。

# WebRTC 通信

WebRTC 的目标就是实现一个让电话、电视以及计算机都能够进行通信的公共平台，一个可以点对点视频聊天的 Web 应用程序。

## WebRTC 基本概念

RTC（Real Time Communication)

WebRTC 包含三个 API：
1. MediaStream (getUserMedia)
2. RTCPeerConnection
3. RTCDataChannel

## 使用 MediaStream（getUserMedia）访问本地设备

通过 getUserMedia 可以不通过插件之间访问客户端本地的摄像头和麦克风设备

### 浏览器检测

```JavaScript
function hasGetUserMedia() {
  return (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
}
if (hasGetUserMedia()) {
  alert("支持");
} else {
  alert("不支持");
}
```

### 获取视频输入设备或音频输入设备的访问权限

```javascript
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
  window.navigator.mozGetUserMedia;
window.URL = window.URL || window.webkitURL;

const video = document.getElementById('myVideo');
navigator.getUserMedia({
    video: true,
    audio: false
  },
  function(stream) {
    // video.src = window.URL.createObjectURL(stream);
    video.srcObject = stream;
  },
  function(err) {
    console.log(err);
  })
```

回调函数的参数 stream 是一个 MediaStream 对象，代表同步媒体数据流。每一个 MediaStream 对象
都有个字符串类型的 ID 属性，以标识每一个同步媒体数据流。该对象的 getAudioTracks() 方法或 getVideoTracks()
方法将返回一个 MediaStreamTrack 对象数组。每一个 MediaStreamTrack 对象代表一个视频/音频轨道，MediaStreamTrack 对象具有一个 kind 属性，标识轨道种类，例如 ‘video’ 或 ’audio’，还有一个
字符串类型的 label 属性，标识视频通道/音频通道。

### 实现拍照功能

```JavaScript
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
  window.navigator.mozGetUserMedia;
window.URL = window.URL || window.webkitURL;

const video = document.getElementById('myVideo');
video.addEventListener('click', snapshot, false);

let localMediaStream = null;
navigator.getUserMedia({
    video: true,
    audio: false
  },
  function(stream) {
    // video.src = window.URL.createObjectURL(stream);
    video.srcObject = stream;
    localMediaStream = stream;
  },
  function(err) {
    console.log(err);
  });

  function snapshot() {
    if (localMediaStream) {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      console.log('draw');
      document.getElementById('img').src = canvas.toDataURL('imgage/png');
    } else {

    }
  }
```
## 建立 WebRTC 通信

### WebRTC 通信的基本概念

WebRTC 通信指实时取得的音视频等数据流（字节流）在浏览器之间进行通信，即 RTCConnection，它具有两个特征：
1. Peer-to-Peer(p2p通信)：浏览器与浏览器之间的直接通信。
2. 使用 UDP/IP：虽然不想 TCP/IP 那样确保每一个字节的到达，但是网络负荷量较小。与数据的可靠性相比，更重视实时性。UDP 端口号可以动态分配，范围在 49125～65535 之间。

### 建立 P2P 通信

首先需要知道对方的 IP 地址和动态分配的 UDP 端口号，因此需要先使用 WebRTC 交换一些信息。
1. Session Description Protocol(SDP)
SDP 是一种会话描述协议，以字符串的形式显示如下一些浏览器信息：
  - 浏览器之间所进行的会话中将要使用的媒体种类（音频/视频）、媒体格式（codec）。
  - 通信双方所使用的 IP 地址和端口号。
  - P2P 数据传输协议，在 WebRTC 中为 Secure RTCP。
  - 通信时使用的宽带。
  - 会话属性（名称、标识符、激活时间）。
2. Interactive Connectivity Establishment(ICE)
ICE 是一种在以 UDP 为基础的请求/回答模式的多媒体会话用于实现 NAT 穿越的协议。它以清单的形式描述 P2P 通信时
可以使用的通信途径：
  - 使用 P2P 进行直接通信
  - 使用 STUN（为了穿越 NAT 而进行端口映射）实现突破 NAT 网关的 P2P 通信
  - 使用 TURN 中继服务器进行突破防火墙的中继通信
ICE 协议在网络上通过最短途径（网络负荷最小的途径）选择被发现的候选者，并按优先级依序列举这些候选者。

# 扩展的 XMLHttpRequest API

### 新增 respondType 属性与 response 属性

以请求二进制数据。H5 之前需要 XMLHttpRequest 对象的 overrideMimeType 方法重载 MimeType `xhr.overrideMimeType('text/plain; charset=x-user-defined')`

**responseType 属性：**
用于指定服务器返回数据的数据类型：text（默认），arrayBuffer，blob，JSON，document。
**response属性**
请求成功返回 response

### 发送数据

H5 之前大多数浏览器只能通过 XMLHttpRequest 对象的 send 方法向服务器发送字符串或 Document 对象（代表一个 XML 文档）。

H5 则可以使用 send 发送字符串、Document 对象、表单数据、Blob 对象、文件以及 ArrayBuffer 对象。

一个文件是一个 Blob 对象。可以使用 Blob 的方式发送文件。示例：

```javascript
let buffer = new ArrayBuffer(dataArr.length);
let byteArray = new Int8Array(buffer);
for(let i = 0; i < tmpArray.length; i ++) {
  byteArray[i] = tmpArray[i];
}

const xhr = new XMLHttpRequest();
xhr.open('POST', 'xx.js', true);
xhr.send(buffer);
```
### 跨域数据请求

H5 实现以 AJAX 方式请求得到另一个域的数据：只需要在该域中提供一个服务端的脚本文件来响应这个请求，返回该请求所需的数据即可，服务端返回响应的响应头信息中添加 Access-Control-Allow-Origin 参数指定为允许向该页面请求数据的域名+端口号，“*”代表所有域。

# 获取地理位置信息

H5 中为 window.navigator 新增了 geolocation 属性，用来获取用户位置信息

### 获取当前地理位置

```JavaScript
// 获取成功，获取失败，可选属性
getCurrentLocation(onSuccess, onError, options);
```
获取地理位置成功的回调函数有一个参数 position 对象。

第三个可选参数列表：
- enableHighAccuracy
- timeout
- maximumAge 对地理位置信息缓存对有效时间（单位毫秒）

### 持续监听当前地理位置信息

`int watchCurrentPosition(onSuccess, onError, options)`

返回值 int 与 setInterval 返回值类似，可以使用 clearWatch 清除监听

### 停止获取当前用户的地理位置信息

`void clearWatch(watchId)`

### position 对象

获取成功的回调函数中通过 position 对象获取地理位置信息

- latitude
- longitude
- altitude
- accuracy   
- altitudeAccuracy
- heading
- speed
- timestamp

### 在页面上使用 Google 地图

# 拖放 API 与 通知 API

## 拖放 API

### 实现拖放的步骤

1. 将想要拖放的元素的 dragable 设置为 true，img 和 a（必须指定 href）默认允许拖放。
2. 编写与拖放有关的事件处理代码

拖放有关的几个事件：

被拖放的元素
- dragstart: 开始拖放操作
- drag: 拖放过程
拖放过程中鼠标经过的元素
- dragenter: 被拖放的元素开始进入本元素的范围内
- dragover: 被拖放的元素正在元素范围内移动
- dragleave: 被拖放的元素离开本元素范围
被拖放的目标元素
- drop: 有其它元素被拖放到了本元素中
被拖放的元素
- dragend: 拖放操作结束

开始拖动时要把拖动的数据利用 setData() 存入 DataTransfer 对象，setData() 第一个参数表示携带数据的数据种类的字符串，第二个参数为要携带的数据。

针对拖放的目标元素，必须在 dragend 或 drageover 事件内阻止默认事件 `事件对象.preventDefault()`，因为默认情况下目标元素是不允许接受元素的，为了把元素拖放到其中，必须关闭默认处理。

目标元素接受被拖放的元素后，调用 getData() 从 Datatransfer 那里获得数据。

另外，目标元素的 drop 事件中关闭默认处理、整个页面关闭默认处理（页面是先于其它元素接受拖放的，如果页面上拒绝拖放，那么页面上的其它元素也就不能接受拖放了）。

现在支持拖放处理 MIME 类型有：
- text/plain: 文本文字
- text/html: HTML 文字
- text/xml: XML 文字
- text/uri-list: URL 列表，每个 URL 为一行。

#### DataTransfer 对象的属性与方法


# Page Visibility API

该 API 让开发者知道一个 Web 页面在何时变为可见或获取焦点。

#### 实现 Page Visibility API

1. 检测浏览器是否支持
`document.hidden` `document.mozHidden` `document.msHidden` `document.webkitHidden`

2. 监听 visibilityState
`document.visibilityState` 取值 visible,hidden,prerender
document.addEventListener(visibilityChange, function() {
  if (document["hidden"]) {}
}, false)

# FullScreen API

根据 DOM 对象的根结点对象 document.documentElement 或元素的 requestFullScreen 判断浏览器是否支持全屏。

通过 DOM 对象或某个元素的 exitFullScreen 方法或 CanvelFullScreen 退出全屏状态。

事件：fullscreenchange

# 锁定鼠标指针 API

鼠标指针锁定 API 是一个关于鼠标指针的移动信息（不是鼠标光标的绝对位置信息）的 API。它允许开发者获取鼠标指针的移动信息，将鼠标事件锁定到单个目标元素上，消除对于鼠标指针在某个方向上可移动距离的限制，同时从屏幕上移除（本来可见的）鼠标指针。

当应用程序中需要控制鼠标指针的移动或旋转某个对象时，该 API 将变得非常有用。

目前使用鼠标指针锁定 API 需要把元素设定为全屏状态
`pointerLockElement.requestPointerLock();`

取消锁定 `document.exitPointerLock();`

事件 `pointerlockchange`

# 高性能实现动画 requestAnimationFrame

window.requestAnimationFrame 可以高质量的同时执行使用 js 脚本实现的动画与 CSS 中 transition 样式属性的动画。

通过 window.requestAnimationFrame 方法，用户切换浏览器标签时，页面中动画会被暂停，减少 CPU，GPU 与内存的消耗。

使用：
```JavaScript
window.requestAnimationFrame = (function() {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  ..  ||
  window.msRequestAnimationFrame ||
  function () {
    window.setTimeout(callback, 1000 / 60 );
  };
})();
```

# 检测页面变化 Mutation Observer

```javascript
function onchange(mutationRecords, mutationObserver) {
  // 检测到 DOM 变化
}
const div = document.getElementById('div');
options = {
  childList: true,
  attributes: true,
  characterData: true,
  ...
};

const mo = new mutationObserver(onchange);
mo.observe(div, options);

```
