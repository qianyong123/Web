
## 内容超出显示省略号
```
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break:keep-all;
```
## 元素垂直居中的方式

``` 
    .wrapBox5{
        width: 300px;
        height: 300px;
        border:1px solid red;
        position: relative;
    }
    .wrapItem5{
        width: 100px;
        height: 50px;
        position: absolute;
        background:yellow;
        top: 50%;
        left:50%;
        margin-top: -25px;
        margin-left: -50px;
    }    
```

    ```
        子元素必须设置宽高
        .wrapBox{
            width: 300px;
            height: 300px;
            background: yellow;
            position: relative;
        }
        .wrapItem{
            width: 100px;
            height: 50px;
            background:green;
            display: inline-block;
            position: absolute;
            top: 0px;
            bottom:0px;
            left: 0px;
            right: 0px;
            margin:auto;
        }
    ```

    ```
        原理类似于已知宽高的实现方式，只不过当前居中元素宽高未知，所以需要自动获取当前居中元素的宽高。translate属性正好实现了该功能。
        .wrapBox{
            width: 300px;
            height: 300px;
            background:#ddd;
            position: relative;
        }
        .wrapItem{
            width: 100px;
            height: 50px;
            background:green;
            position: absolute;
            top: 50%;
            left:50%;
            transform: translate(-50% , -50%);
        }
    ```

    ```
        .wrapBox2{
            width: 300px;
            height: 300px;
            background: blue;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        /*注意：即使不设置子元素为行块元素也不会独占一层*/
        .wrapItem2{
            width: 100px;
            height: 50px;
            background:green;
        }
    ```


    ```
        根据table的vertical-align属性，可以在表格元素内设置元素居中，再根据text-align设置水平居中
        .wrapBox3{
            width: 300px;
            height: 300px;
            background: yellow;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
        }
        .wrapItem3{
            width: 100px;
            height: 50px;
            background:green;
            display: inline-block;
        }

    ```





