// import React from 'react';
// import ReactDOM from 'react-dom';
// import Demo from './reactDemo'

import React from './my/react';
import ReactDOM from './my/react-dom';


// 使用babel 把jsx转为 React.createElement的语法
// React.createElement => 返回vdom
// {
//     type: 'xxx',
//     props: {
//         className: 'xxx',
//         children: ['hello',{type: 'zz',props: []}]
//     }
// }
// render方法 渲染到容器里面

// 设置dangerouslySetInnerHTML 必须子节点为空， 否则报错

// 遍历数组尽量不要使用 数组的index作为索引
/**
 * <li key="0">test1</li>
 * <li key="1">test2</li>
 * <li key="2">test3</li>
 * 
 * 反转数组
 * <li key="0">test3</li>
 * <li key="1">test2</li>
 * <li key="2">test1</li>
 * 使用 index 为下标  ->  做两次修改
 * 
 * ～～～～～～～～～～～～～～～～～～～～～
 * 
 * <li key="test1">test1</li>
 * <li key="test2">test2</li>
 * <li key="test3">test3</li>
 * 
 * 反转数组 
 * <li key="test3">test3</li>
 * <li key="test2">test2</li>
 * <li key="test1">test1</li>
 * 移动vdom节点， 不需要重新创建新的节点
 */

let msg = ' test1<span>html测试</span>'
let ele1 = <h1 className="xxx">
    hello <span dangerouslySetInnerHTML={{__html: msg}}></span>
    <label htmlFor="name"> htmlFor</label>
    <input type="text" id="name"/>
</h1>


function Clock(props){
    console.log(props,'function props')
    return <div>{new Date().toLocaleDateString()}</div>
}

class Clock1 extends React.Component{
    constructor(props){
        // props 可以不传，render正常访问 this.props
        // 但是在constructor访问 this.props 是没有值的
        super()
        console.log(this.props) // undefined
        this.state = {num: 1}
    }

    handleClick = () => {
        // 异步的 setState
        this.setState({num: this.state.num+1})
        // console.log(this.state.num)

        // 同步更新
        setTimeout(()=>{
            this.setState({num: this.state.num+1})
            console.log(this.state.num,'setTimeout')
        },0)

        // 同步更新
        Promise.resolve().then(()=>{
            this.setState({num: this.state.num+1})
            console.log(this.state.num,'setTimeout')
        })


        // 下面的setState -> 具有呼吸依赖
        // this.setState(prevState => ({num: this.state.num+1}))
        // this.setState(prevState => ({num: this.state.num+1}))

        // 意义同上， 回掉形式
        // this.setState({num: this.state.num+1},()=>{
        //     this.setState({num: this.state.num+1})
        // })
    }

    render(){
        return <div>class test -> {this.props.value}</div>
    }
}

function handleClick() {
    console.log('handleClick')
}
let ele2 = React.createElement('h1',{
        className: 'yyy',
        id: 'yyy',
        onClick: handleClick,
        style: {color: 'red',fontSize: '16px'},
    },
    'hello',
    React.createElement('div',{value: '2'},
        React.createElement('span',{
                dangerouslySetInnerHTML: {__html: msg}
            },' test2'
        ),
        React.createElement(Clock,{value: '1'}
        ),
        React.createElement(Clock1,{value: '1'}
        )
    )
)


// babel 使用哪个plugin完成jsx到js的转化 ？？？ transform-react-jsx？
// 卡住了，给个回车？？？编译
// replace 的 arguments[1] ???
// class A{
// 	a(){
// 		console.log(this)
// 	}
// }
// var ss = new A()
// var f = ss.a
// f()   undefined? ??????
// vue的批量更新也是这个？

{/* <Demo></Demo> */}
ReactDOM.render(ele2, document.getElementById('root'));






// 静态属性也可以继承 ->  继承在构造函数上面
class A{
    static staticParame = true
}

class B extends A{
    constructor(){
        super()
    }
}

let b = new B
console.log(B.staticParame) //true 