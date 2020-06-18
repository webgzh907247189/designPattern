const MY_IMMER = Symbol('my-immer1')

// 判断传入的对象是否是纯对象，因为 redux 要求 action 和 state 是一个纯对象，所以这个函数诞生了。
// 正常情况下 proto === Object.prototype(因为Object.getPrototypeOf(Object.prototype) === null)，倒数第二个层级 null -> Object.prototype
function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false
  
    let proto = obj
    // 获取最顶级的原型，如果就是自身，那么说明是纯对象。
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto)
    }
  
    return Object.getPrototypeOf(obj) === proto
}

const isProxy = value => !!value && !!value[MY_IMMER]

function produce(baseState, fn) {
  const proxies = new Map()
  const copies = new Map()

  const objectTraps = {
    get(target, key) {
      if (key === MY_IMMER) return target
      const data = copies.get(target) || target
      return getProxy(data[key])
    },
    set(target, key, val) {
      const copy = getCopy(target)
      const newValue = getProxy(val)
      // 这里的判断用于拿 proxy 的 target
      // 否则直接 copy[key] = newValue 的话外部拿到的对象是个 proxy
      copy[key] = isProxy(newValue) ? newValue[MY_IMMER] : newValue
      return true
    }
  }

  const getProxy = data => {
    if (isProxy(data)) {
      return data
    }
    if (isPlainObject(data) || Array.isArray(data)) {
      if (proxies.has(data)) {
        return proxies.get(data)
      }
      const proxy = new Proxy(data, objectTraps)
      proxies.set(data, proxy)
      return proxy
    }
    return data
  }

  const getCopy = data => {
    if (copies.has(data)) {
      return copies.get(data)
    }
    const copy = Array.isArray(data) ? data.slice() : Object.assign({},data)//{ ...data }
    copies.set(data, copy)
    return copy
  }

  const isChange = data => {
    if (proxies.has(data) || copies.has(data)) return true
  }

  const finalize = data => {
    if (isPlainObject(data) || Array.isArray(data)) {
      if (!isChange(data)) {
        return data
      }
      const copy = getCopy(data)
      Object.keys(copy).forEach(key => {
        copy[key] = finalize(copy[key])
      })
      return copy
    }
    return data
  }

  const proxy = getProxy(baseState)
  fn(proxy)
  return finalize(baseState)
}

const state = {
  info: {
    name: 'yck',
    career: {
      first: {
        name: '111'
      }
    }
  },
  data: [1, {name: '11'},{sex: '男'}]
}

const data = produce(state, draftState => {
  draftState.info.age = 26
  draftState.info.career.first.name = '222'
})

console.log(JSON.stringify(data), JSON.stringify(state));
console.log(data.data === state.data)





{
  var obj = {name: '111',sex: '22'}
  var objProxy = Proxy.revocable(obj, {
      get(obj,key){
          console.log(key,'111')
          return obj[key]
      },
      set(obj,key,val){
          console.log(key,'222')
          obj[key] = val
      }
  })

  var name = objProxy.proxy.name 
  console.log(name)// 111

  objProxy.proxy.sex = 'zzz'
  console.log(obj.sex)// 'zzz'

  objProxy.revoke()
  console.log(objProxy.proxy.name)// 报错
}