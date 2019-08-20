import React from 'react'
import {Route} from 'react-router-dom'
import routers from '../server/router'
import Header from './ssr/header'
import {renderRoutes,matchRoutes} from 'react-router-config'
import style from './app.css'
import withStyle from './withStyle'

class App extends React.Component{
    render(){
        // console.log(this.props.route.components,'111')
        return <React.Fragment>
                <div className={style.header}>css test</div>

                <Header className={style.font} staticContext={this.props.staticContext}/>
                {/* {
                    routers.map(router => (
                        <Route {...router}/>
                    ))
                } */}

                {
                    renderRoutes(this.props.route.components)
                }
        </React.Fragment>
    }
}


let actions = {
    getUser(){
        return (dispatch,getState,request)=>{
            return request.post(`/api/users`).then((result)=>{
                dispatch({
                    type: 'login',
                    payload: result.data.data
                })
            })
        }
    }
}
App.loadData = function(store){
    return store.dispatch(actions.getUser())
}

export default  withStyle(App,style)