# React-Redux

React-Redux 将所有组件分成两大类：
1. UI 组件（presentational :负责 UI 的呈现
2. 容器组件（container component）:负责管理数据和逻辑。

React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。

## UI 组件

```jsx

const Title =
	value => <h1>{value}</h1>;
```
UI 组件又称为"纯组件"，即它纯函数一样，纯粹由参数决定它的值。

1. 只负责 UI 的呈现，不带有任何业务逻辑
2. 没有状态（即不使用this.state这个变量）
3. 所有数据都由参数（this.props）提供
4. 不使用任何 Redux 的 API

## 容器组件
1. 负责管理数据和业务逻辑，不负责 UI 的呈现
2. 带有内部状态
3. 使用 Redux 的 API

# 