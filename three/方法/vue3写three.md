```js
<template>
    <div ref="container" class="three-box">
    </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const container = ref<HTMLDivElement | null>(null)
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

let cube: THREE.Object3D<THREE.Event>
 
function makeCube(){
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
}

onMounted(() => {
  container.value?.appendChild(renderer.domElement)
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
  // 3d渲染
  renderer.render(scene, camera)
  animationId = requestAnimationFrame(animate)
}
</script>
```