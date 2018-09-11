const ncname = '[a-zA-Z_][\\w\\-\\.]*';
const qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')'
const startTagOpen = new RegExp('^<' + qnameCapture)
const singleAttrIdentifier = /([^\s"'<>/=]+)/
const startTagClose = /^\s*(\/?)>/
const singleAttrAssign = /(?:=)/
const singleAttrValues = [
  /"([^"]*)"+/.source,
  /'([^']*)'+/.source,
  /([^\s"'=<>`]+)/.source
]

const attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
)



var html = '<div :class="c" class="demo" v-if="isShow"><span v-for="item in sz">{{item}}</span></div>';
let index = 0;

function advance (n) {
    index += n
    html = html.substring(n)
}

/**
 * startTagOpen 正则得到标签的头部，可以得到 tagName（标签名称）
 * startTagClose 与 attribute 两个正则分别用来解析标签结束以及标签内的属性。
 * 这段代码用 while 循环一直到匹配到 startTagClose 为止，解析内部所有的属性。
 */
function parseStartTag () {
    const start = html.match(startTagOpen);  
    if (start) {
        const match = {
            tagName: start[1],
            attrs: [],
            start: index
        }
        advance(start[0].length);

        let end, attr
        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            advance(attr[0].length)
            match.attrs.push({
                name: attr[1],
                value: attr[3]
            });
        }
        if (end) {
            match.unarySlash = end[1];
            advance(end[0].length);
            match.end = index;
            return match
        }
    }
}

parseStartTag()
// {
// 	"tagName":"span",
// 	"attrs":[{"name":"v-for","value":"item in sz"}],
// 	"start":43,
// 	"unarySlash":"",
// 	"end":68
// }





const endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>')
const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/
const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g
const stack = [];
let currentParent, root;


function parseText (text) {
    if (!defaultTagRE.test(text)) return;

    const tokens = [];
    let lastIndex = defaultTagRE.lastIndex = 0
    let match, index
    while ((match = defaultTagRE.exec(text))) {
        index = match.index

        if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)))
        }
        
        const exp = match[1].trim()
        tokens.push(`_s(${exp})`)
        lastIndex = index + match[0].length
    }

    if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return tokens.join('+');
}

function makeAttrsMap (attrs) {
    const map = {}
    for (let i = 0, l = attrs.length; i < l; i++) {
        map[attrs[i].name] = attrs[i].value;
    }
    return map
}

function processIf (el) {
    const exp = getAndRemoveAttr(el, 'v-if');
    if (exp) {
        el.if = exp;
        if (!el.ifConditions) {
            el.ifConditions = [];
        }
        el.ifConditions.push({
            exp: exp,
            block: el
        });
    }
}

function parseEndTag (tagName) {
    let pos;
    for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === tagName.toLowerCase()) {
            break;
        }
    }

    if (pos >= 0) {
        if (pos > 0) {
            currentParent = stack[pos - 1];
        } else {
            currentParent = null;
        }
        stack.length = pos;
    }   
}

function getAndRemoveAttr (el, name) {
    let val
    if ((val = el.attrsMap[name]) != null) {
        const list = el.attrsList
        for (let i = 0, l = list.length; i < l; i++) {
            if (list[i].name === name) {
                list.splice(i, 1)
                break
            }   
        }
    }
    return val
}

function processFor (el) {
    let exp;
    if ((exp = getAndRemoveAttr(el, 'v-for'))) {
        const inMatch = exp.match(forAliasRE);
        el.for = inMatch[2].trim();
        el.alias = inMatch[1].trim();
    }
}

function parseHTML () {
    while(html) {
        let textEnd = html.indexOf('<');
        if (textEnd === 0) {
            const endTagMatch = html.match(endTag)
            if (endTagMatch) {
                advance(endTagMatch[0].length);
                parseEndTag(endTagMatch[1]);
                continue;
            }
            if (html.match(startTagOpen)) {
                const startTagMatch = parseStartTag();
                const element = {
                    type: 1,
                    tag: startTagMatch.tagName,
                    lowerCasedTag: startTagMatch.tagName.toLowerCase(),
                    attrsList: startTagMatch.attrs,
                    attrsMap: makeAttrsMap(startTagMatch.attrs),
                    parent: currentParent,
                    children: []
                }

                processIf(element);
                processFor(element);

                if(!root){
                    root = element
                }

                if(currentParent){
                    currentParent.children.push(element);
                }
        
                stack.push(element);
                currentParent = element;
                continue;
            }
        } else {
            text = html.substring(0, textEnd)
            advance(textEnd)
            let expression;
            if (expression = parseText(text)) {
                currentParent.children.push({
                    type: 2,
                    text,
                    expression
                });
            } else {
                currentParent.children.push({
                    type: 3,
                    text,
                });
            }
            continue;
        }
    }
    return root;
}

parseHTML()

// {
// 	"type":1,
// 	"tag":"span",
// 	"lowerCasedTag":"span",
// 	"attrsList":[],
// 	"attrsMap":{"v-for":"item in sz"},
// 	"children":[{"type":2,"text":"{{item}}","expression":"_s(item)"}],
// 	"for":"sz",
// 	"alias":"item"
// }





/**
 * optimize 主要作用就跟它的名字一样，用作「优化」
 *
 * isStatic  ->   传入一个 node 判断该 node 是否是静态节点。判断的标准是当 type 为 2（表达式节点）则是非静态节点，当 type 为 3（文本节点）的时候则是静态节点，
 * 当然，如果存在 if 或者 for这样的条件的时候（表达式节点），也是非静态节点。
 *
 *
 * markStatic  ->  markStatic 为所有的节点标记上 static，遍历所有节点通过 isStatic 来判断当前节点是否是静态节点，此外，会遍历当前节点的所有子节点，如果子节点是非静态节点，那么当前节点也是非静态节点。
 *
 *
 * 
 */

function isStatic (node) {
    if (node.type === 2) {
        return false
    }
    if (node.type === 3) {
        return true
    }
    return (!node.if && !node.for);
}

function markStatic (node) {
    node.static = isStatic(node);
    if (node.type === 1) {
        for (let i = 0, l = node.children.length; i < l; i++) {
            const child = node.children[i];
            markStatic(child);
            if (!child.static) {
                node.static = false;
            }
        }
    }
}

function markStaticRoots (node) {
    if (node.type === 1) {
        if (node.static && node.children.length && !(
        node.children.length === 1 &&
        node.children[0].type === 3
        )) {
            node.staticRoot = true;
            return;
        } else {
            node.staticRoot = false;
        }
    }
}

function optimize (rootAst) {
    markStatic(rootAst);
    markStaticRoots(rootAst);
}




/**
 * generate 会将 AST 转化成 render funtion 字符串，最终得到 render 的字符串以及 staticRenderFns 字符串。
 *
 *
 * _c 对应的是 createElement 这个函数
 */

//真实的 Vue.js 编译得到的结果
// with(this){
//     return (isShow) ? 
//     _c(
//         'div',
//         {
//             staticClass: "demo",
//             class: c
//         },
//         _l(
//             (sz),
//             function(item){
//                 return _c('span',[_v(_s(item))])
//             }
//         )
//     )
//     : _e()
// }

// render () {
//     return isShow ? (new VNode('div', {
//         'staticClass': 'demo',
//         'class': c
//     }, [ /*这里还有子节点*/ ])) : createEmptyVNode();
// }


function genIf (el) {
    el.ifProcessed = true;
    if (!el.ifConditions.length) {
        return '_e()';
    }
    return `(${el.ifConditions[0].exp})?${genElement(el.ifConditions[0].block)}: _e()`
}

function genFor (el) {
    el.forProcessed = true;

    const exp = el.for;
    const alias = el.alias;
    const iterator1 = el.iterator1 ? `,${el.iterator1}` : '';
    const iterator2 = el.iterator2 ? `,${el.iterator2}` : '';

    return `_l((${exp}),` +
        `function(${alias}${iterator1}${iterator2}){` +
        `return ${genElement(el)}` +
    '})';
}

function genText (el) {
    return `_v(${el.expression})`;
}



function genNode (el) {
    if (el.type === 1) {
        return genElement(el);
    } else {
        return genText(el);
    }
}

function genChildren (el) {
    const children = el.children;

    if (children && children.length > 0) {
        return `${children.map(genNode).join(',')}`;
    }
}

function genElement (el) {
    if (el.if && !el.ifProcessed) {
        return genIf(el);
    } else if (el.for && !el.forProcessed) {
        return genFor(el);
    } else {
        const children = genChildren(el);
        let code;
        code = `_c('${el.tag},'{
            staticClass: ${el.attrsMap && el.attrsMap[':class']},
            class: ${el.attrsMap && el.attrsMap['class']},
        }${
            children ? `,${children}` : ''
        })`
        return code;
    }
}

function generate (rootAst) {
    const code = rootAst ? genElement(rootAst) : '_c("div")'
    return {
        render: `with(this){return ${code}}`,
    }
}