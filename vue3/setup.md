setup


```js
 setup() {
 let count=1;
    return {
      count//在页面可以直接使用count
    }
  }

 setup() {
 let count=1;
    return （）=>h('h1','hello') //页面则直接显示hello
  }
```

ref：定义一个响应式的数据；
基本数据类型，靠objject.defineProperty的get和set函数；
对象类型的函数，使用reactive函数，proxy。

reactive函数：
定义一个对象类型的响应数据，基本类型不要用这个。

计算属性
```js
let fullName=computed(()=>{
  
})
完整写法：
let fullName=computed({
  get(){
    return 
  },
  set(val){

  }
})
```

watch

```js
watch(obj,(newVal,oldVal)=>{

})
watch([obj1,obj2],(newVal,oldVal)=>{

},{immediate:true})

若监视reactive定义响应式数据，
1、则无法正确获取oldvalue；newVal和oldVal是一样的。
2、强制深度监视，deep：false也默认执行
 监视某个属性
watch(()=>obj.name,(newVal,oldVal)=>{
// 就可以看到变化
},{immediate:true})


```
watchEffect；

watchEffect(()=>{
  <!-- 内部用到了谁，谁改变了就触发 -->
})