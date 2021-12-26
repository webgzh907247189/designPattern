const compiler = require('vue-template-compiler')


const str = `<div v-for="item in ['1','2']" v-if="a > 1">
    {{item}}
</div>`
console.log(compiler.compile(str).render)



//1. v-if  v-for -> renderlist的 问题， Symbol 类型无法被循环
//2. frezz  更新 ()， vue 有nextTick， react 有fiber， batchUpdate

//3. provide inject 完成数据跨多层级 传递，vuex4 也使用了 provider



// _l((['1','2']),function(item){return _c('div',[_v("\\n    "+_s(item)+"\\n")]

// {
//     ast: {
//       type: 1,
//       tag: 'div',
//       attrsList: [],
//       attrsMap: {},
//       rawAttrsMap: {},
//       parent: undefined,
//       children: [ [Object] ],
//       plain: true,
//       static: false,
//       staticRoot: false
//     },
//     render: `with(this){return _c('div',_l((['1','2']),function(item){return _c('div',[_v("\\n    "+_s(item)+"\\n")])}),0)}`,
//     staticRenderFns: [],
//     errors: [],
//     tips: []
// }
