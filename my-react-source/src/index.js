import React from './source/react';
import ReactDOM from 'react-dom';
import App from './App';


/*****渲染文本节点********/
// React.render('111', document.getElementById('root'));
/*****渲染文本节点********/




/*********渲染dom节点***********/
function btnClick() {
    console.log('btnClick~~~btnClick')
}

// let ele = (
// <button id="btn" style={{color: 'red',backgroundColor: 'yellow'}} className="btn">
//     test
//     <b>
//         test11
//     </b>
// </button>);
const ele = React.createElement('button',{id: 'btn', className: 'btn', style: {color: 'red',backgroundColor: 'yellow'}, onClick: btnClick},'test',React.createElement('b',{},'tets11'));
// React.render(ele, document.getElementById('root'));
/*********渲染dom节点***********/





/*********渲染组件***********/
class Counter extends React.Component{
    constructor(props){
        super(props)
        this.state = {number: 0}
    }

    componentWillMount(){
        console.log('将要挂载')
    }

    componentDidMount(){
        console.log('挂载完成')

        // 测试TextUnit 的更新
        // setInterval(()=>{
        //     this.setState({number: this.state.number + 1})
        // }, 3000)
        // return this.state.number
    }
    
    shouldComponentUpdate(nextprops,nextState){
        return true
    }

    onCrement = () => {
        this.setState({number: this.state.number + 1})
    }

    componentDidUpdate(){
        console.log('～～componentDidUpdate～～')
    }

    render(){
        console.log('render')
        let p = React.createElement('p', {style: {color: 'red',backgroundColor: '#ddd'}}, this.state.number, this.props.name)
        let button = React.createElement('button', {onClick: this.onCrement}, '+')
        return React.createElement('div', {id: 'container',style: {backgroundColor: this.state.number % 2 === 0 ? 'red' : '#000'}}, p, button)
    }
}

//<Counter {name: '计数器'}/>
React.render(React.createElement(Counter, {name: '计数器'}), document.getElementById('root'));
/*********渲染组件***********/