1. 首先准备 mock 

├── mock
│   ├── data
│   │   └── userInfo.json
│   ├── index.js
│   └── util.js

- 其中 data 文件夹内的 userInfo.json 是 mock 的数据生成规则
- index.js 文件的内容如下：
```JavaScript
// mock 本身不能拦截 fetch 请求，需配合 fetch-mock 使用
// 以下是拦截 ajax axios 的写法
const Mock = require('mockjs');
const express = require('express');
const util = require('./util');

const mockRouter = express.Router();
const Random = Mock.Random;

module.exports = (app) => {
  app.use('/', mockRouter);
  // jsonServer(app)
  // 不能在这里使用中间件，对于json-server而言，它就是真的开了一个server会顶掉dev-server
  mockRouter.post('/admin/login', (req, res) => {
    const data = {
      email: Random.email(),
    };
    res.json(data);
  });
  mockRouter.get('/statistics', (req, res) => {
    const json = util.getJsonFile('./data/userInfo.json');
    res.json(Mock.mock(json));
  });
  mockRouter.get('/jsonWay', (req, res) => {
    const json = util.getJsonFile('./userInfo.json');
    res.json(Mock.mock(json));
  });
};
```

- util.js 文件
```Javascript
const fs = require('fs');
const path = require('path');

module.exports = {
  getJsonFile: (filePath) => {
    const jsonStr = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
    return JSON.parse(jsonStr);
  },
};
```

- webpack 配置文件 `webpack.dev.conf.js` 的 devServer 中添加 钩子函数 `before`
```JavaScript
const mock = require('../src/mock');
```
```JavaScript
devServer: {
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    ...
    before: mock, // <----------------此处
    watchOptions: {
      poll: config.dev.poll,
    }
  },
```