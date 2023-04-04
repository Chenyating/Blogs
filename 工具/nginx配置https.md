# 把 http换成 https

这是我现在的博客地址：https://www.yating.world/

--- 

> ssl证书：实现网站HTTPS化，使网站可信，防劫持、防篡改、防监听、安全加密。SSL 证书就是遵守 SSL协议，由受信任的数字证书颁发机构CA，在验证服务器身份后颁发，具有服务器身份验证和数据传输加密功能。

该安全协议主要用来提供对用户和服务器的认证；对传送的数据进行加密和隐藏；确保数据在传送中不被改变，即数据的完整性，现已成为该领域中全球化的标准。

## 步骤
1. 第一步首先购买ssl证书
我用的是阿里云服务器。ssl证书购买地址：https://common-buy.aliyun.com/?spm=5176.7968328.1266638..122e1232hPOLjC&commodityCode=cas&aly_as=HPiHXlKb#/buy
2. 第二步：购买以后需要填写信息申请；成功以后就可以下载ssl证书了；
3. 下载nginx服务类型的证书

--- 
## 文件类型介绍
1. .key文件：属于密钥文件，SSL证书的私人密钥就包括在内。是信息内容的中枢；
2. .csr文件：文件里包括证书的公用密钥和一些公司内部重要秘密信息，要使用者通过请求签名之后才能够直接生出证书；
3. .crt文件：此文件也包含了ssl证书的公用密钥、签字讯息以及根据不同的类型伴随不同认证的信息，通常各类签名签字证书都会在这类文件中，如IP等；
4. .pem文件：该文件较其他后缀文件来说比较少见，里面包含着证书的私人密钥以及其他一部分证书重要的信息。

*重点：请记得在阿里云的安全组策略，把443端口号给开放出来哦~！*

*记得把你页面上的所有http的请求都改成https，不然报错！*

### 通用格式
```nginx
        listen  443 ssl;
        server_name  yating.world;
        ssl_protocols TLSv1.2 TLSv1.1;
        ssl_certificate  文件位置/www.yating.world.pem;
        ssl_certificate_key  文件位置/www.yating.world.key;
        ssl_session_timeout 600; #缓存有效时间10分钟，默认5m 5分钟
        ssl_protocols SSLv2 SSLv3 TLSv1; #支持的协议
        ssl_ciphers HIGH:+AES; #限定加密算法
```

## 强制http转为https

```nginx
   #访问yaitng.world,强制http转为https
    server {
        listen 80;
        server_name localhost;
        rewrite ^ https:/$http_host$request_uri? permanent;
    }
```

*** 

### nginx配置
```
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
        listen 80;
        server_name  localhost;
        rewrite ^ https:/$http_host$request_uri? permanent;
    }
    server {
        listen       80;
        listen  443 ssl;
        server_name  yating.world;
        ssl_protocols TLSv1.2 TLSv1.1;
        ssl_certificate  文件位置/www.yating.world.pem;
        ssl_certificate_key  文件位置/www.yating.world.key;
        ssl_session_timeout 600; #缓存有效时间10分钟，默认5m 5分钟
        ssl_protocols SSLv2 SSLv3 TLSv1; #支持的协议
        ssl_ciphers HIGH:+AES; #限定加密算法
        #access_log  logs/host.access.log  main;
        #charset koi8-r;


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
            expires      7d;
                proxy_set_header Host $host;
                proxy_pass_header User-Agent;
                proxy_pass http://127.0.0.1:3000/;
            }


        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}

```
