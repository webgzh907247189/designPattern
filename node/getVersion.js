const request = require('request');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const url = 'https://npm.shmiao.net/-/verdaccio/sidebar/@shm/interface';
const package = '@shm/interface';
const packagePath = path.resolve(__dirname, '../package.json');
const version = path.resolve(__dirname, './version.json');
const nodeModulesInterface = path.resolve(__dirname, `../node_modules/@shm/interface/package.json`);

function getSHMInterface(options, cb) {
    options = { ...{ method: 'GET' }, ...options };

    return request(options, cb);
}

/**
 * 强制替换 package.json 的 指定('@shm/interface') 版本
 * 请求公司npm服务器，找到最新的这个包的版本进行 replace操作
 * 替换的同时，在build文件夹下面 pipe生成一个 version.json 进行 线下对比 ‘@shm/interface’ 版本，以防出错
 * 在每次的提交hooks里面执行这个脚本
 *
 * 因为是 replace操作的原因，所以每次commit 都会更新本地的‘@shm/interface’，并且产线依据 package-lock.json 进行打包发布
 * 用请求到到 version 和本地的 node_modules/@shm/interface/package.json 对比一次 version，如果不想等，更新本地，负责不需要更新
 *
 * 总结，无论什么情况下：
 *     都会替换一次 package.json 里面到版本号，判断本地的包版本号是否是最新的。
 *     如果不是，进行 npm update 操作。如果是最新的，不执行 npm update。
 *     本地都是最新的情况下，package-lock.json 应该也是最新的
 *
 * 启用子进程进行update操作，启动子进程之后，无需 kill子进程，默认执行完会 kill子进程
 */
getSHMInterface({ url }, function(error, response, body) {
    const result = JSON.parse(body);
    const { versions, latest: { version = '' } = {} } = result;

    const flag = Reflect.has(versions, version);
    if (flag) {
        const data = fs.readFileSync(packagePath, 'utf8');
        const resultData = JSON.parse(data);
        const itemPackage = `"${package}": "${resultData.dependencies[package]}"`;

        const resultStr = data.replace(itemPackage, (targetStr, idx, source) => {
            return `"${package}": "^${version}"`;
        });

        fs.writeFile(packagePath, resultStr, (err) => {
            if (!err) {
                const historyVersion = fs.readFileSync(nodeModulesInterface);
                const newVersionBuf = Buffer.from(`"version": "${version}"`);
                const isUpdate = historyVersion.indexOf(newVersionBuf);

                if (!~isUpdate) {
                    const str = `npm install ${package}`;
                    const grep = child_process.exec(str, { stdio: 'inherit' }, function(error, stdout, stderr) {
                        // console.log('子进程被kill')
                    });

                    // console.log(grep.pid,'子进程的进程标识')
                    // grep.on('exit', (code, signal) => {
                    //     console.log(`子进程收到信号 ${signal} 而终止`);
                    // });
                }
            }
        });
    } else {
        throw new Error('版本号异常！！！');
    }
}).pipe(fs.createWriteStream(version));
