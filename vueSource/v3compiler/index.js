const compiler = require('@vue/compiler-dom');

// function render(template, lang = "CN") {
//     const ast = compiler.baseParse(template)
//     const transform = (rootNode) => {
//         if (rootNode.type === 2) {
//             rootNode.content = getWords(rootNode.content)
//         }
//     }
//     const prefixIdentifiers = true

//     const [nodeTransforms, directiveTransforms] = compiler.getBaseTransformPreset(
//         prefixIdentifiers
//     )
//     compiler.transform(ast, {
//         prefixIdentifiers,
//         nodeTransforms: [
//             ...nodeTransforms,
//             // myTransfrom
//         ],
//     })

//     const render = compiler.generate(ast)

//     return render.code
// }
// #title="{ name, department_id: id, [numberKey]: count }"
const code = `
        <div>
            <template  #title="{ name, department_id: id }">
                <div class="text-info">
                   123123
                </div>
            </template>
        </div>
`

console.log(render(code))