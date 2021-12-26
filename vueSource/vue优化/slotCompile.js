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

// 旧的写法是将插槽内容作为 children 渲染的，会在父组件的渲染函数中创建，
// 插槽内容的依赖会被父组件收集（name 的 dep 收集到父组件的渲染 watcher），
// 而新的写法将插槽内容放在了 scopedSlots 中，会在子组件的渲染函数中调用，
// 插槽内容的依赖会被子组件收集（name 的 dep 收集到子组件的渲染 watcher），
// 最终导致的结果就是：当我们修改 name 这个属性时，旧的写法是调用父组件的更新（调用父组件的渲染 watcher），然后在父组件更新过程中调用子组件更新（prePatch => updateChildComponent），
// 而新的写法则是直接调用子组件的更新（调用子组件的渲染 watcher）。

// 这样一来，旧的写法在更新时就多了一个父组件更新的过程，而新的写法由于直接更新子组件，就会更加高效，性能更好，所以推荐始终使用v-slot:slotName语法

