export {}

type Proxy<T> = {
    get(): T
    set: (value: T) => void
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
}

function proxyify<T>(obj: T): Proxify<T>{
    let result = <Proxify<T>>{};
    for (const key in obj) {
        Object.defineProperty(result, key, {
            get(){
                return obj[key]
            },
            set(value){
                obj[key] = value
            }
        })
    }
    return result
}
type Props = {
    name: string,
    age: string
}

let props: Props = {
    name: 'test',
    age: '222'
}
let proxyProps = proxyify<Props>(props)
console.log(proxyProps.name, 'proxyProps.name')
proxyProps.name = 'test111'
console.log(proxyProps.name, 'proxyProps.name')



function unProxify<T>(obj: Proxify<T>): T{
    let result: any = {} as T
    for (const key in obj) {
        result[key] = obj[key]
    }   
    return result
}

let originalProps = unProxify(proxyProps)
console.log(originalProps)