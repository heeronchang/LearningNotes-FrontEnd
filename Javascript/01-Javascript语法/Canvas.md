# Canvas

canvas 是可以使用脚本来绘制图像的 HTML 元素

目前所有主流浏览器都支持 canvas。

canvas 的默认大小 是 300X150（单位px）。可以利用它的 width 和 height 设置宽高，也可以使用 CSS 设置宽高。
在使用 CSS 设置宽高时，图像在绘制时会伸缩以适应它的框架，可能出现图像扭曲。

## createPattern()

图像作为源时不能预期显示的问题：

通过创建一个临时的 canvas， 在该临时的 canvas 上通过 drawImage() 方法，对图片进行缩放，然后再把该临时 canvas 当作 createPattern 的源。

```JavaScript
function draw() {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');

  const img = new Image();
  img.src = './柴犬.jpeg';
  img.onload = function() {
    const canvas2 = document.createElement('canvas');
    canvas2.height = 150;
    canvas2.width = 150;
    const ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(img, 0, 0, 150, 150);

    const ptrn  = ctx.createPattern(canvas2, 'repeat');
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, 150, 150);
  }
}
```

## 变形

### 画布状态的保存（save）和恢复（restore）

画布的状态存储在栈中， 每当调用一次 save 方法，当前的状态就被推送到栈中保存。调用一次 restore 方法就从栈中弹出一个保存的状态。
save 可以任意多次。

- save() 保存画布的所有状态

save 会保存当前应用的变形（移动、旋转和缩放）：`strokeStyle` , `fillStyle` , `globalAlpha` , `lineWidth` , `lineCap` , `lineJoin` , `miterLimit` ,
`shadowOffsetX` , `shadowOffsetY` , `shadowBlur` , `shadowColor` , `globalCompositeOperation` 

当前的裁剪路径 （clipping path）

- restore() 恢复之前保存的画布状态
  
## 合成裁剪

在已有图形后面再画新图形，覆盖指定区域，清除画布中的某些部分（清除区域不限于矩形，像 clearRect 方法那样）。

### globalCompositeOperation

设定了在画新图形时采用的遮盖策略。

### 裁剪

裁剪路径和普通 canvas 图形路径差不多，只不过裁剪路径的作用是遮罩，隐藏不需要的部分。
它类似于 `globalCompositionOperation = source-in / source-atop` 区别是裁剪路径永远不受新图形的影响。

#### `clip()` 

把当前正在构建的路径转换为当前的裁剪路径。

## 像素操作

### ImageData 对象

通过 ImageData 对象可以操纵像素数据，直接读取或将数据数组写入该对象中。可以用来反锯齿、从画布中保存图像。

ImageData 中存储着 canvas 对象中真实的像素数据：
- width 图宽度
- height 图高度
- data Uint8ClampedArray 类型的一维数组，包含 RGBA 格式的整型数据
  每个像素用四个 1 btye 值（按照红绿蓝和透明值的顺序）来代表。
  Uint8ClampedArray 包含 width * height * 4 bytes 数据。
  

#### 创建一个 ImageData 对象

1. `let myImageData = ctx.createImageData(width, height);`

创建了一个具有特定尺寸的 ImageData 对象，所有像素被预设为透明黑

2. `let imageData = ctx.createImageData(anotherImageData);`

通过已存在的 anotherImageData 创建一个相同像素的 imageData。新对象被预设为透明黑，并非复制了图片数据。

#### 获取场景像素数据

`getImageData()`

``` JavaScript
let imgData = ctx.getImageData(left, top, width, height);
```
任何画布以外的像素都被返回透明黑。

#### 在场景中写入数据

`ctx.putImageData(myImgData, dx, dy)`

#### 缩放和反锯齿

`drawImage()` 和 `imageSmothingEnabled` 配合实现图片局部缩放

#### 保存画布中图像

`toDataURL('image/png')` 默认创建一个 png 图片

`canvas.toDataURL('image/jpeg', quality)` quality 0-1 图片质量。

`canvas.toBlob(cb, type, encoderOptions)` 生成一个 Blob 对象。

## 性能优化

- 在离屏 canvas 上预渲染相似的图形或重复的对象
- 避免浮点数的坐标点，用整数取代

浮点数的坐标点会发生子元素渲染，浏览器为了达到抗锯齿的效果会进行额外的运算。为避免这种情况，在 drawImage() 时，
用 Math.floor() 对所有坐标取整。

- 不要在 drawImage() 时，缩放图像，可以在离屏 canvas 中缓存图像尺寸
- 使用多层画布画一个复杂的场景
- 用 CSS 设置大背景图
- 用 CSS transforms 特性缩放画布，它调用 GPU 更快捷
- 关闭透明度，当不需要使用透明度时，在获取画布上下文时关闭透明度 `const ctx = canvas.getContext('2d', {alpha: false});`
- 将画布度函数调用集成在一起（例如，画一条折线，而不是多条分开的直线）
- 避免不必要的画布状态改变
- 渲染画布中的不同点，而非整个新状态
- 尽可能避免 shadowBlur 特性
- 尽可能避免 textRendering
- 使用不同的方法清除画布，clearRect, fillRect, 调整 canvas 尺寸
- 动画使用 window.requestAnimationFrame() 而非 window.setInterval()
- 谨慎使用大型物理库



