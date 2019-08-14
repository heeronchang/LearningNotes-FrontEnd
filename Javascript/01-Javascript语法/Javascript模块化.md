# Javascript 模块化

模块化可以提高代码复用率，方便代码管理。通常一个文件就是一个模块，拥有自己的作用域，只向外部暴露特定的变量和函数。

ES6 才开始支持模块化。

## ES6 模块

ES6 实现了模块功能，使用简单，旨在成为浏览器和服务器通用的模块化解决方案。主要有两个命令构成： `export` 和 `import` 。ES6 模块不是对象， import 命令会被 JavaScript 引擎静态分析，在编译时就引入模块代码，而不是在代码运行时加载，所以无法实现条件加载，这也使得静态分析称为可能。

eg:

```JavaScript
/** 定义模块 math.js **/
const basicNum = 0;
const add = function(x, y) {
  return x + y;
}
export { 
  basicNum,
  add
}

/** 引用模块 **/
import { basicNum, add } from './math';
function test(ele) {
  ele.textContent = add(1, basicNum);
}
```

export default 命令用来指定默认输出，对应的 import 语句不需要使用大括号。
```JavaScript
/** export default **/
// 定义输出
export default { basicNum, add };
// 引入
import math from './math';
function test(ele) {
  ele.textContent = math.add(1, math.basicNum);
}
```

## common.js

commonJS 同步加载模块，在服务器端，模块文件都存在本地磁盘，读取非常快，所以这样不会有问题。但是在浏览器端，网络等因素的影响，更适合使用异步加载模块。

Node.js 使用 commonJS。

它具有四个重要的环境变量为模块化提供支持：
`module`, `exports`, `require`, `global`

一般使用 `module.exports` 定义当前模块对外输出的接口，用 `require` 加载模块。

eg:
```JavaScript
// 定义模块 math.js
let basicNum = 0;
function add(a, b) {
  return a + b;
}

module.exports = {
  basisNum: basicNum,
  add: add
}

// 引用自定义模块，参数包含路径，可省略后缀 .js
const math = require('./math.js');
math.add(1, 2);

// 引用核心模块时不需要带路径
const http = require('http');
http.createServer(...).listen(3000);
```

## ES6 模块和 CommonJS 模块的差异

1. ES6 模块输出的是值的引用，CommonJS 模块输出的是一个值的拷贝。
2. ES6 模块在编译时输出接口，CommonJS 模块在运行时加载。
- ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import 时采用静态命令的形式。即 import 时可以指定加载某个输出值，而不是加载整个模块。这种加载称为“编译时加载”。
- CommonJS 模块就是对象，即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。

## AMD

AMD 采用异步加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句都定义在一个回调函数中，等加载完成之后，这个回调函数才会运行。

### require.js

require.js 实现 AMD 规范的模块化：用 require.config() 指定引用路径等，用 define() 定义模块，用 require() 加载模块。

eg:

首先，引入 require.js 文件和一个入口文件 main.js。main.js 中配置 require.config() 并规定项目中用到的基础模块。

```HTML
<script src="js/require.js" data-main="js/main"></script>
```
```JavaScript
// main.js 入口文件/主模块
// 首先用 config() 指定各模块路径和引用名
require.config({
  baseUrl: "js/lib",
  paths: {
    "jQuery": "jquery.min", // 实际路径为 js/lib/jquery.min.js
    "underscore": "undscore.min",
  }
});
// 执行基本操作
require(["jquery", "underscore"], function($, _){
  // ..
});
```

引用模块的时候，将模块名放在 [] 中作为 reqire() 的第一个参数，如果我们定义的模块本身也依赖其它模块，需要将它们放在 [] 中作为 define() 的第一个参数。
```JavaScript
// 定义模块 math.js
define(function() {
  let basicNum = 0;
  const add = function(x, y) {
    return x + y;
  };
  return {
    add: add,
    basicNum: basicNum
  };
});
// 定义一个依赖其它模块的模块
define(['underscore'], function(_) {
  const classify = function(list) {
    _.countBy(list, function(num) {
      return num > 30 ? 'old' : 'young';
    })
  };
  return {
    classify: classify
  };
});

// 引用模块，将模块放在 [] 内
require(['jquery', 'math'], function($, math) {
  const sum = math.add(1, 2);
  $('#sum').html(sum);
});
```

## CMD 

CMD 是另一种模块化方案，它与 AMD 类似，不同点在于： AMD 推崇依赖前置，提前执行，CMD 推崇依赖就近，延迟执行。

### AMD 与 CMD 区别：
```JavaScript
/** AMD 写法 **/
define(["a", "b", "c", "d"], function(a, b, c, d) {
  // 等于在最前面声明并初始化了要用到的所有模块
  a.doSomething();
  if (false) {
    // 即便没有用到某个模块 b ， 但 b 还是提前执行了
    b.something();
  }
});

/** CMD 写法 **/
define(function(require, exports, module) {
  const a = require('./a'); // 在需要时声明
  if (false) {
    const b = require('./b');
    b.dosomething();
  }
});
```

### sea.js 模块化

```JavaScript
/** sea.js **/
// 定义模块 math.js
define(function(require, exports, module) {
  const $ = require('jquery.js');
  const add = function(x, y) {
    return x + y;
  };
  exports.add = add;
});

/** 使用文件 **/
// 加载模块
seajs.use(['math.js'], function(math) {
  const sum = math.add(1, 2);
});
```

## Javascript 在浏览器中模块化的解决方案

### sea.js
### browserify
### webpack