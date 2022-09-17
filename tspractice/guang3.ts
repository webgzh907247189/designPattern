export { }

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