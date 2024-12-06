# css2d 创建元素的方法

1. 基本配置

```js
<div ref="css2d" class="css2d"></div>

import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js'

// css2d
const css2d = (ref < HTMLDivElement) | (null > null)
const cssRenderer = new CSS2DRenderer()
cssRenderer.setSize(window.innerWidth, window.innerHeight)
let animationId: number

function animate() {
  // css2d渲染
  cssRenderer.render(scene, camera)
  animationId = requestAnimationFrame(animate)
}
onMounted(() => {
  css2d.value?.appendChild(cssRenderer.domElement)
  animate()
})
onUnmounted(() => {
  cancelAnimationFrame(animationId)
})
```

2. 创建 2d元素 的方法
```js
/**
 * @description: 创建一个2d元素，返回css2dobject后，可用sences.add添加
 * @param {*} position 坐标位置
 * @param {*} id id序列号
 * @param {*} name 名称
 */
function initModelCss2d(
  position: number[],
  id: number,
  name: string | undefined
) {
  // 设置元素的属性
  /**
   * @description:
   * @param {*} type 元素
   * @param {*} propsOjb 属性对象
   * @return {*}
   */
  const initCss2dProps = (type: any, propsOjb: any) => {
    let obj = document.createElement(type)
    for (const i in propsOjb) {
      if (Object.hasOwnProperty.call(propsOjb, i)) {
        obj[i] = propsOjb[i]
      }
    }
    return obj
  }
  // 外层元素，自定义的style都不起作用
  const elem = initCss2dProps('div', {
    className: `mapbar-box`,
  })
  // 内层元素，一般自定义样式都写在内层元素
  const elemIner = initCss2dProps('div', {
    className: `mapbar ${name}`,
    id: `bar${id}`,
  })
  elem.appendChild(elemIner)
  const css2dElement = new CSS2DObject(elem)
  // 定义css2d的位置
  css2dElement.position.set(position[0], position[1] + 1, 6)
  css2dElement.layers.set(0)
  return css2dElement
}
```

使用方法

```js
scene.add(initModelLabelCss2d(position, id, name))
```

传入vector3的坐标
```js
export const initModelCss2d = (
  position: any,  // 修改为 Vector3 类型
  id: number,
  name: string | undefined
) => {
  // 设置元素的属性
  const initCss2dProps = (type: any, propsOjb: any) => {
    let obj = document.createElement(type);
    for (const i in propsOjb) {
      if (Object.hasOwnProperty.call(propsOjb, i)) {
        obj[i] = propsOjb[i];
      }
    }
    return obj;
  }
  // 外层元素，自定义的style都不起作用
  const elem = initCss2dProps('div', {
    className: `mapbar-box`,
  });
  // 内层元素，一般自定义样式都写在内层元素
  const elemIner = initCss2dProps('div', {
    className: `mapbar ${name}`,
    id: `bar${id}`,
  });
  elem.appendChild(elemIner);
  const css2dElement = new CSS2DObject(elem);
  // 定义css2d的位置
  css2dElement.position.set(position.x, position.y + 1, 6);
  css2dElement.layers.set(0);
  return css2dElement;
}
```