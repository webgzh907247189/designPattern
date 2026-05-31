import home from './com/home.vue'

export const aa = () => {
    console.log('1111')
    return '11'
}

/*@__PURE__*/ 
export function bb (){
    return  /*@__PURE__*/ home
}

/*@__PURE__*/ 
export  function cc  () {
    return  /*@__PURE__*/  import('./com/home2.vue')
}

export const dd = () => {
    console.log('gzhtest')
}