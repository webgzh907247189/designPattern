export const persist = (createState, { name, storage }) => {
    return (set, get, api) => {
        let result = createState((...args) => {
            // 先调用老的 set 方法，把值存好
            set(...args)

            // 把新状态保存到 storage 中
            storage.setItem(name, get())
        }, get, api)



        // 放到微任务队列
        // 把本地存储种存的值 取出来 放到仓库
        queueMicrotask(() => {
            set(storage.getItem(name))
        })
        return result
    }
}

export const createJSONStorge = (storage) => {
    return {
        getItem(name){
            const str = storage.getItem(name)
            return str ? JSON.parse(str) : {}
        },
        setItem(name, value){
            storage.setItem(name, JSON.stringify(value))
        },
    }
}