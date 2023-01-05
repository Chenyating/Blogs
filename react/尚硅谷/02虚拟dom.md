# 虚拟Dom创建方式
1. 原生方式,缺点：嵌套变套娃
```js
 React.createElement('h1',{id:'title'},'hello React')
```
2. react 方式
```jsx
const VDOM=<h1 id="title">hello React</h1>
```
   
# 和真实dom比较
1. 虚拟dom没有真实dom这么多属性，比较轻量
2. 虚拟dom是object对象
3. 真实dom打印在控制台是标签

# xml是什么
1. 早期用于存储和传输数据
```xml
<student>
    <name>yating</name>
    <age>18</age>
</student>
```

# jsx写法
1. 虚拟dom不写引号，直接写标签，最外侧包一个div
2. 使用变量的时候，用花括号{变量}
3. 使用样式名，用className
4. style样式用key:value的方式写： `style={{color:'red'}}`。
5. 使用组件必须以大写开头；小写会转成html的标签。
6. 虚拟dom只能写表达式，不能写代码语句

# 表达式和代码的区分
1. 表达式最后产生一个值，也可以是一个对象
2. 代码语句：if,for,switch

# 模块和组件化的理解
1. 模块：主要针对js，一个js一个模块。
2. 组件：局部功能效果的代码资源的集合；
3. 模块化：js模块组件成的；组件化：组件组成。
   
# 类式组件
```jsx
class Newconponent extend React.Component{
    render(){
        return <div>虚拟dom</div>
            }
}

// 渲染
ReactDom.render(<Newconponent/>,document.getById('app'))
```

