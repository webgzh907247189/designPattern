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
