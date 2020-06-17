# 什么是react：
- 一个用于动态构建用户界面的js库；
- facebook开源的js库；

特点：
- 声明式编程
- 组件化编码
- 支持客户端与服务器渲染
- 高效
- 单向数据流

react高效的原因：
- 虚拟DOM，不总是直接操作DOM
- 高效的DOM diff算法，最小化页面重绘；

模块与组件：
- 模块：每个js文件都算是一个模块。（向外提供特定功能的js程序）
- 组件：用来实现特定功能效果的`代码集合`

模块化和组件化：
- js都以模块来编写，这个应用就是一个模块化的应用；
- 应用是以多组件的方式实现功能，这个应用就是组件化应用

- react：组件核心库
- react-dom：操作DOM的扩展库

虚拟DON：
1. `React.createElement(type,[props],..chirldren)`:React.createElement('h1',{id:'mytitle'},'hello);
2. `let element=<h1>hello</h1>`
3. 最终都会被React转为真是的DOM：ReactDOM.render(虚拟对象，容器)

jsx：javasript xml
1. 用来创建React虚拟dom对象；
2. 标签任意；

diff算法：最小页面重绘；
