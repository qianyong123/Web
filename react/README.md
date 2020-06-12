git commit 提交时检测代码是否规范
 "husky": {
     "hooks": {
       "pre-commit": "npm run lint-staged"
     }
   },

### antV  
AntV 是一个数据可视化项目，也是一个团队，蚂蚁金服数据可视化团队，一群有爱有梦的人，怀揣"让人们在数据世界里获得视觉化思考能力"的梦想前行， 希望成就智能时代全球领先的数据可视化解决方案，满足与日俱增的数据洞察需求。 详见 https://antv.vision/zh
https://l7.antv.vision/zh/docs/api/react/scene 

### prop-types 
可以对父组件传来的props进行检查
//安装
npm install prop-types --save
//引入
import PropTypes from 'prop-types';

optionalArray: PropTypes.array,
optionalBool: PropTypes.bool,
optionalFunc: PropTypes.func,
optionalNumber: PropTypes.number,
optionalObject: PropTypes.object,
optionalString: PropTypes.string,
optionalSymbol: PropTypes.symbol,

使用isRequired设置属性为必须传递的值
Greeting('组件名字').defaultProps = {
  name: 'Stranger'
};
Greeting('组件名字').propTypes = {
  name:PropTypes.string.isRequired,
};

ES7中使用方法示例
class Greeting extends React.Component {
  //如果没有传递该属性时的默认值
  static defaultProps = {
    name: 'stranger'
  }
  //如果传递该属性，该属性值必须为字符串
  static propTypes={
    name:PropTypes.string
  }
  render() {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}

### js-cookie
npm install js-cookie --save
import Cookies from 'js-cookie'
1.存到Cookie去
Cookies.set('name', 'value');
Cookies.set('name', 'value', { expires: 7 });
Cookies.set('name', 'value', { expires: 7, path: '' });
2.在Cookie中取出
Cookies.get('name'); // => 'value'
Cookies.get('nothing'); // => undefined
Cookies.get(); // => { name: 'value' }
3.删除
// Delete cookie:
Cookies.remove('name');
Cookies.set('name', 'value', { path: '' });
Cookies.remove('name'); // fail!
Cookies.remove('name', { path: '' }); // removed!

### moment
npm install moment --save 
import moment from 'moment'
moment().format('MMMM Do YYYY, h:mm:ss a'); // 五月 22日 2020, 2:10:53 下午
moment().format('YYYY-MM-DD'); // 2020-05-22
isBefore()  检查一个 moment 是否在另一个 moment 之前。 第一个参数会被解析为 moment
isSame() 检查一个 moment 是否与另一个 moment 相同。 第一个参数会被解析为 moment
isAfter() 检查一个 moment 是否在另一个 moment 之后。 第一个参数会被解析为 moment
moment('2010-10-20').isBefore('2010-10-21'); // true

### recompose
它提供了一系列小而美的高阶函数，可以简化我们平常编写的代码，可以吧多个高阶组件组合起来
import { compose } from 'recompose';
compose(name1,name2)(组件名字)




