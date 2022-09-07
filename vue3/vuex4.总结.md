# vuex4

这个状态自管理应用包含以下几个部分：

- 状态:驱动应用的数据源；
- 视图:以声明方式将状态映射到视图；
- 操作:响应在视图上的用户输入导致的状态变化。

状态=》视图=》操作=》状态

## 下载
```js
npm install vuex@next --save
```

## 获取vuex实时数据
 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态：

```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```