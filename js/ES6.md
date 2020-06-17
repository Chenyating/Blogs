# ES6笔记
## proxy
```js
const hd={name:'hello'}
const proxy=new Proxy(hd,{
    get(obj,property){
        // console.log(property)
        return obj[property]
    },
    set(obj,property,value){
        obj[property]=value
        return true
    }
})
console.log(proxy.name)
proxy.name='ting'
```

## typeof
typeof 返回值： string，number,boolean,undefined,object,function

es6 ECMscript 规范
## let、const
- 1、声明变量

## const 
- 声明一个只读的`常量`，一旦声明，常量的值就不能改变
- 一定初始化，不能只声明不赋值
- 数组和对象可以添加对应的值。
```js
const obj={}
obj.name="hello"
//如果不想让改变name的话
// 就使用freez方法
window.frees

const arr=[];
arr.push(1);
```

## set、map数据结构
无序不重复

- set：类似于数组，成员是唯一的
- map： 类似于对象

### set
无序不可重复的多个value的集合体

主要方法,属性：
- Set()
- Set(array)
- add(value)
- delete(value)
- has(value)
- clear()
- size


```js
const s=new Set();
s.add(1).add(2).add(3).add(2)
```
- 数组去重
```js
var arr=[1,2,2,2,1,43,5,5,4,5,6,6]
var arr1=new Set(arr)
// arr1:Set(6) {1, 2, 43, 5, 4, …}

// 变为数组
var arr2=[...new Set(arr)]
```

### map
无序的key不重复的多个key-value的集合体

主要方法和属性
- Map()
- Map(array)
- set(key,value)
- get(key)
- delete(key)
- has(key)
- clear()
- size

```js
const m=new Map()
m.set('name','yating').set('age','18');

// 遍历map
for(let i of m){
    console.log(i)
}

// VM191:6 (2) ["name", "yating"]
// VM191:6 (2) ["age", "18"]


for(let [key,value] of m){
    console.log(key,value)
}
// name yating
// age 18
```

## web work
H5规范提供了js分线程的实现，取名为web work

相关api：

- Worker：构造函数，加载分线程执行的js文件
- Worker.prototype.onmessage用于接收另一个线程的回调函数
- Worker.protype.postMessage：向另一个线程发送消息

不足：

- worker内代码不能操作DOM（更新UI）
- 不能跨域加载js
- 不是每个浏览器都支持这个新操作的
  
使用方法
```js
//
var worker=new Worker('./worker.js')
//主线程发送消息
worker.postMessage('hello')

//./worker.js文件可以写
//接收主线程发送过来的消息线程
var onmessage=function(event){
    console.log(event.data)//hello;
}
```

## iterator

迭代器是一种借口机制，为各种不同的数据结构提供统一的访问机制

实现一个迭代器功能
```js
function iteratorUtil(){
    let index=0;//用来表示指针的起始位置
    return{//指针对象
        next(){//指针对象的next方法
            return index<target.length?{value：target[index++],done:false}:{value:target[index++],done:true}
        }
    }
}

// 1. 生成一个迭代器对象
let arr=[1,2,3,4];
let iteratorObj=iteratorUtil(arr);
iteratorObj.next();//value:1,done:false
iteratorObj.next();//value:2,done:false
iteratorObj.next();//value:3,done:false
iteratorObj.next();//value:4,done:false
iteratorObj.next();//value:undefined,done:true
iteratorObj.next();//value:undefined,done:true
```

### iterator原理
