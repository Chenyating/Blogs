# vue-cli打包
## 前期准备
1. 新建一个vue-cli项目：
```
vue init webpack 项目名
```

2. 执行这个新项目：
```
npm run dev
```

3. 打包这个新项目
```js
npm run build
```

## 初次打包的坑
这时候你就会发现打包后的页面是一片空白的；

按F12在控制台上，会发现报错；`file:///F:/static/css/app.30790115300ab27614ce176899523b62.css net::ERR_FILE_NOT_FOUND`;
全是css，js路径引用错误的问题。

### 解决：到config文件夹中打开index.js文件。
更改build里面的assetsPublicPath属性：
assetsPublicPath属性作用是指定编译发布的根目录，‘/'指的是项目的根目录 ，'./'指的是当前目录。

修改以后，打包，页面就有内容了。

---

## 开始准备分环境打包
### 下载DefinePlugin插件： 此插件可以在打包时定义环境变量，在开发时我们也能在代码中获取定义的环境变量。

在webpack.dev.confi.js里的plungin里添加；
#### 单独配置
```js
plugins: [
    new webpack.DefinePlugin({
      'process.env.mode': '"development"'
    })
    ...
]
```
#### 写成对象
```js
plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        EVN_CONFIG: '"dev"',
        API_ROOT: '"dev API_ROOT"'
      }
    })
    ...
]
```

#### 配置文件
```js
plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../配置记录/dev.env')
    })
    ...
]

// 配置记录
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  EVN_CONFIG: '"dev"',
  API_ROOT: '"dev API_ROOT"'
})
```

可以在我们开发代码中获得环境变量`(console.log(process.env)`

---

### 我们需要安装cross-env
```js
npm install --save-dev cross-env
```

先修改script脚本,设置了两个环境变量 NODE_ENV 和 env_config然后执行正常的打包
```json
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "node build/build.js",
    // 添加两条新命令
    "build:test": "cross-env NODE_ENV=production env_config=test node build/build.js", 
    "build:prod": "cross-env NODE_ENV=production env_config=prod node build/build.js" 
  }
  ```

  新建环境变量文件
```js
//  /config/test.env.js
'use strict'
module.exports = {
    NODE_ENV: '"testing"',
    EVN_CONFIG:'"test"',
    API_ROOT:'"/test/apis/v1"'
}
```
修改webpack.prod.config.js
```js
//const env = require('../config/prod.env')
const env_config = process.env.env_config || ''; //执行不同的打包脚本对应不同的env_config值
switch (env_config){
  case 'test': 
        var env= require('../配置记录/test.env');
        break;
  case 'prod': 
        var env= require('../配置记录/prod.env');
        break;
  default:
        var env= require('../配置记录/prod.env');
}
```

## 关闭eslint

删除webpack.base.config.js文件下的
```js
      ...(config.dev.useEslint ? [createLintingRule()] : []),
// 改成
      ...(config.dev.useEslint ? [] : []),
```

## 使用echart
- 下载echart
```
npm install echarts --save
```

- 全局引用在main.js中
```js
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
```

- 使用
```js
this.pieChart = this.$echarts.init(document.getElementById(this.id));
```

## 使用view
- 下载
```
$ npm install view-design --save
```
- 在main.js添加
```js
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);
```
