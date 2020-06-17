# css 笔记

## 浮动float
让元素以某一个方向在一行并排排列；能让元素`脱离标准流`,既可以设置框，有可以一行排列；

- 左浮动，从第一个开始，会依次去贴父元素的左边；
- 右浮动，从第一个元素，会依次去贴父元素的右边；
- 同一个盒子里，可以有不同方向的浮动；

## 超级链接a的修饰
a的四个状态：
- a:link 未访问前的显示状态
- a:visited 访问后的状态
- a:hover 鼠标悬浮状态
- a:active 鼠标点击不松手(激活)状态
- 四个状态必须按照顺序书写

## 定位

###  相对定位relative
相对于某一个参考物进行的位置偏移(left,top,right,bottom)；元素相对于`自身`进行的位置偏移；

```css
position:relative;
left:100px;//向右100
top:100px;//向下100
right:20px;//向左20
bottom:20px;//向上20

left:-100px;//向左100
top:-100px;//向上100
right:-20px;//向右20
bottom:-20px;//向下20
```

### static
偏移量不起作用

## H5

### 认识h5

- 并不是新的语言，是html的第五个版本
- 所有的主流浏览器都支持h5，ie9以上支持h5，ie8不支持h5
- 改变了用户与文档的交换方式，多媒体；vido，audio，canvas
- 增加了其他的特性，语义特性：本地存储，网页多媒体，二维三维，过渡，动画；
- 相对于h4，抛弃一些不合理的标记和属性；新增一些标记和属性；网页结构更加简洁性；


## 隐藏的方法
- display: none; 元素会变得不可见，并且不会再占用文档的空间。
- visibility: hidden; 这个属性只是简单的隐藏某个元素，但是元素占用的空间任然存在
- opacity: 0; CSS3属性，设置0可以使一个元素完全透明
- position: absolute; 设置一个很大的 left 负值定位，使元素定位在可见区域之外
- transform: scale(0); 将一个元素设置为缩放无限小，元素将不可见，元素原来所在的位置将被保留
- `<div hidden="hidden">` HTML5属性,效果和display:none;相同，但这个属性用于记录一个元素的状态
- height: 0; 将元素高度设为 0 ，并消除边框
- filter: blur(0); CSS3属性，将一个元素的模糊度设置为0，从而使这个元素“消失”在页面中

### opacity和rgba区别
- opacity 作用于元素以及元素内的所有内容（包括文字）的透明度
- rgba() 只作用于元素自身的颜色或其背景色，子元素不会继承透明效果

### 分析display和visibility
- display: none;
- visibility: hidden; 

```css
display:none;
/*
1、会让元素完全从渲染树中消失，渲染的时候不占据任何空间；
2、是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示
3、修改常规流中元素的display通常会造成文档重排。
4读屏器不会读取display: none;元素内容；
 */


visibility: hidden;
/* 
1、不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见
2、是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式
3、修改visibility属性只会造成本元素的重绘
4、读屏器会读取visibility: hidden元素内容
 */
```

## 引入方式
- 行内样式
- 外部样式表
- 内部样式表

### 行内样式
使用style属性引入CSS样式。
```html
<h1 style="color:red;">style属性的应用</h1>
```

### 外部样式表
CSS代码保存在扩展名为.css的样式表中
HTML文件引用扩展名为.css的样式表，有两种方式：链接式、导入式。
```html
<!-- 1、链接式 -->
<link type="text/css" rel="styleSheet"  href="CSS文件路径" />

<!-- 2、导入式 -->
<style type="text/css">
  @import url("css文件路径");
</style>
```

#### link 与 @import 的区别

link优于@import

link：
- link 是HTML方式，
- link最大限度支持并行下载，link 
- 可以通过 rel="alternate stylesheet" 指定候选样式
- 浏览器对 link 支持早于@import
 
css：
- @import 是CSS方式
- @import 过多嵌套导致串行下载，出现FOUC
- 可以使用 @import 对老浏览器隐藏样式
- @import 必须在样式规则之前，可以在css文件中引用其他文件



### 内部样式表
在style标签中书写CSS代码。style标签写在head标签中。
```html
<head>
   <style type="text/css">
      h3{
            color:red;
         }
   </style>
</head>
```

注释：/* 注释内容*/

## 盒模型
有两种， IE 盒子模型、W3C 盒子模型；

盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；

- W3C盒模型宽度=content+2padding+2border+2margin
- IE盒模型宽度=content+2margin

区 别： IE的content部分把 border 和 padding计算了进去;

## 清除浮动
- 父级div定义height
- 结尾处加空div标签clear:both
- 父级div定义伪类:after和zoom
- 父级div定义overflow:hidden
- 父级div也浮动，需要定义宽度
- 结尾处加br标签clear:both

## css权重
从大到小
- ！important 大于所有规则
- 行内样式1000
- id样式100
- 类10
- tag1

如果权值一样，按照样式规则的先后顺序应用，顺序靠后的覆盖靠前的；

## 伪类和伪元素
- 伪类是一个冒号，表状态
- 伪元素是两个冒号，是元素

### 伪元素
- ::first-letter 选择元素文本的第一个字（母）。
- ::first-line 选择元素文本的第一行。
- ::before 在元素内容的最前面添加新内容。
- ::after 在元素内容的最后面添加新内容。
- ::selection匹配用户被用户选中或者处于高亮状态的部分。
- ::placeholder匹配占位符的文本，只有元素设置了placeholder属性时，该伪元素才能生效。
