* axios 原理还是属于 XMLHttpRequest， 因此需要实现一个ajax。
* 还需要但会一个promise对象来对结果进行处理。
* 以get请求为例，实现一个axios
* 实现ajax的get请求
```
var Ajax={
        get: function(url, fn) {
            // XMLHttpRequest对象用于在后台与服务器交换数据
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function() {
                // readyState == 4说明请求已完成
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // 从服务器获得数据
                    fn.call(this, xhr.responseText);
                }
            };
            xhr.send();
        }
    }
```
* 封装Ajax,实现Axios进行回调
```
var Axios = {
        get: function(url) {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onreadystatechange = function() {
                    // readyState == 4说明请求已完成
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        // 从服务器获得数据
                        resolve(xhr.responseText)
                    }
                };
                xhr.send();
            })
        },
    }
```
## axios源码分析
* axios各种方式('delete', 'get', 'head', 'options','post', 'put', 'patch')都是通过request方法发出的。
* 每个axios实例都有一个interceptors实例属性，interceptors对象上有两个属性request、response。InterceptorManager用来实现拦截器的，这个构造函数原型上有3个方法：use、eject、forEach
- request：请求拦截
- response：响应拦截
