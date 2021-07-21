
import React from './kreact'
function render(vnode,container){

    container.innerHTML = `<pre>${JSON.stringify(vnode, null, 2)}</pre>`
}

export default {render}  