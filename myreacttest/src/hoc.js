/**
 * 写一个函数，参数是一个组件
 * 高阶组件 -> 解决组件逻辑复用问题 (组件可以作为参数 或者 返回值)
 * 缺点： 可能会使组件复杂  ->  先包内部组件，在包外部组件，渲染的话，先渲染外部组件，在渲染内部组件(与包装顺序相反)
 * 
 * 高阶函数 -> 函数可以作为参数 或者 返回值 (java 不能把函数作为参数传给另一个函数)
 */
import React from 'react'

class Form extends React.Component{
    constructor(){
        super()
        let userName = localStorage.getItem('userName')
        let pwd = localStorage.getItem('pwd')

        if(!(pwd || userName)){
            localStorage.setItem('userName','zhangsan')
            localStorage.setItem('pwd', '123456')
        }
    }

    render(){
        return <>
            <UserName></UserName>
            <Pwd></Pwd>
        </>
    }
}

class UserName extends React.Component{
    render(){
        return <React.Fragment>
            姓名
            <input value={this.props.value}  onChange={this.props.handleChange}/>
        </React.Fragment>
    }
}
UserName = getUserMessage(UserName)
UserName = wrapper(UserName,'userName')


class Pwd extends React.Component{
    render(){
        return <React.Fragment>
            密码
            <input value={this.props.value} onChange={this.props.handleChange}/>
        </React.Fragment>
    }
}
Pwd = getUserMessage(Pwd)
Pwd = wrapper(Pwd,'pwd')


function wrapper(Component,key){
    return class extends React.Component{
        constructor(){
            super()
            this.startTime = new Date
        }
        
        state = {
            value: localStorage.getItem(key)
        }

        handleChange = (event) => {
            let value = event.target.value
            this.setState({
                value
            })

            // 为了加载json，注释
            // localStorage.setItem(key,value)
        }

        componentDidMount(){
            let endTime = new Date()
            console.log(`渲染时间是 -> ${endTime - this.startTime}ms`)
        }

        render(){
            return <Component {...this.state} handleChange={this.handleChange}/>
        }
    }
}

function getUserMessage(Component){
    return class extends React.Component{
        constructor(){
            super()
            this.state = {value: ''}
        }

        componentWillMount(){
            let propsValue = this.props

            fetch(`/json/${propsValue.value}.json`).then((res)=>{
                return res.json()
            }).then((result)=>{
                this.setState({
                    value: result[propsValue.value]
                })
            })
        }

        render(){
            let {handleChange} = this.props

            return <Component {...this.state} handleChange={handleChange}/>
        }
    }
}

export default Form