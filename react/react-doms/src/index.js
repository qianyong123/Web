import React, {Component} from './kreact';
import ReactDOM from './kreact-dom';


function Comp(props){
return <h2>name: {props.name}</h2>
}

class Comp2 extends Component{
  render(){
    return (
      <div>
          <h2>hi {this.props.name}</h2>
      </div>
    )
  }
}

const jsx = (
  <div id="dom">
      <span>123</span>
      <Comp name="函数组件" />
      <Comp2 name="类组件" />
  </div>
)

console.log(jsx)

ReactDOM.render(
  jsx,
  document.getElementById('root')
);

