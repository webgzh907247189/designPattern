import React from 'react'
import Ctx from './context'
import MyCtx from './myContext'
import './redux'
import ReduxDemo from './reduxDemo'
import TestReactReduxDemo from './reactReduxDemo'
import TestReactReduxMiddlerareDemo from './middlerare'

/**
 * 通过 ref 访问到组件实例
 *
 * ref -> 它只能声明在 Class 类型的组件上，而无法声明在函数（无状态）类型的组件上
 *
 * ref 的值可以是字符串（不推荐使用）也可以是一个回调函数，如果是回调函数的话，它的执行时机是：
 *  1. 组件被挂载后（componentDidMount），回调函数立即执行，回调函数的参数为该组件的实例
 *  2. 组件被卸载（componentDidUnmount）或者原有的 ref 属性本身发生变化的时候，此时回调函数也会立即执行，且回调函数的参数为 null
 *
 */

function ShowList({list}){
     return <h1>{JSON.stringify(list)}</h1>
}

function Test(props,ref){
    return <h1 ref={ref}>函数组件ref测试</h1>
}

function Test1(props,ref){
    return <h1 ref={ref}>函数组件myRef测试</h1>
}



function myCreateRef(){
    let obj = {}
    Reflect.set(obj,'current',null)
    return obj
}

function forwardRef(fnComponent){
    return function(props){
        return fnComponent(props,props.ref1) // 不可以使用ref，因为react有限制，暂时改名 ref1
    }
}
// 转发 ref
Test = React.forwardRef(Test)
Test1 = forwardRef(Test1)



class Comment extends React.PureComponent{
    state = {
        list: []
    }

    handlePush = (desObj) => {

        // 这样写有问题(在 React.PureComponent 里面不会更新，因为其比较 地址 的变化)，因为 this.state.list 的引用没有发生变化，只是里面增加了东西
        // react,redux 更改状态，必须返回一个全新的引用(防止不更新，有不更新的问题)

        // this.state.list.push(desObj)
        // this.setState({
        //     list: this.state.list
        // })

        // 返回全新的 引用地址
        this.setState({
            list: [...this.state.list,desObj]
        })
    }

    // 结构 -> {current: xxx}
    refTest = React.createRef()
    myRefTest = myCreateRef()

    // 转发ref
    fnRefTest = React.createRef()
    fnMyRefTest = React.createRef()

    // submit可以校验数据，一般不写click
    onSubmit = (event) => {
        event.preventDefault ? event.preventDefault() : window.event.returnValue = false

        let userNameValue = this.userName.value
        let telPhoneValue = this.telPhone.value

        console.log(this.userName ,this.telPhone,userNameValue,telPhoneValue,this.refTest,this.myRefTest)
        console.log(this.fnRefTest,this.fnMyRefTest)
    }

    render(){
        return <div>
            <form onSubmit={this.onSubmit}>
                姓名<input ref={input => this.userName = input}/>
                电话<input ref={input => this.telPhone = input}/>
                ref测试<input ref={this.refTest}/>
                my-ref测试<input ref={this.myRefTest}/>
                <button>提交</button>
            </form>
            <Test ref={this.fnRefTest}></Test>
            <Test1 ref1={this.fnMyRefTest}></Test1>
            <FormTest handlePush={this.handlePush}></FormTest>
            <ShowList list={this.state.list}/>
            <div>
                <Ctx/>
                <p>~~~~~~</p>
                <MyCtx/>
            </div>
            <div>
                <button id="redux_add">加</button>
                <button id="redux_mins">减</button>
            </div>
            <ReduxDemo/>
            <TestReactReduxDemo/>
            <TestReactReduxMiddlerareDemo/>
        </div>
    }
}

console.log(React.createRef.toString())
// function createRef() {
//     var refObject = {
//       current: null
//     };
//     {
//       Object.seal(refObject);
//     }
//     return refObject;
// }

export default Comment





class FormTest extends React.PureComponent{
    state = {
        name: '',
        sex: ''
    }
    handleChange(e,stateName){
        // 取值 {[stateName]: 'xxx'})
        // console.log(e.target.value,{[stateName]: '11'})
        this.setState({
            [stateName]: e.target.value
        })
    }

    handleClick(event){
        event.preventDefault ? event.preventDefault() : window.event.returnValue = false
        this.props.handlePush(this.state)
    }
    
    render(){
        return <div>
            <form>
                name:<input value={this.state.name} onChange={(e)=>this.handleChange(e,'name')}/>
                sex:<input value={this.state.sex} onChange={(e)=>this.handleChange(e,'sex')}/>
                <button onClick={(e) => this.handleClick(e)}>提交</button>
            </form>
        </div>
    }
}








/**
 * enumerable 判断是否可以枚举，configurable 判断当前属性是否之后再被更改描述符(可修改值，不可删除)
 * writable 判断是否可以继续赋值，value 判断这个结果的值
 */
{
    var obj = {name: '11'}
    var objFreeze = Object.freeze(obj)
    var objDescription = Object.getOwnPropertyDescriptors(obj)
    var isFrozen = Object.isFrozen(obj)
    console.log(objFreeze === obj,obj,isFrozen,objDescription)
    // true,  {name: '11'}, true, {name: {value: "11", writable: false, enumerable: true, configurable: false}}
}


// Object.seal()方法被用来封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。
// 当前属性的值只要可写就可以改变, 并且返回一个被密封的对象的引用.
// 1. 被封闭对象仍旧全等该对象本身
// 2. 可以通过Object.isSealed来判断当前对象是否被封闭
// 3. 不能为被封闭对象添加任何未知属性, 也不能为其已知属性添加访问者
// 4. 可以修改已知的属性,不可删除属性
{
    var obj = {sex: '11'}
    var objSeal = Object.seal(obj)
    var objDescription = Object.getOwnPropertyDescriptors(obj)
    var isSealed = Object.isSealed(obj)
    console.log(objSeal === obj,obj,isSealed,objDescription)
    // true {sex: "11"} true {value: "11", writable: true, enumerable: true, configurable: false}
}