# nignx二级域名配置

## 域名解析
```yarn
记录类型:A
主机记录:（）.yating.onlien
解析线路：默认
记录值：服务器ip
TTL：10分钟

```

## nginx配置
在server_name上面写配置好的二级域名
```yarn
 server {
        listen       80;
        server_name  h5.yating.online;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /root/html;
            index  index.html index.htm;
        		}
	}
}
```

## 配置更新
```yarn
/usr/local/webserver/nginx/sbin/nginx -t
/usr/local/webserver/nginx/sbin/nginx -s reload
```