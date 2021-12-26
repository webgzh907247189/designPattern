// vue3 给 template 外面加了一个跟元素
function createASTElement(tag, attrs){
    return {
        tag,
        type: 1,
        children: [],
        attrs,
        parent: null,
    }
}



var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');

var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var startTagClose = /^\s*(\/?)>/;


export function parseHtml(html){
    let root = null;
    let currentParent;
    let stack = [];

    function start(tagName,attrs){
        let element = createASTElement(tagName, attrs)
        if(!root){
            root = element
        }
        currentParent = element
        stack.push(element)
    }

    function end(tagName){
        let element = stack.pop();
        currentParent = stack[stack.length - 1];

        if(currentParent){
            element.parent = currentParent
            currentParent.children.push(element)
        }
    }

    function chars(text){
        // 替换空格
        text = text.replace(/\s/g, '')
        if(text){
            currentParent.children.push({
                type: 3,
                text
            })
        }
    }

    function advance(n){
        html = html.substring(n)
    }

    function parseStartTag(){
        const start = html.match(startTagOpen)

        if(start){
            // console.log(start)
            let match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length) // 截取 html

            let end, attr;
            // 不是开头标签 结尾标签，就一直解析
            while( !(end = html.match(startTagClose)) && (attr = html.match(attribute)) ){
                advance(attr[0].length)
                match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] || true})
            }

            if(end){
                advance(end[0].length)
                return match
            }
        }

    }

    while(html){
        let textEnd = html.indexOf('<')
        if(textEnd === 0){
            let startTagMatch = parseStartTag()
            // console.log(startTagMatch, 'startTagMatch', html)

            // 不是开始就是结束
            if(startTagMatch){
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue
            }

            // 结束标签
            let endTagMatch = html.match(endTag)
            if(endTagMatch){
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
                continue
            }
        }

        let text
        if(textEnd > 0){
            text = html.substring(0, textEnd)
        }

        if(text){
            advance(text.length)
            chars(text)
        }
    }

    return root
}