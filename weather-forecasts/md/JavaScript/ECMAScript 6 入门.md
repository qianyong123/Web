

# 前言

ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。这里简单介绍下ES6常用语法的使用，之前阮一峰老师写的ECMAScript 6 入门已经很详细了，[ECMAScript 6.0 入门](https://es6.ruanyifeng.com/)


# let

**基本用法**


```jsx

 {
   let a = 1
 }

// for循环的计数器，就很合适使用let命令。
for (let i = 0; i < 10; i++) {
  console.log(i);
}



```
**特点**

- let声明的变量只在它所在的代码块有效。
- let不存在生命提升，它所声明的变量一定要在声明后使用，否则报错。
- 使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”
- let不允许在相同作用域内，重复声明同一个变量。

# ES6 的块级作用域

let实际上为 JavaScript 新增了块级作用域。

```jsx

function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}

```

上面的函数有两个代码块，都声明了变量n，运行后输出 5。这表示外层代码块不受内层代码块的影响。如果两次都使用var定义变量n，最后输出的值才是 10。


# const

**基本用法**

```jsx
const a = 1;
const b = {name:1}

```

**特点**

- const声明一个只读的常量。一旦声明，常量的值就不能改变。
- const的作用域与let命令相同：只在声明所在的块级作用域内有效。
- const一旦声明变量，就必须立即初始化，不能留到以后赋值，如果不赋值就会报错。
- const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
- const声明的常量，也与let一样不可重复声明。

# ES6 声明变量的六种方法

ES5 只有两种声明变量的方法：var命令和function命令。ES6 除了添加let和const命令，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有 6 种声明变量的方法。



# 变量的解构赋值

## 1.数组的解构

**基本用法**

```jsx
let [a, b, c] = [1, 2, 3];
```

- 上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。

- 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些使用嵌套数组进行解构的例子。

```jsx
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

// 如果解构不成功，变量的值就等于undefined。
```
**特点**

- 如果解构的右边不是数组，将会报错
- 解构赋值允许指定默认值，只有在右边的数组里面的值为undefined的时候才会生效。
- 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```jsx
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```
上面最后一个表达式之所以会报错，是因为x用y做默认值时，y还没有声明。

## 2.对象的解构赋值

**基本用法**

```jsx

let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"
```

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```jsx

let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined

```

如果变量名与属性名不一致，必须写成下面这样。

```jsx
let { foo: baz} = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
b //1

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'

// 设置默认值
let obj = { last: 'world' };
let { first='hello', last } = obj;
first // 'hello'
last // 'world'

```

**注意点**

如果要将一个已经声明的变量用于解构赋值，必须非常小心。
```jsx
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error
```

上面代码的写法会报错，因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
```jsx
// 正确的写法
let x;
({x} = {x: 1});
```

## 3.字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
```jsx
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```
类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

```js
let {length : len} = 'hello';
len // 5
```

## 4.数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```js
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```
- 上面代码中，数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。

- 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

## 5.函数参数的解构赋值

函数的参数也可以使用解构赋值。
```js
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

上面代码中，函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y。对于函数内部的代码来说，它们能感受到的参数就是x和y。

- 下面是另一个例子。
```js
[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```
函数参数的解构也可以使用默认值。
```js
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

```

# 字符串的扩展

## 1.字符的 Unicode 表示法
ES6 加强了对 Unicode 的支持，允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点。
```js
"\u0061"
// "a"
```
## 2.字符串的遍历器接口

ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。
```jsx
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```
## 3.模板字符串

**基本用法**
模板字符串可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
```js
var str = `abc def 112`
var str2 = `
  <div>
  abc
  </div>
`
var str3 = `abc ${str}`
console.log(str3) // abc abc def 112


```

# Promise

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

**基本用法**
ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。

- 下面代码创造了一个Promise实例。
```
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

promise
.then(res => console.log(res))
.catch(error => console.log(error););

```






















