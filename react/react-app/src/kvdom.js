// vdom转换为dom
// diff
// vtype 元素类型：1-html；2-function组件；3-class组件
export function createVNode(vtype, type, props){
    const node = {vtype, type, props}

    return node
}

// vdom 转换为真实的dom

export function initVNode(vnode){
    const {vtype,props} = vnode
}

