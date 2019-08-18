import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Profile extends React.Component{
    render(){
        return <div>
            {
                this.props.user ? <div style={ {color: 'red'} }>个人中心</div> : <Redirect to="/login"/>
            }
        </div>
    }
}

Profile = connect(state => state.session)(Profile)
export default Profile