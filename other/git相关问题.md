# git相关问题

## pull和fetch的区别

git pull=git fetch + git merge;

### git fetch
使用gitfetch更新代码，本地的库中master的commitID不变，假设为1；

但远程origin/master的commitID为2；

若merge时出现冲突，解决后就生成新的版本 本地代码版本commitID就变成3；

总结一下：
- fetch是从远程获取最新版本到本地，不会自动merge；
- fetch能获得远程新的分支；

### git pull
使用git pull更新代码，本地库的master的commitID都变成2；

总结一下：
- git pull 会将本地库更新致最新状态；
- git pull 不会获得远程新的分支；

## gitflow工作流

- 项目首先存在2个长期分支：主分支master，和开发分支develop；
- 主分支：存放对外发布的版本，稳定版本；
- 开发分支：日常开发，存放最新的开发版本；
- 项目存在3种短期分支：功能分支（feature branch）、补丁分支（hotfix branch）、预发分支（release branch）；
- 开发完成，短期分支就会合并进develop或master。然后就被删除；
