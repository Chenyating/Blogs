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