const compiler = require('vue-template-compiler')


const str = `<child>
    <template v-slot:name>{{name}}</template>
</child>`
console.log(compiler.compile(str).render)
// with(this){return _c('child',{scopedSlots:_u([{key:"name",fn:function(){return [_v(_s(name))]},proxy:true}])})}



const str1 = `<child>
  <template slot="name">{{name}}</template>
</child>`
console.log(compiler.compile(str1).render)
// with(this){return _c('child',[_c('template',{slot:"name"},[_v(_s(name))])],2)}


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


// {
//     ast: {
//       type: 1,
//       tag: 'Test',
//       attrsList: [],
//       attrsMap: {},
//       rawAttrsMap: {},
//       parent: undefined,
//       children: [],
//       plain: true,
//       static: false,
//       staticRoot: false
//     },
//     render: "with(this){return _c('Test')}",
//     staticRenderFns: [],
//     errors: [],
//     tips: []
// }