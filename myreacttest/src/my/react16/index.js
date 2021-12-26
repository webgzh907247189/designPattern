import { ElEMENT_TEXT } from './constant';

function createElement(type,config,...children){
    // delete config.__self
    // delete config.__source

    // 删除操作 ？？？？
    Reflect.deleteProperty(config, '__self')
    Reflect.deleteProperty(config, '__source')

    return {
        type,
        props: {
            ...config,

            // 兼容处理 -> 文本类型 返回一个元素对象
            children: children.map((item) => {
                return typeof item === 'object' ? item : {
                    type: ElEMENT_TEXT,
                    props: { text: item, children: [] }
                }
            })
        }
    }
}

const React = {
    createElement
}

export default React