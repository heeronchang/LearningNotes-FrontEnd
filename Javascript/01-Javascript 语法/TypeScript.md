# TypeScript

## 概述

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持

官网定义：
>Typescript is a typed superset of JavaScript that complies to plain JavaScript. Any browser. Any host. Any OS. Open source.

## 为什么要选择 TypeScript

### 增加了代码的可读性和可维护性
- 类型系统实际上是最好的文档，大部分函数看着类型的定义就可以知道如何使用了
- 可以在编译阶段发现大部分错误，这比在运行时出错好
- 增强了编译器和 IDE 的功能，代码补全、接口提示、跳转定义、重构等。

### TypeScript 非常包容

- TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 文件
- 即使不显式的定义类型，也能够自动做出类型推论
- 可以定义从简到复杂的几乎一切类型
- 即使 TypeScript 编译报错，也能生成 JavaScript 文件
- 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取

### Typescript 拥有活跃的社区
- 大部分第三方库都有提供给 TypeScript 的类型定义文件
- TypeScript 拥抱 ES6 规范

## 基础

### 联合类型

Union Types。表示取值可以是多种类型中的一种。联合类型使用 `|` 分割。 
```TypeScript 
let a: string | number;
```

#### 访问联合类型的属性和方法

当不确定具体类型时，只能访问联合类型的共有属性和方法。

#### 对象类型--接口

**确定属性**

接口约束了变量的形状。变量中的属性必须和接口保持一致。
```TypeScript
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: 'tom'
}; // 报错

let tom: Person = {
  name: 'tom',
  age: 18,
  sex: '男'
}; // 报错
```

**可选属性**
```TypeScript
interface Person {
  name: string;
  age?: number;
}

let tom: Person = {
  name: 'tom'
}
// or
let tom: Person = {
  name: 'tom',
  age: 18
}
```
**任意属性**
```TypeScript
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
} // [propName: string]: any; 定义了任意属性取值 string 类型的值
```
一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集。

**只读属性**

readonly 创建只读属性。

```TypeScript
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  id: 10001,
  name: 'tom',
  gender: 'male'
}

tom.id = 10002; // 报错
```

#### 类型断言

Type Assertion. 可以用来手动指定一个值的类型。

```TypeScript
<T>value
// or
value as T
```
Rect 的 tsx 语法只能使用第二种

类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的。

```TypeScript
function getLength(something: string | number) : number {
  if ((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length; // 何不直接使用此表达式？？？
  }
}
```

#### 声明文件

当引用第三方库时，我们需要引用它们的声明文件，才能获得对应的代码补全、接口提示等功能。

**什么是声明语句**
```TypeScript
// 以使用 jQuery 为例
declare var jQuery: (selector: string) => any;
jQuery('#foo');
```
上例中，declare var 没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查，在编译结果中
会被删除，它的编译结果是：
```TypeScript
jQuery('#foo');
```
**什么是生命文件**
把声明语句放到一个单独的文件（jQuery.d.ts）中，这个文件就是声明文件。

使用时需要配置 tsconfig.json 中的 inclue, files, exclude 等。

**管理第三方声明文件**
@types 统一管理第三方声明文件。
```TypeScript
npm install @types/jquery --save-dev
```

**书写声明文件**

第三库没有声明文件时，需要自己书写声明文件。

在不同的场景下，声明文件的内容和使用方式会有所不同。

库的使用场景主要有以下几种：

- 全局变量。 通过 `<script>` 标签引入第三方库，注入全局变量。
- npm包。通过 `import foo from 'foo';` 导入，符合 ES6 规范。
- UMD库。可以通过 `<script>` 标签引入，也可以通过 import 导入。
- 模块插件。通过 import 导入后，可以改变另一个模块的结构。
- 直接扩展全局变量。通过 `<script>` 标签引入后，改变一个全局变量的结构。比如为 string.prototype 新增一个方法。
- 通过导入扩展全局变量。通过 import 导入后，改变一个全局变量的结构。

**Q 直接扩展全局变量和通过导入扩展全局变量？？？**

#### 内置对象

内置对象指根据标准（ECMAScript和DOM 等），在全局作用域上存在的对象。

