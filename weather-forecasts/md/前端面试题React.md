# 1. 说一下 React Hooks 在平时开发中需要注意的问题和原因？

- 1）不要在循环，条件或嵌套函数中调用 Hook，必须始终在 React 函数的顶层使用 Hook

- 这是因为 React 需要利用调用顺序来正确更新相应的状态，以及调用相应的钩子函数。一旦在循环或条件分支语句中调用 Hook，就容易导致调用顺序的不一致性，从而产生难以预料到的后果。

- 2）使用 useState 时候，使用 push，pop，splice 等直接更改数组对象的坑

- 使用 push 直接更改数组无法获取到新值，应该采用析构方式，但是在 class 里面不会有这个问题

- 3）useState 设置状态的时候，只有第一次生效，后期需要更新状态，必须通过 useEffect

- 看下面的例子

- TableDeail 是一个公共组件，在调用它的父组件里面，我们通过 set 改变 columns 的值，以为传递给 TableDeail 的 columns 是最新的值，所以 tabColumn 每次也是最新的值，但是实际 tabColumn 是最开始的值，不会随着 columns 的更新而更新

```js
const TableDeail = ({ columns }: TableData) => {
  const [tabColumn, setTabColumn] = useState(columns);
};

// 正确的做法是通过useEffect改变这个值
const TableDeail = ({ columns }: TableData) => {
  const [tabColumn, setTabColumn] = useState(columns);
  useEffect(() => {
    setTabColumn(columns);
  }, [columns]);
};
```

- 4）善用 useCallback

- 父组件传递给子组件事件句柄时，如果我们没有任何参数变动可能会选用 useMemo。但是每一次父组件渲染子组件即使没变化也会跟着渲染一次。

- 5）不要滥用 useContext

- 可以使用基于 useContext 封装的状态管理工具。

# 2. 
