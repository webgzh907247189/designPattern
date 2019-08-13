import React from 'react'
import {Link} from 'react-router-dom'

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
        </div>
    }
}

export default Header