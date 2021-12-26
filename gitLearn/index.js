/**
 * 1.团队合作 一般情况下禁止 强制push
 * git push -f origin xxx
 * 
 * 
 * 2. 公共的分支 禁止 rebase，不能改变历史  ->  git 会认为你的主分支的历史与其他人的有分歧，会产生冲突。
 * 
 * 
 * 3. 遇到冲突，在本地开发分支 merge 完成在合并上来， 尽量不要再公共分支 操作 merge
 * 
 * 
 * 4. 需要挑选其他分支的 commit    git cherry-pick <commitHash>
 * 如果操作过程中发生代码冲突，Cherry pick 会停下来，让用户决定如何继续操作。
 * 解决代码冲突后，第一步将修改的文件重新加入暂存区 后面继续执行  git cherry-pick --continue
 * git cherry-pick --abort发生代码冲突后，放弃合并，回到操作前的样子
 * 
 * 
 * 
 * 5. 查看 git 历史操作日志
 * git log -i
 * 退出 q
 * 
 * 
 * 
 * 6. 删除分支 (区分 D 和 d 的区别)
 * git branch -D xxx
 * 
 * git branch -d xxx 会在删除前检查merge状态（其与上游分支或者与head）
 * git branch -D xxx 是git branch --delete --force的简写，它会直接删除
 * 共同点
 * 都是删除本地分支的方法（与删除远程分支命令相独立，要想本地和远程都删除，必须得运行两个命令）。
 * 删除远程分支以及追踪分支：git push origin --delete xxx 
 * 
 * 
 * 
 * 7.针对最新一次提交的 commit 的 message 进行变更 (针对修改message的情况下)
 * git commit --amend
 * 开始编辑，写完之后，保存退出
 * 
 * 
 * 
 * 8. 针对修改单个历史 commit 的 message 进行变更
 * git rebase -i  变更 hashID 的 父亲 hashID
 * 
 * 下面的是 终端命令
 *  # p, pick = use commit
 *  # r, reword = use commit, but edit the commit message
 *  # e, edit = use commit, but stop for amending
 *  # s, squash = use commit, but meld into previous commit  前面的 commit 都要，但是合并commit
 *  # f, fixup = like "squash", but discard this commit's log message
 *  # x, exec = run command (the rest of the line) using shell
 *  # d, drop = remove commit
 * 
 * 
 * 9. 合并多个连续的 commit message
 * git rebase -i 变更 hashID 的 父亲 hashID
 * 使用 s, squash = use commit, but meld into previous commit  前面的 commit 都要，但是合并commit
 * 
 * 
 * 
 * 10. 暂存区 恢复和 工作区一样
 * git reset head
 * git reset head -- xxx/xxx 针对指定文件
 * 
 * 
 * 
 * 11. 工作区 恢复和 暂存区 一样
 * git checkout  xx/xx
 * 
 * 
 * 12. 回退代码到指定 commitId 位置
 * git reset --hard hashID
 * 
 * 
 * 13. 分支差异 (文件差异)
 * git diff xxx yyy // 分支差异
 * git diff xxx yyy -- i.js // 指定文件差异
 * git diff id1 id2 -- i.js // 同一个文件下不同 hashid 区间的 差异
 * 
 * 
 * 
 * 14. 删除文件
 * git rm xxx.js
 * 
 * 
 * 
 * 15. 缓存一下任务
 * git stash
 * git stash pop // 解除缓存
 * 
 * 
 * 
 * 16. merge 
 * git merge branch 
 * git merge --abort //之后 取消
 * 考虑到 有的同学喜欢使用 git rebase，因为merge会导致 多出来一个 commitid 并且 在gui 看着不连贯
 * 
 * 
 * 17.创建分支
 * git checkout -b xxx1 xxx2 // 从 xxx2 创建一个新的分支 xxx1
 * git checkout -b xxx3 // 当前分支创建一个新的分支
 * 
 * 
 * 18. 有人改了文件名，另一个人变更了老文件的内容
 * git pull 自动合并
 * git fetch 将某个远程主机的更新，全部/分支 取回本地
 * 
 * git pull 的过程可以理解为：
 * git fetch origin master //从远程主机的master分支拉取最新内容 
 * git merge FETCH_HEAD    //将拉取下来的最新内容合并到当前所在的分支中
 * 
 * 
 * 20. 有人改了文件名，另一个人变更了老文件名字
 * 手动解决冲突
 * 
 * 
 * 
 * 
 * 
 * 1. 保证开发团队的高频沟通，Highlight: 代码有删除必须实时同步，改其他人的代码必须实时同步。
 * 2. 每次Commit提交Follow Commit规范：Feature/[modify/delete/add]: 修改内容 如：316Stardash/delete: 修复前端跳转逻辑（PS：使用英文标点）
 * 3. 建立PR Merge Review机制，在每次上线之前的PR Merge 需要各团队TL做Review，Review完成确认没问题，发送邮件：Yinyin、Stella、Jackie、 shuinfo、微盟、Koson、Jason（sxue@starbucks.cn）
 */

