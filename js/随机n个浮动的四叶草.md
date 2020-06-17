
# jquery随机生成悬浮物做背景的方法

1. 写一个position是relative的div
```html
    <div :class="ifshow?'showPendant':'noshowPendant'" @click="showPendant"></div>
    <div id="PendantBox">
    </div>

css:
    #PendantBox {
    position: relative;
    z-index: -1;

data：
    pendant: null, //挂件
    pendantNum: 1, //数量
    pendantSpeed: 10000, //速度
    ifshow: false,
}
```

2. 写一个范围内的随机数方法；
```js
    // 获取随机数
        getRandom(x, y) {
            return Math.floor(Math.random() * (y - x)) + x;
        },
```

3. 获的pendantBox元素。在元素内插入一个图片。并对它设置基础样式。position要为fixed
通过animate动画的方法，设置他的效果。
1、随机出现，透明度设置为0；
2、随机移动，透明度设置为1；
3、继续随机移动，透明度设置为0；

```js
 // 悬浮挂件
        makePendant() {
            var getPendantBox = $("#PendantBox");
            // 一次出现pendantNum个挂件
            for (let index = 0; index < this.pendantNum; index++) {
                var item = $(` <img src="${this.imgUrl}"/>`);
                // 设置基础样式
                item.css({
                    "position": "fixed",
                    "top": `${this.getRandom(20, 100)}%`,
                    "right": `${this.getRandom(0, 100)}%`,
                    "transfrom": `rotate(${this.getRandom(0, 180)}deg)`,
                    "width": `${this.getRandom(30, 40)}px`,
                    "height": "auto",
                    "opacity": "0",
                });
                // 第一次移动的动画
                item.animate({
                    transfrom: `rotate(${this.getRandom(0, 180)}deg)`,
                    opacity: "1",
                    width: "20px",
                    top: `${this.getRandom(0, 100)}%`,
                    right: `${this.getRandom(0, 100)}%`
                }, this.pendantSpeed);
                // 第二次移动的动画
                item.animate({
                    transfrom: `rotate(${this.getRandom(0, 180)}deg)`,
                    opacity: "0",
                    width: "10",
                    top: `${this.getRandom(0, 100)}%`,
                    right: `${this.getRandom(0, 100)}%`
                }, this.pendantSpeed);
                getPendantBox.append(item);
            }
        },
```


4. 虽然透明度为0了，但是div还占据整个body，于是你需要隔一段时间，去清空pendantBox里面的img；
```js
   showPendant() {
            this.ifshow = !this.ifshow;
            if (this.ifshow) {
                // 循环挂件，每隔5秒来一次
                this.pendant = setInterval(() => {
                    this.makePendant();
                    // 当漂浮物宽度为0的时候，那就清除它自己
                    $("#PendantBox img").each(function (index, element) {
                        if (element.style.width == "10px") {
                            element.remove();
                        }
                    });
                }, this.pendantSpeed / 2)
            } else {
                $("#PendantBox img").remove();
                clearInterval(this.pendant)
            }
        }
```