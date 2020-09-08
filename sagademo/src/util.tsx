export const delay = (ms1: number, ms2: number) => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(ms1)
        }, ms1 + ms2)
    })
}

export const readFile = (filename: string, cb: any) => {
    // return new Promise((resolve)=>{
        setTimeout(() => {
            cb(null, filename)
        }, 1000)
    // })
}