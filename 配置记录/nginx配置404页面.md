# nginx配置404页面

在nginx.conf的serve里添加

```yarn
      error_page 404 /404.html;
           location = /404.html {
               root /root/myIndex/;
           }
```
root写404.html所在的路径