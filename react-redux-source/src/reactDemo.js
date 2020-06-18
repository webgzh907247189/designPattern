import React from 'react';
import Comment from './ref'
import Hoc from './hoc'

// 改写shouldComponentUpdate方法，数据发送变化才去render，否则不会重新渲染 (浅比较，比较第一层，比较引用地址)
// class Demo extends React.PureComponent{
    
class Demo extends React.Component{
    state = {
        num: 1,
        hasError: false
    }

    componentWillMount(){ // 后续react可能会废弃此方法  可能会中断渲染，可能会执行多次
        console.log('componentWillMount')
    }

    handleCick = () => {
        console.log('handleCick')

        // setState ->  默认只要调用，就会更新 view，所以要在 shouldComponentUpdate 优化
        // 调用 setState 会重新redner，子组件也会重新渲染，所以子组件也要加上 React.PureComponent
        this.setState({
            num: this.state.num + 1
        },function(){
            console.log('setState之后，我更新了～～')
        })

        // 强制更新 ->  调用此方法，会重新render 一次
        // this.forceUpdate()
    }

    render(){
        console.log('render')
        return <div>state -> {this.state.num}
            <button onClick = {this.handleCick}>点击增加</button>
            {this.state.num%2 == 0 ? <Test {...this.state}></Test> : null }
            {this.state.hasError ? <div>Test1组件出错了，使用componentDidCatch捕获</div> : <Test1/>}
            <Comment/>
            <div style={{border: '1px solid red'}}>
                <div>hoc</div>
                <Hoc/>
            </div>
        </div>
    }

    componentDidMount(){
        console.log('componentDidMount')
    }

    shouldComponentUpdate(nextprops,nextState){
        // 性能优化判断
        console.log('shouldComponentUpdate',nextprops,nextState)
        return true
    }

    componentWillUpdate(){
        console.log('componentWillUpdate')
    }

    componentDidUpdate(){
        console.log('componentDidUpdate')
    }

    // 捕获错误
    componentDidCatch(){
        console.log('componentDidCatch')
        this.setState({hasError: true})
    }

    // 捕获错误 同上 (捕获子组件的错误)
    // static getDerivedStateFromError(){
    //     return {hasError: true}
    // }
}



class Test extends React.Component{
    state = {
        age: '18'
    }

    // 新的生命周期，此方法 必须是 静态方法，初始化会调用，props，state变化也会调用，不能与componentWillReceiveProps，componentWillMount componentWillUpdate一起使用
    // 必须有返回值
    static getDerivedStateFromProps(){
        console.log('child--getDerivedStateFromProps')
        return {stateFromProps: 'test'}
    }

    // componentWillReceiveProps(newProps){
    //     console.log('child--componentWillReceiveProps',newProps)
    // }
    // componentWillMount(){
    //     console.log('child--componentWillMount')
    // }
    // componentWillUpdate(){
    //     console.log('child--componentWillUpdate')
    // }

    click = () =>{
        this.setState({age: this.state.age})
    }
    render(){
        console.log('child--render',this.props)
        return <div onClick={this.click}>test 组件 -> {this.props.num}
            <span>来自getDerivedStateFromProps的返回状态值 -> {this.state.stateFromProps}</span>
        </div>
    }
    componentDidMount(){
        console.log('child--componentDidMount')
    }

    // 获取更新前的快照，必须和componentDidUpdate一起使用，因为其返回值传给componentDidUpdate。
    getSnapshotBeforeUpdate(){
        console.log('child--getSnapshotBeforeUpdate')
        return 100
    }
    componentDidUpdate(oldProps,oldState,snapshotResult){
        console.log('child--componentDidUpdate',oldProps,oldState,snapshotResult)
    }

    componentWillUnmount(){
        // 卸载组件 -> 取消定时器，取消事件绑定
        console.log('child--componentWillUnmount')
    }
}


// 相当于函数组件的PureComponent
Test1 = React.memo(Test1)
function Test1(){
    console.log('child--Test1 hooks')
    // throw new Error('出错了')
    return <div>momo demo</div>
}

export default Demo