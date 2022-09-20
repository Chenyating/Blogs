# pm2常用指令

PM2守护程序目前似乎最常见的线上部署软件。

1. 命令行全局安装pm2
```
$ npm install -g pm2 
```

2. 启动一个进程并把它命名为 test
```
pm2 start npm --name test -- start
```

| App name  | id | version | mode | pid   | status | restart | uptime | cpu  | mem       | user | watching |
|---|-|-|-|-|-|-|-|-|-|-|-|
| myweb     | 0  | N/A     | fork | 24435 | online | 430     | 35m    | 0.2% | 37.0 MB   | root | disabled |
| nodeAfter | 1  | N/A     | fork | 24648 | online | 60      | 28m    | 0.1% | 36.2 MB   | root | disabled |

- 启动了一个后台进程：pm2 start npm --name nodeAfter -- start

- 启动了一个前端进程：pm2 start npm --name myweb -- start

以后更新了代码可以直接先把代码拉下来，可以一起停进程，也可以一起运行。

3. 常用的指令：

```cmd
npm install pm2 -g     # 命令行安装 pm2 
pm2 start app.js -i 4 #后台运行pm2，启动4个app.js 
                              # 也可以把'max' 参数传递给 start
                              # 正确的进程数目依赖于Cpu的核心数目
pm2 start app.js --name my-api # 命名进程
pm2 list               # 显示所有进程状态
pm2 monit              # 监视所有进程
pm2 logs               #  显示所有进程日志
pm2 stop all           # 停止所有进程
pm2 restart all        # 重启所有进程
pm2 reload all         # 0秒停机重载进程 (用于 NETWORKED 进程)
pm2 stop 0             # 停止指定的进程
pm2 restart 0          # 重启指定的进程
pm2 startup            # 产生 init 脚本 保持进程活着
pm2 web                # 运行健壮的 computer API endpoint (http://localhost:9615)
pm2 delete 0           # 杀死指定的进程
pm2 delete all         # 杀死全部进程
```