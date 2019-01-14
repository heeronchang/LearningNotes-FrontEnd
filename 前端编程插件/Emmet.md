# Emmet 基本使用

输入指定按`tab`键
- 输出相邻的同级标签
`div+p+a`

```
<div></div>
<p></p>
<a href=""></a>
```

- 输出嵌套标签 `div>ul>li`

```
<div>
  <ul>
    <li></li>
  </ul>
</div>
```

**混合输出**

- `div+div>p>span+span`

```
<div></div>
<div>
  <p><span></span></p>
</div>
```

- `div+div>ul>li^p`

```
<div></div>
<div>
  <p><span></span></p>
</div>
```

- `div+div>ul>li>^^p`

```
<div></div>
<div>
  <ul>
    <li></li>
  </ul>
</div>
<p></p>
```

- `ul>li*5`

```
<ul>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

**group()**

- `div>(header>ul>li*3)^footer>p`

```
<div>
  <header>
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </header>
  <footer>
    <p></p>
  </footer>
</div>
```
- 如果没有`group`，`div>header>ul>li*3^footer>p`

```
<div>
  <header>
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <footer>
      <p></p>
    </footer>
  </header>
</div>
```

**标签属性`ID` `Class`**

- `div#header+div.page+div#footer.class1.class2`

```
<div id="header">
</div>
<div class="page">
</div>
<div id="footer" class="class1 class2">
</div>
```

**自定义属性**
- `td[title="Heelo" colspan=3]`

```
<td title="Hello" colspan="3"></td>
```

**不指定属性值**
- `td[colspan title]`

```
<td colspan="" title=""></td>
```

- `ul>li.item$*5`

```
<ul>
  <li class="item1"></li>
  <li class="item2"></li>
  <li class="item3"></li>
  <li class="item4"></li>
  <li class="item5"></li>
</ul>
```
