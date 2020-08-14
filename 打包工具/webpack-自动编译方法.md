# 自动编译方法

## webpack's Wath Mode

在packag.js添加script
```js
"watch": "webpack --watch",
```

现在，你可以在命令行中运行 npm run watch，就会看到 webpack 编译代码，然而却不会退出命令行。这是因为 script 脚本还在观察文件。

缺点是:为了看到修改后的实际效果，你需要刷新浏览器。

## webpack-dev-server

localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。

```js
npm install --save-dev webpack-dev-server
// 在webpack.config.js添加，告诉开发服务器(dev server)，在哪里查找文件：
 devServer: {
    contentBase: './dist'
   },
```

## webpack-dev-middleware

webpack-dev-middleware 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 webpack-dev-server 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求。

```js
npm install --save-dev express webpack-dev-middleware
```