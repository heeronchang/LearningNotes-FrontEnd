# 初识 Babel 工作原理

`Babel` 用来转译 ES2015+ 的代码，使旧浏览器能够识别运行它们。

例如，代码
```JavaScript
const add = (a, b) => a + b;
```
通过 `Babel` 会转译为：
```JavaScript
'use strict';
var add = function(a, b) {
  return a + b;
};
```

## Bable 是如何工作的

`Babel` 本身只是一个编译器。它通过 Parse(解析), transform(转换), generate 
三步把 ES2015+ 转译成能被旧浏览器识别并运行的代码。

- Parse 包含词法分析和语法分析。
- transform 把 Parse 出来的 AST(抽象语法树) 转换成实际需要（能生成旧浏览器识别并运行）的 AST。
- Generate 根据转换后的 AST 生成旧浏览器能识别并运行的语法树。

**参考：**[初学 Babel 工作原理](https://juejin.im/post/5d11d797f265da1bd305676b)