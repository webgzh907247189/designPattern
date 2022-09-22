export { }

// 类型编程比直接声明类型更高一层，他是对类型参数做一系列类型运算，产生新的类型。
// 需要动态生成类型的场景，必然会用到类型编程，比如 Promise.all、Promise.race、柯里化等场景。

// 有的时候不用类型编程也行，但用了类型编程能够实现更精准的类型提示和检查，
// 比如 parseQueryString 这个函数的返回值。
{
    type A = {
        aa: string
        Bb: string
        cc_Dd_Ee: string
    }

    type Camelcase<T extends string> = T extends `${infer P}_${infer R}` ? `${P}${Camelcase<R>}` : T;
    type Camel<T> = {
        [
        K in keyof T as Camelcase<K & string>
        ]: T[K]
    }
    type Camel11 = Camel<A>
}


{
    type A = {
        aa: string
        Bb: string
        cc_Dd_Ee: {
            eee_fff: string
        }
    }

    type Camelcase<T extends string> = T extends `${infer P}_${infer R}` ? `${P}${Camelcase<Capitalize<R>>}` : T;

    // 没有触发计算， 所以用 T extends any 触发一下计算
    // type Camel<T> = {
    //     [
    //         K in keyof T as Camelcase<K & string>
    //     ]: T[K] extends Record<string, string> ? Camel<T[K]> : T[K]
    // }

    // 没有触发计算， 所以用 T extends any 触发一下计算
    type Camel<T> = T extends any ? {
        [
        K in keyof T as Camelcase<K & string>
        ]: T[K] extends Record<string, string> ? Camel<T[K]> : T[K]
    } : never
    type Camel22 = Camel<A>
}


{
    type A = {
        aa: string
        Bb: Array<'aa_bb' | 'cc_dd' | 'ee_ff'>
        cc_Dd_Ee: {
            eee_fff: string
        }
    }

    type Camelcase<T extends string> = T extends `${infer P}_${infer R}` ? `${P}${Camelcase<Capitalize<R>>}` : T;

    // 没有触发计算， 所以用 T extends any 触发一下计算
    // type Camel<T> = {
    //     [
    //         K in keyof T as Camelcase<K & string>
    //     ]: T[K] extends Record<string, string> ? Camel<T[K]> : T[K]
    // }

    // 没有触发计算， 所以用 T extends any 触发一下计算
    type Camel<T> = T extends any ? {
        [
        K in keyof T as Camelcase<K & string>
        ]: T[K] extends Record<string, string> ? Camel<T[K]> : T[K] extends Array<infer A extends string> ? Array<Camelcase<A>> : T[K]
    } : never
    type Camel33 = Camel<A>
}

{
    type MergeVal<V1, V2> = V1 extends V2 ? V1 : [V1, V2]
    type Mergeparams<O extends Record<any, any>, R extends Record<any, any>> = {
        // [Key in keyof O | keyof R]: O[Key] & R[Key]
        [Key in keyof O | keyof R]: Key extends keyof O ? Key extends keyof R ? MergeVal<O[Key], R[Key]> : O[Key] : Key extends keyof R ? R[Key] : never
    }
    type PrseQueryItem<S extends string> = S extends `${infer A}=${infer B}` ? { [K in A]: B } : {}
    type ParseQueryString<S> = S extends `${infer A}&${infer B}` ? Mergeparams<PrseQueryItem<A>, ParseQueryString<B>> : PrseQueryItem<S & string>
    type res = ParseQueryString<'a=1&b=2&c=3'>
}

{
    type TypeFn = (this: {name: string}, age: number) => void
    type ThisParameterType<T> = T extends (this: infer R, ...args: any[]) => any ? R : T;
    type ThisParameterType11 = ThisParameterType<TypeFn>
    type ThisParameterType22 = ThisParameterType<(age: number) => void>

    // 有可能没有 this,  也有可能有this
    type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ?  (...args: A) => R : T;
    type OmitThisParameter11 = OmitThisParameter<TypeFn> 
    type OmitThisParameter22 = OmitThisParameter<(age: number) => void> 


    // this 被占位了， 直接拿到 ...args 参数
    type test11 = ((this: {name: string}, age: number) => void) extends ((this: any, ...args: infer A) => infer R) ?  (...args: A) => R : ''
    type test22 = ((this: {name: string}, age: number) => void) extends ((...args: infer A) => infer R) ?  (...args: A) => R : ''
}

// 泛型 约束 返回 T 报错
{
    const getRemovePrefixUrl = <T extends string>(url: T): string => {
        return url.startsWith('/') ? url.substring(1) : url
    }
}

{
    // Promise.all 是等所有 promise 执行完一起返回
    // Promise.race 是有一个执行完就返回。返回的类型都需要用到参数 Promise 的 value 类型
    interface PromiseConstructor {
        all<T extends readonly unknown[] | []>
            (values: T): Promise<{
                -readonly [P in keyof T]: Awaited<T[P]>
            }>;
    

        // 约束为 unknown[] | [] 就是 as const 的意思
        race<T extends readonly unknown[] | []>
            (values: T): Promise<Awaited<T[number]>>;
    }
}
// 约束为 unknown[] | [] 就是 as const 的意思
declare function test1<T extends unknown[]>(values: T): T
declare function test2<T extends unknown[] | []>(values: T): T
const res1 = test1([1,2,3]) //  number[]
const res2 = test2([1,2,3]) //  [number, number, number]




// 函数柯里化 采用 重载的方式
type CurriedFunc<Params, Result> = Params extends [infer L, ...infer R] ? (a: L) => CurriedFunc<R, Result> : Result
function currying<Func>(fn: Func): Func extends (...args: infer Args) => infer Result ? CurriedFunc<Args, Result> : never
function currying (fn) {
    let args: unknown[] = []
    const fnLength = fn.length

    const curryfn = (...a)  => {
        args = [...args, ...a]
        if (args.length >= fnLength) {
            console.log(args, 'args')
            return fn(...args);
        }else {
            return curryfn
        }
    }
    return (...a) => curryfn(...a)
}

const func = (a: string, b: number, c: boolean) => { return a+ b + c};
const curryFn = currying(func)
const curryFn1 = curryFn('123')
const curryFn2 = curryFn1(333)
const curryFn3 = curryFn2(true)
// const curryFn4 = curryFn3('d')
console.log(curryFn3)