# 添加补间动画

1. 引入使用

```js
import TWEEN, { Tween } from '@tweenjs/tween.js'

let animationId: number
function animate() {
  // 3d渲染
  renderer.render(scene, camera)
  TWEEN.update() // 更新 tween 动画
  animationId = requestAnimationFrame(animate)
}
onMounted(() => {
  container.value?.appendChild(renderer.domElement)
  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
})
```

2. 创建多个补间动画，并随机执行
```js
const tweenArr: Tween<{ z: number }>[] = []; // 存储 Tween 动画的数组

/**
 * @description: 创建多个补间动画，并随机执行
 * @obj 模型
 * @return {*}
 */
function addTween(obj: THREE.Object3D<THREE.Event> | undefined) {
  const startPosition = { z: 0 } //* 动画起始位置
  const targetPosition = { z: 2 } //* 动画目标位置
  /**
   * @description: 返回非当前索引的随机值
   * @currentIndex 当前索引
   * @maxLength 随机数最大值
   * @return {*}
   */
  function getRandomIndex(currentIndex: number, maxLength: number) {
    let randomIndex = Math.floor(Math.random() * maxLength)
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * maxLength)
    }
    return randomIndex // 返回满足条件的随机索引
  }
  const tween = new TWEEN.Tween(startPosition) // 创建 Tween 动画对象
    .to(targetPosition, 1000) // 设置动画的目标值和持续时间
    .yoyo(true) // 反向播放动画
    .repeat(1) // 重复播放 1 次
    .easing(TWEEN.Easing.Quadratic.InOut) // 缓动函数
    .onUpdate(() => {
      obj?.position.set(0, 0, startPosition.z) // * 更新对象的位置
    })
    .onComplete(() => {
      obj?.position.set(0, 0, 0) //* 动画完成后将对象位置重置
      let j = getRandomIndex(i, tweenArr.length) // 获取随机的索引
      tweenArr[j].start() // 开始随机选择的下一个动画
    })

  return tween
}

tweenArr[0].start(); // 开始第一个动画
```
