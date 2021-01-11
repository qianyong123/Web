# 1. 冒泡排序

```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6];

for (var i = 0; i < arr.length - 1; i++) {
  for (var j = 0; j < arr.length - 1 - i; j++) {
    if (arr[j] > arr[j + 1]) {
      var a = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = a;
    }
  }
}

console.log(arr);
// [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 9]
```

# 2. 斐波那契数列

```js
function fabonacci(n) {
  let num1 = 1,
    num2 = 1,
    sum;
  let arr = [1, 1];
  for (let i = 3; i <= n; i++) {
    sum = num1 + num2;
    num1 = num2;
    num2 = sum;
    arr.push(sum);
  }
  return arr;
}
fabonacci(8);
//  [1, 1, 2, 3, 5, 8, 13, 21]
```

# 3. 字符串出现不重复的最长长度

```js
var lengthOfLongestSubstring = function (s) {
  const arr = [...s];
  let res = 1;
  let result = arr.reduce((total, cur, i, arr) => {
    if (i == 0) {
      return cur;
    } else {
      if (total.indexOf(cur) < 0) {
        return total + cur;
      } else if (res < total.length) {
        res = total.length;
        return total.slice(total.indexOf(cur) + 1, total.length) + cur;
      } else {
        return total.slice(total.indexOf(cur) + 1, total.length) + cur;
      }
    }
  }, "");
  if (res < result.length) {
    res = result.length;
  }

  return res;
};

console.log(lengthOfLongestSubstring("loddktdji")); // 5 'ktdji'
console.log(lengthOfLongestSubstring("dvdf")); // 3 'vdf'
console.log(lengthOfLongestSubstring("adfafwefffdasdcx")); // 5  'asdcx'
```

# 4. 对闭包的看法，为什么要用闭包？说一下闭包原理以及应用场景

- 1) 什么是闭包

- 函数执行后返回结果是一个内部函数，并被外部变量所引用，如果内部函数持有被执行函数作用域的变量，即形成了闭包。

- 可以在内部函数访问到外部函数作用域。使用闭包，一可以读取函数中的变量，二可以将函数中的变量存储在内存中，保护变量不被污染。而正因闭包会把函数中的变量值存储在内存中，会对内存有消耗，所以不能滥用闭包，否则会影响网页性能，造成内存泄漏。当不需要使用闭包时，要及时释放内存，可将内层函数对象的变量赋值为 null。

- 2) 闭包原理

- 函数执行分成两个阶段(预编译阶段和执行阶段)。

- 在预编译阶段，如果发现内部函数使用了外部函数的变量，则会在内存中创建一个“闭包”对象并保存对应变量值，如果已存在“闭包”，则只需要增加对应属性值即可。
- 执行完后，函数执行上下文会被销毁，函数对“闭包”对象的引用也会被销毁，但其内部函数还持用该“闭包”的引用，所以内部函数可以继续使用“外部函数”中的变量
- 利用了函数作用域链的特性，一个函数内部定义的函数会将包含外部函数的活动对象添加到它的作用域链中，函数执行完毕，其执行作用域链销毁，但因内部函数的作用域链仍然在引用这个活动对象，所以其活动对象不会被销毁，直到内部函数被烧毁后才被销毁。

- 3) 优点

- 可以从内部函数访问外部函数的作用域中的变量，且访问到的变量长期驻扎在内存中，可供之后使用
- 避免变量污染全局
- 把变量存到独立的作用域，作为私有成员存在

- 4) 缺点

- 对内存消耗有负面影响。因内部函数保存了对外部变量的引用，导致无法被垃圾回收，增大内存使用量，所以使用不当会导致内存泄漏
- 对处理速度具有负面影响。闭包的层级决定了引用的外部变量在查找时经过的作用域链长度
- 可能获取到意外的值(captured value)

- 5) 应用场景

应用场景一： 典型应用是模块封装，在各模块规范出现之前，都是用这样的方式防止变量污染全局。

```js
var Yideng = (function () {
  // 这样声明为模块私有变量，外界无法直接访问
  var foo = 0;

  function Yideng() {}
  Yideng.prototype.bar = function bar() {
    return foo;
  };
  return Yideng;
})();
```

- 应用场景二： 在循环中创建闭包，防止取到意外的值。

- 如下代码，无论哪个元素触发事件，都会弹出 3。因为函数执行后引用的 i 是同一个，而 i 在循环结束后就是 3

```js
for (var i = 0; i < 3; i++) {
  document.getElementById("id" + i).onfocus = function () {
    alert(i);
  };
}
//可用闭包解决
function makeCallback(num) {
  return function () {
    alert(num);
  };
}
for (var i = 0; i < 3; i++) {
  document.getElementById("id" + i).onfocus = makeCallback(i);
}
```

# 5. debounce（防抖）

触发高频时间后n秒内函数只会执行一次,如果n秒内高频时间再次触发,则重新计算时间。
```js
const debounce = (fn, time) => {
  let timeout = null;
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, time);
  }
};
```
防抖常应用于用户进行搜索输入节约请求资源，window触发resize事件时进行防抖只触发一次。



# 6. throttle（节流）

高频时间触发,但n秒内只会执行一次,所以节流会稀释函数的执行频率。

```js
const throttle = (fn, time) => {
  let flag = true;
  return function() {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, time);
  }
}
```
节流常应用于鼠标不断点击触发、监听滚动事件。

# 7. 实现链式调用

- 链式调用的核心就在于调用完的方法将自身实例返回

- 1）示例一

```js
function Class1() {
  console.log("初始化");
}
Class1.prototype.method = function (param) {
  console.log(param);
  return this;
};
let cl = new Class1();
//由于new 在实例化的时候this会指向创建的对象， 所以this.method这个方法会在原型链中找到。
cl.method("第一次调用").method("第二次链式调用").method("第三次链式调用");
```

2）示例二

```js
var obj = {
  a: function () {
    console.log("a");
    return this;
  },
  b: function () {
    console.log("b");
    return this;
  },
};
obj.a().b();
```

# 8. 类数组和数组的区别，dom 的类数组如何转换成数组

- 1）定义

- 数组是一个特殊对象,与常规对象的区别：
- 当由新元素添加到列表中时，自动更新 length 属性
- 设置 length 属性，可以截断数组
- 从 Array.protoype 中继承了方法
- 属性为'Array'

- 类数组是一个拥有 length 属性，并且他属性为非负整数的普通对象，类数组不能直接调用数组方法。

- 2）区别
- 本质：类数组是简单对象，它的原型关系与数组不同。
- 3）类数组转换为数组

- 转换方法
- 使用 Array.from()
- 使用 Array.prototype.slice.call()
- 使用 Array.prototype.forEach() 进行属性遍历并组成新的数组
- 转换须知
- 转换后的数组长度由 length 属性决定。索引不连续时转换结果是连续的，会自动补位。
- 代码示例

```js
let al1 = {
  length: 4,
  0: 0,
  1: 1,
  3: 3,
  4: 4,
  5: 5,
};
console.log(Array.from(al1)); // [0, 1, undefined, 3]
```

# 9.介绍下 promise 的特性、优缺点，内部是如何实现的，动手实现 Promise

- 1）Promise 基本特性

- 1、Promise 有三种状态：pending(进行中)、fulfilled(已成功)、rejected(已失败)
- 2、Promise 对象接受一个回调函数作为参数, 该回调函数接受两个参数，分别是成功时的回调 resolve 和失败时的回调 reject；另外 resolve 的参数除了正常值以外， 还可能是一个 Promise 对象的实例；reject 的参数通常是一个 Error 对象的实例。
- 3、then 方法返回一个新的 Promise 实例，并接收两个参数 onResolved(fulfilled 状态的回调)；onRejected(rejected 状态的回调，该参数可选)
- 4、catch 方法返回一个新的 Promise 实例
- 5、finally 方法不管 Promise 状态如何都会执行，该方法的回调函数不接受任何参数
- 6、Promise.all()方法将多个多个 Promise 实例，包装成一个新的 Promise 实例，该方法接受一个由 Promise 对象组成的数组作为参数(Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例)，注意参数中只要有一个实例触发 catch 方法，都会触发 Promise.all()方法返回的新的实例的 catch 方法，如果参数中的某个实例本身调用了 catch 方法，将不会触发 Promise.all()方法返回的新实例的 catch 方法
- 7、Promise.race()方法的参数与 Promise.all 方法一样，参数中的实例只要有一个率先改变状态就会将该实例的状态传给 Promise.race()方法，并将返回值作为 Promise.race()方法产生的 Promise 实例的返回值
- 8、Promise.resolve()将现有对象转为 Promise 对象，如果该方法的参数为一个 Promise 对象，Promise.resolve()将不做任何处理；如果参数 thenable 对象(即具有 then 方法)，Promise.resolve()将该对象转为 Promise 对象并立即执行 then 方法；如果参数是一个原始值，或者是一个不具有 then 方法的对象，则 Promise.resolve 方法返回一个新的 Promise 对象，状态为 fulfilled，其参数将会作为 then 方法中 onResolved 回调函数的参数，如果 Promise.resolve 方法不带参数，会直接返回一个 fulfilled 状态的 Promise 对象。需要注意的是，立即 resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
- 9、Promise.reject()同样返回一个新的 Promise 对象，状态为 rejected，无论传入任何参数都将作为 reject()的参数
- 2）Promise 优点

- ① 统一异步 API
- Promise 的一个重要优点是它将逐渐被用作浏览器的异步 API ，统一现在各种各样的 API ，以及不兼容的模式和手法。
- ②Promise 与事件对比
- 和事件相比较， Promise 更适合处理一次性的结果。在结果计算出来之前或之后注册回调函数都是可以的，都可以拿到正确的值。 Promise 的这个优点很自然。但是，不能使用 Promise 处理多次触发的事件。链式处理是 Promise 的又一优点，但是事件却不能这样链式处理。
- ③Promise 与回调对比
- 解决了回调地狱的问题，将异步操作以同步操作的流程表达出来。
- ④Promise 带来的额外好处是包含了更好的错误处理方式（包含了异常处理），并且写起来很轻松（因为可以重用一些同步的工具，比如 Array.prototype.map() ）。
- 3）Promise 缺点

- 1、无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
- 2、如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
- 3、当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
- 4、Promise 真正执行回调的时候，定义 Promise 那部分实际上已经走完了，所以 Promise 的报错堆栈上下文不太友好。
- 4）简单代码实现

- 最简单的 Promise 实现有 7 个主要属性, state(状态), value(成功返回值), reason(错误信息), resolve 方法, reject 方法, then 方法.

```js
function myPromise(constructor) {
  let self = this;
  self.status = "pending"; //定义状态改变前的初始状态
  self.value = undefined; //定义状态为resolved的时候的状态
  self.reason = undefined; //定义状态为rejected的时候的状态
  function resolve(value) {
    //两个==="pending"，保证了了状态的改变是不不可逆的
    if (self.status === "pending") {
      self.value = value;
      self.status = "resolved";
    }
  }
  function reject(reason) {
    //两个==="pending"，保证了了状态的改变是不不可逆的
    if (self.status === "pending") {
      self.reason = reason;
      self.status = "rejected";
    }
  }
  //捕获构造异常
  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
myPromise.prototype.then = function (onFullfilled, onRejected) {
  let self = this;
  switch (self.status) {
    case "resolved":
      onFullfilled(self.value);
      break;
    case "rejected":
      onRejected(self.reason);
      break;
    default:
  }
};

// 测试
var p = new myPromise(function (resolve, reject) {
  resolve(1);
});
p.then(function (x) {
  console.log(x);
});
//输出1
```

# 10. 手动实现 Promise.all

-   1) 核心思路

-   ①接收一个 Promise 实例的数组或具有 Iterator 接口的对象作为参数
-  ②这个方法返回一个新的 promise 对象，
-  ③遍历传入的参数，用Promise.resolve()将参数"包一层"，使其变成一个promise对象
-  ④参数所有回调成功才是成功，返回值数组与参数顺序一致
-  ⑤参数数组其中一个失败，则触发失败状态，第一个触发失败的 Promise 错误信息作为 Promise.all 的错误信息。
- 2）实现代码
-  一般来说，Promise.all 用来处理多个并发请求，也是为了页面数据构造的方便，将一个页面所用到的在不同接口的数据一起请求过来，不过，如果其中一个接口失败了，多个请求也就失败了，页面可能啥也出不来，这就看当前页面的耦合程度了～

```js
function promiseAll(promises) {
  return new Promise(function(resolve, reject) {
    if(!Array.isArray(promises)){
        throw new TypeError(`argument must be a array`)
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedResult = [];
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then(value=>{
        resolvedCounter++;
        resolvedResult[i] = value;
        if (resolvedCounter == promiseNum) {
            return resolve(resolvedResult)
          }
      },error=>{
        return reject(error)
      })
    }
  })
}

// test
let p1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(1)
    }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(2)
    }, 2000)
})
let p3 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(3)
    }, 3000)
})
promiseAll([p3, p1, p2]).then(res => {
    console.log(res) // [3, 1, 2]
})
```

# 11.实现 add(1)(2)(3) 

- 考点：函数柯里化

- 函数柯里化概念： 柯里化（Currying）是把接受多个参数的函数转变为接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数的技术。

- 1）粗暴版
```js
function add (a) {
	return function (b) {
		return function (c) {
		    return a + b + c;
		}
	}
}
console.log(add(1)(2)(3)); // 6
```
- 2）柯里化解决方案

- 参数长度固定
```js
const curry = (fn) =>
(judge = (...args) =>
    args.length === fn.length
    ? fn(...args)
    : (...arg) => judge(...args, ...arg));
const add = (a, b, c) => a + b + c;
const curryAdd = curry(add);
console.log(curryAdd(1)(2)(3)); // 6
console.log(curryAdd(1, 2)(3)); // 6
console.log(curryAdd(1)(2, 3)); // 6
```
参数长度不固定

```js
function add (...args) {
    //求和
    return args.reduce((a, b) => a + b)
}

function currying (fn) {
    let args = []
    return function temp (...newArgs) {
        if (newArgs.length) {
            args = [
                ...args,
                ...newArgs
            ]
            return temp
        } else {
            let val = fn.apply(this, args)
            args = [] //保证再次调用时清空
            return val
        }
    }
}

let addCurry = currying(add)
console.log(addCurry(1)(2)(3)(4, 5)())  //15
console.log(addCurry(1)(2)(3, 4, 5)())  //15
console.log(addCurry(1)(2, 3, 4, 5)())  //15
```

# 12. 手写数组转树

```js
// 例如将 input 转成output的形式
let input = [
    {
        id: 1, val: '学校', parentId: null
    }, {
        id: 2, val: '班级1', parentId: 1
    }, {
        id: 3, val: '班级2', parentId: 1
    }, {
        id: 4, val: '学生1', parentId: 2
    }, {
        id: 5, val: '学生2', parentId: 3
    }, {
        id: 6, val: '学生3', parentId: 3
    },
]

let output = {
    id: 1,
    val: '学校',
    children: [{
        id: 2,
        val: '班级1',
        children: [
            {
                id: 4,
                val: '学生1',
                children: []
            },
            {
                id: 5,
                val: '学生2',
                children: []
            }
        ]
    }, {
        id: 3,
        val: '班级2',
        children: [{
            id: 6,
            val: '学生3',
            children: []
        }]
    }]
}

```
代码实现

```js


  function arrayTree(arr) {
    
    let root = arr.find(i => !i.parentId) || {}
    const val = {
      id: root.id,
      val: root.val,
      children: arr.length > 0 ? tree(root.id, arr) : []
    }

    function tree(id, arr) {
      let child = []
      arr.forEach(node => {
        if (node.parentId === id) {
          child.push({
            ...node,
            children: tree(node.id, arr)
          })
        }
      });

      return child
    }

    console.log(val)
  }

  arrayTree(input)

```

# 13. 使用ES6 的Proxy实现数组负索引。 （负索引：例如，可以简单地使用arr[-1]替代arr[arr.length-1]访问最后一个元素，[-2]访问倒数第二个元素，以此类推）

代码实现
```js
const negativeArray = els =>
    new Proxy(els, {
        get: (target, propKey, receiver) =>
            Reflect.get(
                target,
                +propKey < 0 ? String(target.length + +propKey) : propKey,
                receiver
            )
    });
const unicorn = negativeArray(["京", "程", "一", "灯"]);
unicorn[-1]; 
// 灯

```
