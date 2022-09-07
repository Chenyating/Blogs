# SVG经验总结

## 视频播放
```javascript
<section style="z-index: 10;transform: rotate(90deg)scale(1.3);padding-top: 15px;">
// 视频方向，间距
    <iframe class="video_iframe wx_video_iframe rich_pages"
        data-vidtype="1"
        data-cover="视频封面"
        allowfullscreen="" frameborder="0"
        style="position:relative; z-index:1;" height="325"
        width="578"
        src="地址"
        data-ratio="1.7777777777777777" data-w="864"></iframe>
  </section>
```
## 滚动效果
```html
<section style="display: inline-block;width: 100%;scroll-snap-type: x
    mandatory;vertical-align: top;overflow-x: overlay;">
    <!-- 外框固定尺寸 100% -->
    <section style="width: 500%;max-width: 500% !important;white-space:
        nowrap;font-size: 0;line-height: 0;">
        <!-- 滚动区域固定尺寸：width，max-width -->
        <section style="display:
            inline-block;vertical-align: top;width:
            20%;scroll-snap-align: center;">
            <!-- 单项内容填充 width：20%-->
            <!-- 内容 -->
        </section>
    </section>
</section>
```
## 动画属性：
- fill：freeze
- attributeName：属性变化
```js
    <animate name="arrow" attributeName="opacity" from="1" to="0" begin="click+1.5s" dur=".1s"
        fill="freeze"></animate>
```
## 展开动画
```js
<section
    style="overflow: hidden; transform: rotateZ(0deg); display: block;
    margin: 0px auto; width: 342px !important">
    <section style="height:0;display:block;line-height: 0;">
    // 真正显示内容的地方
        <svg
            style="display: block;pointer-events: none;background-image:
            url(&quot;图片路径&quot;);background-size:
            100% auto;background-repeat: no-repeat;"
            viewBox="0 0 750 1163">
        </svg>
        <svg
        style="display: block;pointer-events: none;background-image:
        url(&quot;图片路径&quot;);background-size:
        100% auto;background-repeat: no-repeat;"
            viewBox="0 0 750 853">
        </svg>
    </section>
    <section style="pointer-events: auto;z-index: 1;max-width: none !
        important;">
        // 动画区域
        <svg viewBox="0 0 750 1160"
            style="" x="0" y="0">
            // 改变，收缩展开高度
            <animate attributeName="height" fill="freeze"
                restart="never" calcMode="linear"
                keyTimes="0;0.0008;0.01;1" values="600;300;2800;2800"
                dur="1000s" begin="click">
            </animate>
        </svg>
    </section>
</section>
```
## <animate>
动画元素放在形状元素的内部，用来定义一个元素的某个属性如何踩着时点改变。在指定持续时间里，属性从开始值变成结束值
```js
<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <rect width="10" height="10">
    <animate attributeName="rx" values="0;5;0" dur="10s" repeatCount="indefinite" />
  </rect>
</svg>
```

<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <rect width="10" height="10">
    <animate attributeName="rx" values="0;5;0" dur="10s" repeatCount="indefinite" />
  </rect>
</svg>

## <animateMotion> 
元素定义了一个元素如何沿着运动路径进行移动。
```js
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" stroke="lightgrey"
    d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />

  <circle r="5" fill="red">
    <animateMotion dur="10s" repeatCount="indefinite"
      path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />
  </circle>
</svg>
```
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" stroke="lightgrey"
    d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />

  <circle r="5" fill="red">
    <animateMotion dur="10s" repeatCount="indefinite"
      path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />
  </circle>
</svg>

## animateTransform
元素变动了目标元素上的一个变形属性，从而允许动画控制转换、缩放、旋转或斜切。

```javascript
<?xml version="1.0"?>
<svg width="120" height="120"  viewBox="0 0 120 120"
     xmlns="http://www.w3.org/2000/svg" version="1.1"
     xmlns:xlink="http://www.w3.org/1999/xlink" >

    <polygon points="60,30 90,90 30,90">
        <animateTransform attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from="0 60 70"
                          to="360 60 70"
                          dur="10s"
                          repeatCount="indefinite"/>
    </polygon>
</svg>

```
<?xml version="1.0"?>
<svg width="120" height="120"  viewBox="0 0 120 120"
     xmlns="http://www.w3.org/2000/svg" version="1.1"
     xmlns:xlink="http://www.w3.org/1999/xlink" >

    <polygon points="60,30 90,90 30,90">
        <animateTransform attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from="0 60 70"
                          to="360 60 70"
                          dur="10s"
                          repeatCount="indefinite"/>
    </polygon>
</svg>

## SVG 元素（按类别分类）
```html
- 动画元素：<animate>，<animateColor>，<animateMotion>，<animateTransform>，<discard>，<mpath>，<set>
- 基本形状元素：<circle>, <ellipse>, <line>, <polygon>, <polyline>, <rect>
- 容器元素：<a>, <defs>, <g>, <marker>, <mask>, <missing-glyph>, <pattern>, <svg>, <switch>, <symbol>, <unknown>
- 描述性元素：<desc>, <metadata>, <title>
- 滤镜元素：<feBlend>, <feColorMatrix>, <feComponentTransfer>, <feComposite>, <feConvolveMatrix>, <feDiffuseLighting>, <feDisplacementMap>, <feDropShadow>, <feFlood>,<feFuncA>, <feFuncB>, <feFuncG>, <feFuncR>,<feGaussianBlur>, <feImage>, <feMerge>, <feMergeNode>, <feMorphology>, <feOffset>, <feSpecularLighting>, <feTile>, <feTurbulence>
- 字体元素：<font>, <font-face>, <font-face-format>, <font-face-name>, <font-face-src>, <font-face-uri>, <hkern>, <vkern>
- 渐变元素：<linearGradient>, <meshgradient>, <radialGradient>, <stop>
- 图形元素：<circle>, <ellipse>, <image>, <line>, <mesh>, <path>, <polygon>, <polyline>, <rect>, <text>, <use>
- 图像渲染元素：<mesh>, <use>
- 光源元素：<feDistantLight>, <fePointLight>, <feSpotLight>
- 非渲染元素：<clipPath>, <defs>, <hatch>, <linearGradient>, <marker>, <mask>, <meshgradient>, <metadata>, <pattern>, <radialGradient>, <script>, <style>, <symbol>, <title>
- 绘制服务器元素：<hatch>, <linearGradient>, <meshgradient>, <pattern>, <radialGradient>, <solidcolor>
- 可渲染元素：<a>, <circle>, <ellipse>, <foreignObject>, <g>, <image>, <line>, <mesh>, <path>, <polygon>, <polyline>, <rect>, <svg>, <switch>, <symbol>, <text>, <textPath>, <tspan>, <unknown>, <use>
- 形状元素：<circle>, <ellipse>, <line>, <mesh>, <path>, <polygon>, <polyline>, <rect>
- 结构元素：<defs>, <g>, <svg>, <symbol>, <use>
- 文本内容元素：<altGlyph>, <altGlyphDef>, <altGlyphItem>, <glyph>, <glyphRef>, <textPath>, <text>, <tref>, <tspan>
- 文本子内容元素：<altGlyph>, <textPath>, <tref>, <tspan>
- 未分类元素：<clipPath>, <color-profile>, <cursor>, <filter>, <foreignObject>, <hatchpath>, <meshpatch>, <meshrow>, <script>, <style>, <view>
```
