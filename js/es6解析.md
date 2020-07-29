# let 和 const

* 它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
* 没有生命提升，在没有声明前调用会报错，我们称为暂时性死区
* let和const声明的变量不能重新在进行声明
* const声明的变量不能被改变，常量可以改变里面的结构，不能改变他的指向
* let和从const声明的全局变量不属于window

# 变量的解构赋值

### 数组的结构赋值
* 基本语法
```
    let [a,b,c] = [1,2,3]
    console.log(a,b,c) //1,2,3

    let [a,[[b],c]] = ['a',[['b'],'c']]
    console.log(a,b,c) // a,b,c
这种情况都属于解构不成功，foo的值都会等于undefined。
    let [x, y, ...z] = ['a'];
    x // "a"
    y // undefined
    z // []
另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
    let [x, y] = [1, 2, 3];
    x // 1
    y // 2

    let [a, [b], d] = [1, [2, 3], 4];
    a // 1
    b // 2
    d // 4
    如果等号的右边不是数组。那么会报错
```
* 默认值

```
    let [foo = true] = [];
    foo // true

    let [x, y = 'b'] = ['a']; // x='a', y='b'
    let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
    注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。

    let [x = 1] = [undefined];
    x // 1

    let [x = 1] = [null];
    x // null

    let [x = 1, y = x] = [1, 2]; // x=1; y=2
```

### 对象的解构赋值

* 对象的结构赋值和数组的基本一样，不一样的是数组是按顺序来解构的，对象是按属性名字来解构的
```
与数组一样，解构也可以用于嵌套结构的对象。

let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
注意，这时p是模式，不是变量，因此不会被赋值。如果p也要作为变量赋值，可以写成下面这样。

let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]

```

### 字符串解构赋值
* 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
```
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

let {length : len} = 'hello';
len // 5
```

# 数值的扩展

* 二进制和八进制表示法
ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。
* Number,isFinite(),Number,isNaN()
- Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。
```
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false
注意，如果参数类型不是数值，Number.isFinite一律返回false。
```
* Number.isNaN()用来检查一个值是否为NaN。
```
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true
如果参数类型不是NaN，Number.isNaN一律返回false。
```
它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。
* Number.parseInt(),Number.parseFloat()
```
S6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。

// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

```

* Number.isInteger()用来判断一个数值是否为整数。
```
Number.isInteger(25) // true
Number.isInteger(25.1) // false
Number.isInteger(3.0000000000000002) // true
如果小数点后面的位数达到了16位，那最后那位会被丢弃掉
```

* Math对象的扩展
- Math.trunc方法用于去除一个数的小数部分，返回整数部分.
对于非数值，Math.trunc内部使用Number方法将其先转为数值,对于空值和无法截取整数的值，返回NaN。
- Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值.
参数为正数，返回1；
参数为负数，返回-1；
参数为 0，返回0；
参数为-0，返回-0;
其他值，返回NaN。

* Math.cbrt()方法用于计算一个数的立方根。

* Math.clz32()方法将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0。

* Math.imul方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。

* Math.fround方法返回一个数的32位单精度浮点数形式。

* Math.hypot方法返回所有参数的平方和的平方根。


# 函数的扩展

* 函数的默认值
```
function log(x, y = 'World') {
  console.log(x, y);
}

```
* 函数默认值和解构赋值一起使用
```
function foo({x, y = 5} = {}) {
  console.log(x, y);
}
```

* 函数的length属性
```
(function (a, b, c = 5) {}).length // 2
指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真.

(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
```

* 作用域
一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。
```
1.
var x = 1;

function f(x, y = x) {
  console.log(y);
}
f(2) // 2

2.
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}
f() // 1

3.
function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // ReferenceError: x is not defined

4.
let foo = 'outer';

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar(); // outer
```












