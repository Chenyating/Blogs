# plugin

## 清理/dist文件夹
```js
npm install clean-webpack-plugin --save-dev

    plugins: [
+     new CleanWebpackPlugin(['dist']),]
```

## 防止重复
CommonsChunkPlugin 
```js
    plugins: [
      new HTMLWebpackPlugin({
        title: 'Code Splitting'
-     })
+     }),
+     new webpack.optimize.CommonsChunkPlugin({
+       name: 'common' // 指定公共 bundle 的名称。
+     })
    ],
```