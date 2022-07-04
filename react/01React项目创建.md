# 初始化React项目

## react项目初始

```js
npm install create-react-app -g
// 下载react框架

create-react-app 项目名称
// 创建react项目

yarn start
// 运行

npm run eject
//npm run eject 此命令会将脚手架中隐藏的配置都展示出来，此过程不可逆。
```

## 引入样式文件
```js
npm install node-sass --save-dev
// 安装sass
```

### 样式模块化

实现样式的模块化，则需使用 [name].module.scss 方式命名，使用方式如下：
```js
import styles from './index.module.scss'

export default function App() {
  return (
    <div className={styles.title}>hello world</div>
  )
}
```

