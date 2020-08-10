# 阿里云mysql配置

 - 卸载：https://blog.csdn.net/qq_39470733/article/details/80999080
 
 mysql不知道被我卸载多少回了。重装了多少次。

 - 安装：https://www.cnblogs.com/wangshen31/p/9556804.html

 阿里云上装mysql的步骤，一个晚上能重复好多好多遍。忧伤。。。。

 - 远程连接：https://blog.csdn.net/qq_39781497/article/details/81302950

 远程连接阿里云的数据库是有安全组策略，需要自己去手动操作一下。

## 卸载
1. 首先，查看系统是否已经安装了mysql数据库

```yarn
rpm -qa | grep mysql
```

演示如下：
```yarn
# rpm -qa | grep mysql
mysql-community-libs-8.0.16-2.el7.x86_64
mysql-community-common-8.0.16-2.el7.x86_64
mysql-community-client-8.0.16-2.el7.x86_64
mysql80-community-release-el7-3.noarch
mysql-community-server-8.0.16-2.el7.x86_64
```

2. 查询到已安装的MySQL库后，执行以下命令依次卸载

```yarn
yum remove mysql-xxx-xxx
```

若没有查询后，没有安装Mysql库，可直接跳过此步。

3. 删除mysql的配置文件（MySQL卸载不会自动删除配置文件，需自行清理）

首先使用如下命令查找出所用的配置文件

find / -name mysql

然后把找到的文件都删除

rm -rf 文件

rm -rf /var/lib/mysql

## 安装

1. 通过以root用户或具有sudo特权的用户身份使用CentOS软件包管理器来安装MySQL 8.0服务器：

```yarn
$ sudo dnf install @mysql
```

@mysql模块将安装MySQL及其所有依赖项。

2. 启动mysql服务器

```yarn
$ sudo systemctl start mysqld
```

3. 开机自启

```yarn
$ sudo systemctl enable mysqld
```

4. 要检查MySQL服务器是否正在运行，请输入：

```yarn
$ sudo systemctl status mysqld
```

5. 登陆mysql

```yarn 
mysql -uroot -p
```

注意：初始密码为空，直接enter进入就好了。

## 配置

1. 重新设置密码

```yarn
ALTER USER 'root'@'localhost' IDENTIFIED BY '你的密码';
```
2. 授权用户远程登录.

同时在阿里云上面安全组设置3306开放。

```yarn
GRANT ALL ON *.* TO 'root'@'%';
<!-- 刷新权限 -->
flush privileges;
```
