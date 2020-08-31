import React, { useEffect } from 'react'
import { Button } from 'antd'

// 防抖
function debounce(fun, delay) {
    let time = null
    return () => {
        if (time) {
            clearTimeout(time)
        } 
        time = setTimeout(fun, delay)
        
    }
}


function throttling(fun, delay) {
    console.log('dd')
    let time = true
    return () => {
        if (time) {
            time = false
            setTimeout(() => {
                fun();
                time = true
            }, delay)
        }
    }
}

    function index() {
        function showTop() {
            const scrollTopp = document.body.scrollTop || document.documentElement.scrollTop
            console.log('滚动条的位置', scrollTopp)
        }
        window.addEventListener('scroll', debounce(showTop, 1000))

        function onClick() {
            console.log('节流')
        }


    return (
        <div style={{ height: '100vh' }}>
            <Button onClick={throttling(onClick, 1000)}>节流</Button>
        </div>
    )
}





export default index
