## CSS3属性

* CSS3边框：
- border-radius：CSS3圆角边框。在 CSS2 中添加圆角矩形需要技巧，我们必须为每个圆角使用不同的图片，在 - CSS3 中，创建圆角是非常容易的，在 CSS3 中，border-radius 属性用于创建圆角。border：2px solid;
- box-shadow：CSS3边框阴影。在 CSS3 中，box-shadow 用于向方框添加阴影。box-shadow:10px 10px 5px #888888;
- border-image：CSS3边框图片。通过 CSS3 的 border-image 属性，您可以使用图片来创建边框。
- border-image：url(border.png) 30 30 round;

* CSS3背景：
- background-size： 属性规定背景图片的尺寸。在 CSS3 之前，背景图片的尺寸是由图片的实际尺寸决定的。在 CSS3 中，可以规定背景图片的尺寸，这就允许我们在不同的环境中重复使用背景图片。您能够以像素或百分比规定尺寸。如果以百分比规定尺寸，那么尺寸相对于父元素的宽度和高度。
- background-origin ：属性规定背景图片的定位区域。背景图片可以放置于 content-box、padding-box 或 border-box 区域。

* CSS3文字效果：

- text-shadow：在 CSS3 中，text-shadow 可向文本应用阴影。text-shadow:5px 5px 5px #FFFFFF;
- word-wrap :单词太长的话就可能无法超出某个区域，允许对长单词进行拆分，并换行到下一行：p{word-wrap:break-word;}

*  CSS3 2D转换：
- transform：通过 CSS3 转换，我们能够对元素进行移动、缩放、转动、拉长或拉伸。
- translate()：元素从其当前位置移动，根据给定的 left（x 坐标） 和 top（y 坐标） 位置参数。
- transform：translate（50px,100px）;值 translate(50px,100px) 把元素从左侧移动 50 像素，从顶端移动 100 像素。
- rotate()：元素顺时针旋转给定的角度。允许负值，元素将逆时针旋转。transform:rotate(30deg);值 rotate(30deg) 把元素顺时针旋转 30 度。
- scale():元素的尺寸会增加或减少，根据给定的宽度（X 轴）和高度（Y 轴）参数：transform:scale(2,4);值 - scale(2,4) 把宽度转换为原始尺寸的 2 倍，把高度转换为原始高度的 4 倍。
- skew():元素转动给定的角度，根据给定的水平线（X 轴）和垂直线（Y 轴）参数：transform:skew(30deg,20deg);值 skew(30deg,20deg) 围绕 X 轴把元素转动 30 度，围绕 Y 轴转动 20 度。
- matrix() 方法把所有 2D 转换方法组合在一起。
- matrix() 方法需要六个参数，包含数学函数，允许您：旋转、缩放、移动以及倾斜元素。

* CSS3 3D转换：
- rotateX()：元素围绕其 X 轴以给定的度数进行旋转。transform：rotateX(120deg);
- rotateY()：元素围绕其 Y 轴以给定的度数进行旋转。transform：rotateY(120deg);

* CSS3 过渡：当元素从一种样式变换为另一种样式时为元素添加效果。

* CSS3动画：通过 CSS3，我们能够创建动画，这可以在许多网页中取代动画图片、Flash 动画以及 JavaScript。

* CSS3多列：
- column-count：属性规定元素应该被分隔的列数。
- column-gap：属性规定列之间的间隔。
- column-rule ：属性设置列之间的宽度、样式和颜色规则。

* CSS3用户界面：

- resize：属性规定是否可由用户调整元素尺寸。
- box-sizing：属性允许您以确切的方式定义适应某个区域的具体内容。
- outline-offset ：属性对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓。

## CSS3伪类选择器

  ### Pseudo-Classes Selectors(伪类选择器)

* E:not(s) 选中除了谁。 ()里面填条件，也就是选择器。

* E:root 选择根目录的意思，在我们的html文件里面，他是选 html标签 也就是  html标签选择器。但是呢，如果换成xml呢，他的根目录就不一定是 html了吧。所以有人说 root就是html，那是错误的
    要用的话，直接写  :root{ background-color:red;} 即可 相当于 html:{ background-color:red;} 
　　
* E:target a标签URL后面跟锚点#，指向文档内某个具体的元素。 也就是说，url后面的锚点，指向  某个元素， 那么该元素就会触发 target

* E:first-child　first-child选择父元素下的第一个子元素
* E:last-child   last-child选择父元素下最后一个子元素
* E:only-child　选择，父元素下的 独生子，也就是说，看父元素下面的子元素，是不是仅有一个。是的话，那就选中
* E:nth-child(n)　选择父元素下面的 第几个子元素，(n) 可以计算， n是从0 开始的， 但是 css里面的索引是从1 开始的 而even作为参数用来表示偶数，odd作为参数用来表示奇数
* E:nth-last-child(n)   跟上面的选择器大同小异， 只不过人家是从 最后一位开始查数。 填(1) 选的是最后一位

以上的这5个选择器都会受到 其他元素的影响， 例如父元素下面第一个不是他的话，就选不了。 

但是以下五个选择器，不会受到其他元素的影响。

* E:first-of-type   在父元素下面寻找 第一个所匹配的子元素
* E:last-of-type    在父元素下面寻找 最后一个所匹配的子元素
* E:only-of-type　　匹配父元素的所有子元素中唯一的那个子元素
* E:nth-of-type(n)  匹配父元素的第n个子元素，跟 E:nth-child(n)  差不多。 不过 nth-child 会受到其他元素影响， 而nth-of-type 不会  
* E:nth-of-last-type(n)   跟 E:nth-of-type(n) 相反的， E:nth-of-type(n)是按照 第一个开始查，  这个是按照倒数第一位查

这上面的选择器，不会考虑其他元素的的影响。

* E:empty　匹配里面没有任何东西的元素。也就是说，你选择的那个元素，里面不要有东西才可以选中
* E:checked　匹配用户界面上处于选中状态的元素E。(用于input type为radio与checkbox时)
* E:enabled　用于选择 input的 正常状态
* E:disabled    禁用

* E:read-only　readonly 呢 是input 标签上的属性， 设置了这个属性后，就是不可以填写，也不可以操作
* E:read-write read-write：也就是选中没有设置readonly。用处不大
* E::selection 来美化选中文本
* E::placeholder来美化占位符


## css3伪元素

* ::before定位的基准是其主元素的右上角
* ::after定位的基准是主元素的结尾处
content是伪元素必需的属性，其内容可以分为几类：字符串/attr/url/counter(计算器)。若伪元素没有内容，需赋值为空格：content:' ';