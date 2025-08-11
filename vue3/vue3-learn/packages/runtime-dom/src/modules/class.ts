export const patchClass = (el, nextVal) => {
    if(nextVal === null){
        el.removeAttribute('class') // 移除 class 名字
    }else{
        // 新值直接覆盖
        el.className = nextVal
    }
}