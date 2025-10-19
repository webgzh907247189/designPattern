const compiler = require('@vue/compiler-sfc')

const sourceCode = `
    <script>
        console.log('hello world')
    </script>
`

const result = compiler.parse(sourceCode)
console.log(result)

// {
//   descriptor: {
//     filename: 'anonymous.vue',
//     source: "\n    <script>\n        console.log('hello world')\n    </script>\n",
//     template: null,
//     script: {
//       type: 'script',
//       content: "\n        console.log('hello world')\n    ",
//       loc: [Object],
//       attrs: {},
//       map: [Object]
//     },
//     scriptSetup: null,
//     styles: [],
//     customBlocks: [],
//     cssVars: [],
//     slotted: false,
//     shouldForceReload: [Function: shouldForceReload]
//   },
//   errors: []
// }