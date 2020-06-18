

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

* Infinity 无穷大 有负和正
* isNaN(x) 如果参数是 NaN 或者是一个非数字值（比如字符串和对象），则返回为 true

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

* \n 换行
* \t 水平制表符（空格）

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

* null == undefined true; null === undefined false
* null 和 undefined 都不包含任何属性和方法。实际上使用"," ，"[ ]"来存取这两个值的成员或方法都会产生一个类型错误。
* 两个单独的对象或者两个单独的数组是永不相等的




