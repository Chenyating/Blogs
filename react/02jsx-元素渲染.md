# jsx-元素渲染

## 虚拟dom
React 的一大亮点就是虚拟 DOM：可以在内存中创建虚拟 DOM 元素，由虚拟 DOM 来确保只对界面上真正变化的部分进行实际的 DOM 操作。和真实 DOM 一样，虚拟 DOM 也可以通过 JavaScript 来创建：

```js
const ele = React.createElement('div', null, 'hello, world')
// 缺点可读性差，于是就有了jsx。
```
React Virtual DOM 就是由 React Element 构成的一棵树。

每个 DOM 对象都有一个与之对应的“虚拟 DOM 对象”，它是 DOM 对象的表示形式，是轻量级的 JavaScript 对象。


## JSX
JSX 是 JavaScript 的语法扩展，可以 HTML 标签形式来创建虚拟 DOM，也可以说 JSX 是 React.createElement 的一个语法糖。

### 标签类型
所有标签，都必须有闭合标签 />
```js
// HTML 类型标签,需小写字母开头
const ele = <div>hello, world</div>

// react 组件类型标签,必须以大写字母开头。
const component = <HelloWrold />
```

JSX 不是标准的 JavaScript，需要编译器 Babel 将 JSX 代码编译成标准的 JavaScript 语言。

Babel 会把 JSX 转译成一个名为 React.createElement() 的函数调用，可以理解为 JSX 是使用一些规则来编写 React.createElement(type, config, children) 的快捷方式，可以将 JSX 视为编写 React.createElement() 声明的更简短且更自然的方法。

### 优点
1. 使用熟悉的语法定义 HTML 元素，提供更加语义化的标签，使用 JSX 编写模板更简单快速；
2. 更加直观：JSX 让小组件更加简单、明了、直观；
3. 抽象了 React 元素的创建过程，使得编写组件变得更加简单；
4. JSX 执行更快，因为它在编译为 JavaScript 代码后进行了优化；
5. JSX 是类型安全的，在编译过程中就能发现错误；
6. 防注入攻击，所有的内容在渲染之前都被转换成了字符串，可以有效地防止 XSS（跨站脚本） 攻击。


## 元素渲染
React 元素是 React 应用中最小的可渲染单位，组件是由元素组成。
### 创建react元素的方式

```js
// 1、jsx语法方式创建，，必须引入react库
const element = <h1>Hello, world</h1>;

//  2、React.createElement() 方式创建元素
// [] 中括号里的是选填项
React.createElement(
    type,         // 元素类型，可以是标签名字符串，也可以是 React 组件或者 React fragment， 比如：'div' 'span' 'React.Fragment'
    [props],      // 属性，对象形式，比如：{className: 'title'}
    [...children] // 子节点，比如：react元素、dom元素或文本
)

// 3. React.cloneElement() 方式创建元素
// [] 中括号里的是选填项
React.cloneElement(
    element,      // 元素类型，必须是 React 元素
    [props],      // 属性，对象形式，比如：{className: 'title'}
    [...children] // 子节点，比如：react元素、dom元素或文本
)
```
### 渲染方式
将 React 元素呈现到浏览器 DOM 中由根 DOM 元素来承载。
```js
<div id="root"></div>//名为root的根dom元素


// ReactDOM.render() 方法的返回值，其实是根元素的 React 实例。
ReactDOM.render(
    element,    // 要渲染的元素
    container,  // 元素要渲染的容器
    [callback]  // 回调函数，可选的
)
```

## 更新元素
React 元素是不可变的，一旦创建了元素，就无法更新其子代或者属性。
ReactDOM.render() 通常只会调用一次。React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会更新需要更新的部分。

### 为什么render只调用一次
render 执行得到的并不是真正的 DOM 节点，得到的仅仅是轻量级的 JavaScript 对象，我们称之为虚拟 DOM（具有批处理特性以及高效的 diff 算法，随时更新整个页面而无需担心性能问题）

虚拟 DOM 确保只对界面上真正变化的部分进行实际的 DOM 操作。

## 虚拟dom渲染原理
操作真实 DOM 会引起重排和重绘，会影响到性能，因此要尽量减少 DOM 操作。





