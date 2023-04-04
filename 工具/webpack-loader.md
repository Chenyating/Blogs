# 资源管理

## 加载css

```yarn
npm install --save-dev style-loader css-loader
```
含有 CSS 字符串的 <style> 标签，将被插入到 html 文件的 <head> 中。

```js
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```

## 加载图片
css里面用的图片会报错，需要file-loader,图像就会正确的被引用到，最后输出到dist中；

file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。

```js
npm install --save-dev file-loader

+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
```