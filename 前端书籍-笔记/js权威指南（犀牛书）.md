## 类型、值、变量
* 十六进制：0x或OX为前缀，其后跟着十六进制数串的直接量。十六进制值是数字0~9，字母A（a）~F（f）之间的之母构成
### 算数运算
    ```
    Math.pow(2,2),   // 2的53次方
    Math.round(0.6), // 四舍五入
    Math.ceil(0.6), // 向上求整
    Math.floor(0.6), // 向下求整
    Math.abs(-5), // 求绝对值
    Math.max(0.6,1,2), // 返回最大值
    Math.min(0.6,1,2), // 返回最小值
    Math.random(0.6), // 生成一个大于等于0小于1的伪随机数
    ```
* Infinity 无穷大 有负和正
* isNaN(x)   如果参数是NaN或者是一个非数字值（比如字符串和对象），则返回为true
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

