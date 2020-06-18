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

    update(nextElement){
        if(this._currentElement !== nextElement){
            this._currentElement = nextElement
            $(`[data-reactid='${this._reactId}']`).html(nextElement)
        }
    }
}

class NativeUnit extends Unit{
    update(nextElement){
        let oldProps = this._currentElement.props
        let newProps = nextElement.props
        this.updateDOMProperties(oldProps,newProps)
        this.updateDOMChildren(nextElement.props.children)
    }

    updateDOMChildren(nextChildrenElement){
        this.diff(diffQueue,nextChildrenElement)
    }

    diff(diffQueue,nextChildrenElement){
        let oldChilddrenMap = this.getOldChildrenMap(this._renderChildrenUnits)
        let newChildren = this.getNewChildren(oldChilddrenMap,nextChildrenElement)
    }

    getOldChildrenMap(childrenUnits = []){
        let map = {}
        for(let i=0; i<childrenUnits.length; i++){
            let unit = childrenUnits[i]
            let key =  unit._currentElement.props && unit._currentElement.props.key || i.toString()
            map[key] = unit
        }
        return map
    }

    getNewChildren(oldChilddrenMap,nextChildrenElements){
        let newChildren = []
        nextChildrenElements.forEach((newElement,i)=>{
            let newKey = (newElement.props && newElement.props.key) || i.toString()
            let oldUnit = oldChilddrenMap(newKey)
            let oldElement = oldUnit && oldUnit._currentElement

            if(shouldDeepCompare(oldElement,newElement)){

            }
        })
    }

    updateDOMProperties(oldProps,newProps){
        for(let propName in oldProps){
            if(!newProps.hasOwnProperty(propName)){
                $(`[data-reactid='${this._reactId}']`).removeAttr(propName)
            }
            if(/^on[A-Z]/.test(propName)){
                $(document).undelegate(`.${this._reactId}`)
            }
        }

        for(let propName in newProps){
            if(propName === 'children'){
                continue
            }else if(/^on[A-Z]/.test(propName)){
                let eventName = propName.slice(2).toLocaleLowerCase()
                // 事件源(谁发出)  事件名.命名空间  处理函数
                $(document).delegate(`[data-reactid='${this._reactId}']`,`${eventName}.${this._reactId}`,newProps[propName])
            }else if(propName === 'style'){
                let styleObj = newProps[propName]
                let style = Object.keys(styleObj).reduce((result,item)=>{
                    let itemStr = item.replace(/[A-Z]/,function(targetStr,idx,source){
                        // targetStr, idx,                 source
                        // 找到的元素,  对应的找到的元素的下标， 源(item)
                        return `-${targetStr.toLocaleLowerCase()}`
                    })

                    result += `${itemStr}: ${styleObj[item]};`
                    return result
                },'style="')
                $(`[data-reactid='${this._reactId}']`).prop(propName,`${style}"`)
            }else if(propName === 'className'){
                $(`[data-reactid='${this._reactId}']`).attr('class',newProps[propName])
            }else{
                $(`[data-reactid='${this._reactId}']`).prop(propName,newProps[propName])
            }
        }
    }

    getmarkUp(reactId){
        this._reactId = reactId
        let {type,props} = this._currentElement
        let tagStringList = [`<`,`</`]
        let tagStart = `${tagStringList[0]}${type} data-reactid=${this._reactId}`
        let childString = ''
        let tagEnd =  `${tagStringList[1]}${type}>`
        this._renderChildrenUnits = []

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
                    let childUnti = createUnit(element)
                    this._renderChildrenUnits.push(childUnti)

                    childString += childUnti.getmarkUp(`${this._reactId}.${index}`)
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
    update(nextElement,partialState){
        // 新元素
        this._currentElement = nextElement || this._currentElement
        
        // 获取新的状态,不管要不要更新组件，组件的state一定会更新
        let nextState = this._componentInstance.state = Object.assign(this._componentInstance.state,partialState)

        // 新的属性
        let nextProps = this._currentElement.props

        let shouldComponentUpdate = this._componentInstance.shouldComponentUpdate
        if(shouldComponentUpdate && !shouldComponentUpdate(nextProps,nextState)){
            return
        }

        let preRenderUnitInstance = this._renderUnitInstance
        // 上次渲染的vdom 元素
        let preCurrentElement = preRenderUnitInstance._currentElement

        //新的render 返回值
        let nextCurrentElement = this._componentInstance.render()

        // 新旧两个元素的类型是不是一样(如果类型一样，进行深度比较，否则直接删除，重新生成)
        if(shouldDeepCompare(preCurrentElement,nextCurrentElement)){
            preRenderUnitInstance.update(nextCurrentElement)
            this._componentInstance.componentDidUpdate && this._componentInstance.componentDidUpdate()
        }else{
            // 重写老的_renderUnitInstance()
            this._renderUnitInstance = createUnit(nextCurrentElement)
            let nextMarkup = this._renderUnitInstance.getmarkUp(this._reactId)
            $(`[data-reactid='${this._reactId}']`).replaceWith(nextMarkup)
        }
    }

    getmarkUp(reactId){
        this._reactId = reactId
        let {type: Component,props} = this._currentElement
        let instance = this._componentInstance = new Component(props)
        instance._currentUtil = this

        instance.componentWillMount && instance.componentWillMount()
        let ele = instance.render()

        // render返回的的 实列
        let renderUnitInstance = this._renderUnitInstance = createUnit(ele)
        let markUp = renderUnitInstance.getmarkUp(this._reactId)

        $(document).on('mounted',()=>{
            instance.componentDidMount && instance.componentDidMount()
        })
        return markUp
    }
}

// 判断属性
function shouldDeepCompare(preCurrentElement,nextCurrentElement){
    if(preCurrentElement !== null && nextCurrentElement !==null){
        let oldType = typeof preCurrentElement
        let newType = typeof nextCurrentElement

        if((oldType =='string' || oldType =='number') && (newType =='string' || newType =='number')){
            return true
        }

        if(Element.prototype.isPrototypeOf(preCurrentElement) && Element.prototype.isPrototypeOf(nextCurrentElement)){
            return nextCurrentElement.type === preCurrentElement.type
        }
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