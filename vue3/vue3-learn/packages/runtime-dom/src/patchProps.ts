import { patchAttr } from './modules/attr'
import { patchClass } from './modules/class'
import { patchEvent } from './modules/event'
import { patchStyle } from './modules/style'

// vue-next-template-explorer
// https://vue-next-template-explorer.netlify.app/#eyJzcmMiOiI8ZGl2IEBjbGljaz1cIm9uY2xpY2tcIj5cblxuPC9kaXY+Iiwib3B0aW9ucyI6eyJvcHRpbWl6ZUltcG9ydHMiOmZhbHNlfX0=

export const patchProps = (el, key, prevVal, nextVal) => {
    // 类名 className
    // 样式  style
    // event
    // 普通属性 

    if(key === 'class'){
        patchClass(el, nextVal)
    }else if(key === 'style'){
        patchStyle(el, prevVal, nextVal)
    }else if(/^on[^a-z]/.test(key)){
        patchEvent(el, key, nextVal)
    }else{
        patchAttr(el, key, nextVal)
    }
}   
