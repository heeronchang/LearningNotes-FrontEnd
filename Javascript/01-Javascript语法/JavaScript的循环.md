# JavaScript 中的循环

`for` `forEach` `for...in` `for...of`

### `for`

创建一个循环，包含三个可选的表达式。不会跳过已删除或未初始化的元素。

#### 使用方法

```JavaScript
for ([initialization]; [condition]; [final-expression])
   statement
```
- initialization 通常用于初始化一个计数器，可以使用 var 或 let 声明一个变量，使用 var 声明的变量不是该循环的局部变量，而是和 for 循环处在同样的作用域中。let 声明的变量是局部变量。
- condition 一个表达式，用于判断每次循环是否能被执行。
- final-expression 每次循环之后执行的表达式。执行时机是下一次 condition 的计算之前。
- statement condition 为 true 时执行。

```JavaScript
  const arr = [1, 2, 3, 4, 5, 6,];

  for (let i = 0; i < arr.length; i++) {
    console.log(i);
  }
```
特点：最普通的循环语句，编写代码多。

### `forEach`

`forEach()` 方法按升序对数组的每一个元素执行提供的函数。跳过已删除或未初始化的元素。

#### 使用方法
`forEach(callback, [thisArg]` 返回值是 undefined。
- callback 为数组中每个元素执行的函数，该函数接收三个参数：
  - currentValue 数组中正在处理的元素
  - index 数组中正在处理的元素的索引
  - array forEach() 方法正在处理的数组
- thisArg 当前执行回调函数时 this 的值，未指定时为 undefined。

```JavaScript
  arr.forEach(element => {
    console.log(`forEach: ${element}`);
  });

// 如果已访问的元素被删除（例如shift），之后的一个元素将被跳过调用
    let items = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'];

    items.forEach(function (item, index, items) {
      console.log(item); // 'item1' 'item2' 'item4' 'item5' 'item6' 。 item3 将不会被遍历到
      if (index == 1) {
        items.splice(index, 1);
      }
    });
    console.log(items); // ["item1", "item3", "item4", "item5", "item6"]
```
特点：调用 forEach 后添加到数组的元素不会被 callback 访问到，如果存在的元素值被修改，则传入 callback 的是
遍历到该被修改元素的那一刻的值。**如果已访问的元素被删除（例如shift），之后的一个元素将被跳过调用。因为被移除元素之后的元素会向前移动一个位置**
不能使用 `break` 和 `return` 语句中止或跳出循环。可以配合 filter 方法过滤之后再用 froEach 方法遍历。

### `for...in`

以**任意顺序**遍历对象自有的、继承的、可枚举的、非 Symbol 的属性。对每一个不同的属性，语句都会被执行。

#### 使用方法

```JavaScript
for (variable in Object) {...}
```
- variable 每次迭代时，将不同的属性名分配给变量。
- 被迭代枚举其属性的对象。

for...in 循环只遍历可枚举属性。另外在遍历过程中添加的属性不能被保证能之后能被遍历到，
遍历过程中修改属性的值也不能保证是在修改前被遍历还是修改后被遍历。

通过使用 `getOwnPropertyNames()` 或 `hasOwnProperty` 来确定某属性是否是对象自身的属性。

[forin相关问题一](https://stackoverflow.com/questions/5263847/javascript-loops-for-in-vs-for)

### `for...of`

在可迭代对象上（Array、Map、Set、String、TypedArray、arguments 等）创建一个迭代循环，调用自定义迭代钩子，并为每一个不同的属性执行语句。

#### 使用方法

```JavaScript
for (variable of iterable) {...}
```
- variable 每次迭代中将不同的属性分配给变量。
- iterable 被迭代枚举其属性的对象。

循环中可以调用 `break`, `throw`, `continue`, `return` ，关闭迭代器，终止迭代。

**不要重用生成器**
for...of 提前终止后，生成器关闭，再次迭代时不会有任何结果。
```JavaScript
const gen = (function* (){
  yield 1;
  yield 2;
  yield 3;
})();

for (let o of gen) {
  console.log(o);
  break;
}

for (let o of gen) {
  console.log(o);
}

// 最终输出 1
```

