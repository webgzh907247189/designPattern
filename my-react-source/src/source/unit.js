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

    update(nextElement){
        // this._currentElement = nextElement
        // $(`[data-reactid="${this._reactid}"]`).html(nextElement)

        // 优化
        if(this._currentElement !== nextElement){
            this._currentElement = nextElement
            $(`[data-reactid="${this._reactid}"]`).html(nextElement)
        }
    }
}

// native 节点
class NativeUnit extends Unit{
    getMarkUp(reactid){
        this._reactid = reactid;
        const {type, props} = this._currentElement;
        // 初始化绑定
        let tagStart = `<${type} data-reactid=${this._reactid}`
        const tagEnd = `${type}>`
        let childStr = '';
        for(let propName in props){
            if(/^on[A-Z]/.test(propName)){
                // 事件代理
                const eventName = propName.slice(2).toLowerCase();
                $(document).delegate(`[data-reactid="${this._reactid}"]`, `${eventName}.${this._reactid}`, props[propName])
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
                tagStart += ` style="${styleStr}"`;

            }else if(propName === 'className'){
                tagStart += ` class=${props['className']} `
            }else if(propName === 'children'){
                let children = props.children

                // 递归，处理children
                children.forEach((child,index)=>{
                    let childUnit = createUnit(child)
                    let childMarkUp = childUnit.getMarkUp(`${this._reactid}.${index}`)
                    childStr += childMarkUp;
                })

            }else{
                tagStart += ` ${propName}="${props[propName]}" `
            }
        }
        return tagStart + '>' + childStr + '</' +tagEnd
    }
}

// 组件节点
class CompositeUnit extends Unit{
    update(nextElement,partialState){
        //获取到新元素
        this._currentElement = nextElement || this._currentElement;

        // 获取新状态 (不管要不要更新组件 -> shouldComponentUpdate, 组件的状态一定会修改的 ->  this._componentInstance.state)
        // 先变更state
        let nextState = this._componentInstance.state = Object.assign(this._componentInstance.state,partialState)

        // 新的属性
        let nextProps = this._currentElement.props
        if(this._componentInstance.shouldComponentUpdate && !this._componentInstance.shouldComponentUpdate(nextProps,nextState)){
            return;
        }

        // 上次渲染的单元
        let prevRenderUnitInstance = this._renderUnitInstance
        // 上次的element
        let prevRenderElement = prevRenderUnitInstance._currentElement;

        // 本次的element
        let nextRenderElement = this._componentInstance.render()

        // 如果新旧元素一样，可以进行深度比较，否则的话，干掉老的，新建新的元素
        if(shouldDeepCompare(prevRenderElement,nextRenderElement)){
            prevRenderUnitInstance.update(nextRenderElement)
            this._componentInstance.componentDidUpdate && this._componentInstance.componentDidUpdate()
        }else{
            this._renderUnitInstance = createUnit(nextRenderElement)
            let nextMarkUp = this._renderUnitInstance.getMarkUp(this._reactid)
            $(`[data-reactid="${this._reactid}"]`).replaceWith(nextMarkUp)
        }
    }

    getMarkUp(reactid){
        this._reactid = reactid;
        const {type: Component, props} = this._currentElement;

        let componentInstance = this._componentInstance = new Component(props)
        // 组件实列的currentUnit属性等于当前的unit
        componentInstance._currentUnit = this;

        componentInstance.componentWillMount && componentInstance.componentWillMount()
        let renderEle = componentInstance.render()

        let renderUnitInstance = this._renderUnitInstance = createUnit(renderEle)

        // 在最终渲染完成，才执行 componentDidMount
        $(document).on('mounted',()=>{
            componentInstance.componentDidMount && componentInstance.componentDidMount()
        })
        return renderUnitInstance.getMarkUp(this._reactid)
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

    // 传入的是组件
    if(typeof element.type === 'function' && Object.getPrototypeOf(element) === Element.prototype){
        return new CompositeUnit(element)
    }
}

function shouldDeepCompare(oldElement,newElement) {
    if(oldElement !== null && newElement !== null){
        let oldType = typeof oldElement
        let newType = typeof newElement
        if((oldType === 'string' || oldType === 'number') && (newType === 'string' || newType === 'number')){
            return true
        }

        if(Object.getPrototypeOf(newType) === Element.prototype && Object.getPrototypeOf(oldType) === Element.prototype){
            return oldElement.type === oldElement.type
        }
    }
}
export {TextUnit, createUnit}