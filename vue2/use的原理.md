# use的原理

转载自知乎。感觉代码注释写的不错复制一下。
```js
mport { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  // 接受一个 plugin 参数, 可以是function, 或者object
  Vue.use = function (plugin: Function | Object) {
    // 维护了一个 _installedPlugins 数组，它用来存储所有注册过的 plugin
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    // 如果传入的plugin已经注册过，直接返回这个vue实例
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // 把arguments这个类数组对象转化为数组
    const args = toArray(arguments, 1)
    // 在数组第一个位置args[0]加入这个vue实例 
    args.unshift(this)
    // 判断 plugin 有没有定义 install 方法，如果有的话则调用该方法，并且该方法执行的第一个参数是 Vue
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    // 把 plugin 存储到 installedPlugins 中
    installedPlugins.push(plugin)
    // 返回vue实例
    return this
  }
}
```
Vue 提供的插件注册机制很简单，每个插件都需要实现一个静态的install方法，当我们执行Vue.use注册插件的时候，就会执行这个install方法，并且在这个install方法的第一个参数我们可以拿到Vue对象，这样的好处就是作为插件的编写方不需要再额外去import Vue了

用通俗的话：传入一个插件名，会去插件的数组里查找是否存在。如果存在的话就返回这个实例。

如果不存在，就把这个插件名插入到数组里第一个位置。再判断这个插件是对象吗？
是对象就执行里面的install方法。
是方法的话就执行它。