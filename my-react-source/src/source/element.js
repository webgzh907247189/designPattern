function createElement(type,props = {},...children) {
    props.children = children || [];
    return new Element(type,props)
}

class Element{
    constructor(type,props){
        this.type = type
        this.props = props
    }
}

export {createElement,Element}