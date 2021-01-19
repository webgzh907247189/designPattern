export const getType = (target) => {
    return (data) => {
        return Object.prototype.toString.call(data) === `[object ${target}]`
    }
}

export const isObject = getType('Object')
export const isSysmbol = getType('Sysmbol')
export const isArray = getType('Array')
export const isNumber = getType('Number')

// 是不是一个整数
export const isInterger= (data) => {
    return isNumber(parseInt(data, 10)) && parseInt(data, 10) === data * 1;
}

export const hasOwnKey = (targer, key) => {
    return Object.prototype.hasOwnProperty.call(targer, key);
}

export const hasChanged = (value, oldValue) => {
    return value !== oldValue;
}