- Git安装:
  - [for windows](https://git-scm.com/download/win)
  - for mac 
    ```
      brew install git, 如果没下载brew, 推荐赶紧去下载一下，好用的一匹
    ```
  ::: tip
    下载完成后，运行git --version，如果输出了对应的git版本号，则下载成功，可正常使用
  :::

- 全球最大同性交友网站新建一个项目练练手: [链接](https://github.com/everyonefitness)

- 进入新建项目页面: [链接](https://github.com/organizations/everyonefitness/repositories/new)

- balabala一顿填写后，会生成项目地址链接: 假设为https://xxx.github.com/XXX

- 本地找个工作目录并运行命令
  ```
    - cd XXX
    - git clone https://xxx.github.com/XXX
  ```
  ::: tip
    拷贝到本地后，默认是master分支
  :::

- 本地修改内容同步到github上的命令
  ```
    - git status // 可以看修改了哪些内容, 对于提交到远程没什么吊用
    - git add . // 注意注意add 后面有个 . !!!!
    - git commit -m "XXX" // 这里备注下文件修改了啥
    - git push origin 分支名 // 这里如果没有执行切分支的话，就是master
  ```
  ::: tip
    基本上一个提交的流程走完了
  :::

- 如果别人也往master分支提交了，怎么办，这时候是push不上去的
  ```
    - git pull origin master // 先把别人push的pull下来
    - git push origin master // 再次push
  ```

- 其他一些用法
  ```
    git show {commit-id} //  查看commit变动
    git checkout {commit-id} 文件 // 回退具体文件到某个commit

    git rebase -i {commit-id} (目标commit的上一个) // 删除某中间的commit 
    drop 某个commit
    git push -f
  ```