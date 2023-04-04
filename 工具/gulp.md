# gulp

## 快速新建

```npm
npm init -y

npm install --save-dev gulp

```
新建gulpfile.js

```js
function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask
```

执行

```npm
fulp
```

## 任务：私有与公有
每个 gulp 任务（task）都是一个`异步`的 JavaScript 函数，此函数是一个可以接收 callback 作为参数的函数.

任务（tasks）可以是 public（公开） 或 private（私有） 类型的。

- 公开任务（Public tasks） 从 gulpfile 中被导出（export），可以通过 gulp 命令`直接调用`。


- 私有任务（Private tasks） 被设计为在内部使用，通常作为 series() 或 parallel() 组合的组成部分。
- - 任务（task）按顺序执行，请使用 series() 方法。


```js
const { series } = require('gulp');

function clean(cb) {
  // body omitted
  cb();
}

function build(cb) {
  // body omitted
  cb();
}

exports.build = build;//直接exports是公有的
exports.default = series(clean, build);//series（）为私有
```

## 组合任务
series() 和 parallel()，允许将多个独立的任务组合为一个更大的操作。这两个方法都可以接受任意数目的任务（task）函数或已经组合的操作。series() 和 parallel() 可以互相嵌套至任意深度。

如果需要让任务（task）按顺序执行，请使用 series() 方法。

## 处理文件

src() :

```js
const { src, dest } = require('gulp');

exports.default = function() {
  return src('src/*.js')//接受 glob 参数，并从文件系统中读取文件然后生成一个 Node 流（stream）。
    .pipe(dest('output/'));//它将所有匹配的文件读取到内存中并通过流（stream）进行处理。
   // dest() 接受一个输出目录作为参数，并且它还会产生一个 Node 流（stream），通常作为终止流（terminator stream）。当它接收到通过管道（pipeline）传输的文件时，它会将文件内容及文件属性写入到指定的目录中。
}
```
.pipe() 方法将插件放置在 src() 和 dest() 之间，并转换流（stream）中的文件。