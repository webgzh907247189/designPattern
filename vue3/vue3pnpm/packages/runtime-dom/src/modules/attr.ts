export const patchAttr = (el, key, nextVal) => { 
     if(nextVal){
        el.setAttribute(key, nextVal)
     }else{
        el.removeAttribute(key)
     }
}