# webpack的构建流程及原理

Webpack构建运行在`node.js环境下`，它的`配置文件遵循CommonJS规范`，webpack.config.js导出`一个Object对象`（或者导出一个Function，或者导出一个Promise函数，还可以导出一个数组包含多份配置）。Webpac`k从入口文件开始`，识别出源码中的模块化导入语句，`递归地找出所有依赖`，然后把`入口文件和所有依赖打包到一个单独的文件中(即一个chunk)`，这就是所谓的`模块打包`。最新版的Webpack，已经支持了E6/CommonJS/AMD等模块化语句。

## 什么是loader？

Loader用于对模块文件进行`编译转换和加载处理`，在`module.rules数组`中进行配置，它用于告诉Webpack在遇到哪些文件时使用哪些Loader去加载和转换。Loader还可以通过querystring或object指定选项参数。

## 什么是plugin?

Plugin用于扩展Webpack功能，实现原理是在构建流程里注入钩子函数。在plugins数组中进行配置。

关于DevServer：

DevServer用于提供HTTP服务、监听文件变化并实时刷新页面、支持SourceMap以方便调试。

## 六个核心概念：

### Entry
入口，这是Webpack执行构建的第一步，可理解为输入。

### Module
模块，在Webpack中一切皆模块，一个模块即为一个文件。Webpack会从Entry开始递归找出所有的依赖模块。

### Chunk
代码块，一个Chunk由多个模块组合而成，它用于代码合并与分割。

### Loader
模块转换器，用于将模块的原内容按照需求转换成新内容。

### Plugin
扩展插件，在Webpack构建过程的特定时机注入扩展逻辑，用来改变或优化构建结果。

### Output
输出结果，源码在Webpack中经过一系列处理后而得出的最终结果。

## Webpack构建流程：

Webpack在启动后，会从Entry开始，递归解析Entry依赖的所有Module，每找到一个Module，就会根据Module.rules里配置的Loader规则进行相应的转换处理，对Module进行转换后，再解析出当前Module依赖的Module，这些Module会以Entry为单位进行分组，即为一个Chunk。因此一个Chunk，就是一个Entry及其所有依赖的Module合并的结果。最后Webpack会将所有的Chunk转换成文件输出Output。在整个构建流程中，Webpack会在恰当的时机执行Plugin里定义的逻辑，从而完成Plugin插件的优化任务。

基础配置项：参考webpack官网配置项

```js
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ['babel-polyfill','./src/main.js']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  // 排除模块，下面的模块不会编译到 webpack 打包后的文件中
    externals: {
    "vue":  "Vue",
    "vuex": "Vuex",
    "vue-router": "VueRouter",
    "lodash": "_",
    "echarts": "echarts"
    },
  plugins: [
    // 全局模块对象
    new webpack.ProvidePlugin({
      "Vue": "vue",
      "Vuex": "vuex",
      "VueRouter": "vue-router",
      "_": "lodash",
      "echarts": "echarts"
    })
  ],
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.scss/,
        loader: ['style','css','scss']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
```
配置项说明：

entry，指定了模块的入口，它让源文件加入构建流程中被webpack控制。

output，配置如何输出最终的代码结果。

module，配置各种类型的模块的处理规则和解析策略。

rosolve，配置webpack寻找模块的规则。

plugin，配置扩展插件，扩展webpack的更多功能。

devServer，配置DevServer，实现本地http服务、模块热替换、source map调试等。
