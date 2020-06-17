# this指针

## this
> this指针：ES5中指向调用的对象；

1. 关键字、不能指定定义变量
2. 本身是一个内置变量，该变量指向一个对象
3. this有两种：全局this==》window，局部（函数）this==》调用器的对象，构造函数this==》当前构造函数的实例对象
4. 特殊this：call，apply，强制修改this

## 输出题
```js
var name="windowName";
function fn(){
    var name="hello";
    console.log(this.name);//windowName
    console.log(this)//window
}
```

当函数为对象的属性时，那么this就是当前的对象
当函数是一个方法时，this就是window
```js
var name="windowName";
var a={
    name:"hello",
    fn:function(){
        console.log(this.name);
    }
}
a.fn();//hello
windwo.a.fn()//hello
```

```js
var name="windowName";
var a={
    // name:"hello"
    fn:function(){
        console.log(this.name);
    }
}
window.a.fn()//undifined，只会在当前环境找
```

```js
var name="windowName";
var a={
    name:'hello',
    fn:function(){
        console.log(this.name);
    }
}
var f=a.fn;//把方法给赋值，但是没有调用
f();//windowName
```

```js
var name='windowName';
function fn(){
    var name='hello';
    console.log(this)//window
    innerFun();
    function innerFun(){
        console.log(this.name)
    }
}
fn()//windowName
```

## 改变this指针的方法
```js
var name="windowName";
var a={
    name:'hello',
    f1:function(){
        console.log(this.name)
    },
    f2:function(){
        setTimeout(function(){
            this.f1()//指向widnwo
        },100)
    }
}
a.f2();
```

### 1、箭头函数
```js
var name="windowName";
var a={
    name:'hello',
    f1:function(){
        console.log(this.name)
    },
    f2:function(){
        setTimeout(()=>{
            this.f1()//指向widnwo
        },100)
    }
}
a.f2();//hello
```

### 2、闭包
```js
var name="windowName";
var a={
    name:'hello',
    f1:function(){
        console.log(this.name)
    },
    f2:function(){
        var _this=this;
        setTimeout(()=>{
            _this.f1()//指向widnwo
        },100)
    }
}
a.f2();//hello
```

### 3、call
```js
var name="windowName";
var a={
    name:'hello',
    f1:function(){
        console.log(this.name)
    },
    f2:function(){
        setTimeout(function(){
            this.f1()//指向widnwo
        }.call(a),100)
    }
}
a.f2();//hello
```

### 4、apply
```js
var name="windowName";
var a={
    name:'hello',
    f1:function(){
        console.log(this.name)
    },
    f2:function(){
        setTimeout(function(){
            this.f1()//指向widnwo
        }.apply(a),100)
    }
}
a.f2();//hello
```


### call和apply的区别
- 都是改变this的指向,都是fn原型的方法
- fn.call(obj,10,20,30):call一个一个传
- fn.apply(obj,[10,20,30]):传一个数组
- call性能比apply好一些；尤其是传递给函数参数超过3个；

```js
var a={
    name:'hello',
    fn:function(a,b){
        console.log(a+b)
    }
}
var b=a.fn;
b.call(a,1,2)//3
b.apply(a,[1,2])//3
var c=b.bind(a,1,2) //bind 绑定作用域
c()//3
```

## 原理

### call实现原理
```js
//Function 根级函数
//argument -- 函数参数集合
// ...展开运算符 把数组展开 var a=[1,2]   ...a=>1,2
Funciton.protype.mycall=function(ctx){
    ctx=ctx||window;//有作用域就使用ctx，否则用window
    ctx.fn=this;//a.fn=this a.['fn']=this
    // console.log(arguments);
    let arg=[...arguments].slice(1);//从下标1开始分割
    let result=ctx.fn(..arg)
    return result;
}
```