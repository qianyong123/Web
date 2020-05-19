### 起步
npm init -y
npm install webpack webpack-cli --save-dev
npm install --save lodash
在 index.js 中打包 lodash 依赖

### 管理资源

- 加载css
为了从 JavaScript 模块中 import 一个 CSS 文件，你需要在 module 配置中 安装并添加 style-loader 和 css-loader：
npm install --save-dev style-loader css-loader

- 加载图片
假想，现在我们正在下载 CSS，但是我们的背景和图标这些图片，要如何处理呢？使用 file-loader，我们可以轻松地将这些内容混合到 CSS 中：
npm install --save-dev file-loader

- 加载字体
那么，像字体这样的其他资源如何处理呢？file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，包括字体
+ @font-face {
+   font-family: 'MyFont';
+   src:  url('./my-font.woff2') format('woff2'),
+         url('./my-font.woff') format('woff');
+   font-weight: 600;
+   font-style: normal;
+ }
  .hello {
    color: red;
+   font-family: 'MyFont';
    background: url('./icon.png');
  }
 
 - 加载数据
  此外，可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 import Data from './data.json' 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 csv-loader 和 xml-loader。让我们处理这三类文件：
npm install --save-dev csv-loader xml-loader

### 管理输出
- 预先准备 
动态生成bundle文件的名字
entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    
    output: {
        filename: '[name].bundle.js',
    },

- 设定 HtmlWebpackPlugin
npm install --save-dev html-webpack-plugin
在webpack.config.js文件里面引入
const HtmlWebpackPlugin = require('html-webpack-plugin');
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Output Management'
+     })
+   ],
这时候运行打包命令npm run build 是会在dist文件下面动态生成index.html文件，里面会自动引入bundle.js的文件

- 清理 /dist 文件夹
npm install clean-webpack-plugin --save-dev
const CleanWebpackPlugin = require('clean-webpack-plugin');
  plugins: [
+     new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],


