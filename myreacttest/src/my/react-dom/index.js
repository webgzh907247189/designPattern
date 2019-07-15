function render(eleObj,container){
    if(typeof eleObj === 'number' || typeof eleObj === 'string'){
        
        // 文本节点  ->  先创建，在插入。。。文本节点
        return container.appendChild(document.createTextNode(eleObj))
    }

    let {type,props} = eleObj
    // 函数组件执行，传入 props
    if(typeof type === 'function'){
        let ele 
        if(type.isClassComponent){
            let instance = new type(props)

            // 为了在 子类的render 中可以正常访问 this.props,因为可能在 子类的 constructor的 super(),没有传入props
            // 此处是挂载props，防止 render 报错
            instance.props = props

            ele = instance.render()
        }else{
            ele = type(props)
        }
        // console.log(ele,'ele')
        return render(ele,container)
    }

    let ele = document.createElement(type)

    if(!Array.isArray(props.children)){
        props.children = [props.children]
    }

    // 深度优先
    for(let key in props){

        // react 内部使用事件委托 事件合成
        if(/on[A-Z][a-z]+/.test(key)){
            ele.addEventListener(key.toLocaleLowerCase().slice(2),props[key])
        }else if(key === 'dangerouslySetInnerHTML'){
            let valueHtml = props[key].__html
            ele.innerHTML = valueHtml
        }else if(key === 'className'){
            ele.setAttribute('class',props[key])
        }else if(key === 'children'){
            props.children.forEach(element => {
                render(element,ele)
            });
            container.appendChild(ele)
        }else if(key === 'style'){
            let styleObj = props[key]
            let styleResult = Object.keys(styleObj).reduce((result,item)=>{
                let newItem = item.replace(/[A-Z]/,function(str,strIndex){
                    return `-${str.toLocaleLowerCase()}`
                })
                result += `${newItem}: ${styleObj[item]};`
                return result
            },'')

            // ele.setAttribute(key,styleResult)
            ele.style.cssText = styleResult
        }else{
            ele.setAttribute(key,props[key])
        }
    }
}

export default {render}