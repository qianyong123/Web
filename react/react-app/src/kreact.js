
import { createVNode } from './kvdom'
function createElement(type, props){
    // props.children = children || []
    // vtype：组件类型
    let vtype;

    if (typeof type === 'string'){
        // 原生标签
        vtype = 1
    } else if(typeof type === 'function'){
        if(type.isClassComponent){
            // 类组件
            vtype = 2
        } else {
            // 函数组件
            vtype = 3
        }
    }
    return createVNode(vtype, type, props)
}

export default { createElement }

export class Component{
    static isClassComponent = true
    constructor(props){
        this.props = props
        this.state = {}      
    }
    setState(){

    }
}