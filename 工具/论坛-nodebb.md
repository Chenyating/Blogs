# MAC安装nodebb教程

## 前置条件：
先下载好：nodejs环境，下载mongodb，下载好nodebb。

## node下载
- 本人的node版本是：v14.17.3
- 安装地址：https://nodejs.org/zh-cn/download/

## mongodb
前置条件：安装homebrew；

homebrew是一款包管理工具，目前支持macOS和linux系统。


- 官方网站：mongodb:https://www.mongodb.com/
- 社区版本：https://www.mongodb.com/try/download/community，选择对应的版本
- 教程：https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/

安照官方教程一步一步来，一步都不能漏掉，报xcode有问题，就去安装对应版本的 Xcode command-line；
  
```js
brew install mongodb-community@6.0
```

运行命令：
```js
brew services start mongodb-community@6.0
```

停止命令：
```js
brew services stop mongodb-community@6.0
```
默认端口号：27017
### homebrew 安装方式
```js
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

// 太慢就安装镜像：
/usr/bin/ruby -e "$(curl -fsSL https://cdn.jsdelivr.net/gh/ineo6/homebrew-install/install)"
```


```js
// 查询：
brew search 软件名

// 安装：
brew install 软件名

// 卸载：
brew uninstall 软件名

// 更新 Homebrew：
brew update 

// 查看 Homebrew 配置信息：
brew config 

```

替换源
```js
# 查看 brew.git 当前源
$ cd "$(brew --repo)" && git remote -v
origin    https://github.com/Homebrew/brew.git (fetch)
origin    https://github.com/Homebrew/brew.git (push)

# 查看 homebrew-core.git 当前源
$ cd "$(brew --repo homebrew/core)" && git remote -v
origin    https://github.com/Homebrew/homebrew-core.git (fetch)
origin    https://github.com/Homebrew/homebrew-core.git (push)

# 修改 brew.git 为阿里源
$ git -C "$(brew --repo)" remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git

# 修改 homebrew-core.git 为阿里源
$ git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git

# zsh 替换 brew bintray 镜像
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.zshrc
$ source ~/.zshrc

# bash 替换 brew bintray 镜像
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.bash_profile
$ source ~/.bash_profile

# 刷新源
$ brew update
```



## monggodb可视化工具
地址：https://www.mongodb.com/try/download/tools

## nodebb运行
```js
./nodebb setup
// 一路回车

```
./nodebb start 启动http://localhost:4567/

./nodebb stop 停止启动