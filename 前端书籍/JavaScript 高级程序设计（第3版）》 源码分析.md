
目录
promise
async、await
关于赋值
js内置函数
javascript与java/C# 的区别
转换数字的时候会莫名其妙的变为NAN
Math对象获取数组最大值最小值
arguments
对象都是通过函数创建的
prototype
隐式原型
函数也不是从石头缝里蹦出来的，函数也是被创建出来的。谁创建了函数呢？——Function——注意这个大写的“F”。
Instanceof运算符
构造函数，及其执行原理
原型的继承
es6 class类
es6常用的API
执行上下文环境 了解程序的执行环境
test.call(xxx) / test.apply(xxx) / test.bind()的区别
array类型
数组6大API 工作中会经常用到
function类型
作用域链
要去创建这个函数的作用域取值，而不是“父作用域
闭包的形式
浅拷贝与深拷贝
对象API
BOM浏览器对象模型
DOM文档对象模型
domAPI
事件
性能优化
CSRF攻击
Cookie
Cookie/Session的机制与安全
XSS 漏洞修复
手写ajax
HTTP协议简析
https与http
《JavaScript 高级程序设计（第3版）》 源码分析

置顶 kingrome2009 2018-03-04 19:18:59  2228  收藏 10
分类专栏： jquery
版权
js是单线程语言，不能同时干两件事

单线程是为了避免dom渲染的冲突，同一时间只能做一件事，通过事件轮循（event-loop）实现，会将进程分为同步进程和异步进程两个队列，同步执行完毕，在执行异步队列

同步、异步的理解 是否阻塞程序的执行，如果是就是同步，否则就是异步

典型的 alert() 就是同步执行，如果用户不点击确定按钮 就会一直等待
1
异步有：ajax请求、定时器、图片加载、点击事件

## promise
new一个promise对象传入两个函数分别是resolve、reject，最后return出去的还是一个promise对象，最早在jquery1.5中的deferred用到了promise

统一捕获异常、多个接口请求支持链式执行「promise.all所有的请求都完成再往下执行、promise.race只要有一个完成就往下执行」

指定执行循序，通过.then；第一个执行完return 第二个promise对象

``` 
function loadImg(src) {
    var promise = new Promise(function (resolve, reject) {
        var img = document.createElement('img')
        img.onload = function () {
            resolve(img)
        }
        img.onerror = function () {
            reject('图片加载失败')
        }
        img.src = src
    })
    return promise
}
        
var src1 = 'https://www.imooc.com/static/img/index/logo_new.png'
var result1 = loadImg(src1)
var src2 = 'https://img1.mukewang.com/545862fe00017c2602200220-100-100.jpg'
var result2 = loadImg(src2)
result1.then(function (img1) {
    console.log('第一个图片加载完成', img1.width)
    return result2  // 重要！！！
}).then(function (img2) {
    console.log('第二个图片加载完成', img2.width)
}).catch(function (ex) {
    console.log(ex)
})
 ```

## async、await
* 是一个同步的写法，使用的时候注意 async加在函数的前面、await后面是一个promise的实例

``` 
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "finish");
  });
}
async function asyncTimeSys(){
    await timeout(1000);
    console.log("第一层异步结束！")
    await timeout(1000);
    console.log("第二层异步结束！")
    await timeout(1000);
    console.log("第三层异步结束！")
    await timeout(1000);
    console.log("第四层异步结束！")
    await timeout(1000);
    console.log("第五层异步结束！")
    return "all finish";
}
asyncTimeSys().then((value)=>{
    console.log(value);
});

为什么结果为13524？，由于单线程的机制，执行到setTimeout会被暂存起来不会立即执行

console.log(1)

setTimeout(function(){
  console.log(2)
},0)
console.log(3)
setTimeout(function(){
  console.log(4)
},1000)
console.log(5)

关于var、let、const

用var在函数内部声明，这个变量就属于当前的函数作用域，如果不用var关键字则声明的是一个全局变量，var 声明的变量存在提升。

var a = 1; //此处声明的变量a为全局变量
function foo(){
   a = 2;//此处的变量a也是全局变量
   console.log(a);//2
}
foo();
console.log(a);//2

let 声明的变量不存在变量提升，换一种说法，就是 let 声明存在暂时性死区（TDZ）。
```

经典面试题

for(var i = 0; i<10; i++){
      console.log(i)
    }
    alert(i) 此时i已经变为10了
    
for(let i = 0; i<10; i++){
      console.log(i)
    }
    alert(i) 此时i会输出0-9

let 声明的变量具有块作用域的特征。
在同一个块级作用域，不能重复声明变量。

const 声明创建一个值的只读引用。

保存在堆中的数据不能修改、保存在栈中的数据支持修改

const a = 1;
console.log(a);//1
a = 2;
console.log(a);//Uncaught TypeError: Assignment to constant variable.

const obj = {a:1,b:2};
console.log(obj.a);//1
obj.a = 3;
console.log(obj.a);//3
1
2
3
4
5
6
7
8
9
一、数据类型

初始化未经声明的变量，总是会创建一个全局变量。

数据类型分为：基本数据类型（undefined、null、string、number、boolean），引用数据类型（object、array、函数）基本类型就是保存在栈内存中的简单数据段，而引用类型指的是那些保存在堆内存中的对象

关于赋值
基本数据类型赋值 互不影响 而引用类型赋值后指向的是同一个引用地址 所以修改一个其他的都会变

var message;

alert(message) // undefined
alert(age) // 产生错误
1
2
3
4
js内置函数
object、array、bloolean、function、string、number

关于 NAN

即非数值，不是一个数字。

NAN与任何值都不相等，包括它自己，进行关系比较结果都是false

alert(isNAN(NAN))  //是否 不是一个数字  true
alert(isNAN(10)) // false
alert(isNAN('ni')) // true
alert(isNAN(true)) // false 因为true 可以被转换为1
1
2
3
4
1.undefined  声明变量没有定义
2. null 空对象指针 
3. bloolean 
4. number  数值转换 Number()函数在转换字符串时比较复杂而且不够合理，推荐使用，parseInt（）parseFloat()
5. string 字符串类型  toString() 有个缺点 对null 和 undefined 不起作用
6. string() 方法更全面
7. Boolean() 检测数据类型是否返回true、false ，对于0, '', null, undefined, NaN都返回false
1
2
3
4
5
6
7
一、布尔，数字，字符串

截取给定位置的那个字符 charAt 只接受一个参数

var str = 'nihao';
alert(str.charAt(1)) //i
1
2
字符串的拼接 concat 或者 + 加号操作符

var str = 'nihao';
var newstr = str.concat('world', '!');

alert(newstr) // nihao world !
1
2
3
4
字符串的截取 slice()、substr()、substring()。接收最多两个参数

str.substring(indexStart, [indexEnd]) subsrting()方法返回一个索引和另一个索引之间的字符串

substring()从提取的字符indexStart可达但不包括 indexEnd
如果indexStart 等于indexEnd，substring()返回一个空字符串。
如果indexEnd省略，则将substring()字符提取到字符串的末尾。
如果任一参数小于0或是NaN，它被视为为0。
如果任何一个参数都大于stringName.length，则被视为是stringName.length。
如果indexStart大于indexEnd，那么效果substring()就好像这两个论点被交换了一样； 例如，str.substring(1, 0) == str.substring(0, 1)

str.substr(start, [length]) substr()方法返回从指定位置开始的字符串中指定字符数的字符

substr()会从start获取长度为length字符（如果截取到字符串的末尾，则会停止截取）。
如果start是正的并且大于或等于字符串的长度，则substr()返回一个空字符串。
若start为负数,则将该值加上字符串长度后再进行计算（如果加上字符串的长度后还是负数，则从0开始截取）。
如果length为0或为负数，substr()返回一个空字符串。如果length省略，则将substr()字符提取到字符串的末尾。

str.slice(beginIndex[, endIndex]) slice()返回一个索引和另一个索引之间的字符串

若beginIndex为负数,则将该值加上字符串长度后再进行计算（如果加上字符串的长度后还是负数，则从0开始截取）。
如果beginIndex大于或等于字符串的长度，则slice()返回一个空字符串。
如果endIndex省略，则将slice()字符提取到字符串的末尾。如果为负，它被视为strLength + endIndex其中strLength是字符串的长度。

typeof 用来检测给定变量的数据类型是一个操作符，不是函数

关于类型检测，对于基本数据类型来说typeof就很好了，但对于复杂数据类型（引用类型）来说instanceof更合适。

javascript与java/C# 的区别
一切（引用类型）都是对象，对象是属性的集合。最需要了解的就是对象的概念，和java/C#完全不一样。所以，切记切记！

判断一个变量是不是对象非常简单。值类型的类型判断用typeof，引用类型的类型判断用instanceof。

var fn = function () { };
console.log(fn instanceof Object);  // true
1
2
转换数字的时候会莫名其妙的变为NAN
如果第一个字符不是数字或者负号使用parseInt就会返回NAN

console.log(Number("")); //0
console.log(parseInt(""))//NAN
1
2
字符串的查找 indexOf match

var str = 'lele nihao,zheli shi di yi jia zhu';
var arr = [];
var op = str.indexOf('e');

while(op>-1){
	arr.push(op);
	op = str.indexOf('e', op+1);
}
//进入循环后每次给indexOf传递上一次的位置加1
alert(arr)

trim（） 会创建一个字符串的副本，删除前置及后置的所有空格

match()方法只接受一个参数 
var text = 'bat cat';
var parrent = /.at/gi;

var new = text.match(parrent)
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
统计一个字符串出现最多的字母 「考察数组去重、数据整合」

var data = "aaaaacccccssdsddddddddda";
    var length = data.length;
    var datas = [];
    var num = [];
    for (var i = 0; i < length; i++) {
        if (datas.indexOf(data[i]) < 0) {
            datas[i] = data[i];
            num[data[i]] = 1;
        }
        else {
            num[data[i]]++;
        }
    }
    console.log(datas); //["a", empty × 4, "c", empty × 4, "s", empty, "d"]
    console.log(num); //[a: 6, c: 5, s: 3, d: 10] 到这一步就已经统计出来了

    var max = num[datas[0]];  //6
    var datamax = datas[0]; //a

    //下面的方法是为了取值
    for (var i = 1; i < datas.length; i++) {
        if (max < num[datas[i]]) {
            console.log(num[datas[i]])
            max = num[datas[i]];
            datamax = datas[i];
        }
    }
    console.log("出现最多的字母:" + datamax + "  出现次数：" + max);
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
字符串的替换 replace()

var text = 'bat cat';
var result = text.replace(/at/gi, 'oo')
1
2
字符串转数组的方法 split()

var text = 'arr,op,kj,hg,';
var result = text.split(',')
接受第二个参数，固定数组的length
1
2
3
二、URL编码方法

encodeURL() 是对整个URL进行编码，
encodeURLComponent()对附加在现有URL后面的使用
1
2
Math对象获取数组最大值最小值
三、 Math 对象

获取数组中最大值和最小值 避免过多的使用循环和在if语句中确定数值。

var val = [1,2,3,4,5,6,7,8,9];

var max = Math.max.apply(Math, val);

这个技巧的关键，把MAth作为apply的第一个参数，从而正确的设置了this、
1
2
3
4
5
Math.ceil() 向上取整 Math.floor() 向下取整 Math.round() 四舍五入取整

random()方法

值 = Math.floor ( Math.round() * 可能值的总数 + 第一个可能的值 )

 var color = ['red', 'blue', 'green', 'yellow'];
 function randomNum(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    }

    var str = randomNum(0, color.length-1)

    console.log(color[str])
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
运算

1、求模(取余数)
var result = 26 % 5
2、由于运算是从左往右的打印message第一个加法操作将一个字符串和一个数值拼接，
结果是一个字符串，这是加法运算的特殊之处。
 var num1 = 5;
 var num2 = 10;
 var message = "this is a number = "+ num1 +num2;
 var message2 = "this is a number = "+ (num1 +num2);
 console.log(message) //this is a number = 510
 console.log(message2) ////this is a number = 15
3、减法运算，来说就没那么特殊。
console.log('8'-1)
4、关于==、!=，这两个操作符。
console.log('55'==55); //true
console.log('55'===55) //false
1、对于string,number等基础类型，==和===是有区别的
1）不同类型间比较，==之比较“转化成同一类型后的值”看“值”是否相等，===如果类型不同，其结果就是不等
2）同类型比较，直接进行“值”比较，两者结果一样
2、对于Array,Object等高级类型，==和===是没有区别的

5、一元运算
var num1 = 2;
var num2 = 20;
var num33 = num1++ +num2;
console.log(num33) 22

var num1 = 2;
var num2 = 20;
var num33 = ++num1 +num2;
console.log(num33) 23
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
二、语句

do-whlie语句 是一种后测试循环语句，换句话说代码至少执行一次

var i = 0;
    do {
      i += 2;
    }
    while(i > 10)
    alert(i) //2
1
2
3
4
5
6
whlie语句属于前测试循环语句，相对for语句也是

var i = 0
whlie(i<10){
	i+=2
}
1
2
3
4
关于break和continue语句

var num = 0;
for(var i = 0;i++;i<num.length){
	if(i%5==0){
		break;
	}
	num++;
}

alert(num) //4  break 是立即退出循环强制执行循环后面的语句


var num = 0;
for(var i = 0;i++;i<num.length){
	if(i%5==0){
		continue;
	}
	num++;
}

alert(num) //8  continue 退出循环后从循环顶部继续执行
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
arguments
函数体内可以通过arguments 对象来访问这个参数数组 类数组
通过arguments[0]访问第一个参数，arguments[1]访问第二个参数
函数没有重载，定义两个相同名字的函数，后一个会覆盖前一个 通过检查传入函数中参数的类型和数量做出不同的反应，来模拟方法重载重新加载多次使用，如下所示。

技巧点：函数的参数只是提供了使用的便利性，不是必需的，因为通过类数组arguments照样可以访问

function add(){
	if(arguments.length ==1){
		alert(arguments[0]+10)
	}else if(arguments.length ==2){
		alert(arguments[0]+arguments[1])
	}
}

add(10) //20
add(10,20) //30
1
2
3
4
5
6
7
8
9
10
对象都是通过函数创建的
在编程语言中，下面叫做“语法糖”。

var obj = { a: 10, b: 20 };
var arr = [5, 'x', true];
1
2
其实以上代码的本质是：

//var obj = { a: 10, b: 20 };
//var arr = [5, 'x', true];

var obj = new Object();
obj.a = 10;
obj.b = 20;

var arr = new Array();
arr[0] = 5;
arr[1] = 'x';
arr[2] = true;
1
2
3
4
5
6
7
8
9
10
11
prototype
每个函数都有一个属性叫做prototype。这个prototype的属性值是一个对象（属性的集合，再次强调！），默认的只有一个叫做constructor的属性，指向这个函数本身。

可以自定义的增加许多属性，如下图：

在这里插入图片描述

隐式原型
每个对象都有一个__proto__ javascript不希望开发者用到这个属性值

函数也不是从石头缝里蹦出来的，函数也是被创建出来的。谁创建了函数呢？——Function——注意这个大写的“F”。
Instanceof运算符
Instanceof的判断队则是：沿着A的__proto__这条线来找，同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false。

通过上以规则，你可以解释很多比较怪异的现象，例如：
console.log(Object instanceof Function) // true
console.log(Function instanceof Function) // true
console.log(Function instanceof Object) // true
1
2
3
4
在这里插入图片描述

构造函数，及其执行原理
定义构造函数的时候 方法首字母要大写，和普通函数做区分，他执行的时候里面的this会变成一个空对象，最后会return this 他是构造函数里面默认有的一行，不用另外书写，每一个构造函数都会包含一个显示属性（prototype）和隐式属性（__proto__）其实隐式属性就指向它的显示属性

在这里插入图片描述

new出来的对象f、通过隐式属性指向构造函数的显示属性、构造函数的隐式原型指向object的显示原型、object的隐式属性最后指向null，构成了一个完整的原型链；所有实例（new出来的）的隐式原型等于函数的显示原型

function Test(name){
  this.name = name
}

Test.prototype.alertName = function(){
  console.log(this.name)
}

var f = new Test("lishijie")
f.say = function(){
  console.log(this.name ,"lll")
}

f.say() //lishijie lll

f.alertName() //lishijie

for(var item in f){
  //高级浏览器已经屏蔽了来自原型的属性，下面的代码不写也可以，为了程序健壮还是加上保险
  if(f.hasOwnProperty(item)){
    console.log(item)
    //name
    //say
  }
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
原型的继承
实际应用中如何区分一个属性到底是基本的还是从原型中找到的呢？大家可能都知道答案了——hasOwnProperty
在这里插入图片描述

在这里插入图片描述

Function.prototype继承自Object.prototype。Function.prototype.__proto__指向Object.prototype。

子级构造函数的原型赋值为父级构造函数的实例

// 动物
function Animal() {
    this.eat = function () {
        alert('Animal eat')
    }
}

// 狗
function Dog() {
    this.bark = function () {
        alert('Dog bark')
    }
}

// 绑定原型，实现继承
Dog.prototype = new Animal()

var hashiqi = new Dog()
hashiqi.bark()
hashiqi.eat()
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
es6 class类
子级构造函数通过extends和父级构造函数建立关系，通过super继承父级的属性，是js构造函数的语法糖使用的还是原型，符合构造函数的原理

es6常用的API
1、反引号定义多行字符串，通过${}存放变量。2、解构赋值 const {a,b} obj const [a,b] arr 块级作用域、函数默认值、箭头函数

执行上下文环境 了解程序的执行环境
函数在定义的时候（不是调用的时候），就已经确定了函数体内部自由变量的作用域
在这里插入图片描述

给执行上下文环境下一个通俗的定义——在执行代码之前，把将要用到的所有的变量都事先拿出来，有的直接赋值了，有的先用undefined占个空。

在这里插入图片描述
在执行代码之前，首先将创建全局上下文环境。

在这里插入图片描述
代码执行到第12行之前，上下文环境中的变量都在执行过程中被赋值。

在这里插入图片描述
执行到第13行，调用bar函数。
跳转到bar函数内部，执行函数体语句之前，会创建一个新的执行上下文环境。

在这里插入图片描述

在这里插入图片描述

关于对象的面试题：

第一题就是简单指向考察， 第二题指向发生变化，因为取值是从左往右的，赋值是从右往左,a.x在a上面创建了x，在往右a的指向变了， 第三题考察对象合并。

var obj1 = {
      a: 1,
      b: 2,
      c: 3
    };
    var obj2 = obj1;
    obj2.b = 10;
    console.log(obj2, obj1);
    //Object { a: 1, b: 10, c: 3 },Object { a: 1, b: 10, c: 3 }
1
2
3
4
5
6
7
8
9
var a = {
      n: 1
    };
    var b = a;
    a.x = a = {
      n: 2
    };
    //console.log(a.x); //undefined
    //console.log(b.x); //{n:1}
1
2
3
4
5
6
7
8
9
$(function () {
      var object1 = {
        apple: 0,
        banana: {
          weight: 52,
          price: 100
        },
        cherry: 97
      };
      var object2 = {
        banana: {
          price: 200
        },
        durian: 100
      };
      /* object2 合并到 object1 中 */
      $.extend(object1, object2);
    })
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
var obj = {
       a:1,
       b:2,
       c:3
     }
    for(key in obj){
      console.log(key) // a,b,c
    }
1
2
3
4
5
6
7
8
this的指向
首先带好两个锦囊：
1.函数被调用时（即运行时）才会确定该函数内this的指向。因为在函数中this与arguments是两个特殊的变量，在函数被调用时才会取得它们，而且搜索这两个变量时只会在活动对象范围里面去搜。
2.要确定函数中this的指向，必须先找到该函数被调用的位置。

认准第一种“test()”形式

 var a = 1
    function test() {
        console.log(this.a)
    }
    var obj = {
        a: 2,
        test
    }
    var testCopy = obj.test
    testCopy()  //1

    var a = 1
    function test() {
        console.log(this.a)
    }
    var obj = {
        a: 2,
        test
    }
    setTimeout(obj.test)  //1
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
在这里插入图片描述

认准第二种“xxx.test()”形式

即使是第二种串串烧的形式，结果也是一样的，test()中的this只对直属上司（直接调用者obj）负责。

var a = 1
    function test() {
        console.log(this.a)
    }
    var obj = {
        a: 2,
        test
    }
    obj.test()//2

var a = 1
    function test() {
        console.log(this.a)
    }
    var obj = {
        a: 2,
        test
    }
    var obj0 = {
        a: 3,
        obj
    }
    obj0.obj.test()//2 
   
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
在这里插入图片描述

认准第三种“test.call(xxx) / test.apply(xxx) / test.bind()”形式

test.call(xxx) / test.apply(xxx) / test.bind()的区别
如何用xw的say方法来显示xh的数据？

var xw = {
   name : "小王",
   gender : "男",
   age : 24,
   say : function() {
     alert(this.name + " , " + this.gender + " ,今年" + this.age);  
                                   
   }
}
var xh = {
   name : "小红",
   gender : "女",
   age : 18
}
xw.say();
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
对于call可以这样：
xw.say.call(xh);

对于apply可以这样：
xw.say.apply(xh);

而对于bind来说需要这样：
xw.say.bind(xh)();

call和apply都是对函数的直接调用，而bind方法返回的仍然是一个函数，因此后面还需要()来进行调用才可以

这个时候，say方法多了两个参数

var xw = {
  name : "小王",
  gender : "男",
  age : 24,
  say : function(school,grade) {
     alert(this.name + " , " + this.gender + " ,今年" + this.age + " ,在" + school + "上" + grade)                          
  }
}
var xh = {
  name : "小红",
  gender : "女",
  age : 18
}
1
2
3
4
5
6
7
8
9
10
11
12
13
对于call来说是这样的
xw.say.call(xh,“实验小学”,“六年级”);

而对于apply来说是这样的
xw.say.apply(xh,[“实验小学”,“六年级郑州牛皮癣医院”]);

call后面的参数与say方法中是一一对应的，而apply的第二个参数是一个数组，数组中的元素是和say方法中一一对应的，这就是两者最大的区别

xw.say.bind(xh,“实验小学”,“六年级”)();

 var a = 1
    function test() {
        console.log(this.a)
    }
    var obj = {
        a: 2,
        test
    }
    var testCopy = obj.test
    testCopy.call(obj)  //2
1
2
3
4
5
6
7
8
9
10
扩展

function fn() {
    console.log('real', this)  // real {a: 100}

    var arr = [1, 2, 3]
    arr.map(function (item) {
        console.log(this)  // window
    })
}
fn.call({a: 100})
1
2
3
4
5
6
7
8
9
第四种“new test()”形式

构造函数里的this指的就是new出来的新对象

var a = 1
    function test(a) {
        this.a = a
    }
    var b = new test(2)
    console.log(b.a) //2
1
2
3
4
5
6
箭头函数

箭头函数中的this在函数定义的时候就已经确定，它this指向的是它的外层作用域this的指向。

 var a = 1
    var test = () => {
        console.log(this.a)
    }
    var obj = {
        a: 2,
        test
    }
    obj.test() //1
1
2
3
4
5
6
7
8
9
array类型
数组检测 有两个问题：instanceof、array.isArray()，如果有多个框架会有多个全局执行环境会存在不同版本的构造函数，后者目的是确定这个值是不是数组，不论是在那个环境创建的

最常使用join（）重现了toString的方法，传递逗号将以逗号分割，传递双竖线将以双竖线分割

ECMAscript专门为数组提供了push和pop方法，模拟栈、队列方法，后进先出。
unshift和shift先进先出。

重排序方法：sort() 注意改变原数组

function com (val1,val2){
	if(val1<val2){
		return -1;
	}else if(val2>val2){
		return 1;
	}else{
		return 0
	}
}
var arr = [12,2,3,34,567];
arr.sort(com)
alert (arr);
1
2
3
4
5
6
7
8
9
10
11
12
操作方法： concat() 不改变原数组，复制原数组返回副本，有参数返回拼接以后的新数组，就是简单粗暴的拼接。

var arr1 = [1,23,3];
var arr2 = arr1.concat("one",[8,"two"])
arr2 => 1,23,3,one,8,two
1
2
3
slice()用于截取数组，不改变原数组创建一个新数组，不包含结束位置

arr.slice(1) 从下标1开始到结束
arr.slice(1,4)同理
如果是负数，用数组的长度做运算，再如果结束位置小于起始位置返回空数组
1
2
3
 var arr = [1,3,8,7,9,0]
 console.log(arr.slice(1,4)) //[ 3, 8, 7 ]
1
2
splice() 强大的方法用于删除、插入、替换数组
从当前位置往后数包含当前位置

arr.splice(0,1) 从第零个开始删除1位
arr.splice(1,0,"one") 从第一个位置开始不删除 插入一项
arr.splice(1,1,"two") 从第一个位置删除一位 插入一项
1
2
3
reverse() 给数组做倒序，注意会改变原数组

数组6大API 工作中会经常用到
ES5 中数组常用的遍历方法有 for 和 for in

1. foreach 遍历所有元素
2. every 用来判断数组中所有元素是否都满足一个条件 返回布尔值，every ( ) 判断每一个是否都满足条件，如果有一个返回的结果是false，直接返回false
3. some 用来判断数组中某个元素是否都满足一个条件 返回布尔值，some ( ) 遍历数组，查找是否有满足条件（返回的结果如果是true，）就直接跳出遍历，返回true
4. sort 排序
5. map 将数组元素重组 例如返回 <a>+item+</a>
6. filler 通过一个条件过滤数组 返回数组

实际应用注意：ES6 中可以使用 forEach() 和 map() 来对数组进行遍历，forEach无法阻止它在循环中断循环跳出，也有方法实现，但是使用for循环来的更快，，，map可以将回调函数中 return 的结果返回到新数组中，，，在项目中不要乱用让他们各司其职！！！

filter() 的用法，假如后台返回一些数据，需要将符合要求的数据筛选出来，实际开发中对于单数组数据格式很有用！！！

//筛选出价格大于60的数据
var list1 = data.filter(function(item,index,arr){
	return item.price>60;
})
//筛选出id为1006的数据
var list2=data.filter(function(item){
    return item.id==1006;
})[0];
1
2
3
4
5
6
7
8
归并方法 reduce()和reduceRight()

使用归并方法求数组之和以及，对数组和字符串进行反转也就是倒序

var val = [1,2,3,4,5]
var sum = val.reduce(function(pre,cur,index,array){
	return pre+cur
})
alert(sum) 15

pre代表前一项 cur代表当前项  
reduce 和 reduceRight 结果相同但取决于从哪头开始遍历数组。
1
2
3
4
5
6
7
8
var lop = [1,2,3].reduceRight(function (pre, cur) {
      return pre + '-' + cur;
    })
var lop3 = Array.prototype.reduceRight.call('1234', function (pre, cur) {
      return pre + '-' + cur;
    })
 //console.log(lop3)4-3-2-1
1
2
3
4
5
6
7
面试题

数组去重，但是有个问题indexOf只能在ie9以上有效

Array.prototype.unique = function () {
      var result = [];
      this.forEach(function (item) {
        if (result.indexOf(item) < 0) {
          result.push(item)
        }
      })
      return result;
    }
    var arr2 = ['1', '2', '1', 3, 3];
    //console.log(arr2.unique())
1
2
3
4
5
6
7
8
9
10
11
获取数组最大最小值，有两个方法，第二种方法用了一个小技巧

Array.prototype.max = function () {
      var max = this[0];
      for (var i = 1; i < this.length; i++) {
        if (this[i] > max) {
          max = this[i]
        }
      }
      return max
    }
    //console.log([2,4,45,4].max())
    方法二 技巧点在于把math对象作为apply的第一个参数从而正确的设置了this值
    var min = Math.max.apply(Math, [1, 0, 23, 3])
    //console.log(min)
1
2
3
4
5
6
7
8
9
10
11
12
13
三、date类型

常用的时间戳

var start = +new Date() dosomething(); var end = +new Date() result = end-start

四、regExp类型

匹配第一个 bat 或者 cat 不区分大小写

var pattern = /[bc]at/i;

匹配第一个[bc]at 不区分大小写

var pattren = /\[bc]\at/i;

匹配所有以 at结尾的字符不区分大小写

var partten = /.at/gi;

匹配所有以 .at 结尾的字符不区分大小写

var partten = /\.at\/gi;

test()方法

var text = "000-00-0000";
var partten = /\d{3}-\d{2}-\d{4}/;
if(partten.test(text)){
	alert('yes')
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
function类型
函数的参数 其实是其函数的局部变量

函数声明与函数表达式 声明提前

执行上下文、也就是说代码执行的时候会把声明提前，给他一个默认值（undefined）最后再赋值，函数声明也是一样，会把函数提到最前面再通过上下文环境去执行、对于函数表达式，函数执行的时候变量sum中不会保存对函数的引用所以会报错！！！

var a = undefined

a = 100

var a = 100

为了理解函数表达式，在结尾的时候加一个分号，就像声明其他变量时一样
alert(sum(10,10));
var sum = function(){
	return num+num2
}；
1
2
3
4
5
6
7
8
9
10
11
作用域链
js没有块级作用域，每个函数的自由变量（闭包中受保护的变量）会在当前作用域查找、如果没有向父级作用域查找、如果还没有就到全局环境去找，这样就形成了作用域链，作用域链 引发了闭包的概念，全局变量只能访问全局的环境 而局部环境不仅可以访问自己 还可以访问全局

在这里插入图片描述

在这里插入图片描述

以上代码中：第13行，fn()返回的是bar函数，赋值给x。执行x()，即执行bar函数代码。取b的值时，直接在fn作用域取出。取a的值时，试图在fn作用域取，但是取不到，只能转向创建fn的那个作用域中去查找，结果找到了。

> 创建10个a标签点击返回每个标签的下标--------考察作用域--------正确的写法如下

var i, a;

for (i = 0; i < 10; i++) {
  (function(i) {
    a = document.createElement("a");
    a.innerHTML = i + "<br>";
    a.addEventListener("click", function(e) {
      e.preventDefault();
      alert(i);   //自由变量
    });

    document.body.appendChild(a);
  })(i);
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
要去创建这个函数的作用域取值，而不是“父作用域
在这里插入图片描述

在这里插入图片描述

如上代码中，fn函数作为一个参数被传递进入另一个函数，赋值给f参数。执行f(15)时，max变量的取值是10，而不是100。

闭包的形式
在这里插入图片描述

这里的重点就在于，创建bar函数是在执行fn()时创建的。fn()早就执行结束了，但是fn()执行上下文环境还存在与栈中，因此bar(15)时，max可以查找到。

为什么过度使用闭包会导致内存占用过多
闭包不光引用自己的活动对象还会引用外层函数的活动对象。所以函数执行完毕后其活动对象不会销毁，因为匿名函数的作用域任然还在引用这个活动对象

函数作为返回值、函数作为参数传递

function only (){
  var _list = [];

  return function(val){
    if(_list.indexOf(val)>=0){
      return false
    }
    else{
      _list.push(val)
      return true
    }
  }
}

里面的_list就被封装起来了，在函数外面根本修改不了

var common = only()

console.log(common(1))  //true
console.log(common(1))  //false
console.log(common(2))  //true
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
作为值的函数

function someFuction(sf,arg){
      return sf(arg)
    }
    function adr(i){
      return 10+i;
    }
    var as = someFuction(adr,20)
    console.log(as)
1
2
3
4
5
6
7
8
闭包的实例

function newsort(pro){
	return function(obj1,obj2){
		var val1 = obj1[pro];
		var val2 = obj2[pro];
		if(val1<val2){
			return -1;
		}else if(val1>val2){
			return 1
		}else{
			return 0
		}
	}
}

var data = [{name:'lj', age:23},{name:'db', age:45}];
data.sort(newsort(name)) //按姓名排
data.sort(newsort(age)) //按年龄排
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
关于闭包中使用this

var name = 'window'
var obj = {
	name:'lsj',
	say:function(){
		return function(){
			return this.name
		}
	}
}

alert(obj.say()()) //window
1
2
3
4
5
6
7
8
9
10
11
为什么会返回window？因为调用的时候会立刻返回函数，每个函数调用的时候也会自动，取得两个特殊变量：this、arguments，当内部函数搜索的时候只会搜索到活动对象为止。就如下面改变this的指向就可以完美的实现想要的效果。

var name = 'window'
var obj = {
	name:'lsj',
	say:function(){
		var that = this;
		return function(){
			return that.name
		}
	}
}

alert(obj.say()()) //lsj
1
2
3
4
5
6
7
8
9
10
11
12
为什么返回的是10？

function nc(){
	var result = new Array();
	for(var i = 0;i< 10;i++){
		result[i] = function(){
			return i
		}
	}
	return result
}
、、返回的10
1
2
3
4
5
6
7
8
9
10
是因为闭包取得的是函数变量最后一个值，再往详细了说就是：它引用的是整个活动对象而不是某个特殊的变量。

可以通过一个匿名函数强制让闭包的行为符合预期

通过传入变量i建立引用关系

function nc(){
	var result = new Array();
	for(var i = 0;i< 10;i++){
		result[i] = function(num){
			return function(){
				return num
			}
		}(i)
	}
	return result
}
1
2
3
4
5
6
7
8
9
10
11
闭包可以实现类的继承和封装、以及对象数组属性的排序

函数节流、函数防抖

函数节流是指一定时间内js方法只跑一次。比如人的眨眼睛，就是一定时间内眨一次。这是函数节流最形象的解释。

函数节流应用的实际场景，多数在监听页面元素滚动事件的时候会用到。因为滚动事件，是一个高频触发的事件 函数节流的要点是，声明一个变量当标志位，记录当前代码是否在执行。

函数防抖是指频繁触发的情况下，代码只执行一次。比如生活中的坐公交，就是一定时间内，如果有人陆续刷卡上车，司机就不会开车。只有别人没刷卡了，司机才开车。

函数防抖的应用场景，最常见的就是用户注册时候的手机号码验证和邮箱验证了 函数防抖的要点，也是需要一个setTimeout来辅助实现。延迟执行需要跑的代码。如果方法多次触发，则把上次记录的延迟执行代码用clearTimeout清掉，重新开始。

二、原型链实现继承，通过将一个类型的实例赋值给另一个构造函数的原型实现

浅拷贝与深拷贝
基本数据类型的特点：直接存储在栈(stack)中的数据
引用数据类型的特点：真实的数据存放在堆内存里

深拷贝和浅拷贝是只针对Object和Array这样的引用数据类型的。

赋值和浅拷贝的区别

赋值的其实是该对象的在栈中的地址，而不是堆中的数据。也就是两个对象指向的是同一个存储空间，无论哪个对象发生改变，其实都是改变的存储空间的内容，因此，两个对象是联动的。
浅拷贝是按位拷贝对象，它会创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址 ，因此如果其中一个对象改变了这个地址，就会影响到另一个对象。

在这里插入图片描述
在这里插入图片描述

在这里插入图片描述

浅拷贝：

Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。但是 Object.assign()进行的是浅拷贝，拷贝的是对象的属性的引用，而不是对象本身。注意：当object只有一层的时候，是深拷贝

在这里插入图片描述

在这里插入图片描述
​关于Array的slice和concat方法的补充说明：Array的slice和concat方法不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。

在这里插入图片描述
在这里插入图片描述

在这里插入图片描述

在这里插入图片描述
深拷贝的实现方式
JSON.parse(JSON.stringify())
递归方法实现深度克隆原理：遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝

什么是内存泄露？

占用的内存永远不会被回收

function dom(){
      var ele = document.getElementById('test');
      ele.onclick=function(){
        console.log(ele.id)
      }
    }
    dom()
1
2
3
4
5
6
7
上面的例子，闭包会引用包含函数的整个活动对象也包含ele，占用的内存将永远不会回收。下面改写后会解决这个问题。

function dom(){
      var ele = document.getElementById('test');
      var id = ele.id;
      ele.onclick=function(){
        console.log(id)
      }
      ele = null;
    }
    dom()
1
2
3
4
5
6
7
8
9
为什么使用私有作用域？

通过用私有作用域的匿名函数可以模仿块级作用域

function dom(count){
      for(var i= 0; i<count; i++){
        console.log(i) //0，,1
      }
      alert(i) //2
    }
    dom(2)
1
2
3
4
5
6
7
function dom(count) {
      $(function () {
        for (var i = 0; i < count; i++) {
          console.log(i)//0，,1
        }
      })
      alert(i)//报错
    }
    dom(2)
    
1
2
3
4
5
6
7
8
9
10
先输出8，再输出9

var a = 9;
     (function(){
       var a1 = 8
       alert(a1)
     })()
     alert(a);
     
1
2
3
4
5
6
7
对象API
for(var key in obj){}
1
BOM浏览器对象模型
location对象是BOM最有用的对象之一，例如：location.search 查询字符串参数，location.host返回服务器名称和端口号，location.href返回整个URL地址。

function get(){
	var qs = (location.search.length>0? 
	location.search.substring(1):''),
	args = {},
	items = qs.length? qs.split('&'): [],
	item = =null,
	name = null,
	value = null;
	for(var i = 0;i++;i<items.length){
		item = item[i].split('=')
		name = decodeURLComponent(item[0])
		value= decodeURLComponent(item[1])
		if(name.length){
			args[name] = value
		}
	}
	return args
}

假设查询字符串为： ?q=javascript&num=0

var result = get()
alert(result['q']) //javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
navigator对象，已成为识别客户端浏览器的标准，screen客户端显示器相关信息，history浏览器的历史记录，可以通过js的navigator.userAgent属性来确定用户使用的浏览器，分为以下几步：1、识别浏览器引擎；2、识别浏览器；3、识别平台；4、识别操作系统；5、通过navigator.platform检测平台系统是不是IOS或者安卓，以及字符串里是否有mobile字段

关于window路径跳转的几种方法：

//效果相同
location.assign('http://nihao.com')
location.href = 'http://nihao.com'
window.location = 'http://nihao.com'
1
2
3
4
DOM文档对象模型
dom是一个树形结构的数据类型、它将html字符串结构化成一个树模型

domAPI
getElementById、getElementByTagName（返回数组）、querySelectorAll（返回数组）、createElement、parentElement（获取父元素）、childNodes、nodeName、attribute是对html标签属性的修改

查找元素

document.forms包含了文档所有的form元素，与document.getElementsByTagName('form')得到的结果相同

var div = document.getElementById('test');
var tag = document.getElementsByTagName('div');
通过name属性获取元素，返回一个nodelist
console.log(document.getElementsByName('op').length)
1
2
3
4
操作节点

var id = document.getElementById('test');
var p = document.createElement('p');
var a = document.createElement('a');
a.innerText='baidu'
id.appendChild(p);
id.insertBefore(a,p) //插入到p元素的前面
1
2
3
4
5
6
标签属性的修改

标签上的每个属性都可以采用下面的方式去修改，但是对于自定义属性就不适用了，需要用到getAttribute

 <div id="test" title="op"></div>
  <script type="text/javascript" src="./jquery-1.11.0.min.js"></script>
  <script>
     var div = document.getElementById('test');
     div.title = '你好'
  </script>
1
2
3
4
5
6
getAttribute，获取标签属性；setAttribute创建该属性并设置相应的值，也可以修改相应的值；removeAttribute删除标签属性

var div = document.getElementById('test');
alert(div.my_p)
alert(div.getAttribute("my_p"))
div.setAttribute("my_p", "3")
div.removeAttribute('my_p')

创建标签
var div = document.getElementById('test');
var template = document.createElement('p')
template.setAttribute('class', 'child');
div.appendChild(template)
1
2
3
4
5
6
7
8
9
10
11
document.querySelector返回匹配的第一个元素，document.querySelectorAll返回匹配元素的一个nodelist

var div = document.querySelector('#test');
console.log(div.id) 
var allUl = document.querySelectorAll('ul li');
console.log(allUl) //NodeList(6) [ li, li, li, li, li, li ]
1
2
3
4
html5新添加的getElementsByClassName()方法返回一个NodeList

 var cla = document.getElementsByClassName('le');
 console.log(cla) //HTMLCollection { 0: div#test.le, length: 1, … }
1
2
实践题
删除元素里的一个class

var classArr =document.getElementById('test')
.getAttribute('class').split(/\s+/);
var pos = -1;
for(var i=0; i<classArr.length; i++){
  if(classArr[i]== 'le'){
    pos = i;
    break;
  }
}
classArr.splice(pos, 1);
var newV = classArr.join(' ')
document.getElementById('test').setAttribute('class', newV)
1
2
3
4
5
6
7
8
9
10
11
12
html5自定义数据属性的取值，dataset

html
<div id="test" class="le user les" data-id="23" title="op"></div>
js
document.getElementById('test').dataset.id;
1
2
3
4
offsetWidth元素在水平方向上占用的空间，包括元素的宽度，可见的垂直滚动条的宽度，左右边框的宽度，offsetHeight同理。clientWidth是元素内容宽度加上左右的内边距宽度，clientHeight是元素的内容高度加上上下内边距高度，确定浏览器视口大小的时候常用到这个属性。

事件
跨浏览器的事件对象兼容

var EventUtil = {
	getEvent:function(event){
		return event? event: window.evnet
	},
	getTarget:function(event){
		return event.target || event.srcElement
	},
	perventDefault:function(event){ //阻止默认事件
		if(event.perventDefault){
			event.perventDefault()
		}
		else{
			event.returnValue = false
		}
	},
	stopPropagation:function(event){ //阻止冒泡
	       if(event.stopPropagation){
	         event.stopPropagation();
	       }
	       else{
	         event.cancelBubble = true;
	       }
	}
}

var a = document.getElementById('link');

a.onclick = function(event){
	event = EventUtil.getEvent(event)
	EventUtil.perventDefault(event)
}


以上代码可以确保所有浏览器中点击该链接都会阻止默认跳转
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
事件类型

UI事件

load当页面加载完后（包括图像、js,css文件、外部资源），resize当浏览器被调整到一个新高度或宽度触发这个事件，scroll事件

鼠标事件

blur在元素上失去焦点，focus获取焦点以上两个事件不会冒泡，click，dbclick，mouseenter，mouseleave，mouseover

触摸事件

touchstart当手指触摸屏幕时触发，touchmove手指在屏幕上滑动连续触发，调用preventDefault（）可以阻止滚动，touchend手指从屏幕上离开，clientX，clientY触摸目标在视口中的x，y坐标，pageX，pageY触摸目标在页面中的x，y坐标，screenX，screenY，触摸目标在屏幕中的x，y坐标，target触摸的dom节点目标。，

事件委托

建立在事件冒泡机制上的事件委托技术
只需在dom树中最高层次添加一个事件处理程序，这种技术占用内存少，dom引用少能够提升整体的性能。

<ul id = 'list'>
	<li id="one">one</li>
	<li id="two">two</li>
	<li id="three">three</li>
</ul>

var list = document.getElementById('list');

list.onlick = function(){
	event = EventUtil.getEvent(event)
	var target = EventUtil.getTarget(event)
	switch(target.id){
		case "one":
		alert(1);
		break;
		case "two":
		alert(2);
		break;
	}
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
表单脚本

如何避免用户的重复提交 1、表单提交后禁用提交按钮 2、利用onsubmit事件取消后续的提交操作，session中存放一个特殊标志发现表单提交里没有有效的标志串，这说明表单已经被提交过了，忽略这次提交

  //获取表单元素
     var form1 = document.forms['form1'];
     //不推荐下面的方法，容易出错，未来的浏览器可能不会支持
     var form2 = document.form2;
 //表单提交的时候如果验证不通过可以通过阻止默认行为的方法，阻止表单提交
     //注意是submit而不能用click，因为click在不同的浏览器之间存在时差
     //event.preventDefault();
     
     //h5为表单新增了autofocus属性，自动获取焦点，
     //是一个布尔属性支持这个属性的浏览器中显示TRUE，否则是FALSE
     //每个表单都有elements属性，返回一个有序列表
     var textBox = document.forms['form1'].elements['text'];
     console.log(textBox.value)
     //input,textarea,支持select()方法，
     //选中文本框中的文本，如何取得选中的文本可以结合，selectionStart,selectionEnd
     //h5其他输入类型type：email,url,number,range,新属性:required,pattern
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
表单序列化

返回值：表单内容的字符串格式

var serializeUrl = $("#test_form").serialize();
alert("序列化为url格式为："+serializeUrl);
1
2
返回的是JSON对象而非JSON字符串

var serializeJson = $("#test_form").serializeArray(); 
alert("序列化为json格式为："+JSON.stringify(serializeJson)); 
//JSON.stringify(json对象)
1
2
3
性能优化
css放在head中否则浏览器会重新再设置一遍
js不要放在body中因为它会阻塞dom的渲染
DomContentLoaded只是dom渲染完成
window.onload页面中所有的元素都渲染完
静态资源合并压缩减少服务器的请求
使用cdn从最近的服务器获取资源
图片做懒加载（原理：预览图放在src，真正的图片放在自定义data属性下用js控制给src属性赋值）、下拉加载更多、合并多个dom操作
缓存dom查询存到变量中
同源策略

协议/主机/端口相同则是同源

没有同源策略限制的接口请求
如果你请求了接口进行登录，服务端验证通过后会在响应头加入Set-Cookie字段，然后下次再发请求的时候，浏览器会自动将cookie附加在HTTP请求的头字段Cookie中，服务端就能知道这个用户已经登录过了。知道这个之后，我们来看场景：
1.你准备去清空你的购物车，于是打开了买买买网站www.maimaimai.com，然后登录成功，一看，购物车东西这么少，不行，还得买多点。
2.你在看有什么东西买的过程中，你的好基友发给你一个链接www.nidongde.com，一脸yin笑地跟你说：“你懂的”，你毫不犹豫打开了。
3.你饶有兴致地浏览着www.nidongde.com，谁知这个网站暗地里做了些不可描述的事情！由于没有同源策略的限制，它向www.maimaimai.com发起了请求！聪明的你一定想到上面的话“服务端验证通过后会在响应头加入Set-Cookie字段，然后下次再发请求的时候，浏览器会自动将cookie附加在HTTP请求的头字段Cookie中”，这样一来，这个不法网站就相当于登录了你的账号，可以为所欲为了！如果这不是一个买买买账号，而是你的银行账号，那…

没有同源策略限制的Dom查询

// HTML
<iframe name="yinhang" src="www.yinhang.com"></iframe>
// JS
// 由于没有同源策略的限制，钓鱼网站可以直接拿到别的网站的Dom
const iframe = window.frames['yinhang']
const node = iframe.document.getElementById('你输入账号密码的Input')
console.log(`拿到了这个${node}，我还拿不到你刚刚输入的账号密码吗`)
1
2
3
4
5
6
7
同源策略限制下接口请求的正确打开方式

JSONP、CORS是一个W3C标准，全称是"跨域资源共享"、代理帮我们把这个请求转发到真正的后端域名上、细心的朋友可能发现，JSONP只能发GET请求，因为本质上script加载资源就是GET，那么如果要发POST请求怎么办呢？空iframe加form

CSRF攻击
已经登录的网站，以你的名义发送恶意请求

你不能保证你关闭浏览器了后，你本地的Cookie立刻过期，你上次的会话已经结束。（事实上，关闭浏览器不能结束一个会话，但大多数人都会错误的认为关闭浏览器就等于退出登录/结束会话了…）

CSRF的防御可以从服务端和客户端两方面着手，防御效果是从服务端着手效果比较好

在表单里增加Hash值，以认证这确实是用户发送的请求。然后在服务器端进行Hash值验证可以杜绝99%的CSRF攻击

每次的用户提交都需要用户在表单中填写一个图片上的随机字符串，厄…这个方案可以完全解决CSRF，但个人觉得在易用性方面似乎不是太好，还有听闻是验证码图片的使用涉及了一个被称为MHTML的Bug，可能在某些版本的微软IE中受影响。

Cookie
存储cookie是浏览器提供的功能，网页要发http请求时，浏览器会先检查是否有相应的cookie，有则自动添加在request header中的cookie字段中。这些是浏览器自动帮我们做的，而且每一次http请求浏览器都会自动帮我们做。每个域名下的cookie 的大小最大为4KB，每个域名下的cookie数量最多为20个。

存在浏览器的一段字符串

跨域不共享

每次发送http请求会将请求域的cookie发送给server端

server端可以修改cookie并返回浏览器

浏览器可以通过js修改cookie但是有限制

客户端可以设置cookie 的下列选项：expires、domain、path、secure（有条件：只有在https协议的网页中，（前端）客户端设置secure类型的 cookie 才能成功），但无法设置HttpOnly选项。

Cookie/Session的机制与安全
本地储存官方说法是 5M 的大小；cookie 不适合大量数据的存储，因为它们由每个对服务器的请求来传递，cookie 默认如果不设置有效期，那么他默认是随着窗口关闭而清除；存放的数据大约为4K左右；用于服务器通信，每次都会携带在HTTP请求头中

现在的服务器之所以知道我们是否已经登录，是因为服务器在登录时设置了浏览器的Cookie！Session则是借由Cookie而实现的更高层的服务器与浏览器之间的会话。

浏览器向某个URL发起HTTP请求
对应的服务器收到该HTTP请求，
HTTP响应包括请求头和请求体两部分
在响应头加入Set-Cookie字段，它的值是要设置的Cookie。

浏览器收到来自服务器的HTTP响应。
浏览器在响应头中发现Set-Cookie字段，就会将该字段的值保存在内存或者硬盘中。

Set-Cookie字段的值可以是很多项Cookie，每一项都可以指定过期时间Expires。 默认的过期时间是用户关闭浏览器时。

浏览器下次给该服务器发送HTTP请求时， 会将服务器设置的Cookie附加在HTTP请求的头字段Cookie中。
只发送当前请求的域名曾经指定的Cookie

服务器收到这个HTTP请求，发现请求头中有Cookie字段， 便知道之前就和这个用户打过交道了。

过期的Cookie会被浏览器删除。

Session 的实现机制

Cookie 防篡改机制，因为Cookie是明文传输的， 只要服务器设置过一次authed=true|xxxx我不就知道true的签名是xxxx了么， 以后就可以用这个签名来欺骗服务器了。因此Cookie中最好不要放敏感数据。 一般来讲Cookie中只会放一个Session Id，而Session存储在服务器端。

用户提交包含用户名和密码的表单，发送HTTP请求。
服务器验证用户发来的用户名密码。
如果正确则把当前用户名（通常是用户对象）存储到redis中，并生成它在redis中的ID。
这个ID称为Session ID，通过Session ID可以从Redis中取出对应的用户对象， 敏感数据（比如authed=true）都存储在这个用户对象中。
设置Cookie为sessionId=xxxxxx|checksum并发送HTTP响应， 仍然为每一项Cookie都设置签名
用户收到HTTP响应后，便看不到任何敏感数据了。在此后的请求中发送该Cookie给服务器。
服务器收到此后的HTTP请求后，发现Cookie中有SessionID，进行放篡改验证。
如果通过了验证，根据该ID从Redis中取出对应的用户对象， 查看该对象的状态并继续执行业务逻辑。
XSS 漏洞修复
跨站脚本攻击，比如获取用户的Cookie发送到自己的服务器，导航到恶意网站,携带木马等

将重要的cookie标记为http only, 这样的话Javascript 中的document.cookie语句就不能获取到cookie了.
只允许用户输入我们期望的数据。 例如：　年龄的textbox中，只允许用户输入数字。 而数字之外的字符都过滤掉。

手写ajax
var xhr=new XMLHttpRequest();
var url="http://127.0.0.1:8080/xxx.do?username=testuser&userno=123";
//url=decodeURI(url);
xhr.open("GET",url);
xhr.onreadystatechange=function(){
   if(xhr.readyState==4 && xhr.status==200){
          console.log(xhr.responseText);
    }
 }
xhr.send();
1
2
3
4
5
6
7
8
9
10
在这里插入图片描述

HTTP协议简析
在这里插入图片描述

在这里插入图片描述

目前互联网采用的网络协议是tcp/ip协议族，HTTP协议处于应用层，TCP/UDP处于传输层，IP网络处于网络层，通信电缆等处于物理链路层。

请求方法是告知服务器意图的HTTP方法。主要包括POST、GET、PUT、HEAD、DELETE等方法。目前主要在用的是POST和GET，主要区分是POST不会讲请求实体内容添加到URL链接上，而GET会将请求实体添加到URL链接上。

1、说一下什么是Http协议？

对器客户端和 服务器端之间数据传输的格式规范，格式简称为“超文本传输协议”。

2、什么是Http协议无状态协议？怎么解决Http协议无状态协议？（曾经去某创业公司问到）

无状态协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息
无状态协议解决办法： 通过1、Cookie 2、通过Session会话保存。
3、说一下Http协议中302状态(阿里经常问)

http协议中，返回状态码302表示重定向。
这种情况下，服务器返回的头部信息中会包含一个 Location 字段，内容是重定向到的url。
4、Http协议有什么组成？

请求报文包含三部分：

请求行：包含请求方法、URI、HTTP版本信息
请求首部字段
请求内容实体
响应报文包含三部分：

状态行：包含HTTP版本、状态码、状态码的原因短语
响应首部字段
响应内容实体
说一下网络传输的过程

5、Http协议中有那些请求方式？

GET： 用于请求访问已经被URI（统一资源标识符）识别的资源，可以通过URL传参给服务器
POST：用于传输信息给服务器，主要功能与GET方法类似，但一般推荐使用POST方式。
PUT： 传输文件，报文主体中包含文件内容，保存到对应URI位置。
HEAD： 获得报文首部，与GET方法类似，只是不返回报文主体，一般用于验证URI是否有效。
DELETE：删除文件，与PUT方法相反，删除对应URI位置的文件。
OPTIONS：查询相应URI支持的HTTP方法。
6、Http协议中Http1.0与1.1区别？

在http1.0中，当建立连接后，客户端发送一个请求，服务器端返回一个信息后就关闭连接，当浏览器下次请求的时候又要建立连接，显然这种不断建立连接的方式，会造成很多问题。
在http1.1中，引入了持续连接的概念，通过这种连接，浏览器可以建立一个连接之后，发送请求并得到返回信息，然后继续发送请求再次等到返回信息，也就是说客户端可以连续发送多个请求，而不用等待每一个响应的到来。
7、get与post请求区别？（初级程序员必备问题）

区别一：

get重点在从服务器上获取资源。
post重点在向服务器发送数据。
区别二：

get传输数据是通过URL请求，以field（字段）= value的形式，置于URL后，并用"?“连接，多个请求数据间用”&"连接，如http://127.0.0.1/Test/login.action?name=admin&password=admin，这个过程用户是可见的。
post传输数据通过Http的post机制，将字段与对应值封存在请求实体中发送给服务器，这个过程对用户是不可见的。
区别三：

Get传输的数据量小，因为受URL长度限制，但效率较高。
Post可以传输大量数据，所以上传文件时只能用Post方式。
区别四：

get是不安全的，因为URL是可见的，可能会泄露私密信息，如密码等。
post较get安全性较高。
区别五：

get方式只能支持ASCII字符，向服务器传的中文字符可能会乱码。
浏览器直接发送的请求默认是get请求。
post支持标准字符集，可以正确传递中文字符。

9、常见Http协议状态？

200：请求被正常处理

204：请求被受理但没有资源可以返回

206：客户端只是请求资源的一部分，服务器只对请求的部分资源执行GET方法，相应报文中通过Content-Range指定范围的资源。

301：永久性重定向

302：临时重定向

303：与302状态码有相似功能，只是它希望客户端在请求一个URI的时候，能通过GET方法重定向到另一个URI上

304：发送附带条件的请求时，条件不满足时返回，与重定向无关

307：临时重定向，与302类似，只是强制要求使用POST方法

400：请求报文语法有误，服务器无法识别

401：请求需要认证

403：请求的对应资源禁止被访问

404：服务器无法找到对应资源

500：服务器内部错误

503：服务器正忙
10、Http协议首部字段？

a、通用首部字段（请求报文与响应报文都会使用的首部字段）

Date：创建报文时间
Connection：连接的管理
Cache-Control：缓存的控制
Transfer-Encoding：报文主体的传输编码方式
b、请求首部字段（请求报文会使用的首部字段）

Host：请求资源所在服务器
Accept：可处理的媒体类型
Accept-Charset：可接收的字符集
Accept-Encoding：可接受的内容编码
Accept-Language：可接受的自然语言
c、响应首部字段（响应报文会使用的首部字段）

Accept-Ranges：可接受的字节范围
Location：令客户端重新定向到的URI
Server：HTTP服务器的安装信息
d、实体首部字段（请求报文与响应报文的的实体部分使用的首部字段）

Allow：资源可支持的HTTP方法
Content-Type：实体主类的类型
Content-Encoding：实体主体适用的编码方式
Content-Language：实体主体的自然语言
Content-Length：实体主体的的字节数
Content-Range：实体主体的位置范围，一般用于发出部分请求时使用
11、Http与Https优缺点？

通信使用明文不加密，内容可能被窃听，也就是被抓包分析。
不验证通信方身份，可能遭到伪装
无法验证报文完整性，可能被篡改
HTTPS就是HTTP加上加密处理（一般是SSL安全通信线路）+认证+完整性保护
12、Http优化

利用负载均衡优化和加速HTTP应用
利用HTTP Cache来优化网站
13、Http协议有那些特征？

1、支持客户/服务器模式；2、简单快速；3、灵活；4、无连接；5、无状态。

https与http
Https：是以安全为目标的Http通道，是Http的安全版。Https的安全基础是SSL。SSL协议位于TCP/IP协议与各种应用层协议之间，为数据通讯提供安全支持。

http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。
http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
http的连接很简单，是无状态的。Https协议是由SSL+Http协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。(无状态的意思是其数据包的发送、传输和接收都是相互独立的。无连接的意思是指通信双方都不长久的维持对方的任何信息。)

已赞
3

评论
1

分享

收藏
10

手机看

打赏
文章举报
收起全文



优质评论可以帮助作者获得更高权重
wantyoulike
wantyoulike:干脆发个PDF版吧，up表情包表情包表情包1年前
点赞
JavaScript高级程序设计（第3版）（PDF高清版）
06-01
JavaScript高级程序设计（第3版）中文 最新高清 完整版.pdf
12-23
Javascript 高级程序设计第三版理解_hopefullman的博客-CSDN博客
1-6

《JavaScript 高级程序设计(第3版)》 源码分析 阅读数 1970 词条《JavaScript高级程序设计》是2006年人民邮电出版社出版的图书,作者是(美)(Nicholas C.Zakas)扎卡...
JavaScript高级程序设计(第三版)PDF电子版 - 6块腹肌的..._CSDN博客
11-30

分享这本小红书给大家,电子版估计很多人都有时间来看,虽然很基础,但是很重要。 ...《JavaScript 高级程序设计(第3版)》 源码分析 阅读数 1906 词条《JavaScript高...
AC_greener的博客
 5889

JavaScript高级程序设计（第3版）中文在线阅读，也可以免费下载~
 
在线阅读地址：http://www.chinastor.org/upload/2014-12/14122310427265.pdf 百度网盘：https://pan.baidu.com/s/1hsZUXzm 密码：nlul
hopefullman的博客
 297

Javascript 高级程序设计第三版理解
 
1.js 是动态语言，因为变量类型只会在执行时候才被确定类型。不同于C在声明就确定了变量的类型。2.undefined 和 null区别：利用Boolean（）计算后都返回false一个值；都没有方法；null是关键字undefined不是关键字；null是对象，undefined是基本类型，还是windows属性，在值的时候消耗行性能；null初始化的，undefined......
《JavaScript高级程序设计(第三版)》_weixin_33978016..._CSDN博客
1-5

最近在读《JavaScript 高级程序设计(第三版)》这本书,在这里做一下笔记,方便日后查阅。5.
JavaScript高级程序设计(第3版)源代码和勘误_javascript_唯手熟...
5-27

勘误《JavaScript高级程序设计 (第3版)》 第3章 基本概念位置:第29页 错误内容...ArrayList源码分析(入门篇) ArrayList源码分析前言:写这篇博客的主要原因是,在...
CSDN资讯
 2万+

JavaScript 为什么能活到现在？
 
作者 | 司徒正美责编 |郭芮出品 | CSDN（ID：CSDNnews）JavaScript能发展到现在的程度已经经历不少的坎坷，早产带来的某些缺陷是永久性的，因此浏览器才有禁用JavaScript的选项。甚至在jQuery时代有人问出这样的问题，jQuery与JavaScript哪个快？在Babel.js出来之前，发明一门全新的语言代码代替JavaScript......
《JavaScript高级程序设计（第3版）》中文 高清完整扫描版PDF版
10-17
勘误《JavaScript高级程序设计 (第3版)》_Andy·Wu的专栏-CSDN博客
1-9

《JavaScript高级程序设计(第3版)》中文 高清完整PDF版+源码 09-12 《JavaScript高级程序设计(第3版)》中文 高清完整PDF版+源码,资料非常不错,仅供学习参考,请...
JavaScript高级程序设计(第3版)非扫描版_CodeZDragon的..._CSDN博客
5-15

一本真正的好书,JavaScript高级程序设计第3版中文 PDF 高清 完整 书签 电子版 + 扫描版 + 源码,值得推荐!《JavaScript高级程序设计 第3版 》是JavaScript超级畅....
js高级程序设计(第三版)中文.pdf
12-24
baidu_36681154的博客
 499

JS高级程序设计详解读书笔记
 
定义基于事件和对象驱动，并具有安全性能的脚本语言运行在客户端浏览器运作在服务器名称为node.js出现背景《JavaScript高级程序设计》javaScript 诞生于 1995 年。当时，它的主要目的是处理以前由服务器端语言（如 Perl）负责的一些输入验证操作。在 JavaScript 问世之前，必须把表单数据发送到服务器端才能确定用户是否没有填写某个必填域，是否......
JavaScript高级程序设计(第3版)笔记 - 小草莓的博客
12-10

《JavaScript高级程序设计(第3版)》中文 高清完整PDF版+源码 09-12 《JavaScript高级程序设计(第3版)》中文 高清完整PDF版+源码,资料非常不错,仅供学习参考,请...
JavaScript 高级程序设计(第三版)笔记_javascript_进击..._CSDN博客
5-16

《JavaScript 高级程序设计(第3版)》 源码分析 词条《JavaScript高级程序设计》是2006年人民邮电出版社出版的图书,作者是(美)(Nicholas C.Zakas)扎卡斯。本书适合...
GitChat
 1751

JavaScript 高级程序设计（第3版）
 
内容简介ECMAScript 5 和 HTML5 在标准之争中双双胜出，使大量专有实现和客户端扩展正式进入规范，同时也为 JavaScript 增添了很多适应未来发展的新特性。《JavaScript 高级程序设计(第3版)》这一版除增加5章全新内容外，其他章节也有较大幅度的增补和修订，新内容篇幅约占三分之一。全书从 JavaScript 语言实现的各个组成部分——语言核心、DOM、BOM、事件模......
ZhangGQ专栏
 1956

JavaScript高级编程（一）——基本概念
 
语法	关键字与保留字	变量	ECMAScript的变量是松散类型的，即每个变量仅仅只是一个用于保存值的占位符而已；	var  message;     定义变量但未初始化但变量，会保存一个特殊但值——undefined；	数据类型：Undefined、Null、Boolean、Number、String、Object	typeof操作符：监测给定变量但数据类型	“undefi......
JavaScript 高级程序设计 第3版 中文 PDF 高清 完整 书..._CSDN博客
12-31

一本真正的好书,JavaScript高级程序设计第3版中文 PDF 高清 完整 书签 电子版 + 扫... 《JavaScript高级程序设计 第3版 》是JavaScript超级畅销书的最新版。ECMAScri...
博健的博客
 4299

前端入门技术书籍推荐：JavaScript高级程序设计等，吐血整理！
 
大四学生一枚，正在实习中（前端开发），一只小菜鸟在掘金和github上读过 冴羽大大 的很多文章，我询问他如何打牢JS基础，他建议我最起码高程看完前一半，那么fighting！附上 pdf版下载地址链接: https://pan.baidu.com/s/1k-hUxun9ns1C8VqK7bFVJg 提取码: egym 复制这段内容后打开百度网盘手机App，操作更方便哦另外附上github......
weixin_39496190的博客
 1540

《JavaScript高级程序设计（第三版）》读后感--持续更新
 
目录第一章  JavaScript简介1，诞生2，JavaScript实现2.1核心（ECMAScript）2.2文档对象模型（DOM）2.3浏览器对象模型（BOM）作为一名入行不久的技术小白，对自己现在所使用的各种技术感到深深的疲惫。因为每个技术或语言实在太浩瀚了，但是在实际的项目中，自己使用到的技术却仅仅是这个技术或语言的皮毛，照这个样子，什么时候才能成为一方大佬掌......
007RoBot的博客
 1848

JavaScript高级程序设计（第3版）中文 高清 .pdf JavaScript高级程序设计（第3版） .pdf JavaScript高级程序设计第三版 .pdf
 
JavaScript高级程序设计（第3版）中文 高清 .pdf JavaScript高级程序设计（第3版） .pdf JavaScript高级程序设计第三版 .pdf（.pdf书籍的优点是便于直接在电脑中保存有电脑就可以阅读，如果觉得这本书给你提供到了很大的帮助，可以去书店补一本纸质版）资源保存在百度云盘上，有需要这个资源的同学，请帅气的拿走，如果链接失效请在评论区留言。（如果想要其他学习资源......
hc1025808587的专栏
 8091

JavaScript高级程序设计（读书笔记）（七）
 
本笔记汇总了作者认为“JavaScript高级程序设计”这本书的前七章知识重点，仅供参考。第七章 函数表达式 小结： 在JavaScript编程中，函数表达式是一种非常有用的技术。使用函数表达式可以无须对函数命名，从而实现动态编程。匿名函数，也称为拉姆达函数，是一种使用JavaScript函数的强大方式。以下总结了函数表达式的特点。 函数表达式不同于函数声明。...

