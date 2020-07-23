# nginx配置history模式

try_files $uri $uri/ /index.html =404;

```
server {
listen  80;
server_name  localhost;
index index.html;
root /root/dist;
location / {
    root /root/dist;
    try_files $uri $uri/ /index.html =404;
}
}
```