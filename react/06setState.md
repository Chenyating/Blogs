# setState
```js
setState(updater, callback)
//setState 可以接收两个参数：第一个参数可以是对象或函数，第二个参数是函数。
// setState 的第二个参数是一个可选的回调函数。这个回调函数将在组件重新渲染后执行。等价于在 componentDidUpdate 生命周期内执行。通常建议使用 componentDidUpdate 来代替此方式。在这个回调函数中你可以拿到更新后 state 的值。
```

## 对象的写法：
```js
this.setState({
    key: newState
});
```
注意：setState是异步的，setState 调用之后，this.state 不会立即映射为新的值。
```js
 handleClick () {
    this.setState({
        val: this.state.val + 1
    })
     this.setState({
        val: this.state.val + 1
    })
  }

// 等同于
// 后面的数据会覆盖前面的更改，所以最终只加了一次.
Object.assign(
  previousState,
  {val: state.val + 1},
  {val: state.val + 1},
)
```

## 函数写法：

```js
this.setState((prevState, props) => {
  return {
      key: prevState.key // prevState 是上一次的 state，props 是此次更新被应用时的 props
  }
})
```

```js
 handleClick () {
    this.setState((prevState, props) => {
            val: prevState.val + 1
        }
    })
     this.setState((prevState, props) => {
            val: prevState.val + 1
        }
    })
 }
// 等同于
handleClick () {
    this.setState((prevState, props) => {
            val: prevState.val + 1
        }
    })
     this.setState((prevState, props) => {
            val: prevState.val + 1
        }
    })
 }
//  调用了两次 setState，但 state 的更新会被合并，所以即使多次调用 setState，实际上可能也只是会重新渲染一次。
 ```

## 性能上的思考
 setState 只是把要修改的 state 放入一个队列， React 会优化真正的执行时机，并出于性能原因，会将 React 事件处理程序中的多次React 事件处理程序中的多次 setState 的状态修改合并成一次状态修改。 最终更新只产生一次组件及其子组件的重新渲染，这对于大型应用程序中的性能提升至关重要

## 修改state的两种方法
1. 构造函数里修改 state ，只需要直接操作 this.state 即可， 如果在构造函数里执行了异步操作，就需要调用 setState 来触发重新渲染。
2. 在其余的地方只能使用 setState，这样 React 才会触发 UI 更新。

## setState更新机制
