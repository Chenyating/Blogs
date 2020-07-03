# Image

## 基本用法
<ClientOnly>
<f-demo code='
<if-button>Default</if-button>'>
<if-image fit='fill' src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' style="width: 100px; height: 100px"></if-image>
<if-image fit='contain' src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' style="width: 100px; height: 100px"></if-image>
<if-image fit='cover' src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' style="width: 100px; height: 100px"></if-image>
<if-image fit='none' src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' style="width: 100px; height: 100px"></if-image>
<if-image fit='scale-down' src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' style="width: 100px; height: 100px"></if-image>
</f-demo>
</ClientOnly >

## 加载失败
<ClientOnly>
<f-demo code='
<if-button>Default</if-button>'>
<if-image fit='fill' src='../开发笔记/imgs/btn2.png' style="width: 100px; height: 100px"></if-image>
<if-image fit='fill' src='../开发笔记/imgs/btn2.png' style="width: 100px; height: 100px"><div slot='error'><if-icon type='false' size='20'/>失败</div></if-image>
</f-demo>
</ClientOnly >