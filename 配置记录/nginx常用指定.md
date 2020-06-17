# nginx常用指令

下载在webserver文件中

1. 判断nginx.conf文件是否正确

```yarn
/usr/local/webserver/nginx/sbin/nginx -t
```

2. 启动nginx

```yarn
/usr/local/webserver/nginx/sbin/nginx
```
3. 重新载入配置文件

```yarn
/usr/local/webserver/nginx/sbin/nginx -s reload
```
4. 重启 Nginx

```yarn
/usr/local/webserver/nginx/sbin/nginx -s reopen 
```

5. 停止 Nginx

```yarn
/usr/local/webserver/nginx/sbin/nginx -s stop
```