# pm2原理

pm2包括 Satan进程、God Deamon守护进程、进程间的远程调用rpc、cluster等几个概念
## 两个概念

santan：santan就是进程的毁灭者，异常进程的退出，杀死进程，毁灭进程等

god：god就是Daemon（守护程序）进程 守护进程，当有异常退出时能保证重启

## RPC
rpc（Remote Procedure Call Protocol）是指远程过程调用，也就是说两台服务器A，B，一个应用部署在A服务器上，想要调用B服务器上应用提供的函数/方法，由于不在一个内存空间，不能直接调用，需要通过网络来表达调用的语义和传达调用的数据。同一机器不同进程间的方法调用也属于rpc的作用范畴。

## 执行流程
1. 启动satan，命令行输入pm2 start app.js
2. 连接Deamon（守护程序）进程；
3. 判断是否能连接上。不能连接则执行god；
4. 能连接上，那么satan与god进行rpc（远程过程调用协议）建立
5. 解析指令
6. 调用Deamon的prepare
在God启动后， 会建立Satan和God的rpc链接，然后调用prepare方法。prepare方法会调用cluster.fork，完成集群的启动

7. 调用cluster.fork启动服务进程
8. satan进程退出

每次命令行的输入都会执行一次satan程序。如果God进程不在运行，首先需要启动God进程。然后根据指令，`satan通过rpc调用God`中对应的方法执行相应的逻辑。
