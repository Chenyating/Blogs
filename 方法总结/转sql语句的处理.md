# 转sql语句的处理

## 对表格增加值
```js
function insert(tableName, data) {
    var key = [];
    var value = [];
    for (const i in data) {
        if (data.hasOwnProperty(i)) {
            key.push(i)
            value.push(JSON.stringify(data[i]))
        }
    }
    return `insert into ${tableName}(${key.toString()}) values(${value.toString()})`
}
```
示例：

```js
tableName='table1';
data={
    name:'ting',
    age:'12',
    from:'beijing'
}

insert(tableName, data)
//insert into table1 (name,age,from) values('ting','12','beijing')
```