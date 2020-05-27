import $ from 'jquery';
import {Element} from './element'
import types from './type';

let diffQueue = []; // 差异队列(记住差异，最后同意更新，不是发现差异，就更新)
let updateDepth = 0; //更新的级别(层级)

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
    update(nextElement,partialState){
        // console.log(nextElement, '1111', partialState)
        let oldProps = this._currentElement.props
        let newProps = nextElement.props

        // 对比dom属性，进行diff
        this.updateDOMProperties(oldProps,newProps)

        // 对比children，进行diff （否则 子元素不会更新）
        this.updateDOMChildren(nextElement.props.children)
    }

    // 把新的Children传过来，跟老的Children进行对比，找出差异，进行修改dom
    updateDOMChildren(newChildrenElements){
        // debugger
        // console.log('newChildrenElements', newChildrenElements)

        updateDepth++;
        this.diff(diffQueue,newChildrenElements)
        updateDepth--;

        if(updateDepth == 0){
            this.patch(diffQueue); // 深度遍历完成，开始patch操作
            diffQueue = [];
        }
        // console.log(diffQueue, 'diffQueue', newChildrenElements)
    }

    patch(diffQueue){
        let deleteChildren = [] // 存放所有将要删除的节点
        let deleteMap = {} // 存放可以复用的节点

        // debugger
        for(let i=0; i<diffQueue.length; i++){
            let difference = diffQueue[i];

            if(difference.type == types.REMOVE || difference.type == types.MOVE){
                let fromIndex = difference.fromIndex // 从哪里删掉
                let oldChild = $(difference.parentNode.children().get(fromIndex))

                console.log(oldChild, 'oldChild',difference.parentNode);
                deleteMap[fromIndex] = oldChild
                deleteChildren.push(oldChild);
            }
        }

        console.log(deleteChildren, 'deleteChildren', diffQueue);
        $.each(deleteChildren,(idx,item) => $(item).remove())


        for(let k=0; k<diffQueue.length; k++){
            let differItem = diffQueue[k];

            switch(differItem.type){
                case types.INSERT:
                    this.insertChildAt(differItem.parentNode,$(differItem.markUp),differItem.toIndex)
                    break;
                case types.MOVE:
                    // debugger
                    this.insertChildAt(differItem.parentNode,deleteMap[differItem.fromIndex],differItem.toIndex)
                    break;
                default:
                    break;
            }
        }
    }

    insertChildAt(parentNode,newNode,toIndex){
        let oldChild = parentNode.children().get(toIndex)

        // 原来的节点有的话，前置插入，没有，后置插入
        oldChild ? newNode.insertBefore(oldChild) : newNode.appendTo(parentNode);
    }

    // 对比 dom diff
    // 老节点的map -> key 是 索引，value 是unit类 实列

    diff(diffQueue,newChildrenElements){
        // 生成一个map，key是索引 或者 传入的 key
        let oldChildrenUnitMap = this.oldChildrenUnitMap(this._renderChildrenUnits);

        // 先找老的集合，看有没有能用的，尽量复用老的 -> 构建新的unit数组
        let {newChildren: newChildrenUnits, newChildrenUnitMap} = this.getNewChildren(oldChildrenUnitMap,newChildrenElements);
        // console.log(newChildrenUnits, newChildrenUnitMap, 'zzzzz')

        // 上一个已经确定位置的索引
        let lastIndex = 0

        // console.log(newChildrenUnits, 'newChildrenUnits', newChildrenUnitMap)
        for(let i=0; i<newChildrenUnits.length; i++){
            let newUnit = newChildrenUnits[i]

            // A B C D
            // A C B E F
            // 第一个拿到的newkey = A
            // 第二个newkey = c
            let newKey = (newUnit._currentElement.props && newUnit._currentElement.props.key) || i.toString()
            let oldChilrenUnit = oldChildrenUnitMap[newKey]

            // console.log(oldChilrenUnit === newUnit, 'oldChilrenUnit', newUnit)
            // 新老一致，可复用老节点
            if(oldChilrenUnit === newUnit){
                if(oldChilrenUnit._mountedIndex < lastIndex){
                    diffQueue.push({
                        parentId: this._reactid,
                        parentNode: $(`[data-reactid="${this._reactid}"]`),
                        type: types.MOVE,
                        fromIndex: oldChilrenUnit._mountedIndex,
                        toIndex: i,
                    })
                }
                lastIndex = Math.max(lastIndex,oldChilrenUnit._mountedIndex)
            }else {
                diffQueue.push({
                    parentId: this._reactid,
                    parentNode: $(`[data-reactid="${this._reactid}"]`),
                    type: types.INSERT,
                    toIndex: i,
                    markUp: newUnit.getMarkUp(`${this._reactid}.${i}`)
                })
            }

            newUnit._mountedIndex = i;
        }

        for(let oldKey in oldChildrenUnitMap){
            let oldChild = oldChildrenUnitMap[oldKey]
            if(!Reflect.has(newChildrenUnitMap,oldKey)){
                diffQueue.push({
                    parentId: this._reactid,
                    parentNode: $(`[data-reactid="${this._reactid}"]`),
                    type: types.REMOVE,
                    fromIndex: oldChild._mountedIndex,
                })
            }
        }
        // console.log(diffQueue, 'diffQueuediffQueuediffQueue')
    }

    oldChildrenUnitMap(renderChildrenUnits = []){
        // console.log(renderChildrenUnits)
        let map = {}
        for(let i= 0; i<renderChildrenUnits.length; i++){
            let unit = renderChildrenUnits[i]
            let key = (unit._currentElement && unit._currentElement.props && unit._currentElement.props.key) || i.toString();
            map[key] = unit
        }
        return map
    }

    getNewChildren(oldChildrenUnitMap,newChildrenElements){
        let newChildren = [];
        let newChildrenUnitMap = {};
        // 最终返回的是新的 -> 用newChildrenElements 去构建，尽量复用oldChildrenUnitMap

        // console.log(newChildrenElements, '???newChildrenElements')
        newChildrenElements.forEach((newElement,index)=>{
            let newKey = (newElement && newElement.props && newElement.props.key) || index.toString();
            
            // 老的unit
            let oldUnit = oldChildrenUnitMap[newKey]
            // 老的元素
            let oldElement = oldUnit && oldUnit._currentElement

            // 判断老的element 与 新的 element的type -> 看能不能复用
            if(shouldDeepCompare(oldElement,newElement)){
                // console.log(oldUnit,newElement)
                // 类型一样 -> 更新 
                oldUnit.update(newElement)  // -> 只有老的 oldUnit 才会更新
                // 更新之后， oldUnit 变成新的
                newChildren.push(oldUnit)

                newChildrenUnitMap[newKey] = oldUnit 
            }else{
                // console.log(newElement, 'newElementnewElement')
                let nextUnit = createUnit(newElement)
                newChildren.push(nextUnit)
                newChildrenUnitMap[newKey] = nextUnit
            }

            // console.log(newElement,oldElement)
        })

        return {newChildren, newChildrenUnitMap};
    }

    updateDOMProperties(oldProps,newProps){
        for(let propName in oldProps){
            if(!Reflect.has(newProps,propName)){
                $(`[data-reactid="${this._reactid}"]`).removeAttr(propName)
            }

            // 取消所有事件，下面重新绑定
            if(/^on[A-Z]/.test(propName)){
                $(document).undelegate(`.${this._reactid}`)
            }
        }

        for(let newPropName in newProps){
            if(newPropName === 'children'){
                continue;
            }else if(/^on[A-Z]/.test(newPropName)){
                const eventName = newPropName.slice(2).toLowerCase();
                $(document).delegate(`[data-reactid="${this._reactid}"]`, `${eventName}.${this._reactid}`, newProps[newPropName])
            }else if(newPropName === 'style'){
                const styleObj = newProps[newPropName]
                Object.entries(styleObj).map(([key,value])=>{
                    $(`[data-reactid="${this._reactid}"]`).css(key,value)
                })
            }else if(newPropName === 'className'){
                $(`[data-reactid="${this._reactid}"]`).attr('class',newProps[newPropName])
            }else{
                $(`[data-reactid="${this._reactid}"]`).prop(newPropName,newProps[newPropName])
            }
        }
    }

    getMarkUp(reactid){
        this._reactid = reactid;
        const {type, props} = this._currentElement;
        // 初始化绑定
        let tagStart = `<${type} data-reactid=${this._reactid}`
        const tagEnd = `${type}>`
        let childStr = '';

        // 记录childrenUnits(旧的记录children)
        this._renderChildrenUnits = []
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

                // console.log(children, 'childrenchildrenchildrenchildren')
                // 递归，处理children
                children.forEach((child,index)=>{
                    // 每个 child 都有自己到unit类
                    let childUnit = createUnit(child)

                    // 每个 unit 有个 _mounted 属性 ，指向自己在父节点的索引位置
                    childUnit._mountedIndex = index

                    // 这个地方的unit 为了 domdiff 使用
                    this._renderChildrenUnits.push(childUnit)

                    let childMarkUp = childUnit.getMarkUp(`${this._reactid}.${index}`)
                    childStr += childMarkUp;
                })

            }else{
                tagStart += ` ${propName}="${props[propName]}" `
            }
        }

        // console.log(this._renderChildrenUnits, '_renderChildrenUnits')
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

        // console.log(prevRenderElement, nextRenderElement)

        // 如果新旧元素一样，可以进行深度比较，否则的话，干掉老的，新建新的元素
        if(shouldDeepCompare(prevRenderElement,nextRenderElement)){
            // console.log(nextRenderElement, 'nextRenderElement',prevRenderElement)
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

        // Unit类 和 Component类 互相引用
        // (unit._componentInstance = new Component && new Component._currentUnit = new Unit)
        let componentInstance = this._componentInstance = new Component(props)
        // 组件实列的currentUnit属性等于当前的unit
        componentInstance._currentUnit = this;

        componentInstance.componentWillMount && componentInstance.componentWillMount()
        let renderEle = componentInstance.render()

        let renderUnitInstance = this._renderUnitInstance = createUnit(renderEle)

        // 在最终渲染完成，才执行 componentDidMount
        $(document).on('mounted',() => {
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

        // console.log(oldElement, newElement, '====')
        // if(Object.getPrototypeOf(oldElement) === Element.prototype && Object.getPrototypeOf(newElement) === Element.prototype){
        //     return oldElement.type === oldElement.type
        // }

        if(oldElement instanceof Element && newElement instanceof Element){
            return oldElement.type === oldElement.type
        }
    }
}
export {TextUnit, createUnit}