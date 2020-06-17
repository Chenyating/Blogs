# css总结
## 定位问题
有时候使用fixed会随窗口变化而改变；
解决方法：使用transla的移动。就绝对固定页面了。
## 奇葩问题
1. 让div的`高是宽的一半`：
```css
.a{
        height: 0;
         padding: 25% 0;
         background-color: coral;
}
```

## 居中问题

### 水平居中

块级水平居中
```css
    .a{
        margin: 0 auto;//水平居中

        width: 100px;
        height: 100px;
        background: red;
    }
```

### 嵌套类型，`内部div-b居中`
```html
<div class="a">
    <div class="b"></div>
</div>
```
b设置行内元素
```css
   .a {
        text-align: center;//水平居中
    }

    .b {
        display: inline-block;//inline-开头的属性都可以
        width: 100px;
        height: 100px;
        background: red;
    }
```

a大框设置flex,弹性盒子
```css
    .a {
        display: flex;
        /*设置垂直居中，外框需要设置高度*/
        height: 200px;
        /*水平居中*/
        justify-content: center;
        /*垂直居中*/
        align-items: center;
    }

    .b {
        width: 100px;
        height: 100px;
        background: red;
    }
```

a大框设置grid，网格模式
```css
   .a {
        display: grid;
        /*设置垂直居中，外框需要设置高度*/
        height: 200px;
        /*水平居中*/
        justify-content: center;
        /*垂直居中*/
        align-items: center;
    }

    .b {
        width: 100px;
        height: 100px;
        background: red;
    }
```


### 水平和垂直居中
```css
    .a{
        position:relative;
        .b{
            //水平和垂直居中
        }
    }
```


```css
     .b {
         position: absolute;
         margin: auto;
         
         /*水平居中*/
         left: 0;
         right: 0;
         /*垂直居中*/
         top: 0;
         bottom: 0;
 
         width: 100px;
         height: 100px;
         background: red;
     }
```

```css
     .b {
         position: absolute;
         margin: auto;
         width: 100px;
         height: 100px;
         background: red;

         top:50%;
         left:50%;
         margin-left:-50px;// -它本身宽度的一半
         margin-top:-50px;//-它本身高度的一半
     }
```

```css
     .b {
         position: absolute;
         margin: auto;
         width: 100px;
         height: 100px;
         background: red;

         top:50%;
         left:50%;
         transform:translate(-50%,-50%)//平移自身的50%；
     }
```

### 文字居中
```css
    .a {
        /*设置垂直居中，外框需要设置高度*/
        height: 200px;
        /*水平居中*/
        text-align: center;
        /*垂直居中*/
        line-height: 200px;
    }
```

### 文字和图片垂直居中
```html
<div class="a">
    文字和图片垂直居中<img class="b" src="图片名称"/>
</div>
```

```css
  .a {
        /*设置垂直居中，外框需要设置高度*/
        height: 200px;
        /*水平居中*/
        text-align: center;
    }
    .b{
        vertical-align: middle;
    }
```


## 画三角形

```css
.box{
    width:0px;
    height:0px;
    border:1 solid transparent;
    border-top-color:red;
}
```