## 常用
### git log
- git log --grep=${关键字} // 根据关键字过滤log信息
:::tip
这个需要开发人员commit信息比较规范

如：开发了任务单167，commit信息为 feat: taskID 167完成

   修改了线上bug， fix: hotfixID 178

   eg: git log --grep=taskID 167 // 可过滤出任务id167的所有提交
:::

### git cherry-pick
- git cherry-pick {commit hash值} // 适用场景：分支A和分支B，分支A需要分支B的某一个commit提交的代码
```bash
a - b - c - d master
      \
        e - f - g feature
```
- git cherry-pick f
```bash
a - b - c - d - f master // f被添加
      \
        e - f - g feature
```
- git cherry-pick f g // 多个
- git cherry-pick e..g // f g, 不包括e
- git cherry-pick e^..g // e f g, 包括e


### git merge
- 观察commit记录，会交叉混合，你可以想象一种场景：左右手各持一副牌，洗牌的场景，每张牌就是每条commit
![git-merge](~@images/tools/git-merge.jpg)

### 暂时抛弃某个commit
- git rebase -i ${commitID} // 发布当晚因为不可抗力需要把某个commit暂时去掉
  - git log
  - 找到合入master的feature/dev_1的前一个commitID
  - git rebase -i ${第二步的commitID}
  ![git-reabse](~@images/tools/git-rebase.jpg)
  - 终端会进入一个修改页面，把feature/dev_1对应commit前面的pick改成drop, 类似vim保存推出
  ![git-rebase-edit](~@images/tools/git-rebase-edit.jpg)

### 彻底删除某个commit
- git revert ${commitID}

// 如果需要把某个已经合入的分支A全部回退，需要找到merge产生的commitID
![git-revert](~@images/tools/git-revert.png)
```md
error: commit 9960d11f3c7088b963a1593a120ecc4b6d70ae10 is a merge but no -m option was given.
fatal: revert failed

根据错误提示，需要添加-m(mainline)参数, 意思是保留哪一个，一般是1，维持原主线；
git revert -m 1 ${commitID} 
```
- 如果又需要把分支A再次合入，执行merge A是无法合入的，需要revert上一次revert产生的commit

git revert ${revertCommitID}

## git subtree
- 某些模块（commonComp）需要被项目A和项目B或者更多项目公用, 开发过程中npm管理的方式会导致发包太频繁；可以在项目A和项目B中将commonComp以subtree的方式管理
```javascript
- cd A
- git remote add ${commonComp的remote名} ${仓库地址}
- git subtree add/pull/push --prefix=commonComp ${remote名} ${分支} --squash
// 项目A中对commonComp进行改动，git subtree push
// 项目B中需要用到A对于commonComp的改动，git subtree pull
随着项目的开发，git subtree push会过滤越来越多的commit，可以用下面的命令，在最新的commit打一个标记（下次过滤的新起点）
git subtree split --rejoin --prefix=commonComp --branch ${tagName}
```
