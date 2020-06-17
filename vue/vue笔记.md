# vue笔记

## 指令

### v-cloak
防止闪现表达式，与css配合：
```js
<div v-cloak>{{msg}}</div>
```

```css
// 匹配属性选择器：[]
[v-cloak]{
    display:none
}
```

### 自定义
1. el:指令属性所在的标签对象
2. binding：包含指令相关信息数据的对象

全局：
```js
//v-upper-text指令的写法
Vue.directive('upper-text',function(el,binding){
    el.textContent=binding.value.toUpperCase();
})
```

局部:
```js
directives:{
    'lower-text':function(el,binding){
        el.textContent=binding.value.toUpperCase();
    }
}
```

## Vue插件

### vue的插件库的创建
```js
(function(){
    // 向外暴露的插件对象
    const MyPlugin={}
    // 插件对象必须要有一个install
    MyPlugin.install=function(Vue,options){
        // 1、添加全局方法或属性
        Vue.myGlobalMethod=function(){
            //Vue函数对象的方法
        }
        // 2、添加全局资源
        Vue.directive('my-directive',function(el,binding){
            // 指定的操作
        }) 
        // 3、添加实例方法
        Vue.prototype.$myMethod=function(){
            // Vue实例对象的方法
        }
    }
    // 最后向外暴露
    window.MyPlugin=MyPlugin
})
```
引用插件

```js
// 声明使用
Vue.use(MyPlugin)
//内部会执行MyPlugin.install(Vue)
```

## 绑定事件
```js
<!-- 创建事件 -->
this.$emit('事件名'，data)
<!-- ·1、给组件绑定事件 -->
this.$refs.refName.$on('事件名'，data)
<!-- 2、给组件绑定事件 -->
<componentName @事件名=“事件”/>
```

## slot插槽
设置插槽：
```html
<div>
    <slot name="slot1"></slot>
    <div>分割线</div>
    <slot name="slot2"></slot>
</div>
```

使用：
```html
<div>
    <div slot="slot1">插槽1的内容</div>
    <div slot="slot2">插槽2的内容</div>
</div>
```

最终效果：
```
插槽1的内容
分割线
插槽2的内容
```

## 模板语法
动态html页面
- v-text:解析为文本
- v-html:解析为html
- 强制数据绑定 `v-bind:src` 等同于 `:src`
- 事件绑定 `v-on:click` 等同于 `@click`

## 计算属性computed
计算属性存在缓存，多次读取只执行一次getter计算
```js
computed:{
    // 计算属性中的一个方法，返回值为属性值；
    // 初始化显示/相关data发生数据改变
    data1(){
        return "newdata1"
    }
    data2:{
        // 回调函数，当需要读取当前属性时回调，根据相关数据计算并返回当前属性的值
        get(){
            return "newdata2"
        },
        // 监视当前属性值的变化；
        // 回调函数，当属性值发生改变时回调，更新相关的属性数据
        set(val){
            // val是data2变化的值
        }
    }
}
```

## 监视watch
第一种
```js
//data是vue中的data属性；
watch:{
    // data发生变化时
    data:function(val){
        this.data1='data has change'
    }
}
```
第二种：
```js
vm.$watch('属性名'，function(newval,oldval){
    <!-- 更新属性名时 -->
    this.data1='data has change'
})
```

## 样式
### class
```html
<p :class="haha"> neirong</p>
<p :class="{haha:ishaha,hehe:ishehe}"> neirong</p>
<p :class="['haha','hehe']"> neirong</p>
```
### style
```html
<p :style="{color:activeColor,fontSize:fontsize+'px'}">context</p>
```

## 条件渲染
v-if:在页面上移除，需要创建对象
v-show:只是隐藏

## 数组
- vue只监听数组本身的改变，不会监听数组内部的变化；
-但vue重新了数组中一系列改变数组内部数据的方法（先调用原生，更新界面）。
-例如：splice，push，unshift,shift
```js
<!-- 没有改变arr本身，数组内部发生变化，但没有调用变异方法，vue不会更新 -->
this.arr[0]=1；
改成下面可更新
this.arr(0,1,1);
```

```html
<!-- 遍历数组元素 -->
<p v-for="(item,index) in arr" :key="index"> {{item}}</p>
<!-- 遍历的是值-属性名 -->
<p v-for="(value,key) in arr[0]" :key="key">{{key}}={{value}}</p>
```

## nextTick
是在下次dom更新循环结束之后执行延迟回调，在修改数据之后使用nextTick，则可以再毁掉中获取更新后的dom；

1. 场景：需要在视图更新之后，基于新的视图操作；

