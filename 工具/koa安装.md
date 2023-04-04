# koa的笔记

## 下载

```
npm install -g koa-generator 
```

## 新建koa脚手架项目
```
koa2 projectName
```

## 自定义路由名称
```js
const router = require('koa-router')()
router.use('/', index.routes(), index.allowedMethods())
router.use('/question', question.routes(), question.allowedMethods())

app.use(router.routes());//最后一定要加上这句，不然不会生效
```