export const isObject = (val) => {
    return typeof val === 'object' && val !== null
}

export const isFunction = (val) => {
    return typeof val === 'function'
}

export const isString = (val) => {
    return typeof val === 'string'
}

export * from './shapeFlags'