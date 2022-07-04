# redux

Redux 的设计思想很简单，就两句话。

1. Web 应用是一个状态机，视图与状态是一一对应的。

2. 所有的状态，保存在一个对象里面。

## store

Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。


```js
import { createStore } from 'redux';// Redux 提供createStore这个函数，用来生成 Store。

const store = createStore(fn);//createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。
```

### store.subscribe()
Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。

```js
import { createStore } from 'redux';
const store = createStore(reducer);

store.subscribe(listener);//放入listen，就会实现 View 的自动渲染
```

store.subscribe方法返回一个函数，调用这个函数就可以解除监听

```js
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
```
## state

Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。

```js
import { createStore } from 'redux';
const store = createStore(fn);

const state = store.getState();//当前时刻的 State，可以通过store.getState()拿到。

```
Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。

## aciton

1. State 的变化必须是 View 导致的。
2. Action 就是 View 发出的通知，表示 State 应该要发生变化了。

可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是`使用 Action`。它会运送数据到 Store。

```js
const action = {//Action 是一个对象
  type: 'ADD_TODO',//type属性是必须的,表示 Action 的名称是ADD_TODO
  payload: 'Learn Redux'//它携带的信息是字符串Learn Redux。
};
```

## action creactor

View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。

可以定义一个函数来生成 Action，这个函数就叫 Action Creator

```js

const ADD_TODO = '添加 TODO';

function addTodo(text) {//addTodo函数就是一个 Action Creator
  return {//这个就是action对象
    type: ADD_TODO,
    text
  }
}

const action = addTodo('Learn Redux');
```

## store.dispatch()
是 View 发出 Action 的唯一方法。

```js
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
```

结合 action creactor来,上面代码等同于

```js
import { createStore } from 'redux';
const store = createStore(fn);

function addTodo(text) {//addTodo函数就是一个 Action Creator
  return {//这个就是action对象
    type: "ADD_TODO",
    text
  }
}

store.dispatch(addTodo('Learn Redux'));
```

## reducer
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

```js
// Reducer 是一个函数，它接受  State和当前  Action作为参数，返回一个新的 State。
const reducer = function (state, action) {
  // ...
  return new_state;
};

```

实际应用中，Reducer 函数不手动调用,可使用store.dispatch方法会触发 Reducer 的`自动执行`。

```js
//store.dispatch方法会触发 Reducer 的`自动执行`。
import { createStore } from 'redux';
const store = createStore(reducer);//为此，Store 需要知道 Reducer 函数
```
以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，

Reducer 函数里面不能改变 State，必须返回一个全新的对象。

## 纯函数
Reducer 是一个纯函数。同样的输入，必定得到同样的输出，不能进行读写操作。

纯函数是函数式编程的概念，必须遵守以下一些约束。

1. 不得改写参数
2. 不能调用系统 I/O 的API
3. 不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果
