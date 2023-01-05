假设：儿子有4个slider，父亲有5个slider。儿子在父亲的第2个位置上。

现状：父亲滚动到儿子的时候，触发儿子滚动。（看不到儿子的第0个和最后一个slider）；儿子向第0个和最后一个slider滚动时，触发父亲滚动。

效果：不方便看到儿子第一个和最后一个slide。

解决方案：

## 父亲swiper：
1. 滚动间距要比儿子距离小
2. 鼠标灵敏度要比儿子小

```js
mousewheel={{
 sensitivity: 0.6,
 thresholdDelta: 50
}}
```
## 儿子swiper：
1. 添加属性nested=true；
2. 滚动间距比父亲大

```js
mousewheel={{
 thresholdDelta: 40
}}
```

## 父亲swiper事件设置：

目的：避免父亲滚动到儿子的时候，触发儿子滚动。（看不到儿子的第0个和最后一个slider）

当儿子的slider在第0个和最后一个的时候，滚动的开始时禁用儿子滚动。滚动结束后启用儿子滚动。
```js
// 父级往前开始
fatherSwiper.on('slidePrevTransitionStart', (swiper: any) => {
  // 儿子slide最后一个索引，儿子当前在父级的slide索引
  if (sonSwiper == 3 && swiper.activeIndex == 1) {
    sonSwiper.mousewheel.disable();
  }
})
// 父级往前结束
fatherSwiper.on('slidePrevTransitionEnd', (swiper: any) => {
  // 儿子slide最后一个索引，儿子当前在父级的slide索引
  if (sonSwiper == 3 && swiper.activeIndex == 1) {
    sonSwiper.mousewheel.enable();
  }
})
// 父级往后开始
fatherSwiper.on('slideNextTransitionStart', (swiper: any) => {
  // 儿子slide第一个位置的时候，儿子当前在父级的slide索引
  if (sonSwiper == 0 && swiper.activeIndex == 1) {
    sonSwiper.mousewheel.disable();
  }
})
// 父级往后结束
fatherSwiper.on('slideNextTransitionEnd', (swiper: any) => {
  // 儿子slide第一个位置的时候，儿子当前在父级的slide索引
  if (sonSwiper == 0 && swiper.activeIndex == 1) {
    sonSwiper.mousewheel.enable();
  }
})
```

## 儿子swiper事件设置：
目的：避免儿子向第0个和最后一个slider滚动时，触发父亲滚动。

当儿子的slider在第0个和最后一个的时候，滚动的开始时禁用父亲滚动。滚动结束后启用父亲滚动。
```js
// 儿子往前开始
sonSwiper.on('slidePrevTransitionStart', (swiper: any) => {
// 儿子slider第0个开始
  if (swiper.activeIndex == 0) {
    fatherSwiper.mousewheel.disable();
  }
})
// 儿子往前开始
sonSwiper.on('slidePrevTransitionEnd', (swiper: any) => {
// 儿子slider第0个开始
  if (swiper.activeIndex == 0) {
    setTimeout(() => {
      fatherSwiper.mousewheel.enable();
    }, 100);
  }
})
// 儿子往前开始
sonSwiper.on('slideNextTransitionStart', (swiper: any) => {
// 儿子slider最后一个索引
  if (swiper.activeIndex == 3) {
    fatherSwiper.mousewheel.disable();
  }
})
// 儿子往前开始
sonSwiper.on('slideNextTransitionEnd', (swiper: any) => {
// 儿子slider最后一个索引
  if (swiper.activeIndex == 3) {
    setTimeout(() => {
      fatherSwiper.mousewheel.enable();
    }, 100);
  }
})
```