# 使用canvas绘制小球
使用canvas绘制小球，鼠标经过之处放大，离开缩小。

```js
// 随机范围的随机数
function betweenRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// 小球颜色
var acolor = ["#228B22", "#FD5B78", "#00BFFF", "#FFA500", "#FF0000"];

// 鼠标所在位置
var mouseX, mouseY;
// 使用jquery给stage绑定一个mousemove事件
function getMouseXY() {
    $("#stage").mousemove(function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    })
}
// 创建一个球的构造函数
function mother(maxWidth, maxHeight, ctx) {
    this.ctx = ctx;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
}
// 创建方法
mother.prototype = {
    // 配置
    // -pi<=t<=pi 或 0<=t<=2*pi
    // x=a*(2*cos(t)-cos(2*t))
    // y=a*(2*sin(t)-sin(2*t))
    // 心形坐标
    // 半径为a
    init: function () {
        // 随机配置
        // this.x = betweenRandom(0, this.maxWidth);
        // this.y = betweenRandom(0, this.maxHeight);
        this.t = (betweenRandom(0, 360) / 180) * Math.PI;
        this.r = betweenRandom(1, 10);
        this.x = 50 * (2 * Math.cos(this.t) - Math.cos(2 * this.t))+(this.maxWidth/2);
        this.y = 50 * (2 * Math.sin(this.t) - Math.sin(2 * this.t))+(this.maxHeight/2);
        this.beiyongR = this.r;
        this.color = acolor[Math.floor(betweenRandom(0, 5))];
        this.vx = betweenRandom(-1, 1);
        this.vy = betweenRandom(-1, 1);
        this.beizhi = false;//小球是否在鼠标周围
    },
    // 绘制
    draw: function () {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fill();
    },
    // 移动
    move: function () {
        if (this.x - this.r < 0 || this.x + this.r > this.maxWidth) { this.vx = -this.vx; }
        if (this.y - this.r < 0 || this.y + this.r > this.maxHeight) { this.vy = -this.vy; }
        // 鼠标与小球的直线距离；根据x**2+y**2=r**2
        var distance = Math.sqrt((mouseX - this.x) ** 2 + (this.y - mouseY) ** 2)

        // 圆形
        //        if (distance < 99){
        //            this.x += -this.vx;
        //            this.y += -this.vy;
        //        }
        //        else if(distance > 101){
        //           this.x += this.vx;
        //           this.y += this.vy;
        //        }
        //        else{
        //            if (this.r < 20){
        //                this.r++
        //            }
        //        }

        //        //心形1
        //        var dlta_x = this.x - mouseX
        //        var dlta_y = this.y - mouseY
        //        var a = 100
        //        if (dlta_x**2+dlta_y**2 - a*dlta_y > a * Math.sqrt(dlta_x**2+dlta_y**2)){
        //            this.x += -this.vx;
        //            this.y += -this.vy;
        //        }
        //        else if(dlta_x**2+dlta_y**2 - a * dlta_y < a * Math.sqrt(dlta_x**2+dlta_y**2)){
        //            this.x += this.vx;
        //            this.y += this.vy;
        //        }

        //        //心形2
        //        var dlta_x = this.x - mouseX
        //        var dlta_y = this.y - mouseY
        //        var a = 12500 * 4
        //        var jiange = 500 *4
        //
        //        var distance = 5*(dlta_x**2) + 6*Math.abs(dlta_x)*(dlta_y) + 5*(dlta_y**2)
        //        if (distance < a-jiange){
        //            this.x += -10*this.vx;
        //            this.y += -10*this.vy;
        //        }
        //        else if(distance > a+jiange){
        //            this.x += this.vx;
        //            this.y += this.vy;
        //        }


        //心形2 快速
        var dlta_x = this.x - mouseX
        var dlta_y = this.y - mouseY
        var a = 12500 * 4
        var jiange = 500 * 4

        var distance = 5 * (dlta_x ** 2) + 6 * Math.abs(dlta_x) * (dlta_y) + 5 * (dlta_y ** 2)
        if (distance < a - jiange) {
            // 在爱心内部的小球快速移动到边缘；
            for (var i = 0; i < 10; i++) {
                this.x += this.vx;
                this.y += this.vy;
            }
            if (this.r < 50) {
                this.r++
            }
        }
        else if (distance > a + jiange) {
            this.x += this.vx;
            this.y += this.vy;
            if (this.r > this.beiyongR) {
                this.r--
            }
        } else {
            if (this.r > 15) {
                this.r--;
            }
        }

        // 单纯经过放大
        //        if (distance <=100) {
        //            if (this.r < 100)
        //            {
        //                this.r++
        //            }
        //        }
        //        // 不在鼠标周围时
        //        else {
        //            if (this.r > this.beiyongR) {
        //                this.r--
        //            }
        //        }

        this.draw()

    }
}
```
<!-- 在vue上只需要一个canvas标签 -->
```html
<template>
<div>
    <canvas id="stage" :width="canvasWidth" :height="canvasHeight"></canvas>
</div>
</template>
```


```js
<script>
// 引入刚才写的构造函数，还有获得鼠标在canvas坐标的方法
import {
    mother,getMouseXY
} from './ball';
export default {
    data() {
        return {
            ctx: null,
            canvasWidth: null,
            canvasHeight: null,
            balls: []
        }
    },
    methods: {
        begin(num) {
           for (let i = 0; i <num; i++) {
            //    实例化num个小球，并存储在balls数组中
                var qiu=new mother(this.canvasWidth,this.canvasHeight,this.ctx);
                qiu.init();
                qiu.draw();    
                this.balls.push(qiu)   
            }
            // 循环遍历运行，让小球们移动
            setInterval(()=>{
                this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
                for (const item of this.balls) {
                    item.move()
                }
            },1000/60)
        }
    },
    mounted() {
        // 让画布宽度随着界面视图的放大缩小而改变；
        this.canvasWidth = Math.floor(document.body.clientWidth);
        this.canvasHeight = Math.ceil(document.body.clientHeight);
        window.onresize = () => {
            this.canvasWidth = Math.floor(document.body.clientWidth);
            this.canvasHeight = Math.ceil(document.body.clientHeight);
            console.log(this.canvasWidth, this.canvasHeight)
        }
        var c = document.getElementById("stage");
        this.ctx = c.getContext("2d");
        getMouseXY();
        this.begin(250);
    }
}
</script>
```

因为canvas是内联标签，在浏览器预览的时候有下拉条，不美观，内联标签自带一点高度，改成block就可以避免这个问题了。

```css
<style lang="less" scoped>
#stage {
    width: 100%;
    height: 100%;
    display: block;
    background: #ffc0cb12;
}
</style>
```