# Npm

## npm 概述
npm 是 node package manager 的简写。

每个项目都应该有一个 `package.json` 文件。可以在终端使用 `npm init` 指令生成。


## npm 常用指令

- `npm i --global` npm 升级 npm
- `nmp --version` npm 版本
- `npm init -y` 跳过向导，快速生成
- `npm install` 把 `dependencies` 中的包一次性安装
- `npm i xxx` 安装包 xxx
- `npm i xxx --save` 安装包并保存依赖项（`package
.json` 中的 `dependencies）`
- `npm uninstall xxx` 删除包 xxx ，如果有依赖项，依赖项依然存在。
- `npm uninstall --save` 删除包且删除依赖项


使用 cnpm 的两种方式：
- 全局安装 cnpm （`npm i cnpm --global`），然后使用 `cnpm i xx`。
- 全局配置包安装源 `npm config set registry https://registry.npm.taobao.org`，使用 `npm config list` 查看

# config-lite

config-lite 是一个轻量的读取配置文件的工具。

它会根据环境变量 `NODE_ENV` 的不同从当前执行进程目录下的 config 目录加载不同的配置文件。默认读取 default 配置文件。

如果设置了 `NODE_ENV` 则会合并指定的配置文件和 default 配置文件作为配置。config-lite 支持 .js, .json, .node, .yml, .yaml 后缀的文件。

如果程序以 `NODE_ENV = test node app` 启动，则通过  `require('config-lite')`
会依次降级查找 config/test.js, config/test.json, config/test.node, config/test.yml,
config/test.yaml 并合并 default 配置。

如果程序以 `NODE_ENV=production node app` 启动，则会依次降级查找 config/production.js,
config/production.json, ... 并合并 default 配置。

# connect-history-api-fallback

单页面应用程序使用 H5 的 History API。

由于单页面应用程序一般只提供一个 index.html 供浏览器访问。一般程序中的导航使用 H5 的
History API 实现。这样就会有一些问题：用户点击 refresh 按钮，或者直接访问非登陆页，此时，
web 服务器就会获取资源失败并返回 404。

# cookie-parser

```javascript
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
  // Cookie that have not been signed
  console.log('Cookie:', req.cookies);
  // Cookie that have been signed
  console.log('Signed Cookie', req.signedCookies);
})

app.listen(8080);
```

# chalk

Terminal string styling done right.

# connect-mongo

MongoDB session store for Connect and Express

# session

node-session package for nodejs.

- write storage memcached
- write storage sqlite
- write storage file
- write storage couchdb, MongoDB, etc.

# winston

A logger for just about everything.

# express-winston

winston middleware for express.

# pinyin

转换中文字符为拼音

# time-formater

格式化日期

# crypto-random-string

Generate a cryptographically strong random string.

Can be useful for creating an identifier, slug, salt, fixture, etc.

# formidable

A Node.js module for parsing form data, especially file uploads.
