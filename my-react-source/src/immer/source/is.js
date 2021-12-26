export const getType = (type) => {
    return (data) => {
       return Object.prototype.toString.call(data) === `[object ${type}]`
    }
}

export const isArray = getType('Array')
export const isFunction = getType('Function')
export const isObject = getType('Object')

// 这样写，每次运行 isArray 都需要再次 重复运行一次 getType 第一层函数
// export const isArray = (data) => {
//     return getType('Array')(data)
// }
