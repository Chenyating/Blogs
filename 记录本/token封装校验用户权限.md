# 封装校验用户权限的方法

因为发现其他接口涉及到权限的操作，于是我把校验权限的方法封装起来。
校验权限也就是比对token。

```js
// 引入的js文件：
var mysqlPool = require('../conf/mysqlPool') //换成连接池来操作数据库
// 一、引入jsonwebtoken
var jwt = require('jsonwebtoken');
```

## 用户每次登录完成以后都需要新建一个token，并保存在数据库里。
```js
// 二、生成一个token,exp是过期时间
const secret = 'yating';
function makeToken(name, password, exp) {
    return token = jwt.sign({ name, password, exp }, secret);
}
```

## 验证token的目的，主要看是否过期。过期则需要再登录一次
```js
// 二、验证token
function verifyToken(token) {
    return new Promise((reslove, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                // 验证过期失败
                console.log("登录过期")
                reject(err);
            } else {
                // 验证成功传用户信息
                console.log("登录没过期")
                reslove(decoded)
            }
        })
    })
}
```

## 对比数据库里的token的同时，一致则要验证一下token是否过期；
```js
// 三、对比数据库里的token
function verifyMysqlToken(token, userName) {
    return new Promise((reslove, reject) => {
        // 只要token和用户名为空，name就失败
        if(token==undefined||userName==undefined){
            reject();
        }else{
            // 1、先在数据库里比对token
            var sql = `select token from users where user='${userName}'; `
            mysqlPool(sql).then(data => {
                // 如果请求的token跟存在数据库里的token一直，name就验证是否过期；
                var mysqlToken = data[0].token
                console.log(mysqlToken == token,"对比结果")
                if (mysqlToken == token) {
                    console.log("请求的token跟数据库里的token一致")
                    // 开始验证,调用验证函数,成功后调用reslove的方法，失败就reject（）
                    verifyToken(token).then(data => reslove(data)).catch(err => reject())
                } else {
                    // 不一致，则结束；
                    console.log("不一致")
                    reject()
                }
            })
        }
    })
}
```
## 以后涉及用到权限的时候都套用这个方式，其中1、2我已经合在verifyMysqlToken方法里了。

 1、对比一下请求的token是否与数据库里的token一致，不一致则结束；

 2、一致，则验证一下token是否过期。过期则结束；

 3、token没有过期，则有权限操作。

```js
// 下面跟权限有关的接口都要套上这个格式
//  var ifok = verifyMysqlToken(req.headers.token, req.headers.username);
// ifok.then(data => {
// 有权限操作的代码
// }).catch(err => {
// 无权限操作的代码
// });

module.exports={
    makeToken,  verifyMysqlToken
}
```