# 创建组件的两种方法

- 1、工厂函数：function方式创建
- 2、ES6class方式创建
- 3、es5的react。createClass({render(){return 虚拟DOM}})

注意：组件名字必须大写；

## 工厂函数，以函数来创建组件
```js
// 创建组件的方式，组件首字母大写
 function Hello(props){
     console.log(props)
      //props只读
      //return null表示此组件啥都不渲染


     // 在组件中，必须返回一个合法的jsx虚拟dom元素
     return <div>
         hello组件,{props.name}
     </div>
 }
const dog={
    name:"大黄",
    age:12
}

// 向组件传值：在组件里传{...对象名}，或者 name={对象名.属性}
ReactDOM.render(<div><Hello {...dog}/></div>,document.getElementById('app'))
```
---

## es6：使用class创建组件
```js
// 使用class方式定义组件，必须让组件继承React.Component
class Mycomponent extends React.Component{
    // 在class关键字创建的组件中如果，想用外界传递的值，直接用就可以了，this.props.name就可以了
    // 在组件内必须有render函数,渲染组件对应的虚拟DOM
    render(){
        // render函数中，必须返回合法的jsx的虚拟DOM
        // 在class组件内部，this表示当前组件的实例对象
        return <div>hello{this.props.name}</div>
    }
}

// 向组件传值：在组件里传{...对象名}，或者 name={对象名.属性}
ReactDOM.render(<div><Mycomponent {...dog}/></div>,document.getElementById('app'))
```

---

### class创建组件拥有私有数据
```js
class MyComponent extends React.Component{
    constructor(){
        // 在子类中，this只能放在super之后，否则会报错；
        super();
        //类似于vue的data(){return{}}
        //this.state的数据都是可读可写
        this.state={
            msg:"hello-world"
        }
    }
}
```

## 总结
- 1、无论是class创建，还是function创建，他们的props都是只读的，不能修改；
- 2、使用class关键字创建的组件，有自己的*私有数据*`this.state`，叫`有状态组件`
- 3、但是使用function创建的组件，只有props，*没有自己的私有属性和生命周期*，叫`无状态组件`；
- 4、*最本质的区别，有无私有数据，有无声明周期*；
- 5、无状态组件，运行状态组件比有状态组件运行效率高；

### props、和state/data的数据区别

- 1、props中的数据都是*外界传递*过来的，*只读不可重新赋值*
- 2、state/data都是组件私有的，*可以重新赋值*