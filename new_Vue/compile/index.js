import { generate } from './generate';
import { parseHtml } from './parse';


// ????? this.dep 和 dep的关系
// ????? dep 记住 watcher，为了方便当 属性变了，对watchers 循环执行每个wacther的update， 但是 watcher 记住dep 的 原因是？

export function compileToFunction(template){
    const ast = parseHtml(template)
    // console.log(ast, 'ast')

    // vue2 有 内部标记静态节点

    const code = generate(ast)

    const render = `with(this){
        return ${code};
    }`

    // console.log(render, 'render')
    // eval 不干净的传参数， new Function 可以传参数，有新的作用域

    return new Function(render)
}