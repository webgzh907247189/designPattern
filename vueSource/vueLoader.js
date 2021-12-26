const VueLoader = require('vue-loader')
const compiler = require('vue-template-compiler')

const code = `
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>
`
// console.log(VueLoader(code))

console.log(compiler.compile(code))