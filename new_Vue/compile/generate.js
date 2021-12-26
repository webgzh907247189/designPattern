var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

function genProps(attrs){
    const str = attrs.reduce((result, item) => {
        if(item.name === 'style'){
            const styleObj = item.value.split(';').reduce((styleResult, styleItem) => {
                if (styleItem) {
                    const [styleItemKey, styleItemVal] = styleItem.split(':');
                    styleResult[styleItemKey.replace(/\s/g, '')] = styleItemVal.replace(/\s/g, '')
                }
                return styleResult;
            }, Object.create(null));
            result += `${item.name}: ${JSON.stringify(styleObj)},`
        } else {
            result += `${item.name}: ${JSON.stringify(item.value)},`
        }
        return result;
    }, '').slice(0, -1)
    return `{${str}}`;
}


// 区分是元素 还是文本
function gen(child){
    // 标签逻辑
    if (child.type === 1) {
        return generate(child)
    }

    // 文本逻辑
    if(child.type === 3){
        let text = child.text
        // console.log(text, 'text')
        if(defaultTagRE.test(text)){
            // debugger
            // 带有 {{}}
            // _s  toString, _v  createTextVNode

            let tokens = [];
            let match;
            let idx = 0;
            let lastIdx = defaultTagRE.lastIndex = 0; // 0 初始化是 0
            while(match = defaultTagRE.exec(text)){
                // index 属性声明的是匹配文本的第一个字符的位置
                // lastIndex 属性声明的是正则 匹配到的一次字符的位置
                idx = match.index


                // 从下表索引为0的开始， 到第一次开始匹配到的位置，这段为字符串
                // if(idx){
                //     tokens.push(JSON.stringify(text.slice(lastIdx, idx)))
                // }


                // defaultTagRE.lastIndex 匹配到的位置索引
                if(idx > lastIdx){
                    tokens.push(JSON.stringify(text.slice(lastIdx, idx)))
                }


                tokens.push(`_s(${match[1].trim()})`)
                lastIdx = idx + match[0].length;
            }

            // 匹配结束，把剩下的都放入 tokens 里面
            if(lastIdx < text.length){
                tokens.push(JSON.stringify(text.slice(lastIdx,text.length)))
            }
            return `_v(${tokens.join('+')})`
        } else {
            return `_v(${JSON.stringify(text)})`
        }
    }
}


function genChildren(el){
    let children = el.children;

    return children.map((child) => {
        return gen(child)
    }).join(',')
}

export function generate(el){
    let children = genChildren(el);
    let code = `_c('${el.tag}',${el.attrs.length ? genProps(el.attrs) : 'undefined' }${ children ? ',' + children : '' })`
    return code;
}