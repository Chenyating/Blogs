# 构造函数和class

## es6中class实现面向对象编程的新形式

```js

class Animal{
    // 每一个类中都有一个构造器，若没有指定构造器，那么这个构造器是隐形的，构造器的作用，就是每当new一个类，必然优先执行构造器中的代码
    constructor(name,age){
        this.name=name;//通过new实例的属性，叫做实例属性：dog.name
        this.age=age;
        // 静态属性，通过构造函数点出来的，直接访问到的属性叫做静态属性。构造函数名.属性
    }
    // 在class内部通过static修饰的属性就是静态属性，例如Animal.info;
    static info="白色的";
    //动物的实例方法
    say(){
        console.log("汪汪~")
    }
    //可以通过dog.say()来执行；
    //动物的静态方法
    static show(){
        console.log("yellow body")
    }
};
const dog=new Animal("大黄",3)
```

### 注意：
- 1、在class的{}区间内，只能写构造器，静态方法，静态属性，实例方法；
- 2、class关键字，还是用原来的普通构造函数，把class关键字称作语法糖

---

## 构造函数创建对象

```js
//构造函数创建对象
fucntion Person(name,age){
    this.name=name;
    this.age=age;
}
const student=new Person("tinger",12)
//实例方法
Person.prototype.say=function(){
    console.log("hello")
}
//可以通过使用student.say()来执行；

//静态方法
Person.show=function(){
    console.log("long hair");
}
//student.show()是无法用到的
```

## 创建类
- 当有n个子类的时候，方法相同，就会显得代码冗余；这个时候就需要创建一个父类来继承；
```js
class Person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    sayhi(){
        console.log(this.nam,age,'hello')
    }
}
const a1=new Person("jack",12);
```

## 创建子类继承父类
```js
class Person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    sayhi(){
        console.log(this.nam,age,'hello')
    }
}

// 在class中可以使用extends关键字实现子类继承父类；
// 子类美国人
class American extends Person{}
const a1=new American('hello',12);
a1.sayhi();//报错, 数据没有传给父类
```

---

## 子类添加构造器方法
```js
class American extends Person{
    constructor(name,age){
        super(name,age);//调用父类的constructor
    }
}
const a1=new American('hello',12);
a1.sayhi();
// hello,12,hi
```


---

？1：为什么要在constructor使用super

- 如果子类通过extends关键字继承了父类，那么子类的constructor构造函数中，必须先调用一下super()；


？2：super()是什么
- super是一个函数，是父类的构造器；子类中的super，就是父类中，constructor的引用；


？3：调用super()以后，传的参变成undefined了；
- 子类的构造器的参数传给super

---

## 在子类中添加信息
给中国人添加身份证号
```js
// 子类中国人
class Chinese extends Person{
    // idNum是Chinese独有的，就不要挂载到super上
    constructor(name,age,idNum){
        // 在子类中，this只能放在super之后，否则会报错；
        super(name,age);
        this.idNum=idNum;
    }
}
```

### 面试题
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

