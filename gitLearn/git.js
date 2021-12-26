// 查看信息
git log -3
git log -i
退出 q



// 删除分支
git branch -D xxx

共同点
都是删除本地分支的方法（与删除远程分支命令相独立，要想本地和远程都删除，必须得运行两个命令）。

git branch -d xxx 会在删除前检查merge状态（其与上游分支或者与head）
git branch -D xxx 是git branch --delete --force的简写，它会直接删除


删除远程分支以及追踪分支：git push origin --delete xxx 



// 最新一次提交的 commit 的 message 进行变更 (针对修改message的情况下)
git commit --amend
开始编辑，写完之后，保存退出



// 修改单个历史 commit 的 message 进行变更
git rebase -i 变更 hashID 的 父亲 hashID
// p, pick = use commit
// # r, reword = use commit, but edit the commit message
// # e, edit = use commit, but stop for amending
// # s, squash = use commit, but meld into previous commit  前面的 commit 都要，但是合并commit
// # f, fixup = like "squash", but discard this commit's log message
// # x, exec = run command (the rest of the line) using shell
// # d, drop = remove commit



// 合并多个连续的 commit message
git rebase -i 变更 hashID 的 父亲 hashID
使用 s, squash = use commit, but meld into previous commit  前面的 commit 都要，但是合并commit



// 暂存区 恢复和 工作区一样
git reset head
git reset head -- xxx/xxx 针对指定文件

// 工作区 恢复和 暂存区 一样
git checkout  xx/xx


// 回退到指定 id 位置
git reset -- hard hashID


// 分支差异
git diff xxx yyy -- i.js
hashid 差异
git diff xxxid yyyid -- i.js


// 删除文件
git rm xxx.js


// 缓存一下任务
git stash
git stash pop 解除缓存


// merge 之后 取消
git merge --abort

git fetch

// 创建分支
// 从 xxx2 创建一个新的分支 xxx1
git checkout -b xxx1 xxx2



// 有人改了文件名，另一个人变更了老文件的内容
git pull 自动合并



// 有人改了文件名，另一个人变更了老文件名字
手动解决冲突






团队合作 一般情况下禁止下面的操作
git push -f origin xxx

公共的分支 禁止 rebase，不能改变历史



工作流




1.团队合作 一般情况下禁止下面的操作
git push -f origin xxx

2. 公共的分支 禁止 rebase，不能改变历史 -> git 会认为你的主分支的历史与其他人的有分歧，会产生冲突。

3. 遇到冲突，在本地 merge 完成在合并上来

4. 需要挑选 commit 过来的   git cherry-pick <commitHash>
如果操作过程中发生代码冲突，Cherry pick 会停下来，让用户决定如何继续操作。
解决代码冲突后，第一步将修改的文件重新加入暂存区
git cherry-pick --continue
--abort发生代码冲突后，放弃合并，回到操作前的样子



1. 保证开发团队的高频沟通，Highlight: 代码有删除必须实时同步，改其他人的代码必须实时同步。
2. 每次Commit提交Follow Commit规范：Feature/[modify/delete/add]: 修改内容 如：316Stardash/delete: 修复前端跳转逻辑（PS：使用英文标点）
3. 建立PR Merge Review机制，在每次上线之前的PR Merge 需要各团队TL做Review，Review完成确认没问题，发送邮件：Yinyin、Stella、Jackie、 shuinfo、微盟、Koson、Jason（sxue@starbucks.cn）
4. 推进自动化测试



const fs = require('fs');
const path = require('path');
const os = require('os');

const staticPath = path.join(__dirname, '/dist/build/mp-weixin');
const writePath = path.join(__dirname, 'size.json');
let size = 0;

// 清空 writePath
fs.writeFileSync(writePath, '');

function getItemInfo(pathName) {
    const list = fs.readdirSync(pathName);

    list.forEach((item) => {
        const itemStat = fs.statSync(`${pathName}/${item}`);

        if (itemStat.isDirectory()) {
            getItemInfo(`${pathName}/${item}`);
        } else if (item.endsWith('.wxss')) {
            size += itemStat.size;
            console.log(size);
            fs.appendFileSync(writePath, `${pathName}/${item}: ${itemStat.size}` + os.EOL);
        }
    });
}
getItemInfo(staticPath);

/**
 * size   
 * 带有 browserslist 934785   主包 1963.2kb
 * 
 * 不带有 browserslist 785701  主包 1912.3kb
 * 
 * (934785 - 785701) / 1024 = 145.58984375 kb
 * 1963.3 - 1912.3 = 51 kb css
 * 
 * 
 *  手动添加 --webkit-- ，在去除 browserslist 不会删除
 * 
 * 5798721
 */


/**
 * runtime size
 * 主包 1955.6kb 总包 5235kb
 * 
 * 不带 runtime size
 * 主包 2056.3kb  总包 5415kb
 * 
 * 总包少 180kb  主包少 100.7 kb
 * 
 * 
 * 
 * 
 * 
 * 
 分支： package-min 
 * 不带 runtime size
 * 主包 2125.1kb  总包 6107kb     总包少 286kb  主包少 136kb 
 * 
 * 
 * 带runtime size
 * 主包 1989.1kb 总包 5821kb
 * 
 * 
 * 加上删除console
 * 主包 1975.4kb 总包 5787kb
 * 
 * 去掉注释
 * 主包 1975.3kb 总包 5787kb
 * 
 * 
 * 总包少 320kb  主包少 150kb
 *
 * 影响面，因为改动涉及打包过程，主要是进行 help 函数合并 & 去掉console.log & 去掉注释
 * 如果单单回归上面这些改动，其实不建议全面回归，耗时太长。
 * 从0到1 跑一下整个流程，从注册 -> 登陆 -> 下单 -> 查看订单
 * 
 * 下单包括 
 * (mod 下单链路, mop 下单链路, moment 下单链路, srk 相关)
 *  
 * 
 * 
 * 
 * 分支： dev
 * 单独加上 esmodule
 * 主包 1961.9kb 总包 6023kb
 * 
 * 不加
 * 主包 2092.1kb 总包 6362kb
 * 总包少 339kb  主包少 130kb
 * 
 * 
 * 如果加上 esmodule & help 函数合并 & 去掉console.log & 去掉注释
 * 主包合计少 659kb，主包少 280kb
 * 
 * 
 * 
 * 
 * 
 * 分支： package-min_03_12
 * 单独加上 esmodule 
 * 主包 2020.9kb 总包 6108kb
 * 
 * 单独加上压缩去除console
 * 主包 2008.4kb 总包 6130kb？？？
 * 
 * 
 * 都加上 没有去掉 console
 * 主包 1944.1kb 总包 5963kb
 * 
 * 
 * 都加上 & 去掉conosle
 * 主包 1931kb 总包 5930kb  -------
 * 
 * 都不加
 * 主包 2160.3kb 总包 6460kb
 * 
 * 
 * 如果加上 esmodule & help 函数合并 & 去掉console.log & 去掉注释
 * 主包合计少 530kb，主包少 229.3kb
 * 
 * 
 * 
 * 带 压缩 带 css 5328 1989.2
 * 不带压缩 带 css 5398 2012.5
 * 去掉 css 不带压缩 5242 1956.9
 * 去掉 css 带压缩 5170 1931.5
 */



/**
 * 登陆 & 注册 & 个人中心 & 首页 & 券 & 心向俱乐部 相关
 * 
 * mop
 * mop支付裂变
 * mop链路 + 开票
 * 
 * mod 下单链路 + 开票
 * 拼单链路 + 开票
 * moment 下单链路 + 开票
 * 
 * srk 相关 
 * 顺带 咖啡名片
 * 日心说
 * 
 * 李梅团队的 礼物
 * 区域 stardash
 * 门店列表 + 门店详情
 * 
 * stardash 相关
 */






改动的文件 添加！！
1.src/customized/components/rixingshuo/wxml-to-canvas/index.vue
2.src/customized/components/rixingshuo/wxml-to-canvas/lib/widget.js
3.src/customized/public/libs/fingerprint/index.js
4.src/customized/public/libs/fingerprint/collection/collection.js
5.src/customized/public/libs/fingerprint/network/network.js


30个warning
src/shares/recipient/utils/mini-auth.dev.js
src/shares/recipient/utils/cnfapi-miniprogram.common.js
src/shares/recipient/utils/vs-logger.weapp.js
src/shares/recipient/utils/crypto-js/enc-base64.js
src/shares/recipient/utils/crypto-js/hmac-sha256.js
src/shares/recipient/utils/js-sha256.js




改动的
rixingshuo
fingerprint

src/shares/recipient/utils/mini-auth.dev.js   taoyang
src/shares/recipient/utils/cnfapi-miniprogram.common.js   taoyang
src/shares/recipient/utils/vs-logger.weapp.js   taoyang
src/shares/recipient/utils/crypto-js/enc-base64.js  taoyang
src/shares/recipient/utils/crypto-js/hmac-sha256.js  taoyang
src/shares/recipient/utils/js-sha256.js  js-sha256.js