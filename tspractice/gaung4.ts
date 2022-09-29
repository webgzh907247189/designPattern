export { }

// 当提取 a=1 中的 key 和 value，构造成索引类型的时候，如果提取不出来，之前返回的是空对象，现在改成了 Record<string, any>。

// 因为 ParseQueryString 是针对字符串字面量类型做运算的，如果传入的不是字面量类型，而是 string，
// 那就会走到这里，如果返回空对象，那取它的任何属性都会报错。

declare const obj: {}
obj.a; // 报错

declare const obj1: Record<string, any>
obj1.a; // 不报错



type TypeParseUrlQueryItem<S> = S extends `${infer L}=${infer R}` ? { [K in L]: R } : {} // Record<string, any>
type sss = TypeParseUrlQueryItem<'b=1'>


type TypeCombine<T, P> = T extends P ? P : T extends unknown[] ? [...T, P] : [T, P]
type TypeMerge<T extends Record<string, any>, P extends Record<string, any>> = {
    [K in keyof T | keyof P]: K extends keyof T ? K extends keyof P ? TypeCombine<T[K], P[K]> : T[K] : K extends keyof P ? P[K] : never
}
type TypeMerge11 = TypeMerge<{ name: string }, { age: number }>
type TypeMerge22 = TypeMerge<{ name: [string] }, { age: number, name: boolean }>



type TypeParseUrlQuery<S extends string> = S extends `${infer L}&${infer R}` ? TypeMerge<TypeParseUrlQueryItem<L>, TypeParseUrlQuery<R>> : TypeParseUrlQueryItem<S>
type ssss = TypeParseUrlQuery<'a=1&b=2&c=3'>


{
    const parseUrlQuery = <Str extends string>(url: Str): TypeParseUrlQuery<Str> => {
        // 用 as any 来对返回值类型做了断言，这是因为 ParseQueryString<Str> 要传入类型参数 Str 才能知道具体的类型，
        // 而具体传入什么在类型检查时是不知道的，所以这里要 as any 才能通过类型检查。
        if (!url || !url.length) {
            return Object.create(null)
        }

        const [, queryStr] = url.includes('?') ? url.split('?') : [, url]
        return queryStr.split('&').reduce((result, item) => {
            let [key, value] = item.split('=')
            if (result[key]) {
                if (Array.isArray(result[key])) {
                    result[key].push(value);
                } else {
                    result[key] = [result[key], value]
                }
            } else {
                result[key] = value;
            }

            return result
        }, Object.create(null))
    }

    const result = parseUrlQuery('a=1&b=2&c=3&a=4&a=5')
    console.log(result)

    const result2 = parseUrlQuery('')
    // console.log(result2.asad) // 报错
}


{
    const parseUrlQuery = <Str extends string>(queryStr: Str): TypeParseUrlQuery<Str> => {
        // 用 as any 来对返回值类型做了断言，这是因为 ParseQueryString<Str> 要传入类型参数 Str 才能知道具体的类型，
        // 而具体传入什么在类型检查时是不知道的，所以这里要 as any 才能通过类型检查。
        if (!queryStr || !queryStr.length) {
            return {} as any;
        }

        const queryObj = {}
        const items = queryStr.split('&');
        items.forEach(item => {
            const [key, value] = item.split('=');
            if (queryObj[key]) {
                if (Array.isArray(queryObj[key])) {
                    queryObj[key].push(value);
                } else {
                    queryObj[key] = [queryObj[key], value]
                }
            } else {
                queryObj[key] = value;
            }
        });
        return queryObj as any
    }

    const result = parseUrlQuery('a=1&b=2&c=3&a=4&a=5')
    console.log(result)
}

