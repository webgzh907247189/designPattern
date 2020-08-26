import React from 'react'
import Link from './link'
import Route from './Route'

export default class MenuLink extends React.Component{
    render(){
        // 下面这样写错误到
        // 当 path 和 地址栏路径一样，才会渲染 -> 才会进行渲染(匹配上路径显示，匹配不上不显示) 到最后就显示一个 MenuLink
        // return <Route exact={this.props.exact} path={this.props.to} render={(props) => {
        //     <Link to={this.props.to}>{this.props.children}</Link>
        // }}/>

        // children 不管路径是否匹配，都会渲染返回值
        // render props 只有  path 和 地址栏路径一样，才会渲染 
        // 因为要渲染多个link，所以都需要渲染，可以点击进去

        return <Route exact={this.props.exact} path={this.props.to} children={(props) => {
            <Link className={props.match ? 'activited' : ''} to={this.props.to}>{this.props.children}</Link>
        }}/>
    }
}
/**
 * 一个 a 标签，既有href又有onClick 
 * 浏览器发现下一个目标link和当前链接是一样的，不会在跳转 (上面的情况只会跳转一次)
 */