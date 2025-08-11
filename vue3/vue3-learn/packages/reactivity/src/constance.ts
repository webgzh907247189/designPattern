export enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive'
}

export enum DirtyLevels {
    DIRTY = 4,  // 脏的， 需要重新运算
    NODIRTY = 0, // 不脏 用上次缓存的结果
}
