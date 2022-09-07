# mac安装工具
前提：安装好homebrew

## mongodb
```json
brew install mongodb-community@6.0
```

运行命令：
```json
brew services start mongodb-community@6.0
```

停止命令：
```json
brew services stop mongodb-community@6.0
```

## mysql
brew search mysql

brew install mysql@5.7

配置环境变量，如下图红框1

echo 'export PATH="/opt/homebrew/opt/mysql@5.7/bin:$PATH"' >> ~/.zshrc

使配置生效
source ~/.zshrc

启动 mysql 服务

mysql.server start
mysql.server stop

## nginx
安装：brew install nginx
启动nginx：brew services start nginx 或 sudo nginx
停止nginx：brew services stop nginx
重启nginx：brew services restart nginx
查看nginx配置文件：sudo nginx -t

## php
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