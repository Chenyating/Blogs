# nginx设置代理

## 步骤

- 第一步、在本地 npm run build,会在.nuxt文件夹下生成dist文件;
- 第二步、把本地文件的.nuxt,static,package.json,nuxt.config.js,这四个文件夹放到服务器目录文件下，四个文件放到里面;
- 第三步、安装依赖，npm install;
- 第四步、npm start 此时运行的是 http://localhost:9000;
- 第五步、在nginx上面设置一下配置：proxy_pass http://localhost:9000;同理如果你有后台的话，也是这样的操作。

然后你就可以访问这个地址啦~[http://www.yating.online](http://www.yating.online)


```nginx
#user  nobody;
worker_processes  1;
user root;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

#myweb nuxt项目
	location / {
          #alias /root/yating-project/;
          #index  index.html index.htm;
          #autoindex on;
          proxy_pass http://127.0.0.1:9000;
      }
#静态资源
       location /game {
          alias /root/easyGame/output/;
          index  index.html index.htm;
          autoindex on;
      }
#对外开放资源
	location /res{
	  alias /root/resource/;
	  index index.html index.htm;
	  autoindex on;
	}
#后台接口地址
	location /api/ {
	expires  7d;
        proxy_set_header Host $host;
        proxy_pass_header User-Agent;
        proxy_pass http://127.0.0.1:1111/;
      }
    }

}
```

