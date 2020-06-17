# node连接Mysql的连接方式
## 直连接数据库

本来我的连接方式就是这样的：
- 创建连接
- 连接数据库
- 写对数据表操作的方法
- 最后exports，在其他地方就引用这个方法

但是这样这个方法不足：

1. 长时间不操作就会自动关闭连接
2. 方法太多，太累赘了。没有封装，一点都不好看。
3. 用完我没有关闭连接；

```js
// 这是我原来的方法：

// 1、创建连接
var connection = mysql.createConnection(db);

// 本js是对数据库的操作
// 2、连接数据库
connection.connect(function (err) {
    if (err) {
        console.error('连接失败' + err);
        return;
    }
});

// 3、对数据表操作
// 查询分页表的所有数据,按最新数据来查询
function getList(tableName,num,page) {
    return new Promise((resolve, reject) => {
        // 按照倒序来分页取值
        connection.query(`select * from ${tableName}  order by id desc limit ${num*page},${num} ;`, function (err, results, fields) {
            if(err){
                reject(err);
            }else{
                resolve(results);
            }
        });
    })
}

// 条件查询表的所有数据
function getListCondition(tableName,type,num,page) {
    return new Promise((resolve, reject) => {
        // 按照倒序来分页取值
        connection.query(`select * from ${tableName} where type=${type} limit ${num*page},${num} ;`, function (err, results, fields) {
            if(err){
                reject(err);
            }else{
                resolve(results);
            }
        });
    })
}
module.exports = {
    getList,
    getListCondition,
    }
```

发现这个问题是因为，晚上部署好代码以后，第二天本来开开心心的早上起来看看自己的网站，结果发现，连数据库断开了。
于是在网上找到了一个叫数据库连接池的方法，每次连接创建一个连接池，用完就释放，可以提高性能。

于是是我就采用数据库连接池写了下面的方法：

## 数据库连接池
```js
// 使用连接池，提升性能，
var pool = mysql.createPool(db);
module.exports={
// 对数据表操作
// 查询分页表的所有数据,按最新数据来查询
getList(tableName, num, page) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            // 按照倒序来分页取值
            connection.query(`select * from ${tableName}  order by id desc limit ${num * page},${num}`, function (err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
                connection.release();
            });
        })
    })
},

// 条件查询表的所有数据
getListCondition(tableName, type, num, page) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            // 按照倒序来分页取值
            connection.query(`select * from ${tableName} where type=${type} limit ${num * page},${num}`, function (err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
                connection.release();
            });
        })
    })
}
}
```

这样解决了。连接断开的问题。
但是代码还是太累赘了。于是我决定封装一下数据库连接池的方法

```js
conf/mysqlOperation.js

var mysql = require('mysql');
var db = require('./db');
// 使用连接池，提升性能

module.exports= function (sql) {
    return new Promise((resolve, reject) => {
        // 一、新建一个连接池
        var pool = mysql.createPool(db);
        // 二、脸上连接池
        pool.getConnection(function (err, connection) {
            // 三、使用sql语句操作
            connection.query(sql, function (err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
                // 四、释放连接池
                connection.release();
            });
        })
    })
}
```

是不是看着特别简洁，于是我觉得直连接也可以封装一下。

```js
conf/mysqlPool.js

var mysql = require('mysql');
var db = require('./db');

// 封装一下直连接数据库的封装方法，
module.exports = function (sql) {
    return new Promise((resolve, reject) => {
        // 一、创建连接
        var connection = mysql.createConnection(db);
        // 二、连接数据库
        connection.connect(function (err) {
            if (err) {
                console.error('连接失败' + err);
                return;
            }
        });
        // 三、对数据表操作
        connection.query(sql, function (err, results, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
        // 四、关闭连接
        connection.end();
    })
}

```

以后要用的时候就直接使用就可以了
```js
// var mysqlOperation = require('../conf/mysqlOperation')//原来是直连的，长时间不用会断开
var mysqlPool = require('../conf/mysqlPool') //换成连接池

// 获得留言列表
router.get('/messageList', function (req, res, next) {
    var tableName = 'message'
    var num = req.query.num;
    var page = req.query.page;
    var sql = `select * from ${tableName} order by id desc limit ${num * page},${num}`
    mysqlPool(sql)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send("请求错误");
        })
});
```

本来使用的是占位符,显示出来的语句一直是 

:select * from 'index' order by id desc limit '5','5'，不符合sql语句

所以最后就直接换成这个拼接的sql来操作。
