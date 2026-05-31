import { NodeTypes } from './config'

export const compiler = (template) => {
    return parser(template)
}

export const parser = (template) => {
    // 解析一点删除一点，解析的终止条件是 内容最终为空
    // 状态机 有限状态机

    const context = createParseContext(template)
    return parseChilren(context)
}

const parseChilren = (context) => {
    const nodes = []
    while(!isEnd(context)){
        const s = context.source

        let node;
        if(s[0] === '<'){

        }else if(s.startsWith('{{')){

        }

        if(!node){
            // 文本
            parserText(context)
           
        }

        nodes.push(node)

        break;
    }
    return nodes
}
const avavanceBy = (context, endIndex) => {
    const source = context.source

    advancePositionWithMutation(context, source, endIndex)
    context.source = source.slice(0, endIndex)
}

const advancePositionWithMutation = (context, source, endIndex) => {
    let lineCount = 0

    let linePos = -1 // 遇到换行标记换行的 开始位置

    // 根据结束索引
    for (let i = 0; i < endIndex; i++) {
        if(source[i].charCodeAt(0) === 10){
            lineCount++
            linePos = i;
        }
    }

    context.line += lineCount
    context.offset += endIndex
    context.column += linePos == -1 ? context.column + endIndex : endIndex - linePos
}

const parserTextData = (context, endIndex) => {
    const content = context.source.slice(0, endIndex)

    // 删除已经解析的内容
    avavanceBy(context, endIndex)
    return content
}

const parserText = (context) => {
    let endTokens = ['<', '{{']

    let endIndex = context.source.length

    for (let index = 0; index < endTokens.length; index++) {
        const idx = context.source.indexOf(endTokens[index], 1)

        // 这里 idx < endIndex 可以永远取 最小的 idx
        if(idx > -1 && idx < endIndex){
            endIndex = idx
        }
    }

    const content = parserTextData(context, endIndex)
    const {start} = getCursor(context)

    return {
        type: NodeTypes.TEXT,
        content: content,

        loc: {
            start,
        }
    }
}

const getCursor = (context) => {
    let { line, start, offset } = context
    return {
        line, start, offset
    }
}

const createParseContext = (template) => {
    return {
        line: 1,
        column: 1,
        offset: 0, // 偏移量
        source: template, // 可变的，不停的被截取，直到字符串为 空

        originSource: template
    }
}

// 遍历模版的 终止条件，如果为空 说明 遍历完毕
const isEnd = (context) => {
    const source = context.source

    return !source
}

console.log()