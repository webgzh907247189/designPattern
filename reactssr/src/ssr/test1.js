import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class SsrTest1 extends React.Component{

    componentDidMount(){
        console.log(this.props.list,'this.props.list')
        if(this.props.list.length === 0){
            this.props.getData()
        }
    }

    render(){
        console.log(this.props.staticContext,'ssr data')
        return <div>
           <ul>
               {
                   this.props.list.map(item => {
                       return <li key={item.id}>{item.name}</li>
                   })
               }
           </ul>
        </div>
    }
}

let actions = {
    getData(){
        return (dispatch,getState,request)=>{
            return request.get(`/api`).then((result)=>{
                dispatch({
                    type: 'set_home_list',
                    payload: result.data
                })
            })
        }
    }
}
SsrTest1 = connect((state)=>{
    return state.home
},actions)(SsrTest1)


// SsrTest1 = connect((state)=>{
//     return state.home
// },(dispatch)=>{
//     return {
//             getData(){
//                 return axios.get(`http://localhost:4000/`).then((result)=>{
//                     dispatch({
//                         type: 'set_home_list',
//                         payload: result.data
//                     })
//             })
//         }
//     }
// })(SsrTest1)


// 异步加载数据
// dispatch 方法的返回值就是派发的 action {type: 'xx'}
SsrTest1.loadData = function(store){
    return store.dispatch(actions.getData())

    // 返回的是一个函数，后面给了redux-thunk 直接执行当前的这个函数(返回的)
    // (dispatch,getState)=>{
    //     return axios.get(`http://localhost:4000/`).then((result)=>{
    //         dispatch({
    //             type: 'set_home_list',
    //             payload: result.data
    //         })
    //     })
    // }
}

export default SsrTest1