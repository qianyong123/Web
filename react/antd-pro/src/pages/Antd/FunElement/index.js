import React, { useEffect, useState, useRef } from 'react'
import { Button } from 'antd'

function Counter({ initialCount }) {
    const [count, setCount] = useState(initialCount);
    return (
        <>
            Count: {count}
            <Button onClick={() => setCount(initialCount)}>Reset</Button>
            <Button onClick={() => {
                if(count > 0) setCount(count - 1)
            }}>-</Button>
            <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
        </>
    );
}

function Index(props) {
    const { title = "函数组件", count } = props
    // eslint-disable-next-line react/destructuring-assignment
    useEffect(() => {
        console.log(count)
        return () => {
            // 清除订阅
            console.log('清除订阅')
        };
    }, [count])
    return (
        <div>
            {title + count}
        </div>
    )
}

const Elements = () => {
    const [title, setTitle] = useState()
    const [count, setCount] = useState(0)
    return (
        <div>
            <Index title={title} count={count} />
            <Button onClick={() => {
                setCount(count + 1)
            }}
            >
                点击
        </Button>
            <Button onClick={() => {
                setTitle('组件')
            }}
            >点击2
        </Button>
            <br />
            <Counter initialCount={0} />
            <TextInputWithFocusButton />
        </div>
    )

}


function TextInputWithFocusButton() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
        // `current` 指向已挂载到 DOM 上的文本输入元素
        inputEl.current.focus();
    };
    return (
        <>
            <input ref={inputEl} type="text" />
            <Button onClick={onButtonClick}>Focus the input</Button>
        </>
    );
}



export default Elements
