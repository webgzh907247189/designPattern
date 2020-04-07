import ReactCurrentOwner from './ReactCurrentOwner';
import { REACT_ELEMENT_TYPE } from './shared/ReactSymbols'

function hasValidateRef(config){
    return config.ref !== undefined
}

function hasValidateKey(config){
    return config.key !== undefined
}

const RESERVED_PROPS = {
    key: true,
    source: true,
    __self: true,
    __source: true,
}

export function createElement(type,config,children){
    let propName; // 定义一个变量叫属性名
    let props = {}; // 定义一个元素的props
    let key = null; // 在兄弟节点中唯一标示自己的，在同一个的不同兄弟之间的key要求不同
    let ref = null; // React.createRef 或者是一个字符串ref this.refs.xx  或者 是一个函数 (input => this.name = input) -> ref三种方式
    let self = null; // 获取真实的this指针
    let source = null; // 用来定位在源码的哪一行，那一列


    if(config !== null){
        if(hasValidateRef(config)){
            ref = config.ref
        }

        if(hasValidateKey(config)){
            key = config.key
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source;

        for(propName in config){
            if( !RESERVED_PROPS.hasOwnProperty(propName) ){
                props[propName] = config[propName]
            }
        }
    }

    const childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
        props.children = children
    } else {
        let childrenList = new Array(childrenLength);
        for(let i = 0; i< childrenList.length; i++){
            childrenList[i] = arguments[i + 2];
        }
        props.children = childrenList; // 多个children的话， props.children 就是一个数组
    }

    // defaultProps 属于类的静态属性
    // 默认属性什么时候生效
    // 只有当props没有这个key当时候，才生效，否则 忽略这个defaultProps
    if(type && type.defaultProps){
        const defaultProps = type.defaultProps;
        for(propName in defaultProps){
            if( props[propName] === undefined ){
                props[propName] = defaultProps[propName]
            }
        } 
    }

    // ReactCurrentOwner 此元素当拥有者
    return ReactElement(type,key,ref,self,source,ReactCurrentOwner.current,props)
}

function ReactElement(type,key,ref,self,source,owner,props) {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref,
        props,
        _self: self,
        _source: source,
        _owner: owner,
    }
    return element;
}