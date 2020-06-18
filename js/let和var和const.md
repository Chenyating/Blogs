# let和var和const
js引擎在代码正式执行之前会做一个预处理的工作：1、收集变量、2、收集函数

var 将var后面的变量定义，但是不赋值，

function(){} 提前定义函数

## const 
- 声明一个只读的`常量`，一旦声明，常量的值就不能改变，不可重复赋值；
- 也有暂时性死去，只在当前块级作用域下有效；
- 数组和对象可以添加对应的值。

```js
const obj={}
obj.name="hello"
//如果不想让改变name的话
// 就使用freez方法
window.freez

const arr=[];
arr.push(1);
// 数组里面的值可以增加删除修改。
// 但是不能直接把一个数组赋值给arr。
arr=[1,2]//报错
```

1. JavaScript 中，函数及变量的`声明都将被提升到函数的最顶部`。
2. JavaScript 中，`变量可以在使用后声明`，也就是变量可以先使用再声明。

### 本质
1. 变量指向的是那个内存地址，对于简单数据类型，保存在变量指向的内存地址中，因此等同于常量；
2. 对于复合类型的数据（对象，数组），变量指向的内存地址保存的是一个指针。指针是固定的，但是它指向的数据结构是可变的；



## 初始化不会提升
JavaScript 只有声明的变量会提升，初始化的不会。

1. 看两个例子：
内部函数可以使用外部变量；
```js
var a=1;
function aa(){
    console.log(a);
    a++;
    console.log(a)
}
aa();
```
输出的结果为：
```js
1;
2;
```

当出现两个相同的变量，会优先使用最近的变量；
```js
var a=1;
function aa(){
    console.log(a);
    var a=1;
    a++;
    console.log(a)
}
aa();
```
输出的结果为：
```js
undefined;
2;
```

为什么会输出undefined；
因为变量提升了。初始化没有提升；
```js
var a=1;
function aa(){
    var a;
    console.log(a);
    a=1;
    a++;
    console.log(a)
}
aa();
```
输出的结果为：
```js
undefined;
2;
```

## let、var
- 1、不存在变量提升
- 2、同一个作用于下不能重复定义同一个名称
- 3、有严格的作用域
  
### 变量提升区别  
- var：
```js
console.log(c);
var c='c'
//undefined

//等同于

var c;
console.log(c)
c='c'
```

let：
```js
console.log(c);
let c='c'

//报错
VM71:1 Uncaught ReferenceError: b is not defined
    at <anonymous>:1:13
```

### 不能重复定义
let：
```js
let a=1;
var a=2;//报错；

let t=1;
let t=100;//不能重复定义
console.log(t)

function func(arg){
    let arg//报错；
}

function func(arg){
    {
        let arg;//不报错
    }
}
//报错
VM82:2 Uncaught SyntaxError: Identifier 't' has already been declared
```

- FAQ
```
let t=1;
t=100;//改变值是可以的；
console.log(t)

// 100
```

### 严格作用域

- var 函数作用域
```js
function fun(){
    var n=10;
    if(true){
        var n=100
    }
    console.log(n)
}

fun()
//100

console.log(n);
//报错啦
```

- let 块级作用域，在一对{}内
```js
function fun(){
    let n=10;
    if(true){
        let n=100
    }
    console.log(n)
}

fun()
//10

console.log(n);
//报错啦
```

## 执行上下文

- 理解：代码执行的环境
- 时机：代码正式执行之前会进入到执行环境
- 工作：
- - 1、创建变量对象：
- - - 变量
- - - 函数及函数参数
- - - 全局 window
- - - 局部：抽象的但是确实存在
- - 2、确认this的指向
- - - 2.1、全局：this=》window
- - - 2.2、局部：this==》调用其对象
- - 3、创建作用链域：父级租用域链+当前的变量对象
- - 4、扩展

## 暂时性死区
let在暂时性死区的时候，typeof会报错。
```js
typeof x;//referenceError
let x;

function func(x=y,y=2){
    return [x,y]
}//报错，x=y,y还没有定义；

var x=x;//不报错
let y=y;//报错；
```
如果这个变量没有声明的话，那就是undefined；
```js
typeof aaa//undefined
```




