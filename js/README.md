# 类型、值、变量

### 算数运算

    ```
    Math.pow(2,2),    //2的53次方
    Math.round(0.6), // 四舍五入
    Math.ceil(0.6), // 向上求整
    Math.floor(0.6), // 向下求整
    Math.abs(-5), // 求绝对值
    Math.max(0.6,1,2), // 返回最大值
    Math.min(0.6,1,2), // 返回最小值
    Math.random(0.6), // 生成一个大于等于0小于1的伪随机数
    ```

- Infinity 无穷大 有负和正
- isNaN(x) 如果参数是 NaN 或者是一个非数字值（比如字符串和对象），则返回为 true

### 日期和时间

```
    const arr = new Date(2020,0,15)    //2020年1月15日（中国标准时间）
    arr.getFullYear() //2020
    arr.getMonth()  //从0开始计数的月份
    arr.getDate()   //从1开始计数的天数
    arr.getDay()    //得到星期几，0表示星期日，5表示星期一
    arr.getHours()  //当地时间
    arr.getUTCHours()   //使用UTC表示小时的时间
```

- \n 换行
- \t 水平制表符（空格）

### 字符串的使用

```
    const z = "hello，world"
    z.charAt(1) //获取第二个字符
    z.substring(1,4) //截取
    z.slice(-3) //截取
    z.indexOf('e') //查找第一个出现的位置
    z.lastIndexOf('e') //查找第最后一个出现的位置
    z.split(',') //分割成数组
    s.replace('h','H') //全文字替换
    z.toUpperCase() //全部转换为大写0
```

### 模式匹配

```
    const text = "hello，123fghfgh666";
    var pat = /\d+/g; //匹配所有包含一个或多个数字的实例
    pat.test(text) //true 匹配成功
    text.search(pat) //首次匹配成功的位置
    text.match(pat) //所有匹配成功组成的数组
    text.replace(pat,'*') //替换匹配成功的
    text.split(/\D+/) //用非数字字符截取字符串
```

- null == undefined true; null === undefined false
- null 和 undefined 都不包含任何属性和方法。实际上使用"," ，"[ ]"来存取这两个值的成员或方法都会产生一个类型错误。
- 两个单独的对象或者两个单独的数组是永不相等的

### 数组


* Array.isArray(arr) ||  data.instanceof Array ,es5 检测对象是不是数组返回true
* arr.join('#')   数组转字符串，参数是字符分链接方式
* arr.push()  在数组的末尾添加元素
* arr.unshift()  在数组的头部添加元素
* arr.pop(),  删除数组末尾元素
* arr.shift(),    删除数组第一个元素
* arr.sort(sortby) sort排序 参数是一个函数，来指定排序的方式function sortby(v, v2) {return v2-v}
* arr.concat(obj|arr|str)    数组拼接，参数可以使对象、数组、字符串，返回 一个新数组
* arr.slice(1，3)  
 与concat方法一样，这个方法不修改原数组，返回一个新的数组
传入一个参数，则指定了切片的起始位置，是从当前位置，一直切到结束
传入两个参数，第二个参数指示结束位置，结束位置的元素不会被切出来
当起始坐标大于结束坐标，返回空数组
当参数位负数，使用length加上这个负数就是真正需要的值
* arr.splice()    删除、插入、替换
使用splice来完成这一系列复杂的操作，需要特别注意的是，splice方法会修改原数组，他的返回值是：如果有删除的项则返回删除的项
删除，指定两个参数，第一个是起始位置，第二个是要删除的个数
插入，指定3+个参数，第一个是起始位置，第二个删除个数填0，不删除，后面的参数填要插入的值，可以插入多个
替换，指定3+个参数，第二个删除的值填写要被替换的值，可以删除一个添加多个，以达到替换的效果


