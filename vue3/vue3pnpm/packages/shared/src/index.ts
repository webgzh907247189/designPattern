export const isObject = (value) => {
    return typeof value === 'object' && value !== null
}

export const isString = (value) => {
    return typeof value === 'string'
}

export const isNumber = (value) => {
    return typeof value === 'number'
}

export const isFunction = (value) => {
    return typeof value === 'function'
}

export const isArray = Array.isArray

export const assign = Object.assign;

export const enum ShapeFlags {
    ELEMENT = 1,
    FUNCTIONAL_COMPONENT = 2,
    STATEFUL_COMPONENT = 4,
    TEXT_CHILDREN = 8,
    ARRAY_CHILDREN = 16,
    SLOTS_CHILDREN = 32,
    TELEPORT = 64,
    SUSPENSE = 128,
    COMPONENT_SHOULD_KEEP_ALIVE = 256,
    COMPONENT_KEPT_ALIVE = 512,
    COMPONENT =  ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT // 6
    // | 位运算， 有1个是1 就可以是 1
    // 0010 1*2*1 = 2
    // 0100 1*2*2 = 4
    // 0110 1*2*2 + 1*2*1 = 6

    // & 与运算， 两个都是1 才是 1
    // 0010 1*2*1 = 2
    // 0100 1*2*2 = 4
    // 0000 0
}