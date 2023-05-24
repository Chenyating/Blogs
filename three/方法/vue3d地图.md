```js
<template>
  <div ref="container" class="three-box">
    <div @click="getPosition()">获取位置</div>
    <div ref="css2d" class="css2d"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import * as d3 from 'd3'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import TWEEN, { Tween } from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import mapjson from '../mapGeoJson/china.json'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

const container = ref<HTMLDivElement | null>(null)
// 场景设置
const scene = new THREE.Scene()
// camer设置
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
camera.position.set(0, -56, 63)
camera.lookAt(0, 0, 0)

// 渲染器
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true // 开启阴影
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setClearColor(0xffffff, 0) // 清除背景色，透明背景

// 控制器
const controller = new OrbitControls(camera, renderer.domElement)
controller.update()

// 地图材质颜色
const COLOR_ARR = ['#ade8ff', '#357bcb', '#37ffff']
scene.add(initMap(mapjson))

// css2d
const css2d = ref<HTMLDivElement | null>(null)
const cssRenderer = new CSS2DRenderer()
cssRenderer.setSize(window.innerWidth, window.innerHeight)
function initModelCss2d(position: number[], id: number, name: string | undefined) {
  // 设置元素的属性
  /**
   * @description:
   * @param {*} type 标签元素
   * @param {*} propsOjb 标签属性对象
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
    className: `mapbar-box`
  })
  // 内层元素，一般自定义样式都写在内层元素
  const elemIner = initCss2dProps('div', {
    className: `mapbar ${name}`,
    id: `bar${id}`
  })
  elem.appendChild(elemIner)
  const css2dElement = new CSS2DObject(elem)
  // 定义css2d的位置
  css2dElement.position.set(position[0], position[1] + 1, 6)
  css2dElement.layers.set(0)
  return css2dElement
}
/**
 * 初始化地图
 * @param chinaJson - 包含中国地图信息的 JSON 对象
 * @returns group - 地图对象的 THREE.Group
 */
function initMap(chinaJson: { features: any[] }) {
  // 墨卡托投影转换
  const projection = d3.geoMercator().center([100, 40]).scale(100).translate([0, 0])

  const map = new THREE.Object3D()
  const group = new THREE.Group()
  const lineGroup = new THREE.Group()
  group.name = '地图'

  /**
   * 将地理坐标转换为墨卡托投影坐标
   * @param coordinates - 地理坐标数组
   * @returns geoProjectionPoint - 转换后的墨卡托投影坐标数组
   */
  const coordinatesToGeoProjection = (coordinates: any): number[][] => {
    return coordinates
      .map((point: any) => {
        if (Array.isArray(point)) {
          if (Array.isArray(point[0])) {
            return coordinatesToGeoProjection(point) // 递归调用时传递 point 参数
          } else {
            const lngLat = point as [number, number] // 修改为具体的类型 [number, number]
            return lngLatToMector(lngLat)
          }
        }
        return []
      })
      .filter((val: any) => val.length)
  }

  /**
   * 将经纬度坐标转换为墨卡托投影坐标
   * @param lngLat - 经纬度坐标数组
   * @returns mector - 转换后的墨卡托投影坐标数组
   */
  const lngLatToMector = (lngLat: any) => {
    const [y, x] = projection(lngLat) || [1, 1]
    let z = 0
    return [y, -x, z]
  }

  /**
   * 绘制线条
   * @param points - 线条的坐标点数组
   * @returns line - 绘制的线条对象
   */
  const drawLine = (points: number[][]) => {
    const pointArr: number[] = ([] as number[]).concat(...points)

    // 2. 创建 LineGeometry，并设置空间点
    const geometry = new LineGeometry()
    geometry.setPositions(pointArr)

    // 3. 创建 LineMaterial，设置颜色和线宽
    const material = new LineMaterial({
      color: '#68caff',
      linewidth: 2.5
    })

    // 4. 设置材质分辨率
    material.resolution.set(window.innerWidth, window.innerHeight)

    // 5. 创建 Line2
    const line = new Line2(geometry, material)
    return line
  }

  /**
   * 绘制模型
   * @param points - 模型的顶点坐标数组
   * @param index - 模型索引
   * @returns mesh - 绘制的模型对象
   */
  const drawModel = (points: number[][], index: number) => {
    const color = COLOR_ARR[index % COLOR_ARR.length]
    const shape = new THREE.Shape()
    points.forEach((d, i) => {
      const [x, y] = d
      if (i === 0) {
        shape.moveTo(x, y)
      } else if (i === points.length - 1) {
        shape.quadraticCurveTo(x, y, x, y)
      } else {
        shape.lineTo(x, y)
      }
    })

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 4,
      bevelEnabled: true,
      bevelSegments: 1,
      bevelThickness: 0.2
    })

    const material = new THREE.MeshStandardMaterial({
      metalness: 0.4,
      color: color,
      transparent: false,
      opacity: 1,
      depthTest: true,
      depthWrite: true,
      fog: false,
      roughness: 1
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    return mesh
  }

  // 处理地图数据
  const getmapVector = chinaJson.features.map((item, index) => {
    const { properties, geometry } = item

    const { name } = properties || {}

    const { coordinates } = geometry

    const geoProjectionPoint = coordinatesToGeoProjection(coordinates)

    return {
      name: name || `area_${index}`,
      areaMap: item,
      geoProjectionPoint
    }
  })

  // 遍历地图数据，绘制地图模型和线条
  getmapVector.forEach((item, index) => {
    const { name, areaMap, geoProjectionPoint } = item
    const g = new THREE.Object3D()
    g.name = name || '省份'
    g.userData = areaMap
    if (item.areaMap.properties.center) {
      g.center = lngLatToMector(item.areaMap.properties.center)
    }
    geoProjectionPoint.forEach((points: any) => {
      const isPolyhedron = Array.isArray(points[0]) && Array.isArray(points[0][0])
      if (isPolyhedron) {
        points.forEach((point: any) => {
          const mesh = drawModel(point as unknown as number[][], index)
          const lineMesh = drawLine(point as unknown as number[][])
          lineMesh.position.z = 4.5

          g.add(lineMesh)
          g.add(mesh)
        })
      } else {
        const mesh = drawModel(points as unknown as number[][], index)
        const lineMesh = drawLine(points as unknown as number[][])
        lineMesh.position.z = 4.5
        g.add(lineMesh)
        g.add(mesh)
      }
    })
    group.add(g)
  })

  scene.add(lineGroup)
  return group
}

onMounted(() => {
  container.value?.appendChild(renderer.domElement)
  css2d.value?.appendChild(cssRenderer.domElement)
  controller.update()
  resizeRendererToDisplaySize()
  setLight()
  animate()
  getPosition() //执行动画
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
function setLight() {
  let ambientLight = new THREE.AmbientLight(0xffffff, 0.2) // 环境光
  const light = new THREE.DirectionalLight(0xffffff, 1) // 平行光
  light.position.set(20, -50, 20)

  light.castShadow = true
  light.shadow.mapSize.width = 1024
  light.shadow.mapSize.height = 1024

  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(20, -50, 50)

  pointLight.castShadow = true
  pointLight.shadow.mapSize.width = 1024
  pointLight.shadow.mapSize.height = 1024

  const pointLight2 = new THREE.PointLight(0xffffff, 1)
  pointLight2.position.set(50, -50, 20)
  pointLight2.castShadow = true
  pointLight2.shadow.mapSize.width = 1024
  pointLight2.shadow.mapSize.height = 1024

  scene.add(ambientLight)
  scene.add(light)
  scene.add(pointLight)
  scene.add(pointLight2)
}
function animate() {
  // css渲染
  cssRenderer.render(scene, camera)
  // 3d渲染
  renderer.render(scene, camera)
  controller.update()
  TWEEN.update() // 更新 tween 动画

  animationId = requestAnimationFrame(animate)
}
function getPosition() {
  const obj = scene.getObjectByName('地图'); // 获取场景中名为 '地图' 的对象
  const tweenArr: Tween<{ z: number }>[] = []; // 存储 Tween 动画的数组

  function addTween(obj: THREE.Object3D<THREE.Event> | undefined, i: number) {
    const startPosition = { z: 0 }; // 动画起始位置
    const targetPosition = { z: 2 }; // 动画目标位置

    const tween = new TWEEN.Tween(startPosition) // 创建 Tween 动画对象
      .to(targetPosition, 1000) // 设置动画的目标值和持续时间
      .yoyo(true) // 反向播放动画
      .repeat(1) // 重复播放 1 次
      .easing(TWEEN.Easing.Quadratic.InOut) // 缓动函数
      .onUpdate(() => {
        obj?.position.set(0, 0, startPosition.z); // 更新对象的位置
        const barElement = document.getElementById(`bar${i}`);
        if (barElement) {
          barElement.classList.add('show'); // 显示相应的元素
        }
      })
      .onComplete(() => {
        obj?.position.set(0, 0, 0); // 动画完成后将对象位置重置
        const barElement = document.getElementById(`bar${i}`);
        if (barElement) {
          barElement.classList.remove('show'); // 移除相应的元素
        }
        let j = getRandomIndex(i, tweenArr.length); // 获取随机的索引
        console.log(j);
        tweenArr[j].start(); // 开始随机选择的下一个动画
      });

    return tween;
  }

  function getRandomIndex(currentIndex: number, maxLength: number) {
    let randomIndex = Math.floor(Math.random() * maxLength);
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * maxLength);
    }
    return randomIndex; // 返回满足条件的随机索引
  }

  for (let i = 0; i < obj.children.length; i++) {
    const child = obj.children[i];
    const p = child.center;
    if (p !== undefined) {
      scene.add(initModelCss2d(p, i, child.name)); // 在场景中添加相应的模型
    }
    tweenArr.push(addTween(child, i)); // 添加 Tween 动画到数组中
  }

  tweenArr[0].start(); // 开始第一个动画
}

</script>

<style lang="scss">
.three-box {
  position: relative;
  width: 100%;
  height: 100%;
}
.css2d {
  position: absolute;
  pointer-events: none;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: pink;
  .mapbar-box {
    width: 17px;
    height: 94px;
  }
  .mapbar {
    width: 17px;
    height: 94px;
    background: url(./Map/textures/bar.svg);
    opacity: 0;
    transition: 0.1s ease-in all;
  }
  .show {
    display: block;
    opacity: 1;
    transition: 0.1s ease-in all;
  }
}
</style>
```