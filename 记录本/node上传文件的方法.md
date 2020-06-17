# node后台接收文件的方法
> 重点是要接入multer的依赖，不然无法接收

```js
var express = require('express');
var router = express.Router();
// 1、引入文件操作
var fs=require('fs')
// 2、引入上传插件
var multer = require('multer')
// 3、上传文件放置的位置
var road='../resource/'
var upload = multer({ dest: road })

router.post('/img', upload.single('file'), function (req, res, next) {
    // 修改文件名，默认文件名变成2进制了。
    fs.renameSync(road + req.file.filename, road +`mini`+req.file.originalname);
    res.send("上传成功")
})
module.exports = router;

```