# entry

起点入口

## 用法
entry:string|Array<string>

entry接受三种形式的值：字符串，数组和对象
```js
entry: {
    <key>: <value>
    ...
}
```

- key可以是简单的字符串，比如：'app', 'main', 'entry-1'等。并且对应着output.filename配置中的[name]变量

```js
entry: {
    'app-entry': './app.js'
},
output: {
    path: './output',
    filename: '[name].js'
}
```
output文件夹下面会有一个app-entry.js文件

- 如果key为一个路径，name生成以后会在该path下；

```js
entry: {
    'path/of/entry': './deep-app.js',
    'app': './app.js'
},
```

output下就会有一个path文件夹/of文件夹/entry.js；和在根目录下的app.js文件；

```js
entry: './app.js'
// 等价于
entry: {
    main: './app.js'
}


entry: ['./app.js', 'lodash']
// 等价于
entry: {
    main: ['./app.js', 'lodash']
}
```
## 分离应用程序和第三方库
```js
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```