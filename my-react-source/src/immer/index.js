// https://segmentfault.com/a/1190000013088373
// https://www.jianshu.com/p/1a38f449b5cf
import React from 'react';
import { produce } from 'immer';
// import './test'

class ImmerApp extends React.Component {
    state = {
        obj1: {
            name: 'test1'
        },
        obj2: {
            name: 'test2'
        }
    }

    onClick = () => {
        // this.setState((state)=>{
        //     return {
        //         obj1: {name: '123123'}
        //     }
        // })

        let state = produce(this.state,draftState => {
            draftState.obj1.name = '???'
        })
        console.log(state, 'state',this.state.obj2 === state.obj2)
        this.setState(state)
    }

    render(){
        console.log(this.state)
        return <div>
            <div onClick={this.onClick}>点击</div>
            <Test1 test1={this.state.obj1}/>
            <Test2 test2={this.state.obj2}/>
        </div>
    }
}

export default ImmerApp;


class Test1 extends React.Component {
    render(){
        console.log('Test1---render')
        return <div>
            {this.props.test1.name}
        </div>
    }
}

class Test2 extends React.Component {
    shouldComponentUpdate(nextprops,nextState){
        console.log(nextprops, this.props, nextprops === this.props)
        console.log(nextState,this.state)
        return true
    }
    render(){
        console.log('Test2---render')
        return <div>
            {this.props.test2.name}
        </div>
    }
}




/**
 * 集合immer,reducer可以怎样写
 * 两种不同的写法，依赖 produce 的科里化
 */
const reducer = (state, action) => produce(state, draft => {
    switch (action.type) {
      case 'ADD_AGE':
        draft.members[0].age++;
    }
})
  
const reducer1 = produce((draft,action) => {
    switch (action.type) {
      case 'ADD_AGE':
        draft.members[0].age++;
    }
})
