# Mac的flarum安装指南
前置条件：mysql，php8.1，nginx，apache安装

最优方法：直接下载MAMP免费软件pro需要付费，一件配置部署。
下载地址：https://www.mamp.info/en/mamp/mac/

## mysql安装
```json

brew search mysql

brew install mysql@5.7

配置环境变量:
echo 'export PATH="/opt/homebrew/opt/mysql@5.7/bin:$PATH"' >> ~/.zshrc

使配置生效:
source ~/.zshrc

启动 mysql 服务
mysql.server start
mysql.server stop
```

安装后默认密码为空需要设置一下

Mysql安装成功后，默认的root用户密码为空，你可以使用以下命令来创建root用户的密码：

[root@host]# mysqladmin -u root password "new_password";

[root@host]# mysql -u root -p
Enter password:*******


mysql可视化工具sequel ace，可以在appstore里下载


mysql学习网站：做游戏的感觉学习
https://sqlbolt.com/lesson/select_queries_introduction
中文版本：http://xuesql.cn/ 求助要收费哈哈哈
## 安装php
```json
// 查找最新PHP
brew search php;

// 安装
brew install php@8.1

// 运行php
brew services start php@8.1

// 停止：
brew services start php@8.1

```

php默认会安装composer依赖管理器,需要进入flarum文件中下载依赖

```json
composer install
```

下载太慢就换源镜像
```json
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

当前目录修改源镜像

```json
composer config repo.packagist composer https://mirrors.aliyun.com/composer/
```

## 安装nginx
```json
// 查找最新PHP
brew search nginx;

// 安装
brew install nginx

// 运行nginx
nginx

// 判断配置文件是否正确
nginx -t

// 重载
nginx -s reload

// 停止：
nginx -s stop

```
不知道nginx配置文件在哪里，直接nginx -t就会打印具体位置。

配置nginx.conf
```json
// 配置访问路径
location / {
        root  /Users/xierchen/mycode/flarum/public/;
        index  index.php index.html index.htm;
        try_files $uri $uri/ /index.php?$query_string;
    }

    // 在server里添加php解析，否则就会变成下载php页面
          location ~ \.php$ {
        root           html;
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  /Users/xierchen/mycode/flarum/public/$fastcgi_script_name;
        include        fastcgi_params;
    }
```

## apache安装
mac自带，文件地址：/etc/apache2

需要改动配置文件httpd.conf,里的资源目录地址

```json
DocumentRoot "/Users/xierchen/mycode/flarum/public/"
<Directory "/Users/xierchen/mycode/flarum/public/">
    #
    # Possible values for the Options directive are "None", "All",
    # or any combination of:
    #   Indexes Includes FollowSymLinks SymLinksifOwnerMatch ExecCGI MultiViews
    #
    # Note that "MultiViews" must be named *explicitly* --- "Options All"
    # doesn't give it to you.
    #
    # The Options directive is both complicated and important.  Please see
    # http://httpd.apache.org/docs/2.4/mod/core.html#options
    # for more information.
    #
    Options FollowSymLinks Multiviews
    MultiviewsMatch Any

    #
    # AllowOverride controls what directives may be placed in .htaccess files.
    # It can be "All", "None", or any combination of the keywords:
    #   AllowOverride FileInfo AuthConfig Limit
    #
    AllowOverride All

    #
    # Controls who can get stuff from this server.
    #
    Require all granted
</Directory>
```

```js
1.启动

sudo apachectl -k start

2.重新启动

sudo apachectl -k restart
```

最后4个都要启动，在访问localhost:9999
进行配置
