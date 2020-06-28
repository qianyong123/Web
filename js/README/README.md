

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

自己收藏的几个好玩牛逼的网站
1、搜源码-方便找到你想要的一些源码，例如一些插件的js，免得去一些博客花钱去下载了
链接: http://www.bvbcode.com/cn/.

2、在线P图，不用下载或者等待photoshop打开，很爽的一个网站
链接: https://www.uupoop.com/ps/.

3、最全的jquery源码插件大全
链接: http://www.jq22.com.

4、在线的postwoman，测试接口方便至极
链接: https://postwoman.io/.

5、几个可以免费下载网站源码模板的网站
链接: http://www.bootstrapmb.com/.
链接: https://www.lanrenzhijia.com/.
链接: http://www.dedecms.com/.
链接: https://mb.yangqq.com/.（部分免费）

6、几个可以接收短信验证码的网站，可以手机号注册一些网站账号…
链接: http://www.z-sms.com/.
链接: https://www.materialtools.com/.

7、可以创建虚拟邮箱的网站，可以接收一些不重要的邮件或者用邮箱注册账号…
链接: http://www.5-mail.com/.

8、矢量图标-icon的网站，还是比较全的
链接: https://www.iconfont.cn/.

9、在线JSON 转换 Excel的网站，不用写脚本，直接导出就OK了
链接: http://j2e.kpoda.com/.

10、免费在线word、excel、图片和PDF之间互相转换及处理
链接: http://www.pdfdo.com/.
链接: https://app.xunjiepdf.com/.
链接: https://smallpdf.com/.

11、在线免费下载付费音乐。
链接: http://music.ifkdy.com/.

12、在线压缩图片，不失帧，压缩率平均达80%左右，很牛逼的一个网站
链接: https://tinypng.com/.

13、8个免费高清无版权图片网站！–收藏必备
Pexels: https://www.pexels.com/.
Stock up: https://www.sitebuilderreport.com/stock-up.
别样网: https://www.ssyer.com/.
Unsplash: https://unsplash.com/.
Pixabay: https://pixabay.com/.
StockSnap: https://stocksnap.io/.
Magdeleine: https://magdeleine.co/.
VisualHunt: https://visualhunt.com/.






