import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Header extends React.Component{
    jump(){
        console.log(this.props)
    }

    render(){
        return <div style={ {color: 'red'} }>
            <Link to="/test1">
                <div style={{width: '100px',display: 'inline-block'}}>home</div>
            </Link>
            <Link to="/">
                <div style={{width: '100px',display: 'inline-block'}}>counter</div>
            </Link>

            {
                this.props.user && <React.Fragment>
                    <Link to="/profile">
                        <div style={{width: '100px',display: 'inline-block'}}>profile</div>
                    </Link>
                    <Link to="/logout">
                        <div style={{width: '100px',display: 'inline-block'}}>logout</div>
                    </Link>
                </React.Fragment>
            }

            {
                !this.props.user && <Link to="/login">
                    <div style={{width: '100px',display: 'inline-block'}}>login</div>
                </Link>
            }

            {
                this.props.user && <div>{this.props.user.username}</div>
            }
        </div>
    }
}

Header = connect(state => state.session )(Header)
export default Header