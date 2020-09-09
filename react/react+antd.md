
# 安装、配置antd主题、按需加载
* https://3x.ant.design/docs/react/use-with-create-react-app-cn#%E5%AE%89%E8%A3%85%E5%92%8C%E5%88%9D%E5%A7%8B%E5%8C%96

* less-loader现在是7.0版本，有些属性已经取消了，自定义主题配置如下。
```
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' },
    }
  }),
);
```

# npm run build 打包
输出绝对路径改为相对路经，使得静态 html 文件在非服务器环境下也能运行。
打包过后的代码的相互引用都是默认为部署在服务器环境模式，即绝对定位，例如 create-react-app 打包后的 html 文件内部引用其他文件都是 ‘/static/....’；我们现在要改为 ‘./static/...’ 相对路经的形式。
直接修改 package.json。在内部添加一个 homepage 键，赋值为 '.' 即可。这种修改在 eject 之前同样有效。
```
{
  "homepage":"."
}
```

## react路由官网 https://reactrouter.com/


