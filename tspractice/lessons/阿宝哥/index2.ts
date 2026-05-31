{

}


{
    // 5
    type Fn = (a: number, b: string) => number

    type AppendArgument<F, A> = F extends (...args: infer Args) => infer val ? (x: A, ...args: Args) => val : never

    type FinalFn = AppendArgument<Fn, boolean>
}

{
    // 6 
    type ListToObj<L extends any[]> = L[number]

    type Flat<T, E extends any[] = []> = T extends [infer L, ...infer R] ? L extends any[] ? [...Flat<L, [...E]>, ...Flat<R>] : Flat<R, [L, ...E]> : E;
    type NaiveFlat<T extends any[], R extends any[] = []> = Flat<T, R>

    // 测试用例：
    type NaiveResult = NaiveFlat<[['a'], ['b', 'c'], ['d']]>
    // NaiveResult的结果： "a" | "b" | "c" | "d"

    type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
    type DeepTestResult = Flat<Deep>

    type result = ListToObj<DeepTestResult>


    type DeepFlat<T extends any[]> = T[number] extends infer U ? U extends any[] ? DeepFlat<U> : U : never;
    type sss1 = DeepFlat<[['a'], ['b', 'c'], [['d']], [[[['e']]]]]>


    type DeepFlat1<T extends any[]> = { [P in keyof T]: T[P] extends any[] ? DeepFlat1<T[P]> : T[P] }[number]
    type sss2 = DeepFlat1<[['a'], ['b', 'c'], [['d']], [[[['e']]]]]>
}

{
    // 7
    type EmptyObject = Record<any, never>

    // 测试用例
    const shouldPass: EmptyObject = {}; // 可以正常赋值
    // const shouldFail: EmptyObject = { // 将出现编译错误
    //     prop: "TS"
    // }



    type SomeType = {
        prop: string
    }

    // 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
    type OnlyKeys<T, P extends T> = { [K in keyof P]: K extends keyof T ? P[K] : never }
    function takeSomeTypeOnly<T extends SomeType>(x: OnlyKeys<SomeType, T>) { return x }

    // 测试用例：
    const x = { prop: 'a' };
    takeSomeTypeOnly(x) // 可以正常调用

    const y = { prop: 'a', addditionalProp: 'x' };
    // takeSomeTypeOnly(y) // 将出现编译错误

    type ss1 = OnlyKeys<SomeType, { prop: string; addditionalProp: string }>
}


{
    // 8
    // type NonEmptyArray<T> = [T, ...T[]]
    type NonEmptyArray<T> = T[] & { 0: T };

    // const aa: NonEmptyArray<string> = [] // 将出现编译错误
    const bb: NonEmptyArray<string> = ['Hello TS'] // 非空数据，正常使用

}