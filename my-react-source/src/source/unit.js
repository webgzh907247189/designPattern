import $ from 'jquery';
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

// native 节点
class NativeUnit extends Unit{
    getMarkUp(reactid){
        this._reactid = reactid;
        const {type, props} = this._currentElement;
        let tagStart = `<${type}`
        const tagEnd = `${type}>`
        let childStr = '';
        for(let propName in props){
            if(/^on[A-Z]/.test(propName)){
                // 事件代理
                const eventName = propName.slice(2).toLowerCase();
                $(document).delegate(`[data-reactid=${this._reactid}]`, `${eventName}.${this._reactid}`, props[propName])
            }else if(propName === 'style'){
                const style = props[propName]

                const styleStr = Object.keys(style).reduce((result,item)=>{
                    const key  = item.replace(/[A-Z]/g,function(s1,s2,s3) {
                        // backgroundColor -> C 10 backgroundColor
                        return `-${s1.toLowerCase()}`
                    })
                    result += `${key}: ${style[item]};`
                    return result
                }, '')
                tagStart += `style="${styleStr}"`;

            }else if(propName === 'className'){
                tagStart += ` class=${props['className']} `
            }else if(propName === 'children'){

            }else{
                tagStart += ` ${propName}="${props[propName]}" `
            }
        }
        return tagStart + '>' + childStr + '</' +tagEnd
    }
}

function createUnit(element) {
    if(typeof element === 'string' || typeof element === 'number'){
        return new TextUnit(element)
    }

    // React.createElement传入的第一个参数是dom，不是组件 避免出现 React.createElement(Com1,{})
    // if(element.type === 'string' && element instanceof Element){
    if(typeof element.type === 'string' && Object.getPrototypeOf(element) === Element.prototype){
        return new NativeUnit(element)
    }
}
export {TextUnit, createUnit}