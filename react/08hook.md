# hook
Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。

Hook 在 class 内部是不起作用的

## 使用规则
- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）

# useState

- 参数：useState() 方法里面唯一的参数就是初始 state
- 返回值：当前 state 以及更新 state 的函数

## 读取
```js
// class中：
<p>You clicked {this.state.count} times</p>

// 函数中：
<p>You clicked {count} times</p>
```
## 更新

```js
// class中：
<button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Click me
  </button>

// 函数中：
<button onClick={() => setCount(count + 1)}>
    Click me
  </button>```

```js
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);
// useState 会返回一对值：当前状态和更新它的函数，这两个都是自定义的。
  return (
      <button onClick={() => setCount(count + 1)}>
      {/*
      setCount类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并
      */}
        Click me
      </button>
  );
}
```
等价class示例
```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
    );
  }
}
```
# useEffect(fn,[])
模拟 componentDidMount 生命周期

#  Effect Hook
- 返回一个函数：这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数
- React 何时清除 effect？ React 会在组件卸载的时候执行清除操作。

# 自定义 Hook
自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。

- 自定义 Hook 必须以 “use” 开头
# useContext
让你不使用组件嵌套就可以订阅 React 的 Context。

# useReducer 
通过 reducer 来管理组件本地的复杂 state
```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    default:
      throw new Error()
  }
}

import React, { useReducer } from 'react'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
    
  return (
    <div>
      <h1>you click {state.count} times</h1>
      <input type="button" onClick={()=> dispatch({type: 'increment'})} value="click me" />
    </div>
  ) 
}

export default App
```

## useCallback和useMemo
shouldComponentUpdate 中可以通过判断前后的 props 和 state 的变化，来判断是否需要阻止更新渲染。但使用函数组件形式失去了 shouldComponentUpdate，我们无法通过判断前后状态来决定是否更新，这就意味着函数组件的每一次调用都会执行其内部的所有逻辑，会带来较大的性能损耗。useMemo 和 useCallback 的出现就是为了解决这一性能问题。