# 生产环境构建
```js
npm install --save-dev webpack-merge
// 同时新建和删除文件
- |- webpack.config.js
+ |- webpack.common.js
+ |- webpack.dev.js
+ |- webpack.prod.js
// package.json也修改一下script
-     "start": "webpack-dev-server --open",
+     "start": "webpack-dev-server --open --config webpack.dev.js",
-     "build": "webpack"
+     "build": "webpack --config webpack.prod.js"
```

- webpack.common.js:我们设置了 entry 和 output 配置，并且在其中引入这两个环境公用的全部插件。
- webpack.common.js :，我们设置了 entry 和 output 配置，并且在其中引入这两个环境公用的全部插件。在 webpack.dev.js 中，我们为此环境添加了推荐的 devtool（强大的 source map）和简单的 devServer 配置
-webpack.prod.js :我们引入了之前在 tree shaking 指南中介绍过的 UglifyJSPlugin。