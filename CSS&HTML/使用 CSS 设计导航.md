# 使用 `CSS` 设计导航

### 1. 导航列表和常规列表的不同

使用列表创建导航元素时，其实就是使用 `CSS` 将内容安装网站访问者预期的导航外观显示。尽管导航元素本质上还是链接的列表，但是这些链接可以清晰地以内容交互的形式显示。
- 用户的鼠标指针改变，以表示该元素可以点击
- 元素周围的区域在鼠标悬停时改变外观，原因同上
- 内容区域在视觉上与常规文本不同，原因同上

相比于使用 `JavaScript` 编程实现，使用纯粹的 `CSS` 创建来自列表项目的导航生成更可用，灵活和搜索引擎友好的显示。

### 2. 使用 `CSS` 创建垂直导航的方法

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    body {
      font: 12pt verdana, Arial;
    }
    #nav {
      width: 150px;
      float: left;
      margin-top: 12px;
      margin-right: 18px;
    }
    #nav a {
      text-decoration: none;
    }
    #nav ul {
      list-style: none;
      margin: 12px 0px 0px 0px;
      padding: 0px;
    }
    #nav li {
      border-bottom: 1px solid #ffffff;
    }
    #nav li a:link, #nav li a:visited {
      font-size: 10pt;
      font-weight: bold;
      display: block;
      padding: 3px 0px 3px 3px;
      background-color: #628794;
      color: #ffffff;
    }
    #nav li a:hover, #nav li a:active {
      font-size: 10pt;
      font-weight: bold;
      display: block;
      padding: 3px 0px 3px 3px;
      background-color: #6cac46;
      color: #000000;
    }
    #nav ul ul {
      margin: 0px;
      padding: 0px;
    }
    #nav ul ul li a:link, #nav ul ul li a:visited {
      font-size: 8pt;
      font-weight: bold;
      display: block;
      padding: 3px 0px 3px 18px;
      background-color: #628794;
      color: #ffffff;
    }
    #nav ul ul li a:hover, #nav ul ul li a:active {
      font-size: 8pt;
      font-weight: bold;
      display: block;
      padding: 3px 0px 3px 18px;
      background-color: #c6a648;
      color: #000000;
    }
    #content {
      width: 550px;
      float: left;
    }
    #content a {
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div id="nav">
    <ul>
      <li><a href="#" >Mission</a></li>
      <li><a href="#" >History</a></li>
      <li><a href="#" >Execute Team</a>
        <ul>
          <li><a href="#">CEO</a></li>
          <li><a href="#">CFO</a></li>
          <li><a href="#">COO</a></li>
          <li><a href="#">Other Minions</a></li>
        </ul>
      </li>
      <li><a href="#" >Contact Us</a></li>
    </ul>
  </div>
  <div id="content">
    <h1>About Us</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <ur>
      <li><a href="#">Mission</a>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
      <li><a href="#">History</a>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li>
      <li><a href="#">Executive Team</a>Excepteur sint occaecat cupidatat non proident, </li>
      <li><a href="#">Contact Us</a>sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
    </ur>
  </div>
</body>
</html>

```

### 3. 使用 `CSS` 创建水瓶导航的方法

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    body {
      font: 12pt verdana, Arial;
    }
    #header {
      width: auto;
    }
    #logo {
      float: left;
    }
    #nav {
      float: left;
      margin: 85px 0px 0px 0px;
      width: 400px;
      background-color: #628794;
      border: 1px solid black;
    }
    #nav ul {
      list-style: none;
      margin: 0px;
      padding: 0px;
      display: inline;
    }
    #nav li {
      display: inline;
      line-height: 1.8em;
    }
    #nav ul li a:link, #nav ul li a:visited {
      font-size: 10pt;
      font-weight: bold;
      text-decoration: none;
      display: inline;
      padding: 7px 10px 7px 10px;
      background-color: #628794;
      color: #ffffff;
    }
    #nav ul li a:hover, #nav ul li a:active {
      font-size: 10pt;
      font-weight: bold;
      text-decoration: none;
      padding: 7px 10px 7px 10px;
      background-color: #6cac46;
      color: #000000;
    }
    #content {
      width: auto;
      float: left;
      clear: left;
    }
    #content a {
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div id="header">
    <div id="logo"><img src="https://cn.vuejs.org/images/logo.png" alt="acme widgets llc"></div>
  </div>
  <div id="nav">
    <ul>
      <li><a href="#" >Mission</a></li>
      <li><a href="#" >History</a></li>
      <li><a href="#" >Execute Team</a></li>
      <li><a href="#" >Contact Us</a></li>
    </ul>
  </div>
  <div id="content">
    <h1>About Us</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <ur>
      <li><a href="#">Mission</a>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
      <li><a href="#">History</a>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li>
      <li><a href="#">Executive Team</a>Excepteur sint occaecat cupidatat non proident, </li>
      <li><a href="#">Contact Us</a>sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
    </ur>
  </div>
</body>
</html>
```

 **Others**

 1. 在导航中将图像作为自定义列表标志：
    可以在列表项目的 HTML 文本中使用图像或者将图像作为 `<li>` 元素中的背景图像。可以像设置其他列表项目样式那样，为导航元素设置样式。HTML 无序列表和基于 CSS 的水平和垂直导航列表的唯一不同是它们的命名，并将无序列表用于文本主题之外的目的。
