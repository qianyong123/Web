### 项目初始化

* 修改element-ui的css样式： 去掉style里面的scoped，直接复制lement-ui里面的class名字修改的样式是全局的，  局部的需要 自己取一个class名字覆盖之前的样式 如 .class /deep/ .el-input
切换element-ui表格组件的时候，出现纵向滚动条时，需要在表格最外层div加overflow：hidden，不然会把容器撑大
解决ele小图标出不来问题  在build目录下面的utils   
```
if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',     
        publicPath: '../../',//解决ele小图标出不来问题
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
```
* vue 里面按需引入elemtnt-ui 需要cnpm install babel-preset-es2015 --save-dev


* vue锚点跳转
  let anchors= this.$el.querySelector(anchor[0])  
  // document.documentElement.scrollTop = anchor.offsetTop 
  anchors.scrollIntoView() 

* vue 富文本编译器 wangeditor
