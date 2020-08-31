
import React, { useRef, useState,useEffect,useMemo } from 'react'
import {Button,List} from 'antd'

const {Item} = List

// 用useRef获取最新的值
function Example() {
    const [count, setCount] = useState(0);

    const currentCount = useRef(count);

    currentCount.current = count;
    console.log('currentCount', currentCount)
    const handleClick = () => {
        setTimeout(() => {
            setCount(currentCount.current + 1);
        }, 3000);
    };

    return (
      <div>
        <p>获取最新的值:{count}</p>
        <Button onClick={() => setCount(count + 1)}>
            setCount
        </Button>
        <Button onClick={handleClick}>
            Delay setCount
        </Button>
      </div>
    );
}

// 获取过去中的值 useRef
function Example4() {
    const [count, setCount] = useState(1);

    const prevCountRef = useRef(1);
    const prevCount = prevCountRef.current;
    prevCountRef.current = count;

    console.log('prevCount',prevCount)
    const handleClick = () => {
        setCount(prevCount + count);
    };

    return (
      <div>
        <p>获取过去中的值:{count}</p>
        <Button onClick={handleClick}>SetCount</Button>
      </div>
    );
}

// useEffect
function Counter() {
    const [count, setCount] = useState(0);
    const countRef = useRef();
    countRef.current = count;
    useEffect(() => {
        const id = setInterval(() => {
            console.log( countRef.current);
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
        </button>
        </div>
    );
}

// useMemo
function Example2(props) {
    const [count, setCount] = useState(0);
    const [foo] = useState("foo");

    const main = useMemo(() => (
      <div>
        <Item key={1} x={1} foo={foo} />
        <Item key={2} x={2} foo={foo} />
        <Item key={3} x={3} foo={foo} />
        <Item key={4} x={4} foo={foo} />
        <Item key={5} x={5} foo={foo} />
      </div>
    ), [foo]);

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>setCount</button>
            {main}
        </div>
    );
}

function index() {
    return (
      <>
        <Example />
        <Example4 />
        <Counter />
        <Example2 />
      </>
    )
}
export default index