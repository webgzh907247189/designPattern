//  npx tsc --init 找当前 node_modules 下面的 bin 里面的 tsc 命令 生成 tsconfig.json

// node esm 模式 __dirname 是不存在的


// 根目录执行
//  把当前目录的  @vue/shared 安装到 @vue/reactivity 这个包下面 (默认是dependencies, -D 是 devDependencies) 
// pnpm install @vue/shared --workspace --filter @vue/reactivity 
// pnpm install @vue/shared -D --workspace --filter @vue/reactivit

// 这样安装的是 公网的 @vue/shared
// pnpm install @vue/shared  --filter @vue/reactivity 






const invokeClearCookie = () => {
    return new Promise((r) => {
        setTimeout(() => {
             r('??')
        }, 1000)
    })
}
const $logout = (ctx) => {
   
    const clear = () => {
        console.log('clear')
    }
    
    const p1 = invokeClearCookie()

    p1.then((res)=> {
        // console.log('add promise')
        return Promise.resolve(res);
    }).then((res)=>{
        console.log('Promise then')
        clear()
    });

    return p1
}

$logout().then((res) => {
    console.log('out - res', res)
    // return res;
}).then((res2) => {
    
    console.log('out - res2', res2)
})