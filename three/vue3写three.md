```js
<template>
    <div ref="container" class="three-box">
      <div ref="css2d" class="css2d"></div>
    </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

const container = ref<HTMLDivElement | null>(null)
const css2d = ref<HTMLDivElement | null>(null)
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

let cube: THREE.Object3D<THREE.Event>;
function makeCube(){
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
}
// css2d
const cssRenderer = new CSS2DRenderer()
cssRenderer.setSize(window.innerWidth, window.innerHeight)

// 设置元素的属性
function initLabelCss2dProps(type:any, propsOjb:any) {
  let obj = document.createElement(type)
  for (const i in propsOjb) {
    if (Object.hasOwnProperty.call(propsOjb, i)) {
      obj[i] = propsOjb[i]
    }
  }
  return obj
}

// 创建一个2d标签
function initModelLabelCss2d() {
  const label = initLabelCss2dProps('div', {
    className: 'element-label-text-str',
    textContent: 'hhh'
  })
  const css_label = new CSS2DObject(label)
  css_label.position.set(0, 0, 0)
  css_label.layers.set(0)
  return css_label
}

onMounted(() => {
  container.value?.appendChild(renderer.domElement)
  css2d.value?.appendChild(cssRenderer.domElement)
  scene.add(initModelLabelCss2d())
  camera.position.z = 5
  makeCube();
  resizeRendererToDisplaySize()
  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
})

watch(container, () => {
  resizeRendererToDisplaySize()
})

let animationId: number

// 监听尺寸变化
function resizeRendererToDisplaySize() {
  const canvas = renderer.domElement
  const width = container.value?.clientWidth ?? window.innerWidth
  const height = container.value?.clientHeight ?? window.innerHeight
  const needResize = canvas.width !== width || canvas.height !== height

  if (needResize) {
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    cssRenderer.setSize(width, height)
  }
}

function animate() {
  // 模型动画
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  // css渲染
  cssRenderer.render(scene, camera)
  // 3d渲染
  renderer.render(scene, camera)
  animationId = requestAnimationFrame(animate)
}
</script>

<style scoped>
.three-box{
  position: relative;
}
.css2d{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>

```