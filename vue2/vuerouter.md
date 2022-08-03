# 路由

## router路由器
以栈的形式保存，常用的方法：push，replace，back，go

## 缓存路由组件keep-alive
使用方法
```html
<keep-alive>
    <router-view></router-view>
</keep-alive>
```

## query
在url后面带

## 路由组件标签

路由的表示
## hash

队列：先进先出
栈：先进后出

## history模式
- 后端：在这个路径下，不管路径怎么变化，后端都返回一个同一个html文件

```yaml
意思是：
1、www.baidu.com   返回1.html
2、www.baidu.com/index/a/b/c/c/c/d/e     返回1.html
2、www.baidu.com/**     返回1.html
```

- 前端：前端在切换的时候使用history api操作，对路径变化进行路由切换

换个意思理解：

我访问www.baidu.com/a了。然后我想访问www.baidu.com/a/b，我在浏览器上输入还是同一个页面。我必须要用history的api去操作，才能真正访问到a/b页面。