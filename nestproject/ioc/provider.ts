import { Type } from "./type"

// 处理 字符串 类型的 token
// 包装一下，防止重名
export class InjectToken{
    constructor(public injectionIdentifier: string){

    }
}

export type Token<T> = Type<T> | InjectToken




export type BaseProvider<T> = {
    provide: Token<T>
}

export interface ClassProvider<T> extends BaseProvider<T>{
    useClass: Type<T> // // 表示 是 一个类
}

export interface ValueProvider<T> extends BaseProvider<T>{
    useValue: T //  类 的 实列
}

export interface FactoryProvider<T> extends BaseProvider<T>{
    useFactory: () => T //  类 的 实列
}

export type Provider<T> = ClassProvider<T> | ValueProvider<T> | FactoryProvider<T>


/**
 * 
 * 类型保护
 */


// export function isValueProvider<T>(provider: BaseProvider<T>): provider is ClassProvider<T> {
//     return (provider as any).useClass != undefined
// }

// export const isValueProvider: <T>(provider: BaseProvider<T>) =>  = (provider) => {
//     return (provider as any).useClass != undefined
// }

// 上面那种 带有 is 范性写法报错， 因为不支持
// 改为这样的才支持
export const isClassProvider = <T>(provider: BaseProvider<T>): provider is ClassProvider<T> => {
    return (provider as any).useClass != undefined
}

export const isValueProvider = <T>(provider: BaseProvider<T>): provider is ValueProvider<T> => {
    return (provider as any).value != undefined
}

export const isFactoryProvider = <T>(provider: BaseProvider<T>): provider is FactoryProvider<T> => {
    return (provider as any).useFactory != undefined
}
