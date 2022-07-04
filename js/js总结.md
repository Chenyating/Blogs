# 总结

## 数字类型
在js中是没有整数和小数的概念的，其实整数也是以浮点数的形式表示的

```js
console.log(0.1+0.2)
VM226:1 0.30000000000000004
```
1. 在十进制转换为二进制的过程中，会产生精度的损失。
2. 二进制浮点数进行对阶运算时，也会产生精度的损失。
## console

可以测试一段程序执行的时间
- console.time('A')
- console.timeEnd('A')

## Symbol
Symbol是ES6中新增的类型，它创建出来的值是唯一的；
```js
Symbol('123')==Symbol('123')//false
```
对象的属性名不能是对象，遇到对象属性名，会默认转为字符串；

## 判断url是否为正确
1. 协议: http、https、ftp
2. 域名: www.xxx.com、 xxx.cn、xxx.bbb.ccc.com.cn
3. 请求路径: /index.html /xxx/ 
```js
let str="https://www.yating.online/api?num=1&page=5"
let reg=/^(https|http|ftp):\/\/)?(([\w-]+\.\.)+[a-z0-9]+)((\/[^/]*)+)?(\?[^#]+)?(#.+)$/i;
```

## 公有私有方法
```js
function Foo(){
    Foo.a=function(){
        console.log(1)
    }
    this.a=function(){
        console.log(2)
    }
}
// 吧Foo当做类，在原型上设置实例公有属性方法
Foo.prototype.a=function(){
    console.log(4)
}
//把foo当做普通对象设置私有属性方法 
Foo.a=function(){
    console.log(3)
}

Foo.a();//3
new obj=new Foo();//会执行Foo();替换之前的
obj.a();
Foo.a();

// 结果为：3，2，1
```

## 作用域
### 全局
### 局部
局部作用域：函数定义的时候产生，作用域定义好，就一直存在，且不会反复定义

## 垃圾回收机制
### 技术清除 
看内存的地址上有几个指针指向，当一块内存地址身上指针个数为0，说明这块内存马上要被回收

```js
var obj={a:1}
obj=null
```

- IE低版本、老的chrome
- 慢慢淘汰

### 标记清除
进入代码执行的环境以后检测到需要使用的变量就在其身上加一个进场标记，代码执行完毕就在身上添加出场标记

## 同步和异步

### 同步
- 同步会阻塞后面的代码执行
- 没有回调

### 异步
- 异步是非阻塞
- 异步一定有回调

## 单线程
- 代码从上到下执行
- 同步& 一步，同步任务会导致阻塞
- 同步代表，alert()，console.log()，赋值语句


