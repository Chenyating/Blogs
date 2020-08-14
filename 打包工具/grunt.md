# grunt
package.json: 此文件被npm用于存储项目的元数据，以便将此项目发布为npm模块。你可以在此文件中列出项目依赖的grunt和Grunt插件，放置于devDependencies配置段内。

Gruntfile: 此文件被命名为 Gruntfile.js 或 Gruntfile.coffee，用来配置或定义任务（task）并加载Grunt插件的。 此文档中提到的 Gruntfile 其实说的是一个文件，文件名是 Gruntfile.js 或 Gruntfile.coffee。

## 组成
Gruntfile由以下几部分构成：

- "wrapper" 函数
- 项目与任务配置
- 加载grunt插件和任务
- 自定义任务

## wrapper函数

包装函数：每一份Gruntfile都遵循同样的格式
```js
module.exports = function(grunt) {
  // Do grunt-related things in here
};
```

## Grunt配置
Grunt的`task配置都是在 Gruntfile 中的grunt.initConfig方法中指定的`。此配置主要是以任务名称命名的属性，也可以包含其他任意数据。一旦这些代表任意数据的属性与任务所需要的属性相冲突，就将被忽略。
```js
grunt.initConfig({
  concat: {
    // 这里是concat任务的配置信息。
  },
  uglify: {
    // 这里是uglify任务的配置信息
  },
  // 任意数据。
  my_property: 'whatever',
  my_src_files: ['foo/*.js', 'bar/*.js'],
});
```

## 项目和任务
当运行一个任务时，Grunt会自动查找配置对象中的同名属性。多任务（multi-task）可以通过任意命名的“目标（target）”来定义多个配置。在下面的案例中，concat任务有名为foo和bar两个目标，而uglify任务仅仅只有一个名为bar目标。
```js
grunt.initConfig({
  concat: {
    foo: {
      // concat task "foo" target options and files go here.
    },
    bar: {
      // concat task "bar" target options and files go here.
    },
  },
  uglify: {
    bar: {
      // uglify task "bar" target options and files go here.
    },
  },
});
```

## option属性
在一个任务配置中，options属性可以用来指定覆盖内置属性的默认值。此外，每一个目标（target）中还可以拥有一个专门针对此目标（target）的options属性。目标（target）级的平options将会覆盖任务级的options。

options对象是可选的，如果不需要，可以忽略。

```js
grunt.initConfig({
  concat: {
    options: {
      // 这里是任务级的Options，覆盖默认值 
    },
    foo: {
      options: {
        // "foo" target options may go here, overriding task-level options.
      },
    },
    bar: {
      // No options specified; this target will use task-level options.
    },
  },
});
```