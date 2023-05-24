# GUI用法总结

1. 普通控制：
```js
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
const gui = new GUI() //创建新gui控件
gui.add(camera.position, 'x').setp(0.1)
```

2. 控制颜色 
```js
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

const geometry = new THREE.BoxGeometry(10, 10, 10)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
const gui = new GUI() //创建新gui控件

const params = {
  color: 0x32030,
} // 添加gui颜色控件按钮
gui.addColor(params, 'color').onChange(function (val) {
  cube.material.color.set(val)
})
```
