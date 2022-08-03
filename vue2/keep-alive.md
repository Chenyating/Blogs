# keep-alive
> <keep-alive>是Vue中内置的一个抽象组件，它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。当它包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们

就是我们可以把一些`不常变动的组件或者需要缓存的组件`用<keep-alive>包裹起来，这样<keep-alive>就会帮我们把组件保存在内存中，而不是直接的销毁，这样做可以保留组件的状态或`避免多次重新渲染，以提高页面性能`。

## 属性
- include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
- exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
- max - 数字。最多可以缓存多少组件实例。

## 原理

### create
```js
created () {
    this.cache = Object.create(null)
    this.keys = []
}
```
this.cache是一个对象，用来存储需要缓存的组件，它将以如下形式存储：

```js
this.cache = {
    'key1':'组件1',
    'key2':'组件2',
    // ...
}
```
this.keys是一个数组，用来存储每个需要缓存的组件的key，即对应this.cache对象中的键值。

### destroyed
当<keep-alive>组件被销毁时，此时会调用destroyed钩子函数，在该钩子函数里会遍历this.cache对象，然后将那些`被缓存的并且当前没有处于被渲染状态的组件`都销毁掉并将其从this.cache对象中剔除。如下：

```js
destroyed () {
    for (const key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys)
    }
}

// pruneCacheEntry函数
function pruneCacheEntry (cache,key,keys,current) {
  const cached = cache[key]
  /* 判断当前没有处于被渲染状态的组件，将其销毁*/
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}
```

### mounted
在mounted钩子函数中观测 include 和 exclude 的变化，如下：

```js
mounted () {
    this.$watch('include', val => {
        pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
        pruneCache(this, name => !matches(val, name))
    })
}
```

### render
```js
//1、 在render函数中首先获取第一个子组件节点的 vnode：
/* 获取默认插槽中的第一个组件节点 */
const slot = this.$slots.default
const vnode = getFirstComponentChild(slot)

// 2、接下来获取该组件节点的名称：
/* 获取该组件节点的名称 */
const name = getComponentName(componentOptions)
/* 优先获取组件的name字段，如果name不存在则获取组件的tag */
function getComponentName (opts: ?VNodeComponentOptions): ?string {
  return opts && (opts.Ctor.options.name || opts.tag)
}

// 3、然后用组件名称跟 include、exclude 中的匹配规则去匹配：
const { include, exclude } = this
/* 如果name与include规则不匹配或者与exclude规则匹配则表示不缓存，直接返回vnode */
if (
    (include && (!name || !matches(include, name))) ||
    // excluded
    (exclude && name && matches(exclude, name))
) {
    return vnode
}

// 4、如果组件名称与 include 规则不匹配或者与 exclude 规则匹配，则表示不缓存该组件，直接返回这个组件的 vnode，否则的话走下一步缓存：

// 5、首先获取组件的key值：
const { cache, keys } = this
/* 获取组件的key */
const key = vnode.key == null
? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
: vnode.key

// 6、拿到key值后去this.cache对象中去寻找是否有该值，如果有则表示该组件有缓存，即命中缓存：
/* 如果命中缓存，则直接从缓存中拿 vnode 的组件实例 */
if (cache[key]) {
    vnode.componentInstance = cache[key].componentInstance
    /* 调整该组件key的顺序，将其从原来的地方删掉并重新放在最后一个 */
    remove(keys, key)
    keys.push(key)
}

// 7、直接从缓存中拿 vnode 的组件实例，此时重新调整该组件key的顺序，将其从原来的地方删掉并重新放在this.keys中最后一个。
// 如果this.cache对象中没有该key值：
/* 如果没有命中缓存，则将其设置进缓存 */
else {
    cache[key] = vnode
    keys.push(key)
    /* 如果配置了max并且缓存的长度超过了this.max，则从缓存中删除第一个 */
    if (this.max && keys.length > parseInt(this.max)) {
        pruneCacheEntry(cache, keys[0], keys, this._vnode)
    }
}
/* 最后设置keepAlive标记位 */
vnode.data.keepAlive = true
```

## 缓存淘汰策略
将新数据从尾部插入到this.keys中；
每当缓存命中（即缓存数据被访问），则将数据移到this.keys的尾部；
当this.keys满的时候，将头部的数据丢弃；

## 被缓存的组件生命周期
组件一旦被 <keep-alive> 缓存，那么再次渲染的时候就不会执行 created、mounted 等钩子函数，但是我们很多业务场景都是希望在我们被缓存的组件再次被渲染的时候做一些事情，好在Vue 提供了 `activated和deactivated` 两个钩子函数，它的执行时机是 <keep-alive> 包裹的组件激活时调用和停用时调用