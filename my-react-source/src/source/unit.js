import {Element} from './element'
// 基类
class Unit{
    constructor(element){
        this._currentElement = element;
    }

    getMarkUp(){
        throw new Error('父类不可直接new')
    }
}

// 文本节点
class TextUnit extends Unit{
    getMarkUp(reactid){
        this._reactid = reactid;
        return `<span data-reactid=${reactid}>${this._currentElement}</span>`
    }
}

class NativeUnit extends Unit{
    getMarkUp(reactid){
        this._reactid = reactid;
        const {type, props} = this._currentElement;
        const tagStart = `<${type}`
        const tagEnd = `${type}>`
        let childStr = '';
        for(let propName in props){
            if(/^on[A_Z]/.test(propName)){
                
            }else if(propName === 'style'){

            }else if(propName === 'className'){
                tagStart += `class=${props['className']}`
            }else if(propName === 'children'){

            }else{
                tagStart += `${propName}=${props[propName]} `
            }
        }

        return tagStart + '>' + childStr + tagEnd
    }
}

function createUnit(element) {
    if(typeof element === 'string' || typeof element === 'number'){
        return new TextUnit(element)
    }

    // React.createElement传入的第一个参数是dom，不是组件
    // if(element.type === 'string' && element instanceof Element){
    if(element.type === 'string' && Object.getPrototypeOf(element) === Element.prototype){
        return new NativeUnit(element)
    }
}
export {TextUnit, createUnit}