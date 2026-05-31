import 'reflect-metadata'

export type Type<T> = {
    new (...arg: any[]): T
}

export class InjectToken{
    constructor(public injectionIdentifier: string){

    }
}


type Token<T> = Type<T> | InjectToken


const KEY1 = 'test'

class Car{}
class Horse{}
class GirlFrend{
    constructor(
        private car: Car,
        @Inject(new InjectToken('hource')) private horse: Horse
    ){}
}

// target  类
// paraIdx 此参数在参数列表中的 索引
function Inject(type: Token<any>){
    return (target, key, paraIdx) => {
        // 相当于
        // target[`index-${paraIdx}`] = { KEY1: type }
        Reflect.defineMetadata(KEY1, type, target, `index-${paraIdx}`)
    }
}