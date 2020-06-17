# TypeScript

## 介绍

### 安装
```js
npm install -g typescript
```

文件后缀名为ts，编译ts文件
```js
tsc hello.ts
```

新建配置文件 生成tsconfig.json，改outDir："./js"
```js
tsc --init
```

## 数据类型

类型校验，写ts必须指定类型

### 布尔类型
```js
var flag:boolean=true;
//flag=123 错误
flag=false;
```

### 数字类型
```js
var num:number=123;
```

### 字符串
```js
var str:string='hello'
```

### 数组类型
```js
1、第一种定义数组

var arr:number[]=[1,2,23];

var arr:Array<number>=[11,22,33]
```

### 元祖类型
tuple属于数组的一种
```js
var arr:[number,string]=[1,'222'];
```

### 枚举类型
enum
```js
enum  Flag {success=1,error}
let s:Flag=Flag.success;
let f:Flag=Flag.error
console.log(s)//1
console.log(f)//1 如果没有赋值就打印下标
```

### 任意类型

```js
var num:any='s';
//可以用在对象上
```

### null和undefined
```js
var num:number;
console.log(num)//输出undefined 报错

var num:undefined;
console.log(num)//输出undefined 正确


//可以这么写
var num:number|undefined
console.log(num)

//或这么写
var num:number|undefined|null
```

### void类型
```js
function run():void{
    console.log('run')
}

错误写法：不能undefined；
```

### never类型
包括null和undefined，代表从来不会出现的值
```js
var a:never;
a=13//报错

a=(()=>{
    throw new Error('错误')
})()
```

## 函数
原来
```js
// 函数声明方法
function run(){
    return 'run'
}
// 匿名函数
var run=function(){
    return 'run'
}
```

typescript
```js
fuction run():string{
    return '123';
}

var run=function:string{
    return '12'
}
```

定义传参
```js
function run(name:string,age?:number=20):string{
    return `${name}--${age}`
// ?: 可传可不传
// number默认参数是20
}

// 剩余参数
// 三点运算符接收形参传过来的值

function sum(...result:number[]):number{
}

sum(1,2,3,4,5,6)
```

函数重载:后面替换前面的77
```js
function css(config){}
function css(config，age){}
```

ts重载
```js
function run(name:string):string;
function run(age:number):number;
function run(str:any):any{
    if(typeof str=='string'){
        return '我叫'+str
    }else{
        return '我的年龄是'+str
    }
}

alert(run('张三'))//我叫张三
alert(run(20))//我的年龄20
alert(run(true))//报错
```

## 类
```js
class Person{
    name:string;
    constructor(a:string){
        this.name=a;
    }
    run():void{
        alert(this.name)
    }
}
var p=new Person('张三')；
p.run();
```
类修饰符：
1. public
2. protect：子类可引用
3. private：私有只能在当前类使用，子类，类外部无法使用；




