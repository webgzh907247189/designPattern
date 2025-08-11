export const isObject = (val) => {
    return typeof val === 'object' && val !== null
}

export const isFunction = (val) => {
    return typeof val === 'function'
}