import React from 'react';

class Profile extends React.Component{
    onProfile = () => {
        this.props.settle('1111')
    }

    render(){
        return <>
            <button onClick={this.onProfile}>个人中心Profile</button>
        </>
    }
}

function widthProfile(Com){
    return class extends React.Component{
        settle = (...args) => {
            console.log(...args, '高阶组件的传递函数下去，子组件帮忙执行')
        }

        render(){
            return <Com settle={this.settle}/>
        }
    }
}

export default widthProfile(Profile)