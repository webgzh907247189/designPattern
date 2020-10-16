import React from 'react';
// import React from './my/react';
import ReactDOM from 'react-dom';
// import Demo from './reactDemo'
import Middlerare from './middlerare';

import ReduxHooks from './redux-hooks';
import HoosUseState from './hoosUseState'
import RouterApp from './router';
import ReduxActionsDemo from "./reduxActionsDemo";
import ReduxHooksDemoContainer from "./reduxHooksDemo";

// /** hooks 测试 */
// import Hooks from './hooks'
// Hooks()
// /** hooks 测试 */

// // import React from './my/react';
// // import ReactDOM from './my/react-dom';


// // 使用babel 把jsx转为 React.createElement的语法
// // React.createElement => 返回vdom
// // {
// //     type: 'xxx',
// //     props: {
// //         className: 'xxx',
// //         children: ['hello',{type: 'zz',props: []}]
// //     }
// // }
// // render方法 渲染到容器里面

// // 设置dangerouslySetInnerHTML 必须子节点为空， 否则报错

// // 遍历数组尽量不要使用 数组的index作为索引
// /**
//  * <li key="0">test1</li>
//  * <li key="1">test2</li>
//  * <li key="2">test3</li>
//  * 
//  * 反转数组
//  * <li key="0">test3</li>
//  * <li key="1">test2</li>
//  * <li key="2">test1</li>
//  * 使用 index 为下标  ->  做两次修改
//  * 
//  * ～～～～～～～～～～～～～～～～～～～～～
//  * 
//  * <li key="test1">test1</li>
//  * <li key="test2">test2</li>
//  * <li key="test3">test3</li>
//  * 
//  * 反转数组 
//  * <li key="test3">test3</li>
//  * <li key="test2">test2</li>
//  * <li key="test1">test1</li>
//  * 移动vdom节点， 不需要重新创建新的节点
//  */

// let msg = ' test1<span>html测试</span>'
// let ele1 = <h1 className="xxx">
//     hello <span dangerouslySetInnerHTML={{__html: msg}}></span>
//     <label htmlFor="name"> htmlFor</label>
//     <input type="text" id="name"/>
// </h1>


// function Clock(props){
//     console.log(props,'function props')
//     return <div>{new Date().toLocaleDateString()}</div>
// }

// class Clock1 extends React.Component{
//     constructor(props){
//         // props 可以不传，render正常访问 this.props
//         // 但是在constructor访问 this.props 是没有值的
//         super()
//         console.log(this.props) // undefined
//         this.state = {num: 1}
//     }

//     handleClick = () => {
//         // 异步的 setState
//         this.setState({num: this.state.num+1})
//         // console.log(this.state.num)

//         // 同步更新
//         setTimeout(()=>{
//             this.setState({num: this.state.num+1})
//             console.log(this.state.num,'setTimeout')
//         },0)

//         // 同步更新
//         Promise.resolve().then(()=>{
//             this.setState({num: this.state.num+1})
//             console.log(this.state.num,'setTimeout')
//         })


//         // 下面的setState -> 具有呼吸依赖
//         // this.setState(prevState => ({num: this.state.num+1}))
//         // this.setState(prevState => ({num: this.state.num+1}))

//         // 意义同上， 回掉形式
//         // this.setState({num: this.state.num+1},()=>{
//         //     this.setState({num: this.state.num+1})
//         // })
//     }

//     render(){
//         return <div>class test -> {this.props.value}</div>
//     }
// }

// function handleClick() {
//     console.log('handleClick')
// }
// let ele2 = React.createElement('h1',{
//         className: 'yyy',
//         id: 'yyy',
//         onClick: handleClick,
//         style: {color: 'red',fontSize: '16px'},
//     },
//     'hello',
//     React.createElement('div',{value: '2'},
//         React.createElement('span',{
//                 dangerouslySetInnerHTML: {__html: msg}
//             },' test2'
//         ),
//         React.createElement(Clock,{value: '1'}
//         ),
//         React.createElement(Clock1,{value: '1'}
//         )
//     )
// )


// // babel 使用哪个plugin完成jsx到js的转化 ？？？ transform-react-jsx？
// // 卡住了，给个回车？？？编译
// // replace 的 arguments[1] ???
// // class A{
// // 	a(){
// // 		console.log(this)
// // 	}
// // }
// // var ss = new A()
// // var f = ss.a
// // f()   undefined? ??????
// // vue的批量更新也是这个？
// // Object.freeze,Object.seal ???
// // deffer sync ??
// // 写代码 空间复杂度 时间复杂度

// // vue express koa react(router react)  复习
// //https://github.com/jackiewillen/build-your-own-flux/blob/master/README.md

// // redux入门到精通  四期react reactssr react源码 react  监控 react hooks
// // node express koa(delegate)  presite nodestream
// // vue vuex 手写 vue高手课程  nginx+docker co


// // 可带领团队，可辅助团队 技术调研 & 技术深入 & 了解编译原理 & react 原理(包括setState) & jwt
// // 普通组件有push 路由重新看，push？location.state？？？withRouter
// // e.preventDefault  returnValue = false

{/* <Demo></Demo> */  }
// // ele2

// let ele = React.createElement('div',{
//         id: 'yyy',
//         className: 'xxx',
//         style: {color: 'red',fontSize: '20px'},
//     },'hello',
//     React.createElement('button',{id: 'test'},'我是按钮')
// )
// console.log(ele);
{/* <HoosUseState></HoosUseState> */}
// ReactDOM.render(<RouterApp></RouterApp>, document.getElementById('root'));
ReactDOM.render(<ReduxHooksDemoContainer></ReduxHooksDemoContainer>, document.getElementById('root'));
// class TestReact extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {number: 0}
//     }

//     componentWillMount(){
//         console.log('componentWillMount')
//     }

//     componentDidMount(){
//         console.log('componentDidMount')
//         // setInterval(()=>{
//         //     this.setState({
//         //         number: this.state.number + 1
//         //     })
//         // },1000)
//     }

//     handleClick = () => {
//         console.log('sss')
//         this.setState({
//             number: this.state.number + 1
//         })
//     }

//     shouldComponentUpdate(){
//         return true
//     }

//     componentDidUpdate(){
//         console.log('componentDidUpdate')
//     }

//     render(){
//         return this.state.number

//         React.createElement('div',
//             {id: 'counter'},
//             React.createElement('p',{style: {color: 'red'}},this.state.number,this.props.name),
//             React.createElement('button',{
//                 onClick: handleClick,
//             },'+')
//         )
//     }
// }
// function handleBtnClick(){
//     console.log('btn click')
// }
// // let ele = React.createElement('div',{
// //         id: 'yyy',
// //         onClick: handleClick,
// //         className: 'xxx',
// //         style: {color: 'red',fontSize: '20px'},
// //     },'hello',
// //     React.createElement('button',{onClick: handleBtnClick},'我是按钮'),
// //     React.createElement(TestReact,{name: '计数器'})
// // )
// // React.render(ele, document.getElementById('root'));





// // 静态属性也可以继承 ->  继承在构造函数上面
// class A{
//     static staticParame = true
// }

// class B extends A{
//     constructor(){
//         super()
//     }
// }

// let b = new B
// console.log(B.staticParame) //true 







// // react里面，避免在componentDidMount() 写同步代码，因为会 重新render 一次
// // 同步代码写在 constructor，不应该写在 componentWillMount()里面 ,会被废弃


// useCallBack 生成的需要加入进依赖， useState生成的不需要加入依赖 ？？
// useMemo 包装
// 什么时候用useState ，useReducer

// bonnieclyde
// 577100351

// 浏览器加载页面会把代码放到栈内存中执行，函数进栈执行会产生一个私有的上下文（EC），此上下文能保存里面的私有变量（也就是AO）不会被外界干扰，并且如果当前上下文中的某些内容，被上下文以外的内容所占用，当前上下文是不会出栈释放的，形成不销毁的执行上下文，这样可以保存和保护里面的变量和变量值，闭包是一种保存和保护内部私有变量的机制.
