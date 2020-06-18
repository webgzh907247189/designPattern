// 存放更新的状态
let isBatching = {
    isBatchingUpdate: false, // 默认不是批量更新
    dirtyComponents: [], // 存放批量更新的组件
    batchUpdate(){ // 批量更新的方法
        this.dirtyComponents.forEach(component => {
            component.updateComponent() //组件依次更新
        });
    }
}

class Updater{
    // 互相指向  ->  每个组件都有一个更新器，每个更新器都存放一个组件
    constructor(component){ 
        this.component = component
        this.peddingStates = []
    }

    addState(newState){
        this.peddingStates.push(newState)

        // 如果是批量更新 ，组件存到批量更新里面，如果不是，直接更新组件状态(updateComponent)
        if(isBatching.isBatchingUpdate){
            // isBatching.dirtyComponents.push(this.component)

            // 优化 isBatching.dirtyComponents 的存贮 components ，已经存在的话，不需要在次放入里面
            if(isBatching.dirtyComponents.indexOf(this.component) == -1){
                isBatching.dirtyComponents.push(this.component)
            }
        }else{
            this.component.updateComponent()
        }
    }
}

// 每个组件都有一个更新器
class Component{
    constructor(){
        this.$updater = new Updater(this)
    }
    createDomFromStr(){
        let str = this.render()
        let div = document.createElement('div')
        div.innerHTML = str
        // console.log(div.firstElementChild) // 返回第一个dom元素
        this.ele = div.firstElementChild

        // 为了在e.target上面找到这个组件
        this.ele.component = this
        return this.ele
    }
    // 设置状态，更新view
    setState(partial){
        // this.state = {...this.state,...partial}
        // let oldEle = this.ele
        // let newEle = this.createDomFromStr()
        // // console.log(newEle,'newEle')
        // // 替换dom节点
        // oldEle.parentElement.replaceChild(newEle,oldEle)

        this.$updater.addState(partial)
        // console.log(this.$updater.peddingStates)
    }
    updateComponent(){
        // 更新处理
        this.$updater.peddingStates.forEach((newState)=>{
            this.state = {...this.state,...newState}
        })
        
        // 清空peddingStates，上一次状态已经完成转变
        this.$updater.peddingStates.length = 0; 
        
        let oldEle = this.ele
        let newEle = this.createDomFromStr()
        // console.log(newEle,'newEle')
        // 替换dom节点
        oldEle.parentElement.replaceChild(newEle,oldEle)
    }
    mounted(container){
        container.appendChild(this.createDomFromStr())
    }
}


class Button extends Component{
    constructor(props){
        super(props)
        this.props = props
        this.state = {num: 0,name: 'state test'}
    }
    handleClick(){
        // 如果需要批量更新，会把需要更新的组件缓存起来，组件状态也缓存起来
        // 如果不需要批量更新，直接更新对于的组件
        this.setState({num: this.state.num + 1})
        console.log(this.state.num)
        this.setState({num: this.state.num + 1})
        console.log(this.state.num)

        // 非批量更新
        // Promise.resolve().then(()=>{
        //     this.setState({num: this.state.num + 1})
        //     this.setState({num: this.state.num + 1})
        // })

        setTimeout(()=>{
            this.setState({num: this.state.num + 1})
            console.log(this.state.num)
            this.setState({num: this.state.num + 1})
            console.log(this.state.num)
        },3000)

    }
    render(){
        // 把字符串转为dom，添加事件
        // let ele = this.createDomFromStr(` <button>${this.props.name} -> <span>${this.state.num}</span></button>`)
        // ele.addEventListener('click',this.handleClick.bind(this))

        return `<button onclick="fn(event,'handleClick')">${this.props.name} -> <span>${this.state.num}</span></button>`

    }
}

// react事物
class Transaction{
    constructor(wrappers){
        this.wrappers = wrappers
    }

    perform(anyFunc){
        this.wrappers.forEach((wrapper)=>{
            wrapper.initailize()
        })

        anyFunc()

        this.wrappers.forEach((wrapper)=>{
            wrapper.close()
        })
    }
}

function fn(e,eventName){
    // 找到点击哪个组件的 this，通过 e.target.component
    // console.log(e.target.component)

    // 函数调用之前开启批量更新，调用完成之后关闭批量更新
    let transaction = new Transaction([
        {
            initailize(){
                isBatching.isBatchingUpdate = true
            },
            close(){
                isBatching.isBatchingUpdate = false
            }
        },
        {
            initailize(){
                console.log('initailize 测试')
            },
            close(){
                console.log('Transaction 测试')
            }
        }
    ])
    
    transaction.perform(e.target.component[eventName].bind(e.target.component))

    // 使用 Transaction 优化组件调用
    // isBatching.isBatchingUpdate = true
    // e.target.component[eventName].call(e.target.component)
    // isBatching.isBatchingUpdate = false

    // 更新组件
    isBatching.batchUpdate()
}