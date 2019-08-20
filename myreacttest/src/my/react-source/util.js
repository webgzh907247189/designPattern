import {Element,createElement} from './element'
import $ from 'jquery'

class Unit{
    constructor(element){
        this._currentElement = element
    }

    getmarkUp(){
        throw new Error('基类不能直接new 调用')
    }
}

class TextUnit extends Unit{
    // reactId 为了表示节点，按照先序遍历
    getmarkUp(reactId){
        this._reactId = reactId
        return `<span data-reactid=${this._reactId}>${this._currentElement}</span>`
    }
}

class NativeUnit extends Unit{
    getmarkUp(reactId){
        this._reactId = reactId
        let {type,props} = this._currentElement
        let tagStringList = [`<`,`</`]
        let tagStart = `${tagStringList[0]}${type} data-reactid=${this._reactId}`
        let childString = ''
        let tagEnd =  `${tagStringList[1]}${type}>`

        for(let propName in props){
            // 事件
            if(/^on[A-Z]/.test(propName)){
                let eventName = propName.slice(2).toLocaleLowerCase()
                // 事件源(谁发出)  事件名.命名空间  处理函数
                $(document).delegate(`[data-reactid='${this._reactId}']`,`${eventName}.${this._reactId}`,props[propName])
            }else if(propName === 'style'){
                let styleObj = props[propName]
                let style = Object.keys(styleObj).reduce((result,item)=>{
                    let itemStr = item.replace(/[A-Z]/,function(targetStr,idx,source){
                        // targetStr, idx,                 source
                        // 找到的元素,  对应的找到的元素的下标， 源(item)
                        return `-${targetStr.toLocaleLowerCase()}`
                    })

                    result += `${itemStr}: ${styleObj[item]};`
                    return result
                },'style="')
                tagStart += ` ${style}"`

            }else if(propName === 'children'){
                let children = props[propName]
                children.forEach((element,index) => {
                    childString += createUnit(element).getmarkUp(`${this._reactId}.${index}`)
                })

            }else if(propName === 'className'){
                tagStart += ` class=${props[propName]} `
            }else{
                // 加个空格 属性重叠
                tagStart += ` ${propName}=${props[propName]} `
            }
        }
        return tagStart + '>' + childString + tagEnd
    }
}

class CompositeUnit extends Unit{
    getmarkUp(reactId){
        this._reactId = reactId
        let {type,props} = this._currentElement
        let instance = new type(props)
        let ele = instance.render()
        return createUnit(ele).getmarkUp(this._reactId)
    }
}

function createUnit(element){
    if(typeof element === 'string' || typeof element === 'number'){
        return new TextUnit(element)
    }

    if(typeof element.type === 'string' && Element.prototype.isPrototypeOf(element)){
        return new NativeUnit(element)
    }

    if(typeof element.type === 'function' && Element.prototype.isPrototypeOf(element)){
        return new CompositeUnit(element)
    }
}

export default createUnit

/**
 * 在ts中
 * 子类继承了父类，父类存在 abstruct 方法，子类必须实现这个方法
 */