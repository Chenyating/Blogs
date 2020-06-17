# ginx配置
centos8安装

## 安装编译工具及库文件
```yarn
yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel
```

## 首先要安装 PCRE
PCRE 作用是让 Nginx 支持 Rewrite 功能。

1. 下载 PCRE 安装包，下载地址： http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz

```yarn
cd /usr/local/src/

wget http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz
```
2. 解压安装包:

```yarn
tar zxvf pcre-8.35.tar.gz
```
3. 进入安装包目录

cd pcre-8.35
4. 编译安装 

```yarn
./configure
make && make install
```

5. 查看pcre版本

```yarn
pcre-config --version
```
## 安装 Nginx
1. 下载 Nginx，下载地址：http://nginx.org/download/nginx-1.6.2.tar.gz

```yarn
cd /usr/local/src/
wget http://nginx.org/download/nginx-1.6.2.tar.gz
```
2. 解压安装包

```yarn
tar zxvf nginx-1.6.2.tar.gz
```

3. 进入安装包目录

```yarn
cd nginx-1.6.2
```
4. 编译安装

```yarn
./configure --prefix=/usr/local/webserver/nginx --with-http_stub_status_module --with-http_ssl_module --with-pcre=/usr/local/src/pcre-8.35
make
make install
```
5. 查看nginx版本

```yarn
/usr/local/webserver/nginx/sbin/nginx -v
```
到此，nginx安装完成。

nginx 默认安装在webserve下。

## 基础配置文件nginx.conf

```
user root;
worker_processes 2; #设置值和CPU核心数一致
error_log /usr/local/webserve/nginx/logs/nginx_error.log crit; #日志位置和日志级别
pid /usr/local/webserve/nginx/nginx.pid;
#Specifies the value for maximum file descriptors that can be opened by this process.
worker_rlimit_nofile 65535;
events
{
  use epoll;
  worker_connections 65535;
}
http
{
  include mime.types;
  default_type application/octet-stream;
  log_format main  '$remote_addr - $remote_user [$time_local] "$request" '
               '$status $body_bytes_sent "$http_referer" '
               '"$http_user_agent" $http_x_forwarded_for';
  
#charset gb2312;
     
  server_names_hash_bucket_size 128;
  client_header_buffer_size 32k;
  large_client_header_buffers 4 32k;
  client_max_body_size 8m;
     
  sendfile on;
  tcp_nopush on;
  keepalive_timeout 60;
  tcp_nodelay on;
  fastcgi_connect_timeout 300;
  fastcgi_send_timeout 300;
  fastcgi_read_timeout 300;
  fastcgi_buffer_size 64k;
  fastcgi_buffers 4 64k;
  fastcgi_busy_buffers_size 128k;
  fastcgi_temp_file_write_size 128k;
  gzip on; 
  gzip_min_length 1k;
  gzip_buffers 4 16k;
  gzip_http_version 1.0;
  gzip_comp_level 2;
  gzip_types text/plain application/x-javascript text/css application/xml;
  gzip_vary on;
 
  #limit_zone crawler $binary_remote_addr 10m;
 #下面是server虚拟主机的配置
     server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /root/html;
            index  index.html index.htm;
        		}
	}
}
```