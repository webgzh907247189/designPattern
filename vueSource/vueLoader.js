const VueLoader = require('vue-loader')
const compiler = require('vue-template-compiler')


{
  /* <div class="example">{{ msg }}</div> */ } {
  /* <slot name="footer" a="1"></slot> */ } {
  /* <template  #title="{ name, department_id: id }"> */ }

// const code = `
// <div>
//   <slot name="footer" a="1">
//     <div class="text-info">
//       123123
//     </div>
//   </slot>
// </div>
// `

const code = `
<div>
  <template  #title="{ name, department_id: id }">
      <div class="text-info">
        123123
      </div>
  </template>
</div>
`
// console.log(VueLoader(code))

console.log(compiler.compile(code))

// with(this) {
//   return _c('div', [_t("footer", [_c('div', {
//     staticClass: "text-info"
//   }, '')], {
//     "a": "1"
//   })], 2)
// }