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
    FUNCTIONAL_COMPONENT = 2, // 1 << 1
    STATEFUL_COMPONENT = 4, // 1 << 2
    TEXT_CHILDREN = 8, // 1 << 3        // 儿子是文本
    ARRAY_CHILDREN = 16, // 1 << 4      // 儿子是数组 
    SLOTS_CHILDREN = 32, // 1 << 5
    TELEPORT = 64, // 1 << 6
    SUSPENSE = 128, // 1 << 7
    COMPONENT_SHOULD_KEEP_ALIVE = 256, // 1 << 8
    COMPONENT_KEPT_ALIVE = 512, // // 1 << 9
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


// 6 & 1
// 0110 * 0001 -> 0000
// 运算结果 > 0 , 说明包含后面的 值 
console.log(ShapeFlags.COMPONENT & ShapeFlags.ELEMENT) // 0