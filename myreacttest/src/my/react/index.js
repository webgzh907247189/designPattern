function createElement(type, config={}, children){
    let props = Object.create(null)
    for(let item in config){
        props[item] = config[item]
    }

    let childrenlist = Array.from(arguments).slice(2)

    //三个参数，说明 children 就一个，直接赋值
    props.children = childrenlist.length === 1 ? children : childrenlist

    return {
        type,
        props
    }
}

class component{
    // 标示class组件
    static isClassComponent = true
    constructor(props){
        // this 指的是子类
        this.props = props
    }
}

export default {createElement,component}