console.log(process.env.npm_execpath);

process.exit(1)



/**
 * https://github.com/vuejs/vue-next/blob/master/scripts/preinstall.js
 * 通过此处可以判断执行的是 npm 还是 pnpm
 * 
 * 
 * process.exit(1)  exit 非0 的数字 都是错误
 */