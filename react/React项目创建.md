# 初始化React项目

## react项目初始
### 下载react框架
```
npm install create-react-app -g
```
### 创建react项目
```
create-react-app 项目名称
```
### 运行
```
npm start
或
yarn start
```

## 添加antd-UI框架
- 0.安装antd
```
yarn add antd
```

- 1.安装antd按需加载的插件babel-plugin-import
```
npm install babel-plugin-import --save-dev
```

- 2.安装react-app-rewired
```
npm install react-app-rewired --save-dev
```
eact-app-rewired是一个再配置的工具。安装完之后在根目录新建一个config-overrides.js的文件，在这个配置文件中新增加自己的自定义配置，可以实现在不eject的情况下自定义配置。

- 3.安装customize-cra
```
npm install customize-cra --save-dev
```
使用customize-cra要确保先安装了react-app-rewired。

- 4.配置按需加载
首先在项目的根目录下新建一个config-overrides.js文件，接下来在这个文件中写我们自己的配置
```js
const { override, fixBabelImports } = require('customize-cra');
   module.exports = override(
       fixBabelImports('import', {        
           libraryName: 'antd',        
           libraryDirectory: 'es',       
           style: 'css'
       })
   )
```

- 5.修改package.json
把react-scripts改成react-app-rewired
```json
  "scripts": {
       "start": "react-app-rewired start",
       "build": "react-app-rewired build",
       "test": "react-app-rewired test",
       "eject": "react-app-rewired eject"
     }
```

- 6.引用组件
```js
import React, { Component } from 'react';
   import { Button } from 'antd';
   class Test extends Component {
       render() {
           return (
               <div>
                   <Button type="primary">点击</Button>
               </div>
           )
       }
   }
   export default Test;
```
### 注意警告
如果控制台出现报错的话，在package.json里添加
```json
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css"
      }
    ]
  ]
```
然后删掉原来的node_module,重新npm i
再次重新启动就看不见警告了。
## 引入router

### 下载
```
npm install react-router-dom --save
```

## 打包
### 打包后本地可预览
在package.json里面添加一个字段
 ```json
  "homepage": ".",
```

## 下载router
```
npm install react-router
```
