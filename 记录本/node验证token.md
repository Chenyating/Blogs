# 使用jwt生成token

JSON Web Token（JWT）是目前最流行的跨域身份验证解决方案。

- 1、引入jsonwebtoken

```js
var jwt = require('jsonwebtoken');
```

- 2、生成一个token
```js
// 生成一个token
const secret = 'yating';
function makeToken(name, password, exp) {
    return token = jwt.sign({ name, password, exp }, secret);
}
```
```
类似这样的：
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGluZ2VyIiwicGFzc3dvcmQiOiJndW93ZWkiLCJleHAiOjE1Njc0MTQ1NjEsImlhdCI6MTU2NzQxMjc2MX0.75ARiai6NXo0UrqMyW30eumfAz4zNzqfZT0nm85LlFk
```
具体的原理什么的，请请大家自己去网上找一下，我也讲的不是很清楚。


- 3、验证token是否过期，我这里用了一个promis方法，没有过期的时候，decoded会返回token的解析结果。
```js
// 验证token
function verifyToken(token) {
    return new Promise((reslove, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                // 验证过期失败
                reject(err);
            } else {
                // 验证成功传用户信息
                reslove(decoded)
            }
        })
    })
}
```

- 4、再次之前要比对一下存在数据库里的用户是否存在与请求的token一致
```js
// 对比数据库里的token
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

- 5、以后涉及用到权限的时候都套用这个方式，其中1、2我已经合在verifyMysqlToken方法里了。

 1、对比一下请求的token是否与数据库里的token一致，不一致则结束；

 2、一致，则验证一下token是否过期。过期则结束；

 3、token没有过期，则有权限操作。



```js
//下面跟权限有关的接口都要套上这个格式
 var ifok = verifyMysqlToken(req.headers.token, req.headers.username);
    ifok.then(data => {
//有权限操作的代码,对数据库进行操作
    }).catch(err => {
//无权限操作的代码,不对数据库操作
    });
```

- 6、当用户登录成功时，与数据库里的账号跟密码进行比对。然后就开始生成token，并且设置一下过期时间，这里我设置的是3分钟。返回给前端。

```js
// 登录
router.post('/login', function (req, res, next) {
    var user = req.body.user;
    var password = req.body.password;
    var sql = `select * from users where user='${user}' and password='${password}'; `
    mysqlPool(sql)
        .then((data) => {
            if (data.length == 1) {
                var expTime = Math.floor(Date.now() / 1000) + 60 * 3;//过期时间1分钟
                var token = makeToken(user, password, expTime);//生成token
                // 将token存到数据库里
                var sqlsaveToken = `UPDATE users SET token="${token}"where user='${user}' and password='${password}';`
                mysqlPool(sqlsaveToken).then(data => { console.log("更新用户token") }).catch(err => { console.log("更新失败") });
                // 返回token给前端
                var message = {
                    token:token,
                    info: "登录成功~",
                    code: 1
                }
                res.send(message);
            } else {
                var message = {
                    info: "不存在用户~",
                    code: 0
                }
                res.send(message);
            }
        })
        .catch((err) => {
            var message = {
                info: "请求错误！",
                code: -1
            }
            res.send(message)
        })
});
```

- 7、举个例子：
```js
// 删除
router.post('/delete', function (req, res, next) {
    var ifok = verifyMysqlToken(req.headers.token, req.headers.username);
    // 有权限则可以操作：
    ifok.then(data => {
        var tableName = req.body.tableName;
        var id = req.body.id;
        var sql = `DELETE FROM ${tableName} WHERE id=${id};`
        mysqlPool(sql)
            .then((data) => {
                var message = {
                    info: "删除成功~",
                    code: 1
                }
                res.send(message);
            })
            .catch((err) => {
                var message = {
                    info: "删除失败",
                    code: 0
                }
                res.send(message)
            })
    }).catch(() => {
        var message = {
            info: "你没有权限操作o(´^｀)o~",
            code: -1
        }
        res.send(message)
    });
});
```

- 8、前端获得token以后要存在session里。然后每次请求的时候，把token放在header里。
```js
function POST(url, params) {
    return new Promise((scuessful, fail) => {
        var userInfo = sessionStorage.getItem('userInfo');
        if(userInfo){
            axios.defaults.headers.token = JSON.parse(userInfo).token;
            axios.defaults.headers.userName = JSON.parse(userInfo).userName;
        }
        axios.post(url, params)
            .then(function (response) {
                scuessful(response);
            })
            .catch(function (error) {
                fail(error);
            });
    });
}
```
