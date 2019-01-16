# Nodejs API 学习

## 模块系统

模块化是具有文件作用域，满足一定通信规则：加载 `require` 和导出 `exports`。

`require` 加载规则：优先从缓存加载，若缓存中不存在，如果是文件路径的模块 `require('./foo.js')` 直接加载对应的文件，如果是非文件路的文件 `require('art-template')` 则先在当前目录中的 node_modules 目录中找响应的模块：
- `node_modules/art-template`
- `node_modules/art-template/package.json` 文件
- `node_modules/art-template/package.json` 文件中的 `main` 属性
- `main` 属性记录了 `art-template` 的入口文件
- 然后加载这个第三方模块（**本质上还是加载的文件**）
- 如果 `package.json` 文件不存在，或者 `main` 指定的入口文件不存在，`Nodejs` 会自动尝试加载 `node_modules/art-template` 文件中的 `index.js` 文件

如果在当前目录中没有找到，则依次到上一级查找，直到磁盘根目录。如果最终没有找到则报错：`can not find module xxx`

`Nodejs` 中 `exports` 是 `module.exports` 的一个引用。

### CommonJS 模块规范

在 `Nodejs` 中的 `Javascript` 具有一个模块系统。

- 模块作用域
- 使用 `require` 加载模块
- 使用 `exports` 导出模块

### 核心模块
不需要安装 `npm i xx`

- `fs` 文件操作
- `Http` http 服务
- `Url` 路径操作
- `path` 路径处理
- `OS` 操作系统


### 第三方模块
需要安装

- `art-template` 模板渲染
